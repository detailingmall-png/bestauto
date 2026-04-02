/**
 * Generates the FAQ accordion section + JSON-LD FAQPage schema
 * for the bestauto.ge homepage. Uses native <details>/<summary> (no JS).
 * Returns complete HTML with inline styles (Tilda-compatible).
 */

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
      ka: 'ვმუშაობთ მხოლოდ სერტიფიცირებული ბრენდებით: STEK, 3M, Gtechniq, Koch-Chemie, GYEON. ეს უზრუნველყოფს ხარისხსა და მწარმოებლის გარანტიას.',
      ru: 'Работаем только с сертифицированными брендами: STEK, 3M, Gtechniq, Koch-Chemie, GYEON. Это гарантирует качество и заводскую гарантию материалов.',
      en: 'We work exclusively with certified brands: STEK, 3M, Gtechniq, Koch-Chemie, GYEON. This ensures quality and manufacturer warranty on materials.',
    },
  },
  {
    question: {
      ka: 'რას მოიცავს გარანტია და როგორ გამოვიყენო?',
      ru: 'Что включает гарантия и как ей воспользоваться?',
      en: 'What does the warranty cover and how do I use it?',
    },
    answer: {
      ka: 'PPF ფირზე — 10 წლამდე გარანტია გაყვითლებისა და აქერცვლისგან. კერამიკულ საფარზე — 3-5 წელი. მიღებისას მიიღებთ საგარანტიო სერტიფიკატს. გარანტიით სარგებლობისთვის — მოგვმართეთ სერტიფიკატის ნომრით.',
      ru: 'На PPF плёнку — до 10 лет гарантии от пожелтения и отслаивания. На керамику — 3–5 лет. При приёмке выдаём гарантийный сертификат. Для обращения по гарантии свяжитесь с нами с номером сертификата.',
      en: 'PPF film — up to 10-year warranty against yellowing and peeling. Ceramic coating — 3–5 years. You receive a warranty certificate at handover. To make a claim, contact us with your certificate number.',
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
  {
    question: {
      ka: 'არის განვადება?',
      ru: 'Есть ли рассрочка?',
      en: 'Do you offer installment plans?',
    },
    answer: {
      ka: 'დიახ, ვთავაზობთ განვადებას საბანკო პარტნიორების მეშვეობით. დეტალებისთვის დაგვიკავშირდით WhatsApp-ით ან ტელეფონით — გეტყვით ხელმისაწვდომ პირობებს.',
      ru: 'Да, мы предлагаем рассрочку через банки-партнёры. Свяжитесь с нами в WhatsApp или по телефону — расскажем о доступных условиях.',
      en: 'Yes, we offer installment plans through our banking partners. Contact us via WhatsApp or phone — we will explain the available options.',
    },
  },
];

const SECTION_TITLE: Readonly<Record<string, string>> = {
  ka: 'ხშირად დასმული კითხვები',
  ru: 'Часто задаваемые вопросы',
  en: 'Frequently Asked Questions',
};

function renderFaqItem(item: FaqItem, lang: string): string {
  const question = item.question[lang] ?? item.question['en'];
  const answer = item.answer[lang] ?? item.answer['en'];

  return `<details class="ba-faq__item" style="border-bottom:1px solid rgba(255,255,255,0.1);">
        <summary style="display:flex;align-items:center;justify-content:space-between;padding:20px 0;cursor:pointer;list-style:none;font-family:TildaSans,Arial,sans-serif;font-size:18px;font-weight:600;color:#fff;line-height:1.4;gap:16px;">
          <span>${question}</span>
          <svg class="ba-faq__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink:0;transition:transform 0.25s ease;"><path d="M5 7.5L10 12.5L15 7.5" stroke="#e4c97e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </summary>
        <div style="padding:0 0 20px;font-family:TildaSans,Arial,sans-serif;font-size:16px;color:rgba(255,255,255,0.7);line-height:1.6;">${answer}</div>
      </details>`;
}

export function generateFaqHtml(lang: string): string {
  const title = SECTION_TITLE[lang] ?? SECTION_TITLE['en'];
  const items = FAQ_ITEMS.map((item) => renderFaqItem(item, lang)).join('\n      ');

  return `<div id="ba-faq" style="background:#000;padding:80px 0;border-top:1px solid rgba(255,255,255,0.06);">
  <div style="max-width:800px;margin:0 auto;padding:0 24px;">
    <h2 style="color:#fff;font-size:36px;font-weight:700;text-align:center;margin:0 0 48px;font-family:TildaSans,Arial,sans-serif;">${title}</h2>
    <div>
      ${items}
    </div>
  </div>
  <style>
    .ba-faq__item summary::-webkit-details-marker { display: none; }
    .ba-faq__item[open] .ba-faq__chevron { transform: rotate(180deg); }
    .ba-faq__item summary:hover { color: #e4c97e !important; }
    @media screen and (max-width:639px) {
      #ba-faq { padding: 48px 0 !important; }
      #ba-faq h2 { font-size: 28px !important; margin-bottom: 32px !important; }
      .ba-faq__item summary { font-size: 16px !important; padding: 16px 0 !important; }
      .ba-faq__item div { font-size: 15px !important; }
    }
  </style>
</div>`;
}

/** Generates FAQPage JSON-LD structured data for SEO. */
export function generateFaqSchema(lang: string): string {
  const items = FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question[lang] ?? item.question['en'],
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer[lang] ?? item.answer['en'],
    },
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items,
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}
