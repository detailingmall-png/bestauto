/**
 * SEO content blocks for KA service pages.
 * Generates HTML blocks injected at build time into service pages.
 */

/* ------------------------------------------------------------------ */
/*  SEO text block (H2 + paragraph + mini-points)                     */
/* ------------------------------------------------------------------ */

interface SeoBlockConfig {
  readonly heading: string;
  readonly text: string;
  readonly points: readonly string[];
}

export function buildSeoBlock(cfg: SeoBlockConfig): string {
  const pts = cfg.points.map(p => `<span class="ba-seo-block__point">${p}</span>`).join('');
  return `<div class="r t-rec ba-seo-block" style="padding:60px 0;background:var(--ba-color-bg);">
<div class="t-container" style="max-width:800px;margin:0 auto;padding:0 24px;">
<h2 class="ba-seo-block__heading">${cfg.heading}</h2>
<p class="ba-seo-block__text">${cfg.text}</p>
<div class="ba-seo-block__points">${pts}</div>
</div>
</div>`;
}

/* ------------------------------------------------------------------ */
/*  Comparison / explanatory block (H2 + paragraph + sub-items)       */
/* ------------------------------------------------------------------ */

interface ContentBlockConfig {
  readonly heading: string;
  readonly text: string;
  readonly items?: readonly { readonly title: string; readonly desc?: string }[];
  readonly footer?: string;
}

export function buildContentBlock(cfg: ContentBlockConfig): string {
  let itemsHtml = '';
  if (cfg.items?.length) {
    itemsHtml = '<div class="ba-content-block__items">'
      + cfg.items.map(it =>
        `<div class="ba-content-block__item"><h3 class="ba-content-block__item-title">${it.title}</h3>${it.desc ? `<p class="ba-content-block__item-desc">${it.desc}</p>` : ''}</div>`
      ).join('')
      + '</div>';
  }
  const footerHtml = cfg.footer
    ? `<p class="ba-content-block__footer">${cfg.footer}</p>`
    : '';
  return `<div class="r t-rec ba-content-block" style="padding:60px 0;background:var(--ba-color-bg);">
<div class="t-container" style="max-width:800px;margin:0 auto;padding:0 24px;">
<h2 class="ba-content-block__heading">${cfg.heading}</h2>
<p class="ba-content-block__text">${cfg.text}</p>
${itemsHtml}${footerHtml}
</div>
</div>`;
}

/* ------------------------------------------------------------------ */
/*  Meta title/description replacement helper                         */
/* ------------------------------------------------------------------ */

export function replaceMetaTitle(head: string, newTitle: string): string {
  return head.replace(/<title>[^<]*<\/title>/, `<title>${newTitle}</title>`);
}

export function replaceMetaDescription(head: string, newDesc: string): string {
  return head.replace(
    /<meta\s+name="description"\s+content="[^"]*"/,
    `<meta name="description" content="${newDesc}"`
  );
}

/* ------------------------------------------------------------------ */
/*  Inject block after hero (first t-cover / data-record-type="205")  */
/* ------------------------------------------------------------------ */

export function injectAfterHero(html: string, block: string): string {
  // Hero block: data-record-type="205" (service pages) or "396" (homepage Zero Block)
  let idx = html.indexOf('data-record-type="205"');
  if (idx < 0) idx = html.indexOf('data-record-type="396"');
  if (idx < 0) return html;

  // Walk backwards to find the opening <div of the rec block
  const recStart = html.lastIndexOf('<div', idx);
  if (recStart < 0) return html;

  // Count div depth to find matching close
  let depth = 0;
  let pos = recStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        const insertAt = nextClose + 6;
        return html.slice(0, insertAt) + '\n' + block + html.slice(insertAt);
      }
      depth--;
      pos = nextClose;
    }
  }
  return html;
}
