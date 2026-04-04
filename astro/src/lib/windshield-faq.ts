/**
 * Utilities for windshield-repair FAQ page transformations.
 * - Remove Tilda FAQPage JSON-LD (replaced by service-faqs.ts schema)
 * - Remove specific accordion items by question text
 * - Generate grinding FAQ section (ba-faq style)
 */

/**
 * Removes the Tilda-embedded FAQPage JSON-LD script tag.
 * service-faqs.ts + seo.ts generate the canonical schema instead.
 */
export function removeTildaFaqSchema(html: string): string {
  const marker = '"@type":"FAQPage"';
  const markerAlt = '"@type": "FAQPage"';
  const searchText = html.includes(marker) ? marker : markerAlt;

  const typeIdx = html.indexOf(searchText);
  if (typeIdx < 0) return html;

  // Walk backward to find <script
  const scriptOpen = html.lastIndexOf('<script', typeIdx);
  if (scriptOpen < 0) return html;

  // Walk forward to find </script>
  const scriptClose = html.indexOf('</script>', typeIdx);
  if (scriptClose < 0) return html;

  return html.slice(0, scriptOpen) + html.slice(scriptClose + 9);
}

/**
 * Removes a Tilda t585 accordion item by its question text.
 * Finds the question text, walks back to the parent
 * `<div class="t-col t-col_8 t-prefix_2">`, counts div depth,
 * and removes the entire block.
 */
export function removeAccordionByQuestion(html: string, questionText: string): string {
  const qIdx = html.indexOf(questionText);
  if (qIdx < 0) return html;

  // Walk backward to find the parent t-col div
  const tColMarker = '<div class="t-col t-col_8 t-prefix_2">';
  const before = html.slice(0, qIdx);
  const tColStart = before.lastIndexOf(tColMarker);
  if (tColStart < 0) return html;

  // Count div depth from tColStart to find the matching end
  let depth = 0;
  let pos = tColStart;
  while (pos < html.length) {
    if (html.startsWith('<div', pos)) {
      depth++;
      pos += 4;
    } else if (html.startsWith('</div>', pos)) {
      depth--;
      if (depth === 0) {
        return html.slice(0, tColStart) + html.slice(pos + 6);
      }
      pos += 6;
    } else {
      pos++;
    }
  }

  return html;
}

interface GrindingFaqItem {
  readonly question: Readonly<Record<string, string>>;
  readonly answer: Readonly<Record<string, string>>;
}

const GRINDING_FAQ_ITEMS: ReadonlyArray<GrindingFaqItem> = [
  {
    question: {
      ka: 'სიმართლეა, რომ ავტომინის შლიფოვკა შეუძლებელია?',
      ru: 'Правда ли, что автостекло нельзя шлифовать?',
      en: 'Is it true that car glass cannot be ground?',
    },
    answer: {
      ka: 'არა, ეს მითია. პროფესიონალური შლიფოვკა სპეციალური აბრაზიული დისკებით და პოლირების პასტებით უსაფრთხოდ აშორებს ნაკაწრებს მინის სტრუქტურის დარღვევის გარეშე. მნიშვნელოვანია სწორი აღჭურვილობა და გამოცდილება \u2014 სწორედ ამიტომ ეს სამუშაო უნდა ენდოთ პროფესიონალებს, და არა გააკეთოთ სახლის პირობებში.',
      ru: 'Нет, это миф. Профессиональная шлифовка специальными абразивными дисками и полировальными пастами безопасно удаляет царапины без нарушения структуры стекла. Важны правильное оборудование и опыт \u2014 именно поэтому эту работу стоит доверить профессионалам, а не делать в домашних условиях.',
      en: 'No, this is a myth. Professional grinding with specialized abrasive discs and polishing compounds safely removes scratches without compromising the glass structure. Proper equipment and experience are key \u2014 that\u2019s why this work should be done by professionals, not at home.',
    },
  },
  {
    question: {
      ka: 'რა დეფექტებს აშორებს მინის შლიფოვკა?',
      ru: 'Какие дефекты убирает шлифовка стекла?',
      en: 'What defects does glass grinding remove?',
    },
    answer: {
      ka: 'შლიფოვკა აშორებს: ქვიშის კვალს (ავტობანის ეფექტი), საწმენდი ფუნჯების დატოვებულ ნაკაწრებს, ღრმა ნაკაწრებს ვანდალიზმიდან ან შემთხვევითი დაზიანებიდან, მოღრუბლულობას და მინის გაუმჭვირვალობას. შედეგად მინა აღიდგენს გამჭვირვალობას და მძღოლის ხილვადობა მნიშვნელოვნად უმჯობესდება.',
      ru: 'Шлифовка убирает: следы от песка (эффект пескоструя на трассе), затёртости от щёток стеклоочистителя, глубокие царапины от вандализма или случайных повреждений, помутнение и потерю прозрачности стекла. В результате стекло восстанавливает прозрачность, а видимость для водителя значительно улучшается.',
      en: 'Grinding removes: sand marks (sandblasting effect from highway driving), wiper blade scratches, deep scratches from vandalism or accidental damage, cloudiness and loss of glass transparency. As a result, the glass regains clarity and driver visibility improves significantly.',
    },
  },
];

function renderGrindingFaqItem(item: GrindingFaqItem, lang: string): string {
  const question = item.question[lang] ?? item.question['en'];
  const answer = item.answer[lang] ?? item.answer['en'];

  return `<details class="ba-faq__item" style="border-bottom:1px solid var(--ba-color-border);">
        <summary class="ba-faq__question" style="display:flex;align-items:center;justify-content:space-between;padding:20px 0;cursor:pointer;list-style:none;font-family:var(--ba-font-family);font-weight:var(--ba-font-weight-semibold);color:var(--ba-color-text);line-height:1.4;gap:16px;">
          <span>${question}</span>
          <svg class="ba-faq__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" style="flex-shrink:0;transition:transform 0.25s ease;"><path d="M5 7.5L10 12.5L15 7.5" style="stroke:var(--ba-color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </summary>
        <div class="ba-faq__answer" style="padding:0 0 20px;font-family:var(--ba-font-family);color:var(--ba-color-text-muted);line-height:1.6;">${answer}</div>
      </details>`;
}

const GRINDING_SECTION_TITLE: Readonly<Record<string, string>> = {
  ka: 'მინის შლიფოვკა: მითები და რეალობა',
  ru: 'Шлифовка стекла: мифы и реальность',
  en: 'Glass Grinding: Myths vs Reality',
};

/**
 * Generates a ba-faq section with grinding-specific FAQ items.
 * Injected after the Tilda FAQ t585 block on the windshield-repair page.
 */
export function generateGrindingFaqHtml(lang: string): string {
  const title = GRINDING_SECTION_TITLE[lang] ?? GRINDING_SECTION_TITLE['en'];
  const items = GRINDING_FAQ_ITEMS.map((item) => renderGrindingFaqItem(item, lang)).join('\n      ');

  return `<div id="ba-grinding-faq" style="background:#000000;padding:0 0 80px;">
  <div style="max-width:800px;margin:0 auto;padding:0 24px;">
    <h3 class="ba-grinding-faq__heading" style="color:var(--ba-color-accent);font-weight:var(--ba-font-weight-bold);text-align:center;margin:0 0 48px;font-family:var(--ba-font-family);">${title}</h3>
    <div>
      ${items}
    </div>
  </div>
  <style>
    .ba-grinding-faq__heading { font-size: 28px; }
    #ba-grinding-faq .ba-faq__question { font-size: 18px; }
    #ba-grinding-faq .ba-faq__answer { font-size: 16px; }
    #ba-grinding-faq .ba-faq__item summary::-webkit-details-marker { display: none; }
    #ba-grinding-faq .ba-faq__item[open] .ba-faq__chevron { transform: rotate(180deg); }
    #ba-grinding-faq .ba-faq__item summary:hover { color: var(--ba-color-accent) !important; }
    @media screen and (max-width: 960px) {
      .ba-grinding-faq__heading { font-size: 24px; }
      #ba-grinding-faq .ba-faq__question { font-size: 17px; }
      #ba-grinding-faq .ba-faq__answer { font-size: 15px; }
    }
    @media screen and (max-width: 640px) {
      #ba-grinding-faq { padding: 0 0 48px !important; }
      .ba-grinding-faq__heading { font-size: 22px; margin-bottom: 32px !important; }
      #ba-grinding-faq .ba-faq__question { font-size: 16px; padding: 16px 0 !important; }
      #ba-grinding-faq .ba-faq__answer { font-size: 15px; }
    }
  </style>
</div>`;
}

/**
 * Injects HTML content after a Tilda rec block (identified by its ID).
 * Finds the block's closing </div> and appends the content after it.
 */
export function injectAfterRecBlock(html: string, recId: string, content: string): string {
  const marker = `id="${recId}"`;
  const startIdx = html.indexOf(marker);
  if (startIdx < 0) return html;

  const divStart = html.lastIndexOf('<div', startIdx);
  if (divStart < 0) return html;

  // Count div depth to find the block's closing </div>
  let depth = 0;
  let pos = divStart;
  while (pos < html.length) {
    if (html.startsWith('<div', pos)) {
      depth++;
      pos += 4;
    } else if (html.startsWith('</div>', pos)) {
      depth--;
      if (depth === 0) {
        const blockEnd = pos + 6;
        return html.slice(0, blockEnd) + content + html.slice(blockEnd);
      }
      pos += 6;
    } else {
      pos++;
    }
  }

  return html;
}
