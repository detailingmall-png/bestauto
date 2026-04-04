/**
 * HTML extraction utilities for Tilda-exported pages.
 * Parses raw HTML into structured sections: head, nav, body, footer.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { IMG_DIMS } from './image-dims';
import { WEBP_AVAILABLE } from './webp-available';
import { META_OVERRIDES } from '../data/meta-overrides';

/** Delay (ms) before loading deferred analytics and non-critical scripts. */
const DEFER_DELAY_MS = 7000;

/** Max iterations when removing multiple blocks matching a search term. */
const MAX_BLOCK_REMOVAL_ITERATIONS = 20;

// Read critical CSS at module load (4KB, stable across builds)
const GRID_CSS = readFileSync(
  join(process.cwd(), 'public/css/tilda-grid-3.0.min.css'),
  'utf8'
);

export interface PageSections {
  readonly headContent: string;
  readonly headerBlock: string;
  readonly mainContent: string;
  readonly bodyClass: string;
}

/**
 * Convert relative Tilda asset paths to absolute paths.
 * Required so that nested routes like /ru/polishing/headlight-polishing/
 * resolve assets correctly from the root.
 */
export function makePathsAbsolute(content: string): string {
  return content
    .replace(/href="(css\/)/g, 'href="/css/')
    .replace(/href="(images\/)/g, 'href="/images/')
    .replace(/src="(js\/)/g, 'src="/js/')
    .replace(/src="(images\/)/g, 'src="/images/')
    .replace(/src="(css\/)/g, 'src="/css/')
    .replace(/href="(js\/)/g, 'href="/js/')
    .replace(/content="(images\/)/g, 'content="https://bestauto.ge/images/')
    .replace(/url\((images\/)/g, 'url(/images/')
    .replace(/url\('(images\/)/g, "url('/images/")
    .replace(/data-original="(images\/)/g, 'data-original="/images/')
    .replace(/data-bg-src="(images\/)/g, 'data-bg-src="/images/')
    .replace(/data-content-cover-bg="(images\/)/g, 'data-content-cover-bg="/images/')
    .replace(/srcset="(images\/)/g, 'srcset="/images/');
}

/**
 * Remove Tilda polyfill script — all polyfilled features (Promise, fetch,
 * Symbol, Array.from, Object.assign, etc.) are natively supported by every
 * browser since 2018. Saves 185 KB of dead JavaScript.
 */
export function removePolyfill(content: string): string {
  return content.replace(
    /<script\b[^>]*src="[^"]*tilda-polyfill[^"]*"[^>]*>\s*<\/script>/g,
    ''
  );
}

/**
 * Remove Tilda CDN fallback script — assets are now served locally.
 */
export function removeTildaCdnFallback(content: string): string {
  return content.replace(
    /<script[^>]*src="https:\/\/neo\.tildacdn\.com\/js\/tilda-fallback[^"]*"[^>]*><\/script>/g,
    ''
  );
}

/**
 * Convert non-critical Tilda CSS to async (preload + onload) pattern.
 * Keeps tilda-grid and tilda-blocks-page (layout-critical) as blocking.
 * Skips tags already async (media="print").
 */
export function deferNonCriticalCss(head: string): string {
  const DEFERRABLE = [
    'tilda-animation', 'tilda-forms', 'tilda-popup',
    'tilda-cards', 'tilda-cover',
    'fonts-tildasans',
  ];

  // Temporarily remove <noscript> blocks to avoid transforming their content
  const noscriptBlocks: string[] = [];
  const withoutNoscript = head.replace(/<noscript>[\s\S]*?<\/noscript>/g, (m) => {
    const placeholder = `\x00NS${noscriptBlocks.length}\x00`;
    noscriptBlocks.push(m);
    return placeholder;
  });

  const processed = withoutNoscript.replace(/<link\b[^>]*>/g, (match) => {
    if (!match.includes('rel="stylesheet"')) return match;
    if (match.includes('media="print"')) return match; // already async
    if (!DEFERRABLE.some(name => match.includes(name))) return match;

    const async = match.replace(
      'rel="stylesheet"',
      `rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'"`
    );
    return `${async}<noscript>${match}</noscript>`;
  });

  // Restore original <noscript> blocks
  return processed.replace(/\x00NS(\d+)\x00/g, (_, i) => noscriptBlocks[parseInt(i)]);
}

/**
 * Inline tilda-grid CSS (4KB) and page-specific tilda-blocks-page CSS
 * to eliminate render-blocking network requests.
 * Both files are local, static, and safe to inline at build time.
 */
export function inlineCriticalCss(head: string): string {
  // 1. Inline tilda-grid (always present, pre-loaded at module init)
  let result = head.replace(
    /<link\b[^>]*href="\/css\/tilda-grid-3\.0\.min\.css"[^>]*\/?>/,
    `<style>${GRID_CSS}</style>`
  );

  // 2. Inline tilda-blocks-page CSS (page-specific, read dynamically)
  result = result.replace(
    /<link\b[^>]*href="(\/css\/tilda-blocks-page[^"?]+\.min\.css)[^"]*"[^>]*\/?>/,
    (_match, cssPath) => {
      try {
        const css = readFileSync(join(process.cwd(), 'public', cssPath), 'utf8');
        return `<style>${css}</style>`;
      } catch {
        return _match; // fallback: keep original <link> if file not found
      }
    }
  );

  return result;
}

/**
 * Add defer to blocking scripts in <head> (jQuery and polyfill).
 * All other Tilda scripts already have async/defer.
 * Deferred scripts execute after HTML parsing in order, so jQuery → tilda-scripts order is preserved.
 */
export function deferBlockingScripts(head: string): string {
  return head
    .replace(
      /(<script\s[^>]*src="\/?js\/tilda-polyfill[^"]*"[^>]*)(>)/g,
      (m, before, close) => before.includes('defer') ? m : `${before} defer${close}`
    )
    .replace(
      /<script\s[^>]*src="\/?js\/jquery[^"]*"[^>]*>\s*<\/script>/g,
      '<script>window.jQuery=function(){}</script>'
    );
}

/**
 * Add font preload and hero image fetchpriority hints to <head>.
 * Extracts the first content image from mainContent to preload it.
 */
export function addResourceHints(head: string, mainContent: string): string {
  // DNS prefetch for deferred third-party analytics
  const dnsPrefetch = [
    'mc.yandex.ru',
    'www.googletagmanager.com',
    'connect.facebook.net',
  ].map(h => `<link rel="dns-prefetch" href="//${h}">`).join('');

  // Preload tilda-zero (cover block/artboard init depends on it → faster LCP)
  const zeroPreload = '<link rel="preload" href="/js/tilda-zero-1.1.min.js" as="script">';

  // Preload the self-hosted TildaSans font
  const fontPreload = '<link rel="preload" href="/fonts/TildaSans-VF.woff2" as="font" type="font/woff2" crossorigin>';

  // Find first real image in mainContent.
  // Prefer data-original (Tilda lazy-loader attribute = actual content images)
  // over src= which is often a tiny placeholder (noroot.png).
  const imgMatch = mainContent.match(/data-original="(\/images\/[^"]+\.(jpg|jpeg|png|webp))"/i)
    ?? mainContent.match(/src="(\/images\/[^"]+\.(jpg|jpeg|png|webp))"/i);
  const heroPreload = imgMatch
    ? `<link rel="preload" href="${imgMatch[1]}" as="image" fetchpriority="high">`
    : '';

  return dnsPrefetch + zeroPreload + fontPreload + heroPreload + head;
}

/**
 * Add width/height to <img> tags using pre-built dimension map.
 * Matches on src or data-original filename. Prevents CLS.
 */
export function addImageDimensions(body: string): string {
  return body.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    if (/\bwidth=/.test(attrs)) return match; // already has dimensions
    // Extract filename from src= or data-original=
    const urlMatch = attrs.match(/(?:data-original|src)="[^"]*\/([^/"]+\.(jpg|jpeg|png|webp))"/i);
    if (!urlMatch) return match;
    const filename = urlMatch[1];
    const dims = IMG_DIMS[filename];
    if (!dims) return match;
    return `<img${attrs} width="${dims[0]}" height="${dims[1]}">`;
  });
}

/**
 * Replace Tilda's tiny 20x CSS background placeholders with full-size WebP.
 * Tilda inserts `background-image:url('...resize__20x__NAME.jpg')` in inline <style>,
 * then its JS swaps it for the real image at runtime — causing late LCP.
 * Pre-populate with the full-size image at build time to fix this.
 */
export function expandCssBackgroundPlaceholders(content: string): string {
  // Matches: url('/images/HASH__-__resize__NNx__NAME.jpg')
  return content.replace(
    /url\('(\/images\/([\w-]+)__-__resize__\d+x__([\w.-]+)\.jpe?g)'\)/g,
    (_match, _orig, hash, name) => {
      const base = `${hash}__${name}`;
      const src = WEBP_AVAILABLE.has(base)
        ? `/images/${base}.webp`
        : `/images/${base}.jpg`;
      return `url('${src}')`;
    }
  );
}

/**
 * Promote the first Tilda background-image div to inline style.
 * Tilda cover blocks use <div class="t-bgimg" data-original="...">
 * and set background-image via JS. Adding inline background-image
 * lets the browser paint the hero immediately without waiting for JS.
 */
export function promoteHeroBackground(body: string): string {
  return body.replace(
    /(<div\b[^>]*\bt-bgimg\b[^>]*data-original="([^"]+)")/gi,
    (match, fullTag, imgUrl) => {
      if (/\bstyle="/.test(fullTag)) {
        return fullTag.replace(
          /\bstyle="([^"]*)"/,
          `style="$1; background-image:url(${imgUrl}); background-size:cover; background-position:center;"`,
        );
      }
      return `${fullTag} style="background-image:url(${imgUrl}); background-size:cover; background-position:center;"`;
    },
  );
}

/**
 * Promote above-fold Tilda lazy images to direct src= loading.
 * Tilda stores real image in data-original= and lazy-loads via JS.
 * For the first N images, copy data-original → src so the browser
 * can load them immediately without waiting for scripts.
 * Adds fetchpriority="high" to the very first image (LCP candidate).
 */
export function promoteAboveFoldImages(body: string): string {
  const ABOVE_FOLD = 2;
  let promoted = 0;

  return body.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    if (promoted >= ABOVE_FOLD) return match;

    const dataOrigMatch = attrs.match(/data-original="([^"]+)"/);
    if (!dataOrigMatch) return match; // no data-original, skip

    promoted++;
    const realSrc = dataOrigMatch[1];

    // Replace placeholder src= with the real image path
    let newAttrs = /\bsrc=/.test(attrs)
      ? attrs.replace(/\bsrc="[^"]*"/, `src="${realSrc}"`)
      : `src="${realSrc}" ${attrs}`;

    // First image gets fetchpriority hint
    if (promoted === 1) newAttrs += ' fetchpriority="high"';

    return `<img ${newAttrs.trim()}>`;
  });
}

/**
 * Known image natural dimensions for CLS prevention.
 * Add width/height attributes to images missing them.
 */
const KNOWN_IMG_DIMENSIONS: ReadonlyArray<{ pattern: RegExp; width: number; height: number }> = [
  // Mobile header logo (176×53, displayed at 110px width → height≈33)
  { pattern: /tild3031-6163-4738-a332-373636313836__noroot/, width: 176, height: 53 },
];

export function fixImgDimensions(html: string): string {
  return html.replace(/<img\b([^>]*)>/gi, (match, attrs: string) => {
    for (const entry of KNOWN_IMG_DIMENSIONS) {
      if (!entry.pattern.test(attrs)) continue;
      let updated = attrs;
      if (!/\bwidth=/.test(updated)) updated += ` width="${entry.width}"`;
      if (!/\bheight=/.test(updated)) updated += ` height="${entry.height}"`;
      return `<img${updated}>`;
    }
    return match;
  });
}

/**
 * Add loading="lazy" to images in body content.
 * Skips the first N images (above the fold) and tracking pixels.
 */
export function addLazyLoading(body: string): string {
  let aboveFoldCount = 0;
  const ABOVE_FOLD = 3; // first 3 images assumed above fold

  return body.replace(/<img(\s)/gi, (_match, space) => {
    aboveFoldCount++;
    if (aboveFoldCount <= ABOVE_FOLD) return `<img${space}`;
    return `<img loading="lazy"${space}`;
  });
}

/**
 * Remove Elfsight widget script and containers.
 * The widget has been replaced by a self-hosted reviews widget.
 */
export function removeElfsight(body: string): string {
  // Remove platform.js script tag
  let result = body.replace(
    /<script\b[^>]*src="https:\/\/static\.elfsight\.com\/platform\/platform\.js"[^>]*><\/script>/g,
    ''
  );
  return result;
}

/**
 * Strip alien/legacy analytics scripts from Tilda body content:
 *  1. External gtag script with foreign GA4 ID (G-1QB0MZECSB)
 *  2. Inline gtag('config', 'G-1QB0MZECSB') initializer
 *  3. Old Universal Analytics (analytics.js / ga.create)
 *  4. Tilda internal stat script (tilda-stat-1.0.min.js)
 * These are residual Tilda-generated blocks that duplicate or conflict
 * with our own tracking setup.
 */
export function stripAlienAnalytics(content: string): string {
  return content
    // 1. External gtag script for alien GA4 ID
    .replace(
      /<script\b[^>]*src="[^"]*G-1QB0MZECSB[^"]*"[^>]*>\s*<\/script>/g,
      ''
    )
    // 2. Inline gtag config block for alien GA4 ID
    .replace(
      /<script[^>]*>(?:[^<]|<(?!\/script>))*?G-1QB0MZECSB(?:[^<]|<(?!\/script>))*?<\/script>/g,
      ''
    )
    // 3. Old Universal Analytics (analytics.js)
    .replace(
      /<script[^>]*>(?:[^<]|<(?!\/script>))*?google-analytics\.com\/analytics\.js(?:[^<]|<(?!\/script>))*?<\/script>/g,
      ''
    )
    // 4. Tilda internal stat collector
    .replace(
      /<script[^>]*>(?:[^<]|<(?!\/script>))*?tilda-stat-1\.0\.min\.js(?:[^<]|<(?!\/script>))*?<\/script>/g,
      ''
    );
}

/**
 * Remove the old Tilda inline tracking script (phone_call_299 etc.)
 * that was added manually. Replaced by /js/tracking.js.
 */
export function stripOldTracking(block: string): string {
  return block.replace(
    /<script>\s*document\.addEventListener\('click',\s*function\(e\)\s*\{[\s\S]*?phone_call_299[\s\S]*?<\/script>/g,
    '<!-- old tracking removed, see /js/tracking.js -->'
  );
}

/**
 * Delay inline analytics scripts found in <head> (GTM bootstrap, phone
 * tracking, bot detection). These run synchronously during HTML parse and
 * are the #1 TBT contributor. Uses type="text/plain" + idle loader.
 * Preserves window.dataLayer stub so queued events are not lost.
 */
export function delayHeadAnalytics(head: string): string {
  const DELAY_SIGNATURES = [
    'gtm.start',          // GTM bootstrap
    "gtag('event",        // phone click tracking
  ];

  let idx = 0;
  const ids: string[] = [];
  const processed = head.replace(/<script(\b[^>]*)>([\s\S]*?)<\/script>/g, (match, attrs, content) => {
    // Skip scripts with src= (external), and skip dataLayer stub
    if (attrs.includes('src=')) return match;
    if (!DELAY_SIGNATURES.some(sig => content.includes(sig))) return match;

    const id = `_hd${idx++}`;
    ids.push(id);
    return `<script type="text/plain" id="${id}"${attrs}>${content}</script>`;
  });

  if (ids.length === 0) return head;

  const loader = `<script>(function(){function run(){${JSON.stringify(ids)}.forEach(function(id){var el=document.getElementById(id);if(el){try{new Function(el.textContent)();}catch(e){}}});}setTimeout(run,${DEFER_DELAY_MS});})();</script>`;

  return processed + loader;
}

/**
 * Delay heavy third-party analytics scripts (GTM, GA4, Yandex Metrika,
 * Facebook Pixel external) using requestIdleCallback + 7s fallback.
 * Inline dataLayer/gtag/ym/fbq stubs remain so queued calls are preserved.
 */
export function delayAnalytics(block: string): string {
  const DELAY_HOSTS = [
    'googletagmanager.com/gtag/',
    'googletagmanager.com/gtm.js',
    'mc.yandex.ru/metrika/tag',
    'connect.facebook.net/',
  ];
  // Inline script signatures to defer (FB Pixel, Yandex Metrika)
  const DELAY_INLINE = [
    '!function(f,b,e,v,n,t,s)', // Facebook Pixel
    'function(m,e,t,r,i,k,a)',   // Yandex Metrika
  ];

  // 1. Remove external analytics src scripts
  const deferred: string[] = [];
  let processed = block.replace(/<script\b[^>]*src="([^"]*)"[^>]*>\s*<\/script>/g, (match, src) => {
    if (DELAY_HOSTS.some(h => src.includes(h))) {
      deferred.push(src);
      return '';
    }
    return match;
  });

  // 2. Defer heavy inline analytics via type="text/plain" + idle loader
  let inlineIdx = 0;
  const inlineIds: string[] = [];
  processed = processed.replace(/<script(\b[^>]*)>([\s\S]*?)<\/script>/g, (match, attrs, content) => {
    if (!DELAY_INLINE.some(sig => content.includes(sig))) return match;
    const id = `_lz${inlineIdx++}`;
    inlineIds.push(id);
    return `<script type="text/plain" id="${id}"${attrs}>${content}</script>`;
  });

  const hasChanges = deferred.length > 0 || inlineIds.length > 0;
  if (!hasChanges) return block;

  const srcPart = deferred.length > 0
    ? `${JSON.stringify(deferred)}.forEach(function(s){var el=document.createElement('script');el.async=true;el.src=s;document.head.appendChild(el);});`
    : '';
  const inlinePart = inlineIds.length > 0
    ? `${JSON.stringify(inlineIds)}.forEach(function(id){var el=document.getElementById(id);if(el){try{new Function(el.textContent)();}catch(e){}}});`
    : '';
  const loader = `<script>(function(){function load(){${srcPart}${inlinePart}}setTimeout(load,${DEFER_DELAY_MS});})();</script>`;

  return processed + loader;
}

/**
 * Defer non-critical Tilda scripts via requestIdleCallback.
 * Heavy scripts (forms, zoom, masonry, video) in <head> are not needed until
 * user interacts. Replace <script src="..."> with idle loader (7s timeout).
 */
export function deferNonCriticalScripts(content: string): string {
  const DEFER_SCRIPTS = [
    'tilda-forms-1.0',
    'masonry-imagesloaded',
    'tilda-video-1.0',
    'tilda-animation-2.0',
    'hammer.min',
    'tilda-popup-1.0',
    'tilda-cards-1.0',
    'tilda-skiplink-1.0',
    'tilda-events-1.0',
  ];


  const deferred: string[] = [];
  const processed = content.replace(/<script\b[^>]*src="([^"]*)"[^>]*>\s*<\/script>/g, (match, src) => {
    if (!DEFER_SCRIPTS.some(name => src.includes(name))) return match;
    deferred.push(src);
    return '';
  });

  if (deferred.length === 0) return content;

  const loader = `<script>(function(){function load(){${JSON.stringify(deferred)}.forEach(function(s){var el=document.createElement('script');el.async=true;el.src=s;document.head.appendChild(el);});}setTimeout(load,${DEFER_DELAY_MS});})();</script>`;

  return processed + loader;
}

/**
 * Replace .jpg/.jpeg image references with .webp where a WebP version exists.
 * Applies to data-original, src, srcset, data-bg-src, og:image content attributes.
 * WebP is supported by 96%+ of browsers. Saves ~40% bandwidth on images.
 */
export function rewriteImagesToWebp(content: string): string {
  return content.replace(
    /((?:data-original|src|srcset|data-bg-src|data-content-cover-bg|content)="[^"]*\/)([\w.-]+)\.(jpe?g|png)(")/gi,
    (match, prefix, name, _ext, suffix) => {
      return WEBP_AVAILABLE.has(name) ? `${prefix}${name}.webp${suffix}` : match;
    }
  );
}

/**
 * Remove a Tilda record block by its record ID from HTML content.
 * Uses div-depth counting to find the matching closing tag.
 */
export function removeRecordBlock(content: string, recId: string): string {
  const startMarker = `id="${recId}"`;
  const startIdx = content.indexOf(startMarker);
  if (startIdx < 0) return content;
  const divStart = content.lastIndexOf('<div', startIdx);
  let depth = 0;
  let pos = divStart;
  while (pos < content.length) {
    const nextOpen = content.indexOf('<div', pos + 1);
    const nextClose = content.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) return content.slice(0, divStart) + content.slice(nextClose + 6);
      depth--;
      pos = nextClose;
    }
  }
  return content;
}


/**
 * Remove all rec blocks whose HTML contains the given search term.
 * Used when old contact block IDs differ per page (e.g. RU subpages).
 */
export function removeBlockContaining(content: string, searchTerm: string): string {
  let result = content;
  for (let i = 0; i < MAX_BLOCK_REMOVAL_ITERATIONS; i++) {
    const termIdx = result.indexOf(searchTerm);
    if (termIdx < 0) break;
    const before = result.slice(0, termIdx);
    const recMatches = [...before.matchAll(/id="(rec\d+)"/g)];
    if (recMatches.length === 0) break;
    const recId = recMatches[recMatches.length - 1][1];
    const next = removeRecordBlock(result, recId);
    if (next === result) break;
    result = next;
  }
  return result;
}

/**
 * Remove all rec blocks with the given data-record-type attribute.
 * Used to strip old Tilda t692 cross-sell blocks replaced by dynamic generator.
 */
export function removeBlockByRecordType(content: string, recordType: string): string {
  const marker = `data-record-type="${recordType}"`;
  let result = content;
  for (let i = 0; i < MAX_BLOCK_REMOVAL_ITERATIONS; i++) {
    const markerIdx = result.indexOf(marker);
    if (markerIdx < 0) break;
    const before = result.slice(0, markerIdx);
    const recMatches = [...before.matchAll(/id="(rec\d+)"/g)];
    if (recMatches.length === 0) break;
    const recId = recMatches[recMatches.length - 1][1];
    const next = removeRecordBlock(result, recId);
    if (next === result) break;
    result = next;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Blog article cleanup: strip broken CTA placeholder & convert inline FAQ
// ---------------------------------------------------------------------------

/**
 * Strip the broken CTA placeholder from blog articles.
 * Removes everything from `<h2>CTA</h2>` to the next `<hr` tag (inclusive),
 * or to `</div>` if no `<hr` is found.
 */
export function stripBlogCtaPlaceholder(content: string): string {
  const marker = '<h2>CTA</h2>';
  const markerIdx = content.indexOf(marker);
  if (markerIdx < 0) return content;

  // Find the end boundary: prefer <hr, fallback to </div>
  const afterMarker = content.slice(markerIdx);
  const hrIdx = afterMarker.indexOf('<hr');
  let endOffset: number;

  if (hrIdx >= 0) {
    // Include the full <hr ...> tag
    const hrEnd = afterMarker.indexOf('>', hrIdx);
    endOffset = hrEnd >= 0 ? hrEnd + 1 : hrIdx + 3;
  } else {
    // No <hr> — remove up to (but not including) the next </div>
    const divIdx = afterMarker.indexOf('</div>');
    endOffset = divIdx >= 0 ? divIdx : afterMarker.length;
  }

  return content.slice(0, markerIdx) + content.slice(markerIdx + endOffset);
}

/**
 * Convert inline FAQ in blog articles to a native <details>/<summary> accordion.
 *
 * Matches any <h2> or <h3> heading containing "FAQ" (case-insensitive),
 * then parses subsequent Q&A pairs in three language patterns:
 * - RU: `<strong>Вопрос [N]: ...` / `Ответ: ...`
 * - EN: `<strong>Question [N]: ...` / `Answer: ...`
 * - KA: `<strong>კითხვა [N]: ...` / `პასუხი: ...`
 */
export function convertBlogInlineFaq(content: string): string {
  // Find any h2/h3 heading containing "FAQ" (case-insensitive)
  const faqHeadingRegex = /<h[23]>[^<]*?(?:FAQ|faq)[^<]*?<\/h[23]>/;
  const headingMatch = faqHeadingRegex.exec(content);
  if (!headingMatch) return content;

  const faqIdx = headingMatch.index;
  const faqMarker = headingMatch[0];

  // Find the CTA marker or end of the text block as the FAQ section boundary
  const afterFaq = content.slice(faqIdx + faqMarker.length);
  const ctaMarkerIdx = afterFaq.indexOf('<h2>CTA</h2>');

  // Boundary: CTA marker, or next heading (h2/h3), or </div>
  let sectionEndOffset: number;
  if (ctaMarkerIdx >= 0) {
    sectionEndOffset = ctaMarkerIdx;
  } else {
    // Find the next heading or </div> as boundary
    const nextHeadingMatch = afterFaq.match(/<h[23]>/);
    const nextDivEnd = afterFaq.indexOf('</div>');
    if (nextHeadingMatch && nextHeadingMatch.index !== undefined && (nextDivEnd < 0 || nextHeadingMatch.index < nextDivEnd)) {
      sectionEndOffset = nextHeadingMatch.index;
    } else {
      sectionEndOffset = nextDivEnd >= 0 ? nextDivEnd : afterFaq.length;
    }
  }

  const faqSection = afterFaq.slice(0, sectionEndOffset);

  // Parse Q&A pairs using regex
  const qaPairRegex = /<p[^>]*>\s*<strong>\s*(?:Вопрос\s*\d*|Question\s*\d*|კითხვა\s*\d*)\s*:?\s*(.*?)<\/strong>\s*<\/p>\s*<p[^>]*>\s*(?:Ответ|Answer|პასუხი)\s*:\s*([\s\S]*?)<\/p>/g;

  const pairs: Array<{ question: string; answer: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = qaPairRegex.exec(faqSection)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    if (question && answer) {
      pairs.push({ question, answer });
    }
  }

  if (pairs.length === 0) return content;

  // Build accordion HTML (reuse ba-faq__* classes from faq-section.ts)
  const accordionItems = pairs.map(({ question, answer }) =>
    `<details class="ba-faq__item" style="border-bottom:1px solid var(--ba-color-border);">
        <summary class="ba-faq__question" style="display:flex;align-items:center;justify-content:space-between;padding:20px 0;cursor:pointer;list-style:none;font-family:var(--ba-font-family);font-weight:var(--ba-font-weight-semibold);color:var(--ba-color-text);line-height:1.4;gap:16px;">
          <span>${question}</span>
          <svg class="ba-faq__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink:0;transition:transform 0.25s ease;"><path d="M5 7.5L10 12.5L15 7.5" style="stroke:var(--ba-color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </summary>
        <div class="ba-faq__answer" style="padding:0 0 20px;font-family:var(--ba-font-family);color:var(--ba-color-text-muted);line-height:1.6;">${answer}</div>
      </details>`
  ).join('\n      ');

  const accordionHtml = `<div class="ba-blog-faq" style="margin:32px 0;">
      ${accordionItems}
      <style>
        .ba-blog-faq .ba-faq__question { font-size: 18px; }
        .ba-blog-faq .ba-faq__answer { font-size: 16px; }
        .ba-blog-faq .ba-faq__item summary::-webkit-details-marker { display: none; }
        .ba-blog-faq .ba-faq__item[open] .ba-faq__chevron { transform: rotate(180deg); }
        .ba-blog-faq .ba-faq__item summary:hover { color: var(--ba-color-accent) !important; }
        @media screen and (max-width: 960px) {
          .ba-blog-faq .ba-faq__question { font-size: 17px; }
          .ba-blog-faq .ba-faq__answer { font-size: 15px; }
        }
        @media screen and (max-width: 640px) {
          .ba-blog-faq .ba-faq__question { font-size: 16px; padding: 16px 0 !important; }
          .ba-blog-faq .ba-faq__answer { font-size: 15px; }
        }
      </style>
    </div>`;

  // Replace the entire FAQ section (heading + Q&A pairs) with accordion
  const faqEndIdx = faqIdx + faqMarker.length + sectionEndOffset;
  return content.slice(0, faqIdx) + accordionHtml + content.slice(faqEndIdx);
}

/**
 * Remove JS-based SEO scripts from Tilda HTML (hreflang + dynamic Service schema).
 * These are replaced by static equivalents generated at build time in seo.ts.
 */
export function removeClientSeoScripts(content: string): string {
  return content
    .replace(/<!-- HREFLANG: Dynamic language alternate links -->\s*<script>[\s\S]*?<\/script>/g, '')
    .replace(/<!-- Schema\.org: Dynamic Service Schema -->\s*<script>[\s\S]*?<\/script>/g, '')
    .replace(/<link\s+rel="canonical"[^>]*>/g, '');
}

/**
 * Add alt="BESTAUTO" to content images missing alt text.
 * Skips tracking pixels (mc.yandex.ru, 1x1) and noscript blocks.
 */
export function improveEmptyAlts(body: string): string {
  // Temporarily remove <noscript> blocks
  const noscriptBlocks: string[] = [];
  const withoutNoscript = body.replace(/<noscript>[\s\S]*?<\/noscript>/g, (m) => {
    noscriptBlocks.push(m);
    return `\x00NS${noscriptBlocks.length - 1}\x00`;
  });

  const processed = withoutNoscript.replace(/<img\b([^>]*)>/gi, (match, attrs: string) => {
    // Skip tracking pixels
    if (attrs.includes('mc.yandex.ru') || attrs.includes('facebook.com/tr')) return match;
    // Skip if already has non-empty alt
    const altMatch = attrs.match(/\balt="([^"]*)"/);
    if (altMatch && altMatch[1].trim() !== '') return match;
    // Has alt="" or no alt at all → add fallback
    if (altMatch) {
      return match.replace(/\balt=""/, 'alt="BESTAUTO"');
    }
    return `<img alt="BESTAUTO"${attrs}>`;
  });

  return processed.replace(/\x00NS(\d+)\x00/g, (_, i) => noscriptBlocks[parseInt(i)]);
}

/**
 * Extract a contiguous range of Tilda blocks (from startRecId div to the closing tag
 * of endRecId div) and remove it from the content. Returns [extracted, remaining].
 */
export function extractAndRemoveBlockRange(
  content: string,
  startRecId: string,
  endRecId: string
): [string, string] {
  const startMarker = `id="${startRecId}"`;
  const endMarker = `id="${endRecId}"`;
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx < 0 || endIdx < 0 || endIdx < startIdx) return ['', content];

  const rangeStart = content.lastIndexOf('<div', startIdx);

  // Walk through endRecId block to find its closing </div>
  let depth = 0;
  let pos = content.lastIndexOf('<div', endIdx);
  while (pos < content.length) {
    const nextOpen = content.indexOf('<div', pos + 1);
    const nextClose = content.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        const rangeEnd = nextClose + 6;
        return [
          content.slice(rangeStart, rangeEnd),
          content.slice(0, rangeStart) + content.slice(rangeEnd),
        ];
      }
      depth--;
      pos = nextClose;
    }
  }
  return ['', content];
}

/**
 * Find the rec ID of the last block before the given text marker.
 * Optional startPos limits search to content after a given offset —
 * use this to skip navigation anchors that appear earlier in the page.
 * Used to identify the block containing a specific anchor (e.g., name="reviews").
 */
export function findRecIdContaining(content: string, marker: string, startPos = 0): string | null {
  const markerPos = content.indexOf(marker, startPos);
  if (markerPos < 0) return null;
  const before = content.slice(Math.max(0, markerPos - 500), markerPos);
  const matches = [...before.matchAll(/id="(rec\d+)"/g)];
  return matches.length > 0 ? matches[matches.length - 1][1] : null;
}

/**
 * Return the rec ID that is `n` positions after `startRecId` in the flat
 * list of all rec IDs in the content.
 */
export function findNthRecIdAfter(content: string, startRecId: string, n: number): string | null {
  const allIds = [...content.matchAll(/id="(rec\d+)"/g)].map(m => m[1]);
  const idx = allIds.indexOf(startRecId);
  if (idx < 0 || idx + n >= allIds.length) return null;
  return allIds[idx + n];
}

/**
 * Strip HTML tags from <title> and <meta name="description"> content.
 * Fixes broken SERP snippets caused by Tilda inline markup (e.g. <s> tags).
 */
export function sanitizeMetaTags(head: string): string {
  // Strip HTML tags inside <title>...</title>
  const sanitized = head.replace(
    /(<title>)([\s\S]*?)(<\/title>)/i,
    (_match, open, content, close) => {
      const clean = content.replace(/<[^>]+>/g, '');
      return `${open}${clean}${close}`;
    }
  );
  // Strip HTML tags inside meta description content="..."
  return sanitized.replace(
    /(<meta\s+name="description"\s+content=")([\s\S]*?)("\s*\/?>)/i,
    (_match, open, content, close) => {
      const clean = content.replace(/<[^>]+>/g, '');
      return `${open}${clean}${close}`;
    }
  );
}

/**
 * Add missing Twitter Card meta tags by mirroring Open Graph values.
 * Tilda exports only twitter:card and twitter:site; this fills in
 * twitter:title, twitter:description, twitter:image from og: equivalents.
 */
export function completeTwitterCards(head: string): string {
  const hasTwitterTitle = /name="twitter:title"/.test(head);
  const hasTwitterDesc = /name="twitter:description"/.test(head);
  const hasTwitterImg = /name="twitter:image"/.test(head);

  if (hasTwitterTitle && hasTwitterDesc && hasTwitterImg) return head;

  const tags: string[] = [];

  if (!hasTwitterTitle) {
    const ogTitle = head.match(/property="og:title"\s+content="([^"]*)"/)?.[1];
    if (ogTitle) tags.push(`<meta name="twitter:title" content="${ogTitle}">`);
  }
  if (!hasTwitterDesc) {
    const ogDesc = head.match(/property="og:description"\s+content="([^"]*)"/)?.[1];
    if (ogDesc) tags.push(`<meta name="twitter:description" content="${ogDesc}">`);
  }
  if (!hasTwitterImg) {
    const ogImg = head.match(/property="og:image"\s+content="([^"]*)"/)?.[1];
    if (ogImg) tags.push(`<meta name="twitter:image" content="${ogImg}">`);
  }

  if (tags.length === 0) return head;

  // Insert after existing twitter:site tag, or at the end of head
  const insertPoint = head.lastIndexOf('twitter:');
  if (insertPoint >= 0) {
    const afterTag = head.indexOf('>', insertPoint);
    if (afterTag >= 0) {
      return head.slice(0, afterTag + 1) + tags.join('') + head.slice(afterTag + 1);
    }
  }
  return head + tags.join('');
}

/**
 * Apply build-time meta tag overrides from meta-overrides.ts.
 * Replaces title, description, og:title, og:description when an override exists.
 */
export function applyMetaOverrides(head: string, lang: string, slug: string): string {
  const key = `${lang}/${slug}`;
  const overrides = META_OVERRIDES[key];
  if (!overrides) return head;

  let result = head;
  if (overrides.title) {
    result = result.replace(
      /(<title>)([\s\S]*?)(<\/title>)/i,
      `$1${overrides.title}$3`
    );
  }
  if (overrides.description) {
    result = result.replace(
      /(<meta\s+name="description"\s+content=")([\s\S]*?)("\s*\/?>)/i,
      `$1${overrides.description}$3`
    );
  }
  if (overrides.ogTitle) {
    result = result.replace(
      /(property="og:title"\s+content=")([\s\S]*?)(")/i,
      `$1${overrides.ogTitle}$3`
    );
  }
  if (overrides.ogDescription) {
    result = result.replace(
      /(property="og:description"\s+content=")([\s\S]*?)(")/i,
      `$1${overrides.ogDescription}$3`
    );
  }
  return result;
}

/**
 * Extract structured sections from a full Tilda HTML page.
 */
export function extractSections(html: string, lang?: string, slug?: string): PageSections {
  // Head content
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  const rawHead = headStart >= 0 && headEnd > headStart
    ? html.slice(headStart + 6, headEnd)
    : '';
  const processedHead = completeTwitterCards(sanitizeMetaTags(removeClientSeoScripts(deferNonCriticalScripts(delayHeadAnalytics(inlineCriticalCss(deferNonCriticalCss(deferBlockingScripts(removePolyfill(removeTildaCdnFallback(makePathsAbsolute(rawHead)))))))))));
  const headContent = (lang && slug !== undefined) ? applyMetaOverrides(processedHead, lang, slug) : processedHead;

  // Body class
  const bodyTagMatch = html.match(/<body([^>]*)>/);
  const bodyClass = bodyTagMatch?.[1]?.match(/class="([^"]*)"/)?.[1] ?? 't-body';

  // Full body
  const bodyStartTag = html.match(/<body[^>]*>/);
  const bodyStart = bodyStartTag
    ? html.indexOf(bodyStartTag[0]) + bodyStartTag[0].length
    : 0;
  const bodyEnd = html.lastIndexOf('</body>');
  const rawBody = bodyEnd > bodyStart ? html.slice(bodyStart, bodyEnd) : html;
  const body = rewriteImagesToWebp(expandCssBackgroundPlaceholders(makePathsAbsolute(rawBody)));

  // Header block: everything inside <!--header-->...<!--/header-->
  const headerOpenTag = '<!--header-->';
  const headerCloseTag = '<!--/header-->';
  const headerOpen = body.indexOf(headerOpenTag);
  const headerClose = body.indexOf(headerCloseTag);
  const rawHeaderBlock = headerOpen >= 0 && headerClose > headerOpen
    ? body.slice(headerOpen, headerClose + headerCloseTag.length)
    : '';
  const headerBlock = fixImgDimensions(delayAnalytics(stripAlienAnalytics(stripOldTracking(rawHeaderBlock))));

  // Main content: everything after <!--/header-->
  const mainStart = headerClose >= 0 ? headerClose + headerCloseTag.length : 0;
  const rawMainContent = body.slice(mainStart);
  const mainContent = fixImgDimensions(improveEmptyAlts(delayAnalytics(stripAlienAnalytics(removeElfsight(addLazyLoading(promoteAboveFoldImages(promoteHeroBackground(rawMainContent))))))));

  return {
    headContent: addResourceHints(headContent, rawMainContent),
    headerBlock,
    mainContent,
    bodyClass,
  };
}
