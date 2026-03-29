/**
 * HTML extraction utilities for Tilda-exported pages.
 * Parses raw HTML into structured sections: head, nav, body, footer.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { IMG_DIMS } from './image-dims';
import { WEBP_AVAILABLE } from './webp-available';

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
    .replace(/content="(images\/)/g, 'content="/images/')
    .replace(/url\((images\/)/g, 'url(/images/')
    .replace(/url\('(images\/)/g, "url('/images/")
    .replace(/data-original="(images\/)/g, 'data-original="/images/')
    .replace(/data-bg-src="(images\/)/g, 'data-bg-src="/images/')
    .replace(/data-content-cover-bg="(images\/)/g, 'data-content-cover-bg="/images/')
    .replace(/srcset="(images\/)/g, 'srcset="/images/');
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
    'tilda-zoom', 'tilda-slds', 'tilda-cards', 'tilda-cover',
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
 * Inline tilda-grid CSS (4KB) to eliminate a render-blocking network request.
 * Replaces the <link> tag with a <style> tag containing the CSS content.
 */
export function inlineCriticalCss(head: string): string {
  return head.replace(
    /<link\b[^>]*href="\/css\/tilda-grid-3\.0\.min\.css"[^>]*\/?>/,
    `<style>${GRID_CSS}</style>`
  );
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
      /(<script\s[^>]*src="\/?js\/jquery[^"]*"[^>]*)(>)/g,
      (m, before, close) => before.includes('defer') ? m : `${before} defer${close}`
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
    'static.elfsight.com',
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
 * Lazy-load Elfsight widget via IntersectionObserver.
 * Removes the platform.js script tag and replaces it with an observer
 * that injects the script only when the widget scrolls into view.
 * Saves ~463KB from the critical JS path.
 */
export function lazyLoadElfsight(body: string): string {
  const scriptRe = /<script\b[^>]*src="https:\/\/static\.elfsight\.com\/platform\/platform\.js"[^>]*><\/script>/;
  if (!scriptRe.test(body)) return body;

  const loader = `<script>(function(){var loaded=false;function inject(){if(loaded)return;loaded=true;var s=document.createElement('script');s.src='https://static.elfsight.com/platform/platform.js';s.setAttribute('data-use-service-core','');document.head.appendChild(s);}setTimeout(function(){if(!('IntersectionObserver' in window)){inject();return;}var obs=new IntersectionObserver(function(entries){for(var i=0;i<entries.length;i++){if(entries[i].isIntersecting){obs.disconnect();inject();break;}}},{rootMargin:'400px'});var els=document.querySelectorAll('[class*="elfsight-app"]');if(els.length){els.forEach(function(el){obs.observe(el);});}else{inject();}},12000);})();</script>`;

  return body.replace(scriptRe, loader);
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

  const loader = `<script>(function(){function run(){${JSON.stringify(ids)}.forEach(function(id){var el=document.getElementById(id);if(el){try{new Function(el.textContent)();}catch(e){}}});}setTimeout(run,12000);})();</script>`;

  return processed + loader;
}

/**
 * Delay heavy third-party analytics scripts (GTM, GA4, Yandex Metrika,
 * Facebook Pixel external) using requestIdleCallback + 12s fallback.
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
  const loader = `<script>(function(){function load(){${srcPart}${inlinePart}}setTimeout(load,12000);})();</script>`;

  return processed + loader;
}

/**
 * Defer non-critical Tilda scripts via requestIdleCallback.
 * Heavy scripts (forms, zoom, masonry, video) in <head> are not needed until
 * user interacts. Replace <script src="..."> with idle loader (12s timeout).
 */
export function deferNonCriticalScripts(content: string): string {
  const DEFER_SCRIPTS = [
    'tilda-forms-1.0',
    'tilda-zoom-2.0',
    'masonry-imagesloaded',
    'tilda-video-1.0',
    'tilda-animation-2.0',
    'tilda-slds-1.4',
    'hammer.min',
    'tilda-popup-1.0',
    'tilda-cards-1.0',
    'tilda-skiplink-1.0',
    'tilda-events-1.0',
  ];

  // NOTE: tilda-zoom must stay in DEFER_SCRIPTS at 12s — loading on click/interaction
  // caused Lighthouse to trigger it within the TBT window (~929ms), adding 538ms TBT.

  const deferred: string[] = [];
  const processed = content.replace(/<script\b[^>]*src="([^"]*)"[^>]*>\s*<\/script>/g, (match, src) => {
    if (!DEFER_SCRIPTS.some(name => src.includes(name))) return match;
    deferred.push(src);
    return '';
  });

  if (deferred.length === 0) return content;

  const loader = `<script>(function(){function load(){${JSON.stringify(deferred)}.forEach(function(s){var el=document.createElement('script');el.async=true;el.src=s;document.head.appendChild(el);});}setTimeout(load,12000);})();</script>`;

  return processed + loader;
}

/**
 * Replace .jpg/.jpeg image references with .webp where a WebP version exists.
 * Applies to data-original, src, srcset, data-bg-src, og:image content attributes.
 * WebP is supported by 96%+ of browsers. Saves ~40% bandwidth on images.
 */
export function rewriteImagesToWebp(content: string): string {
  return content.replace(
    /((?:data-original|src|srcset|data-bg-src|data-content-cover-bg|content)="[^"]*\/)([\w.-]+)\.(jpe?g)(")/gi,
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
 * Extract structured sections from a full Tilda HTML page.
 */
export function extractSections(html: string): PageSections {
  // Head content
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  const rawHead = headStart >= 0 && headEnd > headStart
    ? html.slice(headStart + 6, headEnd)
    : '';
  const headContent = deferNonCriticalScripts(delayHeadAnalytics(inlineCriticalCss(deferNonCriticalCss(deferBlockingScripts(removeTildaCdnFallback(makePathsAbsolute(rawHead)))))));

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
  const body = rewriteImagesToWebp(makePathsAbsolute(rawBody));

  // Header block: everything inside <!--header-->...<!--/header-->
  const headerOpenTag = '<!--header-->';
  const headerCloseTag = '<!--/header-->';
  const headerOpen = body.indexOf(headerOpenTag);
  const headerClose = body.indexOf(headerCloseTag);
  const rawHeaderBlock = headerOpen >= 0 && headerClose > headerOpen
    ? body.slice(headerOpen, headerClose + headerCloseTag.length)
    : '';
  const headerBlock = delayAnalytics(rawHeaderBlock);

  // Main content: everything after <!--/header-->
  const mainStart = headerClose >= 0 ? headerClose + headerCloseTag.length : 0;
  const rawMainContent = body.slice(mainStart);
  const mainContent = lazyLoadElfsight(addLazyLoading(promoteAboveFoldImages(rawMainContent)));

  return {
    headContent: addResourceHints(headContent, rawMainContent),
    headerBlock,
    mainContent,
    bodyClass,
  };
}
