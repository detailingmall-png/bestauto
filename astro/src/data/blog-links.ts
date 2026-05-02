/**
 * Editorial internal-link map for blog articles.
 *
 * Each rule pairs an exact `contextQuote` (must be unique in the article HTML)
 * with an `originalPhrase` substring inside that quote. At build time the
 * injector replaces `originalPhrase` with `<a href=target>anchor</a>`. This
 * allows Variant A text-editing: the on-page phrase can differ from the anchor
 * (e.g. on-page "Полировка" → anchor "Полировка авто" — a real ВЧ query).
 *
 * Rules:
 * - `anchor` MUST be a high-frequency (ВЧ) search query listed in
 *   `seo-service-keywords.ts` for the target service × language.
 * - `contextQuote` must appear EXACTLY once in the article HTML.
 * - `originalPhrase` must appear inside `contextQuote`.
 * - If any check fails, the injector logs a warning at build time and skips.
 *
 * No regex, no fuzzy matching, no auto first-occurrence. Only editor-picked
 * placements.
 *
 * Full guide: docs/blog-internal-links.md
 * Slash command for adding rules: .claude/commands/blog-links.md
 */

export type BlogLinkRole = 'pillar' | 'bridge' | 'cta';

export interface BlogLink {
  readonly role: BlogLinkRole;
  readonly target: string;          // path without lang prefix, e.g. '/ceramiccoating'
  readonly anchor: string;          // ВЧ-keyword — becomes the link text
  readonly originalPhrase: string;  // existing phrase in HTML to be replaced by the link
  readonly contextQuote: string;    // unique sentence in the article containing originalPhrase
}

export interface BlogLinkRule {
  readonly article: string;         // slug, e.g. 'blog/ceramic-coating-for-car'
  readonly links: readonly BlogLink[];
}

export const BLOG_LINKS_RU: readonly BlogLinkRule[] = [
  {
    article: 'blog/ceramic-coating-for-car',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'керамическое покрытие',
        contextQuote: 'На правильно подготовленной поверхности керамическое покрытие усиливает глубину цвета, блеск и водоотталкивающий эффект',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'Полировка авто',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка уменьшает завихрения, усиливает глубину цвета и подготавливает кузов',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка',
        originalPhrase: 'защитная PPF-пленка',
        contextQuote: 'более правильным выбором будет защитная PPF-пленка',
      },
    ],
  },
  {
    article: 'blog/ceramic-coating-cost-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие авто',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие в Тбилиси — одно из самых популярных',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка кузова',
        originalPhrase: 'полировка',
        contextQuote: 'деконтаминация, диагностика дефектов и полировка, финальный',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf пленка',
        originalPhrase: 'PPF',
        contextQuote: 'PPF дает более высокий класс защиты',
      },
    ],
  },
  {
    article: 'blog/ceramic-coating-maintenance',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'нанесение керамики',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие действительно облегчает повседневный уход',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'мойка авто',
        originalPhrase: 'мойка',
        contextQuote: 'Самая важная часть ухода — это правильная мойка',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка должна применяться осознанно',
      },
    ],
  },
  {
    article: 'blog/ceramic-for-car-glass',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие для стекла — это специальная обработка',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'восстановление лобового стекла',
        originalPhrase: 'восстановить треснутое или поврежденное стекло',
        contextQuote: 'восстановить треснутое или поврежденное стекло',
      },
    ],
  },
  {
    article: 'blog/how-long-ceramic-coating-lasts',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие автомобиля',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие у многих ассоциируется с блеском',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка автомобиля',
        originalPhrase: 'Полировка кузова',
        contextQuote: 'Полировка кузова.</li>',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'оклейка авто пленкой',
        originalPhrase: 'Оклейка PPF',
        contextQuote: 'Оклейка PPF на весь кузов',
      },
    ],
  },
  {
    article: 'blog/interior-ceramic-coating',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие интерьера — это защитная обработка',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'химчистка салона',
        originalPhrase: 'химчистка',
        contextQuote: 'Если нужна глубокая очистка — сначала химчистка',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка на авто',
        originalPhrase: 'PPF-защитная пленка',
        contextQuote: 'лучше подходит <strong>PPF-защитная пленка</strong>, а не керамика',
      },
    ],
  },
  {
    article: 'blog/polishing-before-ceramic',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка — только один из этапов',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамика на авто',
        originalPhrase: 'керамика',
        contextQuote: 'потому что керамика усиливает то состояние, которое уже есть',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf пленка',
        originalPhrase: 'PPF',
        contextQuote: 'почему полировка + PPF лучше',
      },
    ],
  },
  // --- PPF cluster ---
  {
    article: 'blog/ppf-benefits',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка на авто',
        originalPhrase: 'защитную PPF-пленку',
        contextQuote: 'рассматривают не только полировку и керамическое покрытие, но и защитную PPF-пленку как долгосрочное решение',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие автомобиля',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие облегчает уход, усиливает гидрофобность',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка работает в первую очередь на визуальный результат',
      },
    ],
  },
  {
    article: 'blog/ppf-film-for-cars-protection',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'оклейка полиуретановой пленкой',
        originalPhrase: 'полиуретановая защитная пленка',
        contextQuote: 'PPF — это paint protection film, то есть полиуретановая защитная пленка, которая наносится либо на самые уязвимые зоны',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие</strong> больше помогает в уходе: усиливает гидрофобный эффект',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка кузова',
        originalPhrase: 'полировку',
        contextQuote: 'вы уже сделали полировку и хотите сохранить результат',
      },
    ],
  },
  {
    article: 'blog/protection-against-uv-rays-scratches',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'антигравийная пленка',
        originalPhrase: 'защитная полиуретановая пленка',
        contextQuote: 'то в большинстве случаев лучшим выбором будет PPF — защитная полиуретановая пленка',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'виниловая пленка',
        originalPhrase: 'Виниловая пленка',
        contextQuote: 'Виниловая пленка в основном используется',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамика на авто',
        originalPhrase: 'керамике',
        contextQuote: 'Поэтому и в материалах о полировке, керамике, смене цвета и защите кузова',
      },
    ],
  },
  {
    article: 'blog/service-on-ppf-wrapped-car',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf пленка',
        originalPhrase: 'PPF',
        contextQuote: 'PPF — один из лучших способов защитить лакокрасочное покрытие автомобиля',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'мойка авто',
        originalPhrase: 'мойка',
        contextQuote: 'Для PPF лучшая мойка — безопасная ручная мойка',
      },
      // TODO: blog/service-on-ppf-wrapped-car (ru) — couldn't find clean 3rd anchor; /polishing and /ceramiccoating only in reviews
    ],
  },
  {
    article: 'blog/strength-and-useful-life-of-ppf',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'оклейка автомобиля защитной пленкой',
        originalPhrase: 'полное покрытие PPF',
        contextQuote: 'полное покрытие PPF начинается от 7500 GEL',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие отлично работает на блеск, гидрофобность и упрощение ухода',
      },
      // TODO: blog/strength-and-useful-life-of-ppf (ru) — couldn't find clean 3rd anchor; /polishing only in reviews
    ],
  },
  {
    article: 'blog/top-5-car-paint-protection',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'бронирование авто пленкой',
        originalPhrase: 'защитная полиуретановая пленка',
        contextQuote: 'Это защитная полиуретановая пленка, которая принимает часть удара на себя',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамика на авто',
        originalPhrase: 'Керамика',
        contextQuote: 'Керамика — это не физическая броня',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'виниловая пленка',
        originalPhrase: 'Винил',
        contextQuote: 'Винил отлично работает тогда, когда вы хотите изменить внешний вид машины',
      },
    ],
  },
  // --- Polishing cluster ---
  {
    article: 'blog/car-body-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'полировка кузова',
        originalPhrase: 'Полировка кузова',
        contextQuote: 'Полировка кузова — одна из самых востребованных услуг среди водителей',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие</strong> — создает химическую и гидрофобную защиту',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка',
        originalPhrase: 'PPF-пленка',
        contextQuote: 'В таких случаях более правильным решением часто становится PPF-пленка',
      },
    ],
  },
  {
    article: 'blog/car-interior-polishing',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'химчистка авто',
        originalPhrase: 'химчистки',
        contextQuote: 'Основная задача химчистки — удалить из салона грязь, пятна, пыль, запахи и накопившиеся загрязнения',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка интерьера — не «волшебная реставрация»',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка на авто',
        originalPhrase: 'защитная пленка',
        contextQuote: 'иногда более разумным решением становится защитная пленка',
      },
    ],
  },
  {
    article: 'blog/headlight-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'полировка автомобиля',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка фар — это контролируемое восстановление поверхности',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка',
        originalPhrase: 'пленка',
        contextQuote: 'На практике именно пленка выглядит особенно интересным решением, потому что она защищает поверхность не только от UV-излучения',
      },
      // TODO: blog/headlight-polishing (ru) — no ceramic context in body; only 2 rules
    ],
  },
  {
    article: 'blog/how-often-polish-car',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'полировка машины',
        originalPhrase: 'полировки',
        contextQuote: 'Частота полировки всегда зависит от того, в каких условиях живет автомобиль',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие авто',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие упрощает уход, усиливает гидрофобный эффект',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf пленка',
        originalPhrase: 'PPF',
        contextQuote: 'PPF работает иначе. Это не просто покрытие для облегчения мойки — это полноценный защитный слой',
      },
    ],
  },
  {
    article: 'blog/polishing-after-repair',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'полировки',
        contextQuote: 'Задача полировки — оптически выровнять поверхность, чтобы деталь естественно вписалась',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'керамическое покрытие',
        contextQuote: 'Для этого можно использовать воск, синтетический силант или керамическое покрытие',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'антигравийная пленка',
        originalPhrase: 'защитная PPF-пленка',
        contextQuote: 'наиболее эффективным решением чаще всего становится именно защитная PPF-пленка',
      },
    ],
  },
  {
    article: 'blog/polishing-before-after',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'полировка лкп',
        originalPhrase: 'полировка',
        contextQuote: 'На самом деле полировка работает с тем, как свет взаимодействует с лаком',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамика на авто',
        originalPhrase: 'керамике',
        contextQuote: 'Если приоритет — просто блеск и более легкий уход, можно остановиться на полировке + керамике',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf пленка',
        originalPhrase: 'PPF',
        contextQuote: 'Владелец премиального авто выбрал полную защиту PPF LLumar',
      },
    ],
  },
  {
    article: 'blog/polishing-cost-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'полировка автомобиля',
        contextQuote: 'Для многих полировка автомобиля — это просто вернуть блеск',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамика на авто',
        originalPhrase: 'Керамика',
        contextQuote: 'Керамика подходит, если вы хотите усилить блеск, получить гидрофобный эффект',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'антигравийная пленка',
        originalPhrase: 'PPF',
        contextQuote: 'PPF имеет смысл тогда, когда после полировки вы хотите максимально сохранить результат именно от механических повреждений',
      },
    ],
  },
  {
    article: 'blog/soft-vs-abrasive-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'абразивная полировка',
        originalPhrase: 'Глубокая полировка',
        contextQuote: 'Глубокая полировка — это уже более интенсивная коррекция',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'нанесение керамики',
        originalPhrase: 'керамика',
        contextQuote: '<strong>керамика</strong> — если нужен более легкий уход',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'бронирование авто пленкой',
        originalPhrase: 'PPF',
        contextQuote: '<strong>PPF</strong> — если важна именно физическая защита от сколов',
      },
    ],
  },
  // --- Vinyl cluster ---
  {
    article: 'blog/benefits-of-vinyl-wraps',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'оклейка авто пленкой тбилиси',
        originalPhrase: 'оклейкой',
        contextQuote: 'Поэтому перед оклейкой нужен правильный осмотр',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка на авто',
        originalPhrase: 'цветную защитную пленку',
        contextQuote: 'правильнее выбирать PPF или цветную защитную пленку',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'абразивная полировка',
        originalPhrase: 'легкого восстановления',
        contextQuote: 'Одному автомобилю достаточно глубокой мойки и деконтаминации, другому — легкого восстановления или локальной коррекции',
      },
    ],
  },
  {
    article: 'blog/car-body-color-with-vinyl-wrap',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'виниловая пленка',
        originalPhrase: 'Виниловая пленка',
        contextQuote: 'Виниловая пленка в первую очередь меняет',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка',
        originalPhrase: 'цветная защитная пленка',
        contextQuote: 'цветная защитная пленка. Главное — еще на старте точно понять',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие авто',
        originalPhrase: 'хорошо отполированного кузова',
        contextQuote: 'Глянцевый винил ближе всего к восприятию свежевыкрашенного или хорошо отполированного кузова',
      },
    ],
  },
  {
    article: 'blog/hints-for-vinyl-wrapped-cars',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'оклейка винилом',
        originalPhrase: 'оклейка винилом',
        contextQuote: 'Для многих оклейка винилом — самый гибкий способ',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'детейлинг мойка',
        originalPhrase: 'детейлинг-мойка',
        contextQuote: 'детейлинг-мойка, где умеют работать с оклеенными автомобилями',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'антигравийная пленка',
        originalPhrase: 'максимальная защита от камней',
        contextQuote: 'если ваша цель — максимальная защита от камней и интенсивного механического воздействия',
      },
    ],
  },
  // --- Tinting cluster ---
  {
    article: 'blog/legal-aspects-of-tinting-in-georgia',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'тонировка в грузии',
        originalPhrase: 'Тонировка стекол в Грузии',
        contextQuote: 'Тонировка стекол в Грузии — одна из самых востребованных услуг',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'тонировка лобового стекла',
        originalPhrase: 'Лобовое стекло',
        contextQuote: 'Лобовое стекло в Грузии — самая деликатная зона с точки зрения регулирования',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'ремонт лобового стекла',
        originalPhrase: 'Неправильно подобранная или неправильно установленная пленка',
        contextQuote: 'Неправильно подобранная или неправильно установленная пленка может создать не только юридические, но и технические проблемы',
      },
    ],
  },
  {
    article: 'blog/vehicle-tinting-techniques',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'тонировка стекол авто',
        originalPhrase: 'Тонировка стекол автомобиля',
        contextQuote: 'Тонировка стекол автомобиля — одна из самых востребованных услуг',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'атермальная тонировка',
        originalPhrase: 'технологичной',
        contextQuote: 'может быть технологичной, где основной акцент делается на снижение теплопритока',
      },
      // TODO: blog/vehicle-tinting-techniques (ru) — no /ppf or /windshield context in body; 2 rules
    ],
  },
  {
    article: 'blog/window-tinting-care',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'тонировка',
        originalPhrase: 'сама тонировка',
        contextQuote: 'Поэтому сама тонировка — только начало',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'тонировка тбилиси',
        originalPhrase: 'тонировка начинается',
        contextQuote: 'По текущему открытому прайсу BESTAUTO тонировка начинается со следующих ориентиров',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'бесконтактная мойка',
        originalPhrase: 'автоматических моек',
        contextQuote: 'Особенно это касается автоматических моек с жесткими щетками',
      },
    ],
  },
  // --- Windshield cluster ---
  {
    article: 'blog/efficiency-of-windshield-repair',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'ремонт сколов на лобовом стекле',
        originalPhrase: 'ремонта сколов и трещин',
        contextQuote: 'Эффективность ремонта сколов и трещин зависит от четырех основных факторов',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'ремонт трещин лобового стекла',
        originalPhrase: '«можно ли отремонтировать стекло»',
        contextQuote: 'Поэтому вопрос не только в том, «можно ли отремонтировать стекло»',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'тонировка автомобиля',
        originalPhrase: 'полировку',
        contextQuote: 'специалист может рекомендовать дополнительную процедуру — например, полировку или более глубокую коррекцию',
      },
    ],
  },
  {
    article: 'blog/replace-or-repair',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'ремонт лобового стекла',
        originalPhrase: 'отремонтировать стекло',
        contextQuote: 'Главный вопрос почти всегда один: можно ли отремонтировать стекло или уже нужна замена',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'ремонт стекла автомобиля',
        originalPhrase: 'Профессиональный ремонт',
        contextQuote: 'Профессиональный ремонт — это не просто нанесение какого-то состава сверху',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'атермальная тонировка',
        originalPhrase: 'наличия датчиков',
        contextQuote: 'потому что она зависит от модели автомобиля, самого стекла, наличия датчиков, обогрева',
      },
    ],
  },
  {
    article: 'blog/windshield-repair-benefits',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'восстановление лобового стекла',
        originalPhrase: 'реставрацию лобового стекла',
        contextQuote: 'Поэтому реставрацию лобового стекла чаще стоит воспринимать',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'ремонт автостекол',
        originalPhrase: 'ремонта',
        contextQuote: 'основная польза своевременного ремонта скола на лобовом стекле',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'тонировка авто',
        originalPhrase: 'подогревом',
        contextQuote: 'где стекло интегрировано с ассистентами, подогревом или камерами',
      },
    ],
  },
  {
    article: 'blog/chip-repair-process-step-by-step',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'ремонт лобового стекла',
        originalPhrase: 'ремонт скола на лобовом стекле',
        contextQuote: 'Ранний ремонт скола на лобовом стекле — это не косметика, а структурная операция',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'ремонт трещин лобового стекла',
        originalPhrase: 'ремонту сколов и трещин',
        contextQuote: 'Прайс по ремонту сколов и трещин в Тбилиси у нас устроен по размеру повреждения',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'восстановление лобового стекла',
        originalPhrase: 'восстанавливает прочность стекла',
        contextQuote: 'Полимерная смола, загнанная под вакуумом и полимеризованная ультрафиолетом, физически восстанавливает прочность стекла',
      },
    ],
  },
  // --- General detailing cluster ---
  // Note: blog/errors-to-find skipped (topic is OBD diagnostics, not detailing)
  {
    article: 'blog/10-paint-mistakes',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'абразивная полировка',
        originalPhrase: 'Избыточная агрессивная полировка',
        contextQuote: 'Избыточная агрессивная полировка — плохая стратегия',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамика на авто',
        originalPhrase: 'керамика',
        contextQuote: 'Если важнее визуальный эффект и более легкий уход, подойдет керамика',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка на авто',
        originalPhrase: 'PPF',
        contextQuote: 'Но если нужен именно физический барьер от сколов, дорожного абразива и механического воздействия, надежнее работает PPF',
      },
    ],
  },
  {
    article: 'blog/car-detailing-guide',
    links: [
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка кузова',
        originalPhrase: 'полировка',
        contextQuote: 'Если лак помутнел, появились swirls, голограммы, легкие водяные следы и потеря блеска, применяется полировка',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамика',
        contextQuote: 'Керамика усиливает блеск, упрощает мойку, снижает фиксацию грязи',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'оклейка полиуретановой пленкой',
        originalPhrase: 'PPF — это прозрачная защитная полиуретановая пленка',
        contextQuote: 'PPF — это прозрачная защитная полиуретановая пленка, которая берет на себя часть механического воздействия',
      },
    ],
  },
  {
    article: 'blog/detailing-cost-tbilisi',
    links: [
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка улучшает вид и возвращает блеск',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие автомобиля',
        originalPhrase: 'Керамика',
        contextQuote: 'Керамика подходит тем, кто хочет более глубокий блеск',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'бронирование авто пленкой',
        originalPhrase: 'PPF',
        contextQuote: 'PPF будет гораздо более сильным решением, чем просто полировка или керамика',
      },
    ],
  },
  {
    article: 'blog/how-to-choose-detailing-studio',
    links: [
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'антигравийная пленка',
        originalPhrase: 'защитной PPF-пленке',
        contextQuote: 'Когда речь идет о полировке, керамике, химчистке салона, тонировке стекол или особенно о защитной PPF-пленке',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка лкп',
        originalPhrase: 'полировку',
        contextQuote: 'Одни особенно хорошо делают полировку, другие',
      },
      // TODO: blog/how-to-choose-detailing-studio (ru) — 3rd /ceramiccoating anchor trips dup-stem; 2 rules only
    ],
  },
  {
    article: 'blog/summer-car-care-georgia',
    links: [
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие авто',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие летом тоже очень актуально',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'атермальная тонировка',
        originalPhrase: 'тонировка',
        contextQuote: 'Летом в Грузии особенно заметно, насколько сильно нагревается салон. Поэтому тонировка',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf пленка',
        originalPhrase: 'PPF, полиуретановая защитная пленка',
        contextQuote: 'Самый сильный ответ здесь — PPF, полиуретановая защитная пленка',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'химчистка салона',
        originalPhrase: 'химчистка',
        contextQuote: 'Поэтому перед сезоном особенно полезны: - глубокая уборка или химчистка',
      },
    ],
  },
  {
    article: 'blog/technology-and-process',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'нанесение керамики',
        originalPhrase: 'керамика',
        contextQuote: 'керамика может уменьшать визуальное влияние очень легких микродефектов',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'полировка',
        contextQuote: 'нужна правильная подготовка, а часто и легкая или средняя полировка',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf пленка',
        originalPhrase: 'PPF-пленка',
        contextQuote: 'Для такой задачи гораздо лучше подходит PPF-пленка, которая создает физический барьер',
      },
    ],
  },
  // --- Interior cleaning cluster ---
  {
    article: 'blog/car-interior-detailing-basics',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'химчистка салона авто',
        originalPhrase: 'химчистка',
        contextQuote: 'достаточно ли легкой чистки или нужна полная химчистка',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'внутреннее керамическое покрытие',
        contextQuote: 'имеет смысл добавить внутреннее керамическое покрытие',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'полировка',
        contextQuote: 'более эффективной будет полировка интерьерных деталей',
      },
    ],
  },
  {
    article: 'blog/car-interior-disinfection',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'химчистка авто тбилиси',
        originalPhrase: 'химчистка',
        contextQuote: 'если проблема в грязи и запахе одновременно — химчистка',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'химчистка салона',
        originalPhrase: 'химчистка',
        contextQuote: 'иногда — химчистка плюс озонирование',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'чистка салона авто',
        originalPhrase: 'химчистку',
        contextQuote: 'сначала сделать химчистку, а при необходимости',
      },
    ],
  },
  {
    article: 'blog/engine-room-cleaning',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'мойка авто',
        originalPhrase: 'мойка',
        contextQuote: 'правильнее, чем «полная мойка»',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'химчистка салона авто',
        originalPhrase: 'химчистке салона',
        contextQuote: 'внимания мойке кузова, химчистке салона',
      },
      // TODO: blog/engine-room-cleaning (ru) — no ceramic mentions in body; 2 rules only
    ],
  },
  {
    article: 'blog/interior-cleaning-for-auto',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'химчистка салона авто',
        originalPhrase: 'химчистка салона',
        contextQuote: 'В Тбилиси химчистка салона особенно востребована у водителей',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'мойка авто',
        originalPhrase: 'мойки',
        contextQuote: 'профессиональная химчистка отличается от «просто мойки»',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'химчистка автомобиля',
        originalPhrase: 'химчистка',
        contextQuote: 'лучшим решением становится комплексная химчистка',
      },
    ],
  },
  {
    article: 'blog/new-car-detailing',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка',
        originalPhrase: 'PPF',
        contextQuote: 'самым надежным шагом будет именно PPF',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамика на авто',
        originalPhrase: 'керамика',
        contextQuote: 'керамика — как дополнительный слой удобства',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'полировка',
        contextQuote: 'Агрессивная глубокая полировка новой машины',
      },
    ],
  },
  {
    article: 'blog/what-is-ppf-explainer',
    links: [
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамика',
        contextQuote: 'Керамика — это химический жидкий состав на основе SiO₂ или SiC.',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'виниловая пленка',
        originalPhrase: 'Винил',
        contextQuote: 'Винил — это декоративная плёнка для смены цвета или дизайна.',
      },
    ],
  },
  {
    article: 'blog/2-phase-vs-3-phase-wash',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'мойка машины',
        originalPhrase: 'мойка машины',
        contextQuote: '2 фазная мойка машины — это классический базовый цикл профессиональной мойки в детейлинг-студии',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическим покрытием',
        originalPhrase: 'керамическим покрытием',
        contextQuote: 'На машине с керамическим покрытием задача мойки иная: не создать новую защиту, а сохранить существующую.',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка',
        originalPhrase: 'полиуретановая плёнка',
        contextQuote: 'На машине PPF — полиуретановая плёнка имеет свой гидрофобный слой и поддерживается отдельными специализированными спреями',
      },
    ],
  },
  {
    article: 'blog/contactless-vs-hand-wash',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'детейлинг мойка',
        originalPhrase: 'детейлинг мойку',
        contextQuote: 'Прайс BESTAUTO на детейлинг мойку одинаков независимо от того',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка кузова',
        originalPhrase: 'полировка кузова',
        contextQuote: 'лечение которой (полировка кузова от 690 ₾) стоит дороже, чем сэкономлено на мойках',
      },
    ],
  },
  {
    article: 'blog/detailing-wash-explained',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'детейлинг мойка',
        originalPhrase: 'детейлинг мойка',
        contextQuote: 'Чем детейлинг мойка отличается от обычной на одной фразе',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамическим покрытием',
        originalPhrase: 'керамическим покрытием',
        contextQuote: 'Машина с керамическим покрытием.',
      },
    ],
  },
  {
    article: 'blog/car-body-wrap-cost-guide',
    links: [
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'защитная пленка',
        originalPhrase: 'PPF',
        contextQuote: 'Оклейка виниловой плёнкой, перекраска и PPF решают разные задачи:',
      },
    ],
  },
  {
    article: 'blog/ceramic-polishing-combo',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'керамика',
        contextQuote: 'Без полировки керамика садится на микрорельеф лака, включая все его дефекты.',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'полировка',
        contextQuote: 'Глянец, который дала полировка, держится не две мойки, а два-три года — ровно то, ради чего всё и затевалось.',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf пленка',
        originalPhrase: 'PPF',
        contextQuote: 'Для физической защиты от сколов поверх керамики работает PPF',
      },
    ],
  },
  {
    article: 'blog/detailing-center-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'антигравийная пленка',
        originalPhrase: 'плёнка',
        contextQuote: 'Только плёнка принимает удар камня на себя и физически закрывает лак',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'нанесение керамики',
        originalPhrase: 'керамическое покрытие',
        contextQuote: 'полировка кузова → керамическое покрытие → защитная плёнка PPF',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка авто',
        originalPhrase: 'Полировка',
        contextQuote: 'Полировка и керамика возвращают вид и облегчают уход',
      },
    ],
  },
  {
    article: 'blog/detailing-services-all-in-one',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'антигравийная пленка',
        originalPhrase: 'плёнка',
        contextQuote: 'Только плёнка принимает удары камней',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'керамика на авто',
        originalPhrase: 'керамика',
        contextQuote: 'керамика облегчает мойку в 2-3 раза',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировка кузова',
        originalPhrase: 'полировка кузова',
        contextQuote: 'химчистка от 400 ₾, полировка кузова от 690 ₾',
      },
    ],
  },
  {
    article: 'blog/front-windshield-tint-rules',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'тонировка лобового стекла',
        originalPhrase: 'тонировка лобового стекла',
        contextQuote: 'Сколько стоит тонировка лобового стекла?',
      },
    ],
  },
  {
    article: 'blog/interior-ceramic-detail',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие салона — это не «та же керамика, только внутри».',
      },
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'керамическое покрытие',
        originalPhrase: 'Керамическое покрытие',
        contextQuote: 'Керамическое покрытие салона — это не один универсальный состав, а набор узких решений под кожу, пластик, ткань и алькантару.',
      },
    ],
  },
  {
    article: 'blog/interior-disinfection-ozone',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'химчистка',
        originalPhrase: 'химчистка',
        contextQuote: 'Плановая химчистка «по календарю», а не из-за конкретной проблемы.',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'химчистки',
        originalPhrase: 'химчистки',
        contextQuote: 'Озон без химчистки работает только несколько суток.',
      },
    ],
  },
  {
    article: 'blog/chem-cleaning-tbilisi-prices',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'химчистка салона',
        originalPhrase: 'химчистка салона',
        contextQuote: 'химчистка салона не делает:',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'химчистка',
        originalPhrase: 'химчистка',
        contextQuote: 'первопричина, и только потом делается химчистка.',
      },
    ],
  },
  {
    article: 'blog/ppf-full-body-wrapping-guide',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'защитной пленкой',
        originalPhrase: 'защитной пленкой',
        contextQuote: 'Цена на полную оклейку защитной пленкой формируется из нескольких факторов',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'полировки',
        originalPhrase: 'полировки',
        contextQuote: 'необходимость предварительной полировки.',
      },
    ],
  },
];

export const BLOG_LINKS_KA: readonly BlogLinkRule[] = [
  {
    article: 'blog/ceramic-coating-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი თბილისში ერთ-ერთი ყველაზე პოპულარული',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'საჭიროა თუ არა პოლირება, რომელი ზონები უნდა დაიფაროს',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირის გადაკვრა',
        originalPhrase: 'სრული PPF გადაკვრა',
        contextQuote: 'სრული PPF გადაკვრა — <strong>7500 GEL-დან</strong>',
      },
    ],
  },
  {
    article: 'blog/ceramic-coating-care',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი ავტომობილს ნამდვილად ამარტივებს',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'მანქანის რეცხვა',
        originalPhrase: 'რეცხვა',
        contextQuote: 'ჯაგრისიანი რეცხვა კერამიკისთვის ერთ-ერთი ყველაზე ცუდი სცენარია',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'ძარას პოლირება + კერამიკული საფარი — 990 GEL-დან',
      },
    ],
  },
  {
    article: 'blog/ceramic-for-car-glass',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'მინაზე კერამიკული საფარი არის სპეციალური დამუშავება',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'მანქანის შუშის აღდგენა',
        originalPhrase: 'დაზიანებულ მინას',
        contextQuote: 'ჩიპებს, ღრმა ნაკაწრებს ან უკვე დაზიანებულ მინას აღადგენს',
      },
    ],
  },
  {
    article: 'blog/ceramic-coating-durability',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'კერამიკული დაფარვა',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი ბევრისთვის ასოცირდება სიპრიალესთან',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'ავტომობილის პოლირება',
        originalPhrase: 'პოლირებასაც',
        contextQuote: 'სწორი დეტეილინგ-მომზადება ხშირად მოიცავს ღრმა რეცხვას, დეკონტამინაციას და საჭიროების შემთხვევაში პოლირებასაც',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის დამცავი ფირი',
        originalPhrase: 'PPF',
        contextQuote: 'PPF უფრო ძლიერი გამოსავალია',
      },
    ],
  },
  {
    article: 'blog/interior-ceramic-coating',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'ავტომობილის კერამიკა',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'ინტერიერის კერამიკული საფარი არის დამცავი დამუშავება',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'სალონის ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'ზოგჯერ მხოლოდ ქიმწმენდა საკმარისი არ არის',
      },
    ],
  },
  {
    article: 'blog/polishing-before-ceramic',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'ავტომობილის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'პოლირება მხოლოდ ერთი ეტაპია',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული პოლირება',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი არ არის საღებავის კორექცია',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'PPF',
        contextQuote: 'PPF უფრო საიმედო გადაწყვეტაა',
      },
    ],
  },
  // --- PPF cluster ---
  {
    article: 'blog/ppf-benefits',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის დამცავი ფირი',
        originalPhrase: 'PPF დამცავ ფირსაც',
        contextQuote: 'არა მხოლოდ პოლირებას ან კერამიკულ საფარს, არამედ PPF დამცავ ფირსაც განიხილავს როგორც გრძელვადიან გადაწყვეტილებას',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი ამარტივებს მოვლას, აძლიერებს ჰიდროფობურობას',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'პოლირება ძირითადად მუშაობს ვიზუალურ შედეგზე',
      },
    ],
  },
  {
    article: 'blog/ppf-film-for-cars-protection',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირის გადაკვრა',
        originalPhrase: 'პოლიურეთანის დამცავი ფირი',
        contextQuote: 'PPF არის paint protection film — პოლიურეთანის დამცავი ფირი, რომელიც ავტომობილის ძარაზე ეკვრის',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ავტომობილის კერამიკა',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: '<strong>კერამიკული საფარი</strong> კი უფრო მეტად ამარტივებს მოვლას',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'ავტომობილის პოლირება',
        originalPhrase: 'უკვე გააკეთეთ პოლირება',
        contextQuote: 'უკვე გააკეთეთ პოლირება და გინდათ შედეგის შენარჩუნება',
      },
    ],
  },
  {
    article: 'blog/protection-against-uv-rays-scratches',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'პოლიურეთანის ფირი',
        originalPhrase: 'დამცავი პოლიურეთანის ფირი',
        contextQuote: 'უმეტეს შემთხვევაში უკეთესი არჩევანია PPF — დამცავი პოლიურეთანის ფირი',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'ვინილის ფირი',
        originalPhrase: 'ვინილის ფირი',
        contextQuote: 'ვინილის ფირი ძირითადად გამოიყენება',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული დაფარვა',
        originalPhrase: 'კერამიკაზე',
        contextQuote: 'ამიტომ პოლირებაზე, კერამიკაზე და ზოგადად ძარის დაცვაზე საუბრისას',
      },
    ],
  },
  {
    article: 'blog/service-on-ppf-wrapped-car',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'PPF დამცავი ფირი',
        contextQuote: 'PPF დამცავი ფირი ერთ-ერთი საუკეთესო გზაა მანქანის საღებავის დასაცავად',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'მანქანის რეცხვა',
        originalPhrase: 'ხელით რეცხვა',
        contextQuote: 'PPF-ისთვის საუკეთესო რეცხვა არის უსაფრთხო ხელით რეცხვა',
      },
      // TODO: blog/service-on-ppf-wrapped-car (ka) — couldn't find clean 3rd anchor
    ],
  },
  {
    article: 'blog/strength-and-useful-life-of-ppf',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის ფირი',
        originalPhrase: 'PPF ფირი',
        contextQuote: 'მოკლე პასუხი ასეთია: ხარისხიანი PPF ფირი პრაქტიკაში ხშირად',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი ძალიან კარგია ბზინვარებისთვის',
      },
      // TODO: blog/strength-and-useful-life-of-ppf (ka) — couldn't find clean 3rd anchor
    ],
  },
  {
    article: 'blog/top-5-car-paint-protection',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ფირის გადაკვრა',
        originalPhrase: 'PPF ყველაზე ძლიერი არჩევანია',
        contextQuote: 'ყოველდღიური ექსპლუატაციისგან, PPF ყველაზე ძლიერი არჩევანია',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული პოლირება',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი კარგი არჩევანია მათთვის',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'ფერადი ფირის გადაკვრა',
        originalPhrase: 'ვინილის ფირი',
        contextQuote: 'ვინილის ფირი ბევრ ადამიანს იზიდავს',
      },
    ],
  },
  // --- Polishing cluster ---
  {
    article: 'blog/car-body-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'ძარას პოლირება',
        contextQuote: 'ძარას პოლირება ერთ-ერთი ყველაზე მოთხოვნადი სერვისია იმ მძღოლებისთვის',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: '<strong>კერამიკული საფარი</strong> — ქმნის ქიმიურ და ჰიდროფობურ დაცვას',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირის გადაკვრა',
        originalPhrase: 'PPF დამცავი ფირია',
        contextQuote: 'ასეთ სიტუაციებში უფრო სწორი არჩევანი ხშირად PPF დამცავი ფირია',
      },
    ],
  },
  {
    article: 'blog/car-interior-polishing',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'მანქანის ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'ქსოვილის ელემენტები არ პრიალდება — მათთვის გამოიყენება ქიმწმენდა და შესაბამისი მოვლა',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'გაპრიალება',
        originalPhrase: 'გაპრიალება',
        contextQuote: 'ინტერიერის გაპრიალება არ არის “სასწაული რესტავრაცია”',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'დამცავი ფირის გამოყენება',
        contextQuote: 'ზოგჯერ უფრო სწორი გადაწყვეტილებაა დამცავი ფირის გამოყენება, ვიდრე პერიოდულად ერთი და იგივე ზონის ხელახლა გაპრიალება',
      },
    ],
  },
  {
    article: 'blog/headlight-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'ავტომობილის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'ფარების პოლირება არის ზედაპირის კონტროლირებადი აღდგენა',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის დამცავი ფირი',
        originalPhrase: 'დამცავი ფირი',
        contextQuote: 'ფარების პოლირების შემდეგ არსებობს რამდენიმე გზა შედეგის შესანარჩუნებლად: სპეციალური დამცავი საფარი, ლაქი ან დამცავი ფირი',
      },
      // TODO: blog/headlight-polishing (ka) — no ceramic context in body; only 2 rules
    ],
  },
  {
    article: 'blog/how-often-polish-car',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'რამდენად ხშირად სჭირდება მანქანას პოლირება?',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი ამარტივებს მოვლას, აუმჯობესებს ჰიდროფობურობას',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'PPF დამცავი ფირი',
        contextQuote: 'PPF დამცავი ფირი სხვა ლოგიკით მუშაობს',
      },
    ],
  },
  {
    article: 'blog/polishing-after-repair',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'სწორად შესრულებული პოლირება',
        contextQuote: 'ძარის შეკეთებისა და შეღებვის შემდეგ სწორად შესრულებული პოლირება ეხმარება ავტომობილს დაიბრუნოს ერთგვაროვანი ბზინვარება',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'შეიძლება გამოყენებულ იქნას ცვილი, სინთეტიკური სილანტი ან კერამიკული საფარი',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'პოლიურეთანის ფირი',
        originalPhrase: 'PPF დამცავი ფირია',
        contextQuote: 'ყველაზე ეფექტური გადაწყვეტა ხშირად სწორედ PPF დამცავი ფირია',
      },
    ],
  },
  {
    article: 'blog/polishing-before-after',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'გაპრიალება',
        originalPhrase: 'პოლირება',
        contextQuote: 'სინამდვილეში პოლირება მუშაობს იმაზე, თუ როგორ ურთიერთობს სინათლე ლაქთან',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ავტომობილის კერამიკა',
        originalPhrase: 'კერამიკას',
        contextQuote: 'ვინც შემდეგ ნაბიჯად გეგმავენ კერამიკას ან PPF-ს და სურთ, რომ დამცავი ფენა სწორად მომზადებულ',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის დამცავი ფირი',
        originalPhrase: 'PPF',
        contextQuote: 'პოლირება აუმჯობესებს იმას, რაც უკვე გაქვთ. PPF კი ეხმარება ამ შედეგის შენარჩუნებას',
      },
    ],
  },
  {
    article: 'blog/polishing-cost-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'პოლირება ფასი',
        originalPhrase: 'პოლირება',
        contextQuote: 'ეს ერთ-ერთი ყველაზე ხშირი კითხვაა. ბევრს ჰგონია, რომ პოლირება უკვე დაცვაც არის',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი კარგია მაშინ, როცა გსურთ ზედაპირის უფრო მარტივი მოვლა, უკეთესი ვიზუალი',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'პოლიურეთანის ფირი',
        originalPhrase: 'PPF',
        contextQuote: 'უფრო საიმედო გადაწყვეტილება ხშირად PPF-ია. პოლირება ავტომობილს აძლევს უკეთეს იერს',
      },
    ],
  },
  {
    article: 'blog/soft-vs-abrasive-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'ღრმა პოლირება',
        contextQuote: 'ღრმა პოლირება უკვე უფრო ინტენსიური კორექციაა. ის გამოიყენება მაშინ',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკა',
        contextQuote: 'კერამიკა უკეთ მუშაობს სწორად მომზადებულ ზედაპირზე. მსუბუქი პოლირება ხშირად სწორედ ის ეტაპია',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის ფირი',
        originalPhrase: 'PPF ფირია',
        contextQuote: 'ყველაზე სწორი გაგრძელება ხშირად PPF ფირია. BESTAUTO მუშაობს',
      },
    ],
  },
  // --- Vinyl cluster ---
  {
    article: 'blog/benefits-of-vinyl-wraps',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'ფირის გადაკვრა',
        originalPhrase: 'ვინილის ფირის გადაკვრა',
        contextQuote: 'ვინილის ფირის გადაკვრა ნიშნავს ავტომობილის ძარაზე სპეციალური დეკორატიული ფირის დაკვრას',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'ფერადი დამცავი ფირი',
        contextQuote: 'უფრო სწორი არჩევანია PPF ან ფერადი დამცავი ფირი',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'ახლად გაპრიალებული',
        contextQuote: 'ავტომობილი ახალია ან ახლად გაპრიალებული',
      },
    ],
  },
  {
    article: 'blog/car-body-color-with-vinyl-wrap',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'ფერადი ფირის გადაკვრა',
        originalPhrase: 'ვინილის ფირი',
        contextQuote: 'ვინილის ფირი პირველ რიგში ცვლის ავტომობილის',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის დამცავი ფირი',
        originalPhrase: 'ფერადი დამცავი ფირი',
        contextQuote: 'ბევრ შემთხვევაში ჯობს ფერადი დამცავი ფირი',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული პოლირება',
        originalPhrase: 'კარგად გაპრიალებული',
        contextQuote: 'პრიალა ვინილი ყველაზე ახლოს დგას ახლად შეღებილი ან კარგად გაპრიალებული ძარის ვიზუალთან',
      },
    ],
  },
  {
    article: 'blog/hints-for-vinyl-wrapped-cars',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'ვინილის ფირი',
        originalPhrase: 'ვინილის ფირი',
        contextQuote: 'ვინილის ფირი განსაკუთრებით მგრძნობიარე ხდება მაშინ',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'მანქანის რეცხვა',
        originalPhrase: 'ხელით რეცხვა',
        contextQuote: 'ვინილით დაფარული ავტომობილისთვის საუკეთესო ვარიანტი არის უსაფრთხო ხელით რეცხვა',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირის გადაკვრა',
        originalPhrase: 'PPF დამცავი ფირია',
        contextQuote: 'ამ ამოცანისთვის უკეთესი არჩევანი ხშირად PPF დამცავი ფირია',
      },
    ],
  },
  // --- Tinting cluster ---
  {
    article: 'blog/legal-aspects-of-tinting-in-georgia',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'მინების დაბურვა',
        originalPhrase: 'მინების დაბურვა',
        contextQuote: 'უკანა შუშის და მძღოლის მხარის მინების დაბურვა შეიძლება უფრო მუქი იყოს',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'შუშების დაბურვა',
        originalPhrase: 'საქართველოში ავტომობილის შუშის დაბურვა',
        contextQuote: 'საქართველოში ავტომობილის შუშის დაბურვა რეგულირდება მკაცრი კანონმდებლობით',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'საქარე მინის აღდგენა',
        originalPhrase: 'საქარე მინის დაბურვა',
        contextQuote: 'საქარე მინის დაბურვა საქართველოში',
      },
    ],
  },
  {
    article: 'blog/vehicle-tinting-techniques',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'მანქანის მინების დაბურვა',
        originalPhrase: 'მანქანის მინების დაბურვა',
        contextQuote: 'მანქანის მინების დაბურვა ერთ-ერთი ყველაზე მოთხოვნადი სერვისია',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'მინების დამუქება',
        originalPhrase: 'სწორად შესრულებული მინების დაბურვა',
        contextQuote: 'ასეთ დროს სწორად შესრულებული მინების დაბურვა არა მხოლოდ უკეთეს იერს',
      },
      // TODO: blog/vehicle-tinting-techniques (ka) — no /ppf or /windshield context; 2 rules
    ],
  },
  {
    article: 'blog/window-tinting-care',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'მინის დაბურვა',
        originalPhrase: 'მინების დაბურვა',
        contextQuote: 'BESTAUTO-ს მიმდინარე საჯარო ფასების მიხედვით, ავტომობილის მინების დაბურვა იწყება ასეთი ნიშნულებიდან',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'მანქანის დაბურვა',
        originalPhrase: 'დაბურული მინები',
        contextQuote: 'დაბურული მინები ყველაზე ხშირად არა ცუდი მონტაჟის',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'მანქანის გარეცხვა',
        originalPhrase: 'მინების გარეცხვა',
        contextQuote: 'როდის შეიძლება მინების გარეცხვა',
      },
    ],
  },
  // --- Windshield cluster ---
  {
    article: 'blog/efficiency-of-windshield-repair',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'საქარე მინის აღდგენა',
        originalPhrase: 'საქარე მინის შეკეთება',
        contextQuote: 'როგორ ხდება საქარე მინის შეკეთება',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'მანქანის შუშის აღდგენა',
        originalPhrase: 'საქარე მინის რემონტი',
        contextQuote: 'რამდენად ეფექტურია საქარე მინის რემონტი',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'მინების დაბურვა',
        originalPhrase: 'პოლირება',
        contextQuote: 'სპეციალისტმა შეიძლება გირჩიოთ რემონტის შემდეგ დამატებითი პროცედურა — მაგალითად, პოლირება ან უფრო ღრმა კორექცია',
      },
    ],
  },
  {
    article: 'blog/replace-or-repair',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'საქარე მინების აღდგენა',
        originalPhrase: 'საქარე მინის შეკეთება',
        contextQuote: 'როდის შეიძლება საქარე მინის შეკეთება',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'მანქანის მინის აღდგენა',
        originalPhrase: 'პროფესიონალური შეკეთება',
        contextQuote: 'პროფესიონალური შეკეთება არ ნიშნავს უბრალოდ ზედაპირზე რაღაც მასალის დატანას',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'შუშების დამუქება',
        originalPhrase: '10 წლიანი გარანტია ფირზე',
        contextQuote: '10 წლიანი გარანტია ფირზე',
      },
    ],
  },
  {
    article: 'blog/windshield-repair-benefits',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'საქარე მინის შეკეთება',
        originalPhrase: 'საქარე მინის რესტავრაცია',
        contextQuote: 'საქარე მინის რესტავრაცია უმეტეს შემთხვევაში',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'საქარე მინის აღდგენა',
        originalPhrase: 'დროული დათვალიერება',
        contextQuote: 'დროული დათვალიერება გეხმარებათ სწორად განსაზღვროთ',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'მანქანის დაბურვა',
        originalPhrase: 'გათბობასთან',
        contextQuote: 'როცა მინა ინტეგრირებულია სხვადასხვა დამხმარე სისტემასთან, გათბობასთან ან კამერებთან',
      },
    ],
  },
  {
    article: 'blog/chip-repair-process-step-by-step',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'საქარე მინის აღდგენა',
        originalPhrase: 'საქარე მინის ნაკენჭარის აღდგენა ადრეულ ეტაპზე',
        contextQuote: 'საქარე მინის ნაკენჭარის აღდგენა ადრეულ ეტაპზე არა კოსმეტიკური საკითხია, არამედ სტრუქტურული ოპერაცია',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'საქარე მინის შეკეთება',
        originalPhrase: 'შეკეთება',
        contextQuote: 'პირველ 48 საათში შეკეთება იძლევა შედეგს, რომელიც წლობით ძლებს',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'ნაკენჭარის აღდგენა',
        originalPhrase: 'ნაკენჭარის შეკეთების ეტაპები — მიღებიდან გადაცემამდე',
        contextQuote: 'ნაკენჭარის შეკეთების ეტაპები — მიღებიდან გადაცემამდე',
      },
    ],
  },
  // --- General detailing cluster ---
  // Note: blog/errors-to-find skipped (topic is OBD diagnostics, not detailing)
  {
    article: 'blog/10-paint-mistakes',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'პოლირება ეფექტური გზაა ვიზუალური განახლებისთვის',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული დაფარვა',
        originalPhrase: 'კერამიკული დაცვა',
        contextQuote: 'თუ მიზანი პირველ რიგში ვიზუალური ეფექტისა და მოვლის გამარტივებაა, შეიძლება კერამიკული დაცვა გამოგადგეთ',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის დამცავი ფირი',
        originalPhrase: 'დამცავი PPF ფირია',
        contextQuote: 'უფრო საიმედო გამოსავალი დამცავი PPF ფირია',
      },
    ],
  },
  {
    article: 'blog/car-detailing-guide',
    links: [
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'ავტომობილის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'კეთდება პოლირება. ეს შეიძლება იყოს მსუბუქი, საშუალო ან ღრმა კორექცია',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი</strong></p> <p style="margin-bottom: 16px;">SiO2-ზე დაფუძნებული',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'პოლიურეთანის ფირი',
        originalPhrase: 'დამცავი პოლიურეთანის ფირი',
        contextQuote: 'დამცავი პოლიურეთანის ფირი (PPF) ამ ჩამონათვალში ერთადერთი ვარიანტია, რომელიც მექანიკურ ზემოქმედებას რეალურად იღებს თავის თავზე',
      },
    ],
  },
  {
    article: 'blog/detailing-cost-tbilisi',
    links: [
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება ფასი',
        originalPhrase: 'პოლირება',
        contextQuote: 'მრავალეტაპიანი პოლირება მესამე',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკა',
        contextQuote: 'კერამიკა ამარტივებს მოვლას და ეხმარება ზედაპირის შენარჩუნებას',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ფირის გადაკვრა',
        originalPhrase: 'PPF-ის გადაკვრა',
        contextQuote: 'PPF-ის გადაკვრა უკვე სრულიად სხვა სეგმენტია',
      },
    ],
  },
  {
    article: 'blog/how-to-choose-detailing-studio',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირის გადაკვრა',
        originalPhrase: 'ფირის ხარისხიან დაყენებას სჭირდება',
        contextQuote: 'PPF ერთ-ერთი ყველაზე მკაფიო მაჩვენებელია სტუდიის რეალური დონის. ფირის ხარისხიან დაყენებას სჭირდება',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'პოლირება ფასი',
        originalPhrase: 'პოლირება',
        contextQuote: 'რამდენად უსაფრთხოა პოლირება',
      },
      // TODO: blog/how-to-choose-detailing-studio (ka) — 3rd /ceramiccoating anchor trips dup-stem; 2 rules only
    ],
  },
  {
    article: 'blog/summer-car-care-georgia',
    links: [
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი ზაფხულის სეზონისთვის ნამდვილად სასარგებლოა',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'მინების დაბურვა',
        originalPhrase: 'ტონირება',
        contextQuote: 'ტონირება ბევრ მძღოლს სწორედ ზაფხულის წინ ახსენდება',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'პოლიურეთანის ფირი',
        originalPhrase: 'დამცავი პოლიურეთანის ფირი',
        contextQuote: 'ამ კითხვაზე ყველაზე ძლიერი პასუხი არის PPF — დამცავი პოლიურეთანის ფირი',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'ავტომობილის ქიმწმენდა',
        originalPhrase: 'მანქანის ქიმწმენდა',
        contextQuote: 'მსუბუქად დაბინძურებული მანქანის ქიმწმენდა იწყება 400 GEL-დან',
      },
    ],
  },
  {
    article: 'blog/technology-and-process',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკა',
        contextQuote: 'კერამიკა შეიძლება ამცირებდეს ძალიან მსუბუქ მიკროდაზიანებებზე ვიზუალურ გავლენას',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირებაც',
        contextQuote: 'ხშირად კი მსუბუქი ან საშუალო პოლირებაც',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'PPF ფირი',
        contextQuote: 'ასეთ როლს ბევრად უკეთ ასრულებს PPF ფირი, რომელიც ქმნის ფიზიკურ ბარიერს',
      },
    ],
  },
  // --- Interior cleaning cluster ---
  {
    article: 'blog/car-interior-detailing-basics',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'მანქანის ქიმწმენდა',
        originalPhrase: 'სრული ქიმწმენდა',
        contextQuote: 'საკმარისია მსუბუქი წმენდა თუ საჭიროა სრული ქიმწმენდა',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'შიდა კერამიკული საფარი',
        contextQuote: 'როდის ღირს ინტერიერის პოლირება ან შიდა კერამიკული საფარი',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'უფრო ეფექტურია ინტერიერის დეტალების პოლირება',
      },
    ],
  },
  {
    article: 'blog/car-interior-disinfection',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'მანქანის ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'ბევრად სწორი იქნება ჯერ ქიმწმენდა და შემდეგ ოზონირება',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'ავტომობილის ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'უფრო სწორი არჩევანია ქიმწმენდა',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'სალონის ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'მსუბუქად დაბინძურებული მანქანის ქიმწმენდა იწყება 400 GEL-დან',
      },
    ],
  },
  {
    article: 'blog/engine-room-cleaning',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'მანქანის რეცხვა',
        originalPhrase: 'მანქანის რეცხვა',
        contextQuote: 'დეტალური მანქანის რეცხვა',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'სალონის ქიმწმენდა',
        originalPhrase: 'სალონის ქიმწმენდას',
        contextQuote: 'სალონის ქიმწმენდას და ინტერიერის ვიზუალს',
      },
      // TODO: blog/engine-room-cleaning (ka) — no ceramic content in body; 2 rules only
    ],
  },
  {
    article: 'blog/interior-cleaning-for-auto',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'მანქანის ქიმწმენდა',
        originalPhrase: 'სალონის ქიმწმენდა',
        contextQuote: 'სალონის ქიმწმენდა ბევრისთვის მხოლოდ ესთეტიკის თემაა, მაგრამ რეალურად ეს არის მომსახურება',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'მანქანის რეცხვა',
        originalPhrase: 'რეცხვისგან',
        contextQuote: 'აქ განსხვავდება "უბრალოდ რეცხვისგან"',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'ავტომობილის ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'კომპლექსური ქიმწმენდა საუკეთესო გამოსავალია',
      },
    ],
  },
  {
    article: 'blog/new-car-detailing',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'PPF',
        contextQuote: 'PPF-ის დაყენება რისკიან ზონებზე ან მთლიან ძარაზე',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკა მანქანაზე',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'კერამიკული საფარი ღია საღებავზე და სურვილის შემთხვევაში ფირის ზედაპირზეც',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'მსუბუქი პოლირება ან ზედაპირის მომზადება',
      },
    ],
  },
  {
    article: 'blog/what-is-ppf-explainer',
    links: [
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკა მანქანაზე',
        originalPhrase: 'კერამიკა',
        contextQuote: 'კერამიკა — ეს ქიმიური თხევადი შემადგენლობაა SiO₂-ის ან SiC-ის ფუძეზე.',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'ფირის გადაკვრა',
        originalPhrase: 'ვინილი',
        contextQuote: 'ვინილი — ეს დეკორატიული ფირია ფერის ან დიზაინის გადასაცვლელად.',
      },
    ],
  },
  {
    article: 'blog/2-phase-vs-3-phase-wash',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'მანქანის რეცხვა',
        originalPhrase: 'მანქანის რეცხვა',
        contextQuote: 'PPF-ის დადგმის შემდეგ პირველ 7-10 დღეში მანქანის რეცხვა საერთოდ არ რეკომენდებულია',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარია',
        contextQuote: 'მანქანაზე კერამიკული საფარია — კერამიკა ისედაც აძლევს ჰიდროფობურ ეფექტს 2-5 წლით, მესამე ფაზა არაფერს დაამატებს',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'დამცავი ფირი',
        contextQuote: 'დამცავი ფირი PPF',
      },
    ],
  },
  {
    article: 'blog/contactless-vs-hand-wash',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'მანქანის რეცხვა',
        originalPhrase: 'დეტეილინგ რეცხვა',
        contextQuote: 'სტუდიაში ეწოდება დეტეილინგ რეცხვა: წინარეცხვა ქაფით',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'ძარას პოლირება',
        contextQuote: 'ძარას პოლირება 690 ₾-დან) უფრო ძვირი ჯდება, ვიდრე რეცხვაზე ეკონომიაა',
      },
    ],
  },
  {
    article: 'blog/detailing-wash-explained',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'მანქანის რეცხვა',
        originalPhrase: 'მანქანის რეცხვა',
        contextQuote: 'პირდაპირ მზის ქვეშ მანქანის რეცხვა არ რეკომენდებულია დეტეილინგშიც',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'ჩვეულებრივ ტუტე ქიმიაზე კერამიკული საფარი ჰიდროფობურ ეფექტს კარგავს',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'პოლიურეთანის ფირი',
        originalPhrase: 'პოლიურეთანის ფირი',
        contextQuote: 'პოლიურეთანის ფირი მგრძნობიარეა ქიმიაზე',
      },
    ],
  },
  {
    article: 'blog/car-body-wrap-cost-guide',
    links: [
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის ფირი',
        originalPhrase: 'PPF',
        contextQuote: 'თუ გჭირდებათ ფერის დროებითი შეცვლა — ვინილი. დაცვა + ახალი ფერი — PPF. ფერი სამუდამოდ — გადაღებვა.',
      },
    ],
  },
  {
    article: 'blog/ceramic-polishing-combo',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკა',
        contextQuote: 'პოლირების გარეშე კერამიკა ეფინება ლაქის მიკრორელიეფს, მათ შორის მის ყველა დეფექტს.',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'პოლირება ამზადებს ლაქს — იცილებს რისებს, ჰოლოგრამებს, ოქსიდიზებულ ფენას.',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'PPF',
        contextQuote: 'ჩიპების ფიზიკური დაცვისთვის კერამიკაზე ზემოდან მუშაობს PPF',
      },
    ],
  },
  {
    article: 'blog/detailing-center-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'მანქანის ფირი',
        originalPhrase: 'ფირი',
        contextQuote: 'ნახევარ წელში ფირი გაყვითლებას დაიწყებს',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'პოლირება 30°C-ზე მაღალ ტემპერატურაზე არ შეიძლება',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკა',
        contextQuote: 'კერამიკა მოითხოვს 20-25°C-ს და კონტროლირებულ ტენიანობას',
      },
    ],
  },
  {
    article: 'blog/detailing-services-all-in-one',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირი',
        originalPhrase: 'დამცავი ფირი',
        contextQuote: 'დამცავი ფირი — მაშინვე',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'მანქანის კერამიკა',
        originalPhrase: 'კერამიკა',
        contextQuote: 'კერამიკა სამრეცხაოს 2-3-ჯერ ამარტივებს',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'მანქანის პოლირება',
        originalPhrase: 'პოლირება',
        contextQuote: 'სანამ პოლირება მიდის, სალონი შრება',
      },
    ],
  },
  {
    article: 'blog/front-windshield-tint-rules',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'მინის დაბურვა',
        originalPhrase: 'მინის დაბურვა',
        contextQuote: 'რა ღირს საქარე მინის დაბურვა?',
      },
    ],
  },
  {
    article: 'blog/interior-ceramic-detail',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'სალონის კერამიკული საფარი ეს არ არის „იგივე კერამიკა, უბრალოდ შიგნით".',
      },
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'კერამიკული საფარი',
        originalPhrase: 'კერამიკული საფარი',
        contextQuote: 'სალონის კერამიკული საფარი ეს არა ერთი უნივერსალური შემადგენლობა, არამედ ვიწრო გადაწყვეტილებების ნაკრებია ტყავისთვის, პლასტიკისთვის, ქსოვილისა და ალკანტარისთვის.',
      },
    ],
  },
  {
    article: 'blog/interior-disinfection-ozone',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'გეგმიური ქიმწმენდა „კალენდრის მიხედვით", და არა კონკრეტული პრობლემით.',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'ცხოველების მფლობელებისთვის და მწეველებისთვის — ყოველი ქიმწმენდა ოზონთან ერთად მიდის, ანუ 6-12 თვეში ერთხელ.',
      },
    ],
  },
  {
    article: 'blog/chem-cleaning-tbilisi-prices',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'სალონის ქიმწმენდა',
        originalPhrase: 'სალონის ქიმწმენდა',
        contextQuote: 'სალონის ქიმწმენდა — ეს მასალებთან ღრმა მუშაობაა',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'ქიმწმენდა',
        originalPhrase: 'ქიმწმენდა',
        contextQuote: 'ჯერ წყარო გამოსწორდება, და მხოლოდ შემდეგ — ქიმწმენდა.',
      },
    ],
  },
  {
    article: 'blog/ppf-full-body-wrapping-guide',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'დამცავი ფირის',
        originalPhrase: 'დამცავი ფირის',
        contextQuote: 'სრული დამცავი ფირის გადაკვრის ფასი ფორმირდება რამდენიმე ფაქტორისგან',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'პოლირების',
        originalPhrase: 'პოლირების',
        contextQuote: 'წინასწარი პოლირების საჭიროება',
      },
    ],
  },
];

export const BLOG_LINKS_EN: readonly BlogLinkRule[] = [
  {
    article: 'blog/ceramic-coating-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is one of the most popular options in Tbilisi',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'In many such cases, polishing is needed before coating for the final',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'PPF',
        contextQuote: 'when PPF is the smarter route',
      },
    ],
  },
  {
    article: 'blog/ceramic-coating-care',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'car ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating genuinely makes everyday car care easier',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'car wash',
        originalPhrase: 'car wash',
        contextQuote: 'any car wash is fine',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'Abrasive polishing without real need weakens the system unnecessarily',
      },
    ],
  },
  {
    article: 'blog/ceramic-for-car-glass',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'auto ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: 'The benefits of ceramic coating for glass are not limited',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'auto glass repair',
        originalPhrase: 'restore cracked or damaged glass',
        contextQuote: 'restore cracked or damaged glass',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'protective film',
        contextQuote: 'It is also not a mechanical protective film',
      },
    ],
  },
  {
    article: 'blog/ceramic-coating-durability',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is usually associated with gloss, water beading',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF',
        contextQuote: 'PPF becomes the more serious long-term solution',
      },
      // TODO: blog/ceramic-coating-durability (en) — no clean /polishing context in body (polish only appears in reviews); 2 rules only
    ],
  },
  {
    article: 'blog/interior-ceramic-coating',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'car ceramic coating',
        originalPhrase: 'Interior ceramic coating',
        contextQuote: 'Interior ceramic coating is a protective treatment that creates',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'car interior cleaning',
        originalPhrase: 'deep cleaning',
        contextQuote: 'If the cabin is heavily soiled, deep cleaning comes first',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'PPF protective film',
        contextQuote: '<strong>PPF protective film</strong> is far more appropriate than ceramic',
      },
    ],
  },
  {
    article: 'blog/polishing-before-ceramic',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'polishing is not always mandatory',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'car ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is not paint correction',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf for car',
        originalPhrase: 'PPF',
        contextQuote: 'That is where PPF becomes the more logical option',
      },
    ],
  },
  // --- PPF cluster ---
  {
    article: 'blog/ppf-benefits',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'protective PPF film',
        contextQuote: 'drivers today consider not only polishing and ceramic coating, but also protective PPF film as a long-term solution',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating makes maintenance easier, increases hydrophobicity',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'Polishing',
        contextQuote: 'Polishing is primarily about visual improvement',
      },
    ],
  },
  {
    article: 'blog/ppf-film-for-cars-protection',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF stands for paint protection film',
        contextQuote: 'PPF stands for paint protection film. It is a polyurethane film applied to the most vulnerable panels',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'car ceramic coating',
        originalPhrase: 'ceramic may be enough',
        contextQuote: 'If your priority is easier washing and visual enhancement, ceramic may be enough',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'polishing may be necessary so the film is applied over a better visual base',
      },
    ],
  },
  {
    article: 'blog/protection-against-uv-rays-scratches',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'car ppf',
        originalPhrase: 'PPF—a protective polyurethane film',
        contextQuote: 'then in most cases PPF—a protective polyurethane film—is the better choice',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'vinyl wrap',
        originalPhrase: 'Vinyl',
        contextQuote: 'Vinyl\u2019s strongest side is aesthetics',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: 'articles about polishing, ceramic coating, and body protection',
      },
    ],
  },
  {
    article: 'blog/service-on-ppf-wrapped-car',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf for car',
        originalPhrase: 'PPF',
        contextQuote: 'PPF is one of the best ways to protect automotive paint from everyday damage',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'car wash',
        originalPhrase: 'hand wash',
        contextQuote: 'The best washing method for PPF is a safe hand wash or a detailing wash that knows how to work with film-covered cars',
      },
      // TODO: blog/service-on-ppf-wrapped-car (en) — couldn't find clean 3rd anchor
    ],
  },
  {
    article: 'blog/strength-and-useful-life-of-ppf',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'high-quality PPF',
        contextQuote: 'high-quality PPF often lasts <strong>5 to 10 years</strong> in real use',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'PPF is the stronger solution',
        contextQuote: 'If the goal is long-term defense against impact and real paint preservation, PPF is the stronger solution',
      },
      // TODO: blog/strength-and-useful-life-of-ppf (en) — couldn't find clean 3rd anchor
    ],
  },
  {
    article: 'blog/top-5-car-paint-protection',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF is the strongest option',
        contextQuote: 'If your main goal is protecting the paint from chips, road debris, light abrasion, and daily mechanical stress, PPF is the strongest option',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'car ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is a very popular solution for owners who want stronger gloss',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'car wrap',
        originalPhrase: 'Vinyl wrap',
        contextQuote: 'Vinyl wrap is a valid and useful option',
      },
    ],
  },
  // --- Polishing cluster ---
  {
    article: 'blog/car-body-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'Polishing',
        contextQuote: 'Polishing is a controlled correction of the paint surface using dedicated compounds',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: 'before applying ceramic coating',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'PPF',
        contextQuote: 'In that case, PPF is usually the more logical solution, because it creates an actual physical barrier',
      },
    ],
  },
  {
    article: 'blog/car-interior-polishing',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'car interior cleaning',
        originalPhrase: 'Deep cleaning',
        contextQuote: 'Deep cleaning focuses on removing dirt, stains, dust, grease, and contamination',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'Interior polishing is not a “magic restoration” that removes every kind of damage',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'protective film',
        contextQuote: 'a protective film may be more sensible than repeatedly polishing the same part',
      },
    ],
  },
  {
    article: 'blog/headlight-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'Headlight polishing',
        contextQuote: 'Headlight polishing is a controlled restoration of the outer surface',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'film',
        contextQuote: 'In practice, film is often one of the most interesting solutions because it protects not only from UV',
      },
      // TODO: blog/headlight-polishing (en) — no ceramic context in body; only 2 rules
    ],
  },
  {
    article: 'blog/how-often-polish-car',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'car polish service',
        originalPhrase: 'Polishing',
        contextQuote: 'Polishing frequency always depends on the environment in which the car lives',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating simplifies maintenance, improves hydrophobic behavior',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF',
        contextQuote: 'PPF works differently. It is not just a coating that makes washing easier — it is a true protective layer',
      },
    ],
  },
  {
    article: 'blog/polishing-after-repair',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'The purpose of polishing is to optically even the surface out',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: 'a ceramic coating may be a logical next step',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'PPF',
        contextQuote: 'PPF is usually the stronger solution',
      },
    ],
  },
  {
    article: 'blog/polishing-before-after',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'What polishing actually changes is the way light interacts with the paint',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF',
        contextQuote: 'polishing + PPF is often the most rational strategy',
      },
      // TODO: blog/polishing-before-after (en) — no clean ceramic context in body; only 2 rules
    ],
  },
  {
    article: 'blog/polishing-cost-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'Polishing',
        contextQuote: 'Polishing is a controlled correction of the upper portion of the paintwork',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating makes sense if you want stronger gloss, a hydrophobic effect',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf for car',
        originalPhrase: 'PPF',
        contextQuote: 'it often makes more sense to think not only about ceramic coating after polishing, but also about PPF',
      },
    ],
  },
  {
    article: 'blog/soft-vs-abrasive-polishing',
    links: [
      {
        role: 'pillar',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'Polishing',
        contextQuote: 'Polishing a car is not just about restoring gloss',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'car ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: '<strong>ceramic coating</strong> — if the goal is easier maintenance, hydrophobic behavior',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF',
        contextQuote: '<strong>PPF</strong> — if physical protection from chips, road abrasion',
      },
    ],
  },
  // --- Vinyl cluster ---
  {
    article: 'blog/benefits-of-vinyl-wraps',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'car wrapping',
        originalPhrase: 'Vinyl wrapping',
        contextQuote: 'Vinyl wrapping means applying a decorative film to the body of the vehicle',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'car ppf',
        originalPhrase: 'PPF',
        contextQuote: 'In those cases, PPF or colored protective film usually works better',
      },
      // TODO: blog/benefits-of-vinyl-wraps (en) — no clean /polishing or /ceramiccoating context outside reviews; 2 rules
    ],
  },
  {
    article: 'blog/car-body-color-with-vinyl-wrap',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'wrap car',
        originalPhrase: 'Vinyl wrap',
        contextQuote: 'Vinyl wrap primarily changes the',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf for car',
        originalPhrase: 'Colored PPF',
        contextQuote: 'Colored PPF, by contrast, combines a color change with a noticeably higher level of real physical protection',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'well-polished body',
        contextQuote: 'Gloss vinyl is the closest thing to the visual impression of a freshly painted or well-polished body',
      },
    ],
  },
  {
    article: 'blog/hints-for-vinyl-wrapped-cars',
    links: [
      {
        role: 'pillar',
        target: '/vinyl-wrapping',
        anchor: 'car wrap',
        originalPhrase: 'wrapping a car in vinyl',
        contextQuote: 'For many owners, wrapping a car in vinyl is the most flexible way to change its appearance without repainting it',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'premium car wash',
        originalPhrase: 'hand wash',
        contextQuote: 'The best option for a vinyl-wrapped vehicle is a safe hand wash or a detailing wash that actually understands wrap care',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF is the more appropriate solution',
        contextQuote: 'if the main goal is preserving the paint from real impacts and front-end abuse, PPF is the more appropriate solution',
      },
    ],
  },
  // --- Tinting cluster ---
  {
    article: 'blog/legal-aspects-of-tinting-in-georgia',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'window tinting',
        originalPhrase: 'Window tinting in Georgia',
        contextQuote: 'Window tinting in Georgia is one of the most requested services',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'car window tint',
        originalPhrase: 'tint',
        contextQuote: 'Knowing the tint rules saves time and money first of all',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'windshield repair',
        originalPhrase: 'compromising this area',
        contextQuote: 'Even if a darker look seems appealing, compromising this area is rarely a smart practical decision',
      },
    ],
  },
  {
    article: 'blog/vehicle-tinting-techniques',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'car tinting',
        originalPhrase: 'Car window tinting',
        contextQuote: 'Car window tinting is one of the most practical upgrades',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'window tint',
        originalPhrase: 'a properly selected window film',
        contextQuote: 'a properly selected window film does not just improve the way the car looks',
      },
      // TODO: blog/vehicle-tinting-techniques (en) — no /ppf or /windshield context; 2 rules
    ],
  },
  {
    article: 'blog/window-tinting-care',
    links: [
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'car window tint',
        originalPhrase: 'Tinted windows',
        contextQuote: 'Tinted windows are often chosen for appearance first',
      },
      {
        role: 'pillar',
        target: '/auto-glass-tinting',
        anchor: 'window tinting',
        originalPhrase: 'getting the film installed',
        contextQuote: 'That is why getting the film installed is only the beginning',
      },
      {
        role: 'bridge',
        target: '/carwash',
        anchor: 'car wash',
        originalPhrase: 'Exterior washing',
        contextQuote: 'Exterior washing is less risky because the film is installed on the inside of the glass',
      },
    ],
  },
  // --- Windshield cluster ---
  {
    article: 'blog/efficiency-of-windshield-repair',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'windshield repair',
        originalPhrase: 'Windshield repair',
        contextQuote: 'Windshield repair can be very effective — but only when expectations are realistic',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'auto glass repair',
        originalPhrase: 'repair',
        contextQuote: 'when is it smarter to stop thinking about repair and start thinking about replacement',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'car window tint',
        originalPhrase: 'polishing',
        contextQuote: 'a specialist may recommend an additional procedure such as polishing or a more thorough correction',
      },
    ],
  },
  {
    article: 'blog/replace-or-repair',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'car glass repair',
        originalPhrase: 'the glass still be repaired',
        contextQuote: 'can the glass still be repaired, or is replacement already necessary',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'windscreen repair',
        originalPhrase: 'A professional repair',
        contextQuote: 'A professional repair is not just “putting some product on top.”',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'window tint',
        originalPhrase: 'heating elements',
        contextQuote: 'because it depends on the vehicle model, the specific windshield, the presence of sensors, heating elements, and other technical features',
      },
    ],
  },
  {
    article: 'blog/windshield-repair-benefits',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'windshield repair',
        originalPhrase: 'windshield restoration',
        contextQuote: 'windshield restoration should usually be seen not as a “second-rate option,”',
      },
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'auto glass repair',
        originalPhrase: 'timely repair of a small chip',
        contextQuote: 'timely repair of a small chip has several serious advantages at once',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'car tinting',
        originalPhrase: 'heating elements',
        contextQuote: 'on cars where the windshield is integrated with driver-assistance systems, heating elements, or cameras',
      },
    ],
  },
  {
    article: 'blog/chip-repair-process-step-by-step',
    links: [
      {
        role: 'pillar',
        target: '/windshield-repair',
        anchor: 'windshield repair',
        originalPhrase: 'Windshield chip repair',
        contextQuote: 'Windshield chip repair in its early window is not cosmetic — it is a structural operation',
      },
      {
        role: 'bridge',
        target: '/windshield-repair',
        anchor: 'car glass repair',
        originalPhrase: 'restores glass strength',
        contextQuote: 'Polymer resin under vacuum with UV curing restores glass strength in the damaged zone',
      },
    ],
  },
  // --- General detailing cluster ---
  // Note: blog/errors-to-find skipped (topic is OBD diagnostics, not detailing)
  {
    article: 'blog/10-paint-mistakes',
    links: [
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'Polishing',
        contextQuote: 'Polishing improves the look of the paint. It does not create a lasting physical barrier against new damage',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: 'If your priority is gloss and easier maintenance, ceramic coating may be enough',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF is usually the more dependable solution',
        contextQuote: 'But if your priority is physical protection from chips, road abrasion, and daily mechanical wear, PPF is usually the more dependable solution',
      },
    ],
  },
  {
    article: 'blog/car-detailing-guide',
    links: [
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'If the paint looks tired, hazy, scratched, or uneven, polishing becomes the stage that restores clarity and reflection',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is primarily about stronger gloss, easier washing, better hydrophobic behavior',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF is the most serious option',
        contextQuote: 'PPF is the most serious option when the goal is real physical protection',
      },
    ],
  },
  {
    article: 'blog/detailing-cost-tbilisi',
    links: [
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'Multi-stage polishing is a third',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is the right choice when the goal is easier maintenance',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'PPF is a much stronger solution',
        contextQuote: 'PPF is a much stronger solution than polishing or ceramic coating alone',
      },
    ],
  },
  {
    article: 'blog/how-to-choose-detailing-studio',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'protective PPF film',
        contextQuote: 'When we are talking about polishing, ceramic coating, interior deep cleaning, window tinting, or especially protective PPF film',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'One place may be especially good at polishing, another at PPF, and another at tinting or interior cleaning',
      },
      // TODO: blog/how-to-choose-detailing-studio (en) — 3rd /ceramiccoating anchor trips dup-stem; 2 rules only
    ],
  },
  {
    article: 'blog/summer-car-care-georgia',
    links: [
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is also very relevant in summer, but it solves a different problem',
      },
      {
        role: 'bridge',
        target: '/auto-glass-tinting',
        anchor: 'car window tint',
        originalPhrase: 'window tint',
        contextQuote: 'That is why window tint is not just a styling element but a practical comfort upgrade',
      },
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'PPF — paint protection film',
        contextQuote: 'The strongest answer here is PPF — paint protection film',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'car interior detailing',
        originalPhrase: 'interior detailing',
        contextQuote: 'deep cleaning or full interior detailing',
      },
    ],
  },
  {
    article: 'blog/technology-and-process',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'auto ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is a special protective composition that forms a very thin but durable layer',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'polishing may be needed before ceramic',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF',
        contextQuote: 'not in the same category as PPF when it comes to impact protection',
      },
    ],
  },
  // --- Interior cleaning cluster ---
  {
    article: 'blog/car-interior-detailing-basics',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'car interior detailing',
        originalPhrase: 'interior deep cleaning',
        contextQuote: 'car needs light cleaning, full interior deep cleaning',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'interior ceramic coating',
        contextQuote: 'interior ceramic coating on suitable surfaces',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'interior detail polishing starts from 200 GEL',
      },
    ],
  },
  {
    article: 'blog/car-interior-disinfection',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'car interior cleaning',
        originalPhrase: 'deep cleaning',
        contextQuote: 'deep cleaning plus ozone treatment is usually the right path',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'car dry cleaning',
        originalPhrase: 'deep cleaning',
        contextQuote: 'do deep cleaning first and ozone treatment afterward',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'car interior detailing',
        originalPhrase: 'deep interior cleaning',
        contextQuote: 'deep interior cleaning plus ozone treatment is the right combination',
      },
    ],
  },
  {
    article: 'blog/engine-room-cleaning',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'car wash tbilisi',
        originalPhrase: 'body washing',
        contextQuote: 'close attention to body washing',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'car interior cleaning',
        originalPhrase: 'interior cleaning',
        contextQuote: 'interior cleaning, and the overall look',
      },
      // TODO: blog/engine-room-cleaning (en) — no ceramic mentions in body; 2 rules only
    ],
  },
  {
    article: 'blog/interior-cleaning-for-auto',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'car interior detailing',
        originalPhrase: 'Interior deep cleaning',
        contextQuote: 'Interior deep cleaning is often seen as a purely cosmetic service',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'car dry cleaning',
        originalPhrase: 'interior cleaning',
        contextQuote: 'demand for interior cleaning is especially high',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'car interior cleaning',
        originalPhrase: 'interior cleaning',
        contextQuote: 'Professional interior cleaning usually consists of several stages',
      },
    ],
  },
  {
    article: 'blog/new-car-detailing',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'PPF',
        contextQuote: 'the most reliable first step is PPF',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: 'combining PPF with ceramic coating is often the most balanced',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'Aggressive deep polishing is usually unnecessary',
      },
    ],
  },
  {
    article: 'blog/what-is-ppf-explainer',
    links: [
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic coating',
        contextQuote: 'Ceramic coating is a chemical liquid based on SiO₂ or SiC.',
      },
      {
        role: 'bridge',
        target: '/vinyl-wrapping',
        anchor: 'car wrap',
        originalPhrase: 'Vinyl',
        contextQuote: 'Vinyl is a decorative film for colour or design changes.',
      },
    ],
  },
  {
    article: 'blog/2-phase-vs-3-phase-wash',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'car wash',
        originalPhrase: 'car wash',
        contextQuote: 'A 2-phase car wash is the classic base cycle of a professional detailing-studio wash',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic-coated car',
        contextQuote: 'On a ceramic-coated car the wash job is different: not to create new protection but to preserve existing protection.',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'polyurethane film',
        contextQuote: 'PPF-coated car — polyurethane film has its own hydrophobic layer and is maintained with dedicated sprays',
      },
    ],
  },
  {
    article: 'blog/contactless-vs-hand-wash',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'car wash',
        originalPhrase: 'detailing wash',
        contextQuote: 'BESTAUTO pricing for a detailing wash is the same regardless',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'body polishing',
        contextQuote: 'treating that (body polishing from 690 ₾) costs more than was saved on washes',
      },
    ],
  },
  {
    article: 'blog/detailing-wash-explained',
    links: [
      {
        role: 'pillar',
        target: '/carwash',
        anchor: 'car wash',
        originalPhrase: 'car wash',
        contextQuote: 'a neighbourhood car wash in Tbilisi share the name',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: 'On typical alkaline chemistry a ceramic coating loses hydrophobic behaviour in 3-4 washes',
      },
    ],
  },
  {
    article: 'blog/car-body-wrap-cost-guide',
    links: [
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'car ppf',
        originalPhrase: 'PPF',
        contextQuote: 'Temporary colour change with no consequences for the body — vinyl. Protection plus new colour together — PPF. Permanent change with acceptance of VIN complications at resale — repaint.',
      },
    ],
  },
  {
    article: 'blog/ceramic-polishing-combo',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'car ceramic coating',
        originalPhrase: 'ceramic',
        contextQuote: 'Without polishing, ceramic sits on the clearcoat\'s micro-relief, defects and all.',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polish',
        contextQuote: 'Gloss from the polish holds for two or three years instead of two washes — the whole point.',
      },
      {
        role: 'bridge',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'PPF',
        contextQuote: 'For physical stone-chip defence on top of ceramic, PPF is the tool',
      },
    ],
  },
  {
    article: 'blog/detailing-center-tbilisi',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'paint protection film',
        originalPhrase: 'film',
        contextQuote: 'Only film takes the stone strike and physically covers the clearcoat',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'Polishing',
        contextQuote: 'Polishing above 30°C is a no-go',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'Ceramic',
        contextQuote: 'Ceramic wants 20-25°C and controlled humidity',
      },
    ],
  },
  {
    article: 'blog/detailing-services-all-in-one',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'ppf wrap',
        originalPhrase: 'PPF',
        contextQuote: 'Premium PPF — every 10 years',
      },
      {
        role: 'bridge',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic',
        contextQuote: 'ceramic makes washing 2-3x easier',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'car polishing',
        originalPhrase: 'polishing',
        contextQuote: 'polishing cannot be done above 30°C',
      },
    ],
  },
  {
    article: 'blog/interior-ceramic-detail',
    links: [
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: 'Interior ceramic coating — pricing in Tbilisi',
      },
      {
        role: 'pillar',
        target: '/ceramiccoating',
        anchor: 'ceramic coating',
        originalPhrase: 'ceramic coating',
        contextQuote: "Interior ceramic coating isn't one universal product but a set of narrow solutions for leather, plastic, fabric, and Alcantara.",
      },
    ],
  },
  {
    article: 'blog/interior-disinfection-ozone',
    links: [
      {
        role: 'pillar',
        target: '/interior-cleaning',
        anchor: 'dry cleaning',
        originalPhrase: 'dry cleaning',
        contextQuote: 'Scheduled dry cleaning "by calendar" rather than because of a specific issue.',
      },
      {
        role: 'bridge',
        target: '/interior-cleaning',
        anchor: 'dry cleaning',
        originalPhrase: 'dry cleaning',
        contextQuote: 'Pet owners and smokers — ozone with every dry cleaning, i.e. every 6-12 months.',
      },
    ],
  },
  {
    article: 'blog/ppf-full-body-wrapping-guide',
    links: [
      {
        role: 'pillar',
        target: '/ppf-shield-wrapping',
        anchor: 'PPF wrap',
        originalPhrase: 'PPF wrap',
        contextQuote: 'Full PPF wrap pricing is shaped by several factors',
      },
      {
        role: 'bridge',
        target: '/polishing',
        anchor: 'polishing',
        originalPhrase: 'polishing',
        contextQuote: 'and need for prior polishing.',
      },
    ],
  },
];

export function getBlogLinksForLang(lang: string): readonly BlogLinkRule[] {
  switch (lang) {
    case 'ru': return BLOG_LINKS_RU;
    case 'ka': return BLOG_LINKS_KA;
    case 'en': return BLOG_LINKS_EN;
    default: return [];
  }
}
