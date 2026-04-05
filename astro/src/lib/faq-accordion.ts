/**
 * Universal FAQ accordion component for bestauto.ge.
 * Uses native <details>/<summary> (no JavaScript).
 * All FAQ sections across the site should use this module.
 */

export interface FaqAccordionItem {
  readonly question: string;
  readonly answer: string;
}

export interface FaqAccordionOptions {
  /** Section HTML id attribute */
  readonly id?: string;
  /** Max-width of the content area in px (default: 800) */
  readonly maxWidth?: number;
  /** Whether to render as full-bleed (100vw) — used in blog context */
  readonly fullBleed?: boolean;
  /** Custom CSS class prefix for scoping (default: 'ba-faq') */
  readonly cssPrefix?: string;
  /** Whether to show the section title (default: true) */
  readonly showTitle?: boolean;
  /** Padding top/bottom in px for desktop (default: 80) */
  readonly paddingY?: number;
  /** Whether to include border-top on the section (default: true) */
  readonly borderTop?: boolean;
}

const CHEVRON_SVG = '<svg class="ba-faq__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink:0;transition:transform 0.25s ease;"><path d="M5 7.5L10 12.5L15 7.5" style="stroke:var(--ba-color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function renderItem(item: FaqAccordionItem): string {
  return `<details class="ba-faq__item" style="border-bottom:1px solid var(--ba-color-border);">
        <summary class="ba-faq__question" style="display:flex;align-items:center;justify-content:space-between;padding:20px 0;cursor:pointer;list-style:none;font-family:var(--ba-font-family);font-weight:var(--ba-font-weight-semibold);color:var(--ba-color-text);line-height:1.4;gap:16px;">
          <span>${item.question}</span>
          ${CHEVRON_SVG}
        </summary>
        <div class="ba-faq__answer" style="padding:0 0 20px;font-family:var(--ba-font-family);color:var(--ba-color-text-muted);line-height:1.6;">${item.answer}</div>
      </details>`;
}

const FAQ_STYLES = `
    .ba-faq__heading { font-size: 36px; }
    .ba-faq__question { font-size: 18px; }
    .ba-faq__answer { font-size: 16px; }
    .ba-faq__item summary::-webkit-details-marker { display: none; }
    .ba-faq__item[open] .ba-faq__chevron { transform: rotate(180deg); }
    .ba-faq__item summary:hover { color: var(--ba-color-accent) !important; }
    @media screen and (max-width: 960px) {
      .ba-faq__heading { font-size: 32px; }
      .ba-faq__question { font-size: 17px; }
      .ba-faq__answer { font-size: 15px; }
    }
    @media screen and (max-width: 640px) {
      .ba-faq-section { padding: 48px 0 !important; }
      .ba-faq__heading { font-size: 28px; margin-bottom: 32px !important; }
      .ba-faq__question { font-size: 16px; padding: 16px 0 !important; }
      .ba-faq__answer { font-size: 15px; }
    }`;

const BLOG_FAQ_STYLES = `
    .ba-blog-faq__title { font-size: 30px; color: #e4c97e !important; font-weight: 700 !important; margin: 0 0 32px !important; font-family: var(--ba-font-family); line-height: 1.3; text-align: center; }
    .ba-blog-faq .ba-faq__question { font-size: 18px; color: #fff !important; }
    .ba-blog-faq .ba-faq__answer { font-size: 16px; color: rgba(255,255,255,0.7) !important; }
    .ba-blog-faq .ba-faq__item summary::-webkit-details-marker { display: none; }
    .ba-blog-faq .ba-faq__item[open] .ba-faq__chevron { transform: rotate(180deg); }
    .ba-blog-faq .ba-faq__item summary:hover { color: #e4c97e !important; }
    @media screen and (max-width: 960px) {
      .ba-blog-faq__title { font-size: 28px !important; }
      .ba-blog-faq .ba-faq__question { font-size: 17px; }
      .ba-blog-faq .ba-faq__answer { font-size: 15px; }
    }
    @media screen and (max-width: 640px) {
      .ba-blog-faq { padding: 48px 16px 32px !important; }
      .ba-blog-faq__title { font-size: 24px !important; margin-bottom: 24px !important; }
      .ba-blog-faq .ba-faq__question { font-size: 16px; padding: 16px 0 !important; }
      .ba-blog-faq .ba-faq__answer { font-size: 15px; }
    }`;

/**
 * Renders a standard FAQ accordion section.
 * Used on homepage, service pages, and location pages.
 */
export function renderFaqAccordion(
  items: ReadonlyArray<FaqAccordionItem>,
  title: string,
  options: FaqAccordionOptions = {},
): string {
  const {
    id = 'ba-faq',
    maxWidth = 800,
    showTitle = true,
    paddingY = 80,
    borderTop = true,
  } = options;

  const itemsHtml = items.map((item) => renderItem(item)).join('\n      ');
  const titleHtml = showTitle
    ? `<h2 class="ba-faq__heading" style="color:var(--ba-color-text);font-weight:var(--ba-font-weight-bold);text-align:center;margin:0 0 48px;font-family:var(--ba-font-family);">${title}</h2>`
    : '';
  const borderStyle = borderTop ? 'border-top:1px solid var(--ba-color-border-subtle);' : '';

  return `<div id="${id}" class="ba-faq-section" style="background:var(--ba-color-bg);padding:${paddingY}px 0;${borderStyle}">
  <div style="max-width:${maxWidth}px;margin:0 auto;padding:0 24px;">
    ${titleHtml}
    <div>
      ${itemsHtml}
    </div>
  </div>
  <style>${FAQ_STYLES}</style>
</div>`;
}

/**
 * Renders a full-bleed FAQ accordion for blog articles.
 * Breaks out of the blog content column to span the full viewport width.
 */
export function renderBlogFaqAccordion(
  items: ReadonlyArray<FaqAccordionItem>,
  title: string,
): string {
  const itemsHtml = items.map((item) => renderItem(item)).join('\n      ');

  return `<div class="ba-blog-faq" style="position:relative;left:50%;transform:translateX(-50%);width:100vw;background:#000;padding:64px 24px 48px;box-sizing:border-box;margin:0;">
      <div style="max-width:800px;margin:0 auto;">
        <h2 class="ba-blog-faq__title">${title}</h2>
        ${itemsHtml}
      </div>
      <style>${BLOG_FAQ_STYLES}</style>
    </div><!-- /ba-blog-faq -->`;
}

/**
 * Generates FAQPage JSON-LD structured data.
 */
export function renderFaqSchema(
  items: ReadonlyArray<FaqAccordionItem>,
): string {
  const schemaItems = items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: schemaItems,
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

/**
 * Helper: resolves i18n FAQ data to FaqAccordionItem[] for a given language.
 */
export function resolveFaqItems(
  items: ReadonlyArray<{
    readonly question: Readonly<Record<string, string>>;
    readonly answer: Readonly<Record<string, string>>;
  }>,
  lang: string,
): ReadonlyArray<FaqAccordionItem> {
  return items.map((item) => ({
    question: item.question[lang] ?? item.question['en'],
    answer: item.answer[lang] ?? item.answer['en'],
  }));
}

/** Finds the end of a rec block starting at blockStart by counting div depth. */
function findRecBlockEnd(html: string, blockStart: number): number {
  let depth = 0;
  let pos = blockStart;
  while (pos < html.length) {
    if (html.startsWith('<div', pos)) {
      depth++;
      pos += 4;
    } else if (html.startsWith('</div>', pos)) {
      depth--;
      if (depth === 0) return pos + 6;
      pos += 6;
    } else {
      pos++;
    }
  }
  return -1;
}

const FAQ_TITLE_MARKERS = ['Часто задаваемые', 'ხშირად დასმული', 'Frequently Asked'];

/**
 * Replaces the Tilda FAQ section (heading block + t585 accordion block)
 * with a replacement string. Handles both:
 * 1. The T017 heading block containing "Часто задаваемые вопросы" (if present)
 * 2. The T585 accordion block (data-record-type="585")
 */
export function replaceTildaFaqSection(html: string, replacement: string): string {
  const marker = 'data-record-type="585"';
  const markerIdx = html.indexOf(marker);
  if (markerIdx < 0) return html;

  // Find t585 block boundaries
  const t585Start = html.lastIndexOf('<div', markerIdx);
  if (t585Start < 0) return html;
  const t585End = findRecBlockEnd(html, t585Start);
  if (t585End < 0) return html;

  let rangeStart = t585Start;

  // Look backward for the preceding FAQ heading rec block.
  // It's typically a T017 text block right before the t585.
  const beforeT585 = html.slice(0, t585Start).trimEnd();
  // Find the last rec block before t585
  const prevBlockEndTag = beforeT585.lastIndexOf('</div>');
  if (prevBlockEndTag >= 0) {
    // Search backward from prevBlockEndTag for `<div id="rec`
    const searchArea = html.slice(0, prevBlockEndTag + 6);
    const lastRecStart = searchArea.lastIndexOf('<div id="rec');
    if (lastRecStart >= 0) {
      const prevBlock = html.slice(lastRecStart, prevBlockEndTag + 6);
      // Check if this block contains a FAQ title marker
      if (FAQ_TITLE_MARKERS.some((m) => prevBlock.includes(m))) {
        rangeStart = lastRecStart;
      }
    }
  }

  return html.slice(0, rangeStart) + replacement + html.slice(t585End);
}

/**
 * Removes Tilda-embedded FAQPage JSON-LD script tag from HTML.
 */
export function removeTildaFaqSchema(html: string): string {
  const marker = '"@type":"FAQPage"';
  const markerAlt = '"@type": "FAQPage"';
  const searchText = html.includes(marker) ? marker : markerAlt;

  const typeIdx = html.indexOf(searchText);
  if (typeIdx < 0) return html;

  const scriptOpen = html.lastIndexOf('<script', typeIdx);
  if (scriptOpen < 0) return html;

  const scriptClose = html.indexOf('</script>', typeIdx);
  if (scriptClose < 0) return html;

  return html.slice(0, scriptOpen) + html.slice(scriptClose + 9);
}
