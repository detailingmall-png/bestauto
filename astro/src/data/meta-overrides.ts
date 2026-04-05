/**
 * Build-time meta tag overrides for pages where Tilda exports
 * have suboptimal titles, descriptions, or OG tags.
 *
 * Key format: "lang/slug" (e.g. "ru/" for RU homepage, "ka/vinyl-wrapping").
 * Only specified fields are overridden; omitted fields keep the Tilda original.
 *
 * Updated 2026-04-06 from bestauto_meta_recommendations.csv audit.
 */

interface MetaOverride {
  readonly title?: string;
  readonly description?: string;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
}

export const META_OVERRIDES: Readonly<Record<string, MetaOverride>> = {
  // ── Homepage ──────────────────────────────────────────────
  'ka/': {
    title: 'დეტეილინგი თბილისში — დამცავი ფირის გაკვრა, პოლირება, ტონირება | BESTAUTO',
    description: 'პრემიუმ ავტო დეტეილინგი თბილისში: დამცავი ფირის გაკვრა, პოლირება, კერამიკა, ტონირება და ქიმწმენდა. 2 სტუდია, ონლაინ ჩაწერა.',
  },
  'ru/': {
    title: 'Детейлинг в Тбилиси — оклейка защитной пленкой, полировка, тонировка | BESTAUTO',
    description: 'Премиальный детейлинг в Тбилиси: оклейка защитной пленкой, полировка, керамика, тонировка и химчистка. 2 студии, запись онлайн.',
  },
  'en/': {
    title: 'Car Detailing in Tbilisi — PPF, Polishing, Tinting | BESTAUTO',
    description: 'Premium car detailing in Tbilisi: PPF, polishing, ceramic coating, tinting and interior cleaning. Two studios, book online.',
  },

  // ── Polishing ─────────────────────────────────────────────
  'ka/polishing': {
    title: 'მანქანის პოლირება თბილისში — ძარის 690 ₾-დან | BESTAUTO',
    description: 'ძარის, ფარებისა და მინის პროფესიონალური პოლირება თბილისში. ძარის პოლირება 690 ₾-დან, ფარების პოლირება 150 ₾-დან.',
  },
  'ru/polishing': {
    title: 'Полировка авто в Тбилиси — кузов от 690 GEL | BESTAUTO',
    description: 'Полировка кузова, фар и стекла в Тбилиси. Кузов от 690 GEL, полировка фар от 150 GEL. Запись онлайн.',
  },
  'en/polishing': {
    title: 'Car Polishing in Tbilisi — Body from 690 GEL | BESTAUTO',
    description: 'Body, headlight and glass polishing in Tbilisi. Body polishing from 690 GEL, headlights from 150 GEL. Book online.',
  },

  // ── Ceramic Coating ─────────────────────────────────────────
  'ka/ceramiccoating': {
    title: 'კერამიკული დაფარვა თბილისში — დაცვა 500 ₾-დან | BESTAUTO',
    description: 'ავტომობილის ძარის, მინებისა და სალონის კერამიკული დაფარვა თბილისში. ჰიდროფობული ეფექტი და UV-დაცვა. ფასები 500 ₾-დან.',
  },
  'ru/ceramiccoating': {
    title: 'Керамическое покрытие авто в Тбилиси — от 500 GEL | BESTAUTO',
    description: 'Керамическое покрытие кузова, стёкол и салона в Тбилиси. Гидрофобный эффект и защита от UV. Цены от 500 GEL.',
  },
  'en/ceramiccoating': {
    title: 'Ceramic Coating in Tbilisi — from 500 GEL | BESTAUTO',
    description: 'Ceramic coating for body, glass and interior in Tbilisi. Hydrophobic protection and UV resistance. Prices from 500 GEL.',
  },

  // ── PPF Shield Wrapping ─────────────────────────────────────
  'ka/ppf-shield-wrapping': {
    title: 'დამცავი ფირის გაკვრა თბილისში — 10-წლიანი გარანტია | BESTAUTO',
    description: 'სრული და ნაწილობრივი PPF დაფარვა თბილისში: კაპოტი, ბამპერი, ფარები. 2 სტუდია, უფასო ინსპექცია, ონლაინ ჩაწერა.',
  },
  'ru/ppf-shield-wrapping': {
    title: 'PPF в Тбилиси — 10 лет гарантии, от 2500 GEL | BESTAUTO',
    description: 'Полная и частичная оклейка PPF в Тбилиси: капот, бампер, фары. 2 студии, бесплатный осмотр, запись онлайн.',
  },
  'en/ppf-shield-wrapping': {
    title: 'PPF in Tbilisi — 10-Year Warranty, from 2500 GEL | BESTAUTO',
    description: 'Full and partial PPF wrap in Tbilisi: hood, bumper and headlights. Two studios, free inspection, book online.',
  },

  // ── Vinyl Wrapping ──────────────────────────────────────────
  'ka/vinyl-wrapping': {
    title: 'ფერის შეცვლა თბილისში — დამცავი ფირი | BESTAUTO',
    description: 'ავტომობილის ფერის შეცვლა პოლიურეთანის დამცავი ფირით თბილისში. გლუვი, მატი, სატინი და კარბონი. სრული ან ნაწილობრივი გაკვრა.',
    ogTitle: 'ფერის შეცვლა თბილისში — დამცავი ფირი | BESTAUTO',
  },
  'ru/vinyl-wrapping': {
    title: 'Смена цвета авто в Тбилиси — цветная плёнка | BESTAUTO',
    description: 'Смена цвета автомобиля в Тбилиси цветной полиуретановой плёнкой. Глянец, мат, сатин и карбон. Полная и частичная оклейка.',
  },
  'en/vinyl-wrapping': {
    title: 'Color Change Wrap in Tbilisi — Protective Film | BESTAUTO',
    description: 'Change your car color with protective polyurethane film in Tbilisi. Gloss, matte, satin or carbon. Full and partial wrap.',
  },

  // ── Interior Cleaning ───────────────────────────────────────
  'ka/interior-cleaning': {
    title: 'ქიმწმენდა თბილისში — სრული სალონი 400 ₾-დან | BESTAUTO',
    description: 'სალონის სრული ქიმწმენდა თბილისში: სავარძლები, ჭერი, ხალიჩები და პლასტიკი. უსაფრთხო ქიმია, ფასები 400 ₾-დან.',
  },
  'ru/interior-cleaning': {
    title: 'Химчистка салона в Тбилиси — полная от 400 GEL | BESTAUTO',
    description: 'Полная химчистка салона в Тбилиси: сиденья, потолок, коврики и пластик. Безопасная химия, цены от 400 GEL.',
  },
  'en/interior-cleaning': {
    title: 'Interior Cleaning in Tbilisi — from 400 GEL | BESTAUTO',
    description: 'Full interior cleaning in Tbilisi: seats, headliner, carpets and plastics. Safe chemicals, prices from 400 GEL.',
  },

  // ── Windshield Repair ───────────────────────────────────────
  'ka/windshield-repair': {
    title: 'ავტო მინის შეკეთება თბილისში — სკოლი, ბზარი, შლიფოვკა | BESTAUTO',
    description: 'საქარე და გვერდითი მინების შეკეთება თბილისში: სკოლი, ბზარი, პოლირება და შლიფოვკა. ფასები 60 ₾-დან, ონლაინ ჩაწერა.',
  },
  'ru/windshield-repair': {
    title: 'Ремонт автостекла в Тбилиси — сколы, трещины, шлифовка | BESTAUTO',
    description: 'Ремонт лобового и боковых стёкол в Тбилиси: сколы, трещины, полировка и шлифовка. Цены от 60 GEL, запись онлайн.',
  },
  'en/windshield-repair': {
    title: 'Auto Glass Repair in Tbilisi — Chips, Cracks, Grinding | BESTAUTO',
    description: 'Windshield and side window repair in Tbilisi: chips, cracks, polishing and scratch grinding. Prices from 60 GEL, book online.',
  },

  // ── Window Tinting ──────────────────────────────────────────
  'ka/auto-glass-tinting': {
    title: 'მინების დაბურვა თბილისში — 130 ₾-დან | BESTAUTO',
    description: 'ავტომობილის მინების ტონირება თბილისში. სითბოს და UV-დაცვა, კონფიდენციალურობა, 2 სტუდია. ფასები 130 ₾-დან.',
  },
  'ru/auto-glass-tinting': {
    title: 'Тонировка автостёкол в Тбилиси — от 130 GEL | BESTAUTO',
    description: 'Тонировка автостёкол в Тбилиси: защита от жары и UV, приватность, 2 студии. Цены от 130 GEL, запись онлайн.',
  },
  'en/auto-glass-tinting': {
    title: 'Window Tinting in Tbilisi — from 130 GEL | BESTAUTO',
    description: 'Professional window tinting in Tbilisi: heat and UV protection, privacy, two studios. Prices from 130 GEL, book online.',
  },

  // ── Car Soundproofing ───────────────────────────────────────
  'ka/car-soundproofing': {
    title: 'ავტო ხმის იზოლაცია თბილისში — 600 ₾-დან | BESTAUTO',
    description: 'ავტომობილის ხმის იზოლაცია თბილისში: კარები, იატაკი, სახურავი და საბარგული. ხმაურის შემცირება 40%-მდე.',
  },
  'ru/car-soundproofing': {
    title: 'Шумоизоляция авто в Тбилиси — от 600 GEL | BESTAUTO',
    description: 'Шумоизоляция автомобиля в Тбилиси: двери, пол, крыша и багажник. Снижение шума до 40%. Запись онлайн.',
  },
  'en/car-soundproofing': {
    title: 'Car Soundproofing in Tbilisi — from 600 GEL | BESTAUTO',
    description: 'Car soundproofing in Tbilisi: doors, floor, roof and trunk. Up to 40% noise reduction. Book online.',
  },

  // ── Computer Diagnostics ────────────────────────────────────
  'ka/computer-diagnostics': {
    title: 'კომპიუტერული დიაგნოსტიკა თბილისში — 50 ₾-დან | BESTAUTO',
    description: 'ავტოს კომპიუტერული დიაგნოსტიკა თბილისში: შეცდომების წაკითხვა, ECU, ABS და სენსორები. დეტალური ანგარიში, 2 ლოკაცია.',
  },
  'ru/computer-diagnostics': {
    title: 'Диагностика авто в Тбилиси — от 50 GEL | BESTAUTO',
    description: 'Компьютерная диагностика авто в Тбилиси: чтение ошибок, ECU, ABS и датчики. Детальный отчёт, 2 студии.',
  },
  'en/computer-diagnostics': {
    title: 'Car Diagnostics in Tbilisi — from 50 GEL | BESTAUTO',
    description: 'Computer diagnostics in Tbilisi: error codes, ECU, ABS and sensors. Detailed report, two studios, book online.',
  },

  // ── Car Wash ────────────────────────────────────────────────
  'ka/carwash': {
    title: 'ხელით რეცხვა თბილისში — 40 ₾-დან | BESTAUTO',
    description: 'პრემიუმ ხელით რეცხვა თბილისში: 2-3 ფაზიანი დეტეილინგ რეცხვა, სალონის დამუშავება და დამცავი საფარი. 2 სტუდია.',
  },
  'ru/carwash': {
    title: 'Детейлинг мойка в Тбилиси — от 40 GEL | BESTAUTO',
    description: 'Премиальная ручная мойка авто в Тбилиси: 2-3 фазы, обработка салона и защитное покрытие. 2 студии, запись онлайн.',
  },
  'en/carwash': {
    title: 'Hand Car Wash in Tbilisi — from 40 GEL | BESTAUTO',
    description: 'Premium hand car wash in Tbilisi: 2-3 phase detailing wash, interior treatment and protective coating. Two studios.',
  },

  // ── Location Pages ─────────────────────────────────────────
  'ka/locations/guramishvili': {
    title: 'BESTAUTO გურამიშვილი — დეტეილინგ სტუდია თბილისში | მისამართი, საათები',
    description: 'BESTAUTO გურამიშვილის სტუდია: გურამიშვილის გამზ. 78, გლდანი. PPF, კერამიკა, პოლირება, ტონირება. ორშ–შაბ 10:00–20:00. უფასო პარკინგი — ჩაეწერეთ ახლავე.',
  },
  'ru/locations/guramishvili': {
    title: 'BESTAUTO Гурамишвили — Детейлинг студия в Тбилиси | Адрес, часы работы',
    description: 'Студия BESTAUTO на Гурамишвили: пр. Гурамишвили 78, Глдани. PPF, керамика, полировка, тонировка. Пн–Сб 10:00–20:00. Бесплатная парковка. Запись онлайн!',
  },
  'en/locations/guramishvili': {
    title: 'BESTAUTO Guramishvili — Detailing Studio in Tbilisi | Address & Hours',
    description: 'BESTAUTO Guramishvili studio: Guramishvili Ave. 78, Gldani. PPF, ceramic, polishing, tinting. Mon–Sat 10:00–20:00. Free parking. Book online!',
  },
  'ka/locations/saburtalo': {
    title: 'BESTAUTO საბურთალო — დეტეილინგ სტუდია თბილისში | მისამართი, საათები',
    description: 'BESTAUTO საბურთალოს სტუდია: ანა პოლიტკოვსკაიას ქ. 51. PPF, კერამიკა, პოლირება, ტონირება. ორშ–შაბ 10:00–20:00. უფასო პარკინგი — ჩაეწერეთ ახლავე.',
  },
  'ru/locations/saburtalo': {
    title: 'BESTAUTO Сабуртало — Детейлинг студия в Тбилиси | Адрес, часы работы',
    description: 'Студия BESTAUTO на Сабуртало: ул. Анна Политковская 51. PPF, керамика, полировка, тонировка. Пн–Сб 10:00–20:00. Бесплатная парковка. Запись онлайн!',
  },
  'en/locations/saburtalo': {
    title: 'BESTAUTO Saburtalo — Detailing Studio in Tbilisi | Address & Hours',
    description: 'BESTAUTO Saburtalo studio: Anna Politkovskaya St. 51. PPF, ceramic, polishing, tinting. Mon–Sat 10:00–20:00. Free parking. Book online!',
  },

  // ── Blog audit KA v3 + EN (2026-04-04) ─────────────────────
  'en/blog/why-use-car-diagnostic-test': {
    title: 'Car Diagnostic Test: Importance and Benefits',
    ogTitle: 'Car Diagnostic Test: Importance and Benefits',
  },
  'en/blog/car-diagnostic-test-stages-and-methods': {
    title: 'How Car Diagnostic Tests Work: Key Stages and Methods',
    ogTitle: 'How Car Diagnostic Tests Work: Key Stages and Methods',
  },
  'en/blog/car-interior-detailing-basics': {
    title: 'Key Stages of Interior Detailing: From Dust Removal to Fabric Cleaning',
    ogTitle: 'Key Stages of Interior Detailing: From Dust Removal to Fabric Cleaning',
  },
  'ka/blog/technology-and-process': {
    title: '\u10e0\u10dd\u10d2\u10dd\u10e0 \u10db\u10e3\u10e8\u10d0\u10dd\u10d1\u10e1 \u10d9\u10d4\u10e0\u10d0\u10db\u10d8\u10d9\u10e3\u10da\u10d8 \u10e1\u10d0\u10e4\u10d0\u10e0\u10d8: \u10e2\u10d4\u10e5\u10dc\u10dd\u10da\u10dd\u10d2\u10d8\u10d0 \u10d3\u10d0 \u10d2\u10d0\u10db\u10dd\u10e7\u10d4\u10dc\u10d4\u10d1\u10d8\u10e1 \u10de\u10e0\u10dd\u10ea\u10d4\u10e1\u10d8',
    ogTitle: '\u10e0\u10dd\u10d2\u10dd\u10e0 \u10db\u10e3\u10e8\u10d0\u10dd\u10d1\u10e1 \u10d9\u10d4\u10e0\u10d0\u10db\u10d8\u10d9\u10e3\u10da\u10d8 \u10e1\u10d0\u10e4\u10d0\u10e0\u10d8: \u10e2\u10d4\u10e5\u10dc\u10dd\u10da\u10dd\u10d2\u10d8\u10d0 \u10d3\u10d0 \u10d2\u10d0\u10db\u10dd\u10e7\u10d4\u10dc\u10d4\u10d1\u10d8\u10e1 \u10de\u10e0\u10dd\u10ea\u10d4\u10e1\u10d8',
  },
};
