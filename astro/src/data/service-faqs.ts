/**
 * FAQ data for each service page.
 * Used to generate FAQPage JSON-LD schema in seo.ts.
 * Extracted from Tilda export t585 accordion blocks (all 3 languages).
 */

interface FaqItem {
  readonly question: Readonly<Record<string, string>>;
  readonly answer: Readonly<Record<string, string>>;
}

export const SERVICE_FAQS: Readonly<Record<string, ReadonlyArray<FaqItem>>> = {
  'polishing': [
    {
      question: {
        ka: 'რა ღირს მანქანის პოლირება?',
        ru: 'Сколько стоит полировка автомобиля?',
        en: 'How much does car polishing cost?',
      },
      answer: {
        ka: 'ძარის პოლირება იწყება 690 Gel-დან. ასევე ხელმისაწვდომია პოლირება + კერამიკული საფარი, ფარების პოლირება, მინის პოლირება და სალონის დეტალების პოლირება. ზუსტი ფასი დამოკიდებულია ავტომობილის ზომასა და ლაქის მდგომარეობაზე.',
        ru: 'Полировка кузова — от 690 Gel, полировка + керамическое покрытие — от 990 Gel. Также делаем полировку фар (от 150 Gel), стекла (от 250 Gel) и элементов салона (от 200 Gel). Точная стоимость зависит от размера автомобиля и состояния ЛКП. Напишите нам в WhatsApp, пришлите фото — и мы рассчитаем точную стоимость.',
        en: 'Paint correction starts from 690 Gel, polishing + ceramic coating from 990 Gel. We also offer headlight polishing (from 150 Gel), windshield polishing (from 250 Gel) and interior elements (from 200 Gel). The exact price depends on car size and paint condition. Send us photos on WhatsApp and we\'ll calculate the exact price.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება მანქანის პოლირება?',
        ru: 'Сколько времени занимает полировка?',
        en: 'How long does polishing take?',
      },
      answer: {
        ka: 'ვადა დამოკიდებულია სამუშაოს ტიპზე — მსუბუქ პოლირებას ნაკლები დრო სჭირდება, აღმდგენ და მრავალეტაპიან პოლირებას მეტი. ზუსტ დროს გეუბნებით ავტომობილის დათვალიერების შემდეგ.',
        ru: 'Легкая полировка занимает 3–4 часа, восстановительная — 6–8 часов, многоэтапная (для запущенного состояния) — до 2 дней. Точные сроки зависят от размера автомобиля и состояния ЛКП.',
        en: 'Light polishing takes 3–4 hours, paint correction 6–8 hours, multi-stage correction (for heavily damaged paint) up to 2 days. Exact timing depends on car size and paint condition.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს პოლირების შედეგი?',
        ru: 'Как часто нужно полировать автомобиль?',
        en: 'How often should I polish my car?',
      },
      answer: {
        ka: 'პოლირების საჭიროება დამოკიდებულია ავტომობილის ექსპლუატაციაზე, რეცხვის მეთოდზე და ლაქის მდგომარეობაზე. ბევრ შემთხვევაში რეგულარული უსაფრთხო მოვლა და კერამიკული საფარი საშუალებას გაძლევთ შედეგი უფრო დიდხანს შეინარჩუნოთ.',
        ru: 'Рекомендуем полировать раз в год для поддержания блеска. Если после полировки нанести керамическое покрытие — эффект сохранится на 3 года. А с защитной пленкой PPF полировка может не понадобиться до 10 лет. Спросите нас о комплексных пакетах — это выгоднее.',
        en: 'We recommend polishing once a year to maintain the shine. If you apply ceramic coating after polishing, the effect lasts up to 3 years. With PPF protection film, polishing may not be needed for up to 10 years. Ask us about package deals — they offer better value.',
      },
    },
    {
      question: {
        ka: 'რომელ ნაკაწრებს აშორებს პოლირება?',
        ru: 'Что такое полировка автомобиля?',
        en: 'What is car polishing?',
      },
      answer: {
        ka: 'პოლირება არის წვრილი ნაკაწრების, გახეხილობისა და სხვა დეფექტების მოცილების პროცესი კუზოვის, ფარების ან მინის საფარიდან. იგი აღადგენს ბზინვარებას და ფერის სიღრმეს, ავტომობილი ისევ ახალივით გამოიყურება.',
        ru: 'Полировка — это процесс удаления мелких царапин, потертостей и других дефектов с лакокрасочного покрытия кузова, оптики или стекол. Она восстанавливает блеск и глубину цвета, и автомобиль снова выглядит как новый.',
        en: 'Polishing is the process of removing minor scratches, swirl marks, and other defects from the car body, headlights, or windshield coating. It restores shine and color depth, making your car look brand new again.',
      },
    },
    {
      question: {
        ka: 'რამდენი ეტაპის პოლირება მჭირდება?',
        ru: 'Сколько этапов полировки мне нужно?',
        en: 'How many polishing stages do I need?',
      },
      answer: {
        ka: 'ეტაპების რაოდენობა დამოკიდებულია საღებავის მდგომარეობაზე. მსუბუქი ნაკაწრებისთვის საკმარისია ერთეტაპიანი პოლირება, უფრო ღრმა დეფექტებისთვის კი შეიძლება ორი ან სამი ეტაპი დასჭირდეს.',
        ru: 'Количество этапов зависит от состояния краски. Для лёгких царапин достаточно одного этапа, для более глубоких дефектов может понадобиться два или три.',
        en: 'The number of stages depends on the paint condition. Light scratches need one stage, while deeper defects may require two or three.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა კერამიკა პოლირების შემდეგ?',
        ru: 'Нужна ли керамика после полировки?',
        en: 'Do I need ceramic coating after polishing?',
      },
      answer: {
        ka: 'კერამიკული საფარი არ არის სავალდებულო, მაგრამ ეხმარება პოლირების შედეგს უფრო დიდხანს შენარჩუნებაში. თუ გსურთ მაქსიმალურად ხანგრძლივი ეფექტი, კერამიკა კარგი დამატებაა.',
        ru: 'Керамика не обязательна, но помогает сохранить результат полировки дольше. Если хотите максимально длительный эффект — керамика будет хорошим дополнением.',
        en: 'Ceramic coating is not mandatory but helps preserve the polishing result longer. If you want the longest-lasting effect, ceramic is a great addition.',
      },
    },
  ],

  'ceramiccoating': [
    {
      question: {
        ka: 'რა ღირს კერამიკული საფარი?',
        ru: 'Сколько стоит керамическое покрытие?',
        en: 'How much does ceramic coating cost?',
      },
      answer: {
        ka: 'მთლიანი ავტომობილის კერამიკული საფარი — 500 Gel-დან. ასევე ვაკეთებთ ანტიწვიმას მინებზე (150 Gel-დან) და სალონის კერამიკულ საფარს (300 Gel-დან). ზუსტი ფასი დამოკიდებულია ავტომობილის კლასსა და ფენების რაოდენობაზე. მოგვწერეთ WhatsApp-ზე ზუსტი გათვლისთვის.',
        ru: 'Керамическое покрытие всего авто — от 500 Gel. Также делаем антидождь на стекла (от 150 Gel) и керамическое покрытие салона (от 300 Gel). Точная стоимость зависит от класса автомобиля и количества слоев. Напишите нам в WhatsApp для точного расчета.',
        en: 'Full car ceramic coating starts from 500 Gel. We also offer rain repellent for glass (from 150 Gel) and interior ceramic coating (from 300 Gel). The exact price depends on vehicle class and number of layers. Message us on WhatsApp for an exact quote.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს კერამიკული საფარი?',
        ru: 'На сколько хватает керамического покрытия?',
        en: 'How long does ceramic coating last?',
      },
      answer: {
        ka: 'გამძლეობა დამოკიდებულია მასალაზე, მოვლასა და იმაზე, თუ რომელ ზონაზე კეთდება დამუშავება. ზუსტ მოლოდინს გეუბნებით კონკრეტული სერვისის არჩევისას.',
        ru: 'Керамика на кузове держится до 3 лет, на стеклах и в салоне — до 1 года. Мы даем гарантию на покрытие и бесплатно обновим при потере гидрофобности в гарантийный период.',
        en: 'Ceramic coating on the body lasts up to 3 years, on glass and interior up to 1 year. We provide a warranty on the coating and will refresh it free of charge if hydrophobicity is lost during the warranty period.',
      },
    },
    {
      question: {
        ka: 'რატომ აკეთებენ კერამიკას მანქანაზე?',
        ru: 'Зачем наносить керамику, если можно просто мыть?',
        en: 'Why apply ceramic coating if I can just wash my car?',
      },
      answer: {
        ka: 'კერამიკა ეხმარება ავტომობილს უფრო დიდხანს შეინარჩუნოს სუფთა და მოვლილი იერი, ამარტივებს რეცხვას და ამცირებს ყოველდღიური დაბინძურების გავლენას ზედაპირზე.',
        ru: 'Керамическое покрытие — это не только блеск. Оно защищает от ультрафиолета, мелких царапин, птичьего помета и реагентов. Мойка становится в 2 раза быстрее — грязь просто скатывается. Это инвестиция в сохранение внешнего вида и стоимости автомобиля.',
        en: 'Ceramic coating is not just about shine. It protects against UV, minor scratches, bird droppings, and chemicals. Washing becomes 2x faster — dirt simply slides off. It\'s an investment in preserving your car\'s appearance and value.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა პოლირება კერამიკამდე?',
        ru: 'Нужно ли готовить машину перед нанесением?',
        en: 'Do I need to prepare my car before application?',
      },
      answer: {
        ka: 'მოიყვანეთ ისე, როგორც არის — ჩვენ თვითონ მოვამზადებთ ყველაფერს. მომზადება (რეცხვა, დეკონტამინაცია, პოლირება) შედეგის 80%-ია, და ჩვენ მაქსიმალურ ყურადღებას ვუთმობთ. სწორედ ამიტომ გვძლებს შედეგი ასე დიდხანს.',
        ru: 'Привозите как есть — мы сами всё подготовим. Подготовка (мойка, деконтаминация, полировка) — это 80% результата, и мы уделяем ей максимум внимания. Именно поэтому результат держится так долго.',
        en: 'Bring it as is — we handle all preparation. Prep work (washing, decontamination, polishing) accounts for 80% of the result, and we give it maximum attention. That\'s why our results last so long.',
      },
    },
    {
      question: {
        ka: 'როგორ გავიგო, როდის სჭირდება კერამიკის განახლება?',
        ru: 'Как понять, что пора обновить керамику?',
        en: 'How do I know when to refresh the ceramic coating?',
      },
      answer: {
        ka: '3 ნიშანია: წყალი აღარ გროვდება წვეთებად, რეცხვის შემდეგ ლაქები ჩნდება, ბზინვარება ქრება. მობრძანდით უფასო შემოწმებაზე — შევამოწმებთ საფარის მდგომარეობას და გირჩევთ, საჭიროა თუ არა განახლება.',
        ru: 'Есть 3 признака: вода перестает собираться в капли, появляются разводы после мойки, блеск потускнел. Приезжайте на бесплатный осмотр — мы проверим состояние покрытия и подскажем, нужно ли обновление.',
        en: 'There are 3 signs: water stops beading, streaks appear after washing, and the shine has dulled. Come in for a free inspection — we\'ll check the coating condition and advise whether a refresh is needed.',
      },
    },
    {
      question: {
        ka: 'იცავს თუ არა კერამიკა ღრმა ნაკაწრებისგან?',
        ru: 'Можно ли нанести керамику самостоятельно?',
        en: 'Can I apply ceramic coating myself?',
      },
      answer: {
        ka: 'ტექნიკურად შესაძლებელია, მაგრამ შედეგი 3–5-ჯერ სუსტი იქნება. პროფესიონალური ზედაპირის მომზადების, ტემპერატურისა და ტენიანობის კონტროლის და ინფრაწითელი გამოშრობის გარეშე საფარი საჭირო სიმტკიცეს ვერ მიაღწევს და წლების ნაცვლად რამდენიმე თვე გაძლებს.',
        ru: 'Технически можно, но результат будет в 3–5 раз слабее. Без профессиональной подготовки поверхности, контроля температуры и влажности, а также инфракрасной сушки покрытие не наберет нужную прочность и продержится несколько месяцев вместо лет.',
        en: 'Technically yes, but the result will be 3–5 times weaker. Without professional surface preparation, temperature and humidity control, and infrared curing, the coating won\'t reach proper hardness and will last a few months instead of years.',
      },
    },
    {
      question: {
        ka: 'რას აკეთებს კერამიკული საფარი?',
        ru: 'Что такое керамическое покрытие?',
        en: 'What is ceramic coating?',
      },
      answer: {
        ka: 'კერამიკული საფარი არის დამცავი ფენა, რომელიც გამოიყენება ავტომობილის ზედაპირზე, აძლიერებს ბზინვარებას და ამარტივებს მოვლას.',
        ru: 'Это жидкий состав на основе диоксида кремния (SiO2), который после нанесения образует прозрачный защитный слой на поверхности автомобиля. Керамика защищает от UV-лучей, царапин, химии и держится до 3 лет.',
        en: 'It\'s a liquid compound based on silicon dioxide (SiO2) that forms a transparent protective layer on the car surface after application. Ceramic coating protects against UV, scratches, chemicals, and lasts up to 3 years.',
      },
    },
    {
      question: {
        ka: 'რით განსხვავდება კერამიკა PPF-ისგან?',
        ru: 'Чем отличается керамика от PPF?',
        en: 'How is ceramic coating different from PPF?',
      },
      answer: {
        ka: 'კერამიკა ეხმარება ზედაპირს შეინარჩუნოს ბზინვარება, ჰიდროფობიურობა და სისუფთავე. PPF კი ფიზიკურად იცავს ლაქს ჩიპებისგან, ნაკაწრებისგან და ქვებისგან. ისინი სხვადასხვა ამოცანას წყვეტენ და ზოგჯერ ერთმანეთის შემავსებლადაც გამოიყენება.',
        ru: 'Керамика помогает поверхности сохранять блеск, гидрофобность и чистоту. PPF физически защищает от сколов, царапин и камней. Они решают разные задачи и иногда используются вместе.',
        en: 'Ceramic helps the surface maintain shine, hydrophobicity, and cleanliness. PPF physically protects from chips, scratches, and stones. They solve different tasks and are sometimes used together.',
      },
    },
    {
      question: {
        ka: 'კერამიკის შემდეგ მანქანა ნაკლებად ისვრება?',
        ru: 'Машина меньше пачкается после керамики?',
        en: 'Does the car get dirty less after ceramic coating?',
      },
      answer: {
        ka: 'კერამიკული საფარი ქმნის ჰიდროფობიურ ეფექტს, რის გამოც წყალი და დაბინძურება ზედაპირზე ნაკლებად ჩერდება. ეს ამარტივებს რეცხვას და ეხმარება ავტომობილს უფრო სუფთად გამოიყურებოდეს ორ რეცხვას შორის.',
        ru: 'Керамическое покрытие создаёт гидрофобный эффект — вода и грязь меньше задерживаются на поверхности. Это упрощает мойку и помогает машине дольше выглядеть чистой между мойками.',
        en: 'Ceramic coating creates a hydrophobic effect — water and dirt are less likely to stick. This makes washing easier and keeps the car looking cleaner between washes.',
      },
    },
  ],

  'ppf-shield-wrapping': [
    {
      question: {
        ka: 'რა ღირს PPF ფირის გადაკვრა?',
        ru: 'Сколько стоит оклейка PPF?',
        en: 'How much does PPF wrapping cost?',
      },
      answer: {
        ka: 'ფასი დამოკიდებულია დაფარვის ზონაზე, ავტომობილის ზომაზე და არჩეულ ფირზე. შესაძლებელია როგორც რისკ-ზონების, ისე სრული ავტომობილის შეთავაზება.',
        ru: 'Цена зависит от марки автомобиля, объёма работ и выбранной плёнки. Капот — от 800 GEL, передняя часть (капот, бампер, крылья, стойки, зеркала и фары) — от 2 500 GEL, полная оклейка — от 7 500 GEL. Приезжайте на бесплатный осмотр — рассчитаем точную стоимость за 15 минут.',
        en: 'The price depends on the car make, scope of work and chosen film. Hood — from 800 GEL, front section (hood, bumper, fenders, pillars, mirrors and headlights) — from 2,500 GEL, full body — from 7,500 GEL. Come for a free inspection — we will calculate the exact cost in 15 minutes.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს PPF ფირი?',
        ru: 'На сколько хватает плёнки PPF?',
        en: 'How long does PPF last?',
      },
      answer: {
        ka: 'ხარისხიანი ფირი და სწორი მოვლა საშუალებას იძლევა PPF-მა მრავალი წელი შეინარჩუნოს თავისი თვისებები.',
        ru: 'При нормальной эксплуатации — до 10 лет. Плёнка не желтеет, не мутнеет и сохраняет блеск. Мелкие царапины затягиваются сами под воздействием тепла.',
        en: 'Under normal use — up to 10 years. The film does not yellow, cloud or lose its gloss. Minor scratches heal on their own under heat.',
      },
    },
    {
      question: {
        ka: 'რა არის PPF ფირი?',
        ru: 'Что такое PPF?',
        en: 'What is PPF?',
      },
      answer: {
        ka: 'PPF არის გამჭვირვალე პოლიურეთანის დამცავი ფირი, რომელიც აკრავთ ავტომობილის კორპუსზე საღებავის დასაცავად.',
        ru: 'PPF (Paint Protection Film) — прозрачная полиуретановая плёнка, которая защищает кузов от сколов, царапин, ультрафиолета и химических реагентов. Работает как невидимый щит — сохраняет заводской вид автомобиля на годы.',
        en: 'PPF (Paint Protection Film) is a transparent polyurethane film that protects the body from chips, scratches, UV rays and chemical agents. It works as an invisible shield — preserving the factory look of the car for years.',
      },
    },
    {
      question: {
        ka: 'რა განსხვავებაა PPF-სა და ვინილის ფირს შორის?',
        ru: 'Чем отличается PPF от виниловой плёнки?',
        en: 'What is the difference between PPF and vinyl film?',
      },
      answer: {
        ka: 'PPF ძირითადად დაცვისთვის გამოიყენება, ხოლო ვინილი — ვიზუალური ცვლილებისთვის. PPF უფრო გამძლეა და უკეთ იცავს ლაქს ყოველდღიური ზემოქმედებისგან.',
        ru: 'PPF используется в основном для защиты, а винил — для визуальных изменений. PPF более прочный и лучше защищает лак от ежедневного воздействия.',
        en: 'PPF is primarily used for protection, while vinyl is for visual changes. PPF is more durable and better protects the paint from daily wear.',
      },
    },
    {
      question: {
        ka: 'იცავს თუ არა PPF ქვებისგან და ნაკაწრებისგან?',
        ru: 'Защищает ли PPF от камней и царапин?',
        en: 'Does PPF protect against stones and scratches?',
      },
      answer: {
        ka: 'დიახ. სწორედ ეს არის მისი მთავარი ამოცანა — შეამციროს გზაზე მიღებული წვრილი დაზიანებების და ზედაპირული ნაკაწრების რისკი.',
        ru: 'Да. Именно это его главная задача — снизить риск мелких повреждений от дороги и поверхностных царапин.',
        en: 'Yes. That is its main purpose — to reduce the risk of minor road damage and surface scratches.',
      },
    },
    {
      question: {
        ka: 'შესაძლებელია თუ არა ნაწილობრივი დაფარვა?',
        ru: 'Возможна ли частичная оклейка?',
        en: 'Is partial coverage possible?',
      },
      answer: {
        ka: 'დიახ. შესაძლებელია მხოლოდ რისკ-ზონების დაფარვა — მაგალითად კაპოტის, ბამპერის, ფარების, სარკეების ან სხვა ყველაზე დაუცველი ელემენტების.',
        ru: 'Да. Можно оклеить только зоны риска — например, капот, бампер, фары, зеркала или другие наиболее уязвимые элементы.',
        en: 'Yes. You can cover just the risk zones — for example, the hood, bumper, headlights, mirrors, or other most vulnerable elements.',
      },
    },
    {
      question: {
        ka: 'შეიძლება თუ არა მატოვი ან სატინის ეფექტის PPF?',
        ru: 'Можно ли PPF с матовым или сатиновым эффектом?',
        en: 'Is matte or satin finish PPF available?',
      },
      answer: {
        ka: 'დიახ. სურვილის მიხედვით შესაძლებელია არა მხოლოდ გამჭვირვალე გლუვი, არამედ მატოვი ან სატინის ეფექტის დამცავი PPF ვარიანტებიც.',
        ru: 'Да. По желанию доступен не только прозрачный глянцевый, но и матовый или сатиновый варианты защитного PPF.',
        en: 'Yes. In addition to transparent gloss, matte and satin finish protective PPF options are also available.',
      },
    },
  ],

  'vinyl-wrapping': [
    {
      question: {
        ka: 'რით განსხვავდება ფერადი PPF და ვინილი?',
        ru: 'Чем отличается цветной PPF от винила?',
        en: 'What is the difference between colored PPF and vinyl?',
      },
      answer: {
        ka: 'ფერადი PPF უფრო პრემიუმ გადაწყვეტაა, რომელიც ვიზუალურ ეფექტთან ერთად დამატებით დაცვასაც იძლევა. ვინილი ძირითადად სტილისა და ფერის შეცვლისთვის გამოიყენება და უფრო ხელმისაწვდომი ალტერნატივაა.',
        ru: 'Цветной PPF — более премиальное решение, которое помимо визуального эффекта обеспечивает дополнительную защиту. Винил используется в основном для смены стиля и цвета и является более доступной альтернативой.',
        en: 'Colored PPF is a more premium solution that provides additional protection along with the visual effect. Vinyl is primarily used for style and color changes and is a more affordable alternative.',
      },
    },
    {
      question: {
        ka: 'რომელი ჯობია ფერის შეცვლისთვის?',
        ru: 'Что лучше для смены цвета?',
        en: 'Which is better for a color change?',
      },
      answer: {
        ka: 'თუ გსურთ უფრო მაღალი დონის შედეგი და დამატებითი დაცვა, ხშირად უკეთესი არჩევანია ფერადი PPF. თუ პრიორიტეტი უფრო მოქნილი ბიუჯეტია, კარგი ვარიანტია ვინილი.',
        ru: 'Если хотите результат более высокого уровня и дополнительную защиту, чаще лучший выбор — цветной PPF. Если приоритет — более гибкий бюджет, хороший вариант — винил.',
        en: 'If you want a higher-quality result with additional protection, colored PPF is often the better choice. If budget flexibility is the priority, vinyl is a good option.',
      },
    },
    {
      question: {
        ka: 'დიდია თუ არა სხვაობა ბიუჯეტში ფერად PPF-სა და ვინილს შორის?',
        ru: 'Большая ли разница в бюджете между цветным PPF и винилом?',
        en: 'Is there a big budget difference between colored PPF and vinyl?',
      },
      answer: {
        ka: 'სხვაობა დამოკიდებულია ავტომობილზე, მასალასა და სამუშაოს მოცულობაზე. ბევრ შემთხვევაში ფერადი PPF უფრო ძვირია, მაგრამ კლიენტისთვის უფრო ღირებული გადაწყვეტაა, რადგან ვიზუალთან ერთად დაცვასაც იღებს.',
        ru: 'Разница зависит от автомобиля, материала и объёма работ. Во многих случаях цветной PPF дороже, но для клиента это более ценное решение, так как визуал сочетается с защитой.',
        en: 'The difference depends on the car, material, and scope of work. In many cases colored PPF costs more, but it offers greater value since you get both visual effect and protection.',
      },
    },
    {
      question: {
        ka: 'თუ მინდა უფრო ხელმისაწვდომი ვარიანტი, აკეთებთ ვინილითაც?',
        ru: 'Если хочу более доступный вариант, делаете ли винилом тоже?',
        en: 'If I want a more affordable option, do you also work with vinyl?',
      },
      answer: {
        ka: 'დიახ. BESTAUTO-ში შესაძლებელია როგორც ფერადი PPF-ით, ისე ვინილით ფერის შეცვლა.',
        ru: 'Да. В BESTAUTO возможна смена цвета как цветным PPF, так и винилом.',
        en: 'Yes. At BESTAUTO, color change is available with both colored PPF and vinyl.',
      },
    },
    {
      question: {
        ka: 'იცავს თუ არა ფერადი PPF ავტომობილს დამატებით?',
        ru: 'Обеспечивает ли цветной PPF дополнительную защиту?',
        en: 'Does colored PPF provide additional protection?',
      },
      answer: {
        ka: 'დიახ. სწორედ ეს არის მისი ერთ-ერთი მთავარი უპირატესობა — ვიზუალური ცვლილება და დამატებითი დაცვა ერთდროულად.',
        ru: 'Да. Именно это одно из главных преимуществ — визуальное изменение и дополнительная защита одновременно.',
        en: 'Yes. This is one of its key advantages — visual change and additional protection at the same time.',
      },
    },
    {
      question: {
        ka: 'თუ მჭირდება მხოლოდ საღებავის დაცვა და არა ფერის შეცვლა?',
        ru: 'Если нужна только защита краски, а не смена цвета?',
        en: 'What if I only need paint protection, not a color change?',
      },
      answer: {
        ka: 'ამ შემთხვევაში უკეთესია იხილოთ ჩვენი ცალკე PPF გვერდი, რომელიც გამჭვირვალე დამცავ ფირზეა ორიენტირებული.',
        ru: 'В этом случае лучше посмотреть нашу отдельную страницу PPF, ориентированную на прозрачную защитную плёнку.',
        en: 'In that case, check our separate PPF page focused on transparent protective film.',
      },
    },
  ],

  'interior-cleaning': [
    {
      question: {
        ka: 'რა ღირს მანქანის ქიმწმენდა?',
        ru: 'Сколько стоит химчистка салона?',
        en: 'How much does interior cleaning cost?',
      },
      answer: {
        ka: 'ფასი დამოკიდებულია დაბინძურების დონეზე, მასალებზე და სამუშაოს სიღრმეზე. მსუბუქი დაბინძურების შემთხვევაში ფასი იწყება 400 Gel-დან. ზუსტი ღირებულებისთვის საკმარისია მოგვწეროთ და გამოგვიგზავნოთ სალონის ფოტოები.',
        ru: 'Химчистка при легком загрязнении — от 400 Gel, при среднем — от 500 Gel, при сильном — от 550 Gel. Также делаем ручную детейлинг-мойку (от 40 Gel) и устранение запахов озоном (от 50 Gel). Пришлите фото салона в WhatsApp — и мы назовем точную стоимость.',
        en: 'Light contamination cleaning starts from 400 Gel, medium from 500 Gel, heavy from 550 Gel. We also offer hand detailing wash (from 40 Gel) and ozone odor removal (from 50 Gel). Send us photos on WhatsApp and we\'ll give you an exact quote.',
      },
    },
    {
      question: {
        ka: 'შეგიძლიათ თუ არა უსიამოვნო სუნის მოცილება?',
        ru: 'Уберете ли запах сигарет или животных?',
        en: 'Can you remove cigarette or pet odors?',
      },
      answer: {
        ka: 'დიახ, საჭიროების შემთხვევაში ვიყენებთ ოზონირებას და პროფესიონალურ საშუალებებს, რომლებიც სუნს უბრალოდ არ ფარავს, არამედ რეალურად ამცირებს მის მიზეზს.',
        ru: 'Да. Используем озонатор и профессиональные энзимные составы, которые разрушают молекулы запаха, а не маскируют его. В 95% случаев полностью убираем запах за один сеанс.',
        en: 'Yes. We use an ozone generator and professional enzyme-based products that break down odor molecules rather than masking them. In 95% of cases, we completely eliminate the odor in a single session.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანში შრება სალონი ქიმწმენდის შემდეგ?',
        ru: 'Когда можно пользоваться автомобилем после химчистки?',
        en: 'When can I use my car after cleaning?',
      },
      answer: {
        ka: 'ბაზისური ქიმწმენდის შემდეგ — 4–6 საათში. სრულის შემდეგ — სჯობს დაელოდოთ სრულ გამოშრობას, ჩვეულებრივ 1-დან 3 დღემდე ტენიანობისა და მასალის ტიპის მიხედვით.',
        ru: 'После базовой химчистки — через 4–6 часов. После полной — лучше подождать до полного высыхания, обычно это занимает от 1 до 3 дней в зависимости от влажности и типа материалов.',
        en: 'After basic cleaning — in 4–6 hours. After full cleaning — it\'s better to wait for complete drying, which usually takes 1 to 3 days depending on humidity and material type.',
      },
    },
    {
      question: {
        ka: 'შეიძლება თუ არა ძველი ლაქების მოცილება?',
        ru: 'Можно ли вывести старые пятна?',
        en: 'Can you remove old stains?',
      },
      answer: {
        ka: 'ყავა, სისხლი, ცხიმი — დიახ, შემთხვევების 90%-ში სრულად ვაშორებთ. თუ ლაქა ძალიან ძველია ან სპეციფიკურია — წინასწარ გულახდილად გეტყვით. ნუ დააყოვნებთ: რაც უფრო ახალია ლაქა, მით მეტია სრული მოცილების შანსი.',
        ru: 'Кофе, кровь, жир — да, в 90% случаев убираем полностью. Если пятно очень старое или специфическое — честно предупредим заранее. Лучше не тянуть: чем свежее пятно, тем выше шанс полного удаления.',
        en: 'Coffee, blood, grease — yes, we remove them completely in 90% of cases. If a stain is very old or specific, we\'ll honestly let you know in advance. Don\'t wait: the fresher the stain, the higher the chance of complete removal.',
      },
    },
    {
      question: {
        ka: 'რა შედის სრულ ქიმწმენდაში?',
        ru: 'Что входит в полную химчистку?',
        en: 'What is included in a full interior cleaning?',
      },
      answer: {
        ka: 'სრული ქიმწმენდა მოიცავს სავარძლების, ჭერის, იატაკის, კარის ბარათების, საბარგულის და პლასტმასის ელემენტების ღრმა წმენდას. ზუსტი შემადგენლობა დამოკიდებულია ავტომობილის მდგომარეობაზე.',
        ru: 'Полная химчистка включает глубокую очистку сидений, потолка, пола, дверных карт, багажника и пластиковых элементов. Точный состав зависит от состояния автомобиля.',
        en: 'Full cleaning includes deep treatment of seats, headliner, floor, door panels, trunk, and plastic elements. The exact scope depends on the car condition.',
      },
    },
    {
      question: {
        ka: 'სად მდებარეობთ? საბურთალო და გლდანი?',
        ru: 'Где вы находитесь? Сабуртало и Глдани?',
        en: 'Where are you located? Saburtalo and Gldani?',
      },
      answer: {
        ka: 'BESTAUTO მუშაობს ორ ლოკაციაზე თბილისში — საბურთალოზე (ანა პოლიტკოვსკაიას 51) და გლდანში (გურამიშვილის 78). ჩაწერის დროს შეგარჩევინებთ მოსახერხებელ სტუდიას.',
        ru: 'BESTAUTO работает на двух локациях в Тбилиси — на Сабуртало (Анны Политковской 51) и в Глдани (Гурамишвили 78). При записи поможем выбрать удобную студию.',
        en: 'BESTAUTO operates at two locations in Tbilisi — Saburtalo (Anna Politkovskaya 51) and Gldani (Guramishvili 78). We\'ll help you choose the most convenient studio when booking.',
      },
    },
    {
      question: {
        ka: 'რამდენი ხანი სჭირდება ქიმწმენდას?',
        ru: 'Сколько времени занимает химчистка?',
        en: 'How long does interior cleaning take?',
      },
      answer: {
        ka: 'ბაზისური ქიმწმენდა — 4–6 საათი, სრული ღრმა ქიმწმენდა — 1–2 დღე ავტომობილის ზომისა და დაბინძურების ხარისხის მიხედვით.',
        ru: 'Базовая химчистка — 4–6 часов, полная глубокая — 1–2 дня в зависимости от размера автомобиля и степени загрязнения.',
        en: 'Basic cleaning takes 4–6 hours, full deep cleaning 1–2 days depending on the car size and contamination level.',
      },
    },
  ],

  'interior-restoration': [
    {
      question: {
        ka: 'რა ღირს სალონის რესტავრაცია?',
        ru: 'Сколько стоит реставрация салона?',
        en: 'How much does interior restoration cost?',
      },
      answer: {
        ka: 'საჭის რესტავრაცია — 280 Gel-დან, სავარძლის — 230 Gel-დან, სახელურის — 190 Gel-დან. სალონის ელემენტების პოლირება — 200 Gel-დან, პლასტმასის რემონტი — 200 Gel-დან. გამოგვიგზავნეთ დაზიანების ფოტო WhatsApp-ზე — გეტყვით ზუსტ ფასს.',
        ru: 'Реставрация руля — от 280 Gel, сиденья — от 230 Gel, подлокотника — от 190 Gel. Полировка элементов салона — от 200 Gel, ремонт пластика — от 200 Gel. Пришлите фото повреждения в WhatsApp — назовем точную стоимость.',
        en: 'Steering wheel restoration — from 280 Gel, seat — from 230 Gel, armrest — from 190 Gel. Interior elements polishing — from 200 Gel, plastic repair — from 200 Gel. Send us a photo of the damage on WhatsApp — we\'ll give you an exact quote.',
      },
    },
    {
      question: {
        ka: 'შესამჩნევი იქნება რემონტი?',
        ru: 'Будет ли заметен ремонт?',
        en: 'Will the repair be noticeable?',
      },
      answer: {
        ka: 'შემთხვევების 90%-ში — არა. ფერსა და ტექსტურას ზუსტად ვარჩევთ ორიგინალის შესაბამისად. გაჩვენებთ ანალოგიური სამუშაოების ფოტოებს მანამდე/მერე.',
        ru: 'В 90% случаев — нет. Мы подбираем цвет и текстуру с точностью до оттенка. Покажем фото до/после аналогичных работ, чтобы вы оценили качество.',
        en: 'In 90% of cases — no. We match color and texture precisely to the original shade. We\'ll show you before/after photos of similar work so you can judge the quality.',
      },
    },
    {
      question: {
        ka: 'არის თუ არა გარანტია?',
        ru: 'Есть ли гарантия?',
        en: 'Is there a warranty?',
      },
      answer: {
        ka: 'დიახ. საჭე — 1 წელი, ტყავის ელემენტები — 6 თვე, პლასტმასა — 6 თვე. ნორმალური ექსპლუატაციისას შედეგი საგარანტიო ვადაზე გაცილებით მეტს ძლებს.',
        ru: 'Да. Руль — 1 год, кожаные элементы — 6 месяцев, пластик — 6 месяцев. При нормальной эксплуатации результат держится значительно дольше гарантийного срока.',
        en: 'Yes. Steering wheel — 1 year, leather elements — 6 months, plastic — 6 months. With normal use, the result lasts much longer than the warranty period.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება რესტავრაცია?',
        ru: 'Сколько времени занимает реставрация?',
        en: 'How long does restoration take?',
      },
      answer: {
        ka: 'ლოკალური რემონტი (ნაკაწრი, დამწვრობა) — 2–4 საათი. საჭის გადაკვრა — 2–3 დღე. სალონის კომპლექსური რესტავრაცია — 3–5 დღე.',
        ru: 'Локальный ремонт (царапина, прожог) — 2–4 часа. Перетяжка руля — 2–3 дня. Комплексная реставрация салона — 3–5 дней.',
        en: 'Local repair (scratch, burn) — 2–4 hours. Steering wheel rewrap — 2–3 days. Full interior restoration — 3–5 days.',
      },
    },
    {
      question: {
        ka: 'რა ტიპის დაზიანებებს აღადგენთ?',
        ru: 'Какие повреждения можете восстановить?',
        en: 'What types of damage can you repair?',
      },
      answer: {
        ka: 'ნაკაწრები, გახეხილობა, სიგარეტის დამწვრობა, გახევა, ხვრელები, გაფერმკრთალებული ფერი, დაზიანებული ტყავი და პლასტმასა. თუ დაზიანება ძალიან სერიოზულია — გულახდილად გეტყვით და ალტერნატივას შემოგთავაზებთ.',
        ru: 'Царапины, потертости, прожоги сигаретой, разрывы, дыры, выцветший цвет, поврежденная кожа и пластик. Если повреждение слишком серьезное — честно скажем и предложим альтернативу.',
        en: 'Scratches, scuffs, cigarette burns, tears, holes, faded color, damaged leather and plastic. If the damage is too severe, we\'ll be honest and suggest alternatives.',
      },
    },
    {
      question: {
        ka: 'შესაძლებელია საჭის გადაკვრა ჩემი გემოვნებით?',
        ru: 'Можно ли перетянуть руль под свой вкус?',
        en: 'Can I customize my steering wheel?',
      },
      answer: {
        ka: 'დიახ. აირჩიეთ ტყავის ფერი, ტიპი (ნაპა, პერფორირებული, ეკოტყავი), ნაკერის ფერი და სტილი. სრულდება 2–3 დღეში. მუშაობის დაწყებამდე მასალების ნიმუშებს გაჩვენებთ.',
        ru: 'Да. Выбирайте цвет кожи, тип (наппа, перфорированная, экокожа), цвет строчки и её стиль. Выполняем за 2–3 дня. Покажем образцы материалов перед началом работы.',
        en: 'Yes. Choose leather color, type (nappa, perforated, eco-leather), stitching color and style. Completed in 2–3 days. We\'ll show you material samples before starting.',
      },
    },
    {
      question: {
        ka: 'რა მასალებს იყენებთ საჭისთვის?',
        ru: 'Какие материалы используете для руля?',
        en: 'What materials do you use for steering wheels?',
      },
      answer: {
        ka: 'ნატურალური ნაპა ტყავი, პერფორირებული ტყავი, პრემიუმ ეკოტყავი. ყველა მასალა მტკიცეა და სასიამოვნო შეხებით. ვარჩევთ ორიგინალის მიხედვით ან თქვენი სურვილით.',
        ru: 'Натуральная кожа наппа, перфорированная кожа, экокожа премиум-класса. Все материалы износостойкие и приятные на ощупь. Подбираем под оригинал или по вашему вкусу.',
        en: 'Natural nappa leather, perforated leather, premium eco-leather. All materials are durable and pleasant to touch. We match the original or customize to your preference.',
      },
    },
    {
      question: {
        ka: 'რა მასალებს იყენებთ სავარძლებისთვის?',
        ru: 'Какие материалы используете для сидений?',
        en: 'What materials do you use for seats?',
      },
      answer: {
        ka: 'ნატურალური ტყავი, ეკოტყავი, ქსოვილი, ალკანტარა. შეგვიძლია ორიგინალური გარსაცმის აღდგენა ან ახალ მასალაში სრულად გადაკვრა.',
        ru: 'Натуральная кожа, экокожа, ткань, алькантара. Можем восстановить оригинальную обивку или полностью перетянуть в новый материал.',
        en: 'Natural leather, eco-leather, fabric, alcantara. We can restore the original upholstery or fully rewrap in a new material.',
      },
    },
    {
      question: {
        ka: 'რომელი პლასტმასის ელემენტების აღდგენა შეიძლება?',
        ru: 'Какие пластиковые элементы можно восстановить?',
        en: 'Which plastic elements can be restored?',
      },
      answer: {
        ka: 'ტორპედო, კარის პანელები, ცენტრალური კონსოლი, სახელურები, საჭის სვეტი. ვაშორებთ ნაკაწრებს, ვაღვდგენთ ტექსტურასა და ფერს. სერიოზული დაზიანებების დროს შეგვიძლია შეღებვა ან გადაკვრა.',
        ru: 'Торпедо, дверные карты, центральную консоль, подлокотники, рулевую колонку. Убираем царапины, восстанавливаем текстуру и цвет. При серьезных повреждениях можем покрасить или обтянуть.',
        en: 'Dashboard, door panels, center console, armrests, steering column. We remove scratches, restore texture and color. For severe damage, we can paint or wrap the elements.',
      },
    },
  ],

  'auto-glass-tinting': [
    {
      question: {
        ka: 'რა ღირს მანქანის მინების დაბურვა?',
        ru: 'Сколько стоит тонировка?',
        en: 'How much does window tinting cost?',
      },
      answer: {
        ka: 'გვერდითა მინები (უკანა ან წინა) — 130 Gel-დან, უკანა მინა — 160 Gel-დან, საქარე მინა — 290 Gel-დან. ათერმული დაბურვა უფრო ძვირია. მოგვწერეთ WhatsApp-ზე — გამოვთვლით ზუსტ ფასს თქვენი ავტომობილისთვის.',
        ru: 'Тонировка боковых стекол (задних или передних) — от 130 Gel, заднее стекло — от 160 Gel, лобовое стекло — от 290 Gel. Атермальная тонировка стоит дороже. Напишите в WhatsApp — рассчитаем точную стоимость для вашего автомобиля.',
        en: 'Side windows (rear or front) — from 130 Gel, rear windshield — from 160 Gel, front windshield — from 290 Gel. Ceramic (athermal) tinting costs more. Message us on WhatsApp — we\'ll calculate the exact price for your car.',
      },
    },
    {
      question: {
        ka: 'რით განსხვავდება ატერმალური და კერამიკული ფირი?',
        ru: 'Какую пленку используете?',
        en: 'What film do you use?',
      },
      answer: {
        ka: 'LLumar — ჩვენ ოფიციალური დილერი ვართ. მწარმოებლის გარანტია 5 წლამდე. არ ვიყენებთ იაფ ჩინურ ანალოგებს, რომლებიც ნახევარ წელში ფერმკრთალდება.',
        ru: 'LLumar — мы официальный дилер. Гарантия от производителя до 5 лет. Не используем дешевые китайские аналоги, которые выгорают за полгода.',
        en: 'LLumar — we are an official dealer. Manufacturer warranty up to 5 years. We don\'t use cheap Chinese alternatives that fade in six months.',
      },
    },
    {
      question: {
        ka: 'არის თუ არა გარანტია?',
        ru: 'Есть ли гарантия?',
        en: 'Is there a warranty?',
      },
      answer: {
        ka: 'დიახ. სამუშაოზე გარანტია — 1 წელი, LLumar ფირზე — მწარმოებლისგან 5 წლამდე. ნორმალური ექსპლუატაციისას ფირი გაცილებით მეტს ძლებს.',
        ru: 'Да. Гарантия на работу — 1 год, на пленку LLumar — до 5 лет от производителя. При нормальной эксплуатации пленка служит значительно дольше.',
        en: 'Yes. Warranty on work — 1 year, on LLumar film — up to 5 years from the manufacturer. With normal use, the film lasts significantly longer.',
      },
    },
    {
      question: {
        ka: 'რა დონის დაბურვაა ნებადართული საქართველოში?',
        ru: 'Легальна ли тонировка в Грузии?',
        en: 'Is window tinting legal in Georgia?',
      },
      answer: {
        ka: 'წინა გვერდითა მინები — მინიმუმ 60% სინათლის გატარება, უკანა გვერდითა — მინიმუმ 75%, უკანა მინა — შეზღუდვის გარეშე. ფირს ვარჩევთ მკაცრად კანონის ფარგლებში, ჯარიმის რისკი გამორიცხულია.',
        ru: 'Да. Передние боковые — не менее 60% пропускания света, задние — не менее 75%, заднее стекло — без ограничений. Мы подберем пленку строго в рамках закона.',
        en: 'Yes. Front side windows must allow at least 60% light, rear at least 75%, rear windshield has no restrictions. We select film strictly within the law.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება მინების დაბურვა?',
        ru: 'Сколько времени занимает тонировка?',
        en: 'How long does tinting take?',
      },
      answer: {
        ka: '2–4 საათი მინების რაოდენობის მიხედვით. მნიშვნელოვანი: დაყენებიდან 3 დღე არ ჩამოუშვათ მინები, რათა ფირი სრულად მოეწყოს.',
        ru: '2–4 часа в зависимости от количества стекол. Важно: не опускайте стекла 3 дня после установки, чтобы пленка полностью приклеилась.',
        en: '2–4 hours depending on the number of windows. Important: don\'t lower windows for 3 days after installation to let the film fully adhere.',
      },
    },
    {
      question: {
        ka: 'ატერმალური ფირი რას აკეთებს?',
        ru: 'Что такое атермальная тонировка?',
        en: 'What is ceramic (athermal) tinting?',
      },
      answer: {
        ka: 'ათერმული ფირი სითბოს 60%-მდე ასხივებს და თითქმის გამჭვირვალე რჩება. იდეალურია საქარე და წინა მინებისთვის — კონდიციონერი ეფექტურად მუშაობს, საწვავის ხარჯი მცირდება.',
        ru: 'Атермальная пленка отражает до 60% тепла, оставаясь почти прозрачной. Идеальна для лобового и передних стекол. Кондиционер работает эффективнее, расход топлива на охлаждение снижается.',
        en: 'Ceramic film reflects up to 60% of heat while remaining nearly transparent. Ideal for windshield and front windows. Air conditioning works more efficiently, fuel consumption for cooling decreases.',
      },
    },
    {
      question: {
        ka: 'შეიძლება თუ არა წინა საქარე მინაზე დაბურვა?',
        ru: 'Можно ли тонировать лобовое стекло?',
        en: 'Can the front windshield be tinted?',
      },
      answer: {
        ka: 'დიახ. საქარე მინაზე შესაძლებელია ატერმალური ფირის დატანა, რომელიც ამცირებს სიცხეს და ულტრაიისფერ ზემოქმედებას, ხილვადობის შენარჩუნებით.',
        ru: 'Да. На лобовое стекло можно нанести атермальную плёнку, которая снижает нагрев и ультрафиолет при сохранении видимости.',
        en: 'Yes. An athermal film can be applied to the windshield, reducing heat and UV while maintaining visibility.',
      },
    },
    {
      question: {
        ka: 'ხდებით თუ არა ადგილზე მისვლით?',
        ru: 'Вы выезжаете на место для тонировки?',
        en: 'Do you offer mobile tinting service?',
      },
      answer: {
        ka: 'მინების დაბურვა ადგილზე მისვლით შესაძლებელია შეთანხმებით. დაგვიკავშირდით WhatsApp-ზე — შევათანხმებთ დროსა და პირობებს.',
        ru: 'Тонировка с выездом возможна по договоренности. Свяжитесь с нами в WhatsApp — согласуем время и условия.',
        en: 'Mobile tinting is available by arrangement. Contact us on WhatsApp — we\'ll agree on time and conditions.',
      },
    },
  ],

  'windshield-repair': [
    {
      question: {
        ka: 'რა ღირს საქარე მინის აღდგენა?',
        ru: 'Сколько стоит ремонт скола?',
        en: 'How much does chip repair cost?',
      },
      answer: {
        ka: 'ჩიპი 1 სმ-მდე — 60 Gel-დან, ჩიპი 1–2 სმ — 80 Gel-დან. ბზარი 15 სმ-მდე — 95 Gel-დან, ბზარი 15–30 სმ — 140 Gel-დან. 5–10-ჯერ იაფია ვიდრე მინის შეცვლა. გამოგვიგზავნეთ ფოტო WhatsApp-ზე — უფასოდ შევაფასებთ.',
        ru: 'Скол до 1 см — от 60 Gel, скол 1–2 см — от 80 Gel. Трещина до 15 см — от 95 Gel, трещина 15–30 см — от 140 Gel. В 5–10 раз дешевле замены стекла. Пришлите фото в WhatsApp — оценим бесплатно.',
        en: 'Chip up to 1 cm — from 60 Gel, chip 1–2 cm — from 80 Gel. Crack up to 15 cm — from 95 Gel, crack 15–30 cm — from 140 Gel. 5–10 times cheaper than windshield replacement. Send a photo on WhatsApp — we\'ll estimate for free.',
      },
    },
    {
      question: {
        ka: 'ყველა ბზარის შეკეთება შეიძლება?',
        ru: 'Какие повреждения можно отремонтировать?',
        en: 'What types of damage can be repaired?',
      },
      answer: {
        ka: 'ჩიპები 25 მმ-მდე, ბზარები 15 სმ-მდე. რაც უფრო ახალია დაზიანება, მით უკეთესი შედეგი. თუ ჩიპში ჭუჭყი უკვე მოხვდა — შედეგი შეიძლება ცოტა უარესი იყოს, მაგრამ შეკეთება მაინც შეაჩერებს გავრცელებას.',
        ru: 'Сколы до 25 мм, трещины до 15 см. Чем свежее повреждение — тем лучше результат. Если в скол уже попала грязь — результат может быть хуже, но ремонт всё равно остановит распространение.',
        en: 'Chips up to 25 mm, cracks up to 15 cm. The fresher the damage, the better the result. If dirt has already entered the chip, the result may be slightly worse, but repair will still stop it from spreading.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება საქარე მინის შეკეთება?',
        ru: 'Сколько времени занимает ремонт?',
        en: 'How long does the repair take?',
      },
      answer: {
        ka: 'ჩიპი — 20–30 წუთი, ბზარი — 30–60 წუთი. შეკეთებისთანავე შეგიძლიათ წახვიდეთ.',
        ru: 'Скол — 20–30 минут, трещина — 30–60 минут. Уехать можно сразу после ремонта.',
        en: 'Chip — 20–30 minutes, crack — 30–60 minutes. You can drive away immediately after repair.',
      },
    },
    {
      question: {
        ka: 'რა ჯობს — შეკეთება თუ შეცვლა?',
        ru: 'Когда ремонтировать, а когда менять стекло?',
        en: 'When to repair and when to replace?',
      },
      answer: {
        ka: 'შეკეთება: ჩიპები 25 მმ-მდე, ბზარები 15 სმ-მდე, არა მინის კიდეზე. შეცვლა: ბზარი კიდიდან კიდემდე, დაზიანება კამერების/სენსორების ზონაში, მრავალი ჩიპი. გულახდილად გირჩევთ, რა არის საუკეთესო თქვენს შემთხვევაში.',
        ru: 'Ремонт: сколы до 25 мм, трещины до 15 см, не на краю стекла. Замена: трещина от края до края, повреждения в зоне камер/датчиков, множественные сколы. Подскажем честно, что лучше в вашем случае.',
        en: 'Repair: chips up to 25 mm, cracks up to 15 cm, not on the glass edge. Replace: edge-to-edge crack, damage in camera/sensor areas, multiple chips. We\'ll honestly advise what\'s best in your case.',
      },
    },
    {
      question: {
        ka: 'რამდენად შესამჩნევი რჩება კვალი შეკეთების შემდეგ?',
        ru: 'Будет ли видно место ремонта?',
        en: 'Will the repair spot be visible?',
      },
      answer: {
        ka: 'გამჭვირვალობა 90–95%-ით აღდგება. პატარა წერტილი შეიძლება დარჩეს, მაგრამ ხილვადობას არ აფერხებს და მანძილიდან არ შეიმჩნევა.',
        ru: 'Прозрачность восстанавливается на 90–95%. Мелкая точка может остаться, но она не мешает обзору и не заметна на расстоянии.',
        en: 'Transparency is restored to 90–95%. A tiny dot may remain, but it doesn\'t obstruct visibility and isn\'t noticeable from a distance.',
      },
    },
    {
      question: {
        ka: 'რატომ არ უნდა გადავდო შეკეთება?',
        ru: 'Почему не стоит откладывать ремонт?',
        en: 'Why shouldn\'t I delay the repair?',
      },
      answer: {
        ka: 'რაც უფრო ახალია დაზიანება, მით უკეთესი შედეგი მიიღწევა. დროის გასვლასთან ერთად ბზარი შეიძლება გაიზარდოს, ჭუჭყი მოხვდეს შიგნით და შეკეთება გაძნელდეს ან შეუძლებელი გახდეს.',
        ru: 'Чем свежее повреждение, тем лучше результат. Со временем трещина может разрастись, грязь попадёт внутрь, и ремонт станет сложнее или невозможен.',
        en: 'The fresher the damage, the better the result. Over time, cracks can grow, dirt can get inside, and repair becomes harder or impossible.',
      },
    },
    {
      question: {
        ka: 'ხდებით თუ არა გამოძახებით?',
        ru: 'Вы выезжаете на место?',
        en: 'Do you offer mobile repair?',
      },
      answer: {
        ka: 'დიახ, საქარე მინის აღდგენა გამოძახებით შესაძლებელია. დაგვიკავშირდით WhatsApp-ზე — შევათანხმებთ დროსა და ადგილს.',
        ru: 'Да, ремонт лобового стекла возможен с выездом. Свяжитесь с нами в WhatsApp — согласуем время и место.',
        en: 'Yes, mobile windshield repair is available. Contact us on WhatsApp — we\'ll agree on time and location.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანში აღდგება ნაკენჭარი?',
        ru: 'За сколько времени заделается скол?',
        en: 'How quickly is a chip repaired?',
      },
      answer: {
        ka: 'ნაკენჭარის აღდგენა 20–30 წუთს გრძელდება. შეკეთებისთანავე შეგიძლიათ ავტომობილით წახვიდეთ.',
        ru: 'Ремонт скола занимает 20–30 минут. Уехать можно сразу после завершения.',
        en: 'Chip repair takes 20–30 minutes. You can drive away immediately after.',
      },
    },
  ],

  'car-soundproofing': [
    {
      question: {
        ka: 'რა ღირს ხმაურის იზოლაცია?',
        ru: 'Сколько стоит шумоизоляция?',
        en: 'How much does soundproofing cost?',
      },
      answer: {
        ka: 'კარების ხმაურიზოლაცია — 900 Gel-დან, იატაკის — 1000 Gel-დან, საბარგულის — 600 Gel-დან, თაღების — 600 Gel-დან. ავტომობილის სრული ხმაურიზოლაცია — 2100 Gel-დან. მოგვწერეთ WhatsApp-ზე ფასის გათვლისთვის.',
        ru: 'Шумоизоляция дверей — от 900 Gel, пола — от 1000 Gel, багажника — от 600 Gel, колесных арок — от 600 Gel. Полная шумоизоляция автомобиля — от 2100 Gel. Напишите в WhatsApp для расчета стоимости.',
        en: 'Door soundproofing — from 900 Gel, floor — from 1000 Gel, trunk — from 600 Gel, wheel arches — from 600 Gel. Full car soundproofing — from 2100 Gel. Message us on WhatsApp for a price quote.',
      },
    },
    {
      question: {
        ka: 'არის თუ არა გარანტია?',
        ru: 'Есть ли гарантия?',
        en: 'Is there a warranty?',
      },
      answer: {
        ka: 'დიახ, 2-წლიანი გარანტია სამუშაოზე. მასალები ავტომობილის მთელი ვადის განმავლობაში ძლებს. მუშაობის მთელი პერიოდის განმავლობაში არცერთი საგარანტიო შემთხვევა.',
        ru: 'Да, 2 года гарантии на работу. Материалы служат весь срок эксплуатации автомобиля. За всё время работы ни одного гарантийного случая.',
        en: 'Yes, 2-year warranty on workmanship. Materials last the entire life of the car. In all our years of work, not a single warranty case.',
      },
    },
    {
      question: {
        ka: 'ხმის იზოლაცია რას აუმჯობესებს?',
        ru: 'Что такое шумоизоляция автомобиля?',
        en: 'What is car soundproofing?',
      },
      answer: {
        ka: 'ეს არის სპეციალური მასალების (ვიბრო- და ხმაურშთამნთქმელი) დაყენება ავტომობილის კუზოვის პანელებზე. ამცირებს გზის ხმაურს, ვიბრაციას, აუმჯობესებს კომფორტს და აუდიოსისტემის ხმის ხარისხს.',
        ru: 'Это установка специальных материалов (вибро- и шумопоглощающих) на кузовные панели автомобиля. Снижает дорожный шум, вибрации, улучшает комфорт и качество звука аудиосистемы.',
        en: 'It\'s the installation of special materials (vibration-dampening and sound-absorbing) on the car\'s body panels. Reduces road noise, vibrations, improves comfort and audio system sound quality.',
      },
    },
    {
      question: {
        ka: 'რომელი ზონების იზოლაცია იძლევა ყველაზე დიდ ეფექტს?',
        ru: 'Какие зоны можно шумоизолировать?',
        en: 'What areas can be soundproofed?',
      },
      answer: {
        ka: 'კარები, იატაკი, ჭერი, თაღები, ძრავის ფარი, საბარგული. კარები + იატაკი ეფექტის 70%-ს იძლევა სრული ხმაურიზოლაციის ღირებულების 40%-ად — ეს ოპტიმალური ვარიანტია უმეტესი ავტომობილებისთვის.',
        ru: 'Двери, пол, потолок, арки, моторный щит, багажник. Двери + пол дают 70% эффекта за 40% стоимости полной шумоизоляции — это оптимальный вариант для большинства автомобилей.',
        en: 'Doors, floor, roof, wheel arches, firewall, trunk. Doors + floor provide 70% of the effect for 40% of the full soundproofing cost — the optimal choice for most cars.',
      },
    },
    {
      question: {
        ka: 'რით განსხვავდება ხმის და ვიბრო იზოლაცია?',
        ru: 'Чем отличается звуко- и виброизоляция?',
        en: 'What is the difference between sound and vibration insulation?',
      },
      answer: {
        ka: 'ვიბრო იზოლაცია პირველ რიგში ამცირებს კორპუსის პანელების ვიბრაციას, ხოლო ხმის იზოლაცია სალონში შემოსულ გარე ხმაურს ამცირებს. საუკეთესო შედეგისთვის ხშირად გამოიყენება ორივეს კომბინაცია.',
        ru: 'Виброизоляция в первую очередь снижает вибрацию панелей кузова, а шумоизоляция уменьшает внешний шум, проникающий в салон. Для лучшего результата часто используется комбинация обоих.',
        en: 'Vibration insulation primarily reduces body panel vibration, while sound insulation reduces external noise entering the cabin. For the best result, a combination of both is often used.',
      },
    },
    {
      question: {
        ka: 'რამდენად იმატებს ავტომობილის წონა?',
        ru: 'Насколько увеличивается вес автомобиля?',
        en: 'How much weight does it add to the car?',
      },
      answer: {
        ka: 'სრული ხმის იზოლაცია საშუალოდ 20–40 კგ-ს ამატებს, რაც ავტომობილის დინამიკაზე და საწვავის ხარჯზე პრაქტიკულად არ აისახება.',
        ru: 'Полная шумоизоляция добавляет в среднем 20–40 кг, что практически не влияет на динамику автомобиля и расход топлива.',
        en: 'Full soundproofing adds an average of 20–40 kg, which has virtually no effect on the car\'s dynamics or fuel consumption.',
      },
    },
    {
      question: {
        ka: 'შეიძლება თუ არა მხოლოდ კარების ან საბარგულის იზოლაცია?',
        ru: 'Можно ли сделать только двери или багажник?',
        en: 'Can I soundproof just the doors or trunk?',
      },
      answer: {
        ka: 'დიახ. შესაძლებელია კონკრეტული ზონების ნაწილობრივი დამუშავება — კარები, საბარგული, იატაკი ან თაღები ცალ-ცალკე.',
        ru: 'Да. Возможна обработка отдельных зон — дверей, багажника, пола или арок по отдельности.',
        en: 'Yes. Partial treatment of specific zones is possible — doors, trunk, floor, or arches separately.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ხმის იზოლაციის მონტაჟი?',
        ru: 'Сколько времени занимает установка шумоизоляции?',
        en: 'How long does soundproofing installation take?',
      },
      answer: {
        ka: 'კარები — 1 დღე, იატაკი — 1–2 დღე, სრული ხმის იზოლაცია — 3–5 დღე. ვადა დამოკიდებულია ავტომობილის მოდელზე.',
        ru: 'Двери — 1 день, пол — 1–2 дня, полная шумоизоляция — 3–5 дней. Сроки зависят от модели автомобиля.',
        en: 'Doors — 1 day, floor — 1–2 days, full soundproofing — 3–5 days. Timing depends on the car model.',
      },
    },
  ],

  'computer-diagnostics': [
    {
      question: {
        ka: 'რა ღირს კომპიუტერული დიაგნოსტიკა?',
        ru: 'Сколько стоит компьютерная диагностика?',
        en: 'How much does computer diagnostics cost?',
      },
      answer: {
        ka: 'სრული დიაგნოსტიკა — 50 Gel-დან, გასაღების დაპროგრამება — 200 Gel-დან. მოგვწერეთ WhatsApp-ზე ფასის დასაზუსტებლად.',
        ru: 'Полная диагностика — от 50 Gel, программирование ключа — от 200 Gel. Напишите в WhatsApp для уточнения стоимости.',
        en: 'Full diagnostics — from 50 Gel, key programming — from 200 Gel. Message us on WhatsApp for pricing details.',
      },
    },
    {
      question: {
        ka: 'რა მოხდება, თუ პრობლემები აღმოჩნდება?',
        ru: 'Что если найдутся проблемы?',
        en: 'What if problems are found?',
      },
      answer: {
        ka: 'მიიღებთ დეტალურ ანგარიშს ყოველი შეცდომის აღწერით, ფოტოებითა და რეკომენდაციებით. პრიორიტეტებს ვადგენთ: რა არის კრიტიკული, რა შეიძლება დაელოდოს. რემონტის გადაწყვეტილება ყოველთვის თქვენია.',
        ru: 'Вы получите подробный отчет с описанием каждой ошибки, фото и рекомендациями. Мы расставляем приоритеты: что критично, что может подождать. Решение о ремонте всегда за вами.',
        en: 'You\'ll receive a detailed report with each error described, photos, and recommendations. We prioritize issues: what\'s critical, what can wait. The decision to repair is always yours.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება დიაგნოსტიკა?',
        ru: 'Сколько времени занимает диагностика?',
        en: 'How long does diagnostics take?',
      },
      answer: {
        ka: 'ბაზისური — 30–40 წუთი, გაფართოებული — 1–1.5 საათი. შედეგს დასრულებისთანავე მიიღებთ.',
        ru: 'Базовая — 30–40 минут, расширенная — 1–1.5 часа. Результат получаете сразу по окончании.',
        en: 'Basic — 30–40 minutes, extended — 1–1.5 hours. You get results immediately upon completion.',
      },
    },
    {
      question: {
        ka: 'რა ავტომობილებს ამოწმებთ?',
        ru: 'Какие автомобили диагностируете?',
        en: 'What cars do you diagnose?',
      },
      answer: {
        ka: 'ყველა მარკასა და მოდელს. მულტიმარკიანი სკანერები + დილერის პროგრამული უზრუნველყოფა პოპულარული ბრენდებისთვის. ელექტრომობილები და ჰიბრიდები — ასევე.',
        ru: 'Все марки и модели. Мультимарочные сканеры + дилерское ПО для популярных брендов. Электромобили и гибриды — тоже.',
        en: 'All makes and models. Multi-brand scanners plus dealer software for popular brands. Electric vehicles and hybrids included.',
      },
    },
    {
      question: {
        ka: 'როდის არის საჭირო კომპიუტერული დიაგნოსტიკა?',
        ru: 'Когда нужна компьютерная диагностика?',
        en: 'When do you need computer diagnostics?',
      },
      answer: {
        ka: 'Check Engine ანთია, მეორადი ავტო ყიდვამდე, ავარიის შემდეგ, სიმძლავრის დაკარგვა, საწვავის გაზრდილი ხარჯი. პროფილაქტიკისთვის გირჩევთ წელიწადში ერთხელ.',
        ru: 'Загорелся Check Engine, перед покупкой б/у авто, после ДТП, потеря мощности, повышенный расход топлива. Для профилактики рекомендуем раз в год.',
        en: 'Check Engine light on, before buying a used car, after an accident, power loss, increased fuel consumption. For prevention, we recommend once a year.',
      },
    },
    {
      question: {
        ka: 'შეგიძლიათ შეცდომების წაშლა?',
        ru: 'Можете ли сбросить ошибки?',
        en: 'Can you clear error codes?',
      },
      answer: {
        ka: 'დიახ, მაგრამ მხოლოდ მიზეზის გარკვევის შემდეგ. კოდების უბრალოდ წაშლა მიზეზის აღმოფხვრის გარეშე აზრს მოკლებულია — შეცდომა დაბრუნდება. ყოველთვის ავხსნით, რამ გამოიწვია შეცდომა და საჭიროა თუ არა რემონტი.',
        ru: 'Да, но только после выяснения причины. Простой сброс без устранения причины бессмысленен — ошибка вернется. Мы всегда объясняем, что вызвало ошибку и нужен ли ремонт.',
        en: 'Yes, but only after identifying the cause. Simply clearing codes without fixing the issue is pointless — the error will return. We always explain what caused the error and whether repair is needed.',
      },
    },
    {
      question: {
        ka: 'აკეთებთ თუ არა ყიდვამდე შემოწმებას?',
        ru: 'Делаете ли проверку перед покупкой?',
        en: 'Do you offer pre-purchase inspections?',
      },
      answer: {
        ka: 'დიახ, ეს ერთ-ერთი ჩვენი მთავარი მომსახურებაა. ვამოწმებთ ყველა სისტემას, გარბენს (დატრიალებულია თუ არა), შეცდომების ისტორიას, აკუმულატორის მდგომარეობას, ძრავისა და ტრანსმისიის მუშაობას. სრული ანგარიში — ავტომობილის მდგომარეობის გულახდილი სურათი.',
        ru: 'Да, это одна из наших ключевых услуг. Проверяем все системы, пробег (скрученный или нет), историю ошибок, состояние АКБ, работу двигателя и трансмиссии. Полный отчет — честная картина состояния автомобиля.',
        en: 'Yes, it\'s one of our key services. We check all systems, mileage (rolled back or not), error history, battery condition, engine and transmission performance. Full report — an honest picture of the car\'s condition.',
      },
    },
    {
      question: {
        ka: 'შემიძლია თუ არა დიაგნოსტიკის თვითონ გაკეთება?',
        ru: 'Можно ли сделать диагностику самостоятельно?',
        en: 'Can I run diagnostics myself?',
      },
      answer: {
        ka: 'OBD2-სკანერი 30–50 Gel-ად ძრავის ბაზისურ შეცდომებს აჩვენებს. მაგრამ სისტემების 80%-ს ვერ ხედავს: ბალიშები, ABS, ტრანსმისია, კლიმატ-კონტროლი. პროფესიონალური დიაგნოსტიკა ავტომობილის ყველა სისტემას მოიცავს.',
        ru: 'OBD2-сканер за 30–50 Gel показывает базовые ошибки двигателя. Но он не видит 80% систем: подушки безопасности, АБС, трансмиссию, климат-контроль. Профессиональная диагностика охватывает все системы автомобиля.',
        en: 'An OBD2 scanner for 30–50 Gel shows basic engine errors. But it misses 80% of systems: airbags, ABS, transmission, climate control. Professional diagnostics covers all vehicle systems.',
      },
    },
  ],

  'paintless-dent-repair': [
    {
      question: {
        ka: 'რა ღირს ჩაზნექილობის მოცილება?',
        ru: 'Сколько стоит удаление вмятины?',
        en: 'How much does dent removal cost?',
      },
      answer: {
        ka: 'ერთ ელემენტზე ჩაზნექილობის მოცილება — 250 Gel-დან. სეტყვის დაზიანების შეკეთება — 1800 Gel-დან. ზუსტი ფასი დამოკიდებულია ზომაზე, მდებარეობასა და რაოდენობაზე. გამოგვიგზავნეთ ფოტო WhatsApp-ზე — უფასოდ შევაფასებთ.',
        ru: 'Удаление вмятины на одном элементе — от 250 Gel. Удаление вмятин от града — от 1800 Gel. Точная цена зависит от размера, расположения и количества вмятин. Пришлите фото в WhatsApp — оценим бесплатно.',
        en: 'Single panel dent removal starts from 250 Gel. Hail damage repair starts from 1800 Gel. The exact price depends on size, location, and number of dents. Send a photo on WhatsApp — we\'ll estimate for free.',
      },
    },
    {
      question: {
        ka: 'შესამჩნევი იქნება რემონტის ადგილი?',
        ru: 'Будет ли видно место ремонта?',
        en: 'Will the repair spot be visible?',
      },
      answer: {
        ka: 'შემთხვევების 95%-ში — არა. შედეგს სპეციალურ განათებაში ვამოწმებთ. თუ PDR თქვენს შემთხვევას არ შეეფერება — გულახდილად გეტყვით და ალტერნატივას შემოგთავაზებთ.',
        ru: 'В 95% случаев — нет. Мы проверяем результат при специальном освещении. Если PDR не подходит для вашего случая — скажем честно и предложим альтернативу.',
        en: 'In 95% of cases — no. We verify the result under specialized lighting. If PDR isn\'t suitable for your case, we\'ll be honest and suggest an alternative.',
      },
    },
    {
      question: {
        ka: 'არის თუ არა გარანტია?',
        ru: 'Есть ли гарантия?',
        en: 'Is there a warranty?',
      },
      answer: {
        ka: 'დიახ, უვადო გარანტია სამუშაოზე. სწორად მოცილებული ჩაზნექილობა არ ბრუნდება — ლითონი სამუდამოდ იღებს თავდაპირველ ფორმას.',
        ru: 'Да, пожизненная гарантия на работу. Правильно удаленная вмятина не возвращается — метал принимает исходную форму навсегда.',
        en: 'Yes, lifetime warranty on our work. A properly removed dent doesn\'t come back — the metal takes its original shape permanently.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ჩაზნექილობის მოცილება?',
        ru: 'Сколько времени занимает удаление?',
        en: 'How long does dent removal take?',
      },
      answer: {
        ka: 'მცირე ჩაზნექილობა — 30–60 წუთი. რამდენიმე ჩაზნექილობა — 2–4 საათი. სეტყვის დაზიანება — 1–2 დღე. ზუსტი ვადა სირთულეზეა დამოკიდებული.',
        ru: 'Мелкая вмятина — 30–60 минут. Несколько вмятин — 2–4 часа. Градовые повреждения — 1–2 дня. Точные сроки зависят от сложности.',
        en: 'Small dent — 30–60 minutes. Multiple dents — 2–4 hours. Hail damage — 1–2 days. Exact timing depends on complexity.',
      },
    },
    {
      question: {
        ka: 'რომელი ჩაზნექილობების მოცილება შეიძლება უშეღებავად?',
        ru: 'Какие вмятины можно убрать без покраски?',
        en: 'What dents can be removed without painting?',
      },
      answer: {
        ka: 'ნებისმიერი ჩაზნექილობა მკვეთრი ნაოჭებისა და საღებავის დაზიანების გარეშე. არ ვარგა: მკვეთრი ნაოჭები, დაზიანებები სიმტკიცის წიბოებზე, ბზარიანი საღებავით ჩაზნექილობები. ასეთ შემთხვევებში საჭიროა ტრადიციული კუზოვის რემონტი.',
        ru: 'Любые вмятины без заломов и повреждения лакокрасочного покрытия. НЕ подходит: острые заломы, повреждения на ребрах жесткости, вмятины с трещинами краски. В этих случаях нужен кузовной ремонт.',
        en: 'Any dents without sharp creases or paint damage. NOT suitable: sharp creases, damage on body lines, dents with cracked paint. These cases require traditional body repair.',
      },
    },
    {
      question: {
        ka: 'რატომ არის PDR უკეთესი ტრადიციულ რემონტზე?',
        ru: 'Почему PDR лучше рихтовки?',
        en: 'Why is PDR better than traditional repair?',
      },
      answer: {
        ka: 'PDR ინარჩუნებს ქარხნულ საღებავს — ეს მნიშვნელოვანია ავტომობილის ღირებულებისთვის. 2–3-ჯერ იაფია ვიდრე ტრადიციული რემონტი შეღებვით. სრულდება საათებში და არა დღეებში. არ გჭირდებათ შემცვლელი მანქანა.',
        ru: 'PDR сохраняет заводское лакокрасочное покрытие — это важно для стоимости авто. В 2–3 раза дешевле классической рихтовки с покраской. Выполняется за часы, а не за дни. Не нужна подменная машина.',
        en: 'PDR preserves the factory paint — important for your car\'s value. 2–3 times cheaper than traditional repair with repainting. Done in hours, not days. No need for a rental car.',
      },
    },
    {
      question: {
        ka: 'როგორ მიმდინარეობს PDR პროცესი?',
        ru: 'Как проходит процесс PDR?',
        en: 'How does the PDR process work?',
      },
      answer: {
        ka: 'დაზიანების შემოწმება სპეციალურ განათებაში. პანელის უკანა მხარეზე წვდომა. ჩაზნექილობის ამოწნეხვა სპეციალური ბერკეტებით ან წებოვანი ტექნოლოგიით (რთულ ადგილებში). საბოლოო შემოწმება განათებაში.',
        ru: 'Осмотр повреждений при специальном освещении. Получение доступа к обратной стороне панели. Выдавливание вмятины специальными рычагами или клеевая технология (для сложных мест). Финальная проверка при освещении.',
        en: 'Inspection of damage under specialized lighting. Gaining access to the back of the panel. Pushing out the dent with special rods or glue pull technique (for hard-to-reach areas). Final inspection under lighting.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა წინასწარ ჩაწერა?',
        ru: 'Нужно ли записываться заранее?',
        en: 'Do I need to book in advance?',
      },
      answer: {
        ka: 'სასურველია 1–2 დღით ადრე. მცირე ჩაზნექილობები ზოგჯერ იმავე დღეს შეგვიძლია. მოგვწერეთ WhatsApp-ზე — გირჩევთ უახლოეს თავისუფალ დროს.',
        ru: 'Желательно за 1–2 дня. Мелкие вмятины иногда можем принять в день обращения. Напишите в WhatsApp — подскажем ближайшее свободное время.',
        en: 'Preferably 1–2 days ahead. Small dents can sometimes be handled same day. Message us on WhatsApp — we\'ll suggest the nearest available slot.',
      },
    },
    {
      question: {
        ka: 'რა არის PDR?',
        ru: 'Что такое PDR?',
        en: 'What is PDR?',
      },
      answer: {
        ka: 'PDR (Paintless Dent Repair) — ჩაზნექილობების მოცილების ტექნოლოგია ქარხნული საღებავის დაზიანების გარეშე. ოსტატი ჩაზნექილობას შიგნიდან ამოწნეხს სპეციალური ინსტრუმენტებით, ლითონს თავდაპირველ ფორმას უბრუნებს.',
        ru: 'PDR (Paintless Dent Repair) — технология удаления вмятин без повреждения заводской краски. Мастер выдавливает вмятину изнутри специальными инструментами, возвращая металлу оригинальную форму.',
        en: 'PDR (Paintless Dent Repair) is a technology for removing dents without damaging factory paint. A specialist pushes the dent out from the inside using special tools, returning the metal to its original shape.',
      },
    },
  ],

  'carwash': [
    {
      question: {
        ka: 'რა განსხვავებაა 2-ფაზიან და 3-ფაზიან დეტეილინგ რეცხვას შორის?',
        ru: 'Чем детейлинг мойка отличается от обычной мойки?',
        en: 'What is the difference between a detailing wash and a regular car wash?',
      },
      answer: {
        ka: 'დეტეილინგ რეცხვა არის საფუძვლიანი ხელით რეცხვა ორი ვედრის მეთოდით. პროცესი 2–3 საათს გრძელდება, გამოიყენება pH-ნეიტრალური ქიმია, რომელიც უსაფრთხოა კერამიკული და PPF საფარისთვის, და ხსნის დაბინძურებას, რომელსაც ავტომატური სარეცხი ვერ ხსნის.',
        ru: 'Детейлинг мойка — это тщательная ручная мойка методом двух вёдер. Она занимает 2–3 часа, выполняется с применением pH-нейтральной химии, безопасной для керамических покрытий и PPF, и устраняет загрязнения, которые не удаляет автоматизированная мойка.',
        en: 'A detailing wash is a thorough hand wash using the two-bucket method. It takes 2–3 hours, uses pH-neutral chemicals safe for ceramic coatings and PPF, and removes contamination that automated car washes cannot.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება მანქანის რეცხვა?',
        ru: 'Сколько времени занимает детейлинг мойка?',
        en: 'How long does a detailing car wash take?',
      },
      answer: {
        ka: 'დეტეილინგ რეცხვა საშუალოდ 2–3 საათს მოითხოვს, ავტომობილის ზომისა და დაბინძურების ხარისხის მიხედვით.',
        ru: 'Детейлинг мойка занимает в среднем 2–3 часа в зависимости от размера и степени загрязнения автомобиля.',
        en: 'A detailing car wash typically takes 2–3 hours, depending on the vehicle\'s size and level of contamination.',
      },
    },
    {
      question: {
        ka: 'უსაფრთხოა თუ არა რეცხვა PPF-ისთვის და კერამიკისთვის?',
        ru: 'Можно ли мыть автомобиль с керамическим покрытием или PPF?',
        en: 'Can I wash a car with a ceramic coating or PPF?',
      },
      answer: {
        ka: 'დიახ. ჩვენ ვიყენებთ პროფესიონალურ pH-ნეიტრალურ ქიმიას, რომელიც სრულიად უსაფრთხოა კერამიკული საფარისა და PPF-ფილმისთვის.',
        ru: 'Да. Мы используем профессиональную pH-нейтральную химию, которая полностью безопасна для керамических покрытий и PPF-плёнок.',
        en: 'Yes. We use professional pH-neutral products that are completely safe for ceramic coatings and PPF films.',
      },
    },
    {
      question: {
        ka: 'რა ქიმიას იყენებთ?',
        ru: 'Какую химию вы используете при мойке?',
        en: 'What products do you use for washing?',
      },
      answer: {
        ka: 'ჩვენ ვიყენებთ პროფესიონალურ pH-ნეიტრალურ ავტოქიმიას, რომელიც უსაფრთხოა ყველა სახის საფარისთვის, საღებავისა და დამცავი ფილმისთვის.',
        ru: 'Мы применяем профессиональные pH-нейтральные автокосметические средства, безопасные для всех видов покрытий, лакокрасочного покрытия и защитных плёнок.',
        en: 'We use professional pH-neutral car care products that are safe for all types of coatings, paintwork, and protective films.',
      },
    },
    {
      question: {
        ka: 'რა ღირს მანქანის რეცხვა?',
        ru: 'Сколько стоит детейлинг мойка автомобиля?',
        en: 'How much does a detailing car wash cost?',
      },
      answer: {
        ka: 'დეტეილინგ რეცხვის ფასი იწყება 40 ლარიდან სედანის ორფაზიანი რეცხვისთვის. საბოლოო ფასი დამოკიდებულია ავტომობილის კლასსა და შერჩეულ მომსახურებაზე.',
        ru: 'Стоимость детейлинг мойки начинается от 40 лари за двухфазную мойку седана. Итоговая цена зависит от класса автомобиля и выбранных услуг.',
        en: 'A detailing wash starts from 40 GEL for a two-phase wash of a sedan. The final price depends on the vehicle size and selected services.',
      },
    },
    {
      question: {
        ka: 'სად მდებარეობს ავტოსამრეცხაო? საბურთალო?',
        ru: 'Где находится автомойка? Сабуртало?',
        en: 'Where is the car wash located? Saburtalo?',
      },
      answer: {
        ka: 'ავტოსამრეცხაო საბურთალოზე — ანა პოლიტკოვსკაიას ქ. 51. ასევე ვმუშაობთ გლდანში — გურამიშვილის გამზ. 78. ორივე ლოკაცია ორშ.–შაბ. 10:00–20:00.',
        ru: 'Автомойка на Сабуртало — ул. Анны Политковской 51. Также работаем в Глдани — пр. Гурамишвили 78. Обе локации: пн–сб 10:00–20:00.',
        en: 'Car wash in Saburtalo — Anna Politkovskaya St. 51. Also in Gldani — Guramishvili Ave. 78. Both locations: Mon–Sat 10:00–20:00.',
      },
    },
  ],

  '': [
    {
      question: {
        ka: 'რა სერვისებს გვთავაზობთ?',
        ru: 'Какие услуги вы предлагаете?',
        en: 'What services do you offer?',
      },
      answer: {
        ka: 'ჩვენთან ხელმისაწვდომია PPF ფირის გადაკვრა, ფერის შეცვლა ფირით, პოლირება, კერამიკული საფარი, მინების დაბურვა, სალონის ქიმწმენდა, დეტეილინგ რეცხვა, ხმის იზოლაცია და საქარე მინის აღდგენა.',
        ru: 'Мы предлагаем оклейку PPF, смену цвета плёнкой, полировку, керамическое покрытие, тонировку стёкол, химчистку салона, детейлинг-мойку, шумоизоляцию и ремонт лобового стекла.',
        en: 'We offer PPF wrapping, color change with film, polishing, ceramic coating, window tinting, interior cleaning, detailing wash, soundproofing, and windshield repair.',
      },
    },
    {
      question: {
        ka: 'სად მდებარეობს BESTAUTO?',
        ru: 'Где находится BESTAUTO?',
        en: 'Where is BESTAUTO located?',
      },
      answer: {
        ka: 'BESTAUTO მუშაობს ორ ლოკაციაზე თბილისში — გურამიშვილსა და საბურთალოზე. ჩაწერის დროს შეგარჩევინებთ თქვენთვის უფრო მოსახერხებელ სტუდიას.',
        ru: 'BESTAUTO работает на двух локациях в Тбилиси — на Гурамишвили и на Сабуртало. При записи поможем выбрать удобную студию.',
        en: 'BESTAUTO operates at two locations in Tbilisi — Guramishvili and Saburtalo. We\'ll help you choose the most convenient studio when booking.',
      },
    },
    {
      question: {
        ka: 'როგორ გავიგო რომელი სერვისი მჭირდება?',
        ru: 'Как понять, какая услуга мне нужна?',
        en: 'How do I know which service I need?',
      },
      answer: {
        ka: 'თუ არ ხართ დარწმუნებული რომელი მომსახურებაა თქვენთვის სწორი, საუკეთესო გზაა უფასო დათვალიერება. ადგილზე გირჩევთ ოპტიმალურ გადაწყვეტას ავტომობილის მდგომარეობისა და თქვენი მიზნის მიხედვით.',
        ru: 'Если не уверены, какая услуга вам подходит, лучший путь — бесплатный осмотр. На месте подберём оптимальное решение с учётом состояния автомобиля и вашей цели.',
        en: 'If you\'re not sure which service is right for you, the best approach is a free inspection. We\'ll recommend the optimal solution based on your car\'s condition and your goals.',
      },
    },
    {
      question: {
        ka: 'შესაძლებელია რამდენიმე სერვისის ერთად გაკეთება?',
        ru: 'Можно ли сделать несколько услуг одновременно?',
        en: 'Can multiple services be done at the same time?',
      },
      answer: {
        ka: 'დიახ. ხშირად კლიენტები აერთიანებენ რამდენიმე მომსახურებას — მაგალითად, პოლირებას და კერამიკულ საფარს, ან PPF-სა და მინების დაბურვას.',
        ru: 'Да. Клиенты часто объединяют несколько услуг — например, полировку и керамику, или PPF и тонировку.',
        en: 'Yes. Clients often combine multiple services — for example, polishing and ceramic coating, or PPF and window tinting.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანში მპასუხობთ ჩაწერის შემდეგ?',
        ru: 'Как быстро вы отвечаете после записи?',
        en: 'How quickly do you respond after booking?',
      },
      answer: {
        ka: 'როგორც წესი, მოთხოვნის გამოგზავნის შემდეგ სწრაფად გიკავშირდებით. ასევე შეგიძლიათ მოგვწეროთ WhatsApp-ზე ან დაგვირეკოთ პირდაპირ.',
        ru: 'Как правило, отвечаем быстро после отправки заявки. Также можете написать в WhatsApp или позвонить напрямую.',
        en: 'We typically respond quickly after you submit a request. You can also message us on WhatsApp or call directly.',
      },
    },
  ],

};
