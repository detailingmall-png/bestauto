/**
 * FAQ data for each service page.
 * Used to generate FAQPage JSON-LD schema in seo.ts.
 * 3-5 questions per service × 3 languages (ka, ru, en).
 */

interface FaqItem {
  readonly question: Readonly<Record<string, string>>;
  readonly answer: Readonly<Record<string, string>>;
}

export const SERVICE_FAQS: Readonly<Record<string, ReadonlyArray<FaqItem>>> = {
  'polishing': [
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება პოლირება?',
        ru: 'Сколько времени занимает полировка?',
        en: 'How long does polishing take?',
      },
      answer: {
        ka: 'სრული პოლირება ჩვეულებრივ 1-2 სამუშაო დღეს მოითხოვს, დამოკიდებულია ავტომობილის ზომასა და საღებავის მდგომარეობაზე.',
        ru: 'Полная полировка обычно занимает 1–2 рабочих дня, в зависимости от размера автомобиля и состояния лакокрасочного покрытия.',
        en: 'Full polishing typically takes 1–2 business days, depending on the vehicle size and paint condition.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ნარჩუნდება პოლირების ეფექტი?',
        ru: 'Как долго сохраняется эффект полировки?',
        en: 'How long does polishing effect last?',
      },
      answer: {
        ka: 'პოლირების ეფექტი 3-6 თვე გრძელდება ჩვეულებრივ პირობებში. კერამიკული დაფარვის კომბინაციით შედეგი 2-5 წელი ნარჩუნდება.',
        ru: 'Эффект полировки сохраняется 3–6 месяцев при обычных условиях. В сочетании с керамическим покрытием результат держится 2–5 лет.',
        en: 'Polishing effect lasts 3–6 months under normal conditions. Combined with ceramic coating, the result lasts 2–5 years.',
      },
    },
    {
      question: {
        ka: 'პოლირება ნაკაწრებს მთლიანად აშორებს?',
        ru: 'Полировка полностью удаляет царапины?',
        en: 'Does polishing completely remove scratches?',
      },
      answer: {
        ka: 'პოლირება აშორებს ზედაპირულ ნაკაწრებს და გრუნტამდე შეუღწეველ დაზიანებებს. ღრმა ნაკაწრები, რომლებიც გრუნტამდეა ჩასული, მოითხოვს ფერის შესწორებას.',
        ru: 'Полировка удаляет поверхностные царапины и повреждения, не достигшие грунта. Глубокие царапины до грунта требуют подкраски.',
        en: 'Polishing removes surface scratches and damage that hasn\'t reached the primer. Deep scratches down to primer require touch-up painting.',
      },
    },
  ],

  'ceramiccoating': [
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება კერამიკული დაფარვა?',
        ru: 'Сколько держится керамическое покрытие?',
        en: 'How long does ceramic coating last?',
      },
      answer: {
        ka: 'ჩვენი კერამიკული დაფარვა 3-5 წელი გრძელდება, დამოკიდებულია პროდუქტზე და მოვლის პირობებზე. GYEON და Koch-Chemie პროფესიონალური ხაზი 5 წლამდე გარანტიას იძლევა.',
        ru: 'Наше керамическое покрытие служит 3–5 лет в зависимости от продукта и условий ухода. Профессиональная линейка GYEON и Koch-Chemie обеспечивает гарантию до 5 лет.',
        en: 'Our ceramic coating lasts 3–5 years depending on the product and maintenance. Professional-grade GYEON and Koch-Chemie lines provide up to 5-year warranty.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა პოლირება კერამიკამდე?',
        ru: 'Нужна ли полировка перед керамикой?',
        en: 'Is polishing needed before ceramic coating?',
      },
      answer: {
        ka: 'დიახ, პოლირება სავალდებულოა კერამიკული დაფარვის წინ. ლაქის მომზადება უზრუნველყოფს კერამიკის სწორ მიბმას ზედაპირთან და მაქსიმალურ გამძლეობას.',
        ru: 'Да, полировка обязательна перед нанесением керамики. Подготовка ЛКП обеспечивает правильное сцепление керамики с поверхностью и максимальную стойкость.',
        en: 'Yes, polishing is mandatory before ceramic coating. Paint preparation ensures proper bonding of ceramic to the surface and maximum durability.',
      },
    },
    {
      question: {
        ka: 'როგორ მოვუაროთ კერამიკულ დაფარვას?',
        ru: 'Как ухаживать за керамическим покрытием?',
        en: 'How to maintain ceramic coating?',
      },
      answer: {
        ka: 'რეკომენდირებულია pH-ნეიტრალური შამპუნით რეცხვა, აგრესიული ქიმიის თავიდან აცილება და წელიწადში ერთხელ ინსპექციაზე მობრძანება.',
        ru: 'Рекомендуется мойка pH-нейтральным шампунем, избегание агрессивной химии и ежегодная инспекция в студии.',
        en: 'We recommend washing with pH-neutral shampoo, avoiding aggressive chemicals, and annual inspection at the studio.',
      },
    },
  ],

  'ppf-shield-wrapping': [
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება PPF ფირით დაფარვა?',
        ru: 'Сколько времени занимает оклейка PPF?',
        en: 'How long does PPF installation take?',
      },
      answer: {
        ka: 'სრული დაფარვა 3-5 სამუშაო დღეს მოითხოვს, ნაწილობრივი (კაპოტი, ფარები, ბამპერი) — 1-2 დღეს.',
        ru: 'Полная оклейка занимает 3–5 рабочих дней, частичная (капот, фары, бампер) — 1–2 дня.',
        en: 'Full wrap takes 3–5 business days, partial coverage (hood, headlights, bumper) — 1–2 days.',
      },
    },
    {
      question: {
        ka: 'რა გარანტია აქვს PPF ფირს?',
        ru: 'Какая гарантия на PPF плёнку?',
        en: 'What warranty does PPF film have?',
      },
      answer: {
        ka: 'LLumar და Quantum ფირებს 10 წლიანი მწარმოებლის გარანტია აქვთ გაყვითლებისა და ბზარების წინააღმდეგ.',
        ru: 'Плёнки LLumar и Quantum имеют 10-летнюю гарантию производителя от пожелтения и растрескивания.',
        en: 'LLumar and Quantum films come with a 10-year manufacturer warranty against yellowing and cracking.',
      },
    },
    {
      question: {
        ka: 'PPF ფირი იცავს ნაკაწრებისგან?',
        ru: 'PPF защищает от царапин?',
        en: 'Does PPF protect against scratches?',
      },
      answer: {
        ka: 'დიახ, PPF ფირი თვითაღდგენადი თვისებებით იცავს ნაკაწრებისა და ქვის ჩიპებისგან. მცირე ნაკაწრები სითბოს ზემოქმედებით თავად აღდგება.',
        ru: 'Да, PPF с функцией самовосстановления защищает от царапин и сколов. Мелкие царапины заживают при воздействии тепла.',
        en: 'Yes, PPF with self-healing properties protects against scratches and stone chips. Minor scratches heal with heat exposure.',
      },
    },
  ],

  'vinyl-wrapping': [
    {
      question: {
        ka: 'რამდენ ხანს ძლებს ვინილის ფირი?',
        ru: 'Сколько служит виниловая плёнка?',
        en: 'How long does vinyl wrap last?',
      },
      answer: {
        ka: 'ხარისხიანი ვინილის ფირი 3-5 წელი ძლებს სათანადო მოვლის პირობებში. პოლიურეთანის დამცავი ფირი კიდევ უფრო გამძლეა — 7-10 წელი.',
        ru: 'Качественная виниловая плёнка служит 3–5 лет при надлежащем уходе. Полиуретановая защитная плёнка ещё долговечнее — 7–10 лет.',
        en: 'Quality vinyl wrap lasts 3–5 years with proper care. Polyurethane protective film is even more durable — 7–10 years.',
      },
    },
    {
      question: {
        ka: 'შესაძლებელია თუ არა ფირის მოხსნა?',
        ru: 'Можно ли снять плёнку?',
        en: 'Can the wrap be removed?',
      },
      answer: {
        ka: 'დიახ, ფირი სრულიად უსაფრთხოდ იხსნება ქარხნული ლაქის დაუზიანებლად. ეს ერთ-ერთი მთავარი უპირატესობაა ღებვის წინაშე.',
        ru: 'Да, плёнка полностью безопасно снимается без повреждения заводского ЛКП. Это одно из главных преимуществ перед покраской.',
        en: 'Yes, the wrap can be safely removed without damaging factory paint. This is one of the main advantages over repainting.',
      },
    },
    {
      question: {
        ka: 'რა ფერები და ტექსტურები არის ხელმისაწვდომი?',
        ru: 'Какие цвета и текстуры доступны?',
        en: 'What colors and textures are available?',
      },
      answer: {
        ka: 'ხელმისაწვდომია 200+ ფერი და ტექსტურა: გლოსი, მატი, სატინი, კარბონი, ქრომი, ქამელეონი. 3M, KPMF, Oracal კატალოგებიდან.',
        ru: 'Доступно 200+ цветов и текстур: глянец, мат, сатин, карбон, хром, хамелеон. Из каталогов 3M, KPMF, Oracal.',
        en: 'We offer 200+ colors and textures: gloss, matte, satin, carbon, chrome, chameleon. From 3M, KPMF, and Oracal catalogs.',
      },
    },
    {
      question: {
        ka: 'რა განსხვავებაა ვინილის და პოლიურეთანის დამცავ ფირს შორის?',
        ru: 'В чём разница между виниловой и полиуретановой защитной плёнкой?',
        en: 'What is the difference between vinyl and polyurethane protective film?',
      },
      answer: {
        ka: 'ვინილის (PVC) ფირი თხელი და იაფია, მაგრამ არ იცავს ქვის ჩიპებისგან. პოლიურეთანის (PPF) ფირი სქელი, თვითაღდგენადი და იცავს ლაქს ნაკაწრები��ა და ჩიპებისგან. ჩვენ ვიყენებთ პოლიურეთანის ფირს ფერის შეცვლისთვის — ერთდროულად იცვლით ფერს და იცავთ კუზოვს.',
        ru: 'Виниловая (ПВХ) плёнка тонкая и дешевле, но не защищает от сколов. Полиуретановая (PPF) плёнка толще, обладает самовосстановлением и защищает ЛКП от царапин и сколов. Мы используем именно полиуретановую плёнку для смены цвета — вы одновременно меняете цвет и защищаете кузов.',
        en: 'Vinyl (PVC) wrap is thinner and cheaper but does not protect against stone chips. Polyurethane (PPF) film is thicker, self-healing, and protects paint from scratches and chips. We use polyurethane film for color changes — you change the color and protect the body at the same time.',
      },
    },
  ],

  'interior-cleaning': [
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ქიმწმენდა?',
        ru: 'Сколько времени занимает химчистка?',
        en: 'How long does interior cleaning take?',
      },
      answer: {
        ka: 'სრული ქიმწმენდა 4-8 საათს მოითხოვს, პლუს 2-4 საათი გამოშრობისთვის. ნაწილობრივი წმენდა 2-3 საათია.',
        ru: 'Полная химчистка занимает 4–8 часов плюс 2–4 часа на сушку. Частичная чистка — 2–3 часа.',
        en: 'Full interior cleaning takes 4–8 hours plus 2–4 hours for drying. Partial cleaning takes 2–3 hours.',
      },
    },
    {
      question: {
        ka: 'რა პროდუქტებს იყენებთ ქიმწმენდისთვის?',
        ru: 'Какие средства используете для химчистки?',
        en: 'What products do you use for cleaning?',
      },
      answer: {
        ka: 'ვიყენებთ Koch-Chemie პროფესიონალურ ხაზს — უსაფრთხო ტყავის, ქსოვილის და პლასტმასისთვის. ჰიპოალერგიული და ბავშვებისთვის უსაფრთხო.',
        ru: 'Используем профессиональную линейку Koch-Chemie — безопасную для кожи, ткани и пластика. Гипоаллергенную и безопасную для детей.',
        en: 'We use Koch-Chemie professional line — safe for leather, fabric, and plastic. Hypoallergenic and child-safe.',
      },
    },
    {
      question: {
        ka: 'ქიმწმენდა ლაქებს მთლიანად აშორებს?',
        ru: 'Химчистка полностью удаляет пятна?',
        en: 'Does cleaning completely remove stains?',
      },
      answer: {
        ka: '90%+ ლაქებს ვაშორებთ. ძველი და ღრმად შეჭრილი ლაქები შეიძლება მოითხოვდეს განმეორებით დამუშავებას ან ტყავის/ქსოვილის აღდგენას.',
        ru: 'Удаляем 90%+ пятен. Старые и глубоко въевшиеся пятна могут потребовать повторной обработки или восстановления кожи/ткани.',
        en: 'We remove 90%+ of stains. Old and deeply set stains may require repeated treatment or leather/fabric restoration.',
      },
    },
  ],

  'auto-glass-tinting': [
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ტონირება?',
        ru: 'Сколько времени занимает тонировка?',
        en: 'How long does tinting take?',
      },
      answer: {
        ka: 'სრული ტონირება 2-4 საათს მოითხოვს. მხოლოდ წინა მინები — 1-2 საათი.',
        ru: 'Полная тонировка занимает 2–4 часа. Только передние стёкла — 1–2 часа.',
        en: 'Full tinting takes 2–4 hours. Front windows only — 1–2 hours.',
      },
    },
    {
      question: {
        ka: 'ტონირება ლეგალურია საქართველოში?',
        ru: 'Тонировка легальна в Грузии?',
        en: 'Is window tinting legal in Georgia?',
      },
      answer: {
        ka: 'საქართველოში წინა მინებზე მინიმუმ 75% გამჭვირვალობა სავალდებულოა, უკანა მინებზე შეზღუდვა არ არის. გარდამავალზე — 70%.',
        ru: 'В Грузии на передних стёклах обязательна минимум 75% светопропускаемость, на задних — ограничений нет. На лобовом — 70%.',
        en: 'In Georgia, front windows require minimum 75% light transmission, no restrictions on rear windows. Windshield requires 70%.',
      },
    },
    {
      question: {
        ka: 'რა ფირებს იყენებთ ტონირებისთვის?',
        ru: 'Какие плёнки используете для тонировки?',
        en: 'What films do you use for tinting?',
      },
      answer: {
        ka: 'ვიყენებთ LLumar და 3M კერამიკულ ფირებს, რომლებიც 99% UV სხივებს ბლოკავს და სითბოს ეფექტურად აცილებს.',
        ru: 'Используем керамические плёнки LLumar и 3M, которые блокируют 99% UV-лучей и эффективно отводят тепло.',
        en: 'We use LLumar and 3M ceramic films that block 99% of UV rays and effectively reject heat.',
      },
    },
  ],

  'windshield-repair': [
    {
      question: {
        ka: 'ყველა ბზარი თუ კეთდება?',
        ru: 'Все трещины можно отремонтировать?',
        en: 'Can all cracks be repaired?',
      },
      answer: {
        ka: '30 სმ-მდე ბზარები და 2.5 სმ-მდე ჩიპები კეთდება. უფრო დიდი დაზიანებები მოითხოვს მინის შეცვლას.',
        ru: 'Ремонтируем трещины до 30 см и сколы до 2.5 см. Большие повреждения требуют замены стекла.',
        en: 'We repair cracks up to 30 cm and chips up to 2.5 cm. Larger damage requires glass replacement.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება შეკეთება?',
        ru: 'Сколько времени занимает ремонт?',
        en: 'How long does repair take?',
      },
      answer: {
        ka: 'ჩიპის შეკეთება 20-30 წუთი, ბზარის — 40-60 წუთი. მომლოდინეთა ზონაში დალოდება შეგიძლიათ.',
        ru: 'Ремонт скола — 20–30 минут, трещины — 40–60 минут. Можете подождать в зоне ожидания.',
        en: 'Chip repair takes 20–30 minutes, crack repair — 40–60 minutes. You can wait in our lounge.',
      },
    },
    {
      question: {
        ka: 'რას იძლევა მინის პოლირება?',
        ru: 'Что даёт полировка стекла?',
        en: 'What does glass polishing do?',
      },
      answer: {
        ka: 'პოლირება აშორებს მოღრუბლულობას, წვრილ ნაკაწრებს და აღადგენს გამჭვირვალობას მინის შეცვლის გარეშე. შედეგი მაშინვე ჩანს.',
        ru: 'Полировка убирает помутнение, мелкие царапины и восстанавливает прозрачность стекла без замены. Результат виден сразу.',
        en: 'Polishing removes cloudiness, minor scratches and restores glass clarity without replacement. The result is immediately visible.',
      },
    },
    {
      question: {
        ka: 'შესაძლებელია ღრმა ნაკაწრების მოცილება მინიდან?',
        ru: 'Можно ли убрать глубокие царапины со стекла?',
        en: 'Can deep scratches be removed from glass?',
      },
      answer: {
        ka: 'დიახ, შლიფოვკა + პოლირება აშორებს ღრმა ნაკაწრებს. ფასი 300 ლარიდან, მინის შეცვლაზე გაცილებით ეკონომიური.',
        ru: 'Да, шлифовка + полировка убирает глубокие царапины. Стоимость от 300 лари — значительно дешевле замены стекла.',
        en: 'Yes, grinding + polishing removes deep scratches. Cost from 300 GEL — significantly cheaper than glass replacement.',
      },
    },
    {
      question: {
        ka: 'რით განსხვავდება პოლირება შლიფოვკისგან?',
        ru: 'Чем отличается полировка от шлифовки стекла?',
        en: 'What\'s the difference between polishing and grinding?',
      },
      answer: {
        ka: 'პოლირება — წვრილი დეფექტების, მოღრუბლულობის მოცილება რბილი დისკებით. შლიფოვკა — ღრმა ნაკაწრების აბრაზიული დამუშავება + საბოლოო პოლირება.',
        ru: 'Полировка — удаление мелких дефектов и помутнения мягкими дисками. Шлифовка — абразивная обработка глубоких царапин с последующей финальной полировкой.',
        en: 'Polishing removes minor defects and cloudiness with soft pads. Grinding is abrasive treatment of deep scratches followed by final polishing.',
      },
    },
    {
      question: {
        ka: 'რა ღირს საქარე მინის პოლირება?',
        ru: 'Сколько стоит полировка лобового стекла?',
        en: 'How much does windshield polishing cost?',
      },
      answer: {
        ka: 'საქარე მინის პოლირება 250 ლარიდან, გვერდითი მინის — 150 ლარიდან. შლიფოვკა საქარე მინის — 400 ლარიდან.',
        ru: 'Полировка лобового стекла — от 250 лари, бокового — от 150 лари. Шлифовка лобового — от 400 лари.',
        en: 'Windshield polishing starts from 250 GEL, side window — from 150 GEL. Windshield grinding — from 400 GEL.',
      },
    },
    {
      question: {
        ka: 'სიმართლეა, რომ ავტომინის შლიფოვკა შეუძლებელია?',
        ru: 'Правда ли, что автостекло нельзя шлифовать?',
        en: 'Is it true that car glass cannot be ground?',
      },
      answer: {
        ka: 'არა, ეს მითია. პროფესიონალური შლიფოვკა სპეციალური აბრაზიული დისკებით და პოლირების პასტებით უსაფრთხოდ აშორებს ნაკაწრებს მინის სტრუქტურის დარღვევის გარეშე. მნიშვნელოვანია სწორი აღჭურვილობა და გამოცდილება.',
        ru: 'Нет, это миф. Профессиональная шлифовка специальными абразивными дисками и полировальными пастами безопасно удаляет царапины без нарушения структуры стекла. Важны правильное оборудование и опыт.',
        en: 'No, this is a myth. Professional grinding with specialized abrasive discs and polishing compounds safely removes scratches without compromising the glass structure. Proper equipment and experience are key.',
      },
    },
    {
      question: {
        ka: 'რა დეფექტებს აშორებს მინის შლიფოვკა?',
        ru: 'Какие дефекты убирает шлифовка стекла?',
        en: 'What defects does glass grinding remove?',
      },
      answer: {
        ka: 'შლიფოვკა აშორებს: ქვიშის კვალს (ავტობანის ეფექტი), საწმენდი ფუნჯების დატოვებულ ნაკაწრებს, ღრმა ნაკაწრებს ვანდალიზმიდან ან შემთხვევითი დაზიანებიდან, მოღრუბლულობას და მინის გაუმჭვირვალობას.',
        ru: 'Шлифовка убирает: следы от песка (эффект пескоструя на трассе), затёртости от щёток стеклоочистителя, глубокие царапины от вандализма или случайных повреждений, помутнение и потерю прозрачности стекла.',
        en: 'Grinding removes: sand marks (sandblasting effect from highway driving), wiper blade scratches, deep scratches from vandalism or accidental damage, cloudiness and loss of glass transparency.',
      },
    },
  ],

  'car-soundproofing': [
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ხმის იზოლაცია?',
        ru: 'Сколько времени занимает шумоизоляция?',
        en: 'How long does soundproofing take?',
      },
      answer: {
        ka: 'სრული ხმის იზოლაცია 2-3 სამუშაო დღეს მოითხოვს. ნაწილობრივი (კარები ან იატაკი) — 1 დღე.',
        ru: 'Полная шумоизоляция занимает 2–3 рабочих дня. Частичная (двери или пол) — 1 день.',
        en: 'Full soundproofing takes 2–3 business days. Partial (doors or floor) — 1 day.',
      },
    },
    {
      question: {
        ka: 'რამდენად ამცირებს ხმაურს?',
        ru: 'Насколько снижает шум?',
        en: 'How much does it reduce noise?',
      },
      answer: {
        ka: 'პროფესიონალური ხმის იზოლაცია ხმაურის დონეს 40-60%-ით ამცირებს. განსაკუთრებით ეფექტურია საგზაო და ძრავის ხმაურზე.',
        ru: 'Профессиональная шумоизоляция снижает уровень шума на 40–60%. Особенно эффективна против дорожного шума и вибраций двигателя.',
        en: 'Professional soundproofing reduces noise levels by 40–60%. Especially effective against road noise and engine vibrations.',
      },
    },
  ],

  'computer-diagnostics': [
    {
      question: {
        ka: 'რა მოიცავს კომპიუტერული დიაგნოსტიკა?',
        ru: 'Что включает компьютерная диагностика?',
        en: 'What does computer diagnostics include?',
      },
      answer: {
        ka: 'სრული ECU სკანირება, შეცდომის კოდების წაკითხვა და ანალიზი, სენსორების შემოწმება და ანგარიშის გაცემა რეკომენდაციებით.',
        ru: 'Полное сканирование ECU, считывание и анализ кодов ошибок, проверка датчиков и выдача отчёта с рекомендациями.',
        en: 'Full ECU scanning, reading and analyzing error codes, sensor checks, and issuing a report with recommendations.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება დიაგნოსტიკა?',
        ru: 'Сколько времени занимает диагностика?',
        en: 'How long does diagnostics take?',
      },
      answer: {
        ka: 'სტანდარტული დიაგნოსტიკა 30-60 წუთს მოითხოვს. გაფართოებული დიაგნოსტიკა კონკრეტული პრობლემის ძიებით — 1-2 საათი.',
        ru: 'Стандартная диагностика занимает 30–60 минут. Расширенная диагностика с поиском конкретной проблемы — 1–2 часа.',
        en: 'Standard diagnostics takes 30–60 minutes. Extended diagnostics with specific problem search — 1–2 hours.',
      },
    },
  ],

  'carwash': [
    {
      question: {
        ka: 'რით განსხვავდება დეტეილინგ რეცხვა ჩვეულებრივისგან?',
        ru: 'Чем детейлинг мойка отличается от обычной?',
        en: 'How does detailing wash differ from regular?',
      },
      answer: {
        ka: 'დეტეილინგ რეცხვა მოიცავს pH-ნეიტრალურ შამპუნს, ორ-ვედრიან მეთოდს, რბილი ხელსახოცებით გამშრალებას და დისკების წმენდას. ეს ამცირებს ნაკაწრების რისკს.',
        ru: 'Детейлинг мойка включает pH-нейтральный шампунь, двухвёдерный метод, сушку мягкими полотенцами и очистку дисков. Это минимизирует риск царапин.',
        en: 'Detailing wash includes pH-neutral shampoo, two-bucket method, soft towel drying, and wheel cleaning. This minimizes scratch risk.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება რეცხვა?',
        ru: 'Сколько времени занимает мойка?',
        en: 'How long does the wash take?',
      },
      answer: {
        ka: 'სტანდარტული დეტეილინგ რეცხვა 40-60 წუთს მოითხოვს. პრემიუმ რეცხვა თიხის ბარით და ვოსკით — 1.5-2 საათი.',
        ru: 'Стандартная детейлинг мойка занимает 40–60 минут. Премиум мойка с глиной и воском — 1.5–2 часа.',
        en: 'Standard detailing wash takes 40–60 minutes. Premium wash with clay bar and wax — 1.5–2 hours.',
      },
    },
  ],
};
