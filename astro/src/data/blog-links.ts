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
        originalPhrase: 'ქიმწმენდის',
        contextQuote: 'ქიმწმენდის მთავარი ამოცანაა სალონში არსებული ჭუჭყის, ლაქების, მტვრის, სუნის და დაგროვილი დაბინძურების მოცილება',
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
        originalPhrase: 'დამცავი ფირის',
        contextQuote: 'ზოგჯერ უფრო სწორი გადაწყვეტილებაა დამცავი ფირის გამოყენება',
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
        originalPhrase: 'პოლირების',
        contextQuote: 'პოლირების სიხშირე ყოველთვის დამოკიდებულია იმაზე, რა პირობებში ცხოვრობს მანქანა',
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
        originalPhrase: 'პოლირების',
        contextQuote: 'პოლირების მიზანია ზედაპირის ოპტიკური გასწორება, რათა დეტალი ბუნებრივად ჩაჯდეს მთელ ავტომობილში',
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
];

export function getBlogLinksForLang(lang: string): readonly BlogLinkRule[] {
  switch (lang) {
    case 'ru': return BLOG_LINKS_RU;
    case 'ka': return BLOG_LINKS_KA;
    case 'en': return BLOG_LINKS_EN;
    default: return [];
  }
}
