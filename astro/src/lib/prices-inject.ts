/**
 * Replaces Tilda prices page content with live Sanity CMS data.
 *
 * Strategy: keep hero, nav, contacts/footer from Tilda HTML.
 * Replace the t33+t681 price section pairs with Sanity-driven HTML.
 */
import type { PricingPage, PriceSection, PriceLineItem } from './sanity';

type Lang = 'ru' | 'ka' | 'en';

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
  const nameStyle = item.isPromo ? ' style="color: var(--ba-color-accent);"' : '';
  return `<div class="t681__row t-row" style="margin-bottom:40px;"><div class="t-col t-col_3 t-prefix_2"><div class="t681__title t-heading t-heading_sm"${nameStyle}>${name}</div></div><div class="t-col t-col_4 "><div class="t681__tablewrapper"><div class="t681__textwrapper"><div class="t681__descr t-descr t-descr_sm">-------------------------</div></div><div class="t681__pricewrapper"><div class="t681__price t-heading t-heading_sm">${price}</div></div></div></div></div>`;
}

function buildSection(section: PriceSection, idx: number, lang: Lang): string {
  const headingId = `sanity-h${idx}`;
  const tableId = `sanity-p${idx}`;
  const title = esc(sectionTitle(section, lang));
  const rows = (section.items ?? []).map(item => buildRow(item, lang)).join('');
  return [
    `<div id="${headingId}" class="r t-rec t-rec_pt_75 t-rec_pb_0" style="padding-top:75px;padding-bottom:0px;background-color:#000000;" data-record-type="33" data-bg-color="#000000">`,
    `<div class="t017"><div class="t-container t-align_left"><div class="t-col t-col_10 t-prefix_2">`,
    `<h2 class="t017__title t-title t-title_xxs"><span style="color: var(--ba-color-accent);">${title}</span></h2>`,
    `</div></div></div>`,
    `<style>#${headingId} .t017__title{font-size:30px;}@media screen and (max-width:960px){#${headingId} .t017__title{font-size:28px;}}@media screen and (max-width:640px){#${headingId} .t017__title{font-size:24px;}}</style>`,
    `</div>`,
    `<div id="${tableId}" class="r t-rec t-rec_pt_0 t-rec_pb_0" style="padding-top:0px;padding-bottom:0px;background-color:#000000;" data-animationappear="off" data-record-type="681" data-bg-color="#000000">`,
    `<div class="t681">`,
    `<div class="t-section__container t-container t-container_flex"><div class="t-col t-col_12"><div class="js-block-header-title t-section__title t-title t-title_xs t-align_left"><div style="line-height:38px;"></div></div></div></div>`,
    `<style>.t-section__descr{max-width:560px;}#${tableId} .t-section__title{margin-bottom:90px;}@media screen and (max-width:960px){#${tableId} .t-section__title{margin-bottom:60px;}}</style>`,
    `<div class="t-container">${rows}</div>`,
    `</div>`,
    `<style>#${tableId} .t681__title{font-size:20px;color:#ffffff;}#${tableId} .t681__descr{color:#ffffff;}#${tableId} .t681__price{font-size:20px;color:#ffffff;}@media screen and (max-width:960px){#${tableId} .t681__title{font-size:18px;}#${tableId} .t681__price{font-size:18px;}}@media screen and (max-width:640px){#${tableId} .t681__title{font-size:16px;}#${tableId} .t681__price{font-size:16px;}}</style>`,
    `</div>`,
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

  // Generate Sanity-driven price sections
  const generated = pricingPage.sections
    .map((section, i) => buildSection(section, i, lang))
    .join('\n');

  const newMain = main.slice(0, priceStart) + generated + main.slice(priceEnd);
  return rawHtml.slice(0, mainStart) + newMain;
}
