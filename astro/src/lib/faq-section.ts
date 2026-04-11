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
      ka: 'რამდენ ხანს გრძელდება PPF ფირით დაფარვა?',
      ru: 'Сколько времени занимает оклейка PPF?',
      en: 'How long does PPF installation take?',
    },
    answer: {
      ka: 'PPF ფირით სრული დაფარვა ჩვეულებრივ 3-5 სამუშაო დღეს მოითხოვს, ნაწილობრივი დაფარვა (კაპოტი, ფარები, ბამპერი) — 1-2 დღეს. ვადები დამოკიდებულია ავტომობილის ზომასა და კომპლექსურობაზე.',
      ru: 'Полная оклейка PPF обычно занимает 3–5 рабочих дней, частичная (капот, фары, бампер) — 1–2 дня. Сроки зависят от размера и сложности автомобиля.',
      en: 'Full PPF wrap typically takes 3–5 business days, partial coverage (hood, headlights, bumper) — 1–2 days. Timeline depends on the vehicle size and complexity.',
    },
  },
  {
    question: {
      ka: 'რა მასალებს იყენებთ?',
      ru: 'Какие материалы вы используете?',
      en: 'What materials do you use?',
    },
    answer: {
      ka: 'ვმუშაობთ მხოლოდ სერტიფიცირებული ბრენდებით: LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON, 3M. ეს უზრუნველყოფს ხარისხსა და მწარმოებლის გარანტიას.',
      ru: 'Работаем только с сертифицированными брендами: LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON, 3M. Это гарантирует качество и заводскую гарантию материалов.',
      en: 'We work exclusively with certified brands: LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON, 3M. This ensures quality and manufacturer warranty on materials.',
    },
  },
  {
    question: {
      ka: 'რას მოიცავს გარანტია და როგორ გამოვიყენო?',
      ru: 'Что включает гарантия и как ей воспользоваться?',
      en: 'What does the warranty cover and how do I use it?',
    },
    answer: {
      ka: 'PPF ფირზე — 10 წლამდე გარანტია გაყვითლებისა და აქერცვლისგან. მიღებისას მიიღებთ საგარანტიო სერტიფიკატს. გარანტიით სარგებლობისთვის — მოგვმართეთ სერტიფიკატის ნომრით.',
      ru: 'На PPF плёнку — до 10 лет гарантии от пожелтения и отслаивания. При приёмке выдаём гарантийный сертификат. Для обращения по гарантии свяжитесь с нами с номером сертификата.',
      en: 'PPF film — up to 10-year warranty against yellowing and peeling. You receive a warranty certificate at handover. To make a claim, contact us with your certificate number.',
    },
  },
  {
    question: {
      ka: 'შეიძლება მანქანის დაბანა კერამიკული საფარის / PPF-ის შემდეგ?',
      ru: 'Можно ли мыть машину после керамики / PPF?',
      en: 'Can I wash my car after ceramic coating / PPF?',
    },
    answer: {
      ka: 'კერამიკული საფარის შემდეგ რეკომენდებულია 7 დღე არ დაიბანოთ მანქანა. PPF-ის შემდეგ — 48 საათი. შემდეგ შეიძლება ხელით ბანვა pH-ნეიტრალური საშუალებებით. ავტომატური სამრეცხაო არ არის რეკომენდებული.',
      ru: 'После керамики рекомендуем не мыть машину 7 дней, после PPF — 48 часов. Затем можно мыть вручную pH-нейтральными средствами. Автоматическая мойка не рекомендуется.',
      en: 'After ceramic coating, avoid washing for 7 days. After PPF — 48 hours. Then hand wash with pH-neutral products is fine. Automated car washes are not recommended.',
    },
  },
  {
    question: {
      ka: 'მუშაობთ ახალ ავტომობილებთან სალონიდან?',
      ru: 'Работаете ли вы с новыми авто из салона?',
      en: 'Do you work with brand-new cars from the dealership?',
    },
    answer: {
      ka: 'დიახ, ახალი ავტომობილები — იდეალური დრო PPF-ისა და კერამიკის დასატანად. ლაქი ჯერ კიდევ სუფთაა, რაც უზრუნველყოფს საუკეთესო ადჰეზიას. ბევრი კლიენტი სალონიდან პირდაპირ ჩვენთან მოდის.',
      ru: 'Да, новый автомобиль — идеальное время для нанесения PPF и керамики. Лак ещё чистый, что обеспечивает лучшую адгезию. Многие клиенты приезжают к нам прямо из салона.',
      en: 'Yes, a brand-new car is the perfect time for PPF and ceramic coating. The paint is still pristine, ensuring optimal adhesion. Many clients drive to us straight from the dealership.',
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
