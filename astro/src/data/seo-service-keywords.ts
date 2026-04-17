/**
 * Canonical SEO keyword dictionary for bestauto.ge service pages.
 *
 * High-frequency (ВЧ / HF) search keywords per service × language. This is the
 * **single source of truth** for any anchor / title / meta / schema decision
 * about service-page targeting. Currently consumed by:
 *
 * - `lib/blog-links-inject.ts` — validates editorial blog→service anchor text
 *
 * Future consumers (planned):
 * - meta title/description rewrites in `data/{ka,ru,en}-seo-changes.ts`
 * - schema.org Service.name / alternateName fields
 * - on-page H2 / FAQ keyword coverage audits
 * - paid ad copy keyword targeting
 *
 * Companion documentation: `docs/semantic-core.md` — full per-service report
 * with impressions, positions, and implementation priorities.
 *
 * Order = priority, derived from real-world signal:
 *
 * - RU/KA/EN reordered by actual GSC click data for bestauto.ge over 16
 *   months (Downloads/gsc_service_pages_16months.csv, ~6.4k rows).
 * - KA additions sourced from competitor scan (performance.ge, adetailing.ge,
 *   detailing-ge.com, servisebi.ge, nam.ge, fixup.ge, priala.ge, cleancar.ge).
 * - SERP intent verified per term (commercial vs informational).
 *
 * Disambiguation notes (KA):
 * - `მანქანის ფირი` (car film) is genuinely ambiguous between PPF and vinyl.
 *   It is intentionally listed ONLY for /ppf-shield-wrapping (the "protective"
 *   connotation dominates search intent). Use `ფირის გადაკვრა` or
 *   `ფერადი ფირის გადაკვრა` for /vinyl-wrapping.
 * - `შუშის აღდგენა` (glass restoration) is too generic — Georgian competitors
 *   always qualify with `საქარე` (windshield-specific). Excluded.
 *
 * Disambiguation notes (EN):
 * - "windshield repair", "window tinting", "auto glass repair" without
 *   qualifier pull US state of Georgia SERP. Prefer geo-qualified variants.
 */

export type ServiceTarget =
  | '/polishing'
  | '/ceramiccoating'
  | '/ppf-shield-wrapping'
  | '/vinyl-wrapping'
  | '/auto-glass-tinting'
  | '/windshield-repair'
  | '/carwash'
  | '/interior-cleaning';

type KeywordMap = Readonly<Record<ServiceTarget, readonly string[]>>;

export const SERVICE_KEYWORDS_RU: KeywordMap = {
  '/polishing': [
    'полировка машины',          // GSC: 12 clicks (top)
    'полировка авто',             // GSC: 4
    'полировка автомобиля',       // GSC: 2
    'полировка кузова',           // GSC: 1 (still valid HF)
    'полировка лкп',
    'абразивная полировка',
  ],
  '/ceramiccoating': [
    'керамическое покрытие авто', // GSC: 8 (top)
    'керамика на авто',           // GSC: 4 (colloquial but real)
    'керамическое покрытие',      // GSC: 1, but high impressions
    'керамика на машину',
    'керамика для авто',
    'нанесение керамики',
    'керамическое покрытие автомобиля',
  ],
  '/ppf-shield-wrapping': [
    'защитная пленка на авто',    // GSC: 1 (top by clicks)
    'оклейка авто пленкой',       // GSC: 2 (shared w/ vinyl, dominant intent here)
    'оклейка автомобиля защитной пленкой',
    'защитная пленка',
    'ppf пленка',
    'оклейка полиуретановой пленкой',
    'антигравийная пленка',
    'бронирование авто пленкой',
  ],
  '/vinyl-wrapping': [
    'оклейка авто пленкой тбилиси', // GSC: 15 (top)
    'оклейка авто пленкой цена',    // GSC: 7
    'пленка для авто',              // GSC: 7
    'оклейка пленкой авто',         // GSC: 5
    'виниловая пленка для авто',    // GSC: 3
    'виниловая пленка',
    'оклейка винилом',
    'смена цвета пленкой',
  ],
  '/auto-glass-tinting': [
    'тонировка в грузии',         // GSC: 27 (top)
    'тонировка тбилиси',          // GSC: 19
    'тонировка',                  // GSC: 4
    'тонировка стекол авто',      // GSC: 2
    'тонировка авто',
    'тонировка автомобиля',
    'атермальная тонировка',
    'тонировка лобового стекла',
  ],
  '/windshield-repair': [
    'ремонт трещин лобового стекла', // GSC: 6 (top)
    'ремонт автостекол',             // GSC: 4
    'ремонт лобового стекла',        // GSC: 3
    'ремонт стекол авто',            // GSC: 3
    'ремонт сколов на лобовом стекле', // GSC: 3
    'ремонт стекла автомобиля',
    'восстановление лобового стекла',
  ],
  '/carwash': [
    'автомойка тбилиси',          // GSC: 16 (top)
    'мойка тбилиси',              // GSC: 5
    'детейлинг мойка',            // GSC: 3
    'мойка автомобиля',           // GSC: 2
    'автомойка',
    'мойка авто',
    'мойка машины',
    'бесконтактная мойка',
  ],
  '/interior-cleaning': [
    'химчистка авто тбилиси',     // GSC: 41 (top)
    'химчистка салона авто',      // GSC: 8
    'химчистка авто',             // GSC: 4
    'чистка салона авто',         // GSC: 4
    'авто химчистка',             // GSC: 3
    'химчистка салона',
    'химчистка автомобиля',
    'детейлинг салона',
  ],
};

export const SERVICE_KEYWORDS_KA: KeywordMap = {
  '/polishing': [
    'მანქანის პოლირება',          // GSC: 430 clicks (top)
    'პოლირება',                    // GSC: 408
    'ავტომობილის პოლირება',        // GSC: 64
    'მანქანის პოლირება ფასი',      // GSC: 137 (with price)
    'პოლირება ფასი',               // GSC: 119
    'გაპრიალება',                  // ALT: performance.ge synonym
    'მანქანის პალიროვკა',         // GSC: Russism, 755 imp
  ],
  '/ceramiccoating': [
    'მანქანის კერამიკა',           // GSC: 197 (top — real users say "ceramic", not "coating")
    'კერამიკა მანქანაზე',           // GSC: 180
    'კერამიკული პოლირება',         // GSC: 39 + competitor canonical (performance.ge H1)
    'ავტომობილის კერამიკა',        // GSC: 16
    'კერამიკული დაფარვა',          // ALT: competitor standard term
    'კერამიკული საფარი',           // formal term (low GSC but valid)
  ],
  '/ppf-shield-wrapping': [
    'მანქანის დამცავი ფირი',       // GSC: 1 + competitor confirmed
    'დამცავი ფირი',                // standard term (adetailing.ge H2)
    'დამცავი ფირის გადაკვრა',      // fixup.ge canonical PPF anchor (protective film wrapping)
    'ფირის გადაკვრა',              // generic film-wrapping intent (also in /vinyl-wrapping; rule decides target)
    'მანქანის ფირი',               // GSC: 3 — claimed for PPF (not vinyl, see header)
    'პოლიურეთანის ფირი',           // polyurethane variant
  ],
  '/vinyl-wrapping': [
    'ფირის გადაკვრა',              // GSC: 33 + competitor canonical
    'ფირის გადაკვრა მანქანაზე',    // GSC: 33
    'ფერადი ფირის გადაკვრა',       // ALT: adetailing.ge H1 (stronger than ვინილის ფირი)
    'მანქანაზე გადასაკრავი ფირი',  // GSC: 34
    'ვინილის ფირი',                // GSC: 46 + bestauto's own H1
    'ფირის გადაკვრა იაფად',        // GSC: 26 (with "cheap" modifier)
    'მანქანის ფირები',             // GSC: 83 (plural, ambiguous)
    'ფირის დაკვრა',                // GSC: colloquial variant, 220 imp
  ],
  '/auto-glass-tinting': [
    'მინების დაბურვა',             // GSC: 801 (largest single-keyword traffic on site)
    'შუშების დაბურვა',             // GSC: 317
    'მინების დამუქება',            // GSC: 317 (synonym)
    'მანქანის დაბურვა',            // GSC: 164
    'მანქანის მინების დაბურვა',    // GSC: 120
    'მინის დაბურვა',               // GSC: 85
    'შუშების დამუქება',            // GSC: 159
  ],
  '/windshield-repair': [
    'საქარე მინის აღდგენა',        // GSC: 429 (canonical)
    'ლაბავოის აღდგენა',            // GSC: folk term, 1,023 imp
    'მანქანის შუშის აღდგენა',      // GSC: 55
    'ნაკენჭარის აღდგენა',          // GSC: 327 imp (specific damage type)
    'საქარე მინების აღდგენა',      // GSC: 21 (plural variant)
    'მანქანის მინის აღდგენა',      // GSC: 9
    'საქარე მინის შეკეთება',       // GSC: 6
    // შუშის აღდგენა — REJECTED: too generic per competitor scan
  ],
  '/carwash': [
    'მანქანის რეცხვა',             // GSC: 62 + competitor canonical
    'ავტოსამრეცხაო',               // GSC: 42 + canonical one-word form
    'ავტო სამრეცხაო',              // GSC: 24 (two-word variant)
    'მანქანის რეცხვა ფასები',      // GSC: 43 (with price)
    'მანქანის გარეცხვა',           // GSC: 18 (verb form)
    'მანქანის სამრეცხაო',          // GSC: 10
    'მანქანის სამრეცხაო თბილისში', // GSC: geo-qualified, 387 imp
    'ავტოსამრეცხაო საბურთალოზე',   // GSC: geo (Saburtalo), 396 imp
  ],
  '/interior-cleaning': [
    'მანქანის ქიმწმენდა',          // GSC: 199 (top)
    'ავტომობილის ქიმწმენდა',       // GSC: 57
    'მანქანის ქიმწმენდა ფასი',     // GSC: 45 (with price)
    'სალონის ქიმწმენდა',           // GSC: 18 + competitor confirmed
    'მანქანის სალონის ქიმწმენდა',  // GSC: 8
    'ავტო ქიმწმენდა',              // GSC: 9
    'ხიმჩისტკა მანქანის',          // GSC: Russism variant, 337 imp
  ],
};

export const SERVICE_KEYWORDS_EN: KeywordMap = {
  '/polishing': [
    'car polishing',               // GSC: 1 click but high impressions
    'car polish service',          // ACCEPT-WITH-CAVEAT (low Tbilisi intent)
  ],
  '/ceramiccoating': [
    'ceramic coating',             // GSC: 4 clicks (top)
    'car ceramic coating',         // GSC: 2
    'auto ceramic coating',
  ],
  '/ppf-shield-wrapping': [
    'ppf wrap',                    // canonical short form
    'paint protection film',       // ACCEPT-WITH-CAVEAT (qualify with Tbilisi)
    'car ppf',
    'ppf for car',                 // GSC: 1
  ],
  '/vinyl-wrapping': [
    'car wrap',                    // GSC: 22 clicks (top)
    'car wrapping',                // GSC: 5
    'wrap car',                    // GSC: 4
    'vinyl wrap',
    'car wrap tbilisi',            // GSC: 2 (geo-qualified, strong intent)
  ],
  '/auto-glass-tinting': [
    'car window tint',             // GSC: 3 clicks (top)
    'car tinting',                 // GSC: 1
    'window tinting',              // ACCEPT-WITH-CAVEAT (US Georgia noise)
    'window tint',
  ],
  '/windshield-repair': [
    'windshield repair',           // GSC: 3 clicks (US noise but still relevant)
    'auto glass repair',           // GSC: 1
    'car glass repair',            // GSC: 2
    'windscreen repair',
  ],
  '/carwash': [
    'car wash tbilisi',            // strong geo-qualified intent
    'premium car wash',
    'car wash',
  ],
  '/interior-cleaning': [
    'car interior cleaning',       // GSC: 2
    'car dry cleaning',            // GSC: 3 (top — Soviet-era terminology)
    'car interior detailing',      // GSC: 1
  ],
};

const KEYWORDS_BY_LANG: Readonly<Record<string, KeywordMap>> = {
  ru: SERVICE_KEYWORDS_RU,
  ka: SERVICE_KEYWORDS_KA,
  en: SERVICE_KEYWORDS_EN,
};

/**
 * Validates that an anchor text is a known HF-keyword for the target service
 * in the given language. Case-insensitive comparison.
 */
export function isKnownServiceKeyword(target: string, anchor: string, lang: string): boolean {
  const map = KEYWORDS_BY_LANG[lang];
  if (!map) return true; // unknown language — skip validation rather than block
  const keywords = map[target as ServiceTarget];
  if (!keywords) return false;
  const normalized = anchor.trim().toLowerCase();
  return keywords.some(kw => kw.toLowerCase() === normalized);
}
