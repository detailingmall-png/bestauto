/**
 * Generates the "How it works" process steps section for the bestauto.ge homepage.
 * 4 steps: Application -> Inspection -> Work -> Guarantee.
 * Returns complete HTML with inline styles (Tilda-compatible).
 */

interface ProcessStep {
  readonly icon: string;
  readonly title: Readonly<Record<string, string>>;
  readonly description: Readonly<Record<string, string>>;
}

const STEPS: ReadonlyArray<ProcessStep> = [
  {
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2H10C8.9 2 8 2.9 8 4v24c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 26c-.83 0-1.5-.67-1.5-1.5S15.17 25 16 25s1.5.67 1.5 1.5S16.83 28 16 28zm7-4H9V6h14v18z" style="fill:var(--ba-color-accent)"/></svg>`,
    title: {
      ka: 'განაცხადი',
      ru: 'Заявка',
      en: 'Request',
    },
    description: {
      ka: 'დატოვეთ ნომერი ან მოგვწერეთ WhatsApp-ში — სწრაფად დაგიკავშირდებით და დაგეხმარებით სწორი სერვისის არჩევაში',
      ru: 'Оставьте номер или напишите в WhatsApp — ответим за 15 минут',
      en: 'Leave your number or message us on WhatsApp — reply in 15 min',
    },
  },
  {
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="9" style="stroke:var(--ba-color-accent)" stroke-width="2.5" fill="none"/><path d="M20.5 20.5L28 28" style="stroke:var(--ba-color-accent)" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    title: {
      ka: 'უფასო დათვალიერება',
      ru: 'Осмотр',
      en: 'Inspection',
    },
    description: {
      ka: 'ადგილზე ვაფასებთ ავტომობილის მდგომარეობას, ვარჩევთ სწორ გადაწყვეტას, ვანგარიშობთ ღირებულებასა და ვადებს',
      ru: 'Бесплатный осмотр автомобиля, расчёт стоимости и сроков',
      en: 'Free vehicle inspection, cost and timeline estimate',
    },
  },
  {
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.4 6.2c-2.1-2.1-5.2-2.5-7.7-1.2l-1 .5 6.8 6.8.5-1c1.3-2.5.9-5.6-1.2-7.7l1.6 1.6zM17.3 8.9L6.5 19.7l-.1.1L4 28l8.2-2.4.1-.1 10.8-10.8-5.8-5.8zm-8.6 16l-1.8.5.5-1.8 9.3-9.3 1.3 1.3-9.3 9.3z" style="fill:var(--ba-color-accent)"/></svg>`,
    title: {
      ka: 'სამუშაო',
      ru: 'Работа',
      en: 'Work',
    },
    description: {
      ka: 'სამუშაო სრულდება სტუდიაში პროფესიონალური მასალებითა და პროცესის სრული კონტროლით',
      ru: 'Выполнение в студии — отправляем фото и видео процесса',
      en: 'Work at our studio — we send photos and videos of the process',
    },
  },
  {
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2L4 7v7c0 7.73 5.11 14.96 12 17 6.89-2.04 12-9.27 12-17V7L16 2zm-2 20l-4-4 1.41-1.41L14 19.17l6.59-6.59L22 14l-8 8z" style="fill:var(--ba-color-accent)"/></svg>`,
    title: {
      ka: 'ჩაბარება და რეკომენდაციები',
      ru: 'Гарантия',
      en: 'Guarantee',
    },
    description: {
      ka: 'ავტომობილს გაბარებთ საბოლოო შემოწმების შემდეგ და გაწვდით რეკომენდაციებს შემდგომი მოვლისთვის',
      ru: 'Приёмка вместе с вами — гарантийный сертификат',
      en: 'Final check together — warranty certificate included',
    },
  },
];

const SECTION_TITLE: Readonly<Record<string, string>> = {
  ka: 'როგორ მუშაობს',
  ru: 'Как это работает',
  en: 'How It Works',
};

function renderStep(step: ProcessStep, index: number, lang: string): string {
  const title = step.title[lang] ?? step.title['en'];
  const description = step.description[lang] ?? step.description['en'];
  const stepNum = index + 1;

  return `<div class="ba-process__step" style="display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;flex:1;min-width:0;">
      <div style="width:72px;height:72px;border-radius:var(--ba-radius-full);border:2px solid var(--ba-color-accent);display:flex;align-items:center;justify-content:center;margin-bottom:20px;position:relative;z-index:var(--ba-z-card);background:var(--ba-color-bg);">
        <span class="ba-process__badge" style="position:absolute;top:-8px;right:-8px;width:24px;height:24px;border-radius:var(--ba-radius-full);background:var(--ba-color-accent);color:var(--ba-color-bg);font-weight:var(--ba-font-weight-bold);display:flex;align-items:center;justify-content:center;font-family:var(--ba-font-family);">${stepNum}</span>
        ${step.icon}
      </div>
      <h3 class="ba-process__title" style="color:var(--ba-color-text);font-weight:var(--ba-font-weight-bold);margin:0 0 8px;font-family:var(--ba-font-family);">${title}</h3>
      <p class="ba-process__desc" style="color:var(--ba-color-text-muted);line-height:1.5;margin:0;font-family:var(--ba-font-family);max-width:240px;">${description}</p>
    </div>`;
}

export function generateProcessStepsHtml(lang: string): string {
  const title = SECTION_TITLE[lang] ?? SECTION_TITLE['en'];
  const items = STEPS.map((step, i) => renderStep(step, i, lang)).join('\n    ');

  return `<div id="ba-process-steps" style="background:var(--ba-color-bg);padding:80px 0;border-top:1px solid var(--ba-color-border-subtle);">
  <div style="max-width:1100px;margin:0 auto;padding:0 24px;">
    <h2 class="ba-process__heading" style="color:var(--ba-color-text);font-weight:var(--ba-font-weight-bold);text-align:center;margin:0 0 48px;font-family:var(--ba-font-family);">${title}</h2>
    <div class="ba-process__row" style="display:flex;align-items:flex-start;justify-content:center;gap:32px;position:relative;">
      <div class="ba-process__line" style="position:absolute;top:36px;left:calc(12.5% + 36px);right:calc(12.5% + 36px);height:2px;background:var(--ba-color-accent-faint);z-index:var(--ba-z-base);"></div>
      ${items}
    </div>
  </div>
  <style>
    .ba-process__heading { font-size: 36px; }
    .ba-process__badge { font-size: 13px; }
    .ba-process__title { font-size: 20px; }
    .ba-process__desc { font-size: 15px; }
    @media screen and (max-width: 960px) {
      .ba-process__heading { font-size: 32px; }
      .ba-process__title { font-size: 18px; }
      .ba-process__row { flex-wrap: wrap !important; gap: 40px 32px !important; }
      .ba-process__step { flex: 0 0 calc(50% - 16px) !important; }
      .ba-process__line { display: none !important; }
    }
    @media screen and (max-width: 640px) {
      #ba-process-steps { padding: 48px 0 !important; }
      .ba-process__heading { font-size: 28px; margin-bottom: 32px !important; }
      .ba-process__title { font-size: 18px; }
      .ba-process__desc { font-size: 14px; }
      .ba-process__row { flex-direction: column !important; align-items: center !important; gap: 32px !important; }
      .ba-process__step { flex: none !important; width: 100% !important; max-width: 320px !important; }
    }
  </style>
</div>`;
}
