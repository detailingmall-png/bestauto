/**
 * Generates the "Related articles" block for service pages (service -> blog
 * back-links). Inverts BLOG_SERVICE_MAP (blog article -> parent service) from
 * related-services.ts, so each service page links to up to 4 articles of its
 * own blog cluster. Closes the internal-linking loop: blog -> service already
 * exists (editor-picked anchors in blog-links.ts), this adds service -> blog.
 *
 * Placement: injected before the footer in [...slug].astro, after the
 * related-services cross-sell block. Static HTML, no JS.
 *
 * Validation: an article missing for a given language in page-map.json is
 * skipped with a build-time warning (same policy as blog-links-inject.ts).
 */

import { BLOG_SERVICE_MAP } from './related-services';
import { findArticle, type ArticleMeta } from './blog-grid';

const MAX_ARTICLES = 4;

const SECTION_TITLE: Readonly<Record<string, string>> = {
  ka: 'სტატიები ბლოგიდან',
  ru: 'Статьи по теме',
  en: 'Related articles',
};

/**
 * service slug -> blog slugs, in BLOG_SERVICE_MAP insertion order
 * (the map lists core cluster articles first).
 */
let clusterCache: ReadonlyMap<string, readonly string[]> | null = null;

function getClusterMap(): ReadonlyMap<string, readonly string[]> {
  if (clusterCache) return clusterCache;
  const map = new Map<string, string[]>();
  for (const [article, service] of Object.entries(BLOG_SERVICE_MAP)) {
    const list = map.get(service);
    if (list) {
      map.set(service, [...list, article]);
    } else {
      map.set(service, [article]);
    }
  }
  clusterCache = map;
  return map;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ARROW_SVG =
  '<svg class="ba-artlinks__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" ' +
  'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
  'aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const BLOCK_STYLE = `<style>
.ba-artlinks__title{font-size:30px;color:var(--ba-color-accent);font-weight:var(--ba-font-weight-bold);text-align:center;margin:0 0 48px;font-family:var(--ba-font-family)}
.ba-artlinks__list{display:flex;flex-direction:column;gap:16px;max-width:800px;margin:0 auto;padding:0 20px}
.ba-artlinks__item{display:flex;align-items:center;justify-content:space-between;gap:16px;background:var(--ba-color-surface);border:1px solid var(--ba-color-border);border-radius:var(--ba-radius-lg);padding:20px 24px;min-height:48px;text-decoration:none;transition:background-color var(--ba-duration-fast) var(--ba-ease-default),border-color var(--ba-duration-fast) var(--ba-ease-default)}
.ba-artlinks__item:hover{background:var(--ba-color-surface-dark);border-color:rgba(228,201,126,0.4)}
.ba-artlinks__item:hover .ba-artlinks__arrow{color:var(--ba-color-accent)}
.ba-artlinks__name{color:var(--ba-color-text);font-size:18px;line-height:1.4;font-weight:var(--ba-font-weight-semibold);font-family:var(--ba-font-family)}
.ba-artlinks__arrow{flex:0 0 auto;color:var(--ba-color-text-subtle);transition:color var(--ba-duration-fast) var(--ba-ease-default)}
@media screen and (max-width:960px){.ba-artlinks__title{font-size:28px;margin-bottom:40px}.ba-artlinks__name{font-size:17px}}
@media screen and (max-width:640px){.ba-artlinks__title{font-size:24px;margin-bottom:32px}.ba-artlinks__item{padding:16px 20px}.ba-artlinks__name{font-size:16px}}
@media(prefers-reduced-motion:reduce){.ba-artlinks__item,.ba-artlinks__arrow{transition:none}}
</style>`;

function renderItem(article: ArticleMeta): string {
  return `<a href="${escapeHtml(article.href)}" class="ba-artlinks__item">
        <span class="ba-artlinks__name">${escapeHtml(article.title)}</span>
        ${ARROW_SVG}
      </a>`;
}

/**
 * Generate the related-articles block for a service page.
 * Returns '' for any page that is not a service with a blog cluster.
 */
export function generateRelatedArticlesHtml(lang: string, baseSlug: string): string {
  const cluster = getClusterMap().get(baseSlug);
  if (!cluster || cluster.length === 0) return '';

  const articles: ArticleMeta[] = [];
  for (const slug of cluster) {
    if (articles.length >= MAX_ARTICLES) break;
    const meta = findArticle(slug, lang);
    if (!meta) {
      console.warn(`[related-articles] ${lang}/${slug} not found in page-map - skipped`);
      continue;
    }
    articles.push(meta);
  }
  if (articles.length === 0) return '';

  const title = SECTION_TITLE[lang] ?? SECTION_TITLE['en'];
  const items = articles.map(renderItem).join('\n      ');

  return `<div id="ba-related-articles" style="padding-top:0;padding-bottom:96px;background-color:var(--ba-color-bg);">
  <div style="max-width:1200px;margin:0 auto;padding:0 20px;">
    <h2 class="ba-artlinks__title">${escapeHtml(title)}</h2>
    <div class="ba-artlinks__list">
      ${items}
    </div>
  </div>
  ${BLOCK_STYLE}
</div>`;
}
