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
    title: 'დეტეილინგი თბილისში — PPF ფირის გადაკვრა, პოლირება, მინების დაბურვა | BESTAUTO',
    description: 'პრემიუმ ავტო დეტეილინგი თბილისში: PPF ფირის გადაკვრა, პოლირება, კერამიკა, მინების დაბურვა და ქიმწმენდა. 2 სტუდია, ონლაინ ჩაწერა.',
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
    title: 'კერამიკული საფარი მანქანაზე თბილისში — 500 ₾-დან | BESTAUTO',
    description: 'ვაკეთებთ კერამიკული საფარის წასმას ავტომობილის ძარაზე, მინებზე, დისკებსა და ინტერიერის ელემენტებზე — ზედაპირის დასაცავად და მოვლის გასამარტივებლად.',
    ogDescription: 'ვაკეთებთ კერამიკული საფარის წასმას ავტომობილის ძარაზე, მინებზე, დისკებსა და ინტერიერის ელემენტებზე — ზედაპირის დასაცავად და მოვლის გასამარტივებლად.',
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
    title: 'PPF დამცავი ფირის გადაკვრა თბილისში — 10-წლიანი გარანტია | BESTAUTO',
    description: 'ვაკეთებთ ავტომობილის გადაკვრას დამცავი პოლიურეთანის (PPF) ფირით თბილისში — ფირი იცავს ძარას ნაკაწრებისგან, ქვებისგან და ყოველდღიური ცვეთისგან.',
    ogDescription: 'ვაკეთებთ ავტომობილის გადაკვრას დამცავი პოლიურეთანის (PPF) ფირით თბილისში — ფირი იცავს ძარას ნაკაწრებისგან, ქვებისგან და ყოველდღიური ცვეთისგან.',
  },
  'ru/ppf-shield-wrapping': {
    title: 'Оклейка защитной пленкой в Тбилиси — 10 лет гарантии, от 2500 GEL | BESTAUTO',
    description: 'Полная и частичная оклейка защитной пленкой в Тбилиси: капот, бампер, фары. 2 студии, бесплатный осмотр, запись онлайн.',
  },
  'en/ppf-shield-wrapping': {
    title: 'PPF in Tbilisi — 10-Year Warranty, from 2500 GEL | BESTAUTO',
    description: 'Full and partial PPF wrap in Tbilisi: hood, bumper and headlights. Two studios, free inspection, book online.',
  },

  // ── Vinyl Wrapping ──────────────────────────────────────────
  'ka/vinyl-wrapping': {
    title: 'ფერადი ვინილის ფირის გადაკვრა თბილისში | BESTAUTO',
    description: 'ვაკეთებთ ავტომობილის გადაკვრას ფერადი ვინილის ფირით თბილისში — ვიზუალური განახლება შეღებვის გარეშე და ქარხნული საღებავის დამატებითი დაცვა.',
    ogTitle: 'ფერადი ვინილის ფირის გადაკვრა თბილისში | BESTAUTO',
    ogDescription: 'ვაკეთებთ ავტომობილის გადაკვრას ფერადი ვინილის ფირით თბილისში — ვიზუალური განახლება შეღებვის გარეშე და ქარხნული საღებავის დამატებითი დაცვა.',
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
    title: 'საქარე მინის ბზარისა და ნაკენჭარის შეკეთება თბილისში | BESTAUTO',
    description: 'ვაკეთებთ საქარე მინის ნაკენჭარისა და ბზარის შეკეთებას თბილისში. სწორად შესრულებული შეკეთების შემდეგ დაზიანების ადგილი მინიმალურად შესამჩნევი რჩება.',
    ogDescription: 'ვაკეთებთ საქარე მინის ნაკენჭარისა და ბზარის შეკეთებას თბილისში. სწორად შესრულებული შეკეთების შემდეგ დაზიანების ადგილი მინიმალურად შესამჩნევი რჩება.',
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
    description: 'ვაკეთებთ მანქანის მინების დაბურვას თბილისში — ფირი ამცირებს სალონის გადახურებას, იცავს ინტერიერს მზის სხივებისგან და ზრდის კომფორტს.',
    ogDescription: 'ვაკეთებთ მანქანის მინების დაბურვას თბილისში — ფირი ამცირებს სალონის გადახურებას, იცავს ინტერიერს მზის სხივებისგან და ზრდის კომფორტს.',
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
    title: 'მანქანის ხმის იზოლაცია თბილისში — 600 ₾-დან | BESTAUTO',
    description: 'ვაკეთებთ ავტომობილის სრულ ან ნაწილობრივ ხმის იზოლაციას თბილისში — კარები, იატაკი, საბარგული და სხვა ზონები.',
    ogDescription: 'ვაკეთებთ ავტომობილის სრულ ან ნაწილობრივ ხმის იზოლაციას თბილისში — კარები, იატაკი, საბარგული და სხვა ზონები.',
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
    title: 'მანქანის 2-ფაზიანი და 3-ფაზიანი რეცხვა თბილისში — 40 ₾-დან | BESTAUTO',
    description: 'ვაკეთებთ ავტომობილის უსაფრთხო ხელით რეცხვას თბილისში — 2-ფაზიან და 3-ფაზიან დეტეილინგ რეცხვას პროფესიონალური ქიმიით.',
    ogDescription: 'ვაკეთებთ ავტომობილის უსაფრთხო ხელით რეცხვას თბილისში — 2-ფაზიან და 3-ფაზიან დეტეილინგ რეცხვას პროფესიონალური ქიმიით.',
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
  // ── Blog Meta Overrides (from CSV audit 2026-04-06) ────────
  'ka/blog/10-paint-mistakes': {
    title: '10 შეცდომა, რომლებიც სწრაფად აზიანებს ავტო საღებავს',
    description: '10 გავრცელებული შეცდომა, რომლებიც საღებავ-ლაქის საფარს აზიანებს. საქართველოში ყველაზე ხშირი პრობლემები: მთის გზები, მზე, არასწორი თვითმომსახურების რეცხვა.',
  },
  'ru/blog/10-paint-mistakes': {
    title: '10 ошибок, которые быстро портят ЛКП автомобиля',
    description: '10 распространённых ошибок, из-за которых страдает лакокрасочное покрытие; как их избежать в условиях Грузии.',
  },
  'en/blog/10-paint-mistakes': {
    title: '10 Mistakes That Ruin Car Paint Fast',
    description: '10 common mistakes that damage car paint and how to avoid them in Georgia',
  },

  'ka/blog/benefits-of-vinyl-wraps': {
    title: 'ვინილის ფირის გადაკვრა: უპირატესობები, ესთეტიკა და მოვლა',
    description: 'ვინილის ფირი საშუალებას გაძლევთ შეცვალოთ ავტომობილის ვიზუალი შეღებვის გარეშე. გაიგეთ მისი მთავარი უპირატესობები, შეზღუდვები, მოვლის წესები და როდის ჯობს PPF.',
  },
  'ru/blog/benefits-of-vinyl-wraps': {
    title: 'Виниловая пленка для авто: плюсы и минусы',
    description: 'Зачем оклеивать кузов виниловой плёнкой: защита оригинального цвета, варианты текстур и что учесть при выборе в Грузии.',
  },
  'en/blog/benefits-of-vinyl-wraps': {
    title: 'Vinyl Wrap for Cars: Pros and Cons',
    description: 'Why wrap your car in vinyl: protection for the original paint, available textures, and key considerations for Georgia.',
  },

  'ka/blog/car-body-color-with-vinyl-wrap': {
    title: 'როგორ ცვლის ვინილის ფირი ავტომობილის ფერს',
    description: 'ფაქტორების, ტექნოლოგიებისა და რეკომენდაციების საექსპერტო ანალიზი თქვენი მანქანის იდეალური გარეგნობის მისაღწევად ვინილის ფილმით დაფარვისას.',
  },
  'ru/blog/car-body-color-with-vinyl-wrap': {
    title: 'Как виниловая пленка меняет цвет автомобиля',
    description: 'Как виниловая оклейка меняет цвет автомобиля без перекраски: доступные варианты, влияние на стоимость и обратимость.',
  },
  'en/blog/car-body-color-with-vinyl-wrap': {
    title: 'How Vinyl Wrap Changes Your Car Color',
    description: 'How vinyl wrap changes a car’s color without repainting: available finishes, reversibility, and what to expect before wrapping.',
  },

  'ka/blog/car-body-polishing': {
    title: 'ძარის პოლირება: როგორ დავაბრუნოთ ბზინვარება',
    description: 'როგორ აშორებს პროფესიონალური პოლირება ნაკაწრებს, ჰოლოგრამებსა და დაჟანგვის კვალს და როგორ აბრუნებს ფერს სიღრმესა და ბზინვარებას.',
  },
  'ru/blog/car-body-polishing': {
    title: 'Полировка кузова авто: как вернуть блеск',
    description: 'Как профессиональная полировка кузова убирает царапины, свилы и окисление; возвращает глубину цвета.',
  },
  'en/blog/car-body-polishing': {
    title: 'Car Body Polishing: How to Restore Shine',
    description: 'How professional paint correction removes scratches, swirl marks, and oxidation: restoring depth and gloss.',
  },

  'ka/blog/car-detailing-guide': {
    title: 'ავტო დეტეილინგი: სერვისები, ეტაპები, ფასები | BESTAUTO',
    description: 'სრული გზამკვლევი ავტო დეტეილინგზე: რა შედის სერვისში, რა ღირს თბილისში და როგორ ავირჩიოთ სწორი დაცვა ავტომობილისთვის.',
  },
  'ru/blog/car-detailing-guide': {
    title: 'Что такое детейлинг авто: услуги, этапы, цены | BESTAUTO',
    description: 'Что такое детейлинг автомобиля: какие услуги входят, сколько стоит в Тбилиси и зачем он нужен автомобилю.',
  },
  'en/blog/car-detailing-guide': {
    title: 'Car Detailing Guide: Services, Steps, Prices | BESTAUTO',
    description: 'What car detailing includes: services, costs in Tbilisi, and why your vehicle needs professional care.',
  },

  'ka/blog/car-diagnostic-test-stages-and-methods': {
    title: 'კომპიუტერული დიაგნოსტიკა: ეტაპები, მეთოდები და შედეგი | BESTAUTO',
    description: 'როგორ ტარდება კომპიუტერული დიაგნოსტიკა: OBD სკანირება, შეცდომების დეკოდირება, live data, დამატებითი ტესტები და რეკომენდაციები. ფასი თბილისში — 50 GEL-დან.',
  },
  'ru/blog/car-diagnostic-test-stages-and-methods': {
    title: 'Как работает компьютерная диагностика авто: этапы',
    description: 'Этапы компьютерной диагностики автомобиля: от подключения сканера до расшифровки ошибок. Какое оборудование используется.',
  },
  'en/blog/car-diagnostic-test-stages-and-methods': {
    title: 'Car Computer Diagnostics: Key Steps Explained',
    description: 'Car diagnostic stages explained: from scanner connection to fault code interpretation. What equipment is used.',
  },

  'ka/blog/car-interior-detailing-basics': {
    title: 'სალონის დეტეილინგი: ეტაპები და რა შედის',
    description: 'სალონის დეტეილინგის ძირითადი ეტაპები: მტვრის მოცილება, ქსოვილისა და ტყავის წმენდა, პლასტიკის დამუშავება და ის, რაც პროცედურაში შედის.',
  },
  'ru/blog/car-interior-detailing-basics': {
    title: 'Детейлинг салона авто: этапы и что входит',
    description: 'Основные этапы детейлинг-мойки салона: удаление пыли, чистка ткани и кожи, обработка пластика, что входит в процедуру.',
  },
  'en/blog/car-interior-detailing-basics': {
    title: 'Car Interior Detailing: Steps and What’s Included',
    description: 'Main stages of car interior detailing: vacuuming, fabric and leather cleaning, plastic treatment: what the process includes.',
  },

  'ka/blog/car-interior-disinfection': {
    title: 'სალონის დეზინფექცია და სუნის მოცილება: ოზონირება, როდის არის საჭირო და რა შედეგს უნდა ელოდოთ',
    description: 'როგორ მუშაობს მანქანის სალონის ოზონირება, როდის არის საჭირო, რას შლის რეალურად და როდის ჯობს ქიმწმენდა + ოზონირება. აქტუალური ფასები BESTAUTO-ს მიხედვით.',
  },
  'ru/blog/car-interior-disinfection': {
    title: 'Дезинфекция салона авто: как убрать запахи',
    description: 'Когда нужна дезинфекция салона, как работает озонирование и какие запахи оно устраняет.',
  },
  'en/blog/car-interior-disinfection': {
    title: 'Car Interior Disinfection: Eliminate Odors Safely',
    description: 'Car interior ozone treatment to eliminate odors and disinfect from bacteria and viruses. How it works and when your car needs it.',
  },

  'ka/blog/car-interior-polishing': {
    title: 'ინტერიერის ელემენტების გაპრიალება: რა ნაწილები, რა შედეგი, რა შეზღუდვები',
    description: 'ინტერიერის პლასტმასის, piano black-ის და დეკორის გაპრიალება ამცირებს მცირე ნაკაწრებს და აბრუნებს სუფთა იერს. ვხსნით პროცესს, შედეგს, შეზღუდვებს და ფასს თბილისში.',
  },
  'ru/blog/car-interior-polishing': {
    title: 'Полировка салона авто: когда нужна и что дает',
    description: 'Как полировка салона улучшает внешний вид пластика, кожи и декоративных элементов; когда это действительно нужно.',
  },
  'en/blog/car-interior-polishing': {
    title: 'Interior Polishing: When You Need It and Why',
    description: 'How interior polishing improves plastic, leather, and trim, and when a car interior really needs this service.',
  },

  'ka/blog/ceramic-coating-care': {
    title: 'კერამიკის მოვლა: რა შეიძლება და რა არა',
    description: 'როგორ უნდა გარეცხოთ და მოუაროთ კერამიკით დაფარულ ავტომობილს საქართველოში, რათა საფარმა მაქსიმალურად დიდხანს იმუშაოს.',
  },
  'en/blog/ceramic-coating-care': {
    title: 'Ceramic Coating Care: Do’s and Don’ts',
    description: 'How to maintain a ceramic-coated car: washing products, techniques, and maintenance schedule.',
  },

  'ru/blog/ceramic-coating-cost-tbilisi': {
    title: 'Сколько стоит керамика авто в Тбилиси (2026)',
    description: 'Сколько стоит керамическое покрытие в Тбилиси: бренды, ценовые категории и что влияет на итоговую стоимость.',
  },

  'ka/blog/ceramic-coating-durability': {
    title: 'რამდენ ხანს ძლებს კერამიკა? რისგან არის დამოკიდებული',
    description: 'რამდენ ხანს ძლებს კერამიკული საფარი პრაქტიკაში, რას ცვლის მოვლა და რატომ არ ემთხვევა რეკლამირებული ვადები რეალობას.',
  },
  'en/blog/ceramic-coating-durability': {
    title: 'How Long Does Ceramic Coating Last? Factors',
    description: 'How long ceramic coating really lasts in Georgia: 2-5 year range, what affects durability, and how to extend it.',
  },

  'ka/blog/ceramic-coating-for-car': {
    title: 'კერამიკული საფარი ავტომობილის ძარაზე: უპირატესობები, გამძლეობა და მოვლა',
    description: 'რას აკეთებს კერამიკული საფარი რეალურად, რას ვერ აკეთებს, რამდენ ხანს ძლებს და როდის ჯობს PPF ფირი უფრო ძლიერი დაცვისთვის.',
  },
  'ru/blog/ceramic-coating-for-car': {
    title: 'Керамическое покрытие авто: плюсы и минусы',
    description: 'Как работает керамическое покрытие кузова, сколько держится в условиях Грузии и какую защиту даёт от царапин, UV и грязи.',
  },
  'en/blog/ceramic-coating-for-car': {
    title: 'Ceramic Coating for Cars: Pros and Cons',
    description: 'How ceramic coating protects car paint in Georgia from UV, chemicals, and dirt, how long it lasts, and where its limits are.',
  },

  'ru/blog/ceramic-coating-maintenance': {
    title: 'Уход за керамикой: полный гид (2026)',
    description: 'Как ухаживать за автомобилем с керамическим покрытием: мойка, средства, периодичность обслуживания.',
  },

  'ka/blog/ceramic-coating-tbilisi': {
    title: 'კერამიკული დაფარვა თბილისში: ფასები (2026)',
    description: 'კერამიკული საფარის ფასები თბილისში: დონეები, ბრენდები, შედარება PPF-თან და რომელი პაკეტი ჯობს გრძელვადიან პერსპექტივაში.',
  },
  'en/blog/ceramic-coating-tbilisi': {
    title: 'Ceramic Coating in Tbilisi: Prices (2026)',
    description: 'Ceramic coating prices in Tbilisi: brands, price ranges, and what factors affect the final cost.',
  },

  'ka/blog/ceramic-for-car-glass': {
    title: 'მინებზე კერამიკული საფარი თბილისში — ანტირაინი, ხილვადობა, ფასი და გამძლეობა',
    description: 'მინებზე კერამიკული საფარი აუმჯობესებს ხილვადობას წვიმაში, ამცირებს წყლის და ჭუჭყის შეჩერებას და ამარტივებს მოვლას. გაიგეთ როგორ მუშაობს ანტირაინი, რამდენ ხანს ძლებს და რა ღირს თბილისში.',
  },
  'ru/blog/ceramic-for-car-glass': {
    title: 'Керамика для стекол авто: что дает и кому нужна',
    description: 'Как керамическое покрытие стёкол улучшает видимость, упрощает уход и работает в дождливых условиях Грузии.',
  },
  'en/blog/ceramic-for-car-glass': {
    title: 'Ceramic Coating for Car Glass: Is It Worth It?',
    description: 'How ceramic coating for car glass improves visibility, helps water sheet off, and makes cleaning easier in Georgia.',
  },

  'ka/blog/detailing-cost-tbilisi': {
    title: 'რა ღირს ავტო დეტეილინგი თბილისში (2026)',
    description: 'რა ღირს დეტეილინგი თბილისში, რა ფაქტორები მოქმედებს ფასზე და რატომ არ არის ერთი ფასი ყველა ავტომობილისთვის. პაკეტების მიმოხილვა 2026 წლის მონაცემებით.',
  },
  'ru/blog/detailing-cost-tbilisi': {
    title: 'Сколько стоит детейлинг авто в Тбилиси (2026)',
    description: 'Обзор стоимости детейлинга в Тбилиси: полировка, керамика, PPF, тонировка и оптимальные комбинации услуг.',
  },
  'en/blog/detailing-cost-tbilisi': {
    title: 'Car Detailing Cost in Tbilisi (2026)',
    description: 'Detailing costs in Tbilisi: polishing, ceramic, PPF, tinting: prices and optimal service combinations for 2026.',
  },

  'ka/blog/efficiency-of-windshield-repair': {
    title: 'საქარე მინის ნაკენჭარის და ბზარის შეკეთება თბილისში — როდის ღირს რემონტი | BESTAUTO',
    description: 'გაიგეთ რომელი ნაკენჭარი ან ბზარი ექვემდებარება შეკეთებას, როდის აღარ ღირს რემონტი და რა ღირს საქარე მინის აღდგენა თბილისში BESTAUTO-ში.',
  },
  'ru/blog/efficiency-of-windshield-repair': {
    title: 'Какие сколы на стекле можно отремонтировать',
    description: 'Какие сколы и трещины на лобовом стекле поддаются ремонту, а какие нет, размеры, расположение и реалистичные ожидания.',
  },
  'en/blog/efficiency-of-windshield-repair': {
    title: 'Which Windshield Chips Can Be Repaired?',
    description: 'Which windshield chips and cracks can be repaired and which cannot: size, location, and realistic expectations.',
  },

  'ka/blog/engine-room-cleaning': {
    title: 'ძრავის განყოფილების წმენდა თბილისში — როდის არის საჭირო და როგორ კეთდება უსაფრთხოდ',
    description: 'გაიგეთ როდის არის საჭირო ძრავის განყოფილების წმენდა, რა სარგებელი აქვს პროცედურას, რა რისკებია არასწორი რეცხვისას და როგორ უნდა იყოს დაცული სენსორები, ელექტრონიკა და კონექტორები.',
  },
  'ru/blog/engine-room-cleaning': {
    title: 'Мойка двигателя и подкапотного пространства: когда нужна',
    description: 'Зачем мыть подкапотное пространство, как часто это делать и на что обратить внимание, чтобы не повредить электронику.',
  },
  'en/blog/engine-room-cleaning': {
    title: 'Engine Bay Cleaning: When and How to Do It',
    description: 'Why clean your engine bay, how often to do it, and what to avoid so you don',
  },

  'ka/blog/errors-to-find': {
    title: 'რა შეიძლება აჩვენოს ავტომობილის კომპიუტერულმა დიაგნოსტიკამ | BESTAUTO',
    description: 'რა სისტემებს ამოწმებს კომპიუტერული დიაგნოსტიკა, რა შეცდომებს აჩვენებს სკანერი და როდის უნდა ჩაიწეროთ შემოწმებაზე თბილისში. პრაქტიკული გზამკვლევი BESTAUTO-სგან.',
  },
  'ru/blog/errors-to-find': {
    title: 'Что показывает компьютерная диагностика авто',
    description: 'Какие неисправности выявляет компьютерная диагностика: двигатель, трансмиссия, электроника, датчики и системы безопасности.',
  },
  'en/blog/errors-to-find': {
    title: 'What Car Computer Diagnostics Can Detect',
    description: 'What a diagnostic scan detects: engine, transmission, electronics, sensor, and safety system faults explained.',
  },

  'ka/blog/headlight-polishing': {
    title: 'ფარების პოლირება თბილისში — როდის არის საჭირო, როგორ კეთდება და როგორ შევინარჩუნოთ შედეგი',
    description: 'ფარების პოლირება აღადგენს გამჭვირვალობას, აუმჯობესებს ღამის ხილვადობას და აახალგაზრდავებს ავტომობილის იერს. გაიგეთ როდის ღირს პოლირება, როდის არა და რატომ არის დაცვა ფირით საუკეთესო გაგრძელება.',
  },
  'ru/blog/headlight-polishing': {
    title: 'Полировка фар авто: когда нужна и что дает',
    description: 'Почему тускнеют фары, какие методы полировки существуют и когда восстановление фар дешевле замены, на примерах из Тбилиси.',
  },
  'en/blog/headlight-polishing': {
    title: 'Headlight Polishing: When It Works and Why',
    description: 'Why headlights get cloudy, available polishing methods, and when restoration is cheaper than replacement: examples from Tbilisi.',
  },

  'ka/blog/hints-for-vinyl-wrapped-cars': {
    title: 'ვინილის ფირის მოვლა: რეცხვა, ქიმია და აკრძალული პროდუქტები',
    description: 'როგორ მოვუაროთ ვინილის ფირით დაფარულ ავტომობილს: რეცხვის წესები, რა ქიმია არ შეიძლება, რით განსხვავდება მატე და პრიალა ვინილი და როგორ შევინარჩუნოთ ფირის იერი დიდხანს.',
  },
  'ru/blog/hints-for-vinyl-wrapped-cars': {
    title: 'Уход за авто в виниловой пленке: как мыть и чистить',
    description: 'Рекомендации по уходу за виниловой оклейкой: мойка, хранение, защита от повреждений и когда нужна замена плёнки.',
  },
  'en/blog/hints-for-vinyl-wrapped-cars': {
    title: 'Vinyl Wrap Care: Cleaning and Maintenance Tips',
    description: 'Care tips for vinyl-wrapped cars: washing, storage, damage prevention, and when the film needs replacing.',
  },

  'ru/blog/how-long-ceramic-coating-lasts': {
    title: 'Сколько держится керамика на авто: честно и по фактам',
    description: 'Сколько реально держится керамика на авто в условиях Грузии: срок 2–5 лет, что влияет и как продлить.',
  },

  'ka/blog/how-often-polish-car': {
    title: 'რამდენად ხშირად უნდა დავპოლიროთ ავტომობილი?',
    description: 'პოლირების სიხშირე სამი სცენარით: PPF-ით დაფარული, კერამიკით დაცული და დაცვის გარეშე ავტომობილებისთვის. პრაქტიკული ხარჯების ლოგიკა.',
  },
  'ru/blog/how-often-polish-car': {
    title: 'Как часто нужно полировать автомобиль',
    description: 'Как часто нужно полировать автомобиль: с защитной плёнкой, с керамикой и без покрытия, три сценария ухода.',
  },
  'en/blog/how-often-polish-car': {
    title: 'How Often Should You Polish Your Car?',
    description: 'How often to polish your car: with PPF, with ceramic coating, and without protection: three maintenance scenarios.',
  },

  'ka/blog/how-to-choose-detailing-studio': {
    title: 'როგორ ავარჩიოთ დეტეილინგ სტუდია: 7 კრიტერიუმი',
    description: 'დეტეილინგ სტუდიის არჩევის 7 კრიტერიუმი: გამოცდილება, მასალები, გარანტია, პორტფოლიო, პროცესის გამჭვირვალობა და რეალური ხარისხის ნიშნები.',
  },
  'ru/blog/how-to-choose-detailing-studio': {
    title: 'Как выбрать детейлинг студию: 7 критериев качества',
    description: '7 критериев выбора детейлинг-студии: на что смотреть, какие вопросы задать и как оценить качество работы.',
  },
  'en/blog/how-to-choose-detailing-studio': {
    title: 'How to Choose a Detailing Studio: 7 Criteria',
    description: '7 criteria for choosing a detailing studio: what to look for, questions to ask, and how to evaluate work quality.',
  },

  'ka/blog/interior-ceramic-coating': {
    title: 'ინტერიერის კერამიკული საფარი: დაცვა ლაქებისა და ცვეთისგან',
    description: 'რომელ ზედაპირებს იცავს სალონის კერამიკული საფარი, რამდენ ხანს ძლებს, რა შეზღუდვები აქვს და როდის ღირს მისი გაკეთება თბილისში.',
  },
  'ru/blog/interior-ceramic-coating': {
    title: 'Керамика для салона авто: что защищает и зачем',
    description: 'Керамическое покрытие для салона: какие поверхности защищает, сколько держится и когда стоит наносить.',
  },
  'en/blog/interior-ceramic-coating': {
    title: 'Ceramic Coating for Interior: What It Protects',
    description: 'Ceramic coating for car interiors: which surfaces it protects, how long it lasts, and when it makes sense to apply.',
  },

  'ka/blog/interior-cleaning-for-auto': {
    title: 'სალონის ქიმწმენდა თბილისში: რა შედის, რა ღირს და როგორ შევინარჩუნოთ შედეგი',
    description: 'რას მოიცავს პროფესიონალური ქიმწმენდა, რამდენი დრო სჭირდება, რა მოქმედებს ფასზე და რა საწყისი ტარიფებია BESTAUTO-ს მიმდინარე ფასების მიხედვით.',
  },
  'ru/blog/interior-cleaning-for-auto': {
    title: 'Химчистка салона авто: что входит и когда нужна',
    description: 'Что входит в профессиональную химчистку салона, чем она отличается от обычной мойки и когда стоит обращаться в студию в Тбилиси.',
  },
  'en/blog/interior-cleaning-for-auto': {
    title: 'Car Interior Deep Cleaning: What’s Included',
    description: 'What professional interior cleaning includes, how it differs from a regular wash, and when it makes sense to book a studio in Tbilisi.',
  },

  'ka/blog/legal-aspects-of-tinting-in-georgia': {
    title: 'მინების დაბურვა საქართველოში: წესები (2026)',
    description: 'გაიგეთ, რა დონის ტონირებაა დაშვებული საქართველოში, რომელ მინებზე მოქმედებს შეზღუდვები, რა ჯარიმებია დარღვევის შემთხვევაში და რა გამონაკლისები არსებობს.',
  },
  'ru/blog/legal-aspects-of-tinting-in-georgia': {
    title: 'Тонировка в Грузии: правила и ограничения (2026)',
    description: 'Какая тонировка разрешена в Грузии: допустимые проценты по типам стёкол, штрафы за нарушение и действующие нормы.',
  },
  'en/blog/legal-aspects-of-tinting-in-georgia': {
    title: 'Window Tinting in Georgia: Rules (2026)',
    description: 'Current window tinting rules in Georgia: permitted VLT levels by glass type, fines for violations, and legal requirements.',
  },

  'ka/blog/new-car-detailing': {
    title: 'ახალი ავტომობილი: რა გავაკეთოთ პირველ რიგში | BESTAUTO',
    description: 'რა უნდა გააკეთოთ ახალ მანქანასთან პირველ რიგში: პოლირება, კერამიკა თუ PPF და რა არის სწორი თანმიმდევრობა თბილისში.',
  },
  'ru/blog/new-car-detailing': {
    title: 'Новый автомобиль: что сделать в первую очередь | BESTAUTO',
    description: 'Какую защиту нанести на новый автомобиль в первую очередь: порядок услуг, сроки и на чём не стоит экономить.',
  },
  'en/blog/new-car-detailing': {
    title: 'New Car Detailing: What to Do First | BESTAUTO',
    description: 'Which protection to apply to a new car first: service order, timing, and where not to cut corners.',
  },

  'ka/blog/noisemakers-and-wayouts': {
    title: 'მანქანაში ხმაურის წყაროები: როგორ ვიპოვოთ მიზეზი და რა მუშაობს',
    description: 'საიდან მოდის სალონის ხმაური, როგორ ამოვიცნოთ წყარო სიმპტომებით და რომელი ზონების დამუშავება იძლევა ყველაზე დიდ ეფექტს ხმის იზოლაციაში.',
  },
  'ru/blog/noisemakers-and-wayouts': {
    title: 'Шум в салоне авто: основные источники и как убрать',
    description: 'Откуда берётся шум в салоне, какие зоны обрабатывать в первую очередь и каких результатов ожидать после шумоизоляции.',
  },
  'en/blog/noisemakers-and-wayouts': {
    title: 'Car Cabin Noise: Top Sources and Fixes',
    description: 'Where cabin noise comes from, which zones to treat first, and what results to expect after soundproofing.',
  },

  'ka/blog/polishing-after-repair': {
    title: 'ავტომობილის პოლირება ძარის შეკეთების შემდეგ: როდის შეიძლება და რა შედეგს უნდა ელოდოთ',
    description: 'როდის შეიძლება პოლირება ძარის შეკეთების შემდეგ, რას აგვარებს პროცესი და როდის ჯობს დამატებითი დაცვა კერამიკით ან PPF ფირით.',
  },
  'ru/blog/polishing-after-repair': {
    title: 'Полировка после ремонта кузова: когда можно делать',
    description: 'Когда нужна полировка после кузовного ремонта, какие этапы включает и как она возвращает заводской блеск лакокрасочному покрытию.',
  },
  'en/blog/polishing-after-repair': {
    title: 'Polishing After Body Repair: When to Do It',
    description: 'When and why paint correction is needed after body repair: what defects it removes, how the process works, and what to expect.',
  },

  'ka/blog/polishing-before-after': {
    title: 'პოლირება: ადრე და შემდეგ — რა იცვლება',
    description: 'რეალური მაგალითები ფორმატში „მანამდე / შემდეგ“: ნაკაწრები, ჰოლოგრამები, დაჟანგვის კვალი და რა იცვლება პოლირების შემდეგ.',
  },
  'ru/blog/polishing-before-after': {
    title: 'Полировка авто: до и после — что меняется на практике',
    description: 'Фото до и после полировки: реальные примеры изменений — царапины, свилы, окисление и итоговый результат на кузове.',
  },
  'en/blog/polishing-before-after': {
    title: 'Car Polishing Before vs After: What Changes',
    description: 'Before-and-after polishing examples: real changes in scratches, swirl marks, oxidation, and gloss after proper paint correction.',
  },

  'ka/blog/polishing-before-ceramic': {
    title: 'საჭიროა თუ არა პოლირება კერამიკამდე?',
    description: 'საჭიროა თუ არა პოლირება კერამიკის წინ, როდის არის ის აუცილებელი და როგორ მოქმედებს ზედაპირის მომზადება საბოლოო შედეგზე.',
  },
  'ru/blog/polishing-before-ceramic': {
    title: 'Нужно ли полировать авто перед керамикой?',
    description: 'Нужна ли полировка перед нанесением керамики: когда обязательна, когда можно пропустить и как это влияет на результат.',
  },
  'en/blog/polishing-before-ceramic': {
    title: 'Do You Need Polishing Before Ceramic Coating?',
    description: 'Is polishing necessary before ceramic coating, when it is required, and how surface preparation affects the final result.',
  },

  'ka/blog/polishing-cost-tbilisi': {
    title: 'რა ღირს ავტომობილის პოლირება თბილისში (2026)',
    description: 'რა ღირს მსუბუქი და ღრმა პოლირება თბილისში, რა შედეგს უნდა ელოდოთ თითოეული ტიპისგან და როდის ღირს ინვესტიცია.',
  },
  'ru/blog/polishing-cost-tbilisi': {
    title: 'Сколько стоит полировка авто в Тбилиси (2026)',
    description: 'Сколько стоит полировка авто в Тбилиси: цены на мягкую и абразивную полировку и когда её выгодно комбинировать с PPF.',
  },
  'en/blog/polishing-cost-tbilisi': {
    title: 'Car Polishing Cost in Tbilisi (2026)',
    description: 'Car polishing prices in Tbilisi: soft and abrasive polishing costs, and when combining with PPF saves money.',
  },

  'ka/blog/ppf-benefits': {
    title: 'PPF ფირის უპირატესობები: რატომ ღირს ძარის დაცვა',
    description: 'გაიგეთ რა უპირატესობები აქვს PPF დამცავ ფირს, როდის ღირს მისი გადაკვრა, რა ნაწილებზე კეთდება ყველაზე ხშირად და რა ფასებია თბილისში BESTAUTO-ში.',
  },
  'ru/blog/ppf-benefits': {
    title: 'Защитная пленка (PPF) для авто: стоит ли оклеивать',
    description: 'Главные преимущества PPF: от чего защищает пленка, сколько служит и когда оклейка кузова действительно окупается.',
  },
  'en/blog/ppf-benefits': {
    title: 'Paint Protection Film (PPF): Is It Worth It?',
    description: 'Key advantages of PPF film: what it protects against, how long it lasts, and when the investment pays off.',
  },

  'ru/blog/ppf-film-benefits': {
    title: 'Полиуретановая защитная пленка (PPF): преимущества',
    description: 'Чем полиуретановая плёнка PPF лучше других методов защиты кузова: сравнение с керамикой и винилом по ключевым параметрам.',
  },

  'ka/blog/ppf-film-for-cars-protection': {
    title: 'PPF ფირით დაფარვა: როგორ იცავს ძარას ნაკაწრებისა და ნაკენჭარებისგან',
    description: 'რა არის PPF დამცავი ფირი, სად ჯობს მისი დაკვრა, რას იცავს რეალურად და რატომ არის მნიშვნელოვანი ხარისხიანი მონტაჟი და სწორი ბრენდის შერჩევა.',
  },
  'ru/blog/ppf-film-for-cars-protection': {
    title: 'Оклейка кузова защитной пленкой (PPF): что дает',
    description: 'Как PPF защищает кузов от сколов и царапин: процесс оклейки, выбор зон и реальный результат в условиях Тбилиси.',
  },
  'en/blog/ppf-film-for-cars-protection': {
    title: 'PPF Wrap: What It Protects and How It Works',
    description: 'How PPF protects your car from chips and scratches: installation process, zone selection, and real results in Tbilisi conditions.',
  },

  'ka/blog/protection-against-uv-rays-scratches': {
    title: 'ვინილი თუ PPF: რა იცავს უკეთ UV-ის, ნაკაწრებისა და ნაკენჭარებისგან',
    description: 'გაიგეთ რით განსხვავდება ვინილის ფირი და PPF, რომელი სჯობს ვიზუალისთვის და რომელი უკეთ იცავს ძარას UV-ისგან, ნაკაწრებისგან და ნაკენჭარებისგან.',
  },
  'ru/blog/protection-against-uv-rays-scratches': {
    title: 'Пленка для кузова: защита от сколов, царапин и UV',
    description: 'Как виниловая плёнка защищает кузов от UV-лучей, царапин и мелких сколов, сравнение с другими способами защиты.',
  },
  'en/blog/protection-against-uv-rays-scratches': {
    title: 'Paint Protection: Scratches, Chips, UV Explained',
    description: 'How vinyl wrap shields paint from UV rays and minor scratches: compared with other protection methods.',
  },

  'ka/blog/replace-or-repair': {
    title: 'საქარე მინა: როდის შევაკეთოთ და როდის შევცვალოთ',
    description: 'გადაწყვეტის გიდი — დაზიანების ზომა, მდებარეობა, მძღოლის ხედვის ზონა, უსაფრთხოება და ხარჯი. გაიგეთ, როდის შეიძლება შეკეთება და როდის სჯობს მინის შეცვლა.',
  },
  'ru/blog/replace-or-repair': {
    title: 'Ремонт или замена лобового стекла: когда что нужно',
    description: 'Когда скол на лобовом стекле можно отремонтировать, а когда нужна замена, критерии размера, расположения и безопасности.',
  },
  'en/blog/replace-or-repair': {
    title: 'Windshield Repair or Replace: When Which One?',
    description: 'When a windshield chip can be repaired vs. when replacement is needed: size criteria, location, and safety considerations.',
  },

  'ka/blog/service-on-ppf-wrapped-car': {
    title: 'PPF ფირის მოვლა: როგორ დავრეცხოთ და როგორ ავიცილოთ დაზიანება',
    description: 'როგორ მოვუაროთ PPF ფირს სწორად: რეცხვის სიხშირე, უსაფრთხო ქიმია, pressure wash-ის წესები, რა აზიანებს ფირს და როდის სჭირდება სტუდიის შემოწმება.',
  },
  'ru/blog/service-on-ppf-wrapped-car': {
    title: 'Уход за авто с защитной пленкой (PPF): как мыть',
    description: 'Как правильно мыть и обслуживать автомобиль с PPF, чтобы сохранить защитные свойства плёнки на весь срок службы.',
  },
  'en/blog/service-on-ppf-wrapped-car': {
    title: 'PPF Care: How to Wash and Maintain It',
    description: 'How to properly wash and maintain a PPF-wrapped car to preserve its protective properties for the full service life.',
  },

  'ka/blog/soft-vs-abrasive-polishing': {
    title: 'რბილი თუ ღრმა პოლირება: რა განსხვავებაა',
    description: 'მსუბუქი და ღრმა პოლირების განსხვავება: როდის რომელია საჭირო, რამდენად ინტენსიურია კორექცია და რა დაცვა სჭირდება შედეგის შესანარჩუნებლად.',
  },
  'ru/blog/soft-vs-abrasive-polishing': {
    title: 'Мягкая или глубокая полировка: в чем разница',
    description: 'Мягкая или глубокая полировка: чем отличаются, сколько лака снимают и какой вариант подходит автомобилюмобилю.',
  },
  'en/blog/soft-vs-abrasive-polishing': {
    title: 'Light vs Heavy Polishing: What’s the Difference?',
    description: 'Soft vs. deep polishing: differences, how much clear coat each removes, and which option suits your car.',
  },

  'ka/blog/soundproofing-process': {
    title: 'ხმის იზოლაცია: როგორ კეთდება, ეტაპებად',
    description: 'როგორ მიმდინარეობს ავტომობილის ხმის იზოლაცია ეტაპობრივად: დაშლა, მასალების მონტაჟი, აწყობა და შედეგის შემოწმება.',
  },
  'ru/blog/soundproofing-process': {
    title: 'Как делают шумоизоляцию авто: этапы работ',
    description: 'Как проходит шумоизоляция автомобиля шаг за шагом: разборка, укладка материалов, сборка и проверка результата.',
  },

  'ka/blog/strength-and-useful-life-of-ppf': {
    title: 'რამდენ ხანს ძლებს დამცავი ფირი (PPF)?',
    description: 'რამდენ ხანს ძლებს PPF ფირი პრაქტიკაში, რა ფაქტორები მოქმედებს მის რესურსზე საქართველოში და როდის ღირს მისი შეცვლა.',
  },
  'ru/blog/strength-and-useful-life-of-ppf': {
    title: 'Сколько служит защитная пленка (PPF) на авто',
    description: 'Как долго служит PPF на автомобиле, от чего зависит срок службы и когда пора менять плёнку, данные по Грузии.',
  },
  'en/blog/strength-and-useful-life-of-ppf': {
    title: 'How Long Does PPF Last? Durability Explained',
    description: 'How long PPF lasts on a car, what affects its lifespan in Georgia, and when it makes sense to replace worn film.',
  },

  'ka/blog/summer-car-care-georgia': {
    title: 'ავტომობილი ზაფხულისთვის: ჩეკლისტი და დაცვა',
    description: 'საქართველოს ზაფხული ავტომობილს ერთდროულად უქმნის რამდენიმე რისკს: ძლიერი UV, სიცხე, ბიტუმი, მწერები და ზღვის მარილი.',
  },
  'en/blog/summer-car-care-georgia': {
    title: 'Summer Car Care in Georgia: Checklist',
    description: 'Summer car care checklist for Georgia: protecting paint, interior, and glass from heat, dust, and mountain roads.',
  },

  'ka/blog/technology-and-process': {
    title: 'კერამიკული დაფარვა: დადების პროცესი და ტექნოლოგია',
    description: 'როგორ მუშაობს კერამიკული საფარი, რისგან შედგება და როგორ მიმდინარეობს მისი პროფესიონალური დატანა სტუდიაში.',
  },
  'ru/blog/technology-and-process': {
    title: 'Керамическое покрытие авто: технология нанесения',
    description: 'Как работает керамическое покрытие на молекулярном уровне, из чего состоит и как проходит нанесение в студии.',
  },
  'en/blog/technology-and-process': {
    title: 'Ceramic Coating: Application Process Explained',
    description: 'How ceramic coating works at the molecular level: composition, bonding process, and professional application steps.',
  },

  'ka/blog/top-11-reasons': {
    title: 'მანქანის მინების დაბურვის 11 მთავარი უპირატესობა თბილისში',
    description: 'რატომ ღირს მანქანის მინების დაბურვა თბილისში: 11 მთავარი უპირატესობა, კომფორტი, UV დაცვა, პრივატულობა, ხილვადობა და актუальные цены BESTAUTO-ში.',
  },
  'ru/blog/top-11-reasons': {
    title: 'Преимущества тонировки стекол автомобиля: 11 причин',
    description: '11 причин затонировать стёкла автомобиля: от защиты салона до комфорта вождения в жарком климате Грузии.',
  },
  'en/blog/top-11-reasons': {
    title: '11 Benefits of Window Tinting',
    description: '11 practical reasons to tint your car windows: from interior protection to driving comfort in Georgia',
  },

  'ka/blog/top-5-car-paint-protection': {
    title: 'ტოპ 5 ძარის დაცვის ვარიანტი საქართველოში',
    description: 'ძარის დაცვის 5 მეთოდის შედარება: ფასი, რეალური გამძლეობა, მექანიკური დაცვა და მოვლის სირთულე საქართველოში.',
  },
  'ru/blog/top-5-car-paint-protection': {
    title: 'Топ-5 защиты кузова авто в Грузии: рейтинг',
    description: 'Рейтинг способов защиты кузова в Грузии: PPF, керамика, винил и воск, сравнение по цене, сроку и эффективности.',
  },
  'en/blog/top-5-car-paint-protection': {
    title: 'Top 5 Paint Protection Options in Georgia',
    description: 'Ranking paint protection methods in Georgia: PPF, ceramic, vinyl, wax: compared by price, durability, and effectiveness.',
  },

  'ka/blog/vehicle-tinting-techniques': {
    title: 'მანქანის მინების დაბურვა თბილისში — ფირის ტიპები, პროცესი, მოვლა და ფასი',
    description: 'გაიგეთ როგორ ხდება მანქანის მინების დაბურვა, რა განსხვავებაა dyed, metalized და ceramic ფირებს შორის, როგორ ავირჩიოთ სწორი ვარიანტი და რა მოვლა სჭირდება მონტაჟის შემდეგ თბილისში.',
  },
  'ru/blog/vehicle-tinting-techniques': {
    title: 'Тонировка стекол авто: виды, техники, отличия',
    description: 'Основные техники тонировки стёкол: виды плёнок, методы нанесения и на что обратить внимание при выборе в Грузии.',
  },
  'en/blog/vehicle-tinting-techniques': {
    title: 'Window Tinting Techniques: Types and Differences',
    description: 'Main window tinting techniques: film types, application methods, and what to consider when choosing in Georgia.',
  },

  'ka/blog/why-soundproof-car': {
    title: 'მანქანის ხმის იზოლაცია თბილისში: რატომ ღირს და რა შედეგს იძლევა',
    description: 'მანქანის ხმის იზოლაცია თბილისში: რა ზონებზე კეთდება, რა შედეგს უნდა ელოდოთ, რა ღირს სრული და ნაწილობრივი იზოლაცია და ვის სჭირდება ყველაზე მეტად.',
  },
  'ru/blog/why-soundproof-car': {
    title: 'Шумоизоляция авто: зачем она нужна и что дает',
    description: 'Зачем нужна шумоизоляция автомобиля: влияние шума на комфорт, типичные источники и что меняется после обработки.',
  },
  'en/blog/why-soundproof-car': {
    title: 'Why Soundproof a Car? Benefits Explained',
    description: 'Why car soundproofing matters: how noise affects comfort, common noise sources, and what changes after professional treatment.',
  },

  'ka/blog/why-use-car-diagnostic-test': {
    title: 'კომპიუტერული დიაგნოსტიკა თბილისში: რატომ არის საჭირო და რას გვიჩვენებს',
    description: 'როდის უნდა გააკეთოთ კომპიუტერული დიაგნოსტიკა, რა შეცდომებს აჩვენებს, რას ვერ გეტყვით მხოლოდ სკანერი და რა ღირს სრული დიაგნოსტიკა BESTAUTO-ში.',
  },
  'ru/blog/why-use-car-diagnostic-test': {
    title: 'Зачем нужна компьютерная диагностика авто',
    description: 'Что показывает компьютерная диагностика авто, когда её делать и какие проблемы она выявляет до того, как станут критичными.',
  },
  'en/blog/why-use-car-diagnostic-test': {
    title: 'Why Car Computer Diagnostics Matter',
    description: 'What a car diagnostic test reveals, when to schedule one, and what issues it catches before they become critical.',
  },

  'ka/blog/window-tinting-care': {
    title: 'დაბურული მინების მოვლა: როდის შეიძლება გარეცხვა და რა არ უნდა გააკეთოთ',
    description: 'პრაქტიკული წესები დაბურული მინების მოვლაზე: პირველი დღეები, უსაფრთხო რეცხვა, აკრძალული ქიმია, რა აზიანებს ფირს და როგორ შევინარჩუნოთ შედეგი დიდხანს.',
  },
  'ru/blog/window-tinting-care': {
    title: 'Как ухаживать за тонированными стеклами',
    description: 'Как ухаживать за тонированными стёклами: правильная мойка, чего избегать и как продлить срок службы тонировки.',
  },
  'en/blog/window-tinting-care': {
    title: 'How to Care for Tinted Windows',
    description: 'How to care for tinted windows: proper cleaning, what to avoid, and how to extend the lifespan of your tint.',
  },

  'ka/blog/windshield-repair-benefits': {
    title: 'საქარე მინის ნაკენჭარის შეკეთება: სარგებელი და როდის ჯობს',
    description: 'რატომ ჯობს ნაკენჭარის დროული შეკეთება: უსაფრთხოება, ხარჯი, დრო და როდის არის შეცვლა აუცილებელი.',
  },
  'ru/blog/windshield-repair-benefits': {
    title: 'Почему лучше отремонтировать скол сразу',
    description: 'Преимущества ремонта сколов перед заменой стекла: экономия, скорость, сохранение заводской герметичности.',
  },
  'en/blog/windshield-repair-benefits': {
    title: 'Why Repair a Windshield Chip Early',
    description: 'Advantages of chip repair over windshield replacement: cost savings, speed, and preserving factory seal integrity.',
  },

};
