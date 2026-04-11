/**
 * Generates the FAQ accordion section + JSON-LD FAQPage schema
 * for the bestauto.ge homepage. Uses the universal faq-accordion component.
 */

import { renderFaqAccordion, renderFaqSchema, resolveFaqItems } from './faq-accordion';

interface FaqItem {
  readonly question: Readonly<Record<string, string>>;
  readonly answer: Readonly<Record<string, string>>;
}

const FAQ_ITEMS: ReadonlyArray<FaqItem> = [
  {
    question: {
      ka: 'რა სერვისებს გვთავაზობთ?',
      ru: 'Какие услуги вы предлагаете?',
      en: 'What services do you offer?',
    },
    answer: {
      ka: 'ჩვენთან ხელმისაწვდომია PPF ფირის გადაკვრა, ფერის შეცვლა ფირით, მინების დაბურვა, პოლირება, კერამიკული საფარი, სალონის ქიმწმენდა, დეტეილინგ რეცხვა, ხმის იზოლაცია და საქარე მინის აღდგენა.',
      ru: 'У нас доступны: оклейка PPF, смена цвета плёнкой, тонировка стёкол, полировка, керамическое покрытие, химчистка салона, детейлинг мойка, шумоизоляция и ремонт лобового стекла.',
      en: 'We offer PPF film wrapping, color change wraps, window tinting, polishing, ceramic coating, interior cleaning, detailing wash, soundproofing, and windshield repair.',
    },
  },
  {
    question: {
      ka: 'სად მდებარეობს BESTAUTO?',
      ru: 'Где находится BESTAUTO?',
      en: 'Where is BESTAUTO located?',
    },
    answer: {
      ka: 'BESTAUTO მუშაობს ორი ლოკაციით თბილისში. ჩაწერის დროს შეგარჩევინებთ თქვენთვის უფრო მოსახერხებელ ფილიალს.',
      ru: 'BESTAUTO работает в двух локациях в Тбилиси. При записи поможем выбрать удобный для вас филиал.',
      en: 'BESTAUTO operates from two locations in Tbilisi. When booking, we\'ll help you choose the most convenient studio.',
    },
  },
  {
    question: {
      ka: 'როგორ გავიგო რომელი სერვისი მჭირდება?',
      ru: 'Как понять, какая услуга мне нужна?',
      en: 'How do I know which service I need?',
    },
    answer: {
      ka: 'საუკეთესო გზაა უფასო დათვალიერება. ადგილზე შეგირჩევთ ოპტიმალურ გადაწყვეტას ავტომობილის მდგომარეობისა და თქვენი მიზნის მიხედვით.',
      ru: 'Лучший способ — бесплатный осмотр. На месте подберём оптимальное решение с учётом состояния автомобиля и ваших целей.',
      en: 'The best way is a free inspection. On-site, we\'ll recommend the optimal solution based on your car\'s condition and your goals.',
    },
  },
  {
    question: {
      ka: 'შესაძლებელია თუ არა რამდენიმე სერვისის ერთად გაკეთება?',
      ru: 'Можно ли сделать несколько услуг одновременно?',
      en: 'Can I get multiple services done at once?',
    },
    answer: {
      ka: 'დიახ. ხშირად ვაკეთებთ კომბინირებულ მომსახურებას, მაგალითად პოლირება და კერამიკა, ან ფირით დაცვა და მინების დაბურვა.',
      ru: 'Да. Мы часто выполняем комбинированные услуги, например полировка и керамика, или оклейка плёнкой и тонировка.',
      en: 'Yes. We often combine services, such as polishing and ceramic coating, or film wrapping and window tinting.',
    },
  },
];

const SECTION_TITLE: Readonly<Record<string, string>> = {
  ka: 'ხშირად დასმული კითხვები',
  ru: 'Часто задаваемые вопросы',
  en: 'Frequently Asked Questions',
};

export function generateFaqHtml(lang: string): string {
  const title = SECTION_TITLE[lang] ?? SECTION_TITLE['en'];
  const items = resolveFaqItems(FAQ_ITEMS, lang);
  return renderFaqAccordion(items, title);
}

/** Generates FAQPage JSON-LD structured data for SEO. */
export function generateFaqSchema(lang: string): string {
  const items = resolveFaqItems(FAQ_ITEMS, lang);
  return renderFaqSchema(items);
}
