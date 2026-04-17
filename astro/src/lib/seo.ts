/**
 * SEO utilities: static hreflang, BreadcrumbList, Service, WebSite,
 * FAQPage, Article, and Organization schemas.
 * Replaces JS-based hreflang and Service schema from Tilda exports.
 */
import pageMap from './page-map.json';
import reviewsData from '../data/reviews.json';
import { SERVICE_FAQS } from '../data/service-faqs';
import { LOCATIONS } from '../data/location-data';
import type { PricingPage } from './sanity';

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
  // Location pages (native Astro, not in page-map.json)
  for (const loc of LOCATIONS) {
    map.set(`locations/${loc.slug}`, new Set(['ka', 'ru', 'en']));
  }
  return map;
})();

// ──────────────────────────────────────────────
// Service data (migrated from Tilda JS → static)
// ──────────────────────────────────────────────

interface ServiceMeta {
  readonly name: Record<string, string>;
  readonly min: string;
  readonly description: Record<string, string>;
  readonly sectionKey: string;
}

const SERVICES: Readonly<Record<string, ServiceMeta>> = {
  'polishing': {
    name: { ka: 'მანქანის პოლირება', ru: 'Полировка автомобиля', en: 'Car Polishing' },
    min: '690',
    description: {
      ka: 'მანქანის ძარის პროფესიონალური პოლირება თბილისში — ნაკაწრების, ჰოლოგრამების და მიკროდეფექტების აღმოფხვრა.',
      ru: 'Профессиональная полировка кузова автомобиля в Тбилиси — устранение царапин, голограмм и микродефектов.',
      en: 'Professional car body polishing in Tbilisi — removal of scratches, holograms and micro-defects.',
    },
    sectionKey: 's0',
  },
  'ceramiccoating': {
    name: { ka: 'კერამიკული დაფარვა', ru: 'Керамическое покрытие', en: 'Ceramic Coating' },
    min: '500',
    description: {
      ka: 'კერამიკული საფარის დატანა ავტომობილის ძარაზე, მინებზე და სალონში — ჰიდროფობიური დაცვა და ბზინვარება.',
      ru: 'Нанесение керамического покрытия на кузов, стёкла и салон автомобиля — гидрофобная защита и блеск.',
      en: 'Ceramic coating application on car body, glass and interior — hydrophobic protection and gloss.',
    },
    sectionKey: 's1',
  },
  'ppf-shield-wrapping': {
    name: { ka: 'დამცავი ფირის გადაკვრა (PPF)', ru: 'Защитная плёнка PPF', en: 'PPF Paint Protection Film' },
    min: '2500',
    description: {
      ka: 'PPF დამცავი ფირის გადაკვრა ავტომობილზე თბილისში — ძარის დაცვა ნაკაწრებისგან, ქვებისგან და UV-სხივებისგან.',
      ru: 'Оклейка автомобиля защитной плёнкой PPF в Тбилиси — защита кузова от царапин, сколов и UV-лучей.',
      en: 'PPF paint protection film installation in Tbilisi — protect your car body from scratches, chips and UV rays.',
    },
    sectionKey: 's6',
  },
  'vinyl-wrapping': {
    name: { ka: 'ფირის გადაკვრა — ფერის შეცვლა', ru: 'Смена цвета защитной плёнкой', en: 'Color Change with Protective Film' },
    min: '300',
    description: {
      ka: 'ავტომობილის ფერის შეცვლა დამცავი ვინილის ფირით თბილისში — მატი, გლოსი, სატინი და ექსკლუზიური ფერები.',
      ru: 'Смена цвета автомобиля защитной виниловой плёнкой в Тбилиси — матовые, глянцевые, сатиновые и эксклюзивные цвета.',
      en: 'Car color change with protective vinyl wrap in Tbilisi — matte, gloss, satin and exclusive colors.',
    },
    sectionKey: 's7',
  },
  'interior-cleaning': {
    name: { ka: 'ქიმწმენდა', ru: 'Химчистка салона', en: 'Interior Cleaning' },
    min: '400',
    description: {
      ka: 'ავტომობილის სალონის პროფესიონალური ქიმწმენდა თბილისში — ტყავი, ტექსტილი, ხალიჩები, ჭერი.',
      ru: 'Профессиональная химчистка салона автомобиля в Тбилиси — кожа, текстиль, ковры, потолок.',
      en: 'Professional car interior cleaning in Tbilisi — leather, textile, carpets, ceiling.',
    },
    sectionKey: 's2',
  },
  'carwash': {
    name: { ka: 'მანქანის სარეცხი', ru: 'Детейлинг мойка автомобиля', en: 'Premium Car Wash' },
    min: '40',
    description: {
      ka: 'პრემიუმ დეტეილინგ რეცხვა თბილისში — ხელით რეცხვა, ინტერიერი, ძრავი, დისკები.',
      ru: 'Премиум детейлинг мойка автомобиля в Тбилиси — ручная мойка, интерьер, двигатель, диски.',
      en: 'Premium detailing car wash in Tbilisi — hand wash, interior, engine, wheels.',
    },
    sectionKey: '',
  },
  'auto-glass-tinting': {
    name: { ka: 'მინების დაბურვა', ru: 'Тонировка стёкол', en: 'Window Tinting' },
    min: '130',
    description: {
      ka: 'ავტომობილის მინების პროფესიონალური დაბურვა თბილისში — სითბოსგან, UV-სხივებისგან და თვალისგან დაცვა.',
      ru: 'Профессиональная тонировка стёкол автомобиля в Тбилиси — защита от жары, UV-лучей и посторонних глаз.',
      en: 'Professional car window tinting in Tbilisi — protection from heat, UV rays and prying eyes.',
    },
    sectionKey: 's8',
  },
  'windshield-repair': {
    name: { ka: 'ავტომინების შეკეთება, პოლირება და შლიფოვკა', ru: 'Ремонт сколов и трещин, полировка и шлифовка автостекол', en: 'Windshield Repair, Glass Polishing & Grinding' },
    min: '60',
    description: {
      ka: 'საქარე მინის და ავტომინების შეკეთება, პოლირება და შლიფოვკა თბილისში — ნაკენჭარი, ბზარები, ნაკაწრები.',
      ru: 'Ремонт сколов и трещин, полировка и шлифовка автостекол в Тбилиси — сколы, трещины, царапины.',
      en: 'Windshield repair, glass polishing and grinding in Tbilisi — chips, cracks, scratches.',
    },
    sectionKey: 's5',
  },
  'car-soundproofing': {
    name: { ka: 'ხმის იზოლაცია', ru: 'Шумоизоляция', en: 'Car Soundproofing' },
    min: '600',
    description: {
      ka: 'ავტომობილის ხმის იზოლაცია თბილისში — კარებები, იატაკი, სახურავი, საბარგული.',
      ru: 'Шумоизоляция автомобиля в Тбилиси — двери, пол, крыша, багажник.',
      en: 'Car soundproofing in Tbilisi — doors, floor, roof, trunk.',
    },
    sectionKey: 's9',
  },
  'computer-diagnostics': {
    name: { ka: 'კომპიუტერული დიაგნოსტიკა', ru: 'Компьютерная диагностика', en: 'Computer Diagnostics' },
    min: '50',
    description: {
      ka: 'ავტომობილის კომპ���უტერული დიაგნოსტიკა თბილისში — შეცდომების წაკითხვა და ანალიზი.',
      ru: 'Компьютерная диагностика автомобиля в Тбилиси — считывание и анализ ошибок.',
      en: 'Computer diagnostics of your car in Tbilisi — error code reading and analysis.',
    },
    sectionKey: 's10',
  },
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

const LOCATIONS_LABEL: Readonly<Record<string, string>> = {
  ka: 'სტუდიები',
  ru: 'Студии',
  en: 'Studios',
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
  } else if (parts[0] === 'locations' && parts.length > 1) {
    // Location: Home → Studios → Location Name
    items.push({ name: LOCATIONS_LABEL[lang] ?? 'Studios', url: buildUrl(lang, '') });
    const loc = LOCATIONS.find((l) => l.slug === parts[1]);
    const locName = loc?.name[lang] ?? shortTitle;
    items.push({ name: locName, url: buildUrl(lang, baseSlug) });
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

export function generateServiceSchema(
  baseSlug: string,
  lang: string,
  pricingPage?: PricingPage | null,
): string {
  const service = SERVICES[baseSlug];
  if (!service) return '';

  const serviceName = service.name[lang] ?? service.name.en;

  // Build offer catalog from Sanity pricing data if available
  const section = pricingPage?.sections?.find(s => s._key === service.sectionKey);
  const offers: Record<string, unknown>[] = (section?.items ?? [])
    .filter(item => item.price)
    .map(item => {
      const name = (lang === 'ru' ? item.nameRu : lang === 'ka' ? item.nameKa : item.nameEn) || item.nameRu;
      const rawPrice = item.price;
      // Extract numeric price: "от 7500 Gel" → "7500"
      const numMatch = rawPrice.match(/(\d[\d\s]*)/);
      const price = numMatch ? numMatch[1].replace(/\s/g, '') : rawPrice;
      return {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
        price,
        priceCurrency: 'GEL',
      };
    });

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: serviceName,
    description: service.description[lang] ?? service.description.en,
    url: buildUrl(lang, baseSlug),
    provider: {
      '@type': 'AutoRepair',
      '@id': `${BASE_URL}/#business`,
      name: 'BESTAUTO',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Tbilisi',
    },
  };

  if (offers.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: offers,
    };
  } else {
    // Fallback: static minPrice when Sanity data unavailable
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'GEL',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: service.min,
        priceCurrency: 'GEL',
      },
    };
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

export function generateReviewSchema(lang: string = 'en'): string {
  if (reviewsData.reviews.length === 0) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${BASE_URL}/#business`,
    name: 'BESTAUTO',
    image: `${BASE_URL}/img/logo.png`,
    url: BASE_URL,
    telephone: '+995550000199',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Anna Politkovskaya St. 51',
      addressLocality: 'Tbilisi',
      addressCountry: 'GE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.7226529,
      longitude: 44.7047754,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
    sameAs: [
      'https://maps.app.goo.gl/g8eLgcEB9vrVNvsY7',
      'https://www.instagram.com/bestautodetailingtbilisi/',
      'https://www.facebook.com/bestauto.detailing.tbilis',
      'https://maps.app.goo.gl/9VfCTRyXAEigrErM6',
      'https://www.instagram.com/bestautodetailingspa/',
      'https://www.facebook.com/bstdtlngtbls',
    ],
    location: [
      {
        '@type': 'Place',
        name: 'BESTAUTO Guramishvili',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Guramishvili Ave. 78',
          addressLocality: 'Tbilisi',
          addressCountry: 'GE',
        },
        telephone: '+995550000299',
      },
      {
        '@type': 'Place',
        name: 'BESTAUTO Saburtalo',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Anna Politkovskaya St. 51',
          addressLocality: 'Tbilisi',
          addressCountry: 'GE',
        },
        telephone: '+995550000199',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewsData.overallRating.toString(),
      bestRating: '5',
      ratingCount: reviewsData.totalReviews.toString(),
      reviewCount: reviewsData.totalReviews.toString(),
    },
    review: reviewsData.reviews.slice(0, 5).map((r: { authorName: string; rating: number; text: string; texts?: Record<string, string>; time: number }) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.authorName },
      datePublished: new Date(r.time * 1000).toISOString().split('T')[0],
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
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Guramishvili Ave. 78',
        addressLocality: 'Tbilisi',
        addressCountry: 'GE',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Anna Politkovskaya St. 51',
        addressLocality: 'Tbilisi',
        addressCountry: 'GE',
      },
    ],
    sameAs: [
      'https://www.instagram.com/bestautodetailingspa/',
      'https://www.facebook.com/bstdtlngtbls',
      'https://www.instagram.com/bestautodetailingtbilisi/',
      'https://www.facebook.com/bestauto.detailing.tbilis',
      'https://maps.app.goo.gl/9VfCTRyXAEigrErM6',
      'https://maps.app.goo.gl/g8eLgcEB9vrVNvsY7',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+995550000299',
        contactType: 'customer service',
        availableLanguage: ['Georgian', 'Russian', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+995550000199',
        contactType: 'customer service',
        availableLanguage: ['Georgian', 'Russian', 'English'],
      },
    ],
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// ──────────────────────────────────────────────
// 8. Location (LocalBusiness) Schema
// ──────────────────────────────────────────────

export function generateLocationSchema(locationSlug: string, lang: string): string {
  const loc = LOCATIONS.find((l) => l.slug === locationSlug);
  if (!loc) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': `${BASE_URL}/locations/${loc.slug}/#business`,
    name: loc.name[lang] ?? loc.name.en,
    image: `${BASE_URL}/img/logo.png`,
    url: buildUrl(lang, `locations/${loc.slug}`),
    telephone: loc.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address.en.replace(', Tbilisi', ''),
      addressLocality: 'Tbilisi',
      addressCountry: 'GE',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'BESTAUTO',
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// ──────────────────────────────────────────────
// 9. Location FAQ Schema
// ──────────────────────────────────────────────

export function generateLocationFaqSchema(locationSlug: string, lang: string): string {
  const loc = LOCATIONS.find((l) => l.slug === locationSlug);
  if (!loc || loc.faqs.length === 0) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: loc.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question[lang] ?? item.question.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang] ?? item.answer.en,
      },
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}
