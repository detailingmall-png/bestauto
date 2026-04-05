/**
 * HTML extraction utilities for Tilda-exported pages.
 * Parses raw HTML into structured sections: head, nav, body, footer.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { IMG_DIMS } from './image-dims';
import { WEBP_AVAILABLE } from './webp-available';
import { META_OVERRIDES } from '../data/meta-overrides';
import { renderBlogFaqAccordion, type FaqAccordionItem } from './faq-accordion';

/** Delay (ms) before loading deferred analytics and non-critical scripts. */
const DEFER_DELAY_MS = 7000;

/** Max iterations when removing multiple blocks matching a search term. */
const MAX_BLOCK_REMOVAL_ITERATIONS = 20;

// Read critical CSS at module load (4KB, stable across builds)
const GRID_CSS = readFileSync(
  join(process.cwd(), 'public/css/tilda-grid-3.0.min.css'),
  'utf8'
);

// Critical CSS inlined to prevent visual re-paint when async tilda-blocks-page CSS loads.
// Without these rules, async CSS at ~3.3s changes font-smoothing/background on #allrecords,
// causing Chrome to report a new LCP for hero text. Inlining them ensures zero visual change.
const ZERO_BLOCK_CRITICAL_CSS = [
  // Font face (optional = no late font swap → stable LCP)
  `@font-face{font-family:'TildaSans';font-style:normal;font-weight:250 1000;font-display:optional;src:url('/fonts/TildaSans-VF.woff2') format('woff2-variations')}`,
  // Zero Block atoms (for non-homepage pages with t396 blocks)
  `.t396 .tn-atom{display:table-cell;vertical-align:middle;width:100%;-webkit-text-size-adjust:100%}.t396 a.tn-atom{text-decoration:none}.t396 .tn-atom__img{width:100%;display:block}`,
  // Critical #allrecords styles — prevent re-paint when async CSS loads
  `#allrecords{-webkit-font-smoothing:antialiased}`,
  // Tilda sets body/allrecords transparent; set html bg to black to prevent
  // white canvas bleeding through gaps (content-visibility, margin collapse).
  `html{background-color:#000}`,
  `#allrecords,body{background-color:transparent}`,
  `#allrecords a{color:#ffffff;text-decoration:none}`,
  `body{--t-headline-font:'TildaSans',Arial,sans-serif;--t-text-font:'TildaSans',Arial,sans-serif}`,
].join('');

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
 * Inline only truly critical CSS (tilda-grid, 4KB) for layout stability.
 * tilda-blocks-page CSS stays blocking with preload hint by default.
 * On the homepage, makeBlocksCssAsync() converts it to non-blocking
 * because the hero Zero Block uses inline styles and doesn't need it.
 */
export function inlineCriticalCss(head: string): string {
  // Inline tilda-grid (4KB, layout-critical — prevents CLS)
  // Also inline Zero Block critical CSS + @font-face so the hero H2
  // renders immediately without waiting for async tilda-blocks-page CSS.
  return head.replace(
    /<link\b[^>]*href="\/css\/tilda-grid-3\.0\.min\.css"[^>]*\/?>/,
    `<style>${GRID_CSS}${ZERO_BLOCK_CRITICAL_CSS}</style>`
  );
}

/**
 * Make tilda-blocks-page CSS non-blocking (media="print" onload pattern).
 * Safe ONLY on pages where the hero uses inline styles (homepage).
 * Other pages keep it blocking to prevent CLS from async CSS load.
 *
 * Uses media="print" instead of rel="preload" to give the CSS LOWER
 * download priority, reducing bandwidth contention with critical resources
 * (HTML, font). The CSS still loads in parallel but doesn't block rendering.
 */
export function makeBlocksCssAsync(head: string): string {
  return head.replace(
    /<link\b[^>]*href="\/css\/tilda-blocks-page[^"]*"[^>]*>/,
    (match) => {
      if (!match.includes('rel="stylesheet"')) return match;
      if (match.includes('media="print"')) return match; // already async
      // Use media="print" onload pattern — downloads with low priority,
      // applies when loaded. Lower priority than preload = less bandwidth
      // contention with HTML/font, potentially faster FCP.
      const async = match.replace(
        'media="all"',
        'media="print" onload="this.media=\'all\'"'
      );
      return `${async}<noscript>${match}</noscript>`;
    }
  );
}

/**
 * Inline tilda-blocks-page CSS directly into <head> as a <style> block.
 *
 * WHY: When tilda-blocks-page CSS loads asynchronously (media="print" onload),
 * Chrome triggers a full style recalculation at ~3.3s on slow 3G. This causes
 * Chrome to report a NEW LCP entry for the hero subtitle, even though the
 * visual appearance may not change. Result: LCP jumps from FCP (1.2s) to 3.3s.
 *
 * By inlining the CSS, all styles are available at parse time. No async load,
 * no style recalculation, no LCP re-paint. FCP = LCP.
 *
 * The CSS is ~45KB raw but only data: URIs (no external resources). Combined
 * with HTML, gzip compresses both in one stream — net overhead is ~5-7KB gzip,
 * less than a separate HTTP request would cost on slow 3G.
 */
export function inlineBlocksPageCss(head: string): string {
  const linkMatch = head.match(/<link\b[^>]*href="(\/css\/tilda-blocks-page[^"?]+)[^"]*"[^>]*>/);
  if (!linkMatch) return head;

  const cssRelPath = linkMatch[1]; // e.g. /css/tilda-blocks-page130343853.min.css
  const cssAbsPath = join(process.cwd(), 'public', cssRelPath);

  let cssContent: string;
  try {
    cssContent = readFileSync(cssAbsPath, 'utf8');
  } catch {
    // CSS file not found — fall back to keeping the link tag unchanged
    return head;
  }

  // Replace the <link> tag with inline <style>
  return head.replace(linkMatch[0], `<style>${cssContent}</style>`);
}

/**
 * Inline ALL remaining external CSS files on the homepage.
 *
 * Replaces every <link rel="stylesheet"> (and preload/print async variants)
 * with inline <style> blocks containing the file content. This eliminates:
 * - Render-blocking CSS chain (PSI "Avoid chaining critical requests")
 * - Async style recalculation causing late LCP re-paint
 * - Extra HTTP round-trips (6 CSS files → 0 external requests)
 *
 * Also strips fonts-tildasans.css entirely (already inlined via ZERO_BLOCK_CRITICAL_CSS)
 * and removes paired <noscript> fallbacks.
 *
 * Total inline CSS: ~67KB raw. Combined with HTML, gzip compresses efficiently
 * in one stream — net overhead is ~12KB gzip vs 6 separate HTTP requests.
 */
export function inlineAllPageCss(head: string): string {
  let result = head;

  // Remove fonts-tildasans completely (duplicate of inlined @font-face)
  result = result.replace(
    /<link\b[^>]*href="[^"]*fonts-tildasans[^"]*"[^>]*\/?>\s*(?:<noscript>\s*<link\b[^>]*href="[^"]*fonts-tildasans[^"]*"[^>]*\/?>\s*<\/noscript>\s*)?/g,
    '',
  );

  // Remove all <noscript> fallbacks first (they contain duplicate link tags)
  result = result.replace(
    /\s*<noscript>\s*<link\b[^>]*rel="stylesheet"[^>]*\/?>\s*<\/noscript>/g,
    '',
  );

  // Find and inline all remaining CSS link tags (blocking, preload, or print patterns)
  result = result.replace(
    /<link\b[^>]*href="(\/css\/[^"?]+)[^"]*"[^>]*>/g,
    (match, cssRelPath) => {
      // Skip non-stylesheet links (e.g. preconnect, dns-prefetch)
      if (!match.includes('stylesheet') && !match.includes('as="style"')) return match;

      const cssAbsPath = join(process.cwd(), 'public', cssRelPath);
      try {
        const cssContent = readFileSync(cssAbsPath, 'utf8');
        return `<style>${cssContent}</style>`;
      } catch {
        // File not found — keep original tag
        return match;
      }
    },
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
      '<script>(function(){var n=function(){return n};n.fn=n.prototype={jquery:"stub"};n.extend=n.each=n.ready=n.on=n.off=n.trigger=n.find=n.filter=n.css=n.attr=n.addClass=n.removeClass=n.toggleClass=n.text=n.html=n.val=n.append=n.prepend=n.remove=n.data=n.animate=n.hide=n.show=n.fadeIn=n.fadeOut=n.slideDown=n.slideUp=n;n.bridget=n;n.isFunction=function(){return false};n.isArray=Array.isArray;window.jQuery=window.$=n})()</script>'
    );
}

/**
 * Add font preload and hero image fetchpriority hints to <head>.
 * Extracts the first content image from mainContent to preload it.
 * For homepage (isHomepage=true), preloads responsive video poster instead.
 */
export function addResourceHints(head: string, mainContent: string, isHomepage = false): string {
  // DNS prefetch for deferred third-party analytics
  const dnsPrefetch = [
    'mc.yandex.ru',
    'www.googletagmanager.com',
    'connect.facebook.net',
  ].map(h => `<link rel="dns-prefetch" href="//${h}">`).join('');

  // Preload tilda-zero only on non-homepage pages (homepage uses custom CSS hero,
  // so tilda-zero.js is not needed for LCP there — saves 44KB from critical path)
  const zeroPreload = isHomepage
    ? ''
    : '<link rel="preload" href="/js/tilda-zero-1.1.min.js" as="script">';

  // Preload the self-hosted TildaSans font
  const fontPreload = '<link rel="preload" href="/fonts/TildaSans-VF.woff2" as="font" type="font/woff2" crossorigin>';

  let heroPreload: string;
  if (isHomepage) {
    // Homepage hero uses inline LQIP base64 background (in bestauto-custom.css) — no image preload needed.
    // Video loads lazily via HLS after requestIdleCallback.
    heroPreload = '';
  } else {
    // Find first real image in mainContent.
    // Prefer data-original (Tilda lazy-loader attribute = actual content images)
    // over src= which is often a tiny placeholder (noroot.png).
    const imgMatch = mainContent.match(/data-original="(\/images\/[^"]+\.(jpg|jpeg|png|webp))"/i)
      ?? mainContent.match(/src="(\/images\/[^"]+\.(jpg|jpeg|png|webp))"/i);
    heroPreload = imgMatch
      ? `<link rel="preload" href="${imgMatch[1]}" as="image" fetchpriority="high">`
      : '';
  }

  // Preload tilda-blocks-page CSS so the browser fetches it in parallel with HTML.
  // On homepage this CSS is async (makeBlocksCssAsync), preload is already part of the tag.
  // On other pages the CSS is blocking; this preload starts the download earlier.
  const cssMatch = !isHomepage && head.match(/href="(\/css\/tilda-blocks-page[^"?]+\.min\.css[^"]*)"/);
  const cssPreload = cssMatch
    ? `<link rel="preload" href="${cssMatch[1]}" as="style">`
    : '';

  return dnsPrefetch + cssPreload + zeroPreload + fontPreload + heroPreload + head;
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
 * Remove tilda-zero.js and tilda-zero-scale.js script tags entirely.
 * Homepage uses a custom CSS-only hero (.ba-hero) and has zero t396 blocks,
 * so these 49KB of scripts are completely unnecessary — removing them saves
 * ~250ms on slow 3G by freeing bandwidth for critical resources (CSS, font).
 */
export function removeZeroBlockScripts(content: string): string {
  return content.replace(
    /<script\b[^>]*src="[^"]*tilda-zero[^"]*"[^>]*>\s*<\/script>\s*/g,
    '',
  );
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
    'tilda-map-1.0',
    'tilda-zoom-2.0',
    'tilda-slds-1.4',
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
 * Add content-visibility:auto to below-fold t-rec sections.
 * Skips the first ABOVE_FOLD sections so the hero/nav render immediately.
 * Below-fold sections skip layout/paint until near the viewport,
 * dramatically reducing initial render cost on large pages (277KB+).
 *
 * IMPORTANT: Skips blocks containing position:fixed children (e.g. WhatsApp widget).
 * content-visibility:auto implies contain:paint which traps fixed-position elements
 * inside the container instead of positioning them relative to the viewport.
 */
export function addContentVisibility(content: string): string {
  const ABOVE_FOLD = 3; // hero + first 1-2 content sections render eagerly
  let sectionIdx = 0;

  // Pre-scan for record IDs that contain position:fixed elements (WhatsApp widget).
  // These blocks must NOT get content-visibility:auto or their fixed children won't render.
  const fixedChildIds = new Set<string>();
  const recBlockRegex = /<div\s+id="(rec\d+)"[\s\S]*?(?=<div\s+id="rec\d+"|$)/g;
  let blockMatch: RegExpExecArray | null;
  while ((blockMatch = recBlockRegex.exec(content)) !== null) {
    if (blockMatch[0].includes('ba-wa-wrap') || blockMatch[0].includes('position:fixed') || blockMatch[0].includes('position: fixed')) {
      fixedChildIds.add(blockMatch[1]);
    }
  }

  return content.replace(
    /<div\s+(id="rec\d+")\s+(class="r t-rec[^"]*")\s+(style=")/g,
    (match, idAttr, classAttr, stylePrefix) => {
      sectionIdx++;
      if (sectionIdx <= ABOVE_FOLD) return match;
      // Extract rec ID from the id attribute
      const idMatch = (idAttr as string).match(/id="(rec\d+)"/);
      if (idMatch && fixedChildIds.has(idMatch[1])) return match;
      return `<div ${idAttr} ${classAttr} ${stylePrefix}content-visibility:auto;contain-intrinsic-size:auto 500px;`;
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

// FAQ heading translations
const FAQ_HEADING_TEXT: Readonly<Record<string, string>> = {
  ru: 'Часто задаваемые вопросы',
  ka: 'ხშირად დასმული კითხვები',
  en: 'Frequently Asked Questions',
};

/**
 * Convert inline FAQ in blog articles to a native <details>/<summary> accordion.
 *
 * Matches any <h2> or <h3> heading containing "FAQ" (case-insensitive),
 * then parses subsequent Q&A pairs in three language patterns:
 * - RU: `<strong>Вопрос [N]: ...` / `Ответ: ...`
 * - EN: `<strong>Question [N]: ...` / `Answer: ...`
 * - KA: `<strong>კითხვა [N]: ...` / `პასუხი: ...`
 */
export function convertBlogInlineFaq(content: string, lang: string = 'en'): string {
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

  const faqItems: ReadonlyArray<FaqAccordionItem> = pairs;
  const faqTitle = FAQ_HEADING_TEXT[lang] ?? FAQ_HEADING_TEXT['en'];
  const accordionHtml = renderBlogFaqAccordion(faqItems, faqTitle);

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
 * Language-specific fallback alt text for images.
 * Service pages get "{ServiceName} — BESTAUTO", homepage gets localized tagline.
 */
const ALT_SERVICE_NAMES: Readonly<Record<string, Record<string, string>>> = {
  'polishing': { ka: 'მანქანის პოლირება', ru: 'Полировка автомобиля', en: 'Car Polishing' },
  'ceramiccoating': { ka: 'კერამიკული დაფარვა', ru: 'Керамическое покрытие', en: 'Ceramic Coating' },
  'ppf-shield-wrapping': { ka: 'PPF დამცავი ფირი', ru: 'Защитная плёнка PPF', en: 'PPF Paint Protection Film' },
  'vinyl-wrapping': { ka: 'ფერის შეცვლა დამცავი ფირით', ru: 'Смена цвета защитной плёнкой', en: 'Color Change Wrap' },
  'interior-cleaning': { ka: 'ქიმწმენდა', ru: 'Химчистка салона', en: 'Interior Cleaning' },
  'carwash': { ka: 'მანქანის რეცხვა', ru: 'Детейлинг мойка', en: 'Premium Car Wash' },
  'auto-glass-tinting': { ka: 'მინების დაბურვა', ru: 'Тонировка стёкол', en: 'Window Tinting' },
  'windshield-repair': { ka: 'ავტომინების შეკეთება', ru: 'Ремонт автостекол', en: 'Windshield Repair' },
  'car-soundproofing': { ka: 'ხმის იზოლაცია', ru: 'Шумоизоляция', en: 'Car Soundproofing' },
  'computer-diagnostics': { ka: 'კომპიუტერული დიაგნოსტიკა', ru: 'Компьютерная диагностика', en: 'Computer Diagnostics' },
};

const ALT_HOMEPAGE: Readonly<Record<string, string>> = {
  ka: 'BESTAUTO — დეტეილინგი თბილისში',
  ru: 'BESTAUTO — Детейлинг в Тбилиси',
  en: 'BESTAUTO — Car Detailing Tbilisi',
};

function buildFallbackAlt(lang?: string, slug?: string): string {
  if (!lang) return 'BESTAUTO';
  // Homepage
  if (!slug || slug === '') return ALT_HOMEPAGE[lang] ?? 'BESTAUTO';
  // Service page
  const serviceName = ALT_SERVICE_NAMES[slug]?.[lang];
  if (serviceName) return `${serviceName} — BESTAUTO`;
  // Blog or other pages
  return 'BESTAUTO';
}

/**
 * Add contextual alt text to content images missing alt text.
 * Skips tracking pixels (mc.yandex.ru, 1x1) and noscript blocks.
 */
export function improveEmptyAlts(body: string, lang?: string, slug?: string): string {
  const fallbackAlt = buildFallbackAlt(lang, slug);

  // Temporarily remove <noscript> blocks
  const noscriptBlocks: string[] = [];
  const withoutNoscript = body.replace(/<noscript>[\s\S]*?<\/noscript>/g, (m) => {
    noscriptBlocks.push(m);
    return `\x00NS${noscriptBlocks.length - 1}\x00`;
  });

  const escaped = fallbackAlt.replace(/"/g, '&quot;');
  const processed = withoutNoscript.replace(/<img\b([^>]*)>/gi, (match, attrs: string) => {
    // Skip tracking pixels
    if (attrs.includes('mc.yandex.ru') || attrs.includes('facebook.com/tr')) return match;
    // Skip if already has non-empty alt
    const altMatch = attrs.match(/\balt="([^"]*)"/);
    if (altMatch && altMatch[1].trim() !== '') return match;
    // Has alt="" or no alt at all → add fallback
    if (altMatch) {
      return match.replace(/\balt=""/, `alt="${escaped}"`);
    }
    return `<img alt="${escaped}"${attrs}>`;
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
 * Extract a <section id="...">...</section> element from the HTML.
 * Returns [sectionHtml, contentWithout]. If not found, returns ['', content].
 */
export function extractSectionById(content: string, id: string): [string, string] {
  const marker = `<section id="${id}"`;
  const startIdx = content.indexOf(marker);
  if (startIdx < 0) return ['', content];
  let depth = 0;
  let pos = startIdx;
  while (pos < content.length) {
    const nextOpen = content.indexOf('<section', pos + 1);
    const nextClose = content.indexOf('</section>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        const endIdx = nextClose + '</section>'.length;
        return [content.slice(startIdx, endIdx), content.slice(0, startIdx) + content.slice(endIdx)];
      }
      depth--;
      pos = nextClose;
    }
  }
  return ['', content];
}

/**
 * Extract a <div id="...">...</div> element from the HTML.
 * Returns [divHtml, contentWithout]. If not found, returns ['', content].
 */
export function extractDivById(content: string, id: string): [string, string] {
  const marker = `<div id="${id}"`;
  const startIdx = content.indexOf(marker);
  if (startIdx < 0) return ['', content];
  let depth = 0;
  let pos = startIdx;
  while (pos < content.length) {
    const nextOpen = content.indexOf('<div', pos + 1);
    const nextClose = content.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        const endIdx = nextClose + '</div>'.length;
        return [content.slice(startIdx, endIdx), content.slice(0, startIdx) + content.slice(endIdx)];
      }
      depth--;
      pos = nextClose;
    }
  }
  return ['', content];
}

/**
 * Insert HTML right after a <section id="...">...</section> element.
 * Returns the original content unchanged if the section is not found.
 */
export function insertAfterSectionById(content: string, id: string, html: string): string {
  const marker = `<section id="${id}"`;
  const startIdx = content.indexOf(marker);
  if (startIdx < 0) return content;
  let depth = 0;
  let pos = startIdx;
  while (pos < content.length) {
    const nextOpen = content.indexOf('<section', pos + 1);
    const nextClose = content.indexOf('</section>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        const insertAt = nextClose + '</section>'.length;
        return content.slice(0, insertAt) + html + content.slice(insertAt);
      }
      depth--;
      pos = nextClose;
    }
  }
  return content;
}

/**
 * Insert HTML right after the first Tilda rec block with the given
 * data-alias-record-type. Returns the original content unchanged if no
 * matching block is found.
 */
export function insertAfterBlockByAliasType(content: string, aliasType: string, html: string): string {
  const typeMarker = `data-alias-record-type="${aliasType}"`;
  const typeIdx = content.indexOf(typeMarker);
  if (typeIdx < 0) return content;
  const before = content.slice(0, typeIdx);
  const recMatches = [...before.matchAll(/id="(rec\d+)"/g)];
  if (recMatches.length === 0) return content;
  const recId = recMatches[recMatches.length - 1][1];
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
      if (depth === 0) {
        const insertPos = nextClose + '</div>'.length;
        return content.slice(0, insertPos) + html + content.slice(insertPos);
      }
      depth--;
      pos = nextClose;
    }
  }
  return content;
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
  // Use greedy match with " /> anchor to avoid stopping at inner quotes
  // from malformed Tilda tags like <s style="opacity:0.5"> inside content.
  return sanitized.replace(
    /(<meta\s+name="description"\s+content=")([\s\S]*?)("\s*\/>)/i,
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

// ---------------------------------------------------------------------------
// Relocate <style> blocks embedded inside <a>/<button> elements.
// Tilda exports scoped CSS rules inside anchor and submit-button tags;
// browsers render <style> content as visible text when it is nested in
// phrasing elements (<a>, <button>).  Move each <style> to just after
// the closing tag so it becomes valid HTML while preserving button
// styling (gold bg, border-radius, etc.).
// ---------------------------------------------------------------------------

function stripButtonInlineStyles(html: string): string {
  return html.replace(
    /<style>(#rec\d+\s+\.t-btnflex[^<]*)<\/style><\/(a|button)>/g,
    '</$2><style>$1</style>'
  );
}

// ---------------------------------------------------------------------------
// Strip CMS metadata blocks from newer blog articles (page129xxx series).
// Removes visible "Сео-заголовок:", "URL:", "Тип:" paragraphs and
// inline-styled duplicate <h1> elements from editorial templates.
// ---------------------------------------------------------------------------

export function stripBlogCmsMetadata(content: string): string {
  // Remove inline-styled duplicate H1 (CMS template artifact)
  let result = content.replace(
    /<h1 style="font-size:\s*36px;\s*margin-bottom:\s*20px;\s*color:\s*#1a1a1a;">[^<]*<\/h1>/g,
    ''
  );
  // Remove visible SEO metadata paragraphs
  result = result.replace(
    /<p[^>]*><strong>(?:Сео-заголовок|URL|Тип):<\/strong>[^<]*<\/p>/g,
    ''
  );
  return result;
}

/**
 * Converts a static Tilda t681 price table block into the new ba-price-* flexbox layout.
 * Used for pages (like carwash) where prices come from static Tilda HTML, not Sanity CMS.
 * Parses t681__title + t681__price from each row and rebuilds as ba-price-row spans.
 */
export function transformT681ToPriceList(content: string): string {
  // Find actual HTML row elements (not CSS class references) by looking for the element pattern
  const htmlRowMarker = 'class="t681__row';
  const firstRowIdx = content.indexOf(htmlRowMarker);
  if (firstRowIdx < 0) return content;

  // Extract all t681 rows: title + price pairs
  const rowPattern = /class="t681__title[^"]*"[^>]*>([^<]*(?:<br\s*\/?>)?[^<]*)<\/div>[\s\S]*?class="t681__price[^"]*"[^>]*>([^<]*)<\/div>/g;
  const rows: Array<{ name: string; price: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = rowPattern.exec(content)) !== null) {
    const name = match[1].replace(/<br\s*\/?>/g, ' ').replace(/\s+/g, ' ').trim();
    const price = match[2].trim();
    if (name && price) rows.push({ name, price });
  }
  if (!rows.length) return content;

  // Find the rec block containing the t681 rows
  const beforeRow = content.slice(0, firstRowIdx);
  const recDivPattern = /<div id="(rec\d+)"[^>]*data-record-type="681"/g;
  let lastRecMatch: RegExpExecArray | null = null;
  let m: RegExpExecArray | null;
  while ((m = recDivPattern.exec(beforeRow)) !== null) {
    lastRecMatch = m;
  }

  let blockStart: number;
  let recId: string;

  if (lastRecMatch) {
    blockStart = beforeRow.lastIndexOf('<div', lastRecMatch.index);
    recId = lastRecMatch[1];
  } else {
    // Fallback: find closest <div id="rec..." before the first row
    const lastRec = beforeRow.lastIndexOf('<div id="rec');
    if (lastRec < 0) return content;
    blockStart = lastRec;
    recId = content.slice(lastRec).match(/id="(rec\d+)"/)?.[1] ?? 'transformed-t681';
  }

  // Walk forward to find the end of this rec block
  let depth = 0;
  let pos = blockStart;
  let blockEnd = -1;
  while (pos < content.length) {
    const nextOpen = content.indexOf('<div', pos + 1);
    const nextClose = content.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        blockEnd = nextClose + '</div>'.length;
        break;
      }
      depth--;
      pos = nextClose;
    }
  }
  if (blockEnd < 0) return content;

  // Build ba-price-* replacement
  const priceRows = rows.map(r => {
    const escapedName = r.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedPrice = r.price.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="ba-price-row"><span class="ba-price-name">${escapedName}</span><span class="ba-price-value">${escapedPrice}</span></div>`;
  }).join('');

  const newBlock = [
    `<div id="${recId}" class="r t-rec" style="padding-top:60px;padding-bottom:60px;background-color:#000000;" data-record-type="681" data-bg-color="#000000">`,
    `<div class="t-container"><div class="ba-price-section">`,
    `<div class="ba-price-list">${priceRows}</div>`,
    `</div></div></div>`,
  ].join('');

  return content.slice(0, blockStart) + newBlock + content.slice(blockEnd);
}

/**
 * Extract structured sections from a full Tilda HTML page.
 */
export function extractSections(html: string, lang?: string, slug?: string, isHomepage = false): PageSections {
  // Head content
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  const rawHead = headStart >= 0 && headEnd > headStart
    ? html.slice(headStart + 6, headEnd)
    : '';
  let processedHead = completeTwitterCards(sanitizeMetaTags(removeClientSeoScripts(deferNonCriticalScripts(delayHeadAnalytics(inlineCriticalCss(deferNonCriticalCss(deferBlockingScripts(removePolyfill(removeTildaCdnFallback(makePathsAbsolute(rawHead)))))))))));
  // Homepage hero is a custom CSS-only block (.ba-hero). Eliminate ALL async CSS
  // to prevent style recalculation from causing late LCP re-paint.
  // Strategy: inline tilda-blocks-page CSS, make ALL remaining CSS blocking.
  // Chrome reports new LCP on ANY style recalc — even from tiny async CSS files.
  if (isHomepage) {
    processedHead = inlineBlocksPageCss(processedHead);
    processedHead = inlineAllPageCss(processedHead);
    // Homepage has zero t396 blocks — strip tilda-zero scripts entirely (saves 49KB)
    processedHead = removeZeroBlockScripts(processedHead);
  }
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
  const body = stripButtonInlineStyles(rewriteImagesToWebp(expandCssBackgroundPlaceholders(makePathsAbsolute(rawBody))));

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
  const mainContent = addContentVisibility(fixImgDimensions(improveEmptyAlts(delayAnalytics(stripAlienAnalytics(removeElfsight(addLazyLoading(promoteAboveFoldImages(promoteHeroBackground(rawMainContent)))))), lang, slug)));

  return {
    headContent: addResourceHints(headContent, rawMainContent, isHomepage),
    headerBlock,
    mainContent,
    bodyClass,
  };
}
