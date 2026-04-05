/**
 * Hero block video injection for Tilda Zero Block (t396).
 *
 * The original Tilda Zero Block renders correctly via CSS alone —
 * positions use calc(50vh - ...) and media queries for all breakpoints.
 * tilda-zero.js (49KB) is NOT needed for initial render.
 *
 * This module injects background video into the t396 artboard and
 * replaces the t396_init() script call with the HLS video loader.
 */

/** Hero record IDs per language (primary Zero Block for each homepage). */
export const HERO_REC_IDS: Readonly<Record<string, readonly string[]>> = {
  ka: ['rec2091645383'],
  ru: ['rec593575375', 'rec1828633051'],
  en: ['rec593573287'],
};

/** Video HTML elements — desktop and mobile variants. */
const HERO_VIDEO_ELEMENTS = `<video class="ba-hero-video ba-hero-video--desktop" muted loop playsinline preload="none" width="1280" height="720">
  <source src="/hero-desktop.mp4" type="video/mp4">
</video>
<video class="ba-hero-video ba-hero-video--mobile" muted loop playsinline preload="none" width="480" height="854">
  <source src="/hero-mobile.mp4" type="video/mp4">
</video>`;

/** CSS for video positioning inside t396 artboard. */
function heroVideoCss(recId: string): string {
  return `<style>
.t396__artboard .ba-hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.t396__artboard .ba-hero-video--mobile { display: none; }
@media screen and (max-width: 639px) {
  .t396__artboard .ba-hero-video--desktop { display: none; }
  .t396__artboard .ba-hero-video--mobile { display: block; }
  #${recId} .t396__carrier { background-image: url('/images/hero-poster-mobile.webp') !important; }
}
</style>`;
}

/** HLS video init script — starts 1.5s after page load.
 *
 * 1.5s delay ensures hero text renders and Chrome records it as LCP
 * before video download begins. On real connections video typically
 * starts playing within 2-3s total.
 *
 * Uses matchMedia instead of offsetWidth to avoid forced reflow.
 */
const HERO_VIDEO_SCRIPT = `<script>
(function(){
  var isMobile=window.matchMedia('(max-width:639px)').matches;
  function getVisible(){return document.querySelector(isMobile?'.ba-hero-video--mobile':'.ba-hero-video--desktop');}
  function mp4Fallback(){
    var v=getVisible();
    if(v){v.preload='auto';v.setAttribute('autoplay','');v.play().catch(function(){});}
  }
  function startVideo(){
    var v=getVisible();if(!v)return;
    var src=isMobile?'/hls/mobile/index.m3u8':'/hls/desktop/index.m3u8';
    if(v.canPlayType('application/vnd.apple.mpegurl')){
      v.setAttribute('autoplay','');v.preload='auto';v.src=src;
      var tryPlay=function(){v.play().catch(function(){});};
      if(v.readyState>=3)tryPlay();else v.addEventListener('canplay',tryPlay,{once:true});
    } else {
      var s=document.createElement('script');
      s.src='/hls/hls.light.min.js';
      s.onload=function(){
        if(!window.Hls||!Hls.isSupported()){mp4Fallback();return;}
        var h=new Hls();h.loadSource(src);h.attachMedia(v);
        h.on(Hls.Events.MANIFEST_PARSED,function(){v.play().catch(function(){});});
      };
      s.onerror=function(){mp4Fallback();};
      document.head.appendChild(s);
    }
  }
  setTimeout(startVideo,1500);
})();
</script>`;

/**
 * Inject video elements into the existing Tilda Zero Block hero.
 *
 * Strategy:
 * 1. Find the hero rec block by ID
 * 2. Insert <video> elements after .t396__carrier (z-index:0 = behind gradient filter)
 * 3. Add CSS for video positioning
 * 4. Replace the t396_init() inline script with HLS video loader
 *
 * The t396 layout renders correctly via CSS alone (no tilda-zero.js needed).
 * The gradient overlay (.t396__filter, z-index:1) darkens the video.
 * Text elements (.tn-elem, z-index:3) stay on top.
 */
export function injectHeroVideo(mainContent: string, lang: string): string {
  const heroRecIds = HERO_REC_IDS[lang] ?? [];
  let result = mainContent;
  let videoInjected = false;

  for (const heroRecId of heroRecIds) {
    if (!result.includes(`id="${heroRecId}"`)) continue;

    if (!videoInjected) {
      // Find the carrier div inside this hero block and inject video after it
      const recIdx = result.indexOf(`id="${heroRecId}"`);

      // Replace the carrier's 20px LQIP placeholder with the video first-frame poster.
      // tilda-zero.js normally loads the full image from data-content-cover-bg,
      // but since we don't load it, we need to provide a proper poster image.
      result = result.replace(
        new RegExp(`(#${heroRecId}\\s+\\.t396__carrier\\{[^}]*background-image:url\\()[^)]+\\)`),
        (match, prefix) => `${prefix}'/images/hero-poster-desktop.webp')`,
      );

      // Find .t396__carrier closing tag within this block
      const carrierStart = result.indexOf('t396__carrier', recIdx);
      if (carrierStart < 0) continue;
      const carrierClose = result.indexOf('</div>', carrierStart);
      if (carrierClose < 0) continue;
      const insertPos = carrierClose + 6;

      // Insert video elements + CSS after carrier, before filter
      result = result.slice(0, insertPos) + HERO_VIDEO_ELEMENTS + result.slice(insertPos);
      videoInjected = true;
    }

    // Remove the t396_init() inline script (not needed without tilda-zero.js)
    result = result.replace(
      new RegExp(`<script>\\s*t_onReady\\(function\\(\\)\\s*\\{\\s*t_onFuncLoad\\('t396_init',function\\(\\)\\s*\\{\\s*t396_init\\('${heroRecId.replace('rec', '')}'\\);\\s*\\}\\);\\s*\\}\\);\\s*</script>`),
      '',
    );
  }

  if (videoInjected) {
    // Add video CSS and loader script at the end of the first hero block
    const firstRecId = heroRecIds[0];
    const recIdx = result.indexOf(`id="${firstRecId}"`);
    if (recIdx >= 0) {
      // Find the closing </div> of the rec block (outermost)
      const blockStart = result.lastIndexOf('<div', recIdx);
      let depth = 0;
      let pos = blockStart;
      let blockEnd = -1;
      while (pos < result.length) {
        if (result.startsWith('<div', pos)) { depth++; pos += 4; }
        else if (result.startsWith('</div>', pos)) {
          depth--;
          if (depth === 0) { blockEnd = pos + 6; break; }
          pos += 6;
        } else { pos++; }
      }
      if (blockEnd > 0) {
        // Insert CSS + script just before the closing </div> of the rec block
        result = result.slice(0, blockEnd - 6) + heroVideoCss(firstRecId) + HERO_VIDEO_SCRIPT + result.slice(blockEnd - 6);
      }
    }
  }

  // Remove extra hero blocks (RU has 2 rec blocks for the hero — keep first, remove second)
  let heroInserted = false;
  for (const heroRecId of heroRecIds) {
    if (!result.includes(`id="${heroRecId}"`)) continue;
    if (!heroInserted) {
      heroInserted = true;
      continue; // keep the first block
    }
    // Remove duplicate hero blocks
    result = removeRecBlock(result, heroRecId);
  }

  return result;
}

/** Remove a record block by ID (helper for removing duplicate hero blocks). */
function removeRecBlock(content: string, recId: string): string {
  const marker = `id="${recId}"`;
  const idx = content.indexOf(marker);
  if (idx < 0) return content;
  const blockStart = content.lastIndexOf('<div', idx);
  let depth = 0;
  let pos = blockStart;
  while (pos < content.length) {
    if (content.startsWith('<div', pos)) { depth++; pos += 4; }
    else if (content.startsWith('</div>', pos)) {
      depth--;
      if (depth === 0) return content.slice(0, blockStart) + content.slice(pos + 6);
      pos += 6;
    } else { pos++; }
  }
  return content;
}
