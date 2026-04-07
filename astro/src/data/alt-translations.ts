/**
 * Alt-text translations for images exported from Tilda.
 *
 * Tilda exports gallery/service images with Russian alt texts on ALL
 * language variants. This map provides EN and KA translations so the
 * build pipeline can replace them on non-RU pages.
 *
 * Key = exact Russian alt text from Tilda export.
 * Value = { en, ka } translations.
 */

interface AltTranslation {
  readonly en: string;
  readonly ka: string;
}

export const ALT_TRANSLATIONS: Readonly<Record<string, AltTranslation>> = {
  // ── Studio gallery (rec2072063053) ──
  'Зона ожидания в студии BESTAUTO с массажными креслами': {
    en: 'BESTAUTO studio waiting area with massage chairs',
    ka: 'BESTAUTO სტუდიის მოლოდინის ზონა მასაჟური სავარძლებით',
  },
  'Администрация студии БЕСТАВТО в Тбилиси': {
    en: 'BESTAUTO studio reception in Tbilisi',
    ka: 'BESTAUTO სტუდიის ადმინისტრაცია თბილისში',
  },
  'Tesla Model S в студии BESTAUTO': {
    en: 'Tesla Model S at BESTAUTO studio',
    ka: 'Tesla Model S BESTAUTO სტუდიაში',
  },
  'Гостевая зона студии BESTAUTO с телевизором': {
    en: 'BESTAUTO studio lounge with TV',
    ka: 'BESTAUTO სტუდიის სტუმრების ზონა ტელევიზორით',
  },
  'Детейлинг шин в BESTAUTO': {
    en: 'Tire detailing at BESTAUTO',
    ka: 'საბურავის დეთეილინგი BESTAUTO-ში',
  },
  'Детейлинг мойка автомобиля в BESTAUTO': {
    en: 'Car detailing wash at BESTAUTO',
    ka: 'ავტომობილის დეთეილინგ რეცხვა BESTAUTO-ში',
  },
  'Черный Porsche Taycan в детейлинге BESTAUTO': {
    en: 'Black Porsche Taycan at BESTAUTO detailing',
    ka: 'შავი Porsche Taycan BESTAUTO დეთეილინგში',
  },
  'Красный Феррари в студии BESTAUTO': {
    en: 'Red Ferrari at BESTAUTO studio',
    ka: 'წითელი Ferrari BESTAUTO სტუდიაში',
  },
  'Интерьер студии BESTAUTO с автомобилем': {
    en: 'BESTAUTO studio interior with a car',
    ka: 'BESTAUTO სტუდიის ინტერიერი ავტომობილით',
  },
  'Студия BESTAUTO — результат оклейки автомобиля в защитную пленку': {
    en: 'BESTAUTO studio — PPF wrap result',
    ka: 'BESTAUTO სტუდია — დამცავი ფირით გაკვრის შედეგი',
  },

  // ── Service hero/preview images ──
  'BESTAUTO — Детейлинг в Тбилиси': {
    en: 'BESTAUTO — Detailing in Tbilisi',
    ka: 'BESTAUTO — დეთეილინგი თბილისში',
  },
  'Защитная плёнка PPF — BESTAUTO': {
    en: 'PPF paint protection film — BESTAUTO',
    ka: 'დამცავი ფირი PPF — BESTAUTO',
  },
  'Защитная плёнка PPF': {
    en: 'PPF paint protection film',
    ka: 'დამცავი ფირი PPF',
  },
  'Оклейка кузова плёнкой PPF (пулиоретан) в тбилиси': {
    en: 'PPF (polyurethane) body wrap in Tbilisi',
    ka: 'კორპუსის PPF (პოლიურეთანი) გაკვრა თბილისში',
  },
  'Оклейка кузова плёнкой PPF (пулиоретан)': {
    en: 'PPF (polyurethane) body wrap',
    ka: 'კორპუსის PPF (პოლიურეთანი) გაკვრა',
  },
  'Оклейка кузова виниловой плёнкой в тбилиси': {
    en: 'Vinyl body wrap in Tbilisi',
    ka: 'კორპუსის ვინილის ფირით გაკვრა თბილისში',
  },
  'Оклейка кузова виниловой плёнкой': {
    en: 'Vinyl body wrap',
    ka: 'კორპუსის ვინილის ფირით გაკვრა',
  },
  'Оклейка цветной плёнкой': {
    en: 'Color change wrap',
    ka: 'ფერის შეცვლა ფირით',
  },
  'Смена цвета защитной плёнкой — BESTAUTO': {
    en: 'Color change wrap — BESTAUTO',
    ka: 'ფერის შეცვლა დამცავი ფირით — BESTAUTO',
  },
  'Тонировка стёкол — BESTAUTO': {
    en: 'Window tinting — BESTAUTO',
    ka: 'მინების დაბურვა — BESTAUTO',
  },
  'Тонировка стёкол': {
    en: 'Window tinting',
    ka: 'მინების დაბურვა',
  },
  'Тонировка стекол автомобиля в тбилиси': {
    en: 'Car window tinting in Tbilisi',
    ka: 'ავტომობილის მინების დაბურვა თბილისში',
  },
  'Полировка автомобиля — BESTAUTO': {
    en: 'Car polishing — BESTAUTO',
    ka: 'მანქანის პოლირება — BESTAUTO',
  },
  'Полировка автомобиля': {
    en: 'Car polishing',
    ka: 'მანქანის პოლირება',
  },
  'Полировка автомобиля в тбилиси': {
    en: 'Car polishing in Tbilisi',
    ka: 'მანქანის პოლირება თბილისში',
  },
  'Полировка кузова автомобиля в тбилиси': {
    en: 'Car body polishing in Tbilisi',
    ka: 'ავტომობილის კორპუსის პოლირება თბილისში',
  },
  'Полировка фар автомобиля в тбилиси': {
    en: 'Car headlight polishing in Tbilisi',
    ka: 'ავტომობილის ფარების პოლირება თბილისში',
  },
  'Полировка элементов салона автомобиля в тбилиси': {
    en: 'Car interior element polishing in Tbilisi',
    ka: 'ავტომობილის სალონის ელემენტების პოლირება თბილისში',
  },
  'Полировка элементов салона автомобиля': {
    en: 'Car interior element polishing',
    ka: 'ავტომობილის სალონის ელემენტების პოლირება',
  },
  'Полировка автостекол в тбилиси': {
    en: 'Auto glass polishing in Tbilisi',
    ka: 'ავტომინების პოლირება თბილისში',
  },
  'Детейлинг полировка автомобиля в BESTAUTO': {
    en: 'Detailing car polishing at BESTAUTO',
    ka: 'ავტომობილის დეთეილინგ პოლირება BESTAUTO-ში',
  },
  'Керамическое покрытие — BESTAUTO': {
    en: 'Ceramic coating — BESTAUTO',
    ka: 'კერამიკული საფარი — BESTAUTO',
  },
  'Керамическое покрытие': {
    en: 'Ceramic coating',
    ka: 'კერამიკული საფარი',
  },
  'Керамическое покрытие в тбилиси': {
    en: 'Ceramic coating in Tbilisi',
    ka: 'კერამიკული საფარი თბილისში',
  },
  'Керамическое покрытие кузова': {
    en: 'Body ceramic coating',
    ka: 'კორპუსის კერამიკული საფარი',
  },
  'Керамическое покрытие стекол автомобиля': {
    en: 'Auto glass ceramic coating',
    ka: 'ავტომობილის მინების კერამიკული საფარი',
  },
  'Покрытие салона автомобиля керамикой': {
    en: 'Car interior ceramic coating',
    ka: 'ავტომობილის სალონის კერამიკული საფარი',
  },
  'Детейлинг мойка — BESTAUTO': {
    en: 'Detailing car wash — BESTAUTO',
    ka: 'დეთეილინგ რეცხვა — BESTAUTO',
  },
  'Детейлинг мойка': {
    en: 'Detailing car wash',
    ka: 'დეთეილინგ რეცხვა',
  },
  'Химчистка салона — BESTAUTO': {
    en: 'Interior dry cleaning — BESTAUTO',
    ka: 'სალონის ქიმწმენდა — BESTAUTO',
  },
  'Химчистка салона': {
    en: 'Interior dry cleaning',
    ka: 'სალონის ქიმწმენდა',
  },
  'Детейлинг химчистка салона в тбилиси': {
    en: 'Car interior dry cleaning in Tbilisi',
    ka: 'სალონის დეთეილინგ ქიმწმენდა თბილისში',
  },
  'Детейлинг химчистка салона': {
    en: 'Car interior dry cleaning',
    ka: 'სალონის დეთეილინგ ქიმწმენდა',
  },
  'Шумоизоляция — BESTAUTO': {
    en: 'Soundproofing — BESTAUTO',
    ka: 'ხმაიზოლაცია — BESTAUTO',
  },
  'Шумоизоляция': {
    en: 'Soundproofing',
    ka: 'ხმაიზოლაცია',
  },
  'Шумоизоляция автомобиля в тбилиси': {
    en: 'Car soundproofing in Tbilisi',
    ka: 'ავტომობილის ხმაიზოლაცია თბილისში',
  },
  'Ремонт автостекол — BESTAUTO': {
    en: 'Windshield repair — BESTAUTO',
    ka: 'ავტომინების შეკეთება — BESTAUTO',
  },
  'Ремонт и шлифовка автостекол': {
    en: 'Windshield repair and polishing',
    ka: 'ავტომინების შეკეთება და შლიფოვკა',
  },
  'Ремонт сколов на лобовом стекле в тбилиси': {
    en: 'Windshield chip repair in Tbilisi',
    ka: 'საქარე მინის ჩიპების შეკეთება თბილისში',
  },
  'Ремонт сколов на лобовом стекле': {
    en: 'Windshield chip repair',
    ka: 'საქარე მინის ჩიპების შეკეთება',
  },
  'Компьютерная диагностика — BESTAUTO': {
    en: 'Computer diagnostics — BESTAUTO',
    ka: 'კომპიუტერული დიაგნოსტიკა — BESTAUTO',
  },
  'Беспокрасочное удаление вмятин (PDR)': {
    en: 'Paintless dent removal (PDR)',
    ka: 'უღებავი ჩაზნექილობის აღმოფხვრა (PDR)',
  },
  'Реставрация салона автомобиля': {
    en: 'Car interior restoration',
    ka: 'ავტომობილის სალონის რესტავრაცია',
  },
  'Реставрация сиденья автомобиля ': {
    en: 'Car seat restoration',
    ka: 'ავტომობილის სავარძლის რესტავრაცია',
  },
  'Реставрация подлокотника': {
    en: 'Armrest restoration',
    ka: 'სახელურის რესტავრაცია',
  },
  'Ремонт пластиковых элементов салона автомобиля': {
    en: 'Car interior plastic element repair',
    ka: 'ავტომობილის სალონის პლასტმასის ელემენტების შეკეთება',
  },
  'Перетяжка руля в тбилиси': {
    en: 'Steering wheel re-upholstery in Tbilisi',
    ka: 'საჭის გადაკვრა თბილისში',
  },
};
