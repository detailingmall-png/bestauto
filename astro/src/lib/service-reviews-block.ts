/**
 * Service-page reviews block: Google review excerpts that mention the page's own service.
 *
 * Differs from `reviews-widget.ts` (generic Google feed shown site-wide): here every card is a
 * verbatim excerpt from a 5-star review, translated into the page language, picked for the service
 * the visitor is currently reading about. Data is built offline and stored in
 * `src/data/service-reviews.json`.
 */
import serviceReviewsData from '../data/service-reviews.json';

interface ReviewCard {
  author: string;
  rating: number;
  studio: string;
  date: string;
  label: string;
  text: string;
  url: string;
}

type Lang = 'ru' | 'en' | 'ka';

interface StudioMeta {
  ru: string;
  en: string;
  ka: string;
  url: string;
  rating: number;
  count: number;
}

interface ServiceReviewsData {
  meta: {
    rating: number;
    reviews_total: number;
    studios: Record<string, StudioMeta>;
  };
  pages: Record<string, { cards: Record<Lang, ReviewCard[]> }>;
}

const HEADING: Record<Lang, string> = {
  ka: 'კლიენტები ამჩნევენ იმას, რაც ჩვენთვის მნიშვნელოვანია',
  ru: 'Клиенты замечают то, что для нас важно',
  en: 'Clients notice what matters to us',
};

const SUMMARY_SUFFIX: Record<Lang, string> = {
  ka: 'შეფასება Google-ზე',
  ru: 'отзывов в Google',
  en: 'reviews on Google',
};

const EXCERPT_NOTE: Record<Lang, string> = {
  ka: 'BESTAUTO-ს კლიენტი · შეფასების ფრაგმენტი',
  ru: 'Клиент BESTAUTO · фрагмент отзыва',
  en: 'BESTAUTO customer · review excerpt',
};

const READ_ON_GOOGLE: Record<Lang, string> = {
  ka: 'წაიკითხეთ Google-ზე',
  ru: 'Читать в Google',
  en: 'Read on Google',
};

const PREV_LABEL: Record<Lang, string> = { ka: 'წინა', ru: 'Предыдущие', en: 'Previous' };
const NEXT_LABEL: Record<Lang, string> = { ka: 'შემდეგი', ru: 'Следующие', en: 'Next' };

// The headline figure covers both studios, so the block links to both cards rather than
// sending everyone to one branch.
const ALL_REVIEWS: Record<Lang, string> = {
  ka: 'შეფასებები Google-ზე:',
  ru: 'Все отзывы на Google:',
  en: 'All reviews on Google:',
};

const SUMMARY_SCOPE: Record<Lang, string> = {
  ka: 'ორივე სტუდიაზე',
  ru: 'по двум студиям',
  en: 'across both studios',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resolveLang(lang: string): Lang {
  return lang === 'ru' || lang === 'en' ? lang : 'ka';
}

function renderCard(card: ReviewCard, lang: Lang): string {
  return `<article class="ba-srv-review">
        <div class="ba-srv-review__top">
          <span class="ba-srv-review__source">Google Maps</span>
          <span class="ba-srv-review__label">${escapeHtml(card.label)}</span>
        </div>
        <blockquote class="ba-srv-review__quote">${escapeHtml(card.text)}</blockquote>
        <div class="ba-srv-review__author">
          <span class="ba-srv-review__stars" aria-label="${card.rating}/5">${'★'.repeat(card.rating)}</span>
          <span class="ba-srv-review__name">${escapeHtml(card.author)}</span>
          <span class="ba-srv-review__studio">${escapeHtml(card.studio)}</span>
        </div>
        <div class="ba-srv-review__foot">
          <span class="ba-srv-review__note">${escapeHtml(EXCERPT_NOTE[lang])}</span>
          <a class="ba-srv-review__link" href="${escapeHtml(card.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(READ_ON_GOOGLE[lang])}</a>
        </div>
      </article>`;
}

const CSS = `
<style>
.ba-srv-reviews {
  background: var(--ba-color-bg);
  color: var(--ba-color-text);
  /* Tilda sets the face on its own classes; this block sits outside them and would
     otherwise inherit the browser default from <body>. */
  font-family: var(--ba-font-family);
  padding: 40px 0 48px;
  overflow-x: hidden;
}
.ba-srv-reviews__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.ba-srv-reviews__head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--ba-color-text-subtle);
  font-size: 14px;
}
.ba-srv-reviews__summary {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}
.ba-srv-reviews__summary b {
  color: var(--ba-color-text);
  font-size: 17px;
  font-weight: var(--ba-font-weight-bold);
}
.ba-srv-reviews__summary .ba-srv-reviews__star {
  color: var(--ba-color-rating);
}
.ba-srv-reviews__viewport {
  overflow: hidden;
}
.ba-srv-reviews__track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 4px;
}
.ba-srv-reviews__track::-webkit-scrollbar { display: none; }
/* Without this, a smooth CSS scroll-behavior cancels every programmatic scroll for
   visitors who ask for reduced motion, and the arrows stop moving the track. */
@media (prefers-reduced-motion: reduce) {
  .ba-srv-reviews__track { scroll-behavior: auto; }
}
.ba-srv-review {
  flex: 0 0 calc(28.57% - 14px);
  scroll-snap-align: start;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 300px;
  padding: 24px;
  background: var(--ba-color-surface);
  border: 1px solid var(--ba-color-border);
  border-radius: var(--ba-radius-lg);
}
.ba-srv-review__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.ba-srv-review__source {
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 12px;
  font-weight: var(--ba-font-weight-bold);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--ba-color-text-faint);
}
.ba-srv-review__label {
  font-size: 12px;
  font-weight: var(--ba-font-weight-semibold);
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--ba-color-accent);
  text-align: right;
}
.ba-srv-review__quote {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--ba-color-text);
}
.ba-srv-review__author {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}
.ba-srv-review__stars {
  color: var(--ba-color-rating);
  font-size: 14px;
  letter-spacing: 1px;
}
.ba-srv-review__name {
  font-size: 14px;
  font-weight: var(--ba-font-weight-semibold);
}
.ba-srv-review__studio {
  font-size: 13px;
  color: var(--ba-color-text-subtle);
}
.ba-srv-review__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--ba-color-border-subtle);
}
.ba-srv-review__note {
  font-size: 12px;
  color: var(--ba-color-text-faint);
}
.ba-srv-review__link {
  font-size: 13px;
  color: var(--ba-color-accent);
  text-decoration: none;
  white-space: nowrap;
  border-bottom: 1px solid transparent;
  transition: border-color var(--ba-duration-fast) var(--ba-ease-default);
}
.ba-srv-review__link:hover { border-bottom-color: var(--ba-color-accent); }
.ba-srv-reviews__controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
}
.ba-srv-reviews__arrow {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ba-radius-full);
  border: 1px solid var(--ba-color-border);
  background: transparent;
  color: var(--ba-color-text);
  cursor: pointer;
  transition: background var(--ba-duration-fast) var(--ba-ease-default), border-color var(--ba-duration-fast) var(--ba-ease-default);
}
.ba-srv-reviews__arrow:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--ba-color-accent);
}
.ba-srv-reviews__arrow:disabled { opacity: 0.35; cursor: default; }
.ba-srv-reviews__arrow svg { width: 20px; height: 20px; }
.ba-srv-reviews__dots {
  display: flex;
  gap: 8px;
  margin-left: 4px;
}
.ba-srv-reviews__dots button {
  width: 24px;
  height: 24px;
  padding: 9px;
  box-sizing: border-box;
  border: none;
  border-radius: var(--ba-radius-full);
  background: var(--ba-color-text-faint);
  background-clip: content-box;
  cursor: pointer;
  transition: background var(--ba-duration-fast) var(--ba-ease-default);
}
.ba-srv-reviews__dots button[aria-current="true"] {
  background: var(--ba-color-accent);
  background-clip: content-box;
}
.ba-srv-reviews__all {
  margin-left: auto;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
  color: var(--ba-color-text-subtle);
}
.ba-srv-reviews__all a {
  color: var(--ba-color-accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color var(--ba-duration-fast) var(--ba-ease-default);
}
.ba-srv-reviews__all a:hover { border-bottom-color: var(--ba-color-accent); }
@media (max-width: 960px) {
  .ba-srv-reviews { padding: 48px 0 40px; }
  .ba-srv-review { flex: 0 0 calc(40% - 13px); }
  .ba-srv-review__quote { font-size: 15px; }
  .ba-srv-reviews__all { font-size: 14px; }
}
@media (max-width: 640px) {
  .ba-srv-reviews { padding: 40px 0 32px; }
  .ba-srv-review { flex: 0 0 88%; min-height: 0; padding: 20px; }
  .ba-srv-review__quote { font-size: 14px; }
  .ba-srv-review__label { font-size: 11px; }
  .ba-srv-reviews__all { margin: 12px 0 0; width: 100%; justify-content: center; font-size: 13px; }
  .ba-srv-reviews__controls { flex-wrap: wrap; justify-content: center; }
  .ba-srv-reviews__controls { justify-content: center; }
}
</style>`;

const JS = `
<script>
(function () {
  function init() {
    var root = document.querySelector('.ba-srv-reviews');
    if (!root) return;
    var track = root.querySelector('.ba-srv-reviews__track');
    var cards = track ? track.querySelectorAll('.ba-srv-review') : [];
    if (!track || !cards.length) return;
    var prev = root.querySelector('.ba-srv-reviews__arrow--prev');
    var next = root.querySelector('.ba-srv-reviews__arrow--next');
    var dotsBox = root.querySelector('.ba-srv-reviews__dots');

    // With "reduce motion" on, Chrome drops smooth programmatic scrolls entirely — the
    // arrows would do nothing at all. Fall back to an instant jump for those visitors.
    function behavior() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    }
    function perView() {
      if (window.matchMedia('(max-width:640px)').matches) return 1;
      if (window.matchMedia('(max-width:960px)').matches) return 2;
      return 3;
    }
    function step() {
      var card = cards[0].getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(track).gap) || 16;
      return (card + gap) * perView();
    }
    function pages() {
      return Math.max(1, Math.ceil(cards.length / perView()));
    }
    function current() {
      return Math.round(track.scrollLeft / Math.max(1, step()));
    }

    function buildDots() {
      if (!dotsBox) return;
      dotsBox.innerHTML = '';
      var total = pages();
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', String(i + 1));
        dot.setAttribute('aria-current', i === current() ? 'true' : 'false');
        (function (index) {
          dot.addEventListener('click', function () {
            track.scrollTo({ left: index * step(), behavior: behavior() });
            window.setTimeout(sync, 350);
          });
        })(i);
        dotsBox.appendChild(dot);
      }
    }

    function sync() {
      var atStart = track.scrollLeft <= 4;
      var atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      if (prev) prev.disabled = atStart;
      if (next) next.disabled = atEnd;
      if (!dotsBox) return;
      var dots = dotsBox.children;
      // The last page is a partial step, so round-to-step lands short of the final dot.
      var active = atEnd ? dots.length - 1 : current();
      for (var i = 0; i < dots.length; i++) {
        dots[i].setAttribute('aria-current', i === active ? 'true' : 'false');
      }
    }

    // Some environments never fire 'scroll' for programmatic scrolling, which would leave the
    // arrows and dots stuck in their initial state — re-sync right after every control click.
    function scrollByStep(direction) {
      track.scrollBy({ left: direction * step(), behavior: behavior() });
      window.setTimeout(sync, 350);
    }

    if (prev) prev.addEventListener('click', function () { scrollByStep(-1); });
    if (next) next.addEventListener('click', function () { scrollByStep(1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { scrollByStep(1); }
      if (e.key === 'ArrowLeft') { scrollByStep(-1); }
    });
    track.addEventListener('scroll', function () {
      window.clearTimeout(track._baSync);
      track._baSync = window.setTimeout(sync, 80);
    }, { passive: true });
    // ResizeObserver rather than window resize: the track also changes width when the
    // layout settles after fonts load, and the dot count depends on cards per view.
    if (window.ResizeObserver) {
      var lastPerView = perView();
      new ResizeObserver(function () {
        var now = perView();
        if (now !== lastPerView) { lastPerView = now; buildDots(); }
        sync();
      }).observe(track);
    } else {
      window.addEventListener('resize', function () {
        window.clearTimeout(track._baResize);
        track._baResize = window.setTimeout(function () { buildDots(); sync(); }, 150);
      });
    }

    buildDots();
    sync();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
<\/script>`;

const ARROW_LEFT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
const ARROW_RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';

/**
 * Returns the reviews block for a service page, or an empty string when the slug has no
 * curated reviews — the caller then falls back to the site-wide Google widget.
 */
export function getServiceReviewsHtml(lang: string, slug: string): string {
  const data = serviceReviewsData as ServiceReviewsData;
  const page = data.pages[slug];
  if (!page) return '';

  const resolved = resolveLang(lang);
  const cards = page.cards[resolved] ?? [];
  if (cards.length === 0) return '';

  const { rating, reviews_total: total, studios } = data.meta;
  const studioLinks = Object.values(studios)
    .map((studio) => `<a href="${escapeHtml(studio.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(studio[resolved])}</a>`)
    .join('<span aria-hidden="true">·</span>');

  // The page already carries its own reviews heading above this block, so the block
  // itself opens straight with the rating line.
  return `${CSS}
<section id="ba-reviews" class="ba-srv-reviews" aria-label="${escapeHtml(HEADING[resolved])}">
  <div class="ba-srv-reviews__container">
    <p class="ba-srv-reviews__head">
      <span class="ba-srv-reviews__summary">
        <b>${rating}</b><span class="ba-srv-reviews__star" aria-hidden="true">★</span>
      </span>
      <span>${total} ${escapeHtml(SUMMARY_SUFFIX[resolved])} ${escapeHtml(SUMMARY_SCOPE[resolved])}</span>
    </p>

    <div class="ba-srv-reviews__viewport">
      <div class="ba-srv-reviews__track" tabindex="0" role="group" aria-label="${escapeHtml(HEADING[resolved])}">
        ${cards.map((card) => renderCard(card, resolved)).join('\n')}
      </div>
    </div>

    <div class="ba-srv-reviews__controls">
      <button type="button" class="ba-srv-reviews__arrow ba-srv-reviews__arrow--prev" aria-label="${escapeHtml(PREV_LABEL[resolved])}">${ARROW_LEFT}</button>
      <button type="button" class="ba-srv-reviews__arrow ba-srv-reviews__arrow--next" aria-label="${escapeHtml(NEXT_LABEL[resolved])}">${ARROW_RIGHT}</button>
      <div class="ba-srv-reviews__dots"></div>
      <span class="ba-srv-reviews__all">${escapeHtml(ALL_REVIEWS[resolved])} ${studioLinks}</span>
    </div>
  </div>
</section>
${JS}`;
}
