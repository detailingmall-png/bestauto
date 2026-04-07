/**
 * Extracts reusable nav and footer blocks from Tilda homepage exports.
 * Used by native Astro pages (e.g., location pages) that need the
 * same navigation and footer as Tilda-generated pages.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { makePathsAbsolute } from './html-extractor';

function loadTildaPage(filename: string): string {
  return readFileSync(
    join(process.cwd(), `../tilda-export/project6825691/${filename}`),
    'utf8'
  );
}

function extractRecordBlock(html: string, recId: string): string {
  const startMarker = `id="${recId}"`;
  const startIdx = html.indexOf(startMarker);
  if (startIdx < 0) return '';
  const divStart = html.lastIndexOf('<div', startIdx);
  let depth = 0;
  let pos = divStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) return html.slice(divStart, nextClose + 6);
      depth--;
      pos = nextClose;
    }
  }
  return '';
}

// ── Homepage Tilda HTML for each language ──
const ruHtml = loadTildaPage('page36438811.html');
const enHtml = loadTildaPage('page36554132.html');
const kaHtml = loadTildaPage('page130343853.html');

// ── Nav blocks (desktop ≥1200px + mobile <1200px, type="257") ──
const NAV_BLOCKS: Readonly<Record<string, readonly [string, string]>> = {
  ru: ['rec588593927', 'rec692949103'],
  en: ['rec590463209', 'rec590463210'],
  ka: ['rec2091645363', 'rec2091645373'],
};

// ── Footer blocks (copyright bar only; Tilda sticky CTA removed — ba-sticky-cta provides it) ──
const FOOTER_BLOCKS: Readonly<Record<string, readonly string[]>> = {
  ru: ['rec603526076'],
  en: ['rec607472568'],
  ka: ['rec2091645713'],
};

function htmlForLang(lang: string): string {
  if (lang === 'ru') return ruHtml;
  if (lang === 'en') return enHtml;
  return kaHtml;
}

/** Returns desktop + mobile nav HTML for the given language. */
export function getNavBlock(lang: string): string {
  const [desktopId, mobileId] = NAV_BLOCKS[lang] ?? NAV_BLOCKS.ka;
  const html = htmlForLang(lang);
  const desktop = makePathsAbsolute(extractRecordBlock(html, desktopId));
  const mobile = makePathsAbsolute(extractRecordBlock(html, mobileId));
  return desktop + mobile;
}

/** Returns footer HTML for the given language. */
export function getFooterBlock(lang: string): string {
  const ids = FOOTER_BLOCKS[lang] ?? FOOTER_BLOCKS.ka;
  const html = htmlForLang(lang);
  return ids.map((id) => makePathsAbsolute(extractRecordBlock(html, id))).join('');
}

/** Returns page-specific CSS extracted from the homepage <head> (Tilda page CSS). */
export function getHomepageHeadCss(lang: string): string {
  const html = htmlForLang(lang);
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  if (headStart < 0 || headEnd < 0) return '';
  const head = html.slice(headStart + 6, headEnd);
  // Extract only <style> tags and rel="stylesheet" links (skip meta/title/scripts)
  const styles: string[] = [];
  const styleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
  let m;
  while ((m = styleRegex.exec(head)) !== null) {
    styles.push(m[0]);
  }
  const linkRegex = /<link[^>]*rel="stylesheet"[^>]*>/gi;
  while ((m = linkRegex.exec(head)) !== null) {
    styles.push(makePathsAbsolute(m[0]));
  }
  return styles.join('\n');
}
