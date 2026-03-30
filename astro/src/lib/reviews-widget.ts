/**
 * Generates the reviews widget HTML as a string for injection into Tilda pages.
 * Follows the same pattern as whatsapp-blocks.ts.
 */
import reviewsData from '../data/reviews.json';

interface Review {
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  relativeTime: string;
  text: string;
  time: number;
  profileUrl: string;
}

interface ReviewsData {
  overallRating: number;
  totalReviews: number;
  reviews: Review[];
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

function renderReviewCards(reviews: readonly Review[], lang: string): string {
  const readMoreLabel = READ_MORE[lang] ?? READ_MORE.en;

  return reviews.map((review) => {
    const truncated = truncateText(review.text, 200);
    const hasMore = review.text.length > 200;
    const avatarSrc = review.authorPhotoUrl || '/images/default-avatar.svg';

    return `<article class="ba-reviews__card">
        <div class="ba-reviews__card-header">
          <img src="${escapeHtml(avatarSrc)}" alt="${escapeHtml(review.authorName)}" class="ba-reviews__avatar" width="40" height="40" loading="lazy" />
          <div class="ba-reviews__author-info">
            <span class="ba-reviews__author-name">${escapeHtml(review.authorName)}</span>
            <span class="ba-reviews__author-time">${escapeHtml(review.relativeTime)}</span>
          </div>
        </div>
        <div class="ba-reviews__card-stars">${renderStars(review.rating)}</div>
        <p class="ba-reviews__card-text">${escapeHtml(truncated)}</p>
        ${hasMore ? `<a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" class="ba-reviews__read-more">${escapeHtml(readMoreLabel)}</a>` : ''}
      </article>`;
  }).join('\n');
}

const CSS = `
<style>
.ba-reviews {
  background: #000;
  padding: 60px 0 40px;
  color: #fff;
  min-height: 400px;
}
.ba-reviews__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}
.ba-reviews__title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 24px;
  font-family: inherit;
}
.ba-reviews__summary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}
.ba-reviews__google-logo {
  height: 24px;
  width: auto;
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
  color: #f4b400;
  font-size: 20px;
  letter-spacing: 2px;
}
.ba-reviews__count {
  color: #999;
  font-size: 16px;
}
.ba-reviews__track-wrapper {
  position: relative;
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
  border-radius: 12px;
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
.ba-reviews__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
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
  color: #999;
}
.ba-reviews__card-stars {
  color: #f4b400;
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
.ba-reviews__read-more {
  display: inline-block;
  margin-top: 8px;
  font-size: 13px;
  color: #999;
  text-decoration: none;
}
.ba-reviews__read-more:hover {
  text-decoration: underline;
}
.ba-reviews__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.3);
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 0.2s;
}
.ba-reviews__arrow:hover {
  background: rgba(0,0,0,0.9);
}
.ba-reviews__arrow--left {
  left: -20px;
}
.ba-reviews__arrow--right {
  right: -20px;
}
.ba-reviews__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}
.ba-reviews__dots button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}
.ba-reviews__dots button.active {
  background: #fff;
}
.ba-reviews__cta {
  display: inline-block;
  margin-top: 24px;
  color: #e4c97e;
  text-decoration: none;
  font-size: 15px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.ba-reviews__cta:hover {
  border-bottom-color: #e4c97e;
}
@media (max-width: 1024px) {
  .ba-reviews__card {
    flex: 0 0 calc(50% - 8px);
  }
  .ba-reviews__title {
    font-size: 36px;
  }
}
@media (max-width: 640px) {
  .ba-reviews__card {
    flex: 0 0 calc(100% - 16px);
  }
  .ba-reviews__title {
    font-size: 28px;
  }
  .ba-reviews__arrow {
    display: none;
  }
  .ba-reviews {
    padding: 40px 0 30px;
  }
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

  function getVisible() {
    var w = window.innerWidth;
    return w <= 640 ? 1 : w <= 1024 ? 2 : 4;
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
})();
<\/script>`;

export function getReviewsWidgetHtml(lang: string): string {
  const data = reviewsData as ReviewsData;
  const { overallRating, totalReviews, reviews } = data;
  const displayReviews = reviews.slice(0, DISPLAY_COUNT);

  const title = TITLE[lang] ?? TITLE.en;
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
    <h2 class="ba-reviews__title">${escapeHtml(title)}</h2>
    <div class="ba-reviews__summary">
      <img src="/images/google-logo.svg" alt="Google" class="ba-reviews__google-logo" width="74" height="24" loading="lazy" />
      <span class="ba-reviews__label">Reviews</span>
    </div>
    <div class="ba-reviews__rating-line">
      <span class="ba-reviews__rating-value">${overallRating}</span>
      <span class="ba-reviews__stars" aria-label="Rating: ${overallRating} out of 5">${renderStars(overallRating)}</span>
      <span class="ba-reviews__count">(${totalReviews})</span>
    </div>

    <div class="ba-reviews__track-wrapper">
      <button class="ba-reviews__arrow ba-reviews__arrow--left" aria-label="Previous" type="button">&#8249;</button>
      <div class="ba-reviews__track">
        ${cardsHtml}
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
