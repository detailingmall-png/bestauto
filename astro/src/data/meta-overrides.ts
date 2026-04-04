/**
 * Build-time meta tag overrides for pages where Tilda exports
 * have suboptimal titles, descriptions, or OG tags.
 *
 * Key format: "lang/slug" (e.g. "ru/" for RU homepage, "ka/vinyl-wrapping").
 * Only specified fields are overridden; omitted fields keep the Tilda original.
 */

interface MetaOverride {
  readonly title?: string;
  readonly description?: string;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
}

export const META_OVERRIDES: Readonly<Record<string, MetaOverride>> = {
  // ── Homepage ──────────────────────────────────────────────
  'ru/': {
    // 75 chars → 58 chars (avoids SERP truncation)
    title: 'Детейлинг в Тбилиси — полировка, керамика, PPF | BESTAUTO',
  },
  'en/': {
    // Add CTA to description (was missing "Book online")
    description: 'Professional car detailing in Tbilisi: PPF film, ceramic coating, polishing, vinyl wrap, tinting, interior cleaning. Two locations. Book online!',
  },

  // ── Vinyl Wrapping (KA title has <s> tag residue after sanitize) ──
  'ka/vinyl-wrapping': {
    title: 'ფერადი დამცავი ფირი თბილისში — ყველა ფერი | BESTAUTO',
    description: 'ავტომობილის ფერადი პოლიურეთანის დამცავი ფირი თბილისში: სრული და ნაწილობრივი. 3M, KPMF, Oracal. BESTAUTO — პროფ. სტუდია.',
    ogTitle: 'ფერადი დამცავი ფირი თბილისში — ყველა ფერი | BESTAUTO',
  },
  'ru/vinyl-wrapping': {
    description: 'Цветная полиуретановая защитная плёнка в Тбилиси: смена цвета, карбон, матовая и глянцевая плёнка. Полная и частичная оклейка. Гарантия 10 лет. Запись онлайн!',
  },
  'en/vinyl-wrapping': {
    title: 'Color Change Wrap in Tbilisi — Protective Film, 200+ Colors | BESTAUTO',
    description: 'Change your car color with polyurethane protective film in Tbilisi. Gloss, matte, satin, carbon, chrome. Full and partial wrap. 10-year warranty. Book online!',
  },

  // ── OG tag alignment ─────────────────────────────────────
  'ru/ceramiccoating': {
    ogDescription: 'Керамическое покрытие автомобиля в Тбилиси. Защита кузова от царапин и реагентов. Гарантия 5 лет. BESTAUTO — две студии, запись онлайн.',
  },
  'ru/polishing': {
    ogDescription: 'Профессиональная полировка автомобиля в Тбилиси. Удаление царапин, восстановление блеска. Запись онлайн — BESTAUTO.',
  },

  // ── Short descriptions (<120 chars) — expand to 120-160 ───


  'ka/polishing': {
    // 103 chars → 147 chars
    description: 'პროფესიონალური მანქანის პოლირება თბილისში. ნაკაწრების მოცილება, ლაქის აღდგენა, სარკისებრი ბზინვარება. ფასები 590 ლარიდან. ჩაწერა ახლავე — BESTAUTO.',
  },
  'ka/interior-cleaning': {
    // 101 chars → 144 chars
    description: 'ავტომობილის სალონის პროფესიონალური ქიმწმენდა თბილისში. ლაქების, სუნის და ბაქტერიების მოცილება. ტყავის დამუშავება. ფასები 400 ლარიდან — BESTAUTO.',
  },
  'ka/carwash': {
    // 103 chars → 148 chars
    description: 'პრემიუმ ხელით რეცხვა თბილისში. 2-3 ფაზიანი დეტეილინგ რეცხვა, სალონის დამუშავება, დამცავი საფარის გადატანა. ორი ფილიალი. ჩაწერა ონლაინ — BESTAUTO.',
  },

  // ── Windshield Repair (expanded: + polishing & grinding) ────
  'ru/windshield-repair': {
    title: 'Ремонт сколов и трещин автостекол, полировка и шлифовка в Тбилиси | BESTAUTO',
    description: 'Ремонт сколов и трещин, полировка помутневших и шлифовка поцарапанных автостекол в Тбилиси. Лобовое и боковые стёкла. Цены от 60 лари. Гарантия. Запись онлайн — BESTAUTO.',
  },
  'ka/windshield-repair': {
    title: 'ავტომინების შეკეთება, პოლირება და შლიფოვკა თბილისში | BESTAUTO',
    description: 'საქარე და გვერდითი მინების ნაკენჭარის შეკეთება, პოლირება და შლიფოვკა თბილისში. ფასები 60 ლარიდან. გარანტია. ჩაწერა ონლაინ — BESTAUTO.',
  },
  'en/windshield-repair': {
    title: 'Windshield Chip & Crack Repair, Glass Polishing & Grinding in Tbilisi | BESTAUTO',
    description: 'Windshield and side window chip repair, glass polishing and scratch grinding in Tbilisi. Prices from 60 GEL. Warranty included. Book online — BESTAUTO.',
  },

  // ── PPF Shield Wrapping ─────────────────────────────────────
  'ka/ppf-shield-wrapping': {
    title: 'PPF დამცავი ფირი თბილისში — 10 წლიანი გარანტია, ფასები 2500 ლარიდან | BESTAUTO',
    description: 'სრული და ნაწილობრივი PPF დამცავი ფირით დაფარვა თბილისში. LLumar, Quantum, SunTek. კაპოტი, ბამპერი, ფარები. ორი სტუდია. უფასო ინსპექცია — ჩაეწერეთ ახლავე.',
  },
  'ru/ppf-shield-wrapping': {
    title: 'Защитная плёнка PPF в Тбилиси — гарантия 10 лет, цены от 2500 GEL | BESTAUTO',
    description: 'Полная и частичная оклейка кузова защитной плёнкой PPF в Тбилиси. LLumar, Quantum, SunTek. Капот, бампер, фары. 2 студии, бесплатный осмотр. Запись онлайн!',
  },
  'en/ppf-shield-wrapping': {
    title: 'PPF Paint Protection Film in Tbilisi — 10-Year Warranty, from 2500 GEL | BESTAUTO',
    description: 'Full and partial PPF wrap in Tbilisi: hood, bumper, headlights. LLumar, Quantum, SunTek films. Two studios, free inspection. Book online — BESTAUTO.',
  },

  // ── Ceramic Coating ─────────────────────────────────────────
  'ka/ceramiccoating': {
    title: 'კერამიკული დაფარვა თბილისში — 9H, 3 წლამდე დაცვა, ფ���სები 400 ლარიდან | BESTAUTO',
    description: 'ავტომობილის კერამიკული დაფარვა თბილისში: კუზოვი, მინები, სალონი. ჰიდროფობული ეფექტი, UV-დაცვა. ფასები 400 ლარიდან. ჩაწერა ონლაინ — BESTAUTO.',
  },
  'en/ceramiccoating': {
    title: 'Ceramic Coating in Tbilisi — 9H, Up to 3 Years Protection, from 400 GEL | BESTAUTO',
    description: 'Professional ceramic coating for car body, glass, and interior in Tbilisi. Hydrophobic protection from scratches and UV. Two studios. Book online — BESTAUTO.',
  },

  // ── Window Tinting ──────────────────────────────────────────
  'ka/auto-glass-tinting': {
    title: 'მინების დაბურვა თბილისში — ფასები 130 ლარიდან | BESTAUTO',
    description: 'ავტომობილის მინების პროფესიონალური ტონირება თბილისში. სითბოს და UV-დაცვა, კონფიდენციალურობა. ფასები 130 ლარიდან. ორი სტუდია — ჩაწერა ონლაინ.',
  },
  'ru/auto-glass-tinting': {
    title: 'Тонировка стёкол авто в Тбилиси — цены от 130 GEL | BESTAUTO',
    description: 'Профессиональная тонировка стёкол в Тбилиси. Защита от жары и UV, конфиденциальность. Цены от 130 лари. 2 локации. Запись онлайн — BESTAUTO.',
  },
  'en/auto-glass-tinting': {
    title: 'Car Window Tinting in Tbilisi — Prices from 130 GEL | BESTAUTO',
    description: 'Professional auto window tinting in Tbilisi. Heat and UV protection, privacy. Prices from 130 GEL. Two studios. Book online — BESTAUTO.',
  },

  // ── Car Soundproofing ───────────────────────────────────────
  'ka/car-soundproofing': {
    title: 'ავტომობილის ხმის იზოლაცია თბილისში — ფასები 600 ლარიდან | BESTAUTO',
    description: 'პროფესიონალური ხმის იზოლაცია თბილისში: კარები, იატაკი, სახურავი, საბარგული. ხმაურის შემცირება 40%-მდე. ფასები 600 ლარიდან — BESTAUTO.',
  },
  'ru/car-soundproofing': {
    title: 'Шумоизоляция автомобиля в Тбилиси — цены от 600 GEL | BESTAUTO',
    description: 'Профессиональная шумоизоляция авто в Тбилиси: двери, пол, крыша, багажник. Снижение шума до 40%. Цены от 600 лари. Запись — BESTAUTO.',
  },
  'en/car-soundproofing': {
    title: 'Car Soundproofing in Tbilisi — Prices from 600 GEL | BESTAUTO',
    description: 'Professional car sound insulation in Tbilisi: doors, floor, roof, trunk. Up to 40% noise reduction. Prices from 600 GEL. Book online — BESTAUTO.',
  },

  // ── Computer Diagnostics ────────────────────────────────────
  'ka/computer-diagnostics': {
    title: 'კომპიუტერული დიაგნოსტიკა თბილისში — ECU/ABS, ფასები 30 ლარიდან | BESTAUTO',
    description: 'სრული კომპიუტერული დიაგნოსტიკა 30-90 წუთში. შეცდომების წაკითხვა, ECU, ABS, სენსორები. ფასები 30 ლარიდან. ორი ლოკაცია — BESTAUTO.',
  },
  'ru/computer-diagnostics': {
    title: 'Компьютерная диагностика авто в Тбилиси — цены от 30 GEL | BESTAUTO',
    description: 'Полная компьютерная диагностика за 30-90 минут. Чтение ошибок, ECU, ABS, датчики. Цены от 30 лари. Детальный отчёт. 2 студии — BESTAUTO.',
  },
  'en/computer-diagnostics': {
    title: 'Car Computer Diagnostics in Tbilisi — from 30 GEL | BESTAUTO',
    description: 'Full OBD computer diagnostics in 30-90 minutes. Error codes, ECU, ABS, sensors. Prices from 30 GEL. Detailed report. Two studios — BESTAUTO.',
  },

  // ── Car Wash ────────────────────────────────────────────────
  'ka/carwash': {
    title: 'პრემიუმ ხელით რეცხვა თბილისში — ფასები 40 ლარიდან | BESTAUTO',
    description: 'პრემიუმ ხელით რეცხვა თბილისში. 2-3 ფაზიანი დეტეილინგ რეცხვა, სალონის დამუშავება, დამცავი საფარი. ფასები 40 ლარიდან — BESTAUTO.',
  },
  'ru/carwash': {
    title: 'Детейлинг мойка автомобиля в Тбилиси — цены от 40 GEL | BESTAUTO',
    description: 'Премиальная ручная мойка авто в Тбилиси. 2-3 фазы, обработка салона, защитное покрытие. Цены от 40 лари. 2 студии. Запись онлайн — BESTAUTO.',
  },
  'en/carwash': {
    title: 'Premium Hand Car Wash in Tbilisi — from 40 GEL | BESTAUTO',
    description: 'Premium hand car wash in Tbilisi. 2-3 phase detailing wash, interior treatment, protective coating. From 40 GEL. Two studios — BESTAUTO.',
  },
};
