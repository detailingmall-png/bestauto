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
    title: 'ავტო დითეილინგი თბილისში — PPF, პოლირება, კერამიკა | BESTAUTO',
    description: 'პრემიუმ ავტო დითეილინგ სტუდია თბილისში. PPF ფირის გადაკვრა, ფერის შეცვლა ფირით, პოლირება, კერამიკული საფარი, მინების დაბურვა, ქიმწმენდა და 2 ლოკაცია თბილისში.',
  },
  'ru/': {
    title: 'Детейлинг в Тбилиси — оклейка защитной пленкой, полировка, тонировка | BESTAUTO',
    description: 'Премиальный детейлинг в Тбилиси: оклейка защитной пленкой, полировка, керамика, тонировка и химчистка. 2 студии, запись онлайн.',
    ogTitle: 'Детейлинг в Тбилиси — оклейка защитной пленкой, полировка, тонировка',
    ogDescription: 'Премиальный детейлинг в Тбилиси: оклейка защитной пленкой, полировка, керамика, тонировка и химчистка. 2 студии, запись онлайн.',
  },
  'en/': {
    title: 'Car Detailing in Tbilisi — PPF, Polishing, Tinting | BESTAUTO',
    description: 'Premium car detailing in Tbilisi: PPF, polishing, ceramic coating, tinting and interior cleaning. Two studios, book online.',
  },

  // ── Polishing ─────────────────────────────────────────────
  'ka/polishing': {
    title: 'მანქანის პოლირება თბილისში — ძარის 690 ₾-დან | BESTAUTO',
    description: 'მანქანის პოლირება (პალიროვკა) თბილისში: ძარის პოლირება 690 ₾-დან, ფარების 150 ₾-დან, საქარე მინის 250 ₾-დან. ჩაწერა ონლაინ.',
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
    title: 'PPF დამცავი ფირის გადაკვრა თბილისში — 10 წლის გარანტია | BESTAUTO',
    description: 'PPF პოლიურეთანის დამცავი ფირის გადაკვრა თბილისში. ძარის, კაპოტის დაცვა ნაკაწრებისა და ქვებისგან. თვითაღდგენა, 10 წლის გარანტია.',
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
    title: 'ვინილის ფირის გადაკვრა თბილისში — ფასები | BESTAUTO',
    description: 'მანქანის გადასაკრავი ვინილის ფირით თბილისში. ფერის შეცვლა ფირის გადაკვრით — გლანცი, მატი, სატინი, კარბონი. ფასები და ჩაწერა.',
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
    title: 'მანქანის ქიმწმენდა თბილისში — სალონი 400 ₾-დან | BESTAUTO',
    description: 'მანქანის სალონის ქიმწმენდა თბილისში: სავარძლები, ჭერი, ხალიჩები, პლასტიკი. საბურთალო და გლდანი. ფასები 400 ₾-დან.',
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
    title: 'საქარე მინის აღდგენა თბილისში — ლაბავოის შეკეთება | BESTAUTO',
    description: 'საქარე მინის აღდგენა და ნაკენჭარის შეკეთება თბილისში. ლაბავოის, შუშის ბზარების აღდგენა 60 ₾-დან. გამოძახებით.',
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
    description: 'მანქანის ხმის და ვიბრო იზოლაცია თბილისში: კარი, იატაკი, ჭერი, საბარგული. შუმა იზოლაცია 600 ₾-დან. 2 ლოკაცია.',
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
    title: 'ავტოსამრეცხაო თბილისში — მანქანის რეცხვა 40 ₾-დან | BESTAUTO',
    description: 'ავტოსამრეცხაო საბურთალოზე და გლდანში. მანქანის 2-ფაზიანი და 3-ფაზიანი დეტეილინგ რეცხვა 40 ₾-დან. ხელით, pH-ნეიტრალური ქიმია.',
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
    title: '10 შეცდომა, რომლებიც ავტომობილის საღებავ-ლაქის საფარს სწრაფად აფუჭებს',
    description: 'რა ჩვევები აზიანებს მანქანის ძარას ყველაზე ხშირად: ჯაგრისიანი რეცხვა, უხეში ქიმია, წყლის ლაქების იგნორირება, დაუცველი პოლირება და სხვა. პრაქტიკული რჩევები, როგორ შეინარჩუნოთ საღებავ-ლაქის საფარი კარგ მდგომარეობაში.',
  },
  'ru/blog/10-paint-mistakes': {
    title: '10 ошибок, которые быстрее всего портят лакокрасочное покрытие автомобиля',
    description: 'Какие привычки чаще всего вредят кузову: мойка со щетками, агрессивная химия, игнорирование водяных пятен, отсутствие защиты после полировки и другие ошибки. Практичные советы, как сохранить лакокрасочное покрытие в хорошем состоянии.',
  },
  'en/blog/10-paint-mistakes': {
    title: '10 Mistakes That Ruin Your Car’s Paintwork the Fastest',
    description: 'Which habits damage the body most often: brush washes, aggressive chemicals, ignoring water spots, leaving paint unprotected after polishing, and more. Practical tips to keep your paintwork in good condition.',
  },

  'ka/blog/benefits-of-vinyl-wraps': {
    title: 'ვინილის ფირის გადაკვრა: უპირატესობები, ესთეტიკა და მოვლა',
    description: 'ვინილის ფირი საშუალებას გაძლევთ შეცვალოთ ავტომობილის ვიზუალი შეღებვის გარეშე. გაიგეთ მისი მთავარი უპირატესობები, შეზღუდვები, მოვლის წესები და როდის ჯობს PPF.',
  },
  'ru/blog/benefits-of-vinyl-wraps': {
    title: 'Оклейка виниловой пленкой: преимущества, эстетика и уход',
    description: 'Виниловая пленка позволяет изменить внешний вид автомобиля без покраски. Разбираем ее главные преимущества, ограничения, правила ухода и случаи, когда лучше выбрать PPF.',
  },
  'en/blog/benefits-of-vinyl-wraps': {
    title: 'Vinyl Wrap: Benefits, Styling, and Maintenance',
    description: 'Vinyl film lets you change the look of a car without repainting. Learn its main advantages, limitations, care rules, and when PPF is the better option.',
  },

  'ka/blog/car-body-color-with-vinyl-wrap': {
    title: 'როგორ ცვლის ვინილის ფირი ავტომობილის იერსა და ფერს',
    description: 'ვინილის ფირი რეალურად როგორ ცვლის ავტომობილის ვიზუალს: ფერი, ფაქტურა, ბზინვარება, ჩრდილი, მატი, გლოსი და სატინი. გაიგეთ რა ჩანს მზეზე, რა ჩრდილში და რა გავლენას ახდენს მონტაჟის ხარისხი.',
  },
  'ru/blog/car-body-color-with-vinyl-wrap': {
    title: 'Как виниловая пленка меняет внешний вид и цвет автомобиля',
    description: 'Как виниловая пленка реально меняет визуальное восприятие автомобиля: цвет, фактуру, блеск, тень, мат, глянец и сатин. Разбираем, что видно на солнце, что в тени и почему так важен уровень монтажа.',
  },
  'en/blog/car-body-color-with-vinyl-wrap': {
    title: 'How Vinyl Wrap Changes the Look and Color of a Car',
    description: 'How vinyl wrap really changes a car’s visual perception: color, texture, gloss, shadow, matte, gloss, and satin. We break down what you see in sunlight, what changes in shade, and why installation quality matters so much.',
  },

  'ka/blog/car-body-polishing': {
    title: 'ძარას პოლირება თბილისში: რა დეფექტებს ასწორებს და როდის ღირს გაკეთება',
    description: 'გაიგეთ, რა დეფექტებს ასწორებს ძარას პოლირება, რით განსხვავდება მსუბუქი, საშუალო და ღრმა კორექცია, რა ღირს მომსახურება თბილისში და როდის ჯობს PPF დაცვა.',
  },
  'ru/blog/car-body-polishing': {
    title: 'Полировка кузова в Тбилиси: какие дефекты она убирает и когда ее стоит делать',
    description: 'Узнайте, какие дефекты устраняет полировка кузова, чем отличаются легкая, средняя и глубокая коррекция, сколько стоит услуга в Тбилиси и когда разумнее выбрать защиту PPF.',
  },
  'en/blog/car-body-polishing': {
    title: 'Car Body Polishing in Tbilisi: What Defects It Corrects and When It Makes Sense',
    description: 'Learn which paint defects body polishing can reduce, how light, medium, and deep correction differ, how much the service costs in Tbilisi, and when PPF protection is the smarter choice.',
  },

  'ka/blog/car-detailing-guide': {
    title: 'დეტეილინგი თბილისში: სრული გზამკვლევი ძარისა და სალონის მოვლისთვის | BESTAUTO',
    description: 'რა არის დეტეილინგი, რას მოიცავს გარე და შიდა მოვლა, როგორ ავირჩიოთ სწორი დაცვა, რა ჯდება მომსახურება თბილისში და რატომ არის PPF ყველაზე საიმედო გადაწყვეტა.',
  },
  'ru/blog/car-detailing-guide': {
    title: 'Детейлинг в Тбилиси: полный гид по уходу за кузовом и салоном | BESTAUTO',
    description: 'Что такое детейлинг, что включает внешний и внутренний уход, как выбрать правильную защиту, сколько стоят услуги в Тбилиси и почему PPF остается самым надежным решением.',
  },
  'en/blog/car-detailing-guide': {
    title: 'Car Detailing in Tbilisi: A Complete Guide to Exterior and Interior Care | BESTAUTO',
    description: 'What detailing is, what exterior and interior care include, how to choose the right protection, what services cost in Tbilisi, and why PPF remains the most reliable solution.',
  },

  'ka/blog/car-diagnostic-test-stages-and-methods': {
    title: 'კომპიუტერული დიაგნოსტიკა: ეტაპები, მეთოდები და შედეგი | BESTAUTO',
    description: 'როგორ ტარდება კომპიუტერული დიაგნოსტიკა: OBD სკანირება, შეცდომების დეკოდირება, live data, დამატებითი ტესტები და რეკომენდაციები. ფასი თბილისში — 50 GEL-დან.',
  },
  'ru/blog/car-diagnostic-test-stages-and-methods': {
    title: 'Компьютерная диагностика автомобиля: этапы, методы и результат | BESTAUTO',
    description: 'Как проводится компьютерная диагностика: OBD-сканирование, расшифровка ошибок, live data, дополнительные тесты и рекомендации. Цена в Тбилиси — от 50 GEL.',
  },
  'en/blog/car-diagnostic-test-stages-and-methods': {
    title: 'Computer Diagnostics for Cars: Stages, Methods, and Results | BESTAUTO',
    description: 'Learn how computer diagnostics are performed: OBD-II scanning, fault code reading, live data analysis, additional testing, and recommendations. A practical guide for drivers in Tbilisi.',
  },

  'ka/blog/car-interior-detailing-basics': {
    title: 'სალონის დეტეილინგი თბილისში: ძირითადი ეტაპები, სერვისები და რა ღირს',
    description: 'გაიგეთ, რა ეტაპებისგან შედგება სალონის დეტეილინგი, რით განსხვავდება ქიმწმენდისგან, როდის არის საჭირო ოზონით დეზინფექცია, ინტერიერის პოლირება ან შიდა კერამიკული საფარი და რა ღირს ეს სერვისები თბილისში.',
  },
  'ru/blog/car-interior-detailing-basics': {
    title: 'Детейлинг салона в Тбилиси: основные этапы, услуги и сколько это стоит',
    description: 'Узнайте, из каких этапов состоит детейлинг салона, чем он отличается от химчистки, когда нужна дезинфекция озоном, полировка интерьерных деталей или внутреннее керамическое покрытие и сколько это стоит в Тбилиси.',
  },
  'en/blog/car-interior-detailing-basics': {
    title: 'Interior Detailing in Tbilisi: Main Stages, Services, and Pricing',
    description: 'Learn which stages interior detailing includes, how it differs from standard interior cleaning, when ozone disinfection, interior polishing, or interior ceramic coating are worth it, and what the service costs in Tbilisi.',
  },

  'ka/blog/car-interior-disinfection': {
    title: 'სალონის დეზინფექცია და სუნის მოცილება: ოზონირება, როდის არის საჭირო და რა შედეგს უნდა ელოდოთ',
    description: 'როგორ მუშაობს მანქანის სალონის ოზონირება, როდის არის საჭირო, რას შლის რეალურად და როდის ჯობს ქიმწმენდა + ოზონირება. აქტუალური ფასები BESTAUTO-ს მიხედვით.',
  },
  'ru/blog/car-interior-disinfection': {
    title: 'Дезинфекция салона и удаление запахов: озонирование, когда оно нужно и какого результата ждать',
    description: 'Как работает озонирование салона автомобиля, когда оно действительно нужно, что оно убирает на практике и когда лучше выбрать химчистку плюс озонирование. Актуальные цены по BESTAUTO.',
  },
  'en/blog/car-interior-disinfection': {
    title: 'Interior Disinfection and Odor Removal: Ozone Treatment, When It Is Needed, and What Results to Expect',
    description: 'How car interior ozone treatment works, when it is actually useful, what it removes in practice, and when interior deep cleaning plus ozone treatment is the better choice. Current BESTAUTO pricing included.',
  },

  'ka/blog/car-interior-polishing': {
    title: 'ინტერიერის ელემენტების გაპრიალება: რა ნაწილები, რა შედეგი, რა შეზღუდვები',
    description: 'ინტერიერის პლასტმასის, piano black-ის და დეკორის გაპრიალება ამცირებს მცირე ნაკაწრებს და აბრუნებს სუფთა იერს. ვხსნით პროცესს, შედეგს, შეზღუდვებს და ფასს თბილისში.',
  },
  'ru/blog/car-interior-polishing': {
    title: 'Полировка элементов интерьера: какие детали, какой результат и какие ограничения',
    description: 'Полировка интерьерного пластика, piano black и декоративных элементов уменьшает мелкие царапины и возвращает аккуратный вид. Разбираем процесс, результат, ограничения и цену в Тбилиси.',
  },
  'en/blog/car-interior-polishing': {
    title: 'Interior Element Polishing: Which Parts, What Results, and What the Limits Are',
    description: 'Polishing interior plastic, piano black trim, and decorative panels helps reduce fine scratches and restore a cleaner look. We explain the process, expected results, limitations, and pricing in Tbilisi.',
  },

  'ka/blog/ceramic-coating-care': {
    title: 'კერამიკული საფარის მოვლა: როგორ დავრეცხოთ, რას მოვერიდოთ და როგორ შევინარჩუნოთ ეფექტი',
    description: 'კერამიკიანი ავტომობილის მოვლის პრაქტიკული გზამკვლევი: პირველი დღეები დატანის შემდეგ, სწორი რეცხვა, pH-ნეიტრალური ქიმია, refresh და რა აზიანებს საფარს ყველაზე ხშირად.',
  },
  'en/blog/ceramic-coating-care': {
    title: 'Ceramic Coating Care: How to Wash the Car, What to Avoid, and How to Preserve the Effect',
    description: 'A practical guide to caring for a ceramic-coated vehicle: the first days after application, correct washing, pH-neutral chemistry, refresh maintenance, and the mistakes that most often weaken the coating.',
  },

  'ru/blog/ceramic-coating-cost-tbilisi': {
    title: 'Сколько стоит керамическое покрытие в Тбилиси в 2026 году — цены, сравнение и что выбрать',
    description: 'Сколько стоит керамическое покрытие автомобиля в Тбилиси в 2026 году, от чего зависит цена, когда разумно выбирать полировку + керамику, а когда лучше смотреть в сторону PPF для более серьезной защиты.',
  },

  'ka/blog/ceramic-coating-durability': {
    title: 'რამდენ ხანს ძლებს კერამიკული საფარი ავტომობილზე — რეალური ვადა საქართველოში',
    description: 'რამდენ ხანს ძლებს კერამიკული საფარი რეალურად, რატომ არ ემთხვევა რეკლამა ყოველდღიურ შედეგს, რას ცვლის მოვლა და როდის ჯობს PPF უფრო სერიოზული დაცვისთვის.',
  },
  'en/blog/ceramic-coating-durability': {
    title: 'How Long Does Ceramic Coating Really Last on a Car? — A Practical Lifespan for Georgia',
    description: 'How long does ceramic coating really last, why marketing claims do not always match daily use, how care affects longevity, and when it makes more sense to choose PPF for stronger protection.',
  },

  'ka/blog/ceramic-coating-for-car': {
    title: 'კერამიკული საფარი ავტომობილის ძარაზე: უპირატესობები, გამძლეობა და მოვლა',
    description: 'რას აკეთებს კერამიკული საფარი რეალურად, რას ვერ აკეთებს, რამდენ ხანს ძლებს და როდის ჯობს PPF ფირი უფრო ძლიერი დაცვისთვის.',
  },
  'ru/blog/ceramic-coating-for-car': {
    title: 'Керамическое покрытие кузова автомобиля: преимущества, срок службы и уход',
    description: 'Что реально дает керамическое покрытие, чего оно не делает, сколько держится и когда для более сильной защиты лучше выбрать PPF-пленку.',
  },
  'en/blog/ceramic-coating-for-car': {
    title: 'Ceramic Coating for a Car Body: Benefits, Service Life, and Maintenance',
    description: 'What ceramic coating actually does, what it does not do, how long it lasts, and when PPF film is the better choice for stronger protection.',
  },

  'ru/blog/ceramic-coating-maintenance': {
    title: 'Уход за керамическим покрытием: как мыть автомобиль, чего избегать и как сохранить эффект',
    description: 'Практический гид по уходу за автомобилем с керамикой: первые дни после нанесения, правильная мойка, pH-нейтральная химия, refresh и ошибки, которые чаще всего ослабляют покрытие.',
  },

  'ka/blog/ceramic-coating-tbilisi': {
    title: 'რა ღირს კერამიკული საფარი თბილისში 2026 წელს — ფასები, შედარება, რა ჯობს',
    description: 'რა ღირს ავტომობილის კერამიკული საფარი თბილისში 2026 წელს, რაზეა დამოკიდებული ფასი, როდის ჯობს პოლირება + კერამიკა და როდის სჯობს PPF უფრო სერიოზული დაცვისთვის.',
  },
  'en/blog/ceramic-coating-tbilisi': {
    title: 'How Much Does Ceramic Coating Cost in Tbilisi in 2026 — Prices, Comparison, and What to Choose',
    description: 'How much does ceramic coating cost in Tbilisi in 2026? We explain what affects the price, when polishing + ceramic makes sense, and when PPF is the smarter choice for stronger protection.',
  },

  'ka/blog/ceramic-for-car-glass': {
    title: 'მინებზე კერამიკული საფარი თბილისში — ანტირაინი, ხილვადობა, ფასი და გამძლეობა',
    description: 'მინებზე კერამიკული საფარი აუმჯობესებს ხილვადობას წვიმაში, ამცირებს წყლის და ჭუჭყის შეჩერებას და ამარტივებს მოვლას. გაიგეთ როგორ მუშაობს ანტირაინი, რამდენ ხანს ძლებს და რა ღირს თბილისში.',
  },
  'ru/blog/ceramic-for-car-glass': {
    title: 'Керамика на стекла в Тбилиси — антидождь, видимость, цена и срок службы',
    description: 'Керамическое покрытие для стекол улучшает видимость в дождь, уменьшает задержку воды и грязи и упрощает уход. Узнайте, как работает антидождь, сколько держится и сколько стоит в Тбилиси.',
  },
  'en/blog/ceramic-for-car-glass': {
    title: 'Glass Ceramic Coating in Tbilisi — Rain Repellent, Visibility, Price, and Durability',
    description: 'Ceramic coating for car glass improves visibility in the rain, reduces water and dirt buildup, and makes maintenance easier. Learn how rain repellent works, how long it lasts, and what it costs in Tbilisi.',
  },

  'ka/blog/detailing-cost-tbilisi': {
    title: 'რა ღირს ავტო დეტეილინგი თბილისში 2026 წელს — ფასები, პაკეტები და რა შედის',
    description: 'რა ღირს დეტეილინგი თბილისში 2026 წელს: ხელით რეცხვა, ქიმწმენდა, პოლირება, კერამიკა, PPF და ტონირება. გაიგეთ რა განსაზღვრავს ფასს და რომელი პაკეტია პრაქტიკული თქვენი ავტომობილისთვის.',
  },
  'ru/blog/detailing-cost-tbilisi': {
    title: 'Сколько стоит автодетейлинг в Тбилиси в 2026 году — цены, пакеты и что входит',
    description: 'Сколько стоит детейлинг в Тбилиси в 2026 году: ручная мойка, химчистка, полировка, керамика, PPF и тонировка. Узнайте, что влияет на цену и какой пакет практичен именно для вашего автомобиля.',
  },
  'en/blog/detailing-cost-tbilisi': {
    title: 'How Much Car Detailing Costs in Tbilisi in 2026 — Prices, Packages, and What Is Included',
    description: 'How much detailing costs in Tbilisi in 2026: hand wash, interior detailing, polishing, ceramic coating, PPF, and window tint. Learn what affects the price and which package makes the most sense for your car.',
  },

  'ka/blog/efficiency-of-windshield-repair': {
    title: 'საქარე მინის ნაკენჭარის და ბზარის შეკეთება თბილისში — როდის ღირს რემონტი | BESTAUTO',
    description: 'გაიგეთ რომელი ნაკენჭარი ან ბზარი ექვემდებარება შეკეთებას, როდის აღარ ღირს რემონტი და რა ღირს საქარე მინის აღდგენა თბილისში BESTAUTO-ში.',
  },
  'ru/blog/efficiency-of-windshield-repair': {
    title: 'Ремонт сколов и трещин на лобовом стекле в Тбилиси — когда он действительно оправдан | BESTAUTO',
    description: 'Какие сколы и трещины на лобовом стекле подлежат ремонту, когда восстановление уже нецелесообразно и сколько стоит ремонт стекла в BESTAUTO в Тбилиси.',
  },
  'en/blog/efficiency-of-windshield-repair': {
    title: 'Windshield Chip and Crack Repair in Tbilisi — When Repair Is Actually Worth It | BESTAUTO',
    description: 'Which chips and cracks in a windshield can be repaired, when restoration is no longer worth it, and how much windshield repair costs at BESTAUTO in Tbilisi.',
  },

  'ka/blog/engine-room-cleaning': {
    title: 'ძრავის განყოფილების წმენდა თბილისში — როდის არის საჭირო და როგორ კეთდება უსაფრთხოდ',
    description: 'გაიგეთ როდის არის საჭირო ძრავის განყოფილების წმენდა, რა სარგებელი აქვს პროცედურას, რა რისკებია არასწორი რეცხვისას და როგორ უნდა იყოს დაცული სენსორები, ელექტრონიკა და კონექტორები.',
  },
  'ru/blog/engine-room-cleaning': {
    title: 'Чистка моторного отсека в Тбилиси — когда нужна и как выполняется безопасно',
    description: 'Узнайте, когда действительно нужна чистка моторного отсека, какую пользу она дает, какие есть риски при неправильной мойке и как должны быть защищены датчики, электроника и разъемы.',
  },
  'en/blog/engine-room-cleaning': {
    title: 'Engine Bay Cleaning in Tbilisi — When You Need It and How to Do It Safely',
    description: 'Learn when engine bay cleaning is really necessary, what benefits it offers, what risks come with improper washing, and how sensors, electronics, and connectors should be protected.',
  },

  'ka/blog/errors-to-find': {
    title: 'რა შეიძლება აჩვენოს ავტომობილის კომპიუტერულმა დიაგნოსტიკამ | BESTAUTO',
    description: 'რა სისტემებს ამოწმებს კომპიუტერული დიაგნოსტიკა, რა შეცდომებს აჩვენებს სკანერი და როდის უნდა ჩაიწეროთ შემოწმებაზე თბილისში. პრაქტიკული გზამკვლევი BESTAUTO-სგან.',
  },
  'ru/blog/errors-to-find': {
    title: 'Что может показать компьютерная диагностика автомобиля | BESTAUTO',
    description: 'Какие системы проверяет компьютерная диагностика, какие ошибки показывает сканер и когда стоит записаться на проверку в Тбилиси. Практическое руководство от BESTAUTO.',
  },
  'en/blog/errors-to-find': {
    title: 'What Computer Diagnostics Can Reveal About a Car | BESTAUTO',
    description: 'Which systems computer diagnostics can check, what types of faults the scanner can detect, and when it makes sense to book a diagnostic check in Tbilisi.',
  },

  'ka/blog/headlight-polishing': {
    title: 'ფარების პოლირება თბილისში — როდის არის საჭირო, როგორ კეთდება და როგორ შევინარჩუნოთ შედეგი',
    description: 'ფარების პოლირება აღადგენს გამჭვირვალობას, აუმჯობესებს ღამის ხილვადობას და აახალგაზრდავებს ავტომობილის იერს. გაიგეთ როდის ღირს პოლირება, როდის არა და რატომ არის დაცვა ფირით საუკეთესო გაგრძელება.',
  },
  'ru/blog/headlight-polishing': {
    title: 'Полировка фар в Тбилиси — когда нужна, как выполняется и как сохранить результат',
    description: 'Полировка фар возвращает прозрачность, улучшает видимость ночью и освежает внешний вид автомобиля. Разбираем, когда она действительно помогает, когда уже нет и почему защита пленкой — лучшее продолжение после восстановления.',
  },
  'en/blog/headlight-polishing': {
    title: 'Headlight Polishing in Tbilisi: When It Is Needed, How It Is Done, and How to Preserve the Result',
    description: 'Headlight polishing restores clarity, improves nighttime visibility, and refreshes a car’s appearance. We explain when it really helps, when it no longer does, and why film protection is the best next step after restoration.',
  },

  'ka/blog/hints-for-vinyl-wrapped-cars': {
    title: 'ვინილის ფირის მოვლა: რეცხვა, ქიმია და აკრძალული პროდუქტები',
    description: 'როგორ მოვუაროთ ვინილის ფირით დაფარულ ავტომობილს: რეცხვის წესები, რა ქიმია არ შეიძლება, რით განსხვავდება მატე და პრიალა ვინილი და როგორ შევინარჩუნოთ ფირის იერი დიდხანს.',
  },
  'ru/blog/hints-for-vinyl-wrapped-cars': {
    title: 'Уход за виниловой пленкой: мойка, химия и запрещенные средства',
    description: 'Как ухаживать за автомобилем, оклеенным винилом: правила мойки, какая химия нежелательна, чем отличается уход за матовым и глянцевым винилом и как надолго сохранить аккуратный вид пленки.',
  },
  'en/blog/hints-for-vinyl-wrapped-cars': {
    title: 'Vinyl Wrap Care: Washing, Chemicals, and Products to Avoid',
    description: 'How to care for a vinyl-wrapped car: washing rules, which chemicals to avoid, how matte and gloss vinyl require different treatment, and how to keep the wrap looking clean for as long as possible.',
  },

  'ru/blog/how-long-ceramic-coating-lasts': {
    title: 'Сколько реально держится керамическое покрытие на автомобиле — практический срок для Грузии',
    description: 'Сколько реально служит керамическое покрытие, почему рекламные обещания не всегда совпадают с повседневной эксплуатацией, как влияет уход и когда разумнее выбрать PPF для более серьезной защиты.',
  },

  'ka/blog/how-often-polish-car': {
    title: 'რამდენად ხშირად უნდა გააპრიალოთ ავტომობილი თბილისში — პრაქტიკული გიდი',
    description: 'რამდენად ხშირად სჭირდება მანქანას პოლირება თბილისში? გაიგეთ, რაზეა დამოკიდებული სიხშირე, როგორ ცვლის მოვლას კერამიკა და რატომ ამცირებს PPF დამცავი ფირი ხშირი პოლირების საჭიროებას.',
  },
  'ru/blog/how-often-polish-car': {
    title: 'Как часто нужно полировать автомобиль в Тбилиси — практический гид',
    description: 'Как часто машине нужна полировка в Тбилиси? Разбираем, от чего зависит интервал, как на него влияют мойка, керамика и почему PPF-пленка заметно снижает потребность в частой полировке.',
  },
  'en/blog/how-often-polish-car': {
    title: 'How Often Should You Polish a Car in Tbilisi — A Practical Guide',
    description: 'How often does a car need polishing in Tbilisi? We explain what really affects the interval, how washing and ceramic coating change the picture, and why PPF can greatly reduce the need for frequent polishing.',
  },

  'ka/blog/how-to-choose-detailing-studio': {
    title: 'როგორ ავირჩიოთ დეტეილინგ სტუდია თბილისში — 7 კრიტერიუმი',
    description: 'როგორ ავირჩიოთ დეტეილინგ სტუდია: 7 პრაქტიკული კრიტერიუმი, კითხვები სტუდიისთვის, რა უნდა შეამოწმოთ ადგილზე და რატომ არის PPF ხარისხის ყველაზე კარგი ტესტი.',
  },
  'ru/blog/how-to-choose-detailing-studio': {
    title: 'Как выбрать детейлинг-студию в Тбилиси — 7 критериев',
    description: 'Как выбрать детейлинг-студию: 7 практических критериев, какие вопросы задавать, что проверять на месте и почему именно PPF лучше всего показывает реальный уровень качества.',
  },
  'en/blog/how-to-choose-detailing-studio': {
    title: 'How to Choose a Detailing Studio in Tbilisi — 7 Criteria',
    description: 'How to choose a detailing studio: 7 practical criteria, what questions to ask, what to check on-site, and why PPF is the clearest test of real quality.',
  },

  'ka/blog/interior-ceramic-coating': {
    title: 'ინტერიერის კერამიკული საფარი: დაცვა ლაქებისა და ცვეთისგან',
    description: 'რომელ ზედაპირებს იცავს სალონის კერამიკული საფარი, რამდენ ხანს ძლებს, რა შეზღუდვები აქვს და როდის ღირს მისი გაკეთება თბილისში.',
  },
  'ru/blog/interior-ceramic-coating': {
    title: 'Керамическое покрытие интерьера: защита от пятен и повседневного износа',
    description: 'Какие поверхности защищает керамическое покрытие салона, сколько оно держится, какие есть ограничения и когда его действительно стоит делать в Тбилиси.',
  },
  'en/blog/interior-ceramic-coating': {
    title: 'Interior Ceramic Coating: Protection from Stains and Everyday Wear',
    description: 'Learn which interior surfaces ceramic coating protects, how long it lasts, what its limitations are, and when it actually makes sense in Tbilisi.',
  },

  'ka/blog/interior-cleaning-for-auto': {
    title: 'სალონის ქიმწმენდა თბილისში: რა შედის, რა ღირს და როგორ შევინარჩუნოთ შედეგი',
    description: 'რას მოიცავს პროფესიონალური ქიმწმენდა, რამდენი დრო სჭირდება, რა მოქმედებს ფასზე და რა საწყისი ტარიფებია BESTAUTO-ს მიმდინარე ფასების მიხედვით.',
  },
  'ru/blog/interior-cleaning-for-auto': {
    title: 'Химчистка салона в Тбилиси: что входит, сколько стоит и как сохранить результат',
    description: 'Что включает профессиональная химчистка салона, сколько времени она занимает, от чего зависит цена и какие стартовые тарифы сейчас указаны у BESTAUTO.',
  },
  'en/blog/interior-cleaning-for-auto': {
    title: 'Car Interior Deep Cleaning in Tbilisi: What Is Included, How Much It Costs, and How to Keep the Result',
    description: 'What professional interior deep cleaning includes, how long it takes, what affects the price, and what starting rates are currently listed by BESTAUTO.',
  },

  'ka/blog/legal-aspects-of-tinting-in-georgia': {
    title: 'მინების დაბურვა საქართველოში: წესები, პროცენტები და ჯარიმები (2026)',
    description: 'რა დონის მინების დაბურვაა დაშვებული საქართველოში, რომელ მინებზე მოქმედებს შეზღუდვები, როგორ უნდა გაიგოთ პროცენტები სწორად და რას უნდა მიაქციოთ ყურადღება ჯარიმების თავიდან ასაცილებლად.',
  },
  'ru/blog/legal-aspects-of-tinting-in-georgia': {
    title: 'Тонировка стекол в Грузии: правила, проценты и штрафы (2026)',
    description: 'Какой уровень тонировки разрешен в Грузии, на какие стекла действуют ограничения, как правильно понимать проценты и на что обратить внимание, чтобы избежать штрафов.',
  },
  'en/blog/legal-aspects-of-tinting-in-georgia': {
    title: 'Window Tinting in Georgia: Rules, Percentages, and Fines (2026)',
    description: 'What tint level is allowed in Georgia, which windows are restricted, how to read percentages correctly, and what to watch out for to avoid fines.',
  },

  'ka/blog/new-car-detailing': {
    title: 'ახალი მანქანის დაცვა თბილისში — რა გავაკეთოთ პირველ რიგში | PPF, კერამიკა, პოლირება | BESTAUTO',
    description: 'როგორ დაიცვათ ახალი მანქანა სწორად პირველივე დღეებში: რა რიგითობით კეთდება რეცხვა, ზედაპირის მომზადება, PPF, კერამიკა და სალონის დაცვა. ფასები თბილისში და პრაქტიკული არჩევანი სხვადასხვა ბიუჯეტისთვის.',
  },
  'ru/blog/new-car-detailing': {
    title: 'Защита нового автомобиля в Тбилиси — что делать в первую очередь | PPF, керамика, полировка | BESTAUTO',
    description: 'Как правильно защитить новый автомобиль в первые дни: в какой последовательности делать мойку, подготовку поверхности, PPF, керамику и защиту салона. Практичный выбор для разного бюджета.',
  },
  'en/blog/new-car-detailing': {
    title: 'Protecting a New Car in Tbilisi — What to Do First | PPF, Ceramic Coating, Polishing | BESTAUTO',
    description: 'How to protect a new car correctly in the first days: in what order to wash, prepare the surface, apply PPF, ceramic coating, and interior protection. A practical choice for different budgets.',
  },

  'ka/blog/noisemakers-and-wayouts': {
    title: 'მანქანაში ხმაურის წყაროები: როგორ ვიპოვოთ მიზეზი და რა მუშაობს',
    description: 'საიდან მოდის სალონის ხმაური, როგორ ამოვიცნოთ წყარო სიმპტომებით და რომელი ზონების დამუშავება იძლევა ყველაზე დიდ ეფექტს ხმის იზოლაციაში.',
  },
  'ru/blog/noisemakers-and-wayouts': {
    title: 'Источники шума в автомобиле: как найти причину и что действительно работает',
    description: 'Откуда появляется шум в салоне, как определить источник по симптомам и какие зоны дают наибольший эффект при шумоизоляции.',
  },
  'en/blog/noisemakers-and-wayouts': {
    title: 'Sources of Noise in a Car: How to Find the Cause and What Actually Works',
    description: 'Where cabin noise comes from, how to identify the source by the symptoms, and which areas deliver the biggest effect when it comes to soundproofing.',
  },

  'ka/blog/polishing-after-repair': {
    title: 'ავტომობილის პოლირება ძარის შეკეთების შემდეგ: როდის შეიძლება და რა შედეგს უნდა ელოდოთ',
    description: 'როდის შეიძლება პოლირება ძარის შეკეთების შემდეგ, რას აგვარებს პროცესი და როდის ჯობს დამატებითი დაცვა კერამიკით ან PPF ფირით.',
  },
  'ru/blog/polishing-after-repair': {
    title: 'Полировка автомобиля после кузовного ремонта: когда можно делать и какого результата ждать',
    description: 'Когда можно полировать автомобиль после кузовного ремонта, какие задачи решает процедура и когда стоит добавить защиту керамикой или PPF-пленкой.',
  },
  'en/blog/polishing-after-repair': {
    title: 'Car Polishing After Body Repair: When You Can Do It and What Results to Expect',
    description: 'When a car can be polished after body repair, what the procedure actually solves, and when it makes sense to add ceramic coating or PPF film.',
  },

  'ka/blog/polishing-before-after': {
    title: 'რა იცვლება პოლირების შემდეგ: მანამდე და შემდეგ რეალური შედეგები | BESTAUTO',
    description: 'პოლირება ამცირებს მიკრონაკაწრებს, აუმჯობესებს ბზინვარებას და უფრო სუფთას ხდის ანარეკლს. ნახეთ რეალური მანამდე/შემდეგ მაგალითები და გაიგეთ, რას უნდა ელოდოთ პრაქტიკაში.',
  },
  'ru/blog/polishing-before-after': {
    title: 'Что меняется после полировки: реальные результаты до и после | BESTAUTO',
    description: 'Полировка уменьшает микрориски, усиливает блеск и делает отражение чище. Разбираем реальные эффекты «до/после», объясняем, что исчезает на практике, а что полировка не убирает.',
  },
  'en/blog/polishing-before-after': {
    title: 'What Changes After Polishing: Real Before-and-After Results | BESTAUTO',
    description: 'Polishing reduces micro-scratches, enhances gloss, and makes reflections cleaner. We break down real before-and-after effects, what actually disappears in practice, and what polishing cannot remove.',
  },

  'ka/blog/polishing-before-ceramic': {
    title: 'პოლირება კერამიკამდე: საჭიროა თუ არა და როდის არის აუცილებელი',
    description: 'საჭიროა თუ არა პოლირება კერამიკის წინ? გაიგეთ, როდის არის ის აუცილებელი, როდის შეიძლება გამოტოვება და როგორ მოვამზადოთ ავტომობილის ზედაპირი სწორი შედეგისთვის.',
  },
  'ru/blog/polishing-before-ceramic': {
    title: 'Полировка перед керамикой: нужна ли она и когда обязательна',
    description: 'Нужна ли полировка перед керамическим покрытием? Разбираем, когда без нее нельзя, когда ее можно пропустить и как правильно подготовить поверхность автомобиля для хорошего результата.',
  },
  'en/blog/polishing-before-ceramic': {
    title: 'Polishing Before Ceramic Coating: Is It Necessary and When Is It Essential?',
    description: 'Is polishing needed before ceramic coating? We explain when it is essential, when it can be skipped, and how to prepare a car’s surface properly for the best final result.',
  },

  'ka/blog/polishing-cost-tbilisi': {
    title: 'რა ღირს ავტომობილის პოლირება თბილისში 2026 წელს - ფასები, ტიპები და სწორი დაცვა',
    description: 'გაიგეთ რა ღირს ავტომობილის პოლირება თბილისში, რა განსხვავებაა მსუბუქ, საშუალო და ღრმა კორექციას შორის, რა მოქმედებს ფასზე და როდის სჯობს პოლირების შემდეგ კერამიკა ან PPF.',
  },
  'ru/blog/polishing-cost-tbilisi': {
    title: 'Сколько стоит полировка автомобиля в Тбилиси в 2026 году — цены, типы и правильная защита',
    description: 'Узнайте, сколько стоит полировка автомобиля в Тбилиси, чем отличается легкая, средняя и глубокая коррекция, что влияет на цену и когда после полировки лучше выбрать керамику или PPF.',
  },
  'en/blog/polishing-cost-tbilisi': {
    title: 'How Much Car Polishing Costs in Tbilisi in 2026 — Prices, Types, and the Right Protection',
    description: 'Learn how much car polishing costs in Tbilisi, the difference between light, medium, and deep correction, what affects the price, and when ceramic coating or PPF makes more sense after polishing.',
  },

  'ka/blog/ppf-benefits': {
    title: 'PPF ფირის უპირატესობები: რატომ ღირს ძარის დაცვა',
    description: 'გაიგეთ რა უპირატესობები აქვს PPF დამცავ ფირს, როდის ღირს მისი გადაკვრა, რა ნაწილებზე კეთდება ყველაზე ხშირად და რა ფასებია თბილისში BESTAUTO-ში.',
  },
  'ru/blog/ppf-benefits': {
    title: 'Преимущества PPF-пленки: почему стоит защитить кузов',
    description: 'Узнайте, какие преимущества дает защитная PPF-пленка, когда стоит ее клеить, какие зоны защищают чаще всего и какие цены актуальны сегодня в BESTAUTO в Тбилиси.',
  },
  'en/blog/ppf-benefits': {
    title: 'The Benefits of PPF Film: Why It Is Worth Protecting Your Car’s Bodywork',
    description: 'Learn what benefits protective PPF film offers, when it is worth installing, which zones are protected most often, and what prices are currently available at BESTAUTO in Tbilisi.',
  },

  'ka/blog/ppf-film-for-cars-protection': {
    title: 'PPF ფირით დაფარვა: როგორ იცავს ძარას ნაკაწრებისა და ნაკენჭარებისგან',
    description: 'რა არის PPF დამცავი ფირი, სად ჯობს მისი დაკვრა, რას იცავს რეალურად და რატომ არის მნიშვნელოვანი ხარისხიანი მონტაჟი და სწორი ბრენდის შერჩევა.',
  },
  'ru/blog/ppf-film-for-cars-protection': {
    title: 'Оклейка PPF-пленкой: как она защищает кузов от царапин и сколов',
    description: 'Что такое защитная PPF-пленка, где ее лучше клеить, от чего она действительно защищает и почему так важны качественный монтаж и правильный выбор бренда.',
  },
  'en/blog/ppf-film-for-cars-protection': {
    title: 'PPF Wrap: How It Protects the Body from Scratches and Stone Chips',
    description: 'What protective PPF film is, where it should be applied, what it really protects against, and why quality installation and the right brand choice matter so much.',
  },

  'ka/blog/protection-against-uv-rays-scratches': {
    title: 'ვინილი თუ PPF: რა იცავს უკეთ UV-ის, ნაკაწრებისა და ნაკენჭარებისგან',
    description: 'გაიგეთ რით განსხვავდება ვინილის ფირი და PPF, რომელი სჯობს ვიზუალისთვის და რომელი უკეთ იცავს ძარას UV-ისგან, ნაკაწრებისგან და ნაკენჭარებისგან.',
  },
  'ru/blog/protection-against-uv-rays-scratches': {
    title: 'Винил или PPF: что лучше защищает от UV, царапин и сколов',
    description: 'Узнайте, чем отличается виниловая пленка от PPF, что лучше подходит для внешнего вида и что эффективнее защищает кузов от UV, царапин и сколов.',
  },
  'en/blog/protection-against-uv-rays-scratches': {
    title: 'Vinyl or PPF: Which Protects Better from UV, Scratches, and Stone Chips?',
    description: 'Learn how vinyl wrap differs from PPF, which option is better for appearance, and which one protects the body more effectively from UV, scratches, and chips.',
  },

  'ka/blog/replace-or-repair': {
    title: 'საქარე მინა: როდის შევაკეთოთ და როდის შევცვალოთ',
    description: 'გადაწყვეტის გიდი — დაზიანების ზომა, მდებარეობა, მძღოლის ხედვის ზონა, უსაფრთხოება და ხარჯი. გაიგეთ, როდის შეიძლება შეკეთება და როდის სჯობს მინის შეცვლა.',
  },
  'ru/blog/replace-or-repair': {
    title: 'Лобовое стекло: когда ремонтировать, а когда менять',
    description: 'Практический гид по выбору: размер повреждения, расположение, зона обзора водителя, безопасность и стоимость. Разбираем, когда стекло можно отремонтировать, а когда лучше заменить.',
  },
  'en/blog/replace-or-repair': {
    title: 'Windshield: When to Repair It and When to Replace It',
    description: 'A practical guide to choosing between repair and replacement: damage size, location, driver’s line of sight, safety, and cost.',
  },

  'ka/blog/service-on-ppf-wrapped-car': {
    title: 'PPF ფირის მოვლა: როგორ დავრეცხოთ და როგორ ავიცილოთ დაზიანება',
    description: 'როგორ მოვუაროთ PPF ფირს სწორად: რეცხვის სიხშირე, უსაფრთხო ქიმია, pressure wash-ის წესები, რა აზიანებს ფირს და როდის სჭირდება სტუდიის შემოწმება.',
  },
  'ru/blog/service-on-ppf-wrapped-car': {
    title: 'Уход за PPF-пленкой: как мыть автомобиль и как избежать повреждений',
    description: 'Как правильно ухаживать за PPF-пленкой: частота мойки, безопасная химия, правила для высокого давления, что вредит пленке и когда стоит показать автомобиль студии.',
  },
  'en/blog/service-on-ppf-wrapped-car': {
    title: 'PPF Film Care: How to Wash Your Car and How to Avoid Damage',
    description: 'How to care for PPF film properly: washing frequency, safe chemicals, pressure washer rules, what damages the film, and when it is worth showing the car to a detailing studio.',
  },

  'ka/blog/soft-vs-abrasive-polishing': {
    title: 'მსუბუქი თუ ღრმა პოლირება — რა განსხვავებაა და როდის რომელია საჭირო | BESTAUTO',
    description: 'მსუბუქი და ღრმა პოლირების დეტალური შედარება: რა დეფექტებს ამცირებს თითოეული მეთოდი, როდის არის საჭირო უფრო ღრმა კორექცია და როგორ დავიცვათ შედეგი პოლირების შემდეგ.',
  },
  'ru/blog/soft-vs-abrasive-polishing': {
    title: 'Мягкая или глубокая полировка — в чем разница и когда какая нужна | BESTAUTO',
    description: 'Подробное сравнение мягкой и глубокой полировки: какие дефекты уменьшает каждый вариант, когда нужна более глубокая коррекция и как защитить результат после полировки.',
  },
  'en/blog/soft-vs-abrasive-polishing': {
    title: 'Soft vs Deep Polishing — What Is the Difference and When Do You Need Which One? | BESTAUTO',
    description: 'A detailed comparison of soft and deep polishing: which defects each option reduces, when deeper correction is justified, and how to protect the result afterward.',
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
    title: 'რამდენ ხანს ძლებს PPF ფირი: რეალური ვადა, გამძლეობა და როდის სჭირდება შეცვლა',
    description: 'გაიგეთ, რამდენ ხანს ძლებს PPF ფირი პრაქტიკაში, რა მოქმედებს მის გამძლეობაზე, როგორ მოვუაროთ სწორად, როდის არის ნაწილობრივი შეკეთება შესაძლებელი და რა ნიშნები მიუთითებს შეცვლის საჭიროებაზე.',
  },
  'ru/blog/strength-and-useful-life-of-ppf': {
    title: 'Сколько служит PPF-пленка: реальный срок, стойкость и когда ее пора менять',
    description: 'Узнайте, сколько на практике служит PPF-пленка, что влияет на ее долговечность, как правильно за ней ухаживать, когда возможен локальный ремонт и какие признаки говорят о необходимости замены.',
  },
  'en/blog/strength-and-useful-life-of-ppf': {
    title: 'How Long PPF Lasts: Real Lifespan, Durability, and When It Is Time to Replace It',
    description: 'Learn how long PPF film really lasts, what affects its durability, how to maintain it correctly, when local replacement is possible, and which signs mean it is time for renewal.',
  },

  'ka/blog/summer-car-care-georgia': {
    title: 'მანქანის მომზადება ზაფხულისთვის საქართველოში — დეტეილინგის სრული ჩეკ-ლისტი',
    description: 'როგორ მოვამზადოთ ავტომობილი ზაფხულისთვის საქართველოში: UV, მტვერი, მწერები, ზღვის მარილი, მთის გზები, PPF, კერამიკა, ტონირება და სალონის მოვლა — პრაქტიკული ჩეკ-ლისტი ერთი სტატიაში.',
  },
  'ru/blog/summer-car-care-georgia': {
    title: 'Подготовка автомобиля к лету в Грузии — полный чек-лист по детейлингу',
    description: 'Как подготовить автомобиль к лету в Грузии: UV, пыль, насекомые, морская соль, горные дороги, PPF, керамика, тонировка и уход за салоном — практичный чек-лист в одной статье.',
  },
  'en/blog/summer-car-care-georgia': {
    title: 'Preparing Your Car for Summer in Georgia — The Complete Detailing Checklist',
    description: 'How to prepare your car for summer in Georgia: UV, dust, insects, sea salt, mountain roads, PPF, ceramic coating, window tint, and interior care — all in one practical checklist.',
  },

  'ka/blog/technology-and-process': {
    title: 'კერამიკული საფარი თბილისში: როგორ მუშაობს, როგორ კეთდება და როდის ღირს',
    description: 'გაიგეთ, როგორ მუშაობს კერამიკული საფარი, რა ეტაპებით კეთდება მისი დატანა, როდის საჭიროა პოლირება და როდის ჯობს PPF უფრო ძლიერი დაცვისთვის.',
  },
  'ru/blog/technology-and-process': {
    title: 'Керамическое покрытие в Тбилиси: как оно работает, как наносится и когда стоит своих денег',
    description: 'Узнайте, как работает керамическое покрытие, из каких этапов состоит его нанесение, когда нужна полировка и когда PPF будет более сильной защитой.',
  },
  'en/blog/technology-and-process': {
    title: 'Ceramic Coating in Tbilisi: How It Works, How It Is Applied, and When It Is Worth It',
    description: 'Learn how ceramic coating works, which steps are involved in application, when polishing is needed, and when PPF is the stronger form of protection.',
  },

  'ka/blog/top-11-reasons': {
    title: 'მანქანის მინების დაბურვის 11 მთავარი უპირატესობა თბილისში',
    description: 'რატომ ღირს მანქანის მინების დაბურვა თბილისში: 11 მთავარი უპირატესობა, კომფორტი, UV დაცვა, პრივატულობა, ხილვადობა და актუальные цены BESTAUTO-ში.',
  },
  'ru/blog/top-11-reasons': {
    title: '11 главных преимуществ тонировки стекол автомобиля в Тбилиси',
    description: 'Почему стоит сделать тонировку стекол автомобиля в Тбилиси: 11 ключевых преимуществ, комфорт, UV-защита, приватность, обзор и актуальные цены в BESTAUTO.',
  },
  'en/blog/top-11-reasons': {
    title: '11 Main Benefits of Car Window Tinting in Tbilisi',
    description: 'Why it makes sense to tint your car windows in Tbilisi: 11 key benefits, more comfort, UV protection, privacy, better visibility, and current BESTAUTO prices.',
  },

  'ka/blog/top-5-car-paint-protection': {
    title: 'ძარის დაცვის 5 საუკეთესო გზა საქართველოში: PPF, კერამიკა, ვინილი თუ სხვა?',
    description: 'ვადარებთ ავტომობილის ძარის დაცვის 5 მთავარ ვარიანტს საქართველოში: PPF, კერამიკა, PPF + კერამიკა, ვინილი და რეგულარული დეტეილინგი. გაიგეთ, რომელი დაცვა ჯობს თქვენი მანქანისთვის საქართველოს პირობებში.',
  },
  'ru/blog/top-5-car-paint-protection': {
    title: '5 лучших способов защитить кузов автомобиля в Грузии: PPF, керамика, винил или что-то еще?',
    description: 'Сравниваем 5 самых популярных вариантов защиты кузова автомобиля в Грузии: PPF, керамику, PPF + керамику, винил и регулярный детейлинг. Разберем, какой вариант лучше именно для вашего сценария.',
  },
  'en/blog/top-5-car-paint-protection': {
    title: 'The 5 Best Ways to Protect Car Paint in Georgia: PPF, Ceramic Coating, Vinyl, or Something Else?',
    description: 'We compare the 5 most popular ways to protect a car body in Georgia: PPF, ceramic coating, PPF + ceramic coating, vinyl, and regular detailing. Find out which option suits your real-world use case best.',
  },

  'ka/blog/vehicle-tinting-techniques': {
    title: 'მანქანის მინების დაბურვა თბილისში — ფირის ტიპები, პროცესი, მოვლა და ფასი',
    description: 'გაიგეთ როგორ ხდება მანქანის მინების დაბურვა, რა განსხვავებაა dyed, metalized და ceramic ფირებს შორის, როგორ ავირჩიოთ სწორი ვარიანტი და რა მოვლა სჭირდება მონტაჟის შემდეგ თბილისში.',
  },
  'ru/blog/vehicle-tinting-techniques': {
    title: 'Тонировка стекол автомобиля в Тбилиси — виды пленок, процесс, уход и цена',
    description: 'Разбираем, как выполняется тонировка стекол автомобиля, чем отличаются dyed, metalized и ceramic пленки, как выбрать подходящий вариант и как ухаживать за стеклами после установки в Тбилиси.',
  },
  'en/blog/vehicle-tinting-techniques': {
    title: 'Car Window Tinting in Tbilisi — Film Types, Installation Process, Care, and Pricing',
    description: 'Learn how car window tinting is done, how dyed, metalized, and ceramic films differ, how to choose the right option, and how to care for tinted glass after installation in Tbilisi.',
  },

  'ka/blog/why-soundproof-car': {
    title: 'მანქანის ხმის იზოლაცია თბილისში: რატომ ღირს და რა შედეგს იძლევა',
    description: 'მანქანის ხმის იზოლაცია თბილისში: რა ზონებზე კეთდება, რა შედეგს უნდა ელოდოთ, რა ღირს სრული და ნაწილობრივი იზოლაცია და ვის სჭირდება ყველაზე მეტად.',
  },
  'ru/blog/why-soundproof-car': {
    title: 'Шумоизоляция автомобиля в Тбилиси: зачем она нужна и какой дает результат',
    description: 'Шумоизоляция автомобиля в Тбилиси: на каких зонах выполняется, какого эффекта ждать, сколько стоит полная и частичная шумоизоляция и кому она особенно полезна.',
  },
  'en/blog/why-soundproof-car': {
    title: 'Car Soundproofing in Tbilisi: Why It Matters and What Results to Expect',
    description: 'Car soundproofing in Tbilisi: which zones are treated, what kind of effect to expect, how much partial and full soundproofing costs, and who benefits from it most.',
  },

  'ka/blog/why-use-car-diagnostic-test': {
    title: 'კომპიუტერული დიაგნოსტიკა თბილისში: რატომ არის საჭირო და რას გვიჩვენებს',
    description: 'როდის უნდა გააკეთოთ კომპიუტერული დიაგნოსტიკა, რა შეცდომებს აჩვენებს, რას ვერ გეტყვით მხოლოდ სკანერი და რა ღირს სრული დიაგნოსტიკა BESTAUTO-ში.',
  },
  'ru/blog/why-use-car-diagnostic-test': {
    title: 'Компьютерная диагностика автомобиля в Тбилиси: зачем нужна и что показывает',
    description: 'Когда стоит делать компьютерную диагностику, какие ошибки она показывает, чего не скажет один только сканер и сколько стоит полная диагностика в BESTAUTO.',
  },
  'en/blog/why-use-car-diagnostic-test': {
    title: 'Car Computer Diagnostics in Tbilisi: Why It Matters and What It Shows',
    description: 'When you should run computer diagnostics, what kinds of errors it reveals, what a scanner alone cannot tell you, and how much full diagnostics costs at BESTAUTO.',
  },

  'ka/blog/window-tinting-care': {
    title: 'დაბურული მინების მოვლა: როდის შეიძლება გარეცხვა და რა არ უნდა გააკეთოთ',
    description: 'პრაქტიკული წესები დაბურული მინების მოვლაზე: პირველი დღეები, უსაფრთხო რეცხვა, აკრძალული ქიმია, რა აზიანებს ფირს და როგორ შევინარჩუნოთ შედეგი დიდხანს.',
  },
  'ru/blog/window-tinting-care': {
    title: 'Уход за тонированными стеклами: когда можно мыть и чего нельзя делать',
    description: 'Практические правила ухода за тонировкой: первые дни после установки, безопасная мойка, запрещенная химия, что вредит пленке и как надолго сохранить результат.',
  },
  'en/blog/window-tinting-care': {
    title: 'Caring for Tinted Windows: When You Can Wash Them and What You Should Not Do',
    description: 'Practical tint-care rules: the first days after installation, safe cleaning, chemicals to avoid, what damages window film, and how to keep the result looking clean for longer.',
  },

  'ka/blog/windshield-repair-benefits': {
    title: 'საქარე მინის ნაკენჭარის შეკეთება: სარგებელი და როდის ჯობს',
    description: 'რატომ ჯობს ნაკენჭარის დროული შეკეთება: უსაფრთხოება, ხარჯი, დრო და როდის არის შეცვლა აუცილებელი.',
  },
  'ru/blog/windshield-repair-benefits': {
    title: 'Ремонт скола на лобовом стекле: преимущества и когда он оправдан',
    description: 'Почему важно вовремя ремонтировать скол на лобовом стекле: безопасность, расходы, время и случаи, когда уже необходима замена.',
  },
  'en/blog/windshield-repair-benefits': {
    title: 'Windshield Chip Repair: Benefits and When It Makes Sense',
    description: 'Why it is worth repairing a windshield chip in time: safety, cost, time savings, and the cases where replacement is already the better choice.',
  },

};
