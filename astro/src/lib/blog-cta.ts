/**
 * Generates a contextual service promo CTA block for blog articles.
 * Each blog article is mapped to its parent service (via BLOG_SERVICE_MAP)
 * and gets a styled CTA block linking to that service page.
 *
 * Returns empty string for non-blog pages or articles without a parent service.
 */

import { BLOG_SERVICE_MAP } from './related-services';

// ---------------------------------------------------------------------------
// 1. Service headings (3 languages)
// ---------------------------------------------------------------------------

const CTA_HEADINGS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  polishing: {
    ru: 'Закажите полировку у профессионалов',
    ka: 'შეუკვეთეთ პოლირება პროფესიონალებს',
    en: 'Order professional polishing',
  },
  ceramiccoating: {
    ru: 'Закажите нанесение керамики у профессионалов',
    ka: 'შეუკვეთეთ კერამიკული საფარი პროფესიონალებს',
    en: 'Order professional ceramic coating',
  },
  'ppf-shield-wrapping': {
    ru: 'Закажите оклейку PPF у профессионалов',
    ka: 'შეუკვეთეთ PPF დაფარვა პროფესიონალებს',
    en: 'Order professional PPF wrapping',
  },
  'vinyl-wrapping': {
    ru: 'Закажите оклейку плёнкой у профессионалов',
    ka: 'შეუკვეთეთ ფირით დაფარვა პროფესიონალებს',
    en: 'Order professional vinyl wrapping',
  },
  'auto-glass-tinting': {
    ru: 'Закажите тонировку у профессионалов',
    ka: 'შეუკვეთეთ ტონირება პროფესიონალებს',
    en: 'Order professional window tinting',
  },
  'windshield-repair': {
    ru: 'Закажите ремонт стекла у профессионалов',
    ka: 'შეუკვეთეთ მინის შეკეთება პროფესიონალებს',
    en: 'Order professional glass repair',
  },
  'interior-cleaning': {
    ru: 'Закажите химчистку у профессионалов',
    ka: 'შეუკვეთეთ ქიმწმენდა პროფესიონალებს',
    en: 'Order professional interior cleaning',
  },
  'car-soundproofing': {
    ru: 'Закажите шумоизоляцию у профессионалов',
    ka: 'შეუკვეთეთ ხმის იზოლაცია პროფესიონალებს',
    en: 'Order professional soundproofing',
  },
  'computer-diagnostics': {
    ru: 'Закажите диагностику у профессионалов',
    ka: 'შეუკვეთეთ დიაგნოსტიკა პროფესიონალებს',
    en: 'Order professional diagnostics',
  },
};

const CTA_DESCRIPTION: Readonly<Record<string, string>> = {
  ru: 'Наша детейлинг студия качественно решит вашу задачу',
  ka: 'ჩვენი დეტეილინგ სტუდია ხარისხიანად გადაწყვეტს თქვენს ამოცანას',
  en: 'Our detailing studio will handle your task with quality',
};

const CTA_BUTTON: Readonly<Record<string, string>> = {
  ru: 'Записаться на консультацию',
  ka: 'კონსულტაციაზე ჩაწერა',
  en: 'Book a consultation',
};

// ---------------------------------------------------------------------------
// 2. Lang prefix helper
// ---------------------------------------------------------------------------

function getLangPrefix(lang: string): string {
  if (lang === 'ru') return 'ru/';
  if (lang === 'en') return 'en/';
  return '';
}

// ---------------------------------------------------------------------------
// 3. Block style (scoped CSS, no inline font-size)
// ---------------------------------------------------------------------------

const BLOCK_STYLE = `<style>
.ba-blog-cta__title{font-size:30px;color:var(--ba-color-accent);font-weight:var(--ba-font-weight-bold);margin:0 0 16px;font-family:var(--ba-font-family);line-height:1.3}
.ba-blog-cta__descr{font-size:18px;line-height:1.5;color:var(--ba-color-text-muted);margin:0 0 32px;font-family:var(--ba-font-family)}
.ba-blog-cta__btn{display:inline-block;font-size:16px;background:var(--ba-color-accent);color:#000;font-weight:var(--ba-font-weight-semibold);padding:14px 40px;border-radius:var(--ba-radius-2xl);text-decoration:none;font-family:var(--ba-font-family);transition:background var(--ba-duration-fast) var(--ba-ease-default);box-shadow:var(--ba-shadow-medium)}
.ba-blog-cta__btn:hover{background:var(--ba-color-accent-hover)}
@media screen and (max-width:960px){.ba-blog-cta__title{font-size:28px}.ba-blog-cta__descr{font-size:16px}}
@media screen and (max-width:640px){#ba-blog-cta{padding:48px 0!important;margin:32px 0!important}.ba-blog-cta__title{font-size:24px}.ba-blog-cta__descr{font-size:15px}.ba-blog-cta__btn{padding:12px 32px}}
@media(prefers-reduced-motion:reduce){.ba-blog-cta__btn{transition:none}}
</style>`;

// ---------------------------------------------------------------------------
// 4. Main generator
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Generic CTA for articles without a parent service mapping
// ---------------------------------------------------------------------------

const GENERIC_CTA_TITLE: Readonly<Record<string, string>> = {
  ru: 'Закажите детейлинг у профессионалов',
  ka: 'შეუკვეთეთ დეტეილინგი პროფესიონალებს',
  en: 'Order professional detailing',
};

// ---------------------------------------------------------------------------
// 5. Main generator
// ---------------------------------------------------------------------------

/**
 * Generate a contextual service promo CTA block for a blog article.
 * For articles mapped to a service — links to that service page.
 * For generic articles — links to the homepage with a generic heading.
 * Returns empty string for non-blog pages.
 */
export function generateBlogCtaHtml(lang: string, baseSlug: string): string {
  if (!baseSlug.startsWith('blog/')) return '';

  const parentService = BLOG_SERVICE_MAP[baseSlug];

  // Determine title and link
  let title: string;
  let href: string;
  const langPrefix = getLangPrefix(lang);

  if (parentService && CTA_HEADINGS[parentService]) {
    const headings = CTA_HEADINGS[parentService];
    title = headings[lang] ?? headings['en'];
    href = `/${langPrefix}${parentService}`;
  } else {
    // Generic CTA for unmapped articles — links to homepage
    title = GENERIC_CTA_TITLE[lang] ?? GENERIC_CTA_TITLE['en'];
    href = langPrefix ? `/${langPrefix}` : '/';
  }

  const description = CTA_DESCRIPTION[lang] ?? CTA_DESCRIPTION['en'];
  const buttonText = CTA_BUTTON[lang] ?? CTA_BUTTON['en'];

  return `<div id="ba-blog-cta" style="padding:64px 0;background:var(--ba-color-surface);border-radius:var(--ba-radius-xl);margin:48px 0;">
  <div style="max-width:800px;margin:0 auto;padding:0 24px;text-align:center;">
    <h2 class="ba-blog-cta__title">${title}</h2>
    <p class="ba-blog-cta__descr">${description}</p>
    <a href="${href}" class="ba-blog-cta__btn">${buttonText}</a>
  </div>
  ${BLOCK_STYLE}
</div>`;
}
