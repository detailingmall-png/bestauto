import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REVIEWS_PATH = resolve(__dirname, "../src/data/reviews.json");

const SEARCH_QUERY = "BESTAUTO Detailing Tbilisi";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

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

interface Review {
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  relativeTime: string;
  text: string;
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

function deduplicationKey(review: Review): string {
  return `${review.authorName}::${review.time}`;
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

function convertGoogleReview(gr: GoogleReview): Review {
  return {
    authorName: gr.authorAttribution.displayName,
    authorPhotoUrl: gr.authorAttribution.photoUri,
    rating: gr.rating,
    relativeTime: gr.relativePublishTimeDescription,
    text: gr.text?.text ?? gr.originalText?.text ?? "",
    time: Math.floor(new Date(gr.publishTime).getTime() / 1000),
    profileUrl: gr.authorAttribution.uri,
  };
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

async function fetchFromGooglePlaces(placeId: string): Promise<GooglePlaceResponse> {
  if (!API_KEY) {
    throw new Error("GOOGLE_PLACES_API_KEY environment variable is not set");
  }

  const url = `https://places.googleapis.com/v1/places/${placeId}`;
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
      `Google Places API error ${response.status}: ${body}`
    );
  }

  return response.json() as Promise<GooglePlaceResponse>;
}

function mergeReviews(existing: Review[], incoming: Review[]): Review[] {
  const seen = new Map<string, Review>();

  for (const review of existing) {
    seen.set(deduplicationKey(review), review);
  }

  for (const review of incoming) {
    const key = deduplicationKey(review);
    if (!seen.has(key)) {
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
  try {
    apiData = await fetchFromGooglePlaces(placeId);
  } catch (err) {
    console.error("API fetch failed — existing file will NOT be overwritten.");
    console.error(err);
    process.exit(1);
  }

  const incomingReviews: Review[] = (apiData.reviews ?? []).map(
    convertGoogleReview
  );

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
