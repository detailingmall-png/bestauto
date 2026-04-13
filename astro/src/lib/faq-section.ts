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
      ru: 'Какие услуги вы предоставляете?',
      en: 'What services do you offer?',
    },
    answer: {
      ka: 'ჩვენთან ხელმისაწვდომია PPF ფირის გადაკვრა, ფერის შეცვლა ფირით, პოლირება, კერამიკული საფარი, მინების დაბურვა, სალონის ქიმწმენდა, დეტეილინგ რეცხვა, ხმის იზოლაცია და საქარე მინის აღდგენა.',
      ru: 'У нас доступны оклейка PPF плёнкой, смена цвета плёнкой, полировка, керамическое покрытие, тонировка стёкол, химчистка салона, детейлинг мойка, шумоизоляция и ремонт лобового стекла.',
      en: 'We offer PPF film wrapping, color change with film, polishing, ceramic coating, window tinting, interior cleaning, detailing car wash, soundproofing and windshield repair.',
    },
  },
  {
    question: {
      ka: 'სად მდებარეობს BESTAUTO?',
      ru: 'Где находится BESTAUTO?',
      en: 'Where is BESTAUTO located?',
    },
    answer: {
      ka: 'BESTAUTO მუშაობს ორ ლოკაციაზე თბილისში — გურამიშვილსა და საბურთალოზე. ჩაწერის დროს შეგარჩევინებთ თქვენთვის უფრო მოსახერხებელ სტუდიას.',
      ru: 'BESTAUTO работает в двух локациях в Тбилиси — на Гурамишвили и Сабуртало. При записи поможем выбрать удобную для вас студию.',
      en: 'BESTAUTO operates at two locations in Tbilisi — Guramishvili and Saburtalo. When booking, we\'ll help you choose the most convenient studio.',
    },
  },
  {
    question: {
      ka: 'როგორ გავიგო რომელი სერვისი მჭირდება?',
      ru: 'Как понять, какая услуга мне нужна?',
      en: 'How do I know which service I need?',
    },
    answer: {
      ka: 'თუ არ ხართ დარწმუნებული რომელი მომსახურებაა თქვენთვის სწორი, საუკეთესო გზაა უფასო დათვალიერება. ადგილზე გირჩევთ ოპტიმალურ გადაწყვეტას ავტომობილის მდგომარეობისა და თქვენი მიზნის მიხედვით.',
      ru: 'Если не уверены, какая услуга подходит — лучший вариант бесплатный осмотр. На месте подберём оптимальное решение с учётом состояния автомобиля и ваших целей.',
      en: 'If you\'re not sure which service is right for you, a free inspection is the best option. We\'ll recommend the optimal solution based on your car\'s condition and your goals.',
    },
  },
  {
    question: {
      ka: 'შესაძლებელია რამდენიმე სერვისის ერთად გაკეთება?',
      ru: 'Можно ли сделать несколько услуг одновременно?',
      en: 'Can I combine multiple services?',
    },
    answer: {
      ka: 'დიახ. ხშირად კლიენტები აერთიანებენ რამდენიმე მომსახურებას — მაგალითად, პოლირებას და კერამიკულ საფარს, ან PPF-სა და მინების დაბურვას.',
      ru: 'Да. Клиенты часто совмещают несколько услуг — например, полировку и керамическое покрытие, или PPF и тонировку стёкол.',
      en: 'Yes. Clients often combine several services — for example, polishing with ceramic coating, or PPF with window tinting.',
    },
  },
  {
    question: {
      ka: 'რამდენ ხანში მპასუხობთ ჩაწერის შემდეგ?',
      ru: 'Как быстро вы отвечаете после записи?',
      en: 'How quickly do you respond after booking?',
    },
    answer: {
      ka: 'როგორც წესი, მოთხოვნის გამოგზავნიდან 15 წუთის განმავლობაში გიკავშირდებით. ასევე შეგიძლიათ მოგვწეროთ WhatsApp-ზე ან დაგვირეკოთ პირდაპირ.',
      ru: 'Как правило, свяжемся с вами в течение 15 минут после отправки заявки. Также можно написать нам в WhatsApp или позвонить напрямую.',
      en: 'We typically get back to you within 15 minutes of your request. You can also message us on WhatsApp or call directly.',
    },
  },
  {
    question: {
      ka: 'რა მასალებს ვიყენებთ?',
      ru: 'Какие материалы вы используете?',
      en: 'What materials do you use?',
    },
    answer: {
      ka: 'ვმუშაობთ მხოლოდ სერტიფიცირებულ ბრენდებთან — LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON და 3M. ეს ნიშნავს მაღალ ხარისხს, სანდო შედეგს და მწარმოებლის ოფიციალურ გარანტიას.',
      ru: 'Работаем только с сертифицированными брендами — LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON и 3M. Это означает высокое качество, надёжный результат и официальную гарантию производителя.',
      en: 'We work exclusively with certified brands — LLumar, Quantum, LuxArmor, Koch-Chemie, GYEON and 3M. This means high quality, reliable results and official manufacturer warranty.',
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
