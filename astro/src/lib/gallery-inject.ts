/**
 * Replaces heavy Tilda t979 gallery blocks with a lightweight custom gallery.
 *
 * Tilda's tilda-zoom-2.0.min.js (33 KB) + tilda-slds-1.4.min.js (39 KB)
 * are replaced by ~2 KB of inline CSS + JS with no external dependencies.
 *
 * Each t979 block that contains data-img-zoom-url attributes is replaced.
 * The outer rec wrapper is preserved so repositioning logic in [...slug].astro
 * continues to work.
 */

const GALLERY_STYLE = `<style>.ba-gallery{background:#000;padding:40px 0}.ba-gallery__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:6px;padding:0 20px}.ba-gallery__item{overflow:hidden;cursor:pointer;aspect-ratio:4/3}.ba-gallery__item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}.ba-gallery__item:hover img{transform:scale(1.04)}.ba-lb{display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.93);align-items:center;justify-content:center}.ba-lb.is-open{display:flex}.ba-lb__img{max-width:94vw;max-height:90vh;object-fit:contain;user-select:none}.ba-lb__btn{position:absolute;background:rgba(255,255,255,.15);border:none;color:#fff;font-size:28px;line-height:1;cursor:pointer;padding:10px 16px;border-radius:4px;transition:background .2s}.ba-lb__btn:hover{background:rgba(255,255,255,.3)}.ba-lb__close{top:16px;right:16px}.ba-lb__prev{left:12px;top:50%;transform:translateY(-50%)}.ba-lb__next{right:12px;top:50%;transform:translateY(-50%)}</style>`;

const GALLERY_SCRIPT = `<script>(function(){var lbEl=document.getElementById('ba-lb');if(!lbEl)return;var imgEl=lbEl.querySelector('.ba-lb__img');var imgs=[];var cur=0;function open(i){cur=i;imgEl.src=imgs[i].full;imgEl.alt=imgs[i].alt;lbEl.classList.add('is-open')}function close(){lbEl.classList.remove('is-open');imgEl.src=''}function nav(d){cur=(cur+d+imgs.length)%imgs.length;imgEl.src=imgs[cur].full;imgEl.alt=imgs[cur].alt}document.querySelectorAll('.ba-gallery__item').forEach(function(el,i){imgs.push({full:el.dataset.full,alt:el.querySelector('img').alt||''});el.addEventListener('click',function(){open(i)})});lbEl.querySelector('.ba-lb__close').addEventListener('click',close);lbEl.querySelector('.ba-lb__prev').addEventListener('click',function(){nav(-1)});lbEl.querySelector('.ba-lb__next').addEventListener('click',function(){nav(1)});lbEl.addEventListener('click',function(e){if(e.target===lbEl)close()});document.addEventListener('keydown',function(e){if(!lbEl.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')nav(-1);if(e.key==='ArrowRight')nav(1)})})();</script>`;

const LIGHTBOX_HTML = `<div class="ba-lb" id="ba-lb" role="dialog" aria-modal="true"><img class="ba-lb__img" src="" alt=""><button class="ba-lb__btn ba-lb__close" aria-label="Close">&#215;</button><button class="ba-lb__btn ba-lb__prev" aria-label="Previous">&#8249;</button><button class="ba-lb__btn ba-lb__next" aria-label="Next">&#8250;</button></div>`;

/** Normalises a Tilda image path to an absolute URL path (leading slash). */
function normalisePath(p: string): string {
  if (!p || p.startsWith('/') || p.startsWith('http')) return p;
  return '/' + p;
}

function parseGalleryImages(block: string): Array<{ full: string; alt: string }> {
  const items: Array<{ full: string; alt: string }> = [];
  const re = /data-img-zoom-url="([^"]*)"[^>]*alt="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    items.push({ full: normalisePath(m[1]), alt: m[2] });
  }
  return items;
}

function buildGalleryHtml(images: Array<{ full: string; alt: string }>): string {
  const items = images.map(({ full, alt }) =>
    `<div class="ba-gallery__item" data-full="${full}"><img src="${full}" alt="${alt}" loading="lazy" decoding="async"></div>`
  ).join('');

  return [
    GALLERY_STYLE,
    `<div class="ba-gallery">`,
    `<div class="ba-gallery__grid">${items}</div>`,
    LIGHTBOX_HTML,
    `</div>`,
    GALLERY_SCRIPT,
  ].join('');
}

/**
 * Finds the end (exclusive) of the rec div block starting at blockStart.
 * Returns -1 if not found.
 */
function findBlockEnd(html: string, blockStart: number): number {
  let depth = 0;
  let pos = blockStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) return -1;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) return nextClose + '</div>'.length;
      depth--;
      pos = nextClose;
    }
  }
  return -1;
}

/**
 * Replaces all gallery blocks (t979 native or type=121 alias=979) that contain
 * data-img-zoom-url images with a lightweight custom gallery implementation.
 */
export function replaceGalleries(html: string): string {
  let result = html;
  // Track replaced block start positions to avoid double-processing
  const replaced = new Set<number>();

  let searchFrom = 0;
  while (true) {
    const zoomIdx = result.indexOf('data-img-zoom-url', searchFrom);
    if (zoomIdx < 0) break;

    // Find the containing rec block
    const blockStart = result.lastIndexOf('<div id="rec', zoomIdx);
    if (blockStart < 0 || replaced.has(blockStart)) {
      searchFrom = zoomIdx + 1;
      continue;
    }

    const blockEnd = findBlockEnd(result, blockStart);
    if (blockEnd < 0) { searchFrom = zoomIdx + 1; continue; }

    const block = result.slice(blockStart, blockEnd);
    const images = parseGalleryImages(block);
    if (images.length === 0) { searchFrom = blockEnd; continue; }

    // Preserve the outer rec wrapper (id, classes, padding styles)
    const wrapperMatch = /^(<div id="rec\d+"[^>]*>)/.exec(block);
    const wrapper = wrapperMatch ? wrapperMatch[1] : '<div>';

    const newBlock = wrapper + buildGalleryHtml(images) + '</div>';
    result = result.slice(0, blockStart) + newBlock + result.slice(blockEnd);
    replaced.add(blockStart);
    searchFrom = blockStart + newBlock.length;
  }

  return result;
}
