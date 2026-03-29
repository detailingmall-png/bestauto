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
 * Extract structured sections from a full Tilda HTML page.
 */
export function extractSections(html: string): PageSections {
  // Head content
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  const rawHead = headStart >= 0 && headEnd > headStart
    ? html.slice(headStart + 6, headEnd)
    : '';
  const headContent = removeTildaCdnFallback(makePathsAbsolute(rawHead));

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
  const mainContent = body.slice(mainStart);

  return { headContent, headerBlock, mainContent, bodyClass };
}
