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
  return `<div class="ba-price-section"><div class="ba-price-list">${rows}</div></div>`;
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
    `<div id="prices" class="r t-rec" style="padding-top:60px;padding-bottom:60px;background-color:#000000;" data-record-type="681" data-bg-color="#000000">`,
    `<div class="t-container"><div class="ba-price-section">`,
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
 * Adds `id="prices"` to the Tilda wrapper div (e.g. `<div class="t017">`)
 * inside the heading rec block that precedes the t681 price rows.
 * Placing the anchor INSIDE the rec block avoids content-visibility scroll issues.
 */
export function addPricesAnchor(html: string): string {
  const priceIdx = html.indexOf('ba-price-section');
  if (priceIdx < 0) return html;

  // Walk back to find the t681 rec block start: <div id="rec..."
  const before = html.slice(0, priceIdx);
  const recPattern = '<div id="rec';
  const t681RecStart = before.lastIndexOf(recPattern);
  if (t681RecStart < 0) return html;

  // Walk back further to find the preceding rec block (the heading)
  const beforeT681 = html.slice(0, t681RecStart).trimEnd();
  const headingRecStart = beforeT681.lastIndexOf(recPattern);
  if (headingRecStart < 0) return html;

  // Add id="prices" to the Tilda type wrapper (e.g. <div class="t017"> → <div id="prices" class="t017">)
  const tildaWrapperRe = /<div class="(t\d)/;
  const headingContent = html.slice(headingRecStart, t681RecStart);
  const wrapperMatch = headingContent.match(tildaWrapperRe);
  if (!wrapperMatch?.index) return html;

  const insertPos = headingRecStart + wrapperMatch.index;
  return html.slice(0, insertPos) + '<div id="prices" class="' + wrapperMatch[1] + html.slice(insertPos + wrapperMatch[0].length);
}

/**
 * Extracts the full price section (heading + table) from the page HTML.
 * Handles both two-block (Tilda rec pair) and single-block (injected) formats.
 * Returns [extractedHtml, remainingHtml]. If not found returns ['', html].
 */
export function extractPriceSection(html: string): [string, string] {
  const anchor = html.indexOf('id="prices"');
  if (anchor < 0) return ['', html];

  // Find the <div that directly contains id="prices"
  const anchorDiv = html.lastIndexOf('<div', anchor);
  if (anchorDiv < 0) return ['', html];
  const tag = html.slice(anchorDiv, html.indexOf('>', anchorDiv) + 1);

  let blockStart: number;
  let tableBlockStart: number;

  // Single-block (buildFullSection) has class="r t-rec" on the same div as id="prices"
  // Two-block (Tilda) has id="prices" on an inner div like <div id="prices" class="t017">
  if (tag.includes('id="prices"') && tag.includes('t-rec')) {
    // Single-block: id="prices" is on the outer rec div
    blockStart = anchorDiv;
    tableBlockStart = anchorDiv;
  } else {
    // Two-block (Tilda): id="prices" is on an inner div (e.g. <div id="prices" class="t017">)
    // Walk back to find the rec wrapper of the heading block
    const headingRec = html.lastIndexOf('<div id="rec', anchorDiv);
    if (headingRec < 0) return ['', html];
    blockStart = headingRec;

    // Find the next rec block (the price table) — it must contain ba-price-section
    const nextRec = html.indexOf('<div id="rec', headingRec + 10);
    if (nextRec < 0 || !html.slice(nextRec, nextRec + 3000).includes('ba-price-section')) {
      return ['', html];
    }
    tableBlockStart = nextRec;
  }

  // Walk to find closing </div> of the table block
  let depth = 0;
  let pos = tableBlockStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        const blockEnd = nextClose + 6;
        return [
          html.slice(blockStart, blockEnd),
          html.slice(0, blockStart) + html.slice(blockEnd),
        ];
      }
      depth--;
      pos = nextClose;
    }
  }
  return ['', html];
}

/**
 * Extracts the "prices CTA" block — a standalone div.r.t-rec that contains
 * an #contacts button with pricing-related text. Present on ppf / vinyl pages.
 * Returns [extracted, remaining]. If not found returns ['', html].
 */
export function extractPricesCta(html: string): [string, string] {
  // First try the named block (vinyl-wrapping)
  if (html.includes('id="rec-prices-cta"')) {
    const marker = '<div id="rec-prices-cta"';
    const start = html.indexOf(marker);
    if (start >= 0) return extractBlock(html, start);
  }
  // Unnamed CTA block (ppf-shield-wrapping): <div class="r t-rec t-rec_pt_30 t-rec_pb_60">
  // containing href="#contacts" and a t-btnflex button, positioned BEFORE the prices section
  const ctaMarker = 't-rec_pt_30 t-rec_pb_60';
  let pos = 0;
  while (pos < html.length) {
    const idx = html.indexOf(ctaMarker, pos);
    if (idx < 0) break;
    // Verify this block contains href="#contacts" and a CTA button (within 800 chars)
    const snippet = html.slice(idx, idx + 800);
    if (snippet.includes('href="#contacts"') && snippet.includes('t-btnflex__text')) {
      const divStart = html.lastIndexOf('<div', idx);
      if (divStart >= 0) return extractBlock(html, divStart);
    }
    pos = idx + 1;
  }
  return ['', html];
}

function extractBlock(html: string, blockStart: number): [string, string] {
  let depth = 0;
  let pos = blockStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        const blockEnd = nextClose + 6;
        return [
          html.slice(blockStart, blockEnd),
          html.slice(0, blockStart) + html.slice(blockEnd),
        ];
      }
      depth--;
      pos = nextClose;
    }
  }
  return ['', html];
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
    let result = replaceExistingRows(html, section, lang);
    return addPricesAnchor(result);
  }

  // Fallback: no price block found — inject full section before footer
  const fullSection = buildFullSection(section, lang);
  return insertBeforeFooter(html, fullSection, FOOTER_IDS[lang]);
}
