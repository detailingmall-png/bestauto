/**
 * Build-time injection of editorial internal links into blog articles.
 *
 * For each rule in blog-links.ts:
 *   1. Find `contextQuote` — must occur EXACTLY once in article HTML.
 *   2. Verify `originalPhrase` occurs inside `contextQuote`.
 *   3. Verify `anchor` is a known ВЧ-keyword for the target service
 *      (service-target-keywords.ts) — warn but don't skip if unknown.
 *   4. Replace `originalPhrase` inside the quote with
 *      <a href=target>anchor</a> and substitute back into HTML.
 *
 * Allows text editing: on-page phrase ("Полировка") can differ from the anchor
 * ("Полировка кузова" — a real ВЧ query).
 *
 * No regex, no keyword matching, no longest-first fallback. If the quote is
 * not unique or not found, the rule is skipped with a warning — the article
 * body moved and the rule needs re-editing.
 */

import type { BlogLinkRule } from '../data/blog-links';
import { isKnownServiceKeyword } from '../data/seo-service-keywords';

const LINK_STYLE = 'color:#e4c97e;text-decoration:underline;';
const STEM_LEN = 5;          // Russian stem heuristic: first N chars match the root
const MIN_WORD_LEN = 4;      // ignore particles, prepositions, short connectors

export interface InjectionStats {
  readonly applied: number;
  readonly missed: number;
  readonly ambiguous: number;
  readonly unknownKeyword: number;
  readonly duplicateStem: number;
}

/**
 * Returns the first new anchor word whose stem already appears in the context
 * quote (outside the originalPhrase), indicating the text edit would create an
 * awkward repetition like "Полировка кузова ... подготавливает кузов".
 *
 * Compares the first STEM_LEN chars of each word added by the anchor vs. the
 * original phrase, case-insensitive, minus the originalPhrase itself.
 */
function findDuplicateStem(
  contextQuote: string,
  originalPhrase: string,
  anchor: string,
): string | null {
  const anchorWords = anchor.toLowerCase().split(/\s+/).filter(w => w.length >= MIN_WORD_LEN);
  const originalWords = new Set(originalPhrase.toLowerCase().split(/\s+/));
  const addedWords = anchorWords.filter(w => !originalWords.has(w));
  if (addedWords.length === 0) return null;

  const restOfQuote = contextQuote
    .toLowerCase()
    .replace(originalPhrase.toLowerCase(), ' ');

  for (const word of addedWords) {
    const stem = word.slice(0, STEM_LEN);
    if (stem.length < MIN_WORD_LEN) continue;
    if (restOfQuote.includes(stem)) return word;
  }
  return null;
}

export function injectEditorialBlogLinks(
  html: string,
  baseSlug: string,
  lang: string,
  rules: readonly BlogLinkRule[],
): { html: string; stats: InjectionStats } {
  const rule = rules.find(r => r.article === baseSlug);
  if (!rule) return { html, stats: { applied: 0, missed: 0, ambiguous: 0, unknownKeyword: 0, duplicateStem: 0 } };

  const urlPrefix = lang === 'ka' ? '' : `/${lang}`;
  let result = html;
  let applied = 0;
  let missed = 0;
  let ambiguous = 0;
  let unknownKeyword = 0;
  let duplicateStem = 0;

  for (const link of rule.links) {
    if (!isKnownServiceKeyword(link.target, link.anchor, lang)) {
      console.warn(`[blog-links] unknown-keyword ${baseSlug} (${lang}) role=${link.role} → ${link.target}: anchor "${link.anchor}" not in HF-list for ${link.target} (${lang})`);
      unknownKeyword++;
    }

    const dupWord = findDuplicateStem(link.contextQuote, link.originalPhrase, link.anchor);
    if (dupWord) {
      console.warn(`[blog-links] duplicate-stem ${baseSlug} (${lang}) role=${link.role} → ${link.target}: anchor word "${dupWord}" root already present elsewhere in contextQuote — pick different anchor or contextQuote boundary`);
      duplicateStem++;
      continue;
    }

    const firstIdx = result.indexOf(link.contextQuote);
    if (firstIdx === -1) {
      console.warn(`[blog-links] miss ${baseSlug} (${lang}) role=${link.role} → ${link.target}: contextQuote not found: "${link.contextQuote.slice(0, 80)}…"`);
      missed++;
      continue;
    }
    const secondIdx = result.indexOf(link.contextQuote, firstIdx + 1);
    if (secondIdx !== -1) {
      console.warn(`[blog-links] ambiguous ${baseSlug} (${lang}) role=${link.role} → ${link.target}: contextQuote matches multiple times: "${link.contextQuote.slice(0, 80)}…"`);
      ambiguous++;
      continue;
    }

    const originalIdx = link.contextQuote.indexOf(link.originalPhrase);
    if (originalIdx === -1) {
      console.warn(`[blog-links] bad-rule ${baseSlug} (${lang}) role=${link.role}: originalPhrase "${link.originalPhrase}" not inside contextQuote`);
      missed++;
      continue;
    }

    const href = `${urlPrefix}${link.target}`;
    const linkHtml = `<a href="${href}" style="${LINK_STYLE}">${link.anchor}</a>`;
    const rewrittenQuote =
      link.contextQuote.slice(0, originalIdx) +
      linkHtml +
      link.contextQuote.slice(originalIdx + link.originalPhrase.length);

    result =
      result.slice(0, firstIdx) +
      rewrittenQuote +
      result.slice(firstIdx + link.contextQuote.length);
    applied++;
  }

  return { html: result, stats: { applied, missed, ambiguous, unknownKeyword, duplicateStem } };
}
