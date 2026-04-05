/**
 * Generates the reviews widget HTML as a string for injection into Tilda pages.
 * Follows the same pattern as whatsapp-blocks.ts.
 */
import reviewsData from '../data/reviews.json';

interface LocalizedText {
  ru?: string;
  ka?: string;
  en?: string;
  [key: string]: string | undefined;
}

interface Review {
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  relativeTime: string;
  text: string;
  texts?: LocalizedText;
  relativeTimes?: LocalizedText;
  originalLang?: string;
  time: number;
  profileUrl: string;
}

interface ReviewsData {
  overallRating: number;
  totalReviews: number;
  reviews: Review[];
}

function getLocalizedText(review: Review, lang: string): string {
  return review.texts?.[lang] ?? review.texts?.en ?? review.text;
}

function getLocalizedTime(review: Review, lang: string): string {
  return review.relativeTimes?.[lang] ?? review.relativeTimes?.en ?? review.relativeTime;
}

const DISPLAY_COUNT = 15;

const TITLE: Record<string, string> = {
  ka: 'მიმოხილვა',
  ru: 'Отзывы',
  en: 'Reviews',
};

const CTA: Record<string, string> = {
  ka: 'ყველა მიმოხილვის ნახვა Google-ზე',
  ru: 'Смотреть все отзывы на Google',
  en: 'View all reviews on Google',
};

const READ_MORE: Record<string, string> = {
  ka: 'წაიკითხე მეტი',
  ru: 'Читать далее',
  en: 'Read more',
};

const ON_GOOGLE: Record<string, string> = {
  ka: 'Google-ზე',
  ru: 'на Google',
  en: 'on Google',
};

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/Sx6wyy2b8xgTVmxdA';

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const partial = rating - full;
  let stars = '★'.repeat(full);
  if (partial >= 0.5) stars += '★';
  return stars;
}

function truncateText(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const GOOGLE_INLINE = `<span class="ba-reviews__google-inline" aria-label="Google"><span style="color:#4285F4">G</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">g</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span></span>`;

const VERIFIED_BADGE = `<svg class="ba-reviews__verified" viewBox="0 0 18 18" aria-hidden="true" width="16" height="16"><circle cx="9" cy="9" r="9" fill="#1a73e8"/><path d="M7.5 12.5L4.5 9.5l1.06-1.06 1.94 1.94 4.44-4.44 1.06 1.06z" fill="#fff"/></svg>`;

function renderReviewCards(reviews: readonly Review[], lang: string): string {
  const readMoreLabel = READ_MORE[lang] ?? READ_MORE.en;

  return reviews.map((review) => {
    const resolvedText = getLocalizedText(review, lang);
    const resolvedTime = getLocalizedTime(review, lang);
    const truncated = truncateText(resolvedText, 200);
    const hasMore = resolvedText.length > 200;
    const avatarSrc = (review.authorPhotoUrl || '/images/default-avatar.svg')
      .replace(/=s\d+(-|$)/, '=s80$1');

    return `<article class="ba-reviews__card">
        <div class="ba-reviews__card-header">
          <div class="ba-reviews__avatar-wrap">
            <img src="${escapeHtml(avatarSrc)}" alt="${escapeHtml(review.authorName)}" class="ba-reviews__avatar" width="40" height="40" loading="lazy" />
            ${VERIFIED_BADGE}
          </div>
          <div class="ba-reviews__author-info">
            <span class="ba-reviews__author-name">${escapeHtml(review.authorName)}</span>
            <span class="ba-reviews__author-time">${escapeHtml(resolvedTime)} ${ON_GOOGLE[lang] ?? ON_GOOGLE.en} ${GOOGLE_INLINE}</span>
          </div>
        </div>
        <div class="ba-reviews__card-stars">${renderStars(review.rating)}</div>
        <p class="ba-reviews__card-text">${escapeHtml(truncated)}</p>
        ${hasMore ? `<button type="button" class="ba-reviews__read-more" data-full-text="${escapeHtml(resolvedText)}">${escapeHtml(readMoreLabel)}</button>` : ''}
      </article>`;
  }).join('\n');
}

const CSS = `
<style>
.ba-reviews {
  background: var(--ba-color-bg);
  padding: 60px 0 40px;
  color: var(--ba-color-text);
  min-height: 400px;
  overflow-x: hidden;
}
.ba-reviews__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}
.ba-reviews__summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
}
.ba-reviews__google-wordmark {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 1;
  font-family: Arial, sans-serif;
}
.ba-reviews__label {
  font-size: 20px;
  font-weight: 400;
}
.ba-reviews__rating-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
  font-size: 18px;
}
.ba-reviews__rating-value {
  font-weight: 700;
  font-size: 20px;
}
.ba-reviews__stars {
  color: var(--ba-color-rating);
  font-size: 20px;
  letter-spacing: 2px;
}
.ba-reviews__count {
  color: #b0b0b0;
  font-size: 16px;
}
.ba-reviews__carousel {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
}
.ba-reviews__track-wrapper {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.ba-reviews__track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 8px 0;
}
.ba-reviews__track::-webkit-scrollbar {
  display: none;
}
.ba-reviews__card {
  flex: 0 0 calc(25% - 12px);
  scroll-snap-align: start;
  background: #fff;
  color: #333;
  border-radius: var(--ba-radius-lg);
  padding: 20px;
  text-align: left;
  min-height: 200px;
  box-sizing: border-box;
}
.ba-reviews__card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.ba-reviews__avatar-wrap {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
}
.ba-reviews__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.ba-reviews__verified {
  position: absolute;
  bottom: -2px;
  right: -2px;
  border-radius: 50%;
  background: #fff;
}
.ba-reviews__google-inline {
  font-family: Arial, sans-serif;
  font-weight: 500;
  font-size: 12px;
}
.ba-reviews__author-info {
  display: flex;
  flex-direction: column;
}
.ba-reviews__author-name {
  font-weight: 600;
  font-size: 14px;
  color: #222;
}
.ba-reviews__author-time {
  font-size: 12px;
  color: #767676;
}
.ba-reviews__card-stars {
  color: var(--ba-color-rating);
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 8px;
}
.ba-reviews__card-text {
  font-size: 14px;
  line-height: 1.5;
  color: #444;
  margin: 0;
}
.ba-reviews__card .ba-reviews__read-more {
  display: inline-block;
  margin-top: 8px;
  font-size: 13px;
  color: #767676 !important;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  text-decoration: underline;
}
.ba-reviews__card .ba-reviews__read-more:hover {
  color: #444 !important;
}
.ba-reviews__arrow {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--ba-radius-full);
  border: 1px solid var(--ba-color-text-faint);
  background: var(--ba-overlay-dark);
  color: var(--ba-color-text);
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--ba-duration-fast);
}
.ba-reviews__arrow:hover {
  background: var(--ba-overlay-light);
}
.ba-reviews__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}
.ba-reviews__dots button {
  width: 28px;
  height: 28px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: var(--ba-radius-full);
  border: none;
  background: var(--ba-color-text-faint);
  background-clip: content-box;
  cursor: pointer;
  transition: background var(--ba-duration-fast);
}
.ba-reviews__dots button.active {
  background: #fff;
  background-clip: content-box;
}
.ba-reviews__cta {
  display: inline-block;
  margin-top: 24px;
  color: var(--ba-color-accent);
  text-decoration: none;
  font-size: 15px;
  border-bottom: 1px solid transparent;
  transition: border-color var(--ba-duration-fast);
}
.ba-reviews__cta:hover {
  border-bottom-color: var(--ba-color-accent);
}
@media (max-width: 1024px) {
  .ba-reviews__card {
    flex: 0 0 calc(50% - 8px);
  }
}
@media (max-width: 960px) {
  .ba-reviews__google-wordmark { font-size: 20px; }
  .ba-reviews__label { font-size: 18px; }
  .ba-reviews__rating-line { font-size: 16px; }
  .ba-reviews__rating-value { font-size: 18px; }
  .ba-reviews__stars { font-size: 18px; }
  .ba-reviews__count { font-size: 14px; }
  .ba-reviews__card-stars { font-size: 16px; }
  .ba-reviews__cta { font-size: 14px; }
}
@media (max-width: 640px) {
  .ba-reviews__card {
    flex: 0 0 100%;
  }
  .ba-reviews__arrow {
    display: none;
  }
  .ba-reviews {
    padding: 40px 0 30px;
  }
  .ba-reviews__google-wordmark { font-size: 18px; }
  .ba-reviews__label { font-size: 16px; }
  .ba-reviews__rating-line { font-size: 14px; }
  .ba-reviews__rating-value { font-size: 16px; }
  .ba-reviews__stars { font-size: 16px; }
  .ba-reviews__count { font-size: 14px; }
  .ba-reviews__author-name { font-size: 13px; }
  .ba-reviews__card-stars { font-size: 16px; }
  .ba-reviews__cta { font-size: 14px; }
}
</style>`;

const JS = `
<script>
(function() {
  var track = document.querySelector('.ba-reviews__track');
  if (!track) return;
  var cards = track.querySelectorAll('.ba-reviews__card');
  var leftBtn = document.querySelector('.ba-reviews__arrow--left');
  var rightBtn = document.querySelector('.ba-reviews__arrow--right');
  var dotsContainer = document.querySelector('.ba-reviews__dots');

  var mqMobile = window.matchMedia('(max-width:640px)');
  var mqTablet = window.matchMedia('(max-width:1024px)');
  function getVisible() {
    return mqMobile.matches ? 1 : mqTablet.matches ? 2 : 4;
  }

  var totalPages = Math.ceil(cards.length / getVisible());

  for (var i = 0; i < totalPages; i++) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Page ' + (i + 1));
    if (i === 0) dot.className = 'active';
    dotsContainer.appendChild(dot);
  }

  function scrollTo(page) {
    var cardWidth = cards[0].offsetWidth + 16;
    track.scrollTo({ left: page * getVisible() * cardWidth, behavior: 'smooth' });
  }

  track.addEventListener('scroll', function() {
    var cardWidth = cards[0].offsetWidth + 16;
    var page = Math.round(track.scrollLeft / (getVisible() * cardWidth));
    var dots = dotsContainer.querySelectorAll('button');
    dots.forEach(function(d, i) { d.className = i === page ? 'active' : ''; });
  });

  if (leftBtn) leftBtn.addEventListener('click', function() {
    var cardWidth = cards[0].offsetWidth + 16;
    track.scrollBy({ left: -(getVisible() * cardWidth), behavior: 'smooth' });
  });
  if (rightBtn) rightBtn.addEventListener('click', function() {
    var cardWidth = cards[0].offsetWidth + 16;
    track.scrollBy({ left: getVisible() * cardWidth, behavior: 'smooth' });
  });

  // Rebuild dots on window resize (e.g. orientation change)
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      var newTotal = Math.ceil(cards.length / getVisible());
      if (newTotal !== totalPages) {
        totalPages = newTotal;
        while (dotsContainer.firstChild) dotsContainer.removeChild(dotsContainer.firstChild);
        for (var i = 0; i < totalPages; i++) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Page ' + (i + 1));
          if (i === 0) dot.className = 'active';
          dotsContainer.appendChild(dot);
        }
      }
    }, 200);
  });

  // Read more: expand full text inline instead of navigating away
  track.addEventListener('click', function(e) {
    var btn = e.target.closest('.ba-reviews__read-more');
    if (!btn) return;
    var card = btn.closest('.ba-reviews__card');
    if (!card) return;
    var p = card.querySelector('.ba-reviews__card-text');
    if (!p) return;
    p.textContent = btn.dataset.fullText || p.textContent;
    btn.style.display = 'none';
  });
})();
<\/script>`;

function hasTextInLang(review: Review, lang: string): boolean {
  return Boolean(review.texts?.[lang]) || review.originalLang === lang;
}

export function getReviewsWidgetHtml(lang: string): string {
  const data = reviewsData as ReviewsData;
  const { overallRating, totalReviews, reviews } = data;

  // Sort: reviews with text in page language first, then others
  const sorted = [...reviews].sort((a, b) => {
    const aMatch = hasTextInLang(a, lang) ? 0 : 1;
    const bMatch = hasTextInLang(b, lang) ? 0 : 1;
    return aMatch - bMatch;
  });
  const displayReviews = sorted.slice(0, DISPLAY_COUNT);

  const cta = CTA[lang] ?? CTA.en;

  let cardsHtml: string;
  if (displayReviews.length === 0) {
    const loadingMsg = lang === 'ru' ? 'Загружаем отзывы...' : lang === 'ka' ? 'მიმოხილვები იტვირთება...' : 'Loading reviews...';
    cardsHtml = `<article class="ba-reviews__card" style="flex:0 0 100%;text-align:center;display:flex;align-items:center;justify-content:center;">
      <p class="ba-reviews__card-text">${loadingMsg}</p>
    </article>`;
  } else {
    cardsHtml = renderReviewCards(displayReviews, lang);
  }

  return `${CSS}
<section id="ba-reviews" class="ba-reviews" aria-label="Reviews">
  <div class="ba-reviews__container">
    <div class="ba-reviews__summary">
      <span class="ba-reviews__google-wordmark" aria-label="Google"><span style="color:#4285F4">G</span><span style="color:#EA4335">o</span><span style="color:#FBBC05">o</span><span style="color:#4285F4">g</span><span style="color:#34A853">l</span><span style="color:#EA4335">e</span></span>
      <span class="ba-reviews__label">${TITLE[lang] ?? TITLE.en}</span>
    </div>
    <div class="ba-reviews__rating-line">
      <span class="ba-reviews__rating-value">${overallRating}</span>
      <span class="ba-reviews__stars" aria-label="Rating: ${overallRating} out of 5">${renderStars(overallRating)}</span>
      <span class="ba-reviews__count">(${totalReviews})</span>
    </div>

    <div class="ba-reviews__carousel">
      <button class="ba-reviews__arrow ba-reviews__arrow--left" aria-label="Previous" type="button">&#8249;</button>
      <div class="ba-reviews__track-wrapper">
        <div class="ba-reviews__track">
          ${cardsHtml}
        </div>
      </div>
      <button class="ba-reviews__arrow ba-reviews__arrow--right" aria-label="Next" type="button">&#8250;</button>
    </div>

    <div class="ba-reviews__dots">
    </div>

    <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" class="ba-reviews__cta">
      ${escapeHtml(cta)}
    </a>
  </div>
</section>
${JS}`;
}
