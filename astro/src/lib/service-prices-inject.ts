/**
 * Injects Sanity pricing data into service pages.
 *
 * EN service pages already have a t681 price block → replace rows in place.
 * KA / RU service pages have no price block → inject full section before footer.
 */
import type { PricingPage, PriceSection, PriceLineItem } from './sanity';

type Lang = 'ru' | 'ka' | 'en';

/** Maps top-level service page slug to the Sanity pricingPage section key. */
const SLUG_TO_SECTION: Record<string, string> = {
  polishing: 's0',
  ceramiccoating: 's1',
  'interior-cleaning': 's2',

  'windshield-repair': 's5',
  'ppf-shield-wrapping': 's6',
  'vinyl-wrapping': 's7',
  'auto-glass-tinting': 's8',
  'car-soundproofing': 's9',
  'computer-diagnostics': 's10',
};

/** Footer rec IDs per language — insertion point for pages without existing prices. */
const FOOTER_IDS: Record<Lang, readonly string[]> = {
  ru: ['rec603526076'],
  ka: ['rec607481980', 'rec607472568', 'rec2091645713', 'rec603526076'],
  en: [],
};

function esc(s: string): string {
  return s
    .replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sectionTitle(section: PriceSection, lang: Lang): string {
  if (lang === 'ru') return section.titleRu ?? '';
  if (lang === 'ka') return section.titleKa ?? '';
  return section.titleEn ?? '';
}

function itemName(item: PriceLineItem, lang: Lang): string {
  const name = lang === 'ru' ? item.nameRu : lang === 'ka' ? item.nameKa : item.nameEn;
  return name || item.nameRu || '';
}

function localizePrice(raw: string, lang: Lang): string {
  if (lang === 'ru') return raw;
  // "от 7500 Gel" → "from 7500 Gel" (EN) / "7500 Gel-დან" (KA)
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

function buildRows(section: PriceSection, lang: Lang): string {
  const rows = (section.items ?? []).map(item => buildRow(item, lang)).join('');
  return `<div id="prices" class="ba-price-section"><div class="ba-price-list">${rows}</div></div>`;
}

/**
 * Replaces the rows inside the existing t681 <div class="t-container"> block.
 * Works for both native type=681 and alias type=121 (data-alias-record-type="681") blocks.
 */
function replaceExistingRows(html: string, section: PriceSection, lang: Lang): string {
  const firstRowIdx = html.indexOf('t681__row');
  if (firstRowIdx < 0) return html;

  const containerMarker = '<div class="t-container">';
  const containerStart = html.lastIndexOf(containerMarker, firstRowIdx);
  if (containerStart < 0) return html;

  // Walk forward from containerStart to find matching </div>
  let depth = 0;
  let pos = containerStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        const containerEnd = nextClose + '</div>'.length;
        const newRows = buildRows(section, lang);
        return html.slice(0, containerStart) + `${containerMarker}${newRows}</div>` + html.slice(containerEnd);
      }
      depth--;
      pos = nextClose;
    }
  }
  return html;
}

/**
 * Builds a full price section (t017 heading + t681 table) for injection into pages
 * that don't have an existing price block.
 */
function buildFullSection(section: PriceSection, lang: Lang): string {
  const id = 'sanity-svc-s0';
  const title = esc(sectionTitle(section, lang));
  const rows = (section.items ?? []).map(item => buildRow(item, lang)).join('');
  return [
    `<div id="${id}" class="r t-rec" style="padding-top:60px;padding-bottom:60px;background-color:#000000;" data-record-type="681" data-bg-color="#000000">`,
    `<div class="t-container"><div id="prices" class="ba-price-section">`,
    `<h2 class="ba-price-heading">${title}</h2>`,
    `<div class="ba-price-list">${rows}</div>`,
    `</div></div></div>`,
  ].join('');
}

/**
 * Injects a price section before the first matching footer ID.
 */
function insertBeforeFooter(html: string, block: string, footerIds: readonly string[]): string {
  for (const fid of footerIds) {
    const idx = html.indexOf(`id="${fid}"`);
    if (idx >= 0) {
      const divStart = html.lastIndexOf('<div', idx);
      return html.slice(0, divStart) + block + html.slice(divStart);
    }
  }
  return html + block;
}

/**
 * Main entry point: injects service-page prices from Sanity CMS.
 *
 * @param html      Page HTML (after injectSanityData)
 * @param pricing   Full pricingPage document from Sanity
 * @param baseSlug  Slug without lang prefix (e.g. "polishing")
 * @param lang      Page language
 */
export function injectServicePrices(
  html: string,
  pricing: PricingPage | null,
  baseSlug: string,
  lang: Lang
): string {
  const sectionKey = SLUG_TO_SECTION[baseSlug];
  if (!sectionKey || !pricing?.sections?.length) return html;

  const section = pricing.sections.find(s => s._key === sectionKey);
  if (!section?.items?.length) return html;

  if (html.includes('t681__row')) {
    // All service pages have an existing price block (native type=681 or alias type=121)
    return replaceExistingRows(html, section, lang);
  }

  // Fallback: no price block found — inject full section before footer
  const fullSection = buildFullSection(section, lang);
  return insertBeforeFooter(html, fullSection, FOOTER_IDS[lang]);
}
