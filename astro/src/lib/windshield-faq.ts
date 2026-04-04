/**
 * Utilities for windshield-repair FAQ page transformations.
 * - Remove Tilda FAQPage JSON-LD (replaced by service-faqs.ts schema)
 * - Remove specific accordion items by question text
 * - Generate grinding FAQ items (Tilda t585 accordion format)
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

/* Tilda t585 accordion SVG icons (plus sign) */
const PLUS_SVG = '<svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(1.000000, 1.000000)" stroke="#000000"><path d="M0,11 L22,11"></path><path d="M11,0 L11,22"></path></g></g></svg>';

const PLUS_SVG_HOVER = '<svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"><g transform="translate(1.000000, 1.000000)" stroke="#222222"><path d="M0,11 L22,11"></path><path d="M11,0 L11,22"></path></g></g></svg>';

function renderTildaAccordionItem(
  item: GrindingFaqItem,
  lang: string,
  recId: string,
  index: number,
): string {
  const question = item.question[lang] ?? item.question['en'];
  const answer = item.answer[lang] ?? item.answer['en'];
  const accordionId = `grinding${index}_${recId}`;
  const fieldSuffix = `grinding_${recId}_${index}`;

  return (
    '<div class="t-col t-col_8 t-prefix_2">' +
    '<div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false">' +
    '<div class="t585__wrapper">' +
    '<div class="t585__header " style="border-top: 1px solid #eee;">' +
    `<button type="button" class="t585__trigger-button" aria-controls="${accordionId}" aria-expanded="false">` +
    `<span class="t585__title t-name t-name_xl" field="li_title__faq_${fieldSuffix}"><strong>${question}</strong></span>` +
    `<span class="t585__icon"><span class="t585__lines">${PLUS_SVG}</span>` +
    '<span class="t585__circle" style="background-color: #e4c97e"></span></span>' +
    `<span class="t585__icon t585__icon-hover"><span class="t585__lines">${PLUS_SVG_HOVER}</span>` +
    '<span class="t585__circle" style="background-color: #eee;"></span></span>' +
    '</button></div>' +
    `<div class="t585__content" id="${accordionId}" hidden>` +
    '<div class="t585__textwrapper">' +
    `<div class="t585__text t-descr t-descr_xs" field="li_descr__faq_${fieldSuffix}">${answer}</div>` +
    '</div></div></div></div></div>'
  );
}

/**
 * Generates grinding FAQ items in Tilda t585 accordion format.
 * These are prepended to the existing FAQ accordion on the windshield-repair page.
 */
export function generateGrindingAccordionItems(lang: string, recId: string): string {
  return GRINDING_FAQ_ITEMS.map((item, i) =>
    renderTildaAccordionItem(item, lang, recId, i + 1),
  ).join('');
}

/**
 * Injects accordion items at the TOP of a Tilda t585 FAQ block.
 * Finds the first `<div class="t-col t-col_8 t-prefix_2">` inside
 * the rec block identified by recId and prepends the items before it.
 */
export function injectAtTopOfFaqAccordion(
  html: string,
  recId: string,
  items: string,
): string {
  const marker = `id="${recId}"`;
  const startIdx = html.indexOf(marker);
  if (startIdx < 0) return html;

  const tColMarker = '<div class="t-col t-col_8 t-prefix_2">';
  const firstTCol = html.indexOf(tColMarker, startIdx);
  if (firstTCol < 0) return html;

  return html.slice(0, firstTCol) + items + html.slice(firstTCol);
}
