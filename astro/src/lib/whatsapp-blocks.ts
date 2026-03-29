/**
 * Extracts WhatsApp widget blocks from the main pages of each language
 * and the contacts block from the RU page. These blocks are injected
 * into all other pages of the corresponding language at build time.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { makePathsAbsolute } from './html-extractor';

function extractRecordBlock(html: string, recId: string): string {
  const startMarker = `id="${recId}"`;
  const startIdx = html.indexOf(startMarker);
  if (startIdx < 0) return '';
  const divStart = html.lastIndexOf('<div', startIdx);
  let depth = 0;
  let pos = divStart;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos + 1);
    const nextClose = html.indexOf('</div>', pos + 1);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) return html.slice(divStart, nextClose + 6);
      depth--;
      pos = nextClose;
    }
  }
  return '';
}

function loadTildaPage(filename: string): string {
  return readFileSync(
    join(process.cwd(), `../tilda-export/project6825691/${filename}`),
    'utf8'
  );
}

// RU: WhatsApp widget + contacts block
const ruHtml = loadTildaPage('page36438811.html');
export const WHATSAPP_BLOCK = makePathsAbsolute(
  extractRecordBlock(ruHtml, 'rec2090615423')
);
export const CONTACTS_BLOCK = makePathsAbsolute(
  extractRecordBlock(ruHtml, 'rec2091246563')
);

// KA: WhatsApp widget
const kaHtml = loadTildaPage('page130343853.html');
export const WHATSAPP_BLOCK_KA = makePathsAbsolute(
  extractRecordBlock(kaHtml, 'rec2091645783')
);

// EN: WhatsApp widget
const enHtml = loadTildaPage('page36554132.html');
export const WHATSAPP_BLOCK_EN = makePathsAbsolute(
  extractRecordBlock(enHtml, 'rec2090620713')
);

// Translated contacts blocks for KA and EN
type TranslationMap = ReadonlyArray<readonly [string, string]>;

const EN_TRANSLATIONS: TranslationMap = [
  ['Выберите <span class="gold">ближайшую</span> студию', 'Choose the <span class="gold">nearest</span> studio'],
  ['Выберите <span class=\\"gold\\">ближайшую</span> студию', 'Choose the <span class=\\"gold\\">nearest</span> studio'],
  ['BESTAUTO Гурамишвили', 'BESTAUTO Guramishvili'],
  ['BESTAUTO Сабуртало', 'BESTAUTO Saburtalo'],
  ['Тбилиси, ул. Гурамишвили 78', 'Tbilisi, Guramishvili Ave. 78'],
  ['Тбилиси, ул. Анна Политковская 51', 'Tbilisi, Anna Politkovskaya St. 51'],
  ['Пн–Сб 10:00 – 20:00', 'Mon–Sat 10:00 – 20:00'],
  ['На карте', 'On map'],
  ['Записаться в эту студию', 'BOOK NOW'],
  ['Услуга *', 'Service *'],
  ['— Выберите услугу —', '— Select a service —'],
  ['Ваш телефон *', 'Your phone *'],
  ['Модель авто', 'Car model'],
  ['Оклейка защитной пленкой', 'Paint protection film'],
  ['Смена цвета защитной пленкой', 'Color change wrap'],
  ['Детейлинг полировка', 'Detailing polish'],
  ['Керамическое покрытие авто', 'Ceramic coating'],
  ['Тонировка стекол', 'Window tinting'],
  ['Детейлинг химчистка', 'Detailing dry cleaning'],
  ['Реставрация автостекла', 'Windshield repair'],
  ['Шумоизоляция', 'Sound insulation'],
  ['Введите номер в международном формате: +995 5XX XXX XXX', 'Enter phone in international format: +995 5XX XXX XXX'],
  ['Отправить заявку в WhatsApp', 'Send request via WhatsApp'],
  ["Здравствуйте! Хочу записаться в студию", "Hello! I'd like to book at studio"],
  ['Услуга: ', 'Service: '],
  ['Мой телефон: ', 'My phone: '],
  ['Автомобиль: ', 'Car: '],
  ['Гурамишвили, ул. Гурамишвили 78', 'Guramishvili, Guramishvili Ave. 78'],
  ['Сабуртало, ул. Анна Политковская 51', 'Saburtalo, Anna Politkovskaya St. 51'],
];

const KA_TRANSLATIONS: TranslationMap = [
  ['Выберите <span class="gold">ближайшую</span> студию', 'აირჩიეთ <span class="gold">უახლოესი</span> სტუდია'],
  ['Выберите <span class=\\"gold\\">ближайшую</span> студию', 'აირჩიეთ <span class=\\"gold\\">უახლოესი</span> სტუდია'],
  ['BESTAUTO Гурамишвили', 'BESTAUTO გურამიშვილი'],
  ['BESTAUTO Сабуртало', 'BESTAUTO საბურთალო'],
  ['Тбилиси, ул. Гурамишвили 78', 'თბილისი, გურამიშვილის გამზ. 78'],
  ['Тбилиси, ул. Анна Политковская 51', 'თბილისი, ანა პოლიტკოვსკაიას ქ. 51'],
  ['Пн–Сб 10:00 – 20:00', 'ორშ–შაბ 10:00 – 20:00'],
  ['На карте', 'რუკაზე'],
  ['Записаться в эту студию', 'ჩაეწერეთ ამ სტუდიაში'],
  ['Услуга *', 'სერვისი *'],
  ['— Выберите услугу —', '— აირჩიეთ სერვისი —'],
  ['Ваш телефон *', 'თქვენი ტელეფონი *'],
  ['Модель авто', 'ავტომობილის მოდელი'],
  ['Оклейка защитной пленкой', 'დამცავი ფირით დაფარვა'],
  ['Смена цвета защитной пленкой', 'ფერის შეცვლა დამცავი ფირით'],
  ['Детейлинг полировка', 'დეტეილინგ პოლირება'],
  ['Керамическое покрытие авто', 'კერამიკული დაფარვა'],
  ['Тонировка стекол', 'მინების ტონირება'],
  ['Детейлинг химчистка', 'დეტეილინგ ქიმწმენდა'],
  ['Реставрация автостекла', 'ავტომინის რესტავრაცია'],
  ['Шумоизоляция', 'ხმაურის იზოლაცია'],
  ['Введите номер в международном формате: +995 5XX XXX XXX', 'შეიყვანეთ ნომერი საერთაშორისო ფორმატში: +995 5XX XXX XXX'],
  ['Отправить заявку в WhatsApp', 'გაგზავნეთ განაცხადი WhatsApp-ით'],
  ["Здравствуйте! Хочу записаться в студию", "გამარჯობა! მინდა ჩავეწერო სტუდიაში"],
  ['Услуга: ', 'სერვისი: '],
  ['Мой телефон: ', 'ჩემი ტელეფონი: '],
  ['Автомобиль: ', 'ავტომობილი: '],
  ['Гурамишвили, ул. Гурамишвили 78', 'გურამიშვილი, გურამიშვილის გამზ. 78'],
  ['Сабуртало, ул. Анна Политковская 51', 'საბურთალო, ანა პოლიტკოვსკაიას ქ. 51'],
];

function translateBlock(html: string, translations: TranslationMap): string {
  let result = html;
  for (const [from, to] of translations) {
    result = result.replaceAll(from, to);
  }
  return result;
}

export const CONTACTS_BLOCK_EN = translateBlock(CONTACTS_BLOCK, EN_TRANSLATIONS);
export const CONTACTS_BLOCK_KA = translateBlock(CONTACTS_BLOCK, KA_TRANSLATIONS);
