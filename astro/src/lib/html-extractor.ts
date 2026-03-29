/**
 * HTML extraction utilities for Tilda-exported pages.
 * Parses raw HTML into structured sections: head, nav, body, footer.
 */

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
 * Add defer to blocking scripts in <head> (jQuery and polyfill).
 * All other Tilda scripts already have async/defer.
 * Deferred scripts execute after HTML parsing in order, so jQuery → tilda-scripts order is preserved.
 */
export function deferBlockingScripts(head: string): string {
  return head
    .replace(
      /(<script\s[^>]*src="js\/tilda-polyfill[^"]*"[^>]*)(>)/g,
      (m, before, close) => before.includes('defer') ? m : `${before} defer${close}`
    )
    .replace(
      /(<script\s[^>]*src="js\/jquery[^"]*"[^>]*)(>)/g,
      (m, before, close) => before.includes('defer') ? m : `${before} defer${close}`
    );
}

/**
 * Add font preload and hero image fetchpriority hints to <head>.
 * Extracts the first content image from mainContent to preload it.
 */
export function addResourceHints(head: string, mainContent: string): string {
  // Preload the self-hosted TildaSans font
  const fontPreload = '<link rel="preload" href="/fonts/TildaSans-VF.woff2" as="font" type="font/woff2" crossorigin>';

  // Find first real image in mainContent (skip tracking pixels)
  const imgMatch = mainContent.match(/src="(\/images\/[^"]+\.(jpg|jpeg|png|webp))"/i);
  const heroPreload = imgMatch
    ? `<link rel="preload" href="${imgMatch[1]}" as="image" fetchpriority="high">`
    : '';

  return fontPreload + heroPreload + head;
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
 * Extract structured sections from a full Tilda HTML page.
 */
export function extractSections(html: string): PageSections {
  // Head content
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  const rawHead = headStart >= 0 && headEnd > headStart
    ? html.slice(headStart + 6, headEnd)
    : '';
  const headContent = deferBlockingScripts(removeTildaCdnFallback(makePathsAbsolute(rawHead)));

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
  const body = makePathsAbsolute(rawBody);

  // Header block: everything inside <!--header-->...<!--/header-->
  const headerOpenTag = '<!--header-->';
  const headerCloseTag = '<!--/header-->';
  const headerOpen = body.indexOf(headerOpenTag);
  const headerClose = body.indexOf(headerCloseTag);
  const headerBlock = headerOpen >= 0 && headerClose > headerOpen
    ? body.slice(headerOpen, headerClose + headerCloseTag.length)
    : '';

  // Main content: everything after <!--/header-->
  const mainStart = headerClose >= 0 ? headerClose + headerCloseTag.length : 0;
  const rawMainContent = body.slice(mainStart);
  const mainContent = addLazyLoading(rawMainContent);

  return {
    headContent: addResourceHints(headContent, rawMainContent),
    headerBlock,
    mainContent,
    bodyClass,
  };
}
