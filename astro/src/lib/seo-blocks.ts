/**
 * SEO content blocks for service pages (all languages).
 * Generates HTML blocks injected at build time into service pages.
 */

/* ------------------------------------------------------------------ */
/*  Shared types                                                       */
/* ------------------------------------------------------------------ */

export interface MetaChange {
  readonly title: string;
  readonly description: string;
}

export interface TextReplacement {
  readonly from: string;
  readonly to: string;
}

export interface StepsBlockConfig {
  readonly heading: string;
  readonly steps: readonly {
    readonly title: string;
    readonly description: string;
  }[];
}

export interface PageSeoConfig {
  readonly meta: MetaChange;
  readonly textReplacements: readonly TextReplacement[];
  readonly seoBlock: string;
  readonly contentBlocks?: readonly string[];
  readonly stepsBlock?: StepsBlockConfig;
  readonly brandsBlock?: BrandsBlockConfig;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Wrap text in a styled <p> for reviews section subtitle injection. */
export function reviewsSubtitle(text: string): string {
  return `<p style="color:var(--ba-color-text-subtle);font-size:16px;line-height:1.5;margin:12px auto 0;max-width:640px;font-family:var(--ba-font-family);">${text}</p>`;
}

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
/*  Steps / process block (numbered gold circles, t508-compatible)    */
/* ------------------------------------------------------------------ */

interface StepsBlockConfig {
  readonly heading: string;
  readonly steps: readonly {
    readonly title: string;
    readonly description: string;
  }[];
}

export function buildStepsBlock(cfg: StepsBlockConfig): string {
  const stepsHtml = cfg.steps.map((s, i) =>
    `<li class="t-col t-col_8 t-prefix_2 t-item t-list__item" style="margin-top:${i === 0 ? 0 : 55}px;">
<div class="t-cell t-valign_top">
<div class="t508__bgimg ba-steps-circle" style="width:50px;height:50px;">${i + 1}</div>
</div>
<div class="t508__textwrapper t-cell t-valign_top">
<div class="t-name t-name_md t508__bottommargin">${s.title}</div>
<div class="t508__descr t-descr t-descr_sm">${s.description}</div>
</div>
</li>`
  ).join('\n');

  return `<div class="r t-rec ba-steps-section" style="padding-top:120px;padding-bottom:120px;background-color:#000000;" data-record-type="508" data-bg-color="#000000">
<style>.ba-steps-circle{background-color:#e4c97e;color:#000;width:50px;height:50px;font-size:20px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ba-steps-section .t508__bottommargin{margin-bottom:0;}
.ba-steps-section .t508__descr{line-height:1.5;color:rgba(255,255,255,0.7);padding-top:4px;}
.ba-steps-section .t-name{color:#fff;padding-top:5px;}
.ba-steps-section .t-section__title{margin-bottom:90px;}
@media screen and (max-width:960px){.ba-steps-section .t-section__title{margin-bottom:45px;}}
</style>
<div class="t508">
<div class="t-section__container t-container t-container_flex">
<div class="t-col t-col_12">
<div class="t-section__title t-title t-title_xs t-align_center t-margin_auto">
<span style="color:#e4c97e;"><h2 style="margin:0;font:inherit;color:inherit;">${cfg.heading}</h2></span>
</div>
</div>
</div>
<ul role="list" class="t508__container t-container">
${stepsHtml}
</ul>
</div>
</div>`;
}

/* ------------------------------------------------------------------ */
/*  Brands / film cards block (2-column cards with footer)            */
/* ------------------------------------------------------------------ */

interface BrandsBlockConfig {
  readonly heading: string;
  readonly cards: readonly {
    readonly name: string;
    readonly subtitle: string;
    readonly description: string;
  }[];
  readonly footer: string;
}

export function buildBrandsBlock(cfg: BrandsBlockConfig): string {
  const cardsHtml = cfg.cards.map(card =>
    `<div class="ba-ppf-card"><div class="t-name t-name_xl">${card.name}</div><div class="t-descr t-descr_xs ba-subtitle">${card.subtitle}</div><div class="t-descr t-descr_xs ba-body">${card.description}</div></div>`
  ).join('');

  return `<div class="r t-rec ba-brands-section" style="padding-top:105px;padding-bottom:105px;background-color:#000000;" data-bg-color="#000000" data-animationappear="off">
<div class="t-section__container t-container t-container_flex">
<div class="t-col t-col_12">
<div class="js-block-header-title t-section__title t-title t-title_xs t-align_center t-margin_auto" field="btitle" style="margin-bottom:60px;">
<span style="color:#e4c97e;">${cfg.heading}</span>
</div></div></div>
<style>.ba-brands-section .t-section__title{font-size:36px}@media(max-width:960px){.ba-brands-section .t-section__title{font-size:32px}}@media(max-width:640px){.ba-brands-section .t-section__title{font-size:28px}}.ba-ppf-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr));gap:30px;margin-bottom:30px}.ba-ppf-card{background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:30px;text-align:left}.ba-ppf-card .t-name{color:#e4c97e;margin-bottom:8px}.ba-ppf-card .ba-subtitle{color:#999;font-size:13px;margin-bottom:12px}.ba-ppf-card .ba-body{color:#fff;line-height:1.6}.ba-ppf-footer{color:#fff;text-align:center}</style>
<div class="t-container" style="padding:0 40px;box-sizing:border-box;">
<div class="ba-ppf-cards">${cardsHtml}</div>
<div class="t-descr t-descr_xs ba-ppf-footer">${cfg.footer}</div>
</div></div>`;
}

export type { BrandsBlockConfig };

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

/* ------------------------------------------------------------------ */
/*  Inject block after first native Tilda t508 (benefits section)     */
/* ------------------------------------------------------------------ */

export function injectAfterBenefits(html: string, block: string): string {
  // Find the first native Tilda t508 block (id="rec..." + data-record-type="508")
  // Skip generated blocks (ba-steps-section) which also use type 508
  const re = /id="rec\d+"\s[^>]*data-record-type="508"/;
  const match = re.exec(html);
  if (!match) return html;

  const recStart = html.lastIndexOf('<div', match.index);
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
