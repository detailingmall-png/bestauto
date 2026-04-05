/**
 * Generates HTML sections for studio location pages.
 * Follows the same patterns as services-grid.ts and related-services.ts.
 */
import type { LocationData } from '../data/location-data';
import { META_OVERRIDES } from '../data/meta-overrides';
import { getHomepageHeadCss } from './shared-blocks';
import { renderFaqAccordion, type FaqAccordionItem } from './faq-accordion';

const BASE_URL = 'https://bestauto.ge';

/**
 * Builds the <head> content string for a location page.
 */
export function buildLocationHeadContent(
  lang: string,
  baseSlug: string,
  pageTitle: string,
): string {
  const meta = META_OVERRIDES[`${lang}/${baseSlug}`];
  const ogTitle = meta?.ogTitle ?? pageTitle;
  const url = lang === 'ka'
    ? `${BASE_URL}/${baseSlug}`
    : `${BASE_URL}/${lang}/${baseSlug}`;

  const parts: string[] = [
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `<title>${pageTitle}</title>`,
  ];
  if (meta?.description) {
    parts.push(`<meta name="description" content="${meta.description}" />`);
  }
  parts.push(`<meta property="og:title" content="${ogTitle}" />`);
  if (meta?.ogDescription) {
    parts.push(`<meta property="og:description" content="${meta.ogDescription}" />`);
  }
  parts.push(`<meta property="og:type" content="website" />`);
  parts.push(`<meta property="og:url" content="${url}" />`);
  parts.push('<link rel="stylesheet" href="/css/tilda-grid-3.0.min.css" type="text/css" />');
  parts.push('<link rel="stylesheet" href="/css/tilda-animation-2.0.min.css" type="text/css" />');
  parts.push('<link rel="stylesheet" href="/css/fonts-tildasans.css" type="text/css" />');
  parts.push(getHomepageHeadCss(lang));

  return parts.join('\n');
}

const SERVICES_LABEL: Readonly<Record<string, string>> = {
  ka: 'ხელმისაწვდომი სერვისები',
  ru: 'Доступные услуги',
  en: 'Available Services',
};

const BOOK_LABEL: Readonly<Record<string, string>> = {
  ka: 'ჩაეწერეთ ამ სტუდიაში',
  ru: 'Записаться в эту студию',
  en: 'Book at This Studio',
};

const PARKING_LABEL: Readonly<Record<string, string>> = {
  ka: 'პარკინგი და მისასვლელი',
  ru: 'Парковка и подъезд',
  en: 'Parking & Access',
};

const FAQ_LABEL: Readonly<Record<string, string>> = {
  ka: 'ხშირად დასმული კითხვები',
  ru: 'Часто задаваемые вопросы',
  en: 'Frequently Asked Questions',
};

const MAP_LABEL: Readonly<Record<string, string>> = {
  ka: 'რუკაზე ნახვა',
  ru: 'Показать на карте',
  en: 'View on Map',
};

const CALL_LABEL: Readonly<Record<string, string>> = {
  ka: 'დარეკვა',
  ru: 'Позвонить',
  en: 'Call',
};

const OTHER_STUDIO_LABEL: Readonly<Record<string, string>> = {
  ka: 'სხვა სტუდია',
  ru: 'Другая студия',
  en: 'Other Studio',
};

function buildUrl(lang: string, slug: string): string {
  if (lang === 'ka') return slug ? `${BASE_URL}/${slug}` : `${BASE_URL}/`;
  return slug ? `${BASE_URL}/${lang}/${slug}` : `${BASE_URL}/${lang}`;
}

/**
 * Generates the main content HTML for a location page.
 */
export function generateLocationContent(
  location: LocationData,
  otherLocation: LocationData,
  lang: string,
): string {
  const name = location.name[lang] ?? location.name.en;
  const address = location.address[lang] ?? location.address.en;
  const hours = location.hours[lang] ?? location.hours.en;
  const desc = location.description[lang] ?? location.description.en;
  const parking = location.parking[lang] ?? location.parking.en;
  const phone = location.phone;
  const otherName = otherLocation.name[lang] ?? otherLocation.name.en;
  const otherSlug = `locations/${otherLocation.slug}`;

  const heroTitle = lang === 'ka'
    ? `${name} — დეტეილინგ სტუდია თბილისში`
    : lang === 'ru'
      ? `${name} — Детейлинг студия в Тбилиси`
      : `${name} — Car Detailing Studio in Tbilisi`;

  const sections: string[] = [];

  // Hero section
  sections.push(`
<div class="r t-rec" style="padding-top:120px;padding-bottom:60px;background-color:var(--ba-color-bg);">
  <div class="t-container" style="max-width:1200px;margin:0 auto;padding:0 20px;">
    <h1 style="color:var(--ba-color-text);font-size:36px;font-weight:700;font-family:'TildaSans',Arial,sans-serif;margin:0 0 16px;line-height:1.25;">${heroTitle}</h1>
    <p style="color:var(--ba-color-text-muted);font-size:18px;font-family:'TildaSans',Arial,sans-serif;margin:0;line-height:1.5;">${address}</p>
  </div>
</div>`);

  // NAP (Name, Address, Phone) + Hours
  sections.push(`
<div class="r t-rec" style="padding-top:48px;padding-bottom:48px;background-color:var(--ba-color-bg);">
  <div class="t-container" style="max-width:1200px;margin:0 auto;padding:0 20px;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px;">
      <div>
        <div style="color:var(--ba-color-accent);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-family:'TildaSans',Arial,sans-serif;">
          ${lang === 'ka' ? 'მისამართი' : lang === 'ru' ? 'Адрес' : 'Address'}
        </div>
        <div style="color:var(--ba-color-text);font-size:18px;font-family:'TildaSans',Arial,sans-serif;line-height:1.5;">${address}</div>
      </div>
      <div>
        <div style="color:var(--ba-color-accent);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-family:'TildaSans',Arial,sans-serif;">
          ${lang === 'ka' ? 'ტელეფონი' : lang === 'ru' ? 'Телефон' : 'Phone'}
        </div>
        <a href="tel:${phone}" style="color:var(--ba-color-text);font-size:18px;font-family:'TildaSans',Arial,sans-serif;text-decoration:none;">${phone}</a>
      </div>
      <div>
        <div style="color:var(--ba-color-accent);font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-family:'TildaSans',Arial,sans-serif;">
          ${lang === 'ka' ? 'სამუშაო საათები' : lang === 'ru' ? 'Часы работы' : 'Working Hours'}
        </div>
        <div style="color:var(--ba-color-text);font-size:18px;font-family:'TildaSans',Arial,sans-serif;">${hours}</div>
      </div>
    </div>
    <div style="margin-top:32px;display:flex;gap:16px;flex-wrap:wrap;">
      <a href="${location.mapsUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:12px 28px;background:var(--ba-color-accent);color:var(--ba-color-bg);font-size:15px;font-weight:600;font-family:'TildaSans',Arial,sans-serif;border-radius:20px;text-decoration:none;">${MAP_LABEL[lang] ?? 'View on Map'}</a>
      <a href="tel:${phone}" style="display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border:1px solid rgba(255,255,255,0.2);color:var(--ba-color-text);font-size:15px;font-weight:600;font-family:'TildaSans',Arial,sans-serif;border-radius:20px;text-decoration:none;">${CALL_LABEL[lang] ?? 'Call'}</a>
    </div>
  </div>
</div>`);

  // Description + Parking
  sections.push(`
<div class="r t-rec" style="padding-top:48px;padding-bottom:48px;background-color:var(--ba-color-bg);">
  <div class="t-container" style="max-width:1200px;margin:0 auto;padding:0 20px;">
    <div style="max-width:800px;">
      <p style="color:rgba(255,255,255,0.85);font-size:17px;font-family:'TildaSans',Arial,sans-serif;line-height:1.65;margin:0 0 32px;">${desc}</p>
      <h2 style="color:var(--ba-color-text);font-size:24px;font-weight:700;font-family:'TildaSans',Arial,sans-serif;margin:0 0 12px;">${PARKING_LABEL[lang] ?? 'Parking'}</h2>
      <p style="color:var(--ba-color-text-muted);font-size:16px;font-family:'TildaSans',Arial,sans-serif;line-height:1.6;margin:0;">${parking}</p>
    </div>
  </div>
</div>`);

  // Google Maps embed
  sections.push(`
<div class="r t-rec" style="padding-top:0;padding-bottom:48px;background-color:var(--ba-color-bg);">
  <div class="t-container" style="max-width:1200px;margin:0 auto;padding:0 20px;">
    <div style="border-radius:12px;overflow:hidden;aspect-ratio:16/9;max-height:450px;">
      <iframe src="${location.mapsEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${name}"></iframe>
    </div>
  </div>
</div>`);

  // Available Services
  sections.push(`
<div class="r t-rec" style="padding-top:48px;padding-bottom:48px;background-color:var(--ba-color-bg);">
  <div class="t-container" style="max-width:1200px;margin:0 auto;padding:0 20px;">
    <h2 style="color:var(--ba-color-text);font-size:28px;font-weight:700;font-family:'TildaSans',Arial,sans-serif;margin:0 0 32px;text-align:center;">${SERVICES_LABEL[lang] ?? 'Services'}</h2>
    ${generateServicesList(lang)}
  </div>
</div>`);

  // FAQ
  if (location.faqs.length > 0) {
    const faqItems: ReadonlyArray<FaqAccordionItem> = location.faqs.map((faq) => ({
      question: faq.question[lang] ?? faq.question.en,
      answer: faq.answer[lang] ?? faq.answer.en,
    }));
    const faqTitle = FAQ_LABEL[lang] ?? 'FAQ';
    sections.push(renderFaqAccordion(faqItems, faqTitle, { id: 'loc-faq', paddingY: 48 }));
  }

  // CTA — Book at this studio
  sections.push(`
<div class="r t-rec" style="padding-top:48px;padding-bottom:48px;background-color:var(--ba-color-bg);">
  <div class="t-container" style="max-width:1200px;margin:0 auto;padding:0 20px;text-align:center;">
    <a href="https://wa.me/${location.whatsapp}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;padding:16px 40px;background:var(--ba-color-accent);color:var(--ba-color-bg);font-size:17px;font-weight:600;font-family:'TildaSans',Arial,sans-serif;border-radius:20px;text-decoration:none;box-shadow:var(--ba-shadow-medium);">${BOOK_LABEL[lang] ?? 'Book Now'}</a>
  </div>
</div>`);

  // Other studio link
  sections.push(`
<div class="r t-rec" style="padding-top:32px;padding-bottom:64px;background-color:var(--ba-color-bg);">
  <div class="t-container" style="max-width:1200px;margin:0 auto;padding:0 20px;text-align:center;">
    <p style="color:rgba(255,255,255,0.5);font-size:15px;font-family:'TildaSans',Arial,sans-serif;margin:0 0 12px;">${OTHER_STUDIO_LABEL[lang] ?? 'Other Studio'}:</p>
    <a href="${buildUrl(lang, otherSlug)}" style="color:var(--ba-color-accent);font-size:17px;font-weight:600;font-family:'TildaSans',Arial,sans-serif;text-decoration:none;border-bottom:1px solid transparent;transition:border-color 0.2s;">${otherName}</a>
  </div>
</div>`);

  return sections.join('\n');
}

const SERVICES_LIST: ReadonlyArray<{ slug: string; name: Record<string, string> }> = [
  { slug: 'ppf-shield-wrapping', name: { ka: 'PPF დამცავი ფირი', ru: 'Защитная плёнка PPF', en: 'PPF Paint Protection Film' } },
  { slug: 'ceramiccoating', name: { ka: 'კერამიკული დაფარვა', ru: 'Керамическое покрытие', en: 'Ceramic Coating' } },
  { slug: 'polishing', name: { ka: 'მანქანის პოლირება', ru: 'Полировка автомобиля', en: 'Car Polishing' } },
  { slug: 'vinyl-wrapping', name: { ka: 'ფერის შეცვლა დამცავი ფირით', ru: 'Смена цвета плёнкой', en: 'Color Change Wrap' } },
  { slug: 'auto-glass-tinting', name: { ka: 'მინების დაბურვა', ru: 'Тонировка стёкол', en: 'Window Tinting' } },
  { slug: 'interior-cleaning', name: { ka: 'ქიმწმენდა', ru: 'Химчистка салона', en: 'Interior Cleaning' } },
  { slug: 'carwash', name: { ka: 'მანქანის რეცხვა', ru: 'Детейлинг мойка', en: 'Premium Car Wash' } },
  { slug: 'car-soundproofing', name: { ka: 'ხმის იზოლაცია', ru: 'Шумоизоляция', en: 'Car Soundproofing' } },
  { slug: 'windshield-repair', name: { ka: 'ავტომინების შეკეთება', ru: 'Ремонт автостекол', en: 'Windshield Repair' } },
  { slug: 'computer-diagnostics', name: { ka: 'კომპიუტერული დიაგნოსტიკა', ru: 'Компьютерная диагностика', en: 'Computer Diagnostics' } },
];

function generateServicesList(lang: string): string {
  return `<style>
.ba-loc-svc{display:block;padding:16px 20px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:var(--ba-radius-lg);color:var(--ba-color-text);font-size:15px;font-family:var(--ba-font-family);text-decoration:none;transition:background var(--ba-duration-fast),border-color var(--ba-duration-fast)}
.ba-loc-svc:hover{background:var(--ba-color-accent-faint);border-color:rgba(228,201,126,0.3)}
@media(prefers-reduced-motion:reduce){.ba-loc-svc{transition:none}}
</style>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;">
    ${SERVICES_LIST.map((s) => {
      const href = lang === 'ka' ? `/${s.slug}/` : `/${lang}/${s.slug}/`;
      const name = s.name[lang] ?? s.name.en;
      return `<a href="${href}" class="ba-loc-svc">${name}</a>`;
    }).join('\n    ')}
  </div>`;
}
