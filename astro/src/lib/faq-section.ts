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
      ru: 'Сколько времени занимает оклейка PPF?',
      en: 'How long does PPF installation take?',
    },
    answer: {
      ka: 'ჩვენთან ხელმისაწვდომია PPF ფირის გადაკვრა, ფერის შეცვლა ფირით, პოლირება, კერამიკული საფარი, მინების დაბურვა, სალონის ქიმწმენდა, დეტეილინგ რეცხვა, ხმის იზოლაცია და საქარე მინის აღდგენა.',
      ru: 'Полная оклейка PPF обычно занимает 3–5 рабочих дней, частичная (капот, фары, бампер) — 1–2 дня. Сроки зависят от размера и сложности автомобиля.',
      en: 'Full PPF wrap typically takes 3–5 business days, partial coverage (hood, headlights, bumper) — 1–2 days. Timeline depends on the vehicle size and complexity.',
    },
  },
  {
    question: {
      ka: 'სად მდებარეობს BESTAUTO?',
      ru: 'Какие материалы вы используете?',
      en: 'What materials do you use?',
    },
    answer: {
      ka: 'BESTAUTO მუშაობს ორ ლოკაციაზე თბილისში — გურამიშვილსა და საბურთალოზე. ჩანერის შეგარჩევინებთ თქვენთვის უფრო მოსახერხებელ სტუდიას.',
      ru: 'Работаем только с сертифицированными брендами: LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON, 3M. Это гарантирует качество и заводскую гарантию материалов.',
      en: 'We work exclusively with certified brands: LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON, 3M. This ensures quality and manufacturer warranty on materials.',
    },
  },
  {
    question: {
      ka: 'როგორ გავიგო რომელი სერვისი მჭირდება?',
      ru: 'Что включает гарантия и как ей воспользоваться?',
      en: 'What does the warranty cover and how do I use it?',
    },
    answer: {
      ka: 'თუ არ ხართ დარწმუნებული რომელი მომსახურებაა თქვენთვის სწორი, საუკეთესო გზაა უფასო დათვალიერება. ადგილზე გირჩევთ ოპტიმალურ გადაწყვეტას ავტომობილის მდგომარეობისა და თქვენი მიზნის მიხედვით.',
      ru: 'На PPF плёнку — до 10 лет гарантии от пожелтения и отслаивания. При приёмке выдаём гарантийный сертификат. Для обращения по гарантии свяжитесь с нами с номером сертификата.',
      en: 'PPF film — up to 10-year warranty against yellowing and peeling. You receive a warranty certificate at handover. To make a claim, contact us with your certificate number.',
    },
  },
  {
    question: {
      ka: 'შესაძლებელია რამდენიმე სერვისის ერთად გაკეთება?',
      ru: 'Можно ли мыть машину после керамики / PPF?',
      en: 'Can I wash my car after ceramic coating / PPF?',
    },
    answer: {
      ka: 'დიახ. ხშირად კლიენტები აერთიანებენ რამდენიმე მომსახურებას — მაგალითად, პოლირებას და კერამიკულ საფარს, ან PPF-სა და მინების დაბურვას.',
      ru: 'После керамики рекомендуем не мыть машину 7 дней, после PPF — 48 часов. Затем можно мыть вручную pH-нейтральными средствами. Автоматическая мойка не рекомендуется.',
      en: 'After ceramic coating, avoid washing for 7 days. After PPF — 48 hours. Then hand wash with pH-neutral products is fine. Automated car washes are not recommended.',
    },
  },
  {
    question: {
      ka: 'რამდენ ხანში მპასუხობთ ჩაწერის შემდეგ?',
      ru: 'Работаете ли вы с новыми авто из салона?',
      en: 'Do you work with brand-new cars from the dealership?',
    },
    answer: {
      ka: 'როგორც წესი, მოთხოვნის გამოგზავნის შემდეგ სწრაფად გიკავშირდებით. ასევე შეგიძლიათ მოგვწეროთ WhatsApp-ზე ან დაგვირეკოთ პირდაპირ.',
      ru: 'Да, новый автомобиль — идеальное время для нанесения PPF и керамики. Лак ещё чистый, что обеспечивает лучшую адгезию. Многие клиенты приезжают к нам прямо из салона.',
      en: 'Yes, a brand-new car is the perfect time for PPF and ceramic coating. The paint is still pristine, ensuring optimal adhesion. Many clients drive to us straight from the dealership.',
    },
  },
  {
    question: {
      ka: 'რა მასალებს ვიყენებთ?',
      ru: 'Можно ли приехать без записи?',
      en: 'Can I visit without an appointment?',
    },
    answer: {
      ka: 'ვმუშაობთ მხოლოდ სერტიფიცირებულ ბრენდებთან — LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON და 3M. ეს ნიშნავს მაღალ ხარისხს, სანდო შედეგს და მწარმოებლის ოფიციალურ გარანტიას.',
      ru: 'Рекомендуем записаться заранее — так мы гарантируем наличие мастера и бокса. Запишитесь через WhatsApp или по телефону, и мы подберём удобное время.',
      en: 'We recommend booking ahead to ensure a technician and bay are available. Schedule via WhatsApp or phone, and we\'ll find a convenient time.',
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
