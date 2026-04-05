/**
 * Custom CSS-only hero block generator.
 * Replaces Tilda Zero Block (t396) to eliminate tilda-zero.js dependency.
 * The Zero Block requires 44KB of JS for responsive positioning,
 * adding ~2s to LCP on mobile. This custom hero uses pure CSS flexbox
 * with responsive breakpoints — renders immediately without JS.
 */

/** Hero content per language. */
const HERO_CONTENT: Readonly<Record<string, {
  readonly title: string;
  readonly subtitle: string;
  readonly ctaText: string;
  readonly ctaHref: string;
}>> = {
  ka: {
    title: 'პრემიუმ ავტო დითეილინგი თბილისში — BESTAUTO',
    subtitle: 'ავტომობილის პროფესიონალური მოვლა და დაცვა: დამცავი PPF ფირით გადაკვრა, ფერადი ფირით გადაკვრა, პოლირება კერამიკული საფარით, მინების დაბურვა და შეკეთება, სალონის ქიმწმენდა.',
    ctaText: 'მიიღეთ კონსულტაცია',
    ctaHref: '/#contacts',
  },
  ru: {
    title: 'Премиальный детейлинг автомобилей в Тбилиси',
    subtitle: 'Профессиональный уход и защита автомобиля: оклейка защитной PPF пленкой, оклейка цветной пленкой, полировка с керамикой, тонировка и ремонт стекол, химчистка салона.',
    ctaText: 'Получить консультацию',
    ctaHref: '/ru#contacts',
  },
  en: {
    title: 'PREMIUM CAR DETAILING IN TBILISI — BESTAUTO',
    subtitle: 'Professional car care and protection: PPF paint protection film, color wrap, polishing with ceramic coating, window tinting and glass repair, interior detailing.',
    ctaText: 'Get a consultation',
    ctaHref: '/en#contacts',
  },
};

/** Hero record IDs per language (used to find and replace the Zero Block). */
export const HERO_REC_IDS: Readonly<Record<string, readonly string[]>> = {
  ka: ['rec2091645383'],
  ru: ['rec593575375', 'rec1828633051'],
  en: ['rec593573287'],
};

/** HLS video init script — loaded once per page via requestIdleCallback. */
const HERO_VIDEO_SCRIPT = `<script>
(function(){
  var idle=typeof requestIdleCallback!=='undefined'?requestIdleCallback:function(cb){setTimeout(cb,200)};
  function mp4Fallback(){
    document.querySelectorAll('.ba-hero-video').forEach(function(v){
      if(v.offsetWidth>0){v.preload='auto';v.setAttribute('autoplay','');v.play().catch(function(){});}
    });
  }
  function initHLS(){
    var vids=document.querySelectorAll('.ba-hero-video');
    var needLib=false;
    vids.forEach(function(v){
      if(v.offsetWidth===0)return;
      var src=v.classList.contains('ba-hero-video--desktop')?'/hls/desktop/index.m3u8':'/hls/mobile/index.m3u8';
      if(v.canPlayType('application/vnd.apple.mpegurl')){
        v.setAttribute('autoplay','');v.preload='auto';v.src=src;
        var tryPlay=function(){v.play().catch(function(){});};
        if(v.readyState>=3)tryPlay();else v.addEventListener('canplay',tryPlay,{once:true});
      } else { needLib=true; }
    });
    if(!needLib)return;
    var s=document.createElement('script');
    s.src='/hls/hls.light.min.js';
    s.onload=function(){
      if(!window.Hls||!Hls.isSupported()){mp4Fallback();return;}
      vids.forEach(function(v){
        if(v.offsetWidth===0||v.src)return;
        var src=v.classList.contains('ba-hero-video--desktop')?'/hls/desktop/index.m3u8':'/hls/mobile/index.m3u8';
        var h=new Hls();h.loadSource(src);h.attachMedia(v);
        h.on(Hls.Events.MANIFEST_PARSED,function(){v.play().catch(function(){});});
      });
    };
    s.onerror=function(){mp4Fallback();};
    document.head.appendChild(s);
  }
  idle(initHLS,{timeout:1500});
})();
</script>`;

/**
 * Generate the complete custom hero HTML for a given language.
 * Includes video elements, gradient overlay, and HLS init script.
 */
export function generateHeroHtml(lang: string): string {
  const content = HERO_CONTENT[lang] ?? HERO_CONTENT['ka'];

  return `<div class="ba-hero">
<video class="ba-hero-video ba-hero-video--desktop" muted loop playsinline preload="none" poster="/hero-desktop-poster.webp" width="1280" height="720">
  <source src="/hero-desktop.mp4" type="video/mp4">
</video>
<video class="ba-hero-video ba-hero-video--mobile" muted loop playsinline preload="none" poster="/hero-mobile-poster.webp" width="480" height="854">
  <source src="/hero-mobile.mp4" type="video/mp4">
</video>
<div class="ba-hero__overlay"></div>
<div class="ba-hero__content">
  <h1 class="ba-hero__title">${content.title}</h1>
  <h2 class="ba-hero__subtitle">${content.subtitle}</h2>
  <a class="ba-hero__cta" href="${content.ctaHref}">${content.ctaText}</a>
</div>
${HERO_VIDEO_SCRIPT}
</div>`;
}

/**
 * Replace all Zero Block hero blocks in mainContent with the custom hero.
 * Finds each rec ID's wrapper div and replaces it entirely.
 * Returns the modified content.
 */
export function replaceZeroBlockHero(mainContent: string, lang: string): string {
  const heroRecIds = HERO_REC_IDS[lang] ?? [];
  let result = mainContent;
  let heroInserted = false;

  for (const heroRecId of heroRecIds) {
    if (!result.includes(`id="${heroRecId}"`)) continue;

    // Find the outermost div wrapper for this record block
    const recIdx = result.indexOf(`id="${heroRecId}"`);
    const blockStart = result.lastIndexOf('<div', recIdx);
    if (blockStart < 0) continue;

    // Find closing </div> by counting nesting depth
    let depth = 0;
    let pos = blockStart;
    let blockEnd = -1;
    while (pos < result.length) {
      if (result.startsWith('<div', pos)) {
        depth++;
        pos += 4;
      } else if (result.startsWith('</div>', pos)) {
        depth--;
        if (depth === 0) {
          blockEnd = pos + 6;
          break;
        }
        pos += 6;
      } else {
        pos++;
      }
    }

    if (blockEnd <= blockStart) continue;

    // Replace with custom hero HTML (only insert the hero once; remove extra blocks)
    const replacement = heroInserted ? '' : generateHeroHtml(lang);
    result = result.slice(0, blockStart) + replacement + result.slice(blockEnd);
    heroInserted = true;
  }

  return result;
}
