/**
 * High-frequency (ВЧ) search keyword map per service page.
 *
 * Used to validate editorial blog→service link anchors: an anchor MUST be in
 * the target service's ВЧ-list (or flagged as exception with 'allow-longtail').
 * Priority is ordered — first keyword is the primary ВЧ (most searched).
 *
 * Sources: Yandex.Wordstat, Google Keyword Planner, manual review of the
 * Russian auto-detailing search landscape (Tbilisi/Russia).
 */

export type ServiceTarget =
  | '/polishing'
  | '/ceramiccoating'
  | '/ppf-shield-wrapping'
  | '/vinyl-wrapping'
  | '/auto-glass-tinting'
  | '/windshield-repair'
  | '/carwash'
  | '/interior-cleaning';

export const SERVICE_KEYWORDS_RU: Readonly<Record<ServiceTarget, readonly string[]>> = {
  '/polishing': [
    'полировка кузова',
    'полировка автомобиля',
    'полировка авто',
    'полировка машины',
    'полировка лкп',
    'абразивная полировка',
  ],
  '/ceramiccoating': [
    'керамическое покрытие',
    'керамическое покрытие авто',
    'керамическое покрытие автомобиля',
    'нанесение керамики',
    'керамика на авто',
  ],
  '/ppf-shield-wrapping': [
    'защитная пленка',
    'ppf пленка',
    'защитная пленка на авто',
    'оклейка ppf',
    'антигравийная пленка',
    'бронирование авто пленкой',
  ],
  '/vinyl-wrapping': [
    'виниловая пленка',
    'виниловая пленка на авто',
    'оклейка винилом',
    'оклейка авто пленкой',
    'смена цвета пленкой',
  ],
  '/auto-glass-tinting': [
    'тонировка стекол',
    'тонировка автомобиля',
    'тонировка авто',
    'атермальная тонировка',
    'тонировка лобового стекла',
  ],
  '/windshield-repair': [
    'ремонт лобового стекла',
    'ремонт сколов на стекле',
    'ремонт автостекол',
    'заделка скола на стекле',
  ],
  '/carwash': [
    'автомойка',
    'мойка авто',
    'мойка автомобиля',
    'бесконтактная мойка',
    'детейлинг мойка',
  ],
  '/interior-cleaning': [
    'химчистка салона',
    'химчистка автомобиля',
    'химчистка салона авто',
    'детейлинг салона',
    'чистка салона авто',
  ],
};

/**
 * Validates that an anchor text is a known ВЧ-keyword for its target service.
 * Case-insensitive comparison. Returns true if the anchor matches any keyword
 * in the service's list.
 */
export function isKnownServiceKeyword(target: string, anchor: string): boolean {
  const normalized = anchor.trim().toLowerCase();
  const keywords = SERVICE_KEYWORDS_RU[target as ServiceTarget];
  if (!keywords) return false;
  return keywords.some(kw => kw.toLowerCase() === normalized);
}
