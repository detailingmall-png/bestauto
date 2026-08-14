/**
 * Generates the cross-sell ("related services") block HTML for service and blog pages.
 * Replaces the old hardcoded Tilda t692 blocks with a dynamic, contextual grid.
 *
 * Each page shows exactly 4 related services, excluding the current page's own service.
 * Blog articles are mapped to a parent service for contextual titles and service selection.
 */

import { HOMEPAGE_SERVICES, type ServiceEntry } from './services-grid';

// ---------------------------------------------------------------------------
// 1. Cross-sell map: which 4 services to show on each service page
// ---------------------------------------------------------------------------

const CROSS_SELL_MAP: Readonly<Record<string, readonly string[]>> = {
  // 7 main services
  'ppf-shield-wrapping': ['polishing', 'ceramiccoating', 'vinyl-wrapping', 'auto-glass-tinting'],
  'vinyl-wrapping':      ['ppf-shield-wrapping', 'polishing', 'ceramiccoating', 'auto-glass-tinting'],
  'polishing':           ['ceramiccoating', 'ppf-shield-wrapping', 'vinyl-wrapping', 'windshield-repair'],
  'ceramiccoating':      ['polishing', 'ppf-shield-wrapping', 'vinyl-wrapping', 'auto-glass-tinting'],
  'interior-cleaning':   ['carwash', 'polishing', 'ceramiccoating', 'ppf-shield-wrapping'],
  'auto-glass-tinting':  ['ppf-shield-wrapping', 'polishing', 'ceramiccoating', 'vinyl-wrapping'],
  'windshield-repair':   ['polishing', 'ceramiccoating', 'ppf-shield-wrapping', 'auto-glass-tinting'],
  // Other services
  'car-soundproofing':    ['ppf-shield-wrapping', 'auto-glass-tinting', 'polishing', 'ceramiccoating'],
  'computer-diagnostics': ['polishing', 'ceramiccoating', 'windshield-repair', 'auto-glass-tinting'],
  'carwash':              ['polishing', 'interior-cleaning', 'ceramiccoating', 'ppf-shield-wrapping'],
  // Restored 2026-06-05 (were missing after restoration - no cross-sell showed)
  'interior-restoration':  ['interior-cleaning', 'carwash', 'polishing', 'ceramiccoating'],
  'paintless-dent-repair': ['polishing', 'ppf-shield-wrapping', 'ceramiccoating', 'windshield-repair'],
};

// Default 4 services for generic (unmapped) blog articles
const GENERIC_SERVICES: readonly string[] = [
  'ppf-shield-wrapping', 'polishing', 'ceramiccoating', 'vinyl-wrapping',
];

// ---------------------------------------------------------------------------
// 2. Blog article -> parent service mapping (51 articles)
// ---------------------------------------------------------------------------

export const BLOG_SERVICE_MAP: Readonly<Record<string, string>> = {
  // Polishing
  'blog/polishing-before-after':       'polishing',
  'blog/polishing-cost-tbilisi':       'polishing',
  'blog/how-often-polish-car':         'polishing',
  'blog/soft-vs-abrasive-polishing':   'polishing',
  'blog/polishing-before-ceramic':     'polishing',
  'blog/car-body-polishing':           'polishing',
  'blog/headlight-polishing':          'polishing',
  'blog/polishing-after-repair':       'polishing',
  'blog/10-paint-mistakes':            'polishing',
  'blog/abrasive-polishing-deep-dive': 'polishing',
  'blog/headlight-polish-vs-replace':  'polishing',
  'blog/polish-vs-wax-vs-ceramic-beginners': 'polishing',
  // Ceramic coating
  'blog/ceramic-coating-care':         'ceramiccoating',
  'blog/ceramic-coating-cost-tbilisi': 'ceramiccoating',
  'blog/ceramic-coating-durability':   'ceramiccoating',
  'blog/ceramic-coating-maintenance':  'ceramiccoating',
  'blog/ceramic-coating-tbilisi':      'ceramiccoating',
  'blog/how-long-ceramic-coating-lasts': 'ceramiccoating',
  'blog/ceramic-coating-for-car':      'ceramiccoating',
  'blog/ceramic-for-car-glass':        'ceramiccoating',
  'blog/interior-ceramic-coating':     'ceramiccoating',
  'blog/ceramic-polishing-combo':      'ceramiccoating',
  'blog/ceramic-application-cost-breakdown': 'ceramiccoating',
  'blog/ceramic-over-ppf-layered':     'ceramiccoating',
  'blog/ceramic-prep-paint-correction': 'ceramiccoating',
  'blog/ceramic-vs-wax-vs-sealant':    'ceramiccoating',
  'blog/interior-ceramic-detail':      'ceramiccoating',
  'blog/hydrophobic-windshield-coating': 'ceramiccoating',
  'blog/maintenance-wash-ceramic':     'ceramiccoating',
  'blog/ceramic-5-year-tco':           'ceramiccoating',
  'blog/ceramic-product-lines-compared': 'ceramiccoating',
  'blog/ceramic-tbilisi-climate':      'ceramiccoating',
  // PPF
  'blog/ppf-benefits':                       'ppf-shield-wrapping',
  'blog/ppf-film-for-cars-protection':       'ppf-shield-wrapping',
  'blog/service-on-ppf-wrapped-car':         'ppf-shield-wrapping',
  'blog/strength-and-useful-life-of-ppf':    'ppf-shield-wrapping',
  'blog/protection-against-uv-rays-scratches': 'ppf-shield-wrapping',
  'blog/top-5-car-paint-protection':         'ppf-shield-wrapping',
  'blog/top-11-reasons':                     'ppf-shield-wrapping',
  'blog/what-is-ppf-explainer':              'ppf-shield-wrapping',
  'blog/ppf-full-body-wrapping-guide':       'ppf-shield-wrapping',
  'blog/ppf-pricing-georgia-2026':           'ppf-shield-wrapping',
  'blog/ppf-protection-levels-partial-full': 'ppf-shield-wrapping',
  'blog/ppf-vs-ceramic-vs-vinyl':            'ppf-shield-wrapping',
  'blog/ppf-anti-gravel-focused':            'ppf-shield-wrapping',
  'blog/ppf-brand-comparison-llumar-luxarmor-quantum': 'ppf-shield-wrapping',
  'blog/ppf-edge-peeling-troubleshoot':      'ppf-shield-wrapping',
  'blog/ppf-for-new-cars-checklist':      'ppf-shield-wrapping',
  'blog/ppf-matte-satin-finish-options':      'ppf-shield-wrapping',
  'blog/ppf-self-healing-explained':          'ppf-shield-wrapping',
  'blog/ppf-hood-only-partial-wrap':          'ppf-shield-wrapping',
  'blog/ppf-removal-how-to':                  'ppf-shield-wrapping',
  'blog/detailing-center-tbilisi':           'ppf-shield-wrapping',
  'blog/detailing-services-all-in-one':      'ppf-shield-wrapping',
  'blog/5-year-ownership-detailing-plan':    'ppf-shield-wrapping',
  'blog/detailing-brands-we-use':            'ppf-shield-wrapping',
  'blog/detailing-faq-common-myths':         'ppf-shield-wrapping',
  'blog/winter-detailing-tbilisi':           'ppf-shield-wrapping',
  'blog/tbilisi-districts-detailing-delivery': 'ppf-shield-wrapping',
  // Vinyl wrapping
  'blog/benefits-of-vinyl-wraps':        'vinyl-wrapping',
  'blog/car-body-color-with-vinyl-wrap': 'vinyl-wrapping',
  'blog/hints-for-vinyl-wrapped-cars':   'vinyl-wrapping',
  'blog/car-body-wrap-cost-guide':       'vinyl-wrapping',
  'blog/wrap-vs-paint-cost-lifetime':    'vinyl-wrapping',
  'blog/black-gloss-wrap-popular-choice':'vinyl-wrapping',
  'blog/carbon-fiber-vinyl-wrap':        'vinyl-wrapping',
  'blog/chrome-delete-vinyl':            'vinyl-wrapping',
  'blog/vinyl-wrap-care-maintenance':    'vinyl-wrapping',
  'blog/wrap-color-options-finishes':    'vinyl-wrapping',
  'blog/interior-decor-vinyl-film':      'vinyl-wrapping',
  // Window tinting
  'blog/vehicle-tinting-techniques':          'auto-glass-tinting',
  'blog/legal-aspects-of-tinting-in-georgia': 'auto-glass-tinting',
  'blog/window-tinting-care':                 'auto-glass-tinting',
  'blog/front-windshield-tint-rules':         'auto-glass-tinting',
  'blog/reflective-vs-dark-tint-heat':        'auto-glass-tinting',
  'blog/tint-60-percent-legal-georgia':       'auto-glass-tinting',
  'blog/tint-ceramic-vs-atermal-vs-dyed':     'auto-glass-tinting',
  'blog/tint-percentage-explained':           'auto-glass-tinting',
  'blog/anti-uv-anti-rust-tint':              'auto-glass-tinting',
  'blog/how-to-choose-tint-film':             'auto-glass-tinting',
  'blog/mobile-tinting-on-location':          'auto-glass-tinting',
  'blog/tint-care-fresh-install':             'auto-glass-tinting',
  'blog/tint-removal-bubbles':                'auto-glass-tinting',
  'blog/window-tint-process-detailed':        'auto-glass-tinting',
  // Windshield repair
  'blog/chip-repair-process-step-by-step': 'windshield-repair',
  'blog/efficiency-of-windshield-repair': 'windshield-repair',
  'blog/replace-or-repair':              'windshield-repair',
  'blog/windshield-crack-repair-size-limit': 'windshield-repair',
  'blog/windshield-repair-benefits':     'windshield-repair',
  'blog/mobile-windshield-repair-on-site': 'windshield-repair',
  'blog/modern-windshields-sensors-cameras': 'windshield-repair',
  'blog/windshield-night-visibility-issues': 'windshield-repair',
  'blog/windshield-polishing-micro-scratch': 'windshield-repair',
  'blog/windshield-repair-vs-replacement': 'windshield-repair',
  'blog/deep-crack-rescue-last-chance': 'windshield-repair',
  'blog/insurance-windshield-claim-georgia': 'windshield-repair',
  // Interior cleaning
  'blog/car-interior-detailing-basics': 'interior-cleaning',
  'blog/car-interior-disinfection':     'interior-cleaning',
  'blog/car-interior-polishing':        'interior-cleaning',
  'blog/interior-cleaning-for-auto':    'interior-cleaning',
  'blog/engine-room-cleaning':          'interior-cleaning',
  'blog/interior-disinfection-ozone':   'interior-cleaning',
  'blog/chem-cleaning-tbilisi-prices':  'interior-cleaning',
  'blog/salon-detailing-explained':     'interior-cleaning',
  'blog/smoker-cabin-nicotine-removal': 'interior-cleaning',
  'blog/leather-seat-restoration':      'interior-cleaning',
  'blog/fabric-seat-stain-guide':       'interior-cleaning',
  'blog/headliner-cleaning-dangers':    'interior-cleaning',
  'blog/mold-mildew-cabin-flood':       'interior-cleaning',
  'blog/pet-hair-cabin-removal':        'interior-cleaning',
  'blog/interior-ceramic-after-cleaning': 'interior-cleaning',
  'blog/post-interior-cleaning-mistakes': 'interior-cleaning',
  'blog/wrong-chemicals-damage-plastic': 'interior-cleaning',
  'blog/lease-return-detailing-prep':   'interior-cleaning',
  'blog/salon-vacuum-vs-dry-clean':     'interior-cleaning',
  // Polishing
  'blog/polish-cream-diy-vs-studio':   'polishing',
  'blog/steam-headlight-polishing':    'polishing',
  'blog/polishing-old-cars-worth-it':  'polishing',
  'blog/pre-sale-polishing-resale-value': 'polishing',
  'blog/scratch-polish-guide':         'polishing',
  'blog/mountain-trip-polish-check':   'polishing',
  'blog/polish-finish-types-matt-gloss-satin': 'polishing',
  'blog/polishing-how-often-myth-bust': 'polishing',
  // Car wash
  'blog/2-phase-vs-3-phase-wash':      'carwash',
  'blog/contactless-vs-hand-wash':     'carwash',
  'blog/detailing-wash-explained':     'carwash',
  'blog/wash-with-ceramic-ppf-care':   'carwash',
  'blog/engine-bay-wash-safety':       'carwash',
  'blog/pressure-washer-diy-danger':   'carwash',
  'blog/wash-schedule-tbilisi-weather': 'carwash',
  // Soundproofing
  'blog/soundproofing-process':    'car-soundproofing',
  'blog/noisemakers-and-wayouts':  'car-soundproofing',
  'blog/why-soundproof-car':       'car-soundproofing',
  'blog/technology-and-process':   'car-soundproofing',
  // Diagnostics
  'blog/car-diagnostic-test-stages-and-methods': 'computer-diagnostics',
  'blog/errors-to-find':                         'computer-diagnostics',
  'blog/why-use-car-diagnostic-test':            'computer-diagnostics',
  // Interior restoration (cluster restored 2026-06-05)
  'blog/why-restore-interior-elements':    'interior-restoration',
  'blog/restoring-car-seats':              'interior-restoration',
  'blog/steering-wheel-restoration':       'interior-restoration',
  'blog/plastic-elements-restoration':     'interior-restoration',
  // Paintless dent repair (cluster restored 2026-06-05)
  'blog/pdr-method':                       'paintless-dent-repair',
  'blog/pdr-after-hail':                   'paintless-dent-repair',
  'blog/pdr-guidelines-and-techniques':    'paintless-dent-repair',
  // Generic articles have no mapping — handled by fallback
};

// ---------------------------------------------------------------------------
// 3. Contextual titles (3 languages)
// ---------------------------------------------------------------------------

const CROSS_SELL_TITLES: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  'ppf-shield-wrapping': {
    ru: 'Вместе с оклейкой PPF заказывают',
    ka: 'PPF გადაკვრასთან ერთად ხშირად ირჩევენ',
    en: 'Also ordered with PPF wrapping',
  },
  'vinyl-wrapping': {
    ru: 'Вместе с оклейкой кузова заказывают',
    ka: 'ვინილის გადაკვრასთან ერთად ხშირად ირჩევენ',
    en: 'Also ordered with vinyl wrapping',
  },
  'polishing': {
    ru: 'Вместе с полировкой заказывают',
    ka: 'პოლირებასთან ერთად ხშირად ირჩევენ',
    en: 'Also ordered with polishing',
  },
  'ceramiccoating': {
    ru: 'Вместе с керамикой заказывают',
    ka: 'კერამიკულ საფართან ერთად შეუკვეთავენ',
    en: 'Also ordered with ceramic coating',
  },
  'interior-cleaning': {
    ru: 'Вместе с химчисткой заказывают',
    ka: 'ქიმწმენდასთან ერთად შეუკვეთავენ',
    en: 'Also ordered with interior cleaning',
  },
  'auto-glass-tinting': {
    ru: 'Вместе с тонировкой заказывают',
    ka: 'ტონირებასთან ერთად შეუკვეთავენ',
    en: 'Also ordered with window tinting',
  },
  'windshield-repair': {
    ru: 'Вместе с ремонтом стекол заказывают',
    ka: 'მინის შეკეთებასთან ერთად შეუკვეთავენ',
    en: 'Also ordered with glass repair',
  },
  'car-soundproofing': {
    ru: 'Вместе с шумоизоляцией заказывают',
    ka: 'ხმის იზოლაციასთან ერთად შეუკვეთავენ',
    en: 'Also ordered with soundproofing',
  },
  'computer-diagnostics': {
    ru: 'Вместе с диагностикой заказывают',
    ka: 'დიაგნოსტიკასთან ერთად შეუკვეთავენ',
    en: 'Also ordered with diagnostics',
  },
  'carwash': {
    ru: 'Вместе с детейлинг мойкой заказывают',
    ka: 'დეტეილინგ რეცხვასთან ერთად შეუკვეთავენ',
    en: 'Also ordered with detailing wash',
  },
  'interior-restoration': {
    ru: 'Вместе с восстановлением салона заказывают',
    ka: 'ინტერიერის რესტავრაციასთან ერთად შეუკვეთავენ',
    en: 'Also ordered with interior restoration',
  },
  'paintless-dent-repair': {
    ru: 'Вместе с удалением вмятин заказывают',
    ka: 'ჩაღრმავებების უსაღებავოდ გასწორებასთან ერთად შეუკვეთავენ',
    en: 'Also ordered with paintless dent repair',
  },
};

const GENERIC_TITLE: Readonly<Record<string, string>> = {
  ru: 'Наши услуги',
  ka: 'ჩვენი სერვისები',
  en: 'Our Services',
};

// ---------------------------------------------------------------------------
// 4. Service data lookup (from services-grid.ts shared data)
// ---------------------------------------------------------------------------

const SERVICE_BY_SLUG = new Map<string, ServiceEntry>(
  HOMEPAGE_SERVICES.map((s) => [s.slug, s]),
);

function getLangPrefix(lang: string): string {
  if (lang === 'ru') return 'ru/';
  if (lang === 'en') return 'en/';
  return '';
}

// ---------------------------------------------------------------------------
// 5. HTML renderer
// ---------------------------------------------------------------------------

function renderCard(service: ServiceEntry, lang: string, langPrefix: string): string {
  const name = service.name[lang] ?? service.name['en'];
  const href = `/${langPrefix}${service.slug}`;

  return `<a href="${href}" class="ba-related__card">
      <div class="ba-related__img-wrap">
        <img src="${service.image}" alt="${name}" loading="lazy" width="480" height="360">
      </div>
      <p class="ba-related__name">${name}</p>
    </a>`;
}

const BLOCK_STYLE = `<style>
.ba-related__title{font-size:30px;color:var(--ba-color-accent);font-weight:var(--ba-font-weight-bold);text-align:center;margin:0 0 64px;font-family:var(--ba-font-family)}
.ba-related__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:1200px;margin:0 auto;padding:0 20px}
.ba-related__card{display:block;text-decoration:none;text-align:center;transition:transform var(--ba-duration-normal) var(--ba-ease-default)}
.ba-related__card:hover{transform:scale(1.02)}
.ba-related__img-wrap{position:relative;width:100%;padding-bottom:75%;border-radius:var(--ba-radius-xl);overflow:hidden}
.ba-related__img-wrap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ba-related__name{color:var(--ba-color-text);font-weight:var(--ba-font-weight-bold);margin:16px 0 0;font-size:18px;font-family:var(--ba-font-family)}
@media screen and (max-width:960px){.ba-related__title{font-size:28px;margin-bottom:48px}.ba-related__grid{grid-template-columns:repeat(2,1fr)}.ba-related__name{font-size:16px}}
@media screen and (max-width:640px){.ba-related__title{font-size:24px;margin-bottom:32px}.ba-related__grid{grid-template-columns:1fr}.ba-related__name{font-size:16px}}
@media(prefers-reduced-motion:reduce){.ba-related__card{transition:none}}
</style>`;

// ---------------------------------------------------------------------------
// 6. Main generator function
// ---------------------------------------------------------------------------

/** Slugs that should never show the cross-sell block. */
const SKIP_SLUGS = new Set(['', 'prices', 'blog']);

/**
 * Generate the cross-sell block HTML for a given page.
 * Returns empty string for pages that should not have the block (homepage, prices, blog index).
 */
export function generateRelatedServicesHtml(lang: string, baseSlug: string): string {
  if (SKIP_SLUGS.has(baseSlug)) return '';

  // Determine parent service and the 4 cross-sell slugs
  let parentService: string | undefined;
  let serviceSlugs: readonly string[];

  if (CROSS_SELL_MAP[baseSlug]) {
    // Service page
    parentService = baseSlug;
    serviceSlugs = CROSS_SELL_MAP[baseSlug];
  } else if (baseSlug.startsWith('blog/')) {
    // Blog article
    parentService = BLOG_SERVICE_MAP[baseSlug];
    serviceSlugs = parentService && CROSS_SELL_MAP[parentService]
      ? CROSS_SELL_MAP[parentService]
      : GENERIC_SERVICES;
  } else {
    // Unknown page type — no cross-sell
    return '';
  }

  // Resolve service entries
  const services = serviceSlugs
    .map((slug) => SERVICE_BY_SLUG.get(slug))
    .filter((s): s is ServiceEntry => s !== undefined);

  if (services.length === 0) return '';

  // Build title
  const titleTexts = parentService ? CROSS_SELL_TITLES[parentService] : undefined;
  const title = titleTexts?.[lang] ?? titleTexts?.['en'] ?? GENERIC_TITLE[lang] ?? GENERIC_TITLE['en'];

  // Render
  const langPrefix = getLangPrefix(lang);
  const cards = services.map((s) => renderCard(s, lang, langPrefix)).join('\n      ');

  return `<div id="ba-related-services" style="padding-top:96px;padding-bottom:96px;background-color:var(--ba-color-bg);">
  <div style="max-width:1200px;margin:0 auto;padding:0 20px;">
    <h2 class="ba-related__title">${title}</h2>
    <div class="ba-related__grid">
      ${cards}
    </div>
  </div>
  ${BLOCK_STYLE}
</div>`;
}
