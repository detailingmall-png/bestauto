/**
 * Generates the services grid HTML for the bestauto.ge homepage.
 * Returns a complete HTML string styled with inline CSS (Tilda-compatible).
 */

export interface ServiceEntry {
  slug: string;
  tier: 1 | 2;
  name: Record<string, string>;
  tagline: Record<string, string>;
  minPrice: string;
  image: string;
}

export const HOMEPAGE_SERVICES: ReadonlyArray<ServiceEntry> = [
  // Tier 1 — large cards (most popular / high-margin)
  {
    slug: 'ppf-shield-wrapping',
    tier: 1,
    name: { ka: 'PPF დამცავი ფირი', ru: 'Защитная плёнка PPF', en: 'PPF Paint Protection Film' },
    tagline: {
      ka: 'უხილავი დაცვა ქვებისგან, ნაკაწრებისგან და UV — 10 წლის გარანტია',
      ru: 'Невидимая защита от сколов, царапин и UV — гарантия 10 лет',
      en: 'Invisible protection from chips, scratches & UV — 10-year warranty',
    },
    minPrice: '350',
    image: '/images/tild3336-3336-4337-b939-633732303363__2023-07-04_231140.webp',
  },
  {
    slug: 'vinyl-wrapping',
    tier: 1,
    name: { ka: 'ფერის შეცვლა ფირით', ru: 'Оклейка цветной плёнкой', en: 'Color Change Wrap' },
    tagline: {
      ka: 'ფერების და ფაქტურების მრავალფეროვანი არჩევანი',
      ru: 'Смена цвета кузова — тысячи цветов и фактур на выбор',
      en: 'Color change — thousands of colors & finishes to choose from',
    },
    minPrice: '300',
    image: '/images/vinyl_card_urus.webp',
  },
  // Tier 2 — compact cards
  {
    slug: 'polishing',
    tier: 2,
    name: { ka: 'მანქანის გაპრიალება', ru: 'Полировка автомобиля', en: 'Car Polishing' },
    tagline: {
      ka: 'ნაკაწრების აღმოფხვრა და ორიგინალი ბზინვარების აღდგენა',
      ru: 'Удаление царапин и восстановление заводского блеска',
      en: 'Scratch removal & factory gloss restoration',
    },
    minPrice: '690',
    image: '/images/tild3962-3733-4364-b039-326430393066__pxl_20240229_1140148.webp',
  },
  {
    slug: 'ceramiccoating',
    tier: 2,
    name: { ka: 'კერამიკული საფარი', ru: 'Керамическое покрытие', en: 'Ceramic Coating' },
    tagline: {
      ka: '9H ნანოსაფარი — ჰიდროფობიური ეფექტი და 3-5 წლის დაცვა',
      ru: '9H нано-покрытие — гидрофобный эффект и защита 3-5 лет',
      en: '9H nano-coating — hydrophobic effect & 3-5 year protection',
    },
    minPrice: '500',
    image: '/images/tild3834-6636-4839-a464-316639393139__ceramic.webp',
  },
  {
    slug: 'carwash',
    tier: 2,
    name: { ka: 'დეტეილინგ რეცხვა', ru: 'Детейлинг мойка', en: 'Detailing Wash' },
    tagline: {
      ka: 'პროფესიონალური ხელით რეცხვა უსაფრთხო მასალებით',
      ru: 'Профессиональная ручная мойка безопасными средствами',
      en: 'Professional hand wash with safe products',
    },
    minPrice: '40',
    image: '/images/tild3933-3539-4638-b533-333037613266__pxl_20240229_1012434.webp',
  },
  {
    slug: 'interior-cleaning',
    tier: 2,
    name: { ka: 'სალონის ქიმწმენდა', ru: 'Химчистка салона', en: 'Interior Cleaning' },
    tagline: {
      ka: 'ღრმა გაწმენდა და დეზინფექცია პროფესიონალური აღჭურვილობით',
      ru: 'Глубокая чистка и дезинфекция профессиональным оборудованием',
      en: 'Deep cleaning & disinfection with professional equipment',
    },
    minPrice: '400',
    image: '/images/tild3537-6262-4263-b866-366463303665__2023-07-04_231132.webp',
  },
  {
    slug: 'auto-glass-tinting',
    tier: 1,
    name: { ka: 'მინების დაბურვა', ru: 'Тонировка стёкол', en: 'Window Tinting' },
    tagline: {
      ka: 'UV დაცვა, კონფიდენციალობა და ინტერიერის გამაგრილებელი ეფექტი',
      ru: 'UV-защита, приватность и охлаждающий эффект в салоне',
      en: 'UV protection, privacy & cooling effect for your interior',
    },
    minPrice: '130',
    image: '/images/tild6331-6163-4761-b632-316634653631__2023-07-04_231155.webp',
  },
  {
    slug: 'car-soundproofing',
    tier: 2,
    name: { ka: 'ხმის იზოლაცია', ru: 'Шумоизоляция', en: 'Car Soundproofing' },
    tagline: {
      ka: 'გარე ხმაურის შემცირება და მგზავრობის კომფორტის გაუმჯობესება',
      ru: 'Снижение внешнего шума и повышение комфорта езды',
      en: 'Reduce road noise & improve cabin comfort',
    },
    minPrice: '600',
    image: '/images/tild3133-3337-4161-b336-333030376435__noroot.webp',
  },
  {
    slug: 'windshield-repair',
    tier: 2,
    name: { ka: 'ავტომინების შეკეთება და შლიფოვკა', ru: 'Ремонт и шлифовка автостекол', en: 'Glass Repair & Grinding' },
    tagline: {
      ka: 'ნაკენჭარის შეკეთება, პოლირება და შლიფოვკა — საქარე და გვერდითი',
      ru: 'Ремонт сколов, полировка и шлифовка — лобовое и боковые',
      en: 'Chip repair, polishing & grinding — windshield and side windows',
    },
    minPrice: '60',
    image: '/images/tild3030-6636-4036-a564-373666356236__2023-07-04_231151.webp',
  },
] as const;

const SECTION_TITLE: Record<string, string> = {
  ka: 'ჩვენი სერვისები',
  ru: 'Наши услуги',
  en: 'Our Services',
};

const SECTION_SUBTITLE: Record<string, string> = {
  ka: 'ავტომობილის დაცვის, ვიზუალის გაუმჯობესებისა და პროფესიონალური მოვლის ძირითადი სერვისები თბილისში',
  ru: 'Полный спектр детейлинг и технических услуг для вашего автомобиля',
  en: 'Full range of detailing and technical services for your car',
};

const CTA_TEXT: Record<string, string> = {
  ka: 'დაწვრილებით',
  ru: 'Подробнее',
  en: 'Learn more',
};

const PRICE_FROM: Record<string, string> = {
  ka: '-დან',
  ru: 'от',
  en: 'from',
};

function getLangPrefix(lang: string): string {
  if (lang === 'ru') return 'ru/';
  if (lang === 'en') return 'en/';
  return '';
}

function formatPrice(lang: string, minPrice: string): string {
  const from = PRICE_FROM[lang] ?? PRICE_FROM['en'];
  if (lang === 'ka') {
    return `${minPrice} ₾${from}`;
  }
  return `${from} ${minPrice} ₾`;
}

function renderTier1Card(service: ServiceEntry, lang: string, langPrefix: string): string {
  const name = service.name[lang] ?? service.name['en'];
  const tagline = service.tagline[lang] ?? service.tagline['en'];
  const price = formatPrice(lang, service.minPrice);
  const cta = CTA_TEXT[lang] ?? CTA_TEXT['en'];
  const href = `/${langPrefix}${service.slug}`;

  return `<a href="${href}" style="position:relative; display:block; height:360px; border-radius:var(--ba-radius-xl); overflow:hidden; text-decoration:none; transition:transform var(--ba-duration-normal) var(--ba-ease-default);" class="ba-service-card ba-service-card--tier1">
        <img src="${service.image}" alt="${name}" loading="lazy" width="480" height="320" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;">
        <div style="position:absolute; inset:0; background:var(--ba-overlay-t1);"></div>
        <div style="position:relative; z-index:var(--ba-z-card); padding:40px 32px; display:flex; flex-direction:column; justify-content:flex-end; height:100%; box-sizing:border-box;">
          <h3 class="ba-service-card__name ba-service-card__name--t1" style="color:var(--ba-color-text); font-weight:var(--ba-font-weight-bold); margin:0 0 12px; font-family:var(--ba-font-family);">${name}</h3>
          <p class="ba-service-card__tagline ba-service-card__tagline--t1" style="color:var(--ba-color-text-80); margin:0 0 16px; line-height:1.5; font-family:var(--ba-font-family);">${tagline}</p>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span class="ba-service-card__price ba-service-card__price--t1" style="color:var(--ba-color-accent); font-weight:var(--ba-font-weight-bold); font-family:var(--ba-font-family);">${price}</span>
            <span class="ba-service-card__cta ba-service-card__cta--t1" style="color:var(--ba-color-accent); font-family:var(--ba-font-family);">${cta} →</span>
          </div>
        </div>
      </a>`;
}

function renderTier2Card(service: ServiceEntry, lang: string, langPrefix: string): string {
  const name = service.name[lang] ?? service.name['en'];
  const tagline = service.tagline[lang] ?? service.tagline['en'];
  const price = formatPrice(lang, service.minPrice);
  const cta = CTA_TEXT[lang] ?? CTA_TEXT['en'];
  const href = `/${langPrefix}${service.slug}`;

  return `<a href="${href}" style="position:relative; display:block; height:280px; border-radius:var(--ba-radius-xl); overflow:hidden; text-decoration:none; transition:transform var(--ba-duration-normal) var(--ba-ease-default);" class="ba-service-card ba-service-card--tier2">
        <img src="${service.image}" alt="${name}" loading="lazy" width="480" height="320" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;">
        <div style="position:absolute; inset:0; background:var(--ba-overlay-t2);"></div>
        <div style="position:relative; z-index:var(--ba-z-card); padding:24px 20px; display:flex; flex-direction:column; justify-content:flex-end; height:100%; box-sizing:border-box;">
          <h3 class="ba-service-card__name ba-service-card__name--t2" style="color:var(--ba-color-text); font-weight:var(--ba-font-weight-bold); margin:0 0 8px; font-family:var(--ba-font-family);">${name}</h3>
          <p class="ba-service-card__tagline ba-service-card__tagline--t2" style="color:var(--ba-color-text-75); margin:0 0 12px; line-height:1.4; font-family:var(--ba-font-family);">${tagline}</p>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span class="ba-service-card__price ba-service-card__price--t2" style="color:var(--ba-color-accent); font-weight:var(--ba-font-weight-bold); font-family:var(--ba-font-family);">${price}</span>
            <span class="ba-service-card__cta ba-service-card__cta--t2" style="color:var(--ba-color-accent); font-family:var(--ba-font-family);">${cta} →</span>
          </div>
        </div>
      </a>`;
}

export function generateServicesGridHtml(lang: string): string {
  const langPrefix = getLangPrefix(lang);
  const title = SECTION_TITLE[lang] ?? SECTION_TITLE['en'];
  const subtitle = SECTION_SUBTITLE[lang] ?? SECTION_SUBTITLE['en'];

  const tier1Services = HOMEPAGE_SERVICES.filter((s) => s.tier === 1);
  const tier2Services = HOMEPAGE_SERVICES.filter((s) => s.tier === 2);

  const tier1Cards = tier1Services
    .map((s) => renderTier1Card(s, lang, langPrefix))
    .join('\n      ');

  const tier2Cards = tier2Services
    .map((s) => renderTier2Card(s, lang, langPrefix))
    .join('\n      ');

  return `<div id="ba-services-grid" name="services" style="background-color:var(--ba-color-bg); padding:60px 0 80px;">
  <div style="max-width:1200px; margin:0 auto; padding:0 20px;">
    <h2 class="ba-services__heading" style="color:var(--ba-color-text); font-weight:var(--ba-font-weight-bold); margin:0 0 12px; text-align:center; font-family:var(--ba-font-family);">${title}</h2>
    <p class="ba-services__subtitle" style="color:var(--ba-color-text-subtle); margin:0 0 48px; text-align:center; line-height:1.5; font-family:var(--ba-font-family);">${subtitle}</p>

    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-bottom:24px;" class="ba-services-tier1">
      ${tier1Cards}
    </div>

    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:24px;" class="ba-services-tier2">
      ${tier2Cards}
    </div>
  </div>

  <style>
    .ba-services__heading { font-size: 36px; }
    .ba-services__subtitle { font-size: 18px; }
    .ba-service-card__name--t1 { font-size: 24px; }
    .ba-service-card__tagline--t1 { font-size: 16px; }
    .ba-service-card__price--t1 { font-size: 20px; }
    .ba-service-card__cta--t1 { font-size: 14px; }
    .ba-service-card__name--t2 { font-size: 20px; }
    .ba-service-card__tagline--t2 { font-size: 14px; }
    .ba-service-card__price--t2 { font-size: 18px; }
    .ba-service-card__cta--t2 { font-size: 13px; }
    @media screen and (max-width: 1024px) {
      .ba-services-tier1 { grid-template-columns: 1fr 1fr !important; }
    }
    @media screen and (max-width: 960px) {
      .ba-services__heading { font-size: 32px; }
      .ba-services__subtitle { font-size: 16px; }
      .ba-service-card__name--t1 { font-size: 22px; }
      .ba-service-card__tagline--t1 { font-size: 15px; }
      .ba-service-card__price--t1 { font-size: 18px; }
      .ba-service-card__name--t2 { font-size: 18px; }
      .ba-service-card__price--t2 { font-size: 16px; }
      .ba-services-tier2 { grid-template-columns: 1fr 1fr !important; }
    }
    @media screen and (max-width: 640px) {
      .ba-services__heading { font-size: 28px; }
      .ba-services__subtitle { font-size: 15px; }
      .ba-service-card__name--t1 { font-size: 20px; }
      .ba-service-card__tagline--t1 { font-size: 14px; }
      .ba-service-card__price--t1 { font-size: 18px; }
      .ba-service-card__name--t2 { font-size: 18px; }
      .ba-service-card__price--t2 { font-size: 16px; }
      .ba-services-tier1 { grid-template-columns: 1fr !important; }
      .ba-services-tier2 { grid-template-columns: 1fr !important; }
    }
    .ba-service-card { text-decoration: none !important; }
    .ba-service-card:hover { transform: scale(1.02); }
  </style>
</div>`;
}
