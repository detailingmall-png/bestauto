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
  'interior-restoration': 's3',
  'paintless-dent-repair': 's4',
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

function buildRows(section: PriceSection, lang: Lang): string {
  return (section.items ?? []).map(item => {
    const name = esc(itemName(item, lang));
    const price = esc(item.price ?? '');
    const nameStyle = item.isPromo ? ' style="color: rgb(228, 201, 126);"' : '';
    return `<div class="t681__row t-row" style="margin-bottom:40px;"><div class="t-col t-col_3 t-prefix_2"><div class="t681__title t-heading t-heading_sm"${nameStyle}>${name}</div></div><div class="t-col t-col_4 "><div class="t681__tablewrapper"><div class="t681__textwrapper"><div class="t681__descr t-descr t-descr_sm">-------------------------</div></div><div class="t681__pricewrapper"><div class="t681__price t-heading t-heading_sm">${price}</div></div></div></div></div>`;
  }).join('');
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
  const headingId = 'sanity-svc-h0';
  const tableId = 'sanity-svc-p0';
  const title = esc(sectionTitle(section, lang));
  const rows = buildRows(section, lang);

  return [
    `<div id="${headingId}" class="r t-rec t-rec_pt_75 t-rec_pb_0" style="padding-top:75px;padding-bottom:0px;background-color:#000000;" data-record-type="33" data-bg-color="#000000">`,
    `<div class="t017"><div class="t-container t-align_left"><div class="t-col t-col_10 t-prefix_2">`,
    `<h2 class="t017__title t-title t-title_xxs"><span style="color: rgb(228, 201, 126);">${title}</span></h2>`,
    `</div></div></div>`,
    `<style>@media screen and (min-width:480px){#${headingId} .t017__title{font-size:30px;}}</style>`,
    `</div>`,
    `<div id="${tableId}" class="r t-rec t-rec_pt_0 t-rec_pb_120" style="padding-top:0px;padding-bottom:120px;background-color:#000000;" data-animationappear="off" data-record-type="681" data-bg-color="#000000">`,
    `<div class="t681">`,
    `<div class="t-section__container t-container t-container_flex"><div class="t-col t-col_12"><div class="js-block-header-title t-section__title t-title t-title_xs t-align_left"><div style="font-size:30px;line-height:38px;"></div></div></div></div>`,
    `<style>.t-section__descr{max-width:560px;}#${tableId} .t-section__title{margin-bottom:90px;}@media screen and (max-width:960px){#${tableId} .t-section__title{margin-bottom:60px;}}</style>`,
    `<div class="t-container">${rows}</div>`,
    `</div>`,
    `<style>#${tableId} .t681__title{font-size:20px;color:#ffffff;}#${tableId} .t681__descr{color:#ffffff;}#${tableId} .t681__price{font-size:20px;color:#ffffff;}</style>`,
    `</div>`,
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
