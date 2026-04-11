/**
 * Replaces Tilda prices page content with live Sanity CMS data.
 *
 * Strategy: keep hero, nav, contacts/footer from Tilda HTML.
 * Replace the t33+t681 price section pairs with Sanity-driven HTML.
 */
import type { PricingPage, PriceSection, PriceLineItem } from './sanity';

type Lang = 'ru' | 'ka' | 'en';

/** Reverse mapping: Sanity section _key → service page slug. */
const SECTION_KEY_TO_SLUG: Record<string, string> = {
  s0: 'polishing',
  s1: 'ceramiccoating',
  s2: 'interior-cleaning',
  s5: 'windshield-repair',
  s6: 'ppf-shield-wrapping',
  s7: 'vinyl-wrapping',
  s8: 'auto-glass-tinting',
  s9: 'car-soundproofing',
  s10: 'computer-diagnostics',
};

function esc(s: string): string {
  // Don't re-encode existing HTML entities (e.g. &nbsp; from Sanity/Tilda data)
  return s
    .replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sectionTitle(s: PriceSection, lang: Lang): string {
  if (lang === 'ru') return s.titleRu ?? '';
  if (lang === 'ka') return s.titleKa ?? '';
  return s.titleEn ?? '';
}

function itemName(item: PriceLineItem, lang: Lang): string {
  const name = lang === 'ru' ? item.nameRu : lang === 'ka' ? item.nameKa : item.nameEn;
  // Fall back to RU name if translation is missing
  return name || item.nameRu || '';
}

function localizePrice(raw: string, lang: Lang): string {
  if (lang === 'ru') return raw;
  const m = raw.match(/^от\s+(.+)/);
  if (!m) return raw;
  if (lang === 'en') return `from ${m[1]}`;
  return `${m[1]}-დან`;
}

function buildRow(item: PriceLineItem, lang: Lang): string {
  const name = esc(itemName(item, lang));
  const price = esc(localizePrice(item.price ?? '', lang));
  const cls = item.isPromo ? ' ba-price-row--promo' : '';
  return `<div class="ba-price-row${cls}"><span class="ba-price-name">${name}</span><span class="ba-price-value">${price}</span></div>`;
}

function serviceHref(sectionKey: string, lang: Lang): string {
  const slug = SECTION_KEY_TO_SLUG[sectionKey];
  if (!slug) return '';
  return lang === 'ka' ? `/${slug}` : `/${lang}/${slug}`;
}

function buildSection(section: PriceSection, idx: number, lang: Lang): string {
  const id = `sanity-s${idx}`;
  const title = esc(sectionTitle(section, lang));
  const href = serviceHref(section._key, lang);
  const titleHtml = href
    ? `<a href="${href}" class="ba-price-heading-link">${title}</a>`
    : title;
  const rows = (section.items ?? []).map(item => buildRow(item, lang)).join('');
  return [
    `<div id="${id}" class="r t-rec" style="padding-top:${idx === 0 ? 60 : 48}px;padding-bottom:0;background-color:#000000;" data-record-type="681" data-bg-color="#000000">`,
    `<div class="t-container"><div class="ba-price-section">`,
    `<h2 class="ba-price-heading">${titleHtml}</h2>`,
    `<div class="ba-price-list">${rows}</div>`,
    `</div></div></div>`,
  ].join('');
}

/**
 * Injects Sanity pricing data into a Tilda prices page HTML.
 *
 * Keeps the original hero, navigation, contacts/footer and analytics scripts.
 * Replaces only the t017 section headers and t681 price table blocks.
 */
export function injectPricesData(
  rawHtml: string,
  pricingPage: PricingPage | null,
  lang: Lang
): string {
  if (!pricingPage?.sections?.length) return rawHtml;

  const HEADER_END = '<!--/header-->';
  const headerEndPos = rawHtml.indexOf(HEADER_END);
  if (headerEndPos < 0) return rawHtml;

  const mainStart = headerEndPos + HEADER_END.length;
  const main = rawHtml.slice(mainStart);

  // Find start of first type-33 record wrapper
  const first33Match = /data-record-type="33"/.exec(main);
  if (!first33Match) return rawHtml;
  const pre33 = main.slice(0, first33Match.index);
  const priceStart = pre33.lastIndexOf('<div id="rec');
  if (priceStart < 0) return rawHtml;

  // Find end of last type-681 record: the closing </div></div> before next record
  const all681 = [...main.matchAll(/data-record-type="681"/g)];
  if (!all681.length) return rawHtml;
  const last681Index = all681[all681.length - 1].index!;
  const after681 = main.slice(last681Index);
  const nextRecMatch = /((?:<\/div>\s*){2,})(<div id="rec)/.exec(after681);
  if (!nextRecMatch) return rawHtml;
  const priceEnd = last681Index + nextRecMatch.index + nextRecMatch[1].length;

  // Discontinued service section keys (no longer rendered on prices page)
  const DISCONTINUED_KEYS = new Set(['s3', 's4']);

  // Filter active sections
  const activeSections = pricingPage.sections.filter(s => !DISCONTINUED_KEYS.has(s._key));

  // Reorder: PPF first, then color change, then the rest
  const isPPF = (s: PriceSection) => (s.titleRu ?? '').includes('PPF');
  const isColorChange = (s: PriceSection) =>
    (s.titleRu ?? '').includes('смен') && (s.titleRu ?? '').toLowerCase().includes('цвет');

  const ppfSections = activeSections.filter(isPPF);
  const colorChangeSections = activeSections.filter(isColorChange);
  const otherSections = activeSections.filter(s => !isPPF(s) && !isColorChange(s));

  // Rename PPF section title across all languages
  for (const s of ppfSections) {
    s.titleRu = 'Цены на оклейку защитной пленкой PPF';
    s.titleEn = 'PPF Protective Film Wrapping Prices';
    s.titleKa = 'PPF დამცავი ფირის გადაკვრის ფასები';
  }

  const reordered = [...ppfSections, ...colorChangeSections, ...otherSections];
  const generated = reordered
    .map((section, i) => buildSection(section, i, lang))
    .join('\n');

  const newMain = main.slice(0, priceStart) + generated + main.slice(priceEnd);
  return rawHtml.slice(0, mainStart) + newMain;
}
