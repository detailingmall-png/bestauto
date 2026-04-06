/**
 * Replaces heavy Tilda gallery blocks (t979, T604 slider, or any block with
 * data-img-zoom-url) with a lightweight custom gallery (~2 KB inline CSS + JS).
 *
 * Supports both <img data-img-zoom-url alt="..."> (t979) and
 * <div data-img-zoom-url> (T604 background-image sliders).
 *
 * CSS, lightbox and script are injected once per page; each subsequent gallery
 * only emits grid + slider markup. The outer rec wrapper is preserved.
 *
 * On mobile (≤640px): auto-advancing slider (4s, independent per gallery).
 * On desktop: CSS grid with shared lightbox on click.
 */

/**
 * Images to exclude from all galleries (by filename substring).
 * Add filenames here to hide photos site-wide without editing 40+ HTML files.
 */
const BLOCKED_IMAGES = new Set([
  'pxl_20240229_1140148',
]);

const GALLERY_STYLE = `<style>.ba-gallery{background:var(--ba-color-bg);padding:0}.ba-gallery__grid{display:grid;grid-template-columns:repeat(auto-fit,220px);justify-content:center;gap:6px;max-width:1200px;margin:0 auto;padding:0 20px}.ba-gallery__item{overflow:hidden;cursor:pointer;aspect-ratio:4/3}.ba-gallery__item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}.ba-gallery__item:hover img{transform:scale(1.04)}.ba-lb{display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.93);align-items:center;justify-content:center}.ba-lb.is-open{display:flex}.ba-lb__img{max-width:94vw;max-height:90vh;object-fit:contain;user-select:none}.ba-lb__btn{position:absolute;background:rgba(255,255,255,.15);border:none;color:#fff;font-size:28px;line-height:1;cursor:pointer;padding:10px 16px;border-radius:4px;transition:background .2s}.ba-lb__btn:hover{background:rgba(255,255,255,.3)}.ba-lb__close{top:16px;right:16px}.ba-lb__prev{left:12px;top:50%;transform:translateY(-50%)}.ba-lb__next{right:12px;top:50%;transform:translateY(-50%)}@media(max-width:640px){.ba-gallery{padding:0}.ba-gallery__grid{display:none!important}.ba-slider{display:block!important}.ba-slider__inner{position:relative;overflow:hidden;aspect-ratio:4/3;background:var(--ba-color-bg)}.ba-slider__track{display:flex;height:100%;transition:transform .5s ease}.ba-slider__slide{min-width:100%;height:100%}.ba-slider__slide img{width:100%;height:100%;object-fit:cover;display:block}.ba-slider__dots{display:flex!important;justify-content:center;gap:6px;padding:10px 0;background:var(--ba-color-bg)}.ba-slider__dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.35);border:none;cursor:pointer;padding:0;transition:background .2s}.ba-slider__dot.is-active{background:#fff}}</style>`;

/**
 * Single script that handles ALL galleries on the page:
 * - Lightbox collects images from every .ba-gallery__item
 * - Each .ba-slider is initialized independently (own auto-advance, swipe, dots)
 */
const GALLERY_SCRIPT = `<script>(function(){var lbEl=document.getElementById('ba-lb');if(!lbEl)return;var imgEl=lbEl.querySelector('.ba-lb__img');var imgs=[];var cur=0;function open(i){cur=i;imgEl.src=imgs[i].full;imgEl.alt=imgs[i].alt;lbEl.classList.add('is-open')}function close(){lbEl.classList.remove('is-open');imgEl.src=''}function nav(d){cur=(cur+d+imgs.length)%imgs.length;imgEl.src=imgs[cur].full;imgEl.alt=imgs[cur].alt}document.querySelectorAll('.ba-gallery__item').forEach(function(el,i){imgs.push({full:el.dataset.full,alt:el.querySelector('img').alt||''});el.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();open(i)})});var tz=document.querySelector('.t-zoomer__wrapper');if(tz)tz.style.pointerEvents='none';lbEl.querySelector('.ba-lb__close').addEventListener('click',close);lbEl.querySelector('.ba-lb__prev').addEventListener('click',function(){nav(-1)});lbEl.querySelector('.ba-lb__next').addEventListener('click',function(){nav(1)});lbEl.addEventListener('click',function(e){if(e.target===lbEl)close()});document.addEventListener('keydown',function(e){if(!lbEl.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')nav(-1);if(e.key==='ArrowRight')nav(1)});if(window.matchMedia('(max-width:640px)').matches){document.querySelectorAll('.ba-slider').forEach(function(slider){slider.style.display='block';var dw=slider.querySelector('.ba-slider__dots');if(dw)dw.style.display='flex';var track=slider.querySelector('.ba-slider__track');var dots=slider.querySelectorAll('.ba-slider__dot');var total=dots.length;var sc=0;var timer;function goTo(n){sc=(n+total)%total;track.style.transform='translateX(-'+sc*100+'%)';dots.forEach(function(d,i){d.classList.toggle('is-active',i===sc)})}function startAuto(){timer=setInterval(function(){goTo(sc+1)},4000)}function stopAuto(){clearInterval(timer)}dots.forEach(function(d,i){d.addEventListener('click',function(){stopAuto();goTo(i);startAuto()})});var tx=0;var inner=slider.querySelector('.ba-slider__inner');inner.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});inner.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40){stopAuto();goTo(sc+(dx<0?1:-1));startAuto()}},{passive:true});goTo(0);startAuto()})}})();</script>`;

const LIGHTBOX_HTML = `<div class="ba-lb" id="ba-lb" role="dialog" aria-modal="true"><img class="ba-lb__img" src="" alt=""><button class="ba-lb__btn ba-lb__close" aria-label="Close">&#215;</button><button class="ba-lb__btn ba-lb__prev" aria-label="Previous">&#8249;</button><button class="ba-lb__btn ba-lb__next" aria-label="Next">&#8250;</button></div>`;

/** Escape a string for safe insertion into an HTML attribute. */
function escAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Normalises a Tilda image path to an absolute URL path (leading slash). */
function normalisePath(p: string): string {
  if (!p || p.startsWith('/') || p.startsWith('http')) return p;
  return '/' + p;
}

/** Rewrite image path to .webp — all gallery images have a .webp copy. */
function toWebp(p: string): string {
  return p.replace(/\.(png|jpe?g)$/i, '.webp');
}

function parseGalleryImages(block: string): Array<{ full: string; alt: string }> {
  const items: Array<{ full: string; alt: string }> = [];
  const re = /data-img-zoom-url="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block)) !== null) {
    const path = toWebp(normalisePath(m[1]));
    if ([...BLOCKED_IMAGES].some(b => path.includes(b))) continue;
    // Extract alt from the same tag — works for <img> (has alt) and <div> (no alt)
    const tagEnd = block.indexOf('>', m.index);
    const tagChunk = block.slice(m.index, tagEnd > 0 ? tagEnd : m.index + 500);
    const altMatch = /alt="([^"]*)"/.exec(tagChunk);
    items.push({ full: path, alt: altMatch ? altMatch[1] : '' });
  }
  return items;
}

/**
 * Builds gallery HTML for a single block.
 * @param includeGlobals — true for the first gallery on the page
 *   (injects shared CSS, lightbox overlay, and script). Subsequent
 *   galleries only emit grid + slider markup.
 */
function buildGalleryHtml(
  images: Readonly<Array<{ full: string; alt: string }>>,
  includeGlobals: boolean,
): string {
  const gridItems = images.map(({ full, alt }) =>
    `<div class="ba-gallery__item" data-full="${escAttr(full)}"><img src="${escAttr(full)}" alt="${escAttr(alt)}" loading="lazy" decoding="async"></div>`
  ).join('');

  const sliderSlides = images.map(({ full, alt }, i) =>
    `<div class="ba-slider__slide"><img src="${escAttr(full)}" alt="${escAttr(alt)}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async"></div>`
  ).join('');

  const sliderDots = images.map((_, i) =>
    `<button class="ba-slider__dot${i === 0 ? ' is-active' : ''}" aria-label="Slide ${i + 1}"></button>`
  ).join('');

  const parts: string[] = [];
  if (includeGlobals) parts.push(GALLERY_STYLE);
  parts.push(
    `<div class="ba-gallery">`,
    `<div class="ba-gallery__grid"${images.length <= 5 ? ` style="grid-template-columns:repeat(${images.length},1fr)"` : ' style="grid-template-columns:repeat(5,1fr);max-width:1300px"'}>${gridItems}</div>`,
    `<div class="ba-slider" style="display:none">`,
    `<div class="ba-slider__inner"><div class="ba-slider__track">${sliderSlides}</div></div>`,
    `<div class="ba-slider__dots" style="display:none">${sliderDots}</div>`,
    `</div>`,
  );
  if (includeGlobals) parts.push(LIGHTBOX_HTML);
  parts.push(`</div>`);
  if (includeGlobals) parts.push(GALLERY_SCRIPT);
  return parts.join('');
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
 * Replaces all gallery blocks (t979/T604 or any block with data-img-zoom-url)
 * with a lightweight custom gallery. CSS, lightbox and script are injected once;
 * subsequent galleries only emit grid + slider markup.
 */
export function replaceGalleries(html: string): string {
  let result = html;
  // Track replaced block start positions to avoid double-processing
  const replaced = new Set<number>();
  let isFirstGallery = true;

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

    const newBlock = wrapper + buildGalleryHtml(images, isFirstGallery) + '</div>';
    result = result.slice(0, blockStart) + newBlock + result.slice(blockEnd);
    replaced.add(blockStart);
    searchFrom = blockStart + newBlock.length;
    isFirstGallery = false;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Remove duplicate studio galleries — some Tilda pages include two gallery
// rec blocks with identical photos (one lang-specific-alt, one KA-alt).
// We keep the FIRST occurrence (correct alt texts for the page language)
// and remove later dupes along with their preceding heading block (T225/T017).
// ---------------------------------------------------------------------------

/** Find end of a rec block (its closing </div>), counting nested divs properly. */
function findRecEnd(html: string, recStart: number): number {
  // Start depth at 1 to account for the opening <div id="rec...">
  let depth = 1;
  let pos = recStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) return -1;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      depth--;
      if (depth === 0) return nextClose + '</div>'.length;
      pos = nextClose;
    }
  }
  return -1;
}

export function removeDuplicateGalleries(html: string): string {
  // 1. Collect all ba-gallery rec blocks with their image fingerprint
  const galleries: ReadonlyArray<{
    readonly recStart: number;
    readonly recEnd: number;
    readonly imgKey: string;
  }> = (() => {
    const found: Array<{ recStart: number; recEnd: number; imgKey: string }> = [];
    let pos = 0;
    while (true) {
      const idx = html.indexOf('class="ba-gallery"', pos);
      if (idx < 0) break;

      const recStart = html.lastIndexOf('<div id="rec', idx);
      if (recStart < 0) { pos = idx + 1; continue; }

      const recEnd = findRecEnd(html, recStart);
      if (recEnd < 0) { pos = idx + 1; continue; }

      // Fingerprint: sorted data-full image URLs
      const block = html.slice(recStart, recEnd);
      const urls: string[] = [];
      const re = /data-full="([^"]*)"/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(block)) !== null) urls.push(m[1]);

      found.push({ recStart, recEnd, imgKey: urls.sort().join('|') });
      pos = recEnd;
    }
    return found;
  })();

  if (galleries.length < 2) return html;

  // 2. Find later galleries whose images duplicate an earlier gallery.
  //    Keep the FIRST (language-correct) gallery; remove later dupes.
  const removeRanges: Array<readonly [number, number]> = [];
  const removed = new Set<number>();

  for (let i = 0; i < galleries.length - 1; i++) {
    if (removed.has(i)) continue;
    for (let j = i + 1; j < galleries.length; j++) {
      if (removed.has(j)) continue;
      if (galleries[i].imgKey === galleries[j].imgKey) {
        let removeStart = galleries[j].recStart;
        const removeEnd = galleries[j].recEnd;

        // Try to remove the heading block right before the duplicate gallery
        const prevBlockStart = html.lastIndexOf('<div id="rec', removeStart - 1);
        if (prevBlockStart >= 0) {
          const prevBlockEnd = findRecEnd(html, prevBlockStart);
          if (prevBlockEnd > 0 && prevBlockEnd <= removeStart) {
            const prevBlock = html.slice(prevBlockStart, prevBlockEnd);
            if (prevBlock.includes('class="t225"') || prevBlock.includes('class="t017"')) {
              removeStart = prevBlockStart;
            }
          }
        }

        removeRanges.push([removeStart, removeEnd]);
        removed.add(j);
        break;
      }
    }
  }

  if (removeRanges.length === 0) return html;

  // 3. Remove from end to start to preserve positions
  let result = html;
  for (let i = removeRanges.length - 1; i >= 0; i--) {
    const [start, end] = removeRanges[i];
    result = result.slice(0, start) + result.slice(end);
  }

  return result;
}
