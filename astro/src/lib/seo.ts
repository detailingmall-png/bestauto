/**
 * SEO utilities: static hreflang, BreadcrumbList, Service, WebSite,
 * FAQPage, Article, and Organization schemas.
 * Replaces JS-based hreflang and Service schema from Tilda exports.
 */
import pageMap from './page-map.json';
import reviewsData from '../data/reviews.json';
import { SERVICE_FAQS } from '../data/service-faqs';

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
  'polishing': { name: { ka: 'მანქანის პოლირება', ru: 'Полировка автомобиля', en: 'Car Polishing' }, min: '590' },
  'ceramiccoating': { name: { ka: 'კერამიკული დაფარვა', ru: 'Керамическое покрытие', en: 'Ceramic Coating' }, min: '400' },
  'ppf-shield-wrapping': { name: { ka: 'PPF დამცავი ფირი', ru: 'Защитная плёнка PPF', en: 'PPF Paint Protection Film' }, min: '2500' },
  'vinyl-wrapping': { name: { ka: 'ფერის შეცვლა დამცავი ფირით', ru: 'Смена цвета защитной плёнкой', en: 'Color Change with Protective Film' }, min: '300' },
  'interior-cleaning': { name: { ka: 'ქიმწმენდა', ru: 'Химчистка салона', en: 'Interior Cleaning' }, min: '400' },
  'interior-restoration': { name: { ka: 'ინტერიერის რესტავრაცია', ru: 'Восстановление салона', en: 'Interior Restoration' }, min: '190' },
  'paintless-dent-repair': { name: { ka: 'ძარას ცივად გასწორება', ru: 'Удаление вмятин без покраски', en: 'Paintless Dent Repair' }, min: '250' },
  'carwash': { name: { ka: 'მანქანის სარეცხი', ru: 'Детейлинг мойка автомобиля', en: 'Premium Car Wash' }, min: '40' },
  'auto-glass-tinting': { name: { ka: 'მინების დაბურვა', ru: 'Тонировка стёкол', en: 'Window Tinting' }, min: '130' },
  'windshield-repair': { name: { ka: 'საქარე მინის შეკეთება', ru: 'Ремонт лобового стекла', en: 'Windshield Repair' }, min: '60' },
  'car-soundproofing': { name: { ka: 'ხმის იზოლაცია', ru: 'Шумоизоляция', en: 'Car Soundproofing' }, min: '600' },
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
  if (lang === 'ka') return slug ? `${BASE_URL}/${slug}/` : `${BASE_URL}/`;
  return slug ? `${BASE_URL}/${lang}/${slug}/` : `${BASE_URL}/${lang}/`;
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

  // Canonical: points to the current language version
  tags.push(`<link rel="canonical" href="${buildUrl(lang, baseSlug)}">`);

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

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name[lang] ?? service.name.en,
    provider: {
      '@type': 'AutomotiveBusiness',
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

export function generateReviewSchema(lang: string = 'en'): string {
  if (reviewsData.reviews.length === 0) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#business`,
    name: 'BESTAUTO',
    image: `${BASE_URL}/img/logo.png`,
    url: BASE_URL,
    telephone: '+995550000299',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Guramishvili Ave. 78',
      addressLocality: 'Tbilisi',
      addressCountry: 'GE',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewsData.overallRating.toString(),
      bestRating: '5',
      ratingCount: reviewsData.totalReviews.toString(),
    },
    review: reviewsData.reviews.slice(0, 5).map((r: { authorName: string; rating: number; text: string; texts?: Record<string, string> }) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.authorName },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating.toString(),
        bestRating: '5',
      },
      reviewBody: r.texts?.[lang] ?? r.texts?.en ?? r.text,
    })),
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
    '@id': `${BASE_URL}/#website`,
    name: 'BESTAUTO',
    alternateName: ['BESTAUTO Detailing', 'BESTAUTO Detailing Studio'],
    url: BASE_URL,
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'BESTAUTO',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/img/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// ──────────────────────────────────────────────
// 5. Service FAQPage Schema
// ──────────────────────────────────────────────

export function generateServiceFaqSchema(baseSlug: string, lang: string): string {
  const faqs = SERVICE_FAQS[baseSlug];
  if (!faqs || faqs.length === 0) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question[lang] ?? item.question['en'],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang] ?? item.answer['en'],
      },
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// ──────────────────────────────────────────────
// 6. Article Schema (blog posts)
// ──────────────────────────────────────────────

export function generateArticleSchema(
  baseSlug: string,
  lang: string,
  pageTitle: string,
): string {
  if (!baseSlug.startsWith('blog/') || baseSlug === 'blog') return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageTitle.replace(/\s*[—|]\s*BESTAUTO.*$/, '').trim() || pageTitle,
    author: {
      '@type': 'Organization',
      name: 'BESTAUTO',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'BESTAUTO',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/img/logo.png`,
      },
    },
    inLanguage: lang,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': buildUrl(lang, baseSlug),
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// ──────────────────────────────────────────────
// 7. Organization Schema
// ──────────────────────────────────────────────

export function generateOrganizationSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'BESTAUTO',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/img/logo.png`,
    },
    telephone: '+995550000299',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Guramishvili Ave. 78',
      addressLocality: 'Tbilisi',
      addressCountry: 'GE',
    },
    sameAs: [
      'https://www.instagram.com/bestauto.ge/',
      'https://www.facebook.com/bestauto.ge/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+995550000299',
      contactType: 'customer service',
      availableLanguage: ['Georgian', 'Russian', 'English'],
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}
