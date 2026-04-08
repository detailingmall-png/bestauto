/**
 * Generates a dynamic blog article grid from page-map.json metadata.
 * Replaces static Tilda t404 blocks on blog index pages.
 *
 * At build time, reads og:image / og:description from each article HTML
 * and renders a Tilda-compatible card grid (t404 layout).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import pageMap from './page-map.json';

interface ArticleMeta {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly lang: string;
  readonly href: string;
}

const EXPORT_DIR = join(process.cwd(), 'tilda-export');

/**
 * Override og:image for blog posts that share duplicate/default thumbnails.
 * Maps slug → image path. Checked before falling back to og:image from HTML.
 * Source: Pexels (free, no attribution required).
 */
const IMAGE_OVERRIDES: Readonly<Record<string, string>> = {
  'blog/new-car-detailing': '/images/blog/new-car-detailing.webp',
  'blog/detailing-cost-tbilisi': '/images/blog/detailing-cost-tbilisi.webp',
  'blog/polishing-before-after': '/images/blog/polishing-before-after.webp',
  'blog/polishing-before-ceramic': '/images/blog/polishing-before-ceramic.webp',
  'blog/polishing-cost-tbilisi': '/images/blog/polishing-cost-tbilisi.webp',
  'blog/ppf-film-benefits': '/images/blog/ppf-film-benefits.webp',
  'blog/ceramic-coating-care': '/images/blog/ceramic-coating-care.webp',
  'blog/ceramic-coating-durability': '/images/blog/ceramic-coating-durability.webp',
  'blog/ceramic-coating-tbilisi': '/images/blog/ceramic-coating-tbilisi.webp',
  'blog/summer-car-care-georgia': '/images/blog/summer-car-care-georgia.webp',
  'blog/how-to-choose-detailing-studio': '/images/blog/how-to-choose-detailing-studio.webp',
  'blog/top-5-car-paint-protection': '/images/blog/top-5-car-paint-protection.webp',
  'blog/10-paint-mistakes': '/images/blog/10-paint-mistakes.webp',
  'blog/how-often-polish-car': '/images/blog/how-often-polish-car.webp',
  'blog/soft-vs-abrasive-polishing': '/images/blog/soft-vs-abrasive-polishing.webp',
};

/** Blog slugs removed from the site (discontinued services). Shared with [...slug].astro. */
export const DISCONTINUED_BLOG_SLUGS: ReadonlySet<string> = new Set([
  'blog/pdr-method', 'blog/pdr-after-hail', 'blog/pdr-guidelines-and-techniques',
  'blog/plastic-elements-restoration', 'blog/restoring-car-seats',
  'blog/steering-wheel-restoration', 'blog/why-restore-interior-elements',
]);

function extractOgMeta(html: string): { description: string; image: string } {
  const description =
    html.match(/property="og:description"\s+content="([^"]*)"/)?.[1]
    ?? html.match(/name="description"\s+content="([^"]*)"/)?.[1]
    ?? '';
  const image =
    html.match(/property="og:image"\s+content="([^"]*)"/)?.[1]
    ?? html.match(/og:image"\s+content="([^"]*)"/)?.[1]
    ?? '';
  return { description, image };
}

/** Build metadata for all blog articles, cached per build. */
let articlesCache: readonly ArticleMeta[] | null = null;

function loadArticles(): readonly ArticleMeta[] {
  if (articlesCache) return articlesCache;

  const entries = Object.values(
    pageMap as Record<string, { file: string; title: string; lang: string; slug: string }>
  ).filter(p => p.slug?.startsWith('blog/') && p.slug !== 'blog')
    .filter(p => !DISCONTINUED_BLOG_SLUGS.has(p.slug));

  const articles: ArticleMeta[] = entries.map(entry => {
    const html = readFileSync(join(EXPORT_DIR, entry.file), 'utf-8');
    const { description, image } = extractOgMeta(html);
    const langPrefix = entry.lang === 'ka' ? '' : `/${entry.lang}`;
    const fallbackImage = image.startsWith('/') ? image : `/images/${image.replace(/^images\//, '')}`;
    return {
      slug: entry.slug,
      title: entry.title.replace(/\s*\|\s*BESTAUTO$/, ''),
      description,
      image: IMAGE_OVERRIDES[entry.slug] ?? fallbackImage,
      lang: entry.lang,
      href: `${langPrefix}/${entry.slug}`,
    };
  });

  articlesCache = articles;
  return articles;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cardHtml(article: ArticleMeta): string {
  return `<div class="t404__col t-col t-col_6 t-align_left">
  <a class="t404__link" href="${escapeHtml(article.href)}">
    <div class="t404__imgbox">
      <div class="t404__img t-bgimg" data-original="${escapeHtml(article.image)}" style="background-image:url('${escapeHtml(article.image)}')"></div>
      <div class="t404__separator"></div>
    </div>
    <div class="t404__textwrapper">
      <div class="t404__title t-heading t-heading_xs">${escapeHtml(article.title)}</div>
      <div class="t404__descr t-descr t-descr_xs">${escapeHtml(article.description)}</div>
    </div>
  </a>
</div>`;
}

/**
 * Generate the full blog grid HTML for a given language.
 * Cards are grouped in rows of 2 inside t-container divs (matching Tilda t404 layout).
 */
export function generateBlogGridHtml(lang: string): string {
  const articles = loadArticles().filter(a => a.lang === lang);

  if (articles.length === 0) return '';

  const rows: string[] = [];
  for (let i = 0; i < articles.length; i += 2) {
    const pair = articles.slice(i, i + 2).map(cardHtml).join('\n');
    rows.push(`<div class="t-container">\n${pair}\n</div>`);
  }

  return `<div class="r t-rec t-rec_pt_75 t-rec_pb_90" style="padding-top:75px;padding-bottom:90px" data-record-type="404">
<div class="t404">
${rows.join('\n')}
</div>
</div>`;
}
