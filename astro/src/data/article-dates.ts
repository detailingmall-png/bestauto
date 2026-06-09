/**
 * Publication / modification dates for blog articles, keyed by base slug
 * (no language prefix - dates are shared across KA/RU/EN versions).
 *
 * Generated 2026-06-10 from git history of tilda-export page files:
 *   published = first commit date (earliest across the 3 language files)
 *   modified  = last commit date (latest across the 3 language files),
 *               present only when it differs from published.
 *
 * Maintain by hand going forward: when an article's content is updated,
 * bump (or add) its `modified` date in the same commit.
 *
 * Consumed by generateArticleSchema() via [...slug].astro (Article JSON-LD
 * datePublished / dateModified).
 */

export interface ArticleDates {
  readonly published: string;
  readonly modified?: string;
}

export const ARTICLE_DATES: Readonly<Record<string, ArticleDates>> = {
  'blog/10-paint-mistakes': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/2-phase-vs-3-phase-wash': { published: '2026-04-18', modified: '2026-04-20' },
  'blog/5-year-ownership-detailing-plan': { published: '2026-05-18' },
  'blog/abrasive-polishing-deep-dive': { published: '2026-05-19' },
  'blog/anti-uv-anti-rust-tint': { published: '2026-05-20' },
  'blog/benefits-of-vinyl-wraps': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/black-gloss-wrap-popular-choice': { published: '2026-05-21' },
  'blog/car-body-color-with-vinyl-wrap': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/car-body-polishing': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/car-body-wrap-cost-guide': { published: '2026-04-21' },
  'blog/car-detailing-guide': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/car-diagnostic-test-stages-and-methods': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/car-interior-detailing-basics': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/car-interior-disinfection': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/car-interior-polishing': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/carbon-fiber-vinyl-wrap': { published: '2026-05-23' },
  'blog/ceramic-application-cost-breakdown': { published: '2026-05-24' },
  'blog/ceramic-coating-care': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ceramic-coating-cost-tbilisi': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ceramic-coating-durability': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ceramic-coating-for-car': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ceramic-coating-maintenance': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ceramic-coating-tbilisi': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ceramic-for-car-glass': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ceramic-over-ppf-layered': { published: '2026-05-25' },
  'blog/ceramic-polishing-combo': { published: '2026-04-22' },
  'blog/ceramic-prep-paint-correction': { published: '2026-05-26' },
  'blog/ceramic-vs-wax-vs-sealant': { published: '2026-05-28' },
  'blog/chem-cleaning-tbilisi-prices': { published: '2026-04-30', modified: '2026-05-01' },
  'blog/chip-repair-process-step-by-step': { published: '2026-04-23', modified: '2026-04-24' },
  'blog/chrome-delete-vinyl': { published: '2026-05-29' },
  'blog/contactless-vs-hand-wash': { published: '2026-04-24' },
  'blog/detailing-brands-we-use': { published: '2026-06-04' },
  'blog/detailing-center-tbilisi': { published: '2026-04-25' },
  'blog/detailing-cost-tbilisi': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/detailing-faq-common-myths': { published: '2026-06-05' },
  'blog/detailing-services-all-in-one': { published: '2026-04-26' },
  'blog/detailing-wash-explained': { published: '2026-04-27' },
  'blog/efficiency-of-windshield-repair': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/engine-room-cleaning': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/errors-to-find': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/front-windshield-tint-rules': { published: '2026-04-28' },
  'blog/headlight-polishing': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/hints-for-vinyl-wrapped-cars': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/how-long-ceramic-coating-lasts': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/how-often-polish-car': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/how-to-choose-detailing-studio': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/interior-ceramic-coating': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/interior-ceramic-detail': { published: '2026-04-29' },
  'blog/interior-cleaning-for-auto': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/interior-disinfection-ozone': { published: '2026-04-30', modified: '2026-05-01' },
  'blog/leather-seat-restoration': { published: '2026-06-08' },
  'blog/legal-aspects-of-tinting-in-georgia': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/new-car-detailing': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/noisemakers-and-wayouts': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/pdr-after-hail': { published: '2026-03-29', modified: '2026-06-05' },
  'blog/pdr-guidelines-and-techniques': { published: '2026-03-29', modified: '2026-06-05' },
  'blog/pdr-method': { published: '2026-03-29', modified: '2026-06-05' },
  'blog/plastic-elements-restoration': { published: '2026-03-29', modified: '2026-06-05' },
  'blog/polish-cream-diy-vs-studio': { published: '2026-05-01' },
  'blog/polishing-after-repair': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/polishing-before-after': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/polishing-before-ceramic': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/polishing-cost-tbilisi': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ppf-benefits': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ppf-film-for-cars-protection': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/ppf-full-body-wrapping-guide': { published: '2026-05-02', modified: '2026-05-03' },
  'blog/ppf-pricing-georgia-2026': { published: '2026-05-03', modified: '2026-05-04' },
  'blog/ppf-protection-levels-partial-full': { published: '2026-05-04' },
  'blog/ppf-vs-ceramic-vs-vinyl': { published: '2026-05-05' },
  'blog/protection-against-uv-rays-scratches': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/reflective-vs-dark-tint-heat': { published: '2026-05-06' },
  'blog/replace-or-repair': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/restoring-car-seats': { published: '2026-03-29', modified: '2026-06-05' },
  'blog/salon-detailing-explained': { published: '2026-05-07' },
  'blog/service-on-ppf-wrapped-car': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/smoker-cabin-nicotine-removal': { published: '2026-05-09' },
  'blog/soft-vs-abrasive-polishing': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/soundproofing-process': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/steam-headlight-polishing': { published: '2026-05-10' },
  'blog/steering-wheel-restoration': { published: '2026-03-29', modified: '2026-06-05' },
  'blog/strength-and-useful-life-of-ppf': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/summer-car-care-georgia': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/technology-and-process': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/tint-60-percent-legal-georgia': { published: '2026-05-11' },
  'blog/tint-ceramic-vs-atermal-vs-dyed': { published: '2026-05-12' },
  'blog/tint-percentage-explained': { published: '2026-05-13' },
  'blog/top-11-reasons': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/top-5-car-paint-protection': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/vehicle-tinting-techniques': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/wash-with-ceramic-ppf-care': { published: '2026-05-15' },
  'blog/why-restore-interior-elements': { published: '2026-03-29', modified: '2026-06-05' },
  'blog/why-soundproof-car': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/why-use-car-diagnostic-test': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/window-tinting-care': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/windshield-crack-repair-size-limit': { published: '2026-05-16', modified: '2026-05-25' },
  'blog/windshield-repair-benefits': { published: '2026-03-29', modified: '2026-04-14' },
  'blog/wrap-vs-paint-cost-lifetime': { published: '2026-05-17' },
};

/** Date lookup for a blog article; returns undefined for non-blog slugs. */
export function getArticleDates(baseSlug: string): ArticleDates | undefined {
  return ARTICLE_DATES[baseSlug];
}
