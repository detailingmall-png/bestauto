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
        ka: 'რა ღირს ავტომობილის პოლირება?',
        ru: 'Сколько стоит полировка автомобиля?',
        en: 'How much does car polishing cost?',
      },
      answer: {
        ka: 'კუზოვის პოლირება — 690 Gel-დან, პოლირება + კერამიკული საფარი — 990 Gel-დან. ასევე ვაკეთებთ ფარების პოლირებას (150 Gel-დან), მინის (250 Gel-დან) და სალონის ელემენტების (200 Gel-დან). ზუსტი ფასი დამოკიდებულია ავტომობილის ზომასა და საღებავის მდგომარეობაზე. მოგვწერეთ WhatsApp-ზე, გამოგვიგზავნეთ ფოტო — და ჩვენ გამოვთვლით ზუსტ ფასს.',
        ru: 'Полировка кузова — от 690 Gel, полировка + керамическое покрытие — от 990 Gel. Также делаем полировку фар (от 150 Gel), стекла (от 250 Gel) и элементов салона (от 200 Gel). Точная стоимость зависит от размера автомобиля и состояния ЛКП. Напишите нам в WhatsApp, пришлите фото — и мы рассчитаем точную стоимость.',
        en: 'Paint correction starts from 690 Gel, polishing + ceramic coating from 990 Gel. We also offer headlight polishing (from 150 Gel), windshield polishing (from 250 Gel) and interior elements (from 200 Gel). The exact price depends on car size and paint condition. Send us photos on WhatsApp and we\'ll calculate the exact price.',
      },
    },
    {
      question: {
        ka: 'არის თუ არა გარანტია პოლირებაზე?',
        ru: 'Есть ли гарантия на полировку?',
        en: 'Is there a warranty on polishing?',
      },
      answer: {
        ka: 'დიახ. ვაძლევთ 14-დღიან გარანტიას პოლირების შედეგზე. 5 წლიანი მუშაობის განმავლობაში საგარანტიო შემთხვევები 1%-ზე ნაკლებია — ჩვენი ხარისხის ერთგულები ვართ.',
        ru: 'Да. Мы даем 14 дней гарантии на результат полировки. За 5 лет работы менее 1% гарантийных случаев — мы уверены в качестве своей работы.',
        en: 'Yes. We offer a 14-day warranty on polishing results. Over 5 years of work, less than 1% of warranty cases — we are confident in our quality.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება პოლირება?',
        ru: 'Сколько времени занимает полировка?',
        en: 'How long does polishing take?',
      },
      answer: {
        ka: 'მსუბუქი პოლირება 3–4 საათს იღებს, აღმდგენი — 6–8 საათს, მრავალეტაპიანი (მძიმე მდგომარეობისთვის) — 2 დღემდე. ზუსტი ვადა დამოკიდებულია ავტომობილის ზომასა და საღებავის მდგომარეობაზე.',
        ru: 'Легкая полировка занимает 3–4 часа, восстановительная — 6–8 часов, многоэтапная (для запущенного состояния) — до 2 дней. Точные сроки зависят от размера автомобиля и состояния ЛКП.',
        en: 'Light polishing takes 3–4 hours, paint correction 6–8 hours, multi-stage correction (for heavily damaged paint) up to 2 days. Exact timing depends on car size and paint condition.',
      },
    },
    {
      question: {
        ka: 'რამდენად ხშირად სჭირდება პოლირება ავტომობილს?',
        ru: 'Как часто нужно полировать автомобиль?',
        en: 'How often should I polish my car?',
      },
      answer: {
        ka: 'გირჩევთ პოლირებას წელიწადში ერთხელ ბზინვარების შესანარჩუნებლად. თუ პოლირების შემდეგ კერამიკულ საფარს დაიტანთ — ეფექტი 3 წლამდე შენარჩუნდება. PPF დამცავი ფირით კი პოლირება შეიძლება 10 წელი არ დაგჭირდეთ. გვკითხეთ კომპლექსური პაკეტების შესახებ — ეს უფრო მომგებიანია.',
        ru: 'Рекомендуем полировать раз в год для поддержания блеска. Если после полировки нанести керамическое покрытие — эффект сохранится на 3 года. А с защитной пленкой PPF полировка может не понадобиться до 10 лет. Спросите нас о комплексных пакетах — это выгоднее.',
        en: 'We recommend polishing once a year to maintain the shine. If you apply ceramic coating after polishing, the effect lasts up to 3 years. With PPF protection film, polishing may not be needed for up to 10 years. Ask us about package deals — they offer better value.',
      },
    },
    {
      question: {
        ka: 'რატომ უნდა აირჩიოთ ჩვენი პოლირების სერვისი?',
        ru: 'Почему стоит полировать именно у вас?',
        en: 'Why choose your polishing service?',
      },
      answer: {
        ka: '5 წელზე მეტი გამოცდილება, პროფესიონალური Rupes აღჭურვილობა, Koch Chemie მასალები გერმანიიდან. ორი მოსახერხებელი მისამართი თბილისში. 2000-ზე მეტი კმაყოფილი მომხმარებელი. მუშაობის დაწყებამდე ვზომავთ საღებავის სისქეს და შედეგს სპეციალურ განათებაში ვაჩვენებთ.',
        ru: 'Более 5 лет опыта, профессиональное оборудование Rupes, материалы Koch Chemie из Германии. Два удобных адреса в Тбилиси. 10 лет гарантии на плёнку. Мы замеряем толщину ЛКП перед работой и показываем результат при специальном освещении.',
        en: 'Over 5 years of experience, professional Rupes equipment, Koch Chemie materials from Germany. Two convenient locations in Tbilisi. Over 2000 satisfied clients. We measure paint thickness before work and show the result under special lighting.',
      },
    },
    {
      question: {
        ka: 'პოლირება ხომ არ დააზიანებს საღებავს?',
        ru: 'Полировка не повредит краску?',
        en: 'Will polishing damage the paint?',
      },
      answer: {
        ka: 'არა. ჩვენ ყოველთვის ვზომავთ საღებავის სისქეს მუშაობის დაწყებამდე. პროფესიონალური პოლირებით მხოლოდ 1–3 მიკრონი იხსნება 80–120 მიკრონი მარაგიდან. ეს სრულიად უსაფრთხოა და არ მოქმედებს საღებავის დამცავ თვისებებზე.',
        ru: 'Нет. Мы обязательно замеряем толщину лакокрасочного покрытия перед началом работы. При профессиональной полировке снимается всего 1–3 микрона из 80–120 микрон запаса. Это абсолютно безопасно и не влияет на защитные свойства ЛКП.',
        en: 'No. We always measure paint thickness before starting. Professional polishing removes only 1–3 microns out of 80–120 microns of available clearcoat. This is completely safe and does not affect the protective properties of the paint.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა მანქანის გარეცხვა პოლირებამდე?',
        ru: 'Нужно ли мыть машину перед полировкой?',
        en: 'Do I need to wash my car before polishing?',
      },
      answer: {
        ka: 'არა, მოიყვანეთ ავტომობილი ისე, როგორც არის. საფუძვლიანი რეცხვა და ზედაპირის მომზადება შედის პოლირების ფასში. ჩვენ თვითონ მოვამზადებთ ზედაპირს იდეალური შედეგისთვის.',
        ru: 'Нет, привозите автомобиль как есть. Тщательная мойка и подготовка кузова входят в стоимость полировки. Мы сами подготовим поверхность для идеального результата.',
        en: 'No, bring your car as is. Thorough washing and surface preparation are included in the polishing price. We handle all the prep work for a perfect result.',
      },
    },
    {
      question: {
        ka: 'რა არის ავტომობილის პოლირება?',
        ru: 'Что такое полировка автомобиля?',
        en: 'What is car polishing?',
      },
      answer: {
        ka: 'პოლირება არის წვრილი ნაკაწრების, გახეხილობისა და სხვა დეფექტების მოცილების პროცესი კუზოვის, ფარების ან მინის საფარიდან. იგი აღადგენს ბზინვარებას და ფერის სიღრმეს, ავტომობილი ისევ ახალივით გამოიყურება.',
        ru: 'Полировка — это процесс удаления мелких царапин, потертостей и других дефектов с лакокрасочного покрытия кузова, оптики или стекол. Она восстанавливает блеск и глубину цвета, и автомобиль снова выглядит как новый.',
        en: 'Polishing is the process of removing minor scratches, swirl marks, and other defects from the car body, headlights, or windshield coating. It restores shine and color depth, making your car look brand new again.',
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
        ka: 'კუზოვზე კერამიკა 3 წლამდე ძლებს, მინებსა და სალონში — 1 წლამდე. ვაძლევთ გარანტიას საფარზე და უფასოდ განვაახლებთ ჰიდროფობიურობის დაკარგვის შემთხვევაში.',
        ru: 'Керамика на кузове держится до 3 лет, на стеклах и в салоне — до 1 года. Мы даем гарантию на покрытие и бесплатно обновим при потере гидрофобности в гарантийный период.',
        en: 'Ceramic coating on the body lasts up to 3 years, on glass and interior up to 1 year. We provide a warranty on the coating and will refresh it free of charge if hydrophobicity is lost during the warranty period.',
      },
    },
    {
      question: {
        ka: 'რატომ უნდა დავიტანო კერამიკა, თუ უბრალოდ შემიძლია გავრეცხო?',
        ru: 'Зачем наносить керамику, если можно просто мыть?',
        en: 'Why apply ceramic coating if I can just wash my car?',
      },
      answer: {
        ka: 'კერამიკული საფარი მხოლოდ ბზინვარება არ არის. ის იცავს ულტრაიისფერი სხივებისგან, წვრილი ნაკაწრებისგან, ფრინველის ნარჩენებისა და ქიმიკატებისგან. რეცხვა 2-ჯერ უფრო სწრაფი ხდება — ჭუჭყი უბრალოდ სრიალებს. ეს ინვესტიციაა ავტომობილის გარეგნობისა და ღირებულების შენარჩუნებაში.',
        ru: 'Керамическое покрытие — это не только блеск. Оно защищает от ультрафиолета, мелких царапин, птичьего помета и реагентов. Мойка становится в 2 раза быстрее — грязь просто скатывается. Это инвестиция в сохранение внешнего вида и стоимости автомобиля.',
        en: 'Ceramic coating is not just about shine. It protects against UV, minor scratches, bird droppings, and chemicals. Washing becomes 2x faster — dirt simply slides off. It\'s an investment in preserving your car\'s appearance and value.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა მანქანის მომზადება დატანამდე?',
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
        ka: 'როგორ გამოიყურება ავტომობილი დატანის შემდეგ?',
        ru: 'Как будет выглядеть автомобиль после нанесения?',
        en: 'What will my car look like after application?',
      },
      answer: {
        ka: 'საფარი იძლევა ღრმა „სველ“ ბზინვარებას და გამოხატულ ჰიდროფობიურობას — წყალი წვეთებად გროვდება და ზედაპირიდან სრიალებს. მოგვწერეთ WhatsApp-ზე — გაჩვენებთ ნამდვილი მაგალითების ფოტოებსა და ვიდეოებს.',
        ru: 'Покрытие дает глубокий "мокрый" блеск и выраженную гидрофобность — вода собирается в капли и скатывается с поверхности. Напишите нам в WhatsApp — покажем фото и видео реальных примеров.',
        en: 'The coating gives a deep "wet look" shine and strong hydrophobicity — water beads up and rolls off the surface. Message us on WhatsApp — we\'ll show you photos and videos of real examples.',
      },
    },
    {
      question: {
        ka: 'როგორ გავიგო, რომ კერამიკის განახლების დროა?',
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
        ka: 'შემიძლია თუ არა კერამიკის თვითონ დატანა?',
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
        ka: 'რა არის კერამიკული საფარი?',
        ru: 'Что такое керамическое покрытие?',
        en: 'What is ceramic coating?',
      },
      answer: {
        ka: 'ეს არის სილიციუმის დიოქსიდზე (SiO2) დაფუძნებული თხევადი შემადგენლობა, რომელიც დატანის შემდეგ ავტომობილის ზედაპირზე გამჭვირვალე დამცავ ფენას ქმნის. კერამიკა იცავს UV-სხივებისგან, ნაკაწრებისგან, ქიმიკატებისგან და 3 წლამდე ძლებს.',
        ru: 'Это жидкий состав на основе диоксида кремния (SiO2), который после нанесения образует прозрачный защитный слой на поверхности автомобиля. Керамика защищает от UV-лучей, царапин, химии и держится до 3 лет.',
        en: 'It\'s a liquid compound based on silicon dioxide (SiO2) that forms a transparent protective layer on the car surface after application. Ceramic coating protects against UV, scratches, chemicals, and lasts up to 3 years.',
      },
    },
  ],

  'ppf-shield-wrapping': [
    {
      question: {
        ka: 'რა ღირს PPF დაფარვა?',
        ru: 'Сколько стоит оклейка PPF?',
        en: 'How much does PPF wrapping cost?',
      },
      answer: {
        ka: 'ფასი დამოკიდებულია ავტომობილის მარკაზე, სამუშაოს მოცულობასა და არჩეულ ფირზე. კაპოტი — 800 GEL-დან, წინა ნაწილი (კაპოტი, ბამპერი, ფრთები, სვეტები, სარკეები და ფარები) — 2 500 GEL-დან, სრული დაფარვა — 7 500 GEL-დან. მობრძანდით უფასო შემოწმებაზე — ზუსტ ფასს 15 წუთში გამოვთვლით.',
        ru: 'Цена зависит от марки автомобиля, объёма работ и выбранной плёнки. Капот — от 800 GEL, передняя часть (капот, бампер, крылья, стойки, зеркала и фары) — от 2 500 GEL, полная оклейка — от 7 500 GEL. Приезжайте на бесплатный осмотр — рассчитаем точную стоимость за 15 минут.',
        en: 'The price depends on the car make, scope of work and chosen film. Hood — from 800 GEL, front section (hood, bumper, fenders, pillars, mirrors and headlights) — from 2,500 GEL, full body — from 7,500 GEL. Come for a free inspection — we will calculate the exact cost in 15 minutes.',
      },
    },
    {
      question: {
        ka: 'თქვენი ფირი ორიგინალია?',
        ru: 'А у вас точно оригинальная плёнка?',
        en: 'Is your film genuine?',
      },
      answer: {
        ka: 'ჩვენ ვართ LLumar, Quantum და LuxArmor ბრენდების ოფიციალური და ერთადერთი დილერები საქართველოში, ამიტომ ჩვენთან 100% ორიგინალური ფირებია მწარმოებლისგან ოფიციალური გარანტიით.',
        ru: 'Мы — официальные и единственные в Грузии дилеры брендов LLumar, Quantum и LuxArmor, поэтому у нас 100% оригинальные плёнки от производителя с официальной гарантией.',
        en: 'We are the official and only dealers of LLumar, Quantum, and LuxArmor brands in Georgia, so we use 100% original films from the manufacturer with an official warranty.',
      },
    },
    {
      question: {
        ka: 'არის თუ არა გარანტია?',
        ru: 'Есть ли гарантия на работу?',
        en: 'Is there a warranty?',
      },
      answer: {
        ka: 'დიახ. ვაძლევთ 10 წლამდე გარანტიას ფირზე და სამუშაოზე. ასობით მიმოხილვა, 4.9★ რეიტინგი Google-ზე. საგარანტიო შემთხვევას ვაგვარებთ ჩვენს ხარჯზე ნებისმიერ სტუდიაში.',
        ru: 'Да. Мы даём гарантию до 10 лет на плёнку и работу. Сотни отзывов, рейтинг 4.9★ на Google.. Гарантийный случай решаем за наш счёт в любой из двух студий.',
        en: 'Yes. We provide a warranty of up to 10 years on the film and work. Hundreds of reviews, 4.9★ rating on Google. Warranty cases are resolved at our expense at either of our two studios.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება დაფარვა?',
        ru: 'Сколько времени занимает оклейка?',
        en: 'How long does wrapping take?',
      },
      answer: {
        ka: 'სრული დაფარვა — 3–5 სამუშაო დღე. კაპოტი და ბამპერი — 1–2 დღე. ზუსტი ვადა დამოკიდებულია კორპუსის სირთულესა და მოდელზე.',
        ru: 'Полная оклейка — 3–5 рабочих дней. Капот и бампер — 1–2 дня. Точный срок зависит от сложности кузова и модели.',
        en: 'Full body wrapping takes 3–5 business days. Hood and bumper — 1–2 days. Exact time depends on the body complexity and model.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს PPF ფირი?',
        ru: 'На сколько хватает плёнки PPF?',
        en: 'How long does PPF last?',
      },
      answer: {
        ka: 'ნორმალური ექსპლუატაციისას — 10 წლამდე. ფირი არ ყვითლდება, არ ბუნდდება და ინარჩუნებს ბრწყინვალებას. წვრილი ნაკაწრები თავისთავად იხევა სითბოს ზემოქმედებით.',
        ru: 'При нормальной эксплуатации — до 10 лет. Плёнка не желтеет, не мутнеет и сохраняет блеск. Мелкие царапины затягиваются сами под воздействием тепла.',
        en: 'Under normal use — up to 10 years. The film does not yellow, cloud or lose its gloss. Minor scratches heal on their own under heat.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა მანქანის გარეცხვა მოსვლამდე?',
        ru: 'Нужно ли мыть машину перед приездом?',
        en: 'Do I need to wash the car before coming?',
      },
      answer: {
        ka: 'არა. ჩვენ სრულად მოვამზადებთ ავტომობილს — გავრეცხავთ, გავატარებთ დეკონტამინაციას და საჭიროებისამებრ გავაპოლირებთ. უბრალოდ მოიყვანეთ მანქანა როგორც არის.',
        ru: 'Нет. Мы полностью подготовим автомобиль — помоем, проведём деконтаминацию и при необходимости отполируем. Просто привозите машину как есть.',
        en: 'No. We fully prepare the car — wash, decontaminate and polish if needed. Just bring the car as it is.',
      },
    },
    {
      question: {
        ka: 'შესამჩნევი იქნება ფირი კორპუსზე?',
        ru: 'Будет ли плёнка заметна на кузове?',
        en: 'Will the film be visible on the body?',
      },
      answer: {
        ka: 'არა. ფირი სრულად გამჭვირვალეა, არ ამახინჯებს ფერს და ამატებს პრიალა ბრწყინვალებას. დაფარული ავტომობილის დაუფარავისგან გარჩევა პრაქტიკულად შეუძლებელია.',
        ru: 'Нет. Плёнка полностью прозрачная, не искажает цвет и добавляет глянцевый блеск. Отличить оклеенный автомобиль от неоклеенного практически невозможно.',
        en: 'No. The film is completely transparent, does not distort color and adds a glossy shine. It is virtually impossible to tell a wrapped car from an unwrapped one.',
      },
    },
    {
      question: {
        ka: 'როგორ მოვუაროთ ფირს დაფარვის შემდეგ?',
        ru: 'Как ухаживать за плёнкой после оклейки?',
        en: 'How to care for the film after wrapping?',
      },
      answer: {
        ka: 'პირველი 48 საათის განმავლობაში არ გარეცხოთ ავტომობილი. შემდეგ — ჩვეულებრივი უკონტაქტო რეცხვა, აბრაზიული საშუალებებისა და ხისტი ჯაგრისების გარეშე. პოლირება და სპეციალური ქიმია არ არის საჭირო. წვრილი ნაკაწრები თავისთავად ქრება მზეზე.',
        ru: 'Первые 48 часов не мойте автомобиль. Дальше — обычная бесконтактная мойка, без абразивных средств и жёстких щёток. Полировка и специальная химия не нужны. Мелкие царапины исчезают сами на солнце.',
        en: 'Do not wash the car for the first 48 hours. After that — regular contactless washing, no abrasive products or harsh brushes. Polishing and special chemicals are not needed. Minor scratches disappear on their own in sunlight.',
      },
    },
    {
      question: {
        ka: 'შესაძლებელია ფირის მოხსნა?',
        ru: 'Можно ли снять плёнку?',
        en: 'Can the film be removed?',
      },
      answer: {
        ka: 'დიახ, ფირი იხსნება კვალისა და საღებავის დაზიანების გარეშე. მის ქვეშ კორპუსი იმავე მდგომარეობაში დარჩება, რაც დაფარვის დღეს იყო.',
        ru: 'Да, плёнка снимается без следов и повреждений лакокрасочного покрытия. Под ней кузов останется в том же состоянии, что и в день оклейки.',
        en: 'Yes, the film is removed without traces or damage to the paint. Under it, the body will remain in the same condition as the day it was wrapped.',
      },
    },
    {
      question: {
        ka: 'შესაძლებელია დამოუკიდებლად დაფარვა?',
        ru: 'Можно ли оклеить самостоятельно?',
        en: 'Can I apply it myself?',
      },
      answer: {
        ka: 'თეორიულად დიახ, მაგრამ არ გირჩევთ. დაფარვა მოითხოვს სუფთა სათავსს, სპეციალურ ინსტრუმენტს და გამოცდილებას. შეცდომამ შეიძლება გამოიწვიოს ათასობით ლარის ღირებულების ფირის გაფუჭება და საღებავის დაზიანება.',
        ru: 'Теоретически да, но мы не рекомендуем. Оклейка требует чистого помещения, специального инструмента и опыта. Ошибка может привести к порче плёнки стоимостью в тысячи лари и повреждению лакокрасочного покрытия.',
        en: 'Technically yes, but we do not recommend it. Wrapping requires a clean room, specialized tools and experience. A mistake can ruin film worth thousands of GEL and damage the paint.',
      },
    },
    {
      question: {
        ka: 'რა არის PPF?',
        ru: 'Что такое PPF?',
        en: 'What is PPF?',
      },
      answer: {
        ka: 'PPF (Paint Protection Film) — გამჭვირვალე პოლიურეთანის ფირი, რომელიც იცავს კორპუსს ჩიპებისგან, ნაკაწრებისგან, ულტრაიისფერი სხივებისა და ქიმიური რეაგენტებისგან. მუშაობს როგორც უხილავი ფარი — ინარჩუნებს ავტომობილის ქარხნულ სახეს წლების განმავლობაში.',
        ru: 'PPF (Paint Protection Film) — прозрачная полиуретановая плёнка, которая защищает кузов от сколов, царапин, ультрафиолета и химических реагентов. Работает как невидимый щит — сохраняет заводской вид автомобиля на годы.',
        en: 'PPF (Paint Protection Film) is a transparent polyurethane film that protects the body from chips, scratches, UV rays and chemical agents. It works as an invisible shield — preserving the factory look of the car for years.',
      },
    },
  ],

  'vinyl-wrapping': [
    {
      question: {
        ka: 'რა ღირს ფერის შეცვლა დამცავი ფირით?',
        ru: 'Сколько стоит смена цвета защитной плёнкой?',
        en: 'How much does a color change with protective film cost?',
      },
      answer: {
        ka: 'სრული ფერის შეცვლა — 9000 GEL-დან. ანტიქრომი — 300 GEL-დან. ზუსტი ღირებულება დამოკიდებულია მარკაზე, მოდელზე და სამუშაოს მოცულობაზე. მოდით უფასო შემოწმებაზე — 15 წუთში გამოვთვლით.',
        ru: 'Полная смена цвета — от 9000 GEL. Антихром — от 300 GEL. Точная стоимость зависит от марки, модели и объёма работ. Приезжайте на бесплатный осмотр — рассчитаем за 15 минут.',
        en: 'Full color change — from 9,000 GEL. Anti-chrome — from 300 GEL. The exact cost depends on make, model, and scope of work. Come for a free inspection — we\'ll calculate in 15 minutes.',
      },
    },
    {
      question: {
        ka: 'რა ფირებს იყენებთ?',
        ru: 'Какие плёнки используете?',
        en: 'What films do you use?',
      },
      answer: {
        ka: 'ვმუშაობთ მხოლოდ Quantum-ით და LuxArmor-ით — ჩვენ ამ ბრენდების ოფიციალური დილერები ვართ საქართველოში. ორივე ფირს აქვს ნაკაწრების თვითაღდგენა და 10 წლამდე გარანტია. Quantum — პრემიუმ-კლასი მაქსიმალური დაცვისთვის, LuxArmor — შესანიშნავი ფასისა და ხარისხის თანაფარდობა.',
        ru: 'Работаем только с Quantum и LuxArmor — мы официальные дилеры этих брендов в Грузии. Обе плёнки с самовосстановлением царапин и гарантией до 10 лет. Quantum — премиум-класс для максимальной защиты, LuxArmor — отличное соотношение цены и качества.',
        en: 'We work exclusively with Quantum and LuxArmor — we are the official dealers of these brands in Georgia. Both films feature self-healing technology and up to 10-year warranty. Quantum is premium-class for maximum protection, LuxArmor offers excellent value for money.',
      },
    },
    {
      question: {
        ka: 'არის თუ არა გარანტია?',
        ru: 'Есть ли гарантия?',
        en: 'Is there a warranty?',
      },
      answer: {
        ka: 'დიახ. გარანტია 10 წლამდე ფირზე და სამუშაოზე. ასობით მიმოხილვა, 4.9★ რეიტინგი Google-ზე. საგარანტიო შემთხვევას ჩვენი ხარჯით ვაგვარებთ ნებისმიერ სტუდიაში.',
        ru: 'Да. Гарантия до 10 лет на плёнку и работу. Сотни отзывов, рейтинг 4.9★ на Google.. Гарантийный случай решаем за наш счёт в любой из двух студий.',
        en: 'Yes. Warranty up to 10 years on film and workmanship. We cover peeling, yellowing, and material defects. Warranty claims are resolved at our expense at either studio.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს ფერადი დამცავი ფირი?',
        ru: 'На сколько хватает цветной защитной плёнки?',
        en: 'How long does the color protective film last?',
      },
      answer: {
        ka: '7–10 წელი ნორმალური ექსპლუატაციისას. ფირი არ ყვითლდება, არ ბუნდდება და ინარჩუნებს ღრმა ბრწყინვალებას. წვრილი ნაკაწრები მზეზე თავისთავად ქრება. შედარებისთვის: ვინილის ფირი მხოლოდ 2–4 წელი ძლებს.',
        ru: '7–10 лет при нормальной эксплуатации. Плёнка не желтеет, не мутнеет и сохраняет глубокий блеск. Мелкие царапины затягиваются сами на солнце. Для сравнения: виниловая плёнка служит всего 2–4 года. Гаражное хранение продлевает.',
        en: '7–10 years under normal conditions. The film doesn\'t yellow, cloud, or lose its deep gloss. Minor scratches heal on their own in sunlight. For comparison: vinyl wrap lasts only 2–4 years.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება დაფარვა?',
        ru: 'Сколько времени занимает оклейка?',
        en: 'How long does the installation take?',
      },
      answer: {
        ka: 'სრული ფერის შეცვლა — 3–5 სამუშაო დღე. ანტიქრომი — 1–2 დღე. ზუსტი ვადა დამოკიდებულია მოდელსა და ძარას სირთულეზე. სამუშაოს დროს გთავაზობთ კომფორტულ მოსაცდელ ზონას მასაჟის სავარძლებითა და ყავით.',
        ru: 'Полная смена цвета — 3–5 рабочих дней. Антихром — 1–2 дня. Точный срок зависит от модели и сложности кузова. На время работы предоставляем комфортную зону ожидания с массажными креслами и кофе.',
        en: 'Full color change — 3–5 business days. Anti-chrome — 1–2 days. Exact timeline depends on model and body complexity. While we work, enjoy our comfortable waiting area with massage chairs and coffee.',
      },
    },
    {
      question: {
        ka: 'შესაძლებელია ფირის მოხსნა?',
        ru: 'Можно ли снять плёнку потом?',
        en: 'Can the film be removed later?',
      },
      answer: {
        ka: 'დიახ, საღებავის დაზიანების გარეშე. პოლიურეთანის ფირი იხსნება დიდი ნაჭრებით, წებოვანი კვალის გარეშე — ვინილისგან განსხვავებით, რომელიც რამდენიმე წლის შემდეგ ნატეხებად იშლება და ლაქს იზიდავს. ფირის ქვეშ ძარა იმავე მდგომარეობაშია, როგორც დაფარვის დღეს.',
        ru: 'Да, без повреждения краски. Полиуретановая плёнка снимается крупными листами, не оставляя клеевых следов — в отличие от винила, который после нескольких лет рассыпается и тянет лак. Под плёнкой кузов остаётся в том же состоянии, что и в день оклейки.',
        en: 'Yes, without damaging the paint. Polyurethane film comes off in large sheets with no adhesive residue — unlike vinyl, which crumbles and pulls the clear coat after a few years. The body underneath stays in the same condition as the day it was wrapped.',
      },
    },
    {
      question: {
        ka: 'რით არის ფერადი PPF უკეთესი ვინილის ფირზე?',
        ru: 'Чем цветной PPF лучше виниловой плёнки?',
        en: 'How is color PPF better than vinyl wrap?',
      },
      answer: {
        ka: '2–3-ჯერ სქელი — რეალური დაცვა ქვებისა და ხრეშისგან. ნაკაწრები პარკინგზე თავისთავად ქრება. ძლებს 7–10 წელი ვინილის 2–4 წლის ნაცვლად. არ ყვითლდება, არ სკდება მზეზე. იხსნება სუფთად, წებოვანი კვალის გარეშე. ზედაპირი — როგორც ქარხნული საღებავი, «ფორთოხლის კანის» გარეშე.',
        ru: 'Толще в 2–3 раза — реальная защита от камней и гравия. Царапины на парковке затягиваются сами. Служит 7–10 лет вместо 2–4 у винила. Не желтеет, не трескается на солнце. Снимается чисто, без клеевых следов. Поверхность — как заводская покраска, без «апельсиновой корки».',
        en: '2–3 times thicker — real protection from rocks and gravel. Parking scratches heal on their own. Lasts 7–10 years vs. 2–4 for vinyl. No yellowing or cracking in sun. Removes cleanly with no residue. Surface looks like factory paint, not an ‘orange peel’ wrap.',
      },
    },
    {
      question: {
        ka: 'რა არის თვითაღდგენა?',
        ru: 'Что такое самовосстановление?',
        en: 'What is self-healing?',
      },
      answer: {
        ka: 'Quantum-ისა და LuxArmor-ის ფირის ზედა ფენა შეიცავს ელასტიურ პოლიმერს, რომელიც «აკეთებს» წვრილ ნაკაწრებს გახურებისას. საკმარისია მანქანა მზეზე დატოვოთ ან თბილი წყალი დაასხათ — ნაკაწრი წუთებში ქრება. ღრმა ჭრილობები საბაზისო ფენამდე თვითაღდგენას არ ექვემდებარება.',
        ru: 'Верхний слой плёнки Quantum и LuxArmor содержит эластичный полимер, который «заплавляет» мелкие царапины при нагреве. Достаточно оставить машину на солнце или облить тёплой водой — царапина исчезает за минуты. Глубокие порезы до базового слоя самовосстановлению не поддаются.',
        en: 'The top layer of Quantum and LuxArmor film contains an elastic polymer that ‘repairs’ minor scratches when heated. Just leave the car in the sun or pour warm water — the scratch disappears in minutes. Deep cuts through to the base layer cannot self-heal.',
      },
    },
    {
      question: {
        ka: 'დააზიანებს თუ არა ფირი საღებავს?',
        ru: 'Повредит ли плёнка краску?',
        en: 'Will the film damage the paint?',
      },
      answer: {
        ka: 'არა. Quantum-ისა და LuxArmor-ის ფირები სუფთად იხსნება და იცავს ლაქ-საღებავს ჩიპებისგან, ნაკაწრებისგან და ულტრაიისფერი სხივებისგან. გაყიდვისას საღებავი ფირის ქვეშ იდეალურ მდგომარეობაშია — ეს ზრდის ავტომობილის ღირებულებას.',
        ru: 'Нет. Плёнки Quantum и LuxArmor снимаются чисто и даже защищают лакокрасочное покрытие от сколов, царапин и ультрафиолета. При продаже автомобиля краска под плёнкой будет в идеальном состоянии — это повышает стоимость при перепродаже.',
        en: 'No. Quantum and LuxArmor films remove cleanly and even protect the clear coat from chips, scratches, and UV rays. When you sell the car, the paint underneath will be in perfect condition — this increases resale value.',
      },
    },
  ],

  'interior-cleaning': [
    {
      question: {
        ka: 'რა ღირს სალონის ქიმწმენდა?',
        ru: 'Сколько стоит химчистка салона?',
        en: 'How much does interior cleaning cost?',
      },
      answer: {
        ka: 'ქიმწმენდა მსუბუქი დაბინძურებისას — 400 Gel-დან, საშუალო — 500 Gel-დან, ძლიერი — 550 Gel-დან. ასევე ვაკეთებთ ხელით დეტეილინგ-რეცხვას (40 Gel-დან) და ოზონით სუნის მოცილებას (50 Gel-დან). გამოგვიგზავნეთ სალონის ფოტო WhatsApp-ზე — და გეტყვით ზუსტ ფასს.',
        ru: 'Химчистка при легком загрязнении — от 400 Gel, при среднем — от 500 Gel, при сильном — от 550 Gel. Также делаем ручную детейлинг-мойку (от 40 Gel) и устранение запахов озоном (от 50 Gel). Пришлите фото салона в WhatsApp — и мы назовем точную стоимость.',
        en: 'Light contamination cleaning starts from 400 Gel, medium from 500 Gel, heavy from 550 Gel. We also offer hand detailing wash (from 40 Gel) and ozone odor removal (from 50 Gel). Send us photos on WhatsApp and we\'ll give you an exact quote.',
      },
    },
    {
      question: {
        ka: 'არის თუ არა გარანტია ქიმწმენდაზე?',
        ru: 'Есть ли гарантия на химчистку?',
        en: 'Is there a warranty on interior cleaning?',
      },
      answer: {
        ka: 'დიახ, 7-დღიანი გარანტია დახვეწაზე. თუ რამე არ მოგეწონებათ — მობრძანდით, უფასოდ გავასწორებთ. 5 წლიანი მუშაობის განმავლობაში საგარანტიო შემთხვევები 2%-ზე ნაკლებია.',
        ru: 'Да, 7 дней гарантии на доработку. Если вас что-то не устроит — приезжайте, доработаем бесплатно. За 5 лет работы менее 2% гарантийных случаев.',
        en: 'Yes, 7-day warranty for touch-ups. If anything doesn\'t meet your expectations — come back, we\'ll fix it free. Less than 2% warranty cases over 5 years of work.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ქიმწმენდა?',
        ru: 'Сколько времени занимает химчистка?',
        en: 'How long does interior cleaning take?',
      },
      answer: {
        ka: 'ხარისხიანი ქიმწმენდა 1-დან 3 დღემდე გრძელდება. ბაზისური 4–5 საათს იღებს, სრული — 6–8 საათს. სრული გამოშრობისთვის სჯობს ავტომობილი ღამით დატოვოთ.',
        ru: 'Качественная химчистка делается от 1 до 3 дней. Базовая занимает 4–5 часов, полная — 6–8 часов. С полной сушкой лучше оставить автомобиль на ночь.',
        en: 'Quality interior cleaning takes 1 to 3 days. Basic cleaning takes 4–5 hours, full cleaning 6–8 hours. For complete drying, it\'s best to leave the car overnight.',
      },
    },
    {
      question: {
        ka: 'მოაშორებთ თუ არა სიგარეტის ან ცხოველების სუნს?',
        ru: 'Уберете ли запах сигарет или животных?',
        en: 'Can you remove cigarette or pet odors?',
      },
      answer: {
        ka: 'დიახ. ვიყენებთ ოზონატორს და პროფესიონალურ ენზიმურ საშუალებებს, რომლებიც სუნის მოლეკულებს შლიან და არა ნიღბავენ. შემთხვევების 95%-ში სუნს სრულად ვაშორებთ ერთი სეანსით.',
        ru: 'Да. Используем озонатор и профессиональные энзимные составы, которые разрушают молекулы запаха, а не маскируют его. В 95% случаев полностью убираем запах за один сеанс.',
        en: 'Yes. We use an ozone generator and professional enzyme-based products that break down odor molecules rather than masking them. In 95% of cases, we completely eliminate the odor in a single session.',
      },
    },
    {
      question: {
        ka: 'რა ქიმიას იყენებთ? უსაფრთხოა?',
        ru: 'Какую химию используете? Безопасна ли она?',
        en: 'What chemicals do you use? Are they safe?',
      },
      answer: {
        ka: 'ვმუშაობთ Koch Chemie, Grass-ით, ვიყენებთ Tornador აპარატს. ყველა საშუალება ჰიპოალერგიულია, უსაფრთხოა ბავშვებისა და ცხოველებისთვის. დამუშავების შემდეგ მძაფრ სუნს არ ტოვებს.',
        ru: 'Работаем с Koch Chemie, Grass, используем аппарат Tornador. Все составы гипоаллергенны, безопасны для детей и животных. Не оставляют резких запахов после обработки.',
        en: 'We work with Koch Chemie, Grass, and use Tornador equipment. All products are hypoallergenic, safe for children and pets. They leave no harsh odors after treatment.',
      },
    },
    {
      question: {
        ka: 'რაიმე უნდა გავაკეთო მოყვანამდე?',
        ru: 'Нужно ли что-то сделать перед приездом?',
        en: 'Do I need to do anything before bringing my car?',
      },
      answer: {
        ka: 'უბრალოდ ამოიღეთ პირადი ნივთები სალონიდან. მანქანის გარეცხვა არ არის საჭირო — ყველაფერს ჩვენ გავაკეთებთ მომზადების პროცესში.',
        ru: 'Просто уберите личные вещи из салона. Мыть машину не нужно — мы всё сделаем сами в процессе подготовки.',
        en: 'Just remove your personal belongings from the cabin. No need to wash the car — we handle everything during preparation.',
      },
    },
    {
      question: {
        ka: 'როდის შემიძლია ავტომობილის გამოყენება ქიმწმენდის შემდეგ?',
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
        ka: 'შესაძლებელია თუ არა ძველი ლაქების მოცილება?',
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
        ka: 'რით განსხვავდება დეტეილინგ-ქიმწმენდა ჩვეულებრივი რეცხვისგან?',
        ru: 'Чем детейлинг-химчистка отличается от обычной мойки?',
        en: 'How is detailing different from a regular car wash?',
      },
      answer: {
        ka: 'ჩვეულებრივ რეცხვაზე ზედაპირს 30 წუთში ასუფთავებენ. დეტეილინგ-ქიმწმენდა არის სალონის ყოველი სანტიმეტრის ღრმა დამუშავება: სავარძლები, ჭერი, პლასტმასა, ხალიჩები. ვაშორებთ ბაქტერიებს, ალერგენებს, სუნებს. შედეგი — როგორც ახალი სალონი.',
        ru: 'На обычной мойке чистят поверхностно за 30 минут. Детейлинг-химчистка — это глубокая обработка каждого сантиметра салона: сиденья, потолок, пластик, ковры. Удаляем бактерии, аллергены, запахи. Результат — как новый салон.',
        en: 'A regular wash cleans the surface in 30 minutes. Detailing is deep treatment of every inch of the cabin: seats, headliner, plastic, carpets. We remove bacteria, allergens, and odors. The result is like a brand-new interior.',
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
        ka: 'რა ღირს მინების ტონირება?',
        ru: 'Сколько стоит тонировка?',
        en: 'How much does window tinting cost?',
      },
      answer: {
        ka: 'გვერდითა მინები (უკანა ან წინა) — 130 Gel-დან, უკანა მინა — 160 Gel-დან, საქარე მინა — 290 Gel-დან. ათერმული ტონირება უფრო ძვირია. მოგვწერეთ WhatsApp-ზე — გამოვთვლით ზუსტ ფასს თქვენი ავტომობილისთვის.',
        ru: 'Тонировка боковых стекол (задних или передних) — от 130 Gel, заднее стекло — от 160 Gel, лобовое стекло — от 290 Gel. Атермальная тонировка стоит дороже. Напишите в WhatsApp — рассчитаем точную стоимость для вашего автомобиля.',
        en: 'Side windows (rear or front) — from 130 Gel, rear windshield — from 160 Gel, front windshield — from 290 Gel. Ceramic (athermal) tinting costs more. Message us on WhatsApp — we\'ll calculate the exact price for your car.',
      },
    },
    {
      question: {
        ka: 'რა ფირს იყენებთ?',
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
        ka: 'კანონიერია თუ არა ტონირება საქართველოში?',
        ru: 'Легальна ли тонировка в Грузии?',
        en: 'Is window tinting legal in Georgia?',
      },
      answer: {
        ka: 'დიახ. წინა გვერდითა მინები — მინიმუმ 60% სინათლის გატარება, უკანა — მინიმუმ 75%, უკანა მინა — შეზღუდვის გარეშე. ფირს მკაცრად კანონის ფარგლებში ვარჩევთ.',
        ru: 'Да. Передние боковые — не менее 60% пропускания света, задние — не менее 75%, заднее стекло — без ограничений. Мы подберем пленку строго в рамках закона.',
        en: 'Yes. Front side windows must allow at least 60% light, rear at least 75%, rear windshield has no restrictions. We select film strictly within the law.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ტონირება?',
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
        ka: 'რატომ უნდა ტონირება მინებისა?',
        ru: 'Зачем тонировать стекла?',
        en: 'Why tint your windows?',
      },
      answer: {
        ka: 'ბლოკავს ულტრაიისფერის 99%-ს, ამცირებს სალონის გახურებას 60%-ით, უზრუნველყოფს კონფიდენციალურობას. თბილისის კლიმატში ეს აუცილებლობაა და არა ფუფუნება.',
        ru: 'Блокирует 99% ультрафиолета, снижает нагрев салона на 60%, обеспечивает приватность. В условиях Тбилиси — это необходимость, а не роскошь.',
        en: 'Blocks 99% of UV rays, reduces cabin heat by 60%, provides privacy. In Tbilisi\'s climate, it\'s a necessity, not a luxury.',
      },
    },
    {
      question: {
        ka: 'რა არის ათერმული ტონირება?',
        ru: 'Что такое атермальная тонировка?',
        en: 'What is ceramic (athermal) tinting?',
      },
      answer: {
        ka: 'ათერმული ფირი სითბოს 60%-მდე ასხივებს თითქმის გამჭვირვალე რჩება. იდეალურია საქარე და წინა მინებისთვის. კონდიციონერი უფრო ეფექტურად მუშაობს, საწვავის ხარჯი გაგრილებაზე მცირდება.',
        ru: 'Атермальная пленка отражает до 60% тепла, оставаясь почти прозрачной. Идеальна для лобового и передних стекол. Кондиционер работает эффективнее, расход топлива на охлаждение снижается.',
        en: 'Ceramic film reflects up to 60% of heat while remaining nearly transparent. Ideal for windshield and front windows. Air conditioning works more efficiently, fuel consumption for cooling decreases.',
      },
    },
    {
      question: {
        ka: 'შემიძლია თუ არა მინების თვითონ ტონირება?',
        ru: 'Можно ли затонировать самостоятельно?',
        en: 'Can I tint my windows myself?',
      },
      answer: {
        ka: 'ბუშტუკები, მტვერი ფირის ქვეშ, მრუდე კიდეები — თვითტონირების ტიპიური პრობლემებია. გადაკეთება უფრო ძვირი დაჯდება. პროფესიონალური დაყენება 2–4 საათს იღებს და შედეგი გარანტირებულია.',
        ru: 'Пузыри, пыль под пленкой, кривые края — типичные проблемы самостоятельной тонировки. Переклейка обойдется дороже. Профессиональная установка занимает 2–4 часа и результат гарантирован.',
        en: 'Bubbles, dust under the film, crooked edges — typical problems of DIY tinting. Re-doing it will cost more. Professional installation takes 2–4 hours and the result is guaranteed.',
      },
    },
  ],

  'windshield-repair': [
    {
      question: {
        ka: 'რა ღირს ჩიპის შეკეთება?',
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
        ka: 'რა ტიპის დაზიანებების შეკეთება შეიძლება?',
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
        ka: 'არის თუ არა გარანტია?',
        ru: 'Есть ли гарантия?',
        en: 'Is there a warranty?',
      },
      answer: {
        ka: 'დიახ, 1-წლიანი გარანტია იმაზე, რომ ბზარი შემდეგ არ გაგრძელდება. პოლიმერი, რომელსაც ვიყენებთ, სიმტკიცით მინას უტოლდება.',
        ru: 'Да, 1 год гарантии на то, что трещина не пойдет дальше. Полимер, который мы используем, по прочности сопоставим со стеклом.',
        en: 'Yes, 1-year warranty that the crack won\'t spread further. The polymer we use is comparable in strength to glass itself.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს შეკეთება?',
        ru: 'Надолго ли хватает ремонта?',
        en: 'How long does the repair last?',
      },
      answer: {
        ka: 'მინის მთელი ვადის განმავლობაში. ხარისხიანი პოლიმერი UV-გამოშრობის შემდეგ მინის ტოლ სიმტკიცეს აღწევს. შეკეთების გამეორება არ არის საჭირო.',
        ru: 'На весь срок службы стекла. Качественный полимер после УФ-отверждения набирает прочность, равную самому стеклу. Ремонт не нужно повторять.',
        en: 'For the entire lifespan of the windshield. Quality polymer after UV curing reaches the strength of glass itself. No need to repeat the repair.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება შეკეთება?',
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
        ka: 'როდის უნდა შეკეთება და როდის შეცვლა?',
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
        ka: 'შესამჩნევი იქნება შეკეთების ადგილი?',
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
        ka: 'საჭიროა თუ არა წინასწარ ჩაწერა?',
        ru: 'Нужно ли записываться?',
        en: 'Do I need to book in advance?',
      },
      answer: {
        ka: 'ჩიპის შეკეთება სწრაფი მომსახურებაა — ხშირად იმავე დღეს შეგვიძლია. მოგვწერეთ WhatsApp-ზე — გირჩევთ უახლოეს თავისუფალ დროს.',
        ru: 'Ремонт сколов — быстрая услуга, часто можем принять в тот же день. Напишите в WhatsApp — подскажем ближайшее свободное время.',
        en: 'Chip repair is a quick service — we can often handle it same day. Message us on WhatsApp — we\'ll suggest the nearest available slot.',
      },
    },
    {
      question: {
        ka: 'როგორ მუშაობს ჩიპის შეკეთება?',
        ru: 'Как работает ремонт сколов?',
        en: 'How does chip repair work?',
      },
      answer: {
        ka: 'ვასუფთავებთ ჩიპს, წნევით შეგვაქვს სპეციალური პოლიმერი, ულტრაიისფერით ვამაგრებთ, შემდეგ ვაპოლირებთ. პოლიმერი ბზარს ავსებს და მინის სიმტკიცეს აღადგენს.',
        ru: 'Очищаем скол от грязи, вводим специальный полимер под давлением, отверждаем ультрафиолетом, полируем место ремонта. Полимер заполняет трещину и восстанавливает прочность стекла.',
        en: 'We clean the chip, inject special polymer under pressure, cure it with ultraviolet light, then polish the repair area. The polymer fills the crack and restores the glass strength.',
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
        ka: 'რამდენად ჩუმად გახდება სალონში?',
        ru: 'Насколько тише станет в салоне?',
        en: 'How much quieter will the cabin be?',
      },
      answer: {
        ka: 'ხმაურის შემცირება 30–50%-ით (3–8 დბ). სხვაობა მაშინვე იგრძნობა — განსაკუთრებით ავტობანზე და გრუნტის გზებზე. აუდიოსისტემაც გაცილებით უკეთ ჟღერს.',
        ru: 'Снижение шума на 30–50% (3–8 дБ). Разница ощущается сразу — особенно на трассе и по грунтовым дорогам. Аудиосистема зазвучит значительно лучше.',
        en: 'Noise reduction of 30–50% (3–8 dB). The difference is noticeable immediately — especially on highways and gravel roads. Your audio system will sound much better too.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება მონტაჟი?',
        ru: 'Сколько времени занимает установка?',
        en: 'How long does installation take?',
      },
      answer: {
        ka: 'კარები — 1 დღე, იატაკი — 1–2 დღე, სრული ხმაურიზოლაცია — 3–5 დღე. სირთულე ავტომობილის მოდელზეა დამოკიდებული.',
        ru: 'Двери — 1 день, пол — 1–2 дня, полная шумоизоляция — 3–5 дней. Сложность зависит от модели автомобиля.',
        en: 'Doors — 1 day, floor — 1–2 days, full soundproofing — 3–5 days. Complexity depends on the car model.',
      },
    },
    {
      question: {
        ka: 'რომელი ზონების ხმაურიზოლაცია შეიძლება?',
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
        ka: 'რა მასალებს იყენებთ?',
        ru: 'Какие материалы используете?',
        en: 'What materials do you use?',
      },
      answer: {
        ka: 'STP, Shumoff, Comfort Mat — წამყვანი ბრენდები. ყველა მასალა სერტიფიცირებულია, უსუნოა, არ შთანთქავს ტენს და არ იწვევს კოროზიას.',
        ru: 'STP, Шумoff, Comfort Mat — ведущие бренды. Все материалы сертифицированы, не имеют запаха, не впитывают влагу и не вызывают коррозию.',
        en: 'STP, Shumoff, Comfort Mat — leading brands. All materials are certified, odorless, moisture-resistant, and non-corrosive.',
      },
    },
    {
      question: {
        ka: 'როგორ მიმდინარეობს მონტაჟი?',
        ru: 'Как проходит установка?',
        en: 'How does the installation process work?',
      },
      answer: {
        ka: 'დამუშავებული ზონების სრული დაშლა, ცხიმის მოცილება. 2+ ფენის დაგება: ვიბრო-იზოლაცია + ხმაურ-იზოლაცია. აწყობა სამაგრების შემოწმებით. ყოველი ეტაპის ფოტოანგარიშს გაწვდით.',
        ru: 'Полная разборка обрабатываемых зон, обезжиривание. Укладка 2+ слоев: виброизоляция + шумоизоляция. Сборка с проверкой всех креплений. Предоставляем фотоотчет о каждом этапе.',
        en: 'Complete disassembly of treated areas, degreasing. Laying 2+ layers: vibration damping + sound insulation. Reassembly with fastener checks. We provide a photo report of every stage.',
      },
    },
    {
      question: {
        ka: 'შემიძლია თუ არა ხმაურიზოლაციის თვითონ გაკეთება?',
        ru: 'Можно ли сделать шумоизоляцию самостоятельно?',
        en: 'Can I do soundproofing myself?',
      },
      answer: {
        ka: 'კარები — თეორიულად შესაძლებელია, მაგრამ დაშლის გამოცდილება სჭირდება. იატაკი და ჭერი — არ გირჩევთ: ელექტროგაყვანილობა, ბალიშები, აწყობისას ხმაურის რისკი. აწყობის შეცდომები არასასურველ ხმაურებს გამოიწვევს.',
        ru: 'Двери — теоретически можно, но нужен опыт разборки. Пол и потолок — не рекомендуем: электрика, подушки безопасности, риск скрипов при сборке. Ошибки в сборке приведут к посторонним звукам.',
        en: 'Doors — theoretically possible, but requires disassembly experience. Floor and roof — not recommended: wiring, airbags, risk of rattles during reassembly. Assembly mistakes will lead to unwanted noises.',
      },
    },
    {
      question: {
        ka: 'რა არის ავტომობილის ხმაურის იზოლაცია?',
        ru: 'Что такое шумоизоляция автомобиля?',
        en: 'What is car soundproofing?',
      },
      answer: {
        ka: 'ეს არის სპეციალური მასალების (ვიბრო- და ხმაურშთამნთქმელი) დაყენება ავტომობილის კუზოვის პანელებზე. ამცირებს გზის ხმაურს, ვიბრაციას, აუმჯობესებს კომფორტს და აუდიოსისტემის ხმის ხარისხს.',
        ru: 'Это установка специальных материалов (вибро- и шумопоглощающих) на кузовные панели автомобиля. Снижает дорожный шум, вибрации, улучшает комфорт и качество звука аудиосистемы.',
        en: 'It\'s the installation of special materials (vibration-dampening and sound-absorbing) on the car\'s body panels. Reduces road noise, vibrations, improves comfort and audio system sound quality.',
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
        ka: 'რით განსხვავდება დეტეილინგ რეცხვა ჩვეულებრივი რეცხვისგან?',
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
        ka: 'რამდენ ხანს გრძელდება დეტეილინგ რეცხვა?',
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
        ka: 'შეიძლება თუ არა კერამიკული ან PPF საფარიანი ავტომობილის რეცხვა?',
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
        ka: 'რა ქიმიას იყენებთ რეცხვის დროს?',
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
        ka: 'რა ღირს ავტომობილის დეტეილინგ რეცხვა?',
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
        ka: 'როგორ ჩავეწერო დეტეილინგ რეცხვაზე?',
        ru: 'Как записаться на детейлинг мойку?',
        en: 'How do I book a detailing wash?',
      },
      answer: {
        ka: 'ჩაწერა შეგიძლიათ ტელეფონით, WhatsApp-ით ან ვებსაიტზე არსებული ფორმის საშუალებით. ჩვენი მენეჯერი დაადასტურებს ვიზიტს და უპასუხებს ყველა კითხვას.',
        ru: 'Записаться можно по телефону, через WhatsApp или с помощью формы на сайте. Наш менеджер подтвердит время и ответит на все вопросы.',
        en: 'You can book via phone, WhatsApp, or through the booking form on our website. Our team will confirm your appointment and answer any questions.',
      },
    },
    {
      question: {
        ka: 'რამდენად ხშირად უნდა ჩავატარო დეტეილინგ რეცხვა?',
        ru: 'Как часто нужно делать детейлинг мойку?',
        en: 'How often should I get a detailing car wash?',
      },
      answer: {
        ka: 'ვირეკომენდებთ დეტეილინგ რეცხვას ყოველ 2–4 კვირაში ერთხელ, ავტომობილის გამოყენების ინტენსივობისა და ამინდის პირობების მიხედვით.',
        ru: 'Мы рекомендуем детейлинг мойку раз в 2–4 недели в зависимости от интенсивности использования автомобиля и погодных условий.',
        en: 'We recommend a detailing wash every 2–4 weeks, depending on how frequently you drive and the current weather conditions.',
      },
    },
  ],

};

