import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REVIEWS_PATH = resolve(__dirname, "../src/data/reviews.json");

const SEARCH_QUERY = "BESTAUTO Detailing Tbilisi";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const LANGS = ["ru", "ka", "en"] as const;
type Lang = (typeof LANGS)[number];

interface GoogleReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text?: { text: string; languageCode: string };
  originalText?: { text: string; languageCode: string };
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
}

interface GooglePlaceResponse {
  rating: number;
  userRatingCount: number;
  reviews?: GoogleReview[];
}

interface GoogleSearchResult {
  places?: Array<{
    id: string;
    displayName?: { text: string };
    rating?: number;
    userRatingCount?: number;
  }>;
}

interface LocalizedText {
  ru?: string;
  ka?: string;
  en?: string;
}

interface Review {
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  relativeTime: string;
  text: string;
  texts: LocalizedText;
  relativeTimes: LocalizedText;
  originalLang: string;
  time: number;
  profileUrl: string;
}

interface ReviewsData {
  placeId: string;
  businessName: string;
  overallRating: number;
  totalReviews: number;
  fetchedAt: string;
  reviews: Review[];
}

function deduplicationKey(authorName: string, time: number): string {
  return `${authorName}::${time}`;
}

function readExistingReviews(): ReviewsData | null {
  if (!existsSync(REVIEWS_PATH)) {
    return null;
  }
  try {
    const raw = readFileSync(REVIEWS_PATH, "utf-8");
    return JSON.parse(raw) as ReviewsData;
  } catch (err) {
    console.error("Failed to parse existing reviews.json:", err);
    return null;
  }
}

async function discoverPlaceId(): Promise<string> {
  if (!API_KEY) {
    throw new Error("GOOGLE_PLACES_API_KEY environment variable is not set");
  }

  console.log(`Discovering Place ID for "${SEARCH_QUERY}"...`);
  const url = "https://places.googleapis.com/v1/places:searchText";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName",
    },
    body: JSON.stringify({ textQuery: SEARCH_QUERY }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Place search error ${response.status}: ${body}`);
  }

  const data = (await response.json()) as GoogleSearchResult;
  const place = data.places?.[0];
  if (!place?.id) {
    throw new Error(`No places found for query: "${SEARCH_QUERY}"`);
  }

  console.log(`Found Place ID: ${place.id} (${place.displayName?.text ?? "unknown"})`);
  return place.id;
}

async function fetchFromGooglePlaces(placeId: string, languageCode?: string): Promise<GooglePlaceResponse> {
  if (!API_KEY) {
    throw new Error("GOOGLE_PLACES_API_KEY environment variable is not set");
  }

  const params = languageCode ? `?languageCode=${languageCode}` : "";
  const url = `https://places.googleapis.com/v1/places/${placeId}${params}`;
  const fieldMask = "rating,userRatingCount,reviews";

  const response = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": fieldMask,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Google Places API error ${response.status} (lang=${languageCode ?? "default"}): ${body}`
    );
  }

  return response.json() as Promise<GooglePlaceResponse>;
}

interface PartialReview {
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  texts: LocalizedText;
  relativeTimes: LocalizedText;
  originalLang: string;
  time: number;
  profileUrl: string;
}

async function fetchAllLanguages(placeId: string): Promise<{ apiData: GooglePlaceResponse; incomingReviews: Review[] }> {
  const results = await Promise.allSettled(LANGS.map(l => fetchFromGooglePlaces(placeId, l)));

  let apiData: GooglePlaceResponse | null = null;
  const seen = new Map<string, PartialReview>();

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const lang = LANGS[i];
    if (result.status === "rejected") {
      console.warn(`Fetch for lang=${lang} failed:`, result.reason);
      continue;
    }
    const data = result.value;
    if (!apiData) apiData = data;

    for (const gr of data.reviews ?? []) {
      const reviewText = gr.text?.text ?? gr.originalText?.text ?? "";
      if (!reviewText.trim()) continue;

      const authorName = gr.authorAttribution.displayName;
      const time = Math.floor(new Date(gr.publishTime).getTime() / 1000);
      const key = deduplicationKey(authorName, time);

      if (!seen.has(key)) {
        seen.set(key, {
          authorName,
          authorPhotoUrl: gr.authorAttribution.photoUri,
          rating: gr.rating,
          texts: {},
          relativeTimes: {},
          originalLang: gr.originalText?.languageCode ?? lang,
          time,
          profileUrl: gr.authorAttribution.uri,
        });
      }

      const entry = seen.get(key)!;

      // Store the text returned for this language request (translated by Google)
      if (gr.text?.text?.trim()) {
        entry.texts[lang] = gr.text.text;
      }
      // Also store the original text under its original language code
      if (gr.originalText?.text?.trim() && gr.originalText.languageCode) {
        const origLang = gr.originalText.languageCode as Lang;
        if (!entry.texts[origLang]) {
          entry.texts[origLang] = gr.originalText.text;
        }
      }
      entry.relativeTimes[lang] = gr.relativePublishTimeDescription;

      // Update originalLang from originalText if available
      if (gr.originalText?.languageCode && !entry.originalLang) {
        entry.originalLang = gr.originalText.languageCode;
      }
    }
  }

  if (!apiData) {
    throw new Error("All language fetches failed");
  }

  const incomingReviews: Review[] = Array.from(seen.values())
    .map((p): Review => ({
      ...p,
      text: p.texts[p.originalLang as Lang] ?? p.texts.en ?? Object.values(p.texts).find(t => t) ?? "",
      relativeTime: p.relativeTimes.en ?? Object.values(p.relativeTimes).find(t => t) ?? "",
    }))
    .filter(r => r.text.trim())
    .sort((a, b) => b.time - a.time);

  console.log(`Fetched ${incomingReviews.length} unique reviews with text across ${LANGS.length} languages.`);
  return { apiData, incomingReviews };
}

function mergeReviews(existing: Review[], incoming: Review[]): Review[] {
  const seen = new Map<string, Review>();

  // Keep existing reviews that have text
  for (const review of existing) {
    if (review.text.trim()) {
      seen.set(deduplicationKey(review.authorName, review.time), review);
    }
  }

  for (const review of incoming) {
    const key = deduplicationKey(review.authorName, review.time);
    const prev = seen.get(key);
    if (prev) {
      // Merge localized texts: incoming data enriches existing
      const mergedTexts: LocalizedText = { ...prev.texts, ...review.texts };
      const mergedRelativeTimes: LocalizedText = { ...prev.relativeTimes, ...review.relativeTimes };
      seen.set(key, {
        ...prev,
        texts: mergedTexts,
        relativeTimes: mergedRelativeTimes,
        originalLang: review.originalLang || prev.originalLang || "",
        text: review.text || prev.text,
        relativeTime: review.relativeTime || prev.relativeTime,
      });
    } else {
      seen.set(key, review);
    }
  }

  return Array.from(seen.values()).sort((a, b) => b.time - a.time);
}

async function main(): Promise<void> {
  console.log("Fetching reviews from Google Places API...");

  const existing = readExistingReviews();

  // Resolve Place ID: use cached value or discover via text search
  let placeId: string = existing?.placeId ?? "";
  if (!placeId || placeId === "PLACE_ID_HERE") {
    try {
      placeId = await discoverPlaceId();
    } catch (err) {
      console.error("Place ID discovery failed — cannot continue.");
      console.error(err);
      process.exit(1);
    }
  }

  let apiData: GooglePlaceResponse;
  let incomingReviews: Review[];
  try {
    ({ apiData, incomingReviews } = await fetchAllLanguages(placeId));
  } catch (err) {
    console.error("API fetch failed — existing file will NOT be overwritten.");
    console.error(err);
    process.exit(1);
  }

  const existingReviews: Review[] = existing?.reviews ?? [];
  const businessName: string = existing?.businessName ?? "BESTAUTO";

  const merged = mergeReviews(existingReviews, incomingReviews);

  const output: ReviewsData = {
    placeId,
    businessName,
    overallRating: apiData.rating,
    totalReviews: apiData.userRatingCount,
    fetchedAt: new Date().toISOString(),
    reviews: merged,
  };

  writeFileSync(REVIEWS_PATH, JSON.stringify(output, null, 2), "utf-8");

  console.log(
    `Done. ${merged.length} total reviews (${incomingReviews.length} from API). ` +
      `Overall rating: ${apiData.rating} (${apiData.userRatingCount} total).`
  );
}

main();
