/**
 * Generates the video gallery section for the bestauto.ge homepage.
 * Shows 4 short process videos (PPF reels) with play-on-tap and lazy loading.
 * Returns complete HTML with inline styles (Tilda-compatible).
 */

interface VideoEntry {
  readonly src: string;
  readonly poster: string;
  readonly label: Readonly<Record<string, string>>;
}

const VIDEOS: ReadonlyArray<VideoEntry> = [
  {
    src: '/videos/ppf-reel1.mp4',
    poster: '/videos/ppf-reel1-poster.jpg',
    label: {
      ka: 'PPF ფირით დაფარვა',
      ru: 'Оклейка PPF плёнкой',
      en: 'PPF Film Installation',
    },
  },
  {
    src: '/videos/ppf-reel2.mp4',
    poster: '/videos/ppf-reel2-poster.jpg',
    label: {
      ka: 'კაპოტის დაცვა',
      ru: 'Защита капота',
      en: 'Hood Protection',
    },
  },
  {
    src: '/videos/ppf-reel3.mp4',
    poster: '/videos/ppf-reel3-poster.jpg',
    label: {
      ka: 'სრული დაფარვა',
      ru: 'Полная оклейка',
      en: 'Full Body Wrap',
    },
  },
  {
    src: '/videos/ppf-reel4.mp4',
    poster: '/videos/ppf-reel4-poster.jpg',
    label: {
      ka: 'დეტალური მუშაობა',
      ru: 'Детальная работа',
      en: 'Detailed Work',
    },
  },
];

const SECTION_TITLE: Readonly<Record<string, string>> = {
  ka: 'სამუშაო პროცესი',
  ru: 'Процесс работы',
  en: 'Our Work Process',
};

function renderVideoCard(video: VideoEntry, lang: string): string {
  const label = video.label[lang] ?? video.label['en'];

  return `<div class="ba-video__card" style="position:relative;border-radius:var(--ba-radius-lg);overflow:hidden;background:var(--ba-color-surface);aspect-ratio:9/16;">
      <video class="ba-video__player" muted loop playsinline preload="none" poster="${video.poster}" style="width:100%;height:100%;object-fit:cover;display:block;" data-src="${video.src}">
      </video>
      <div class="ba-video__overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:var(--ba-overlay-video);transition:opacity var(--ba-duration-normal) var(--ba-ease-default);pointer-events:none;">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" style="stroke:var(--ba-color-text-80)" stroke-width="2" fill="rgba(0,0,0,0.4)"/><path d="M19 15l14 9-14 9V15z" fill="rgba(255,255,255,0.9)"/></svg>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;padding:12px 16px;background:linear-gradient(transparent,rgba(0,0,0,0.8));pointer-events:none;">
        <span class="ba-video__label" style="font-family:var(--ba-font-family);font-weight:var(--ba-font-weight-semibold);color:var(--ba-color-text);">${label}</span>
      </div>
    </div>`;
}

export function generateVideoGalleryHtml(lang: string): string {
  const title = SECTION_TITLE[lang] ?? SECTION_TITLE['en'];
  const cards = VIDEOS.map((v) => renderVideoCard(v, lang)).join('\n    ');

  return `<div id="ba-video-gallery" style="background:var(--ba-color-bg);padding:80px 0;border-top:1px solid var(--ba-color-border-subtle);">
  <div style="max-width:1200px;margin:0 auto;padding:0 24px;">
    <h2 class="ba-video__heading" style="color:var(--ba-color-text);font-weight:var(--ba-font-weight-bold);text-align:center;margin:0 0 48px;font-family:var(--ba-font-family);">${title}</h2>
    <div class="ba-video__grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
      ${cards}
    </div>
  </div>
  <div id="ba-video-fullscreen" style="display:none;position:fixed;inset:0;z-index:var(--ba-z-modal);background:#000;align-items:center;justify-content:center;">
    <button id="ba-video-fs-close" aria-label="Close" style="position:absolute;top:16px;right:16px;z-index:1;width:48px;height:48px;background:rgba(255,255,255,0.15);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
    <video id="ba-video-fs-player" muted loop playsinline style="max-width:100%;max-height:100%;object-fit:contain;"></video>
  </div>
  <style>
    .ba-video__heading { font-size: 36px; }
    .ba-video__label { font-size: 14px; }
    .ba-video__card { cursor: pointer; }
    .ba-video__card.is-playing .ba-video__overlay { opacity: 0; }
    @media screen and (max-width: 960px) {
      .ba-video__heading { font-size: 32px; }
      .ba-video__grid { grid-template-columns: repeat(2,1fr) !important; }
    }
    @media screen and (max-width: 640px) {
      #ba-video-gallery { padding: 48px 0 !important; }
      .ba-video__heading { font-size: 28px; margin-bottom: 32px !important; }
      .ba-video__label { font-size: 13px; }
      .ba-video__grid { grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; }
    }
  </style>
  <script>
  (function(){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var v=e.target;
          if(!v.src&&v.dataset.src){
            v.src=v.dataset.src;
            v.load();
          }
          io.unobserve(v);
        }
      });
    },{rootMargin:'200px'});
    document.querySelectorAll('.ba-video__player').forEach(function(v){io.observe(v);});

    var fsOverlay=document.getElementById('ba-video-fullscreen');
    var fsPlayer=document.getElementById('ba-video-fs-player');
    var fsClose=document.getElementById('ba-video-fs-close');
    var isMobile=window.matchMedia('(max-width:960px)');
    document.body.appendChild(fsOverlay);

    var hiddenEls=[];
    function hideFixedUI(){
      var sels=['.t228','.tmenu-mobile','.ba-sticky-cta','.t943__buttonwrapper','#ba-whatsapp','.ba-wa-wrap','[class*="t-tildalabel"]'];
      sels.forEach(function(s){
        document.querySelectorAll(s).forEach(function(el){
          if(el.offsetHeight>0||getComputedStyle(el).display!=='none'){
            el.style.display='none';hiddenEls.push(el);
          }
        });
      });
    }
    function showFixedUI(){
      hiddenEls.forEach(function(el){el.style.display='';});
      hiddenEls=[];
    }

    function openFullscreen(videoSrc){
      hideFixedUI();
      fsPlayer.src=videoSrc;
      fsPlayer.load();
      fsOverlay.style.display='flex';
      document.body.style.overflow='hidden';
      fsPlayer.play().catch(function(){});
    }

    function closeFullscreen(){
      fsPlayer.pause();
      fsPlayer.removeAttribute('src');
      fsPlayer.load();
      fsOverlay.style.display='none';
      document.body.style.overflow='';
      showFixedUI();
    }

    fsClose.addEventListener('click',closeFullscreen);
    fsOverlay.addEventListener('click',function(e){
      if(e.target===fsOverlay) closeFullscreen();
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&fsOverlay.style.display==='flex') closeFullscreen();
    });

    document.querySelectorAll('.ba-video__card').forEach(function(card){
      card.addEventListener('click',function(){
        var v=card.querySelector('video');
        if(!v)return;
        var src=v.src||v.dataset.src;
        if(!src)return;

        if(isMobile.matches){
          openFullscreen(src);
          return;
        }

        if(!v.src&&v.dataset.src){v.src=v.dataset.src;v.load();}
        if(v.paused){v.play().then(function(){card.classList.add('is-playing');}).catch(function(){});}
        else{v.pause();card.classList.remove('is-playing');}
      });
    });
  })();
  </script>
</div>`;
}
