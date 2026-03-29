/**
 * SEO utilities: static hreflang, BreadcrumbList, Service, WebSite schemas.
 * Replaces JS-based hreflang and Service schema from Tilda exports.
 */
import pageMap from './page-map.json';

const BASE_URL = 'https://bestauto.ge';

// ──────────────────────────────────────────────
// Language availability lookup from page-map.json
// ──────────────────────────────────────────────

type LangSet = Set<string>;
const slugLangs: ReadonlyMap<string, LangSet> = (() => {
  const map = new Map<string, LangSet>();
  for (const page of Object.values(
    pageMap as Record<string, { lang: string; slug: string }>
  )) {
    const existing = map.get(page.slug);
    if (existing) {
      existing.add(page.lang);
    } else {
      map.set(page.slug, new Set([page.lang]));
    }
  }
  return map;
})();

// ──────────────────────────────────────────────
// Service data (migrated from Tilda JS → static)
// ──────────────────────────────────────────────

const SERVICES: Readonly<Record<string, { name: Record<string, string>; min: string }>> = {
  'polishing': { name: { ka: 'მანქანის პოლირება', ru: 'Полировка автомобиля', en: 'Car Polishing' }, min: '150' },
  'ceramiccoating': { name: { ka: 'კერამიკული დაფარვა', ru: 'Керамическое покрытие', en: 'Ceramic Coating' }, min: '400' },
  'ppf-shield-wrapping': { name: { ka: 'PPF დამცავი ფირი', ru: 'Защитная плёнка PPF', en: 'PPF Paint Protection Film' }, min: '500' },
  'vinyl-wrapping': { name: { ka: 'ვინილით შეფუთვა', ru: 'Оклейка винилом', en: 'Vinyl Car Wrapping' }, min: '300' },
  'interior-cleaning': { name: { ka: 'ქიმწმენდა', ru: 'Химчистка салона', en: 'Interior Cleaning' }, min: '100' },
  'auto-glass-tinting': { name: { ka: 'მინების დაბურვა', ru: 'Тонировка стёкол', en: 'Window Tinting' }, min: '80' },
  'windshield-repair': { name: { ka: 'საქარე მინის შეკეთება', ru: 'Ремонт лобового стекла', en: 'Windshield Repair' }, min: '30' },
  'car-soundproofing': { name: { ka: 'ხმის იზოლაცია', ru: 'Шумоизоляция', en: 'Car Soundproofing' }, min: '200' },
  'computer-diagnostics': { name: { ka: 'კომპიუტერული დიაგნოსტიკა', ru: 'Компьютерная диагностика', en: 'Computer Diagnostics' }, min: '30' },
};

// Breadcrumb home labels per language
const HOME_LABEL: Readonly<Record<string, string>> = {
  ka: 'მთავარი',
  ru: 'Главная',
  en: 'Home',
};

const BLOG_LABEL: Readonly<Record<string, string>> = {
  ka: 'ბლოგი',
  ru: 'Блог',
  en: 'Blog',
};

// ──────────────────────────────────────────────
// Helper: build full URL for a given lang + slug
// ──────────────────────────────────────────────

function buildUrl(lang: string, slug: string): string {
  if (lang === 'ka') return slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`;
  return slug ? `${BASE_URL}/${lang}/${slug}` : `${BASE_URL}/${lang}`;
}

// ──────────────────────────────────────────────
// 1. Hreflang tags
// ──────────────────────────────────────────────

export function generateHreflangTags(baseSlug: string, lang: string): string {
  const available = slugLangs.get(baseSlug);
  if (!available) return '';

  const tags: string[] = [];
  for (const l of ['ka', 'ru', 'en']) {
    if (available.has(l)) {
      tags.push(`<link rel="alternate" hreflang="${l}" href="${buildUrl(l, baseSlug)}">`);
    }
  }
  // x-default → ka version (or current if ka unavailable)
  const defaultLang = available.has('ka') ? 'ka' : lang;
  tags.push(`<link rel="alternate" hreflang="x-default" href="${buildUrl(defaultLang, baseSlug)}">`);

  return tags.join('');
}

// ──────────────────────────────────────────────
// 2. BreadcrumbList Schema
// ──────────────────────────────────────────────

export function generateBreadcrumbSchema(baseSlug: string, lang: string, pageTitle: string): string {
  if (!baseSlug) return ''; // homepage — no breadcrumbs

  const parts = baseSlug.split('/');
  const items: { name: string; url: string }[] = [];

  // Position 1: Home
  items.push({ name: HOME_LABEL[lang] ?? 'Home', url: buildUrl(lang, '') });

  // Strip SEO suffix from pageTitle (e.g. "Полировка автомобиля в Тбилиси — цены | BESTAUTO" → short name)
  const shortTitle = pageTitle.replace(/\s*[—|]\s*.*$/, '').trim() || pageTitle;

  if (parts[0] === 'blog') {
    // Blog: Home → Blog → Post
    items.push({ name: BLOG_LABEL[lang] ?? 'Blog', url: buildUrl(lang, 'blog') });
    if (parts.length > 1) {
      items.push({ name: shortTitle, url: buildUrl(lang, baseSlug) });
    }
  } else if (parts.length === 1) {
    // Top-level service or page: Home → Page (use SERVICES name if available)
    const serviceName = SERVICES[baseSlug]?.name[lang];
    items.push({ name: serviceName ?? shortTitle, url: buildUrl(lang, baseSlug) });
  } else {
    // Nested: Home → Parent → Page
    const parentSlug = parts[0];
    const parentService = SERVICES[parentSlug];
    const parentName = parentService?.name[lang] ?? parentSlug;
    items.push({ name: parentName, url: buildUrl(lang, parentSlug) });
    items.push({ name: shortTitle, url: buildUrl(lang, baseSlug) });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// ──────────────────────────────────────────────
// 3. Service Schema (static replacement for JS)
// ──────────────────────────────────────────────

export function generateServiceSchema(baseSlug: string, lang: string): string {
  const service = SERVICES[baseSlug];
  if (!service) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name[lang] ?? service.name.en,
    provider: {
      '@type': 'AutoRepair',
      name: 'BESTAUTO',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Tbilisi',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GEL',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: service.min,
        priceCurrency: 'GEL',
      },
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// ──────────────────────────────────────────────
// 4. WebSite Schema (homepage only)
// ──────────────────────────────────────────────

export function generateWebSiteSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BESTAUTO',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/ru?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}
