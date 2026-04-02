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

  return `<div class="ba-video__card" style="position:relative;border-radius:12px;overflow:hidden;background:#111;aspect-ratio:9/16;">
      <video class="ba-video__player" muted loop playsinline preload="none" poster="${video.poster}" style="width:100%;height:100%;object-fit:cover;display:block;" data-src="${video.src}">
      </video>
      <div class="ba-video__overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);transition:opacity 0.3s ease;pointer-events:none;">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.8)" stroke-width="2" fill="rgba(0,0,0,0.4)"/><path d="M19 15l14 9-14 9V15z" fill="rgba(255,255,255,0.9)"/></svg>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;padding:12px 16px;background:linear-gradient(transparent,rgba(0,0,0,0.8));pointer-events:none;">
        <span style="font-family:TildaSans,Arial,sans-serif;font-size:14px;font-weight:600;color:#fff;">${label}</span>
      </div>
    </div>`;
}

export function generateVideoGalleryHtml(lang: string): string {
  const title = SECTION_TITLE[lang] ?? SECTION_TITLE['en'];
  const cards = VIDEOS.map((v) => renderVideoCard(v, lang)).join('\n    ');

  return `<div id="ba-video-gallery" style="background:#000;padding:80px 0;border-top:1px solid rgba(255,255,255,0.06);">
  <div style="max-width:1200px;margin:0 auto;padding:0 24px;">
    <h2 style="color:#fff;font-size:36px;font-weight:700;text-align:center;margin:0 0 48px;font-family:TildaSans,Arial,sans-serif;">${title}</h2>
    <div class="ba-video__grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
      ${cards}
    </div>
  </div>
  <style>
    .ba-video__card { cursor: pointer; }
    .ba-video__card.is-playing .ba-video__overlay { opacity: 0; }
    @media screen and (max-width:960px) {
      .ba-video__grid { grid-template-columns: repeat(2,1fr) !important; }
    }
    @media screen and (max-width:639px) {
      #ba-video-gallery { padding: 48px 0 !important; }
      #ba-video-gallery h2 { font-size: 28px !important; margin-bottom: 32px !important; }
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
    document.querySelectorAll('.ba-video__card').forEach(function(card){
      card.addEventListener('click',function(){
        var v=card.querySelector('video');
        if(!v)return;
        if(!v.src&&v.dataset.src){v.src=v.dataset.src;v.load();}
        if(v.paused){v.play().then(function(){card.classList.add('is-playing');}).catch(function(){});}
        else{v.pause();card.classList.remove('is-playing');}
      });
    });
  })();
  </script>
</div>`;
}
