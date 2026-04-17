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
];

export function getBlogLinksForLang(lang: string): readonly BlogLinkRule[] {
  switch (lang) {
    case 'ru': return BLOG_LINKS_RU;
    case 'ka': return BLOG_LINKS_KA;
    case 'en': return BLOG_LINKS_EN;
    default: return [];
  }
}
