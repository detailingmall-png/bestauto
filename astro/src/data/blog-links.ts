/**
 * Editorial internal-link map for blog articles.
 *
 * Each rule pairs an exact `contextQuote` (must be unique in the article HTML)
 * with an `originalPhrase` substring inside that quote. At build time the
 * injector replaces `originalPhrase` with `<a href=target>anchor</a>`. This
 * allows Variant A text-editing: the on-page phrase can differ from the anchor
 * (e.g. on-page "Полировка" → anchor "Полировка кузова" — a real ВЧ query).
 *
 * Rules:
 * - `anchor` MUST be a high-frequency (ВЧ) search query listed in
 *   `service-target-keywords.ts` for the target service (enforced by injector).
 * - `contextQuote` must appear EXACTLY once in the article HTML.
 * - `originalPhrase` must appear inside `contextQuote`.
 * - If any check fails, the injector logs a warning at build time and skips.
 *
 * No regex, no fuzzy matching, no auto first-occurrence. Only editor-picked
 * placements.
 */

export type BlogLinkRole = 'pillar' | 'bridge' | 'cta';

export interface BlogLink {
  readonly role: BlogLinkRole;
  readonly target: string;          // path without lang prefix, e.g. '/ceramiccoating'
  readonly anchor: string;          // ВЧ-keyword — becomes the link text
  readonly originalPhrase: string;  // existing phrase in HTML to be replaced by the link
  readonly contextQuote: string;    // unique sentence in the article containing originalPhrase
}

export interface BlogLinkRule {
  readonly article: string;         // slug, e.g. 'blog/ceramic-coating-for-car'
  readonly links: readonly BlogLink[];
}

export const BLOG_LINKS_RU: readonly BlogLinkRule[] = [
  {
    article: 'blog/ceramic-coating-for-car',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'керамическое покрытие',
        contextQuote: 'На правильно подготовленной поверхности керамическое покрытие усиливает глубину цвета, блеск и водоотталкивающий эффект',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'Полировка авто',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка уменьшает завихрения, усиливает глубину цвета и подготавливает кузов',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка',
        originalPhrase: 'защитная PPF-пленка',
        contextQuote: 'более правильным выбором будет защитная PPF-пленка',
      },
    ],
  },
];

export const BLOG_LINKS_KA: readonly BlogLinkRule[] = [];
export const BLOG_LINKS_EN: readonly BlogLinkRule[] = [];

export function getBlogLinksForLang(lang: string): readonly BlogLinkRule[] {
  switch (lang) {
    case 'ru': return BLOG_LINKS_RU;
    case 'ka': return BLOG_LINKS_KA;
    case 'en': return BLOG_LINKS_EN;
    default: return [];
  }
}
