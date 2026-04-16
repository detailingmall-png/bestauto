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
        ru: 'Полировка кузова начинается от 690 Gel. Также доступны полировка + керамическое покрытие, полировка фар, полировка стекла и полировка элементов салона. Точная стоимость зависит от размера автомобиля и состояния лакокрасочного покрытия.',
        en: 'Body polishing starts from 690 Gel. Also available are polishing + ceramic coating, headlight polishing, glass polishing, and interior detail polishing. The exact price depends on the car size and paint condition.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება მანქანის პოლირება?',
        ru: 'Сколько времени занимает полировка автомобиля?',
        en: 'How long does car polishing take?',
      },
      answer: {
        ka: 'ვადა დამოკიდებულია სამუშაოს ტიპზე — მსუბუქ პოლირებას ნაკლები დრო სჭირდება, აღმდგენ და მრავალეტაპიან პოლირებას მეტი. ზუსტ დროს გეუბნებით ავტომობილის დათვალიერების შემდეგ.',
        ru: 'Сроки зависят от типа работ — лёгкая полировка занимает меньше времени, восстановительная и многоэтапная — больше. Точное время назовём после осмотра автомобиля.',
        en: 'The duration depends on the type of work — light polishing takes less time, while restorative and multi-stage polishing takes longer. We\'ll give you the exact time after inspecting the vehicle.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს პოლირების შედეგი?',
        ru: 'Как долго сохраняется результат полировки?',
        en: 'How long does the polishing result last?',
      },
      answer: {
        ka: 'პოლირების საჭიროება დამოკიდებულია ავტომობილის ექსპლუატაციაზე, რეცხვის მეთოდზე და ლაქის მდგომარეობაზე. ბევრ შემთხვევაში რეგულარული უსაფრთხო მოვლა და კერამიკული საფარი საშუალებას გაძლევთ შედეგი უფრო დიდხანს შეინარჩუნოთ.',
        ru: 'Необходимость повторной полировки зависит от условий эксплуатации автомобиля, способа мойки и состояния лакокрасочного покрытия. Во многих случаях регулярный бережный уход и керамическое покрытие позволяют сохранить результат значительно дольше.',
        en: 'The need for re-polishing depends on how the car is used, the washing method, and the paint condition. In many cases, regular safe maintenance and ceramic coating allow you to preserve the result much longer.',
      },
    },
    {
      question: {
        ka: 'რომელ ნაკაწრებს აშორებს პოლირება?',
        ru: 'Какие царапины удаляет полировка?',
        en: 'What scratches does polishing remove?',
      },
      answer: {
        ka: 'პოლირება არის წვრილი ნაკაწრების, გახეხილობისა და სხვა დეფექტების მოცილების პროცესი კუზოვის, ფარების ან მინის საფარიდან. იგი აღადგენს ბზინვარებას და ფერის სიღრმეს, ავტომობილი ისევ ახალივით გამოიყურება.',
        ru: 'Полировка — это процесс удаления мелких царапин, потёртостей и других дефектов с поверхности кузова, фар или стекла. Она восстанавливает блеск и глубину цвета, и автомобиль снова выглядит как новый.',
        en: 'Polishing is the process of removing fine scratches, scuffs, and other defects from the body, headlights, or glass surface. It restores shine and color depth, making the car look like new again.',
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
        ru: 'Количество этапов зависит от состояния краски. Для лёгких царапин достаточно одноэтапной полировки, а для более глубоких дефектов может понадобиться два или три этапа.',
        en: 'The number of stages depends on the paint condition. For light scratches, a single-stage polish is enough, while deeper defects may require two or three stages.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა კერამიკა პოლირების შემდეგ?',
        ru: 'Нужна ли керамика после полировки?',
        en: 'Is ceramic coating necessary after polishing?',
      },
      answer: {
        ka: 'კერამიკული საფარი არ არის სავალდებულო, მაგრამ ეხმარება პოლირების შედეგს უფრო დიდხანს შენარჩუნებაში. თუ გსურთ მაქსიმალურად ხანგრძლივი ეფექტი, კერამიკა კარგი დამატებაა.',
        ru: 'Керамическое покрытие не обязательно, но помогает сохранить результат полировки дольше. Если вы хотите максимально длительный эффект, керамика — хорошее дополнение.',
        en: 'Ceramic coating is not mandatory, but it helps preserve the polishing result longer. If you want the longest-lasting effect, ceramic coating is a great addition.',
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
        ru: 'Керамическое покрытие всего автомобиля — от 500 Gel. Также делаем антидождь на стёкла (от 150 Gel) и керамическое покрытие салона (от 300 Gel). Точная стоимость зависит от класса автомобиля и количества слоёв. Напишите нам в WhatsApp для точного расчёта.',
        en: 'Full car ceramic coating starts from 500 Gel. We also do rain repellent for glass (from 150 Gel) and interior ceramic coating (from 300 Gel). The exact price depends on the vehicle class and number of layers. Message us on WhatsApp for an exact quote.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს კერამიკული საფარი?',
        ru: 'Как долго держится керамическое покрытие?',
        en: 'How long does ceramic coating last?',
      },
      answer: {
        ka: 'გამძლეობა დამოკიდებულია მასალაზე, მოვლასა და იმაზე, თუ რომელ ზონაზე კეთდება დამუშავება. ზუსტ მოლოდინს გეუბნებით კონკრეტული სერვისის არჩევისას.',
        ru: 'Долговечность зависит от материала, ухода и от того, на какую зону наносится покрытие. Точные ожидания озвучим при выборе конкретной услуги.',
        en: 'Durability depends on the material, maintenance, and which area is being treated. We\'ll give you exact expectations when choosing a specific service.',
      },
    },
    {
      question: {
        ka: 'რატომ აკეთებენ კერამიკას მანქანაზე?',
        ru: 'Зачем наносят керамику на автомобиль?',
        en: 'Why do people apply ceramic coating to their car?',
      },
      answer: {
        ka: 'კერამიკას აკეთებენ ისინი, ვისაც სურს ავტომობილის გარეგნობის შენარჩუნება ხანგრძლივად — ნაკლები რეცხვა, ადვილი მოვლა, UV-სგან და ქიმიური ზემოქმედებისგან დაცვა. განსაკუთრებით რეკომენდებულია ახალი ავტომობილებისთვის და პოლირების შემდეგ.',
        ru: 'Керамику наносят те, кто хочет сохранить внешний вид автомобиля надолго — реже мыть, проще ухаживать, защита от ультрафиолета и химического воздействия. Особенно рекомендуется для новых автомобилей и после полировки.',
        en: 'Ceramic coating is applied by those who want to preserve their car\'s appearance long-term — less frequent washing, easier maintenance, protection from UV and chemical exposure. Especially recommended for new cars and after polishing.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა პოლირება კერამიკამდე?',
        ru: 'Нужна ли полировка перед нанесением керамики?',
        en: 'Is polishing necessary before ceramic coating?',
      },
      answer: {
        ka: 'მოიყვანეთ ისე, როგორც არის — ჩვენ თვითონ მოვამზადებთ ყველაფერს. მომზადება (რეცხვა, დეკონტამინაცია, პოლირება) შედეგის 80%-ია, და ჩვენ მაქსიმალურ ყურადღებას ვუთმობთ. სწორედ ამიტომ გვძლებს შედეგი ასე დიდხანს.',
        ru: 'Привозите как есть — мы сами всё подготовим. Подготовка (мойка, деконтаминация, полировка) — это 80% результата, и мы уделяем ей максимум внимания. Именно поэтому наш результат держится так долго.',
        en: 'Bring it as is — we\'ll prepare everything ourselves. Preparation (washing, decontamination, polishing) accounts for 80% of the result, and we give it maximum attention. That\'s why our results last so long.',
      },
    },
    {
      question: {
        ka: 'როგორ გავიგო, როდის სჭირდება კერამიკის განახლება?',
        ru: 'Как понять, что пора обновить керамику?',
        en: 'How do I know when the ceramic coating needs refreshing?',
      },
      answer: {
        ka: '3 ნიშანია: წყალი აღარ გროვდება წვეთებად, რეცხვის შემდეგ ლაქები ჩნდება, ბზინვარება ქრება. მობრძანდით უფასო შემოწმებაზე — შევამოწმებთ საფარის მდგომარეობას და გირჩევთ, საჭიროა თუ არა განახლება.',
        ru: 'Есть 3 признака: вода перестаёт собираться в капли, после мойки появляются разводы, блеск тускнеет. Приезжайте на бесплатный осмотр — проверим состояние покрытия и подскажем, нужно ли обновление.',
        en: 'There are 3 signs: water stops beading, streaks appear after washing, and the shine fades. Come in for a free inspection — we\'ll check the coating condition and advise whether a refresh is needed.',
      },
    },
    {
      question: {
        ka: 'იცავს თუ არა კერამიკა ღრმა ნაკაწრებისგან?',
        ru: 'Защищает ли керамика от глубоких царапин?',
        en: 'Does ceramic coating protect against deep scratches?',
      },
      answer: {
        ka: 'ტექნიკურად შესაძლებელია, მაგრამ შედეგი 3–5-ჯერ სუსტი იქნება. პროფესიონალური ზედაპირის მომზადების, ტემპერატურისა და ტენიანობის კონტროლის და ინფრაწითელი გამოშრობის გარეშე საფარი საჭირო სიმტკიცეს ვერ მიაღწევს და წლების ნაცვლად რამდენიმე თვე გაძლებს.',
        ru: 'Технически это возможно, но результат будет в 3–5 раз слабее. Без профессиональной подготовки поверхности, контроля температуры и влажности, а также инфракрасной сушки покрытие не наберёт нужную прочность и продержится несколько месяцев вместо лет.',
        en: 'Technically it\'s possible, but the result will be 3–5 times weaker. Without professional surface preparation, temperature and humidity control, and infrared curing, the coating won\'t reach the necessary hardness and will last a few months instead of years.',
      },
    },
    {
      question: {
        ka: 'რას აკეთებს კერამიკული საფარი?',
        ru: 'Что делает керамическое покрытие?',
        en: 'What does ceramic coating do?',
      },
      answer: {
        ka: 'კერამიკული საფარი არის სილიციუმის დიოქსიდზე (SiO2) დაფუძნებული თხევადი შემადგენლობა, რომელიც წასმის შემდეგ გამჭვირვალე დამცავ ფენას ქმნის ზედაპირზე. იგი იცავს UV-სგან, წვრილი ნაკაწრებისგან და ქიმიური ნივთიერებებისგან, ძლებს 3 წლამდე.',
        ru: 'Керамическое покрытие — это жидкий состав на основе диоксида кремния (SiO2), который после нанесения образует прозрачный защитный слой на поверхности. Оно защищает от ультрафиолета, мелких царапин и химических веществ, служит до 3 лет.',
        en: 'Ceramic coating is a liquid compound based on silicon dioxide (SiO2) that forms a transparent protective layer on the surface after application. It protects against UV, minor scratches, and chemicals, lasting up to 3 years.',
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
        ru: 'Керамика помогает поверхности сохранять блеск, гидрофобность и чистоту. PPF физически защищает лак от сколов, царапин и камней. Они решают разные задачи и иногда используются в дополнение друг к другу.',
        en: 'Ceramic helps the surface maintain shine, hydrophobicity, and cleanliness. PPF physically protects the paint from chips, scratches, and stones. They solve different tasks and are sometimes used to complement each other.',
      },
    },
    {
      question: {
        ka: 'კერამიკის შემდეგ მანქანა ნაკლებად ისვრება?',
        ru: 'После керамики машина меньше пачкается?',
        en: 'Does the car get dirty less after ceramic coating?',
      },
      answer: {
        ka: 'კერამიკული საფარი ქმნის ჰიდროფობიურ ეფექტს, რის გამოც წყალი და დაბინძურება ზედაპირზე ნაკლებად ჩერდება. ეს ამარტივებს რეცხვას და ეხმარება ავტომობილს უფრო სუფთად გამოიყურებოდეს ორ რეცხვას შორის.',
        ru: 'Керамическое покрытие создаёт гидрофобный эффект, благодаря чему вода и грязь меньше задерживаются на поверхности. Это упрощает мойку и помогает автомобилю выглядеть чище между мойками.',
        en: 'Ceramic coating creates a hydrophobic effect, which means water and dirt are less likely to stay on the surface. This makes washing easier and helps the car look cleaner between washes.',
      },
    },
  ],

  'ppf-shield-wrapping': [
    {
      question: {
        ka: 'რა ღირს PPF ფირის გადაკვრა?',
        ru: 'Сколько стоит оклейка PPF-плёнкой?',
        en: 'How much does PPF wrapping cost?',
      },
      answer: {
        ka: 'ფასი დამოკიდებულია დაფარვის ზონაზე, ავტომობილის ზომაზე და არჩეულ ფირზე. შესაძლებელია როგორც რისკ-ზონების, ისე სრული ავტომობილის შეთავაზება.',
        ru: 'Стоимость зависит от зоны покрытия, размера автомобиля и выбранной плёнки. Возможна как оклейка рисковых зон, так и полная оклейка всего автомобиля.',
        en: 'The price depends on the coverage area, car size, and chosen film. Both risk zone coverage and full car wrapping are available.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს ძლებს PPF ფირი?',
        ru: 'Как долго служит PPF-плёнка?',
        en: 'How long does PPF film last?',
      },
      answer: {
        ka: 'ხარისხიანი ფირი და სწორი მოვლა საშუალებას იძლევა PPF-მა მრავალი წელი შეინარჩუნოს თავისი თვისებები.',
        ru: 'Качественная плёнка и правильный уход позволяют PPF сохранять свои свойства на протяжении многих лет.',
        en: 'Quality film and proper care allow PPF to maintain its properties for many years.',
      },
    },
    {
      question: {
        ka: 'რა არის PPF ფირი?',
        ru: 'Что такое PPF-плёнка?',
        en: 'What is PPF film?',
      },
      answer: {
        ka: 'PPF არის გამჭვირვალე პოლიურეთანის დამცავი ფირი, რომელიც აკრავთ ავტომობილის კორპუსზე საღებავის დასაცავად.',
        ru: 'PPF — это прозрачная полиуретановая защитная плёнка, которую наклеивают на кузов автомобиля для защиты краски.',
        en: 'PPF is a transparent polyurethane protective film applied to the car body to protect the paint.',
      },
    },
    {
      question: {
        ka: 'რა განსხვავებაა PPF-სა და ვინილის ფირს შორის?',
        ru: 'В чём разница между PPF и виниловой плёнкой?',
        en: 'What is the difference between PPF and vinyl film?',
      },
      answer: {
        ka: 'PPF ძირითადად დაცვისთვის გამოიყენება, ხოლო ვინილი — ვიზუალური ცვლილებისთვის. PPF უფრო გამძლეა და უკეთ იცავს ლაქს ყოველდღიური ზემოქმედებისგან.',
        ru: 'PPF в основном используется для защиты, а винил — для визуальных изменений. PPF более прочный и лучше защищает лак от повседневного воздействия.',
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
        ru: 'Да. Именно в этом его главная задача — снизить риск мелких повреждений от дороги и поверхностных царапин.',
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
        ru: 'Да. Можно оклеить только рисковые зоны — например, капот, бампер, фары, зеркала или другие наиболее уязвимые элементы.',
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
        ru: 'Если вы хотите результат более высокого уровня и дополнительную защиту, чаще лучший выбор — цветной PPF. Если приоритет — более гибкий бюджет, хороший вариант — винил.',
        en: 'If you want a higher-level result with additional protection, colored PPF is often the better choice. If budget flexibility is the priority, vinyl is a good option.',
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
        ru: 'Разница зависит от автомобиля, материала и объёма работ. Во многих случаях цветной PPF дороже, но для клиента это более ценное решение, так как помимо визуала он получает и защиту.',
        en: 'The difference depends on the car, material, and scope of work. In many cases, colored PPF is more expensive, but it\'s a more valuable solution for the client since you get both the visual effect and protection.',
      },
    },
    {
      question: {
        ka: 'თუ მინდა უფრო ხელმისაწვდომი ვარიანტი, აკეთებთ ვინილითაც?',
        ru: 'Если я хочу более доступный вариант, работаете ли вы и с винилом?',
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
        ru: 'Обеспечивает ли цветной PPF дополнительную защиту автомобиля?',
        en: 'Does colored PPF provide additional protection for the car?',
      },
      answer: {
        ka: 'დიახ. სწორედ ეს არის მისი ერთ-ერთი მთავარი უპირატესობა — ვიზუალური ცვლილება და დამატებითი დაცვა ერთდროულად.',
        ru: 'Да. Именно это одно из его главных преимуществ — визуальное изменение и дополнительная защита одновременно.',
        en: 'Yes. This is one of its key advantages — visual change and additional protection at the same time.',
      },
    },
    {
      question: {
        ka: 'თუ მჭირდება მხოლოდ საღებავის დაცვა და არა ფერის შეცვლა?',
        ru: 'Если мне нужна только защита краски, а не смена цвета?',
        en: 'What if I only need paint protection, not a color change?',
      },
      answer: {
        ka: 'ამ შემთხვევაში უკეთესია იხილოთ ჩვენი ცალკე PPF გვერდი, რომელიც გამჭვირვალე დამცავ ფირზეა ორიენტირებული.',
        ru: 'В этом случае лучше посмотрите нашу отдельную страницу PPF, которая ориентирована на прозрачную защитную плёнку.',
        en: 'In that case, it\'s better to check our separate PPF page, which is focused on transparent protective film.',
      },
    },
  ],

  'interior-cleaning': [
    {
      question: {
        ka: 'რა ღირს მანქანის ქიმწმენდა?',
        ru: 'Сколько стоит химчистка автомобиля?',
        en: 'How much does car interior cleaning cost?',
      },
      answer: {
        ka: 'ფასი დამოკიდებულია დაბინძურების დონეზე, მასალებზე და სამუშაოს სიღრმეზე. მსუბუქი დაბინძურების შემთხვევაში ფასი იწყება 400 Gel-დან. ზუსტი ღირებულებისთვის საკმარისია მოგვწეროთ და გამოგვიგზავნოთ სალონის ფოტოები.',
        ru: 'Стоимость зависит от уровня загрязнения, материалов и глубины работ. При лёгком загрязнении цена начинается от 400 Gel. Для точной стоимости достаточно написать нам и прислать фото салона.',
        en: 'The price depends on the contamination level, materials, and depth of work. For light contamination, the price starts from 400 Gel. For an exact quote, just message us and send photos of the interior.',
      },
    },
    {
      question: {
        ka: 'შეგიძლიათ თუ არა უსიამოვნო სუნის მოცილება?',
        ru: 'Можете ли вы удалить неприятный запах?',
        en: 'Can you remove unpleasant odors?',
      },
      answer: {
        ka: 'დიახ, საჭიროების შემთხვევაში ვიყენებთ ოზონირებას და პროფესიონალურ საშუალებებს, რომლებიც სუნს უბრალოდ არ ფარავს, არამედ რეალურად ამცირებს მის მიზეზს.',
        ru: 'Да, при необходимости используем озонирование и профессиональные средства, которые не просто маскируют запах, а реально устраняют его причину.',
        en: 'Yes, when needed we use ozone treatment and professional products that don\'t just mask the odor but actually eliminate its source.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანში შრება სალონი ქიმწმენდის შემდეგ?',
        ru: 'Через сколько высохнет салон после химчистки?',
        en: 'How long does the interior take to dry after cleaning?',
      },
      answer: {
        ka: 'ბაზისური ქიმწმენდის შემდეგ — 4–6 საათში. სრულის შემდეგ — სჯობს დაელოდოთ სრულ გამოშრობას, ჩვეულებრივ 1-დან 3 დღემდე ტენიანობისა და მასალის ტიპის მიხედვით.',
        ru: 'После базовой химчистки — 4–6 часов. После полной — лучше подождать полного высыхания, обычно это занимает от 1 до 3 дней в зависимости от влажности и типа материалов.',
        en: 'After basic cleaning — 4–6 hours. After full cleaning — it\'s better to wait for complete drying, which usually takes 1 to 3 days depending on humidity and material type.',
      },
    },
    {
      question: {
        ka: 'შეიძლება თუ არა ძველი ლაქების მოცილება?',
        ru: 'Можно ли удалить старые пятна?',
        en: 'Can old stains be removed?',
      },
      answer: {
        ka: 'ყავა, სისხლი, ცხიმი — დიახ, შემთხვევების 90%-ში სრულად ვაშორებთ. თუ ლაქა ძალიან ძველია ან სპეციფიკურია — წინასწარ გულახდილად გეტყვით. ნუ დააყოვნებთ: რაც უფრო ახალია ლაქა, მით მეტია სრული მოცილების შანსი.',
        ru: 'Кофе, кровь, жир — да, в 90% случаев удаляем полностью. Если пятно очень старое или специфическое — честно предупредим заранее. Не затягивайте: чем свежее пятно, тем выше шанс полного удаления.',
        en: 'Coffee, blood, grease — yes, we remove them completely in 90% of cases. If a stain is very old or specific, we\'ll honestly let you know in advance. Don\'t delay: the fresher the stain, the higher the chance of complete removal.',
      },
    },
    {
      question: {
        ka: 'რა შედის სრულ ქიმწმენდაში?',
        ru: 'Что входит в полную химчистку?',
        en: 'What is included in full interior cleaning?',
      },
      answer: {
        ka: 'სრული ქიმწმენდა მოიცავს სავარძლების, ჭერის, იატაკის, კარის ბარათების, საბარგულის და პლასტმასის ელემენტების ღრმა წმენდას. ზუსტი შემადგენლობა დამოკიდებულია ავტომობილის მდგომარეობაზე.',
        ru: 'Полная химчистка включает глубокую очистку сидений, потолка, пола, дверных карт, багажника и пластиковых элементов. Точный состав зависит от состояния автомобиля.',
        en: 'Full cleaning includes deep cleaning of seats, headliner, floor, door panels, trunk, and plastic elements. The exact scope depends on the car\'s condition.',
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
        ru: 'Базовая химчистка — 4–6 часов, полная глубокая химчистка — 1–2 дня в зависимости от размера автомобиля и степени загрязнения.',
        en: 'Basic cleaning takes 4–6 hours, full deep cleaning 1–2 days depending on the car size and contamination level.',
      },
    },
  ],

  'auto-glass-tinting': [
    {
      question: {
        ka: 'რა ღირს მანქანის მინების დაბურვა?',
        ru: 'Сколько стоит тонировка стёкол автомобиля?',
        en: 'How much does car window tinting cost?',
      },
      answer: {
        ka: 'გვერდითა მინები (უკანა ან წინა) — 130 Gel-დან, უკანა მინა — 160 Gel-დან, საქარე მინა — 290 Gel-დან. ათერმული დაბურვა უფრო ძვირია. მოგვწერეთ WhatsApp-ზე — გამოვთვლით ზუსტ ფასს თქვენი ავტომობილისთვის.',
        ru: 'Боковые стёкла (задние или передние) — от 130 Gel, заднее стекло — от 160 Gel, лобовое стекло — от 290 Gel. Атермальная тонировка стоит дороже. Напишите нам в WhatsApp — рассчитаем точную стоимость для вашего автомобиля.',
        en: 'Side windows (rear or front) — from 130 Gel, rear window — from 160 Gel, windshield — from 290 Gel. Athermal tinting costs more. Message us on WhatsApp — we\'ll calculate the exact price for your car.',
      },
    },
    {
      question: {
        ka: 'რით განსხვავდება ატერმალური და კერამიკული ფირი?',
        ru: 'Чем отличается атермальная и керамическая плёнка?',
        en: 'What is the difference between athermal and ceramic film?',
      },
      answer: {
        ka: 'ატერმალური ფირი ძირითადად სითბოს უკუგდებას ემსახურება და მაღალ სინათლეგამტარობას ინარჩუნებს — იდეალურია საქარე და წინა მინებისთვის. კერამიკული ფირი კი კერამიკული ნანონაწილაკების წყალობით ერთდროულად იცავს სითბოსგან, ულტრაიისფერი გამოსხივებისგან და არ უშლის ხელს ტელეფონის ან GPS სიგნალს.',
        ru: 'Атермальная плёнка в основном предназначена для отражения тепла и сохраняет высокую светопропускаемость — идеальна для лобового и передних стёкол. Керамическая плёнка благодаря керамическим наночастицам одновременно защищает от тепла, ультрафиолетового излучения и не мешает сигналу телефона или GPS.',
        en: 'Athermal film is primarily designed to reflect heat while maintaining high light transmission — ideal for the windshield and front windows. Ceramic film, thanks to ceramic nanoparticles, simultaneously protects from heat and UV radiation without interfering with phone or GPS signal.',
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
        ru: 'Да. Гарантия на работу — 1 год, на плёнку LLumar — до 5 лет от производителя. При нормальной эксплуатации плёнка служит значительно дольше.',
        en: 'Yes. Warranty on work — 1 year, on LLumar film — up to 5 years from the manufacturer. With normal use, the film lasts significantly longer.',
      },
    },
    {
      question: {
        ka: 'რა დონის დაბურვაა ნებადართული საქართველოში?',
        ru: 'Какой уровень тонировки разрешён в Грузии?',
        en: 'What level of tinting is allowed in Georgia?',
      },
      answer: {
        ka: 'წინა გვერდითა მინები — მინიმუმ 60% სინათლის გატარება, უკანა გვერდითა — მინიმუმ 75%, უკანა მინა — შეზღუდვის გარეშე. ფირს ვარჩევთ მკაცრად კანონის ფარგლებში, ჯარიმის რისკი გამორიცხულია.',
        ru: 'Передние боковые стёкла — минимум 60% светопропускания, задние боковые — минимум 75%, заднее стекло — без ограничений. Плёнку подбираем строго в рамках закона, риск штрафа исключён.',
        en: 'Front side windows — minimum 60% light transmission, rear side — minimum 75%, rear window — no restrictions. We select the film strictly within the law, eliminating any risk of fines.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება მინების დაბურვა?',
        ru: 'Сколько времени занимает тонировка стёкол?',
        en: 'How long does window tinting take?',
      },
      answer: {
        ka: '2–4 საათი მინების რაოდენობის მიხედვით. მნიშვნელოვანი: დაყენებიდან 3 დღე არ ჩამოუშვათ მინები, რათა ფირი სრულად მოეწყოს.',
        ru: '2–4 часа в зависимости от количества стёкол. Важно: не опускайте стёкла 3 дня после установки, чтобы плёнка полностью приклеилась.',
        en: '2–4 hours depending on the number of windows. Important: don\'t lower the windows for 3 days after installation so the film fully adheres.',
      },
    },
    {
      question: {
        ka: 'ატერმალური ფირი რას აკეთებს?',
        ru: 'Что делает атермальная плёнка?',
        en: 'What does athermal film do?',
      },
      answer: {
        ka: 'ათერმული ფირი სითბოს 60%-მდე ასხივებს და თითქმის გამჭვირვალე რჩება. იდეალურია საქარე და წინა მინებისთვის — კონდიციონერი ეფექტურად მუშაობს, საწვავის ხარჯი მცირდება.',
        ru: 'Атермальная плёнка отражает до 60% тепла и остаётся практически прозрачной. Идеальна для лобового и передних стёкол — кондиционер работает эффективнее, расход топлива снижается.',
        en: 'Athermal film reflects up to 60% of heat while remaining nearly transparent. Ideal for the windshield and front windows — the air conditioning works more efficiently and fuel consumption decreases.',
      },
    },
    {
      question: {
        ka: 'შეიძლება თუ არა წინა საქარე მინაზე დაბურვა?',
        ru: 'Можно ли затонировать лобовое стекло?',
        en: 'Can the windshield be tinted?',
      },
      answer: {
        ka: 'დიახ. საქარე მინაზე შესაძლებელია ატერმალური ფირის დატანა, რომელიც ამცირებს სიცხეს და ულტრაიისფერ ზემოქმედებას, ხილვადობის შენარჩუნებით.',
        ru: 'Да. На лобовое стекло можно нанести атермальную плёнку, которая снижает нагрев и ультрафиолетовое воздействие при сохранении видимости.',
        en: 'Yes. An athermal film can be applied to the windshield, reducing heat and UV exposure while maintaining visibility.',
      },
    },
    {
      question: {
        ka: 'ხდებით თუ არა ადგილზე მისვლით?',
        ru: 'Выезжаете ли вы на место?',
        en: 'Do you come to the client\'s location?',
      },
      answer: {
        ka: 'მინების დაბურვა ადგილზე მისვლით შესაძლებელია შეთანხმებით. დაგვიკავშირდით WhatsApp-ზე — შევათანხმებთ დროსა და პირობებს.',
        ru: 'Тонировка с выездом возможна по договорённости. Свяжитесь с нами в WhatsApp — согласуем время и условия.',
        en: 'Mobile tinting service is available by arrangement. Contact us on WhatsApp — we\'ll agree on time and conditions.',
      },
    },
  ],

  'windshield-repair': [
    {
      question: {
        ka: 'რა ღირს საქარე მინის აღდგენა?',
        ru: 'Сколько стоит ремонт лобового стекла?',
        en: 'How much does windshield repair cost?',
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
        ru: 'Можно ли починить любую трещину?',
        en: 'Can any crack be repaired?',
      },
      answer: {
        ka: 'ჩიპები 25 მმ-მდე, ბზარები 15 სმ-მდე. რაც უფრო ახალია დაზიანება, მით უკეთესი შედეგი. თუ ჩიპში ჭუჭყი უკვე მოხვდა — შედეგი შეიძლება ცოტა უარესი იყოს, მაგრამ შეკეთება მაინც შეაჩერებს გავრცელებას.',
        ru: 'Сколы до 25 мм, трещины до 15 см. Чем свежее повреждение, тем лучше результат. Если в скол уже попала грязь — результат может быть немного хуже, но ремонт всё равно остановит распространение.',
        en: 'Chips up to 25 mm, cracks up to 15 cm. The fresher the damage, the better the result. If dirt has already gotten into the chip, the result may be slightly worse, but the repair will still stop it from spreading.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება საქარე მინის შეკეთება?',
        ru: 'Сколько времени занимает ремонт лобового стекла?',
        en: 'How long does windshield repair take?',
      },
      answer: {
        ka: 'ჩიპი — 20–30 წუთი, ბზარი — 30–60 წუთი. შეკეთებისთანავე შეგიძლიათ წახვიდეთ.',
        ru: 'Скол — 20–30 минут, трещина — 30–60 минут. Сразу после ремонта можно уезжать.',
        en: 'Chip — 20–30 minutes, crack — 30–60 minutes. You can drive away immediately after repair.',
      },
    },
    {
      question: {
        ka: 'რა ჯობს — შეკეთება თუ შეცვლა?',
        ru: 'Что лучше — ремонт или замена?',
        en: 'What\'s better — repair or replacement?',
      },
      answer: {
        ka: 'შეკეთება: ჩიპები 25 მმ-მდე, ბზარები 15 სმ-მდე, არა მინის კიდეზე. შეცვლა: ბზარი კიდიდან კიდემდე, დაზიანება კამერების/სენსორების ზონაში, მრავალი ჩიპი. გულახდილად გირჩევთ, რა არის საუკეთესო თქვენს შემთხვევაში.',
        ru: 'Ремонт: сколы до 25 мм, трещины до 15 см, не на краю стекла. Замена: трещина от края до края, повреждение в зоне камер/датчиков, множественные сколы. Честно подскажем, что лучше в вашем случае.',
        en: 'Repair: chips up to 25 mm, cracks up to 15 cm, not on the glass edge. Replacement: edge-to-edge crack, damage in the camera/sensor area, multiple chips. We\'ll honestly advise what\'s best in your case.',
      },
    },
    {
      question: {
        ka: 'რამდენად შესამჩნევი რჩება კვალი შეკეთების შემდეგ?',
        ru: 'Насколько заметен след после ремонта?',
        en: 'How noticeable is the mark after repair?',
      },
      answer: {
        ka: 'გამჭვირვალობა 90–95%-ით აღდგება. პატარა წერტილი შეიძლება დარჩეს, მაგრამ ხილვადობას არ აფერხებს და მანძილიდან არ შეიმჩნევა.',
        ru: 'Прозрачность восстанавливается на 90–95%. Маленькая точка может остаться, но она не мешает обзору и не заметна на расстоянии.',
        en: 'Transparency is restored to 90–95%. A small dot may remain, but it doesn\'t obstruct visibility and isn\'t noticeable from a distance.',
      },
    },
    {
      question: {
        ka: 'რატომ არ უნდა გადავდო შეკეთება?',
        ru: 'Почему не стоит откладывать ремонт?',
        en: 'Why shouldn\'t the repair be delayed?',
      },
      answer: {
        ka: 'რაც უფრო ახალია დაზიანება, მით უკეთესი შედეგი მიიღწევა. დროის გასვლასთან ერთად ბზარი შეიძლება გაიზარდოს, ჭუჭყი მოხვდეს შიგნით და შეკეთება გაძნელდეს ან შეუძლებელი გახდეს.',
        ru: 'Чем свежее повреждение, тем лучше результат. Со временем трещина может разрастись, внутрь попадёт грязь, и ремонт станет сложнее или невозможен.',
        en: 'The fresher the damage, the better the result. Over time, a crack can grow, dirt can get inside, and repair becomes harder or impossible.',
      },
    },
    {
      question: {
        ka: 'ხდებით თუ არა გამოძახებით?',
        ru: 'Выезжаете ли вы по вызову?',
        en: 'Do you offer mobile service?',
      },
      answer: {
        ka: 'დიახ, საქარე მინის აღდგენა გამოძახებით შესაძლებელია. დაგვიკავშირდით WhatsApp-ზე — შევათანხმებთ დროსა და ადგილს.',
        ru: 'Да, ремонт лобового стекла с выездом возможен. Свяжитесь с нами в WhatsApp — согласуем время и место.',
        en: 'Yes, mobile windshield repair is available. Contact us on WhatsApp — we\'ll agree on time and location.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანში აღდგება ნაკენჭარი?',
        ru: 'За сколько времени ремонтируется скол?',
        en: 'How long does chip repair take?',
      },
      answer: {
        ka: 'ნაკენჭარის აღდგენა 20–30 წუთს გრძელდება. შეკეთებისთანავე შეგიძლიათ ავტომობილით წახვიდეთ.',
        ru: 'Ремонт скола занимает 20–30 минут. Сразу после ремонта можно уехать на автомобиле.',
        en: 'Chip repair takes 20–30 minutes. You can drive away immediately after the repair.',
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
        ru: 'Шумоизоляция дверей — от 900 Gel, пола — от 1000 Gel, багажника — от 600 Gel, арок — от 600 Gel. Полная шумоизоляция автомобиля — от 2100 Gel. Напишите в WhatsApp для расчёта стоимости.',
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
        en: 'Yes, 2-year warranty on workmanship. Materials last the entire lifespan of the car. In all our years of work, not a single warranty claim.',
      },
    },
    {
      question: {
        ka: 'ხმის იზოლაცია რას აუმჯობესებს?',
        ru: 'Что улучшает шумоизоляция?',
        en: 'What does soundproofing improve?',
      },
      answer: {
        ka: 'ეს არის სპეციალური მასალების (ვიბრო- და ხმაურშთამნთქმელი) დაყენება ავტომობილის კუზოვის პანელებზე. ამცირებს გზის ხმაურს, ვიბრაციას, აუმჯობესებს კომფორტს და აუდიოსისტემის ხმის ხარისხს.',
        ru: 'Это установка специальных материалов (вибро- и шумопоглощающих) на кузовные панели автомобиля. Снижает дорожный шум и вибрацию, улучшает комфорт и качество звучания аудиосистемы.',
        en: 'It involves installing special materials (vibration-dampening and sound-absorbing) on the car\'s body panels. It reduces road noise and vibration, improves comfort and audio system sound quality.',
      },
    },
    {
      question: {
        ka: 'რომელი ზონების იზოლაცია იძლევა ყველაზე დიდ ეფექტს?',
        ru: 'Изоляция каких зон даёт наибольший эффект?',
        en: 'Which zones provide the greatest effect when soundproofed?',
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
        ru: 'Чем отличается шумо- и виброизоляция?',
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
        en: 'Full soundproofing adds an average of 20–40 kg, which has virtually no effect on the car\'s performance or fuel consumption.',
      },
    },
    {
      question: {
        ka: 'შეიძლება თუ არა მხოლოდ კარების ან საბარგულის იზოლაცია?',
        ru: 'Можно ли сделать шумоизоляцию только дверей или багажника?',
        en: 'Can I soundproof just the doors or trunk?',
      },
      answer: {
        ka: 'დიახ. შესაძლებელია კონკრეტული ზონების ნაწილობრივი დამუშავება — კარები, საბარგული, იატაკი ან თაღები ცალ-ცალკე.',
        ru: 'Да. Возможна частичная обработка отдельных зон — дверей, багажника, пола или арок по отдельности.',
        en: 'Yes. Partial treatment of individual zones is possible — doors, trunk, floor, or wheel arches separately.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ხმის იზოლაციის მონტაჟი?',
        ru: 'Сколько времени занимает монтаж шумоизоляции?',
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
        en: 'Full diagnostics — from 50 Gel, key programming — from 200 Gel. Message us on WhatsApp to clarify pricing.',
      },
    },
    {
      question: {
        ka: 'რა მოხდება, თუ პრობლემები აღმოჩნდება?',
        ru: 'Что произойдёт, если обнаружатся проблемы?',
        en: 'What happens if problems are found?',
      },
      answer: {
        ka: 'მიიღებთ დეტალურ ანგარიშს ყოველი შეცდომის აღწერით, ფოტოებითა და რეკომენდაციებით. პრიორიტეტებს ვადგენთ: რა არის კრიტიკული, რა შეიძლება დაელოდოს. რემონტის გადაწყვეტილება ყოველთვის თქვენია.',
        ru: 'Вы получите подробный отчёт с описанием каждой ошибки, фотографиями и рекомендациями. Мы расставляем приоритеты: что критично, а что может подождать. Решение о ремонте всегда за вами.',
        en: 'You\'ll receive a detailed report describing each error, with photos and recommendations. We prioritize issues: what\'s critical and what can wait. The decision to repair is always yours.',
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
        ru: 'Базовая — 30–40 минут, расширенная — 1–1,5 часа. Результат получите сразу по завершении.',
        en: 'Basic — 30–40 minutes, extended — 1–1.5 hours. You get the results immediately upon completion.',
      },
    },
    {
      question: {
        ka: 'რა ავტომობილებს ამოწმებთ?',
        ru: 'Какие автомобили вы диагностируете?',
        en: 'What cars do you diagnose?',
      },
      answer: {
        ka: 'ყველა მარკასა და მოდელს. მულტიმარკიანი სკანერები + დილერის პროგრამული უზრუნველყოფა პოპულარული ბრენდებისთვის. ელექტრომობილები და ჰიბრიდები — ასევე.',
        ru: 'Все марки и модели. Мультимарочные сканеры + дилерское программное обеспечение для популярных брендов. Электромобили и гибриды — тоже.',
        en: 'All makes and models. Multi-brand scanners plus dealer software for popular brands. Electric vehicles and hybrids — as well.',
      },
    },
    {
      question: {
        ka: 'როდის არის საჭირო კომპიუტერული დიაგნოსტიკა?',
        ru: 'Когда необходима компьютерная диагностика?',
        en: 'When is computer diagnostics necessary?',
      },
      answer: {
        ka: 'Check Engine ანთია, მეორადი ავტო ყიდვამდე, ავარიის შემდეგ, სიმძლავრის დაკარგვა, საწვავის გაზრდილი ხარჯი. პროფილაქტიკისთვის გირჩევთ წელიწადში ერთხელ.',
        ru: 'Горит Check Engine, перед покупкой подержанного авто, после аварии, потеря мощности, повышенный расход топлива. Для профилактики рекомендуем раз в год.',
        en: 'Check Engine light is on, before buying a used car, after an accident, power loss, increased fuel consumption. For prevention, we recommend once a year.',
      },
    },
    {
      question: {
        ka: 'შეგიძლიათ შეცდომების წაშლა?',
        ru: 'Можете ли вы сбросить ошибки?',
        en: 'Can you clear error codes?',
      },
      answer: {
        ka: 'დიახ, მაგრამ მხოლოდ მიზეზის გარკვევის შემდეგ. კოდების უბრალოდ წაშლა მიზეზის აღმოფხვრის გარეშე აზრს მოკლებულია — შეცდომა დაბრუნდება. ყოველთვის ავხსნით, რამ გამოიწვია შეცდომა და საჭიროა თუ არა რემონტი.',
        ru: 'Да, но только после выяснения причины. Просто сбросить коды без устранения причины бессмысленно — ошибка вернётся. Мы всегда объясняем, что вызвало ошибку и нужен ли ремонт.',
        en: 'Yes, but only after identifying the cause. Simply clearing codes without fixing the cause is pointless — the error will return. We always explain what caused the error and whether repair is needed.',
      },
    },
    {
      question: {
        ka: 'აკეთებთ თუ არა ყიდვამდე შემოწმებას?',
        ru: 'Делаете ли вы проверку перед покупкой?',
        en: 'Do you offer pre-purchase inspections?',
      },
      answer: {
        ka: 'დიახ, ეს ერთ-ერთი ჩვენი მთავარი მომსახურებაა. ვამოწმებთ ყველა სისტემას, გარბენს (დატრიალებულია თუ არა), შეცდომების ისტორიას, აკუმულატორის მდგომარეობას, ძრავისა და ტრანსმისიის მუშაობას. სრული ანგარიში — ავტომობილის მდგომარეობის გულახდილი სურათი.',
        ru: 'Да, это одна из наших ключевых услуг. Проверяем все системы, пробег (скручен или нет), историю ошибок, состояние аккумулятора, работу двигателя и трансмиссии. Полный отчёт — честная картина состояния автомобиля.',
        en: 'Yes, this is one of our key services. We check all systems, mileage (rolled back or not), error history, battery condition, engine and transmission performance. A full report — an honest picture of the car\'s condition.',
      },
    },
    {
      question: {
        ka: 'შემიძლია თუ არა დიაგნოსტიკის თვითონ გაკეთება?',
        ru: 'Можно ли сделать диагностику самостоятельно?',
        en: 'Can I run diagnostics on my own?',
      },
      answer: {
        ka: 'OBD2-სკანერი 30–50 Gel-ად ძრავის ბაზისურ შეცდომებს აჩვენებს. მაგრამ სისტემების 80%-ს ვერ ხედავს: ბალიშები, ABS, ტრანსმისია, კლიმატ-კონტროლი. პროფესიონალური დიაგნოსტიკა ავტომობილის ყველა სისტემას მოიცავს.',
        ru: 'OBD2-сканер за 30–50 Gel покажет базовые ошибки двигателя. Но он не видит 80% систем: подушки безопасности, ABS, трансмиссию, климат-контроль. Профессиональная диагностика охватывает все системы автомобиля.',
        en: 'An OBD2 scanner for 30–50 Gel will show basic engine errors. But it can\'t see 80% of systems: airbags, ABS, transmission, climate control. Professional diagnostics covers all vehicle systems.',
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
        ru: 'Удаление вмятины на одном элементе — от 250 Gel. Ремонт повреждений от града — от 1800 Gel. Точная цена зависит от размера, расположения и количества вмятин. Пришлите фото в WhatsApp — оценим бесплатно.',
        en: 'Dent removal on a single panel — from 250 Gel. Hail damage repair — from 1800 Gel. The exact price depends on size, location, and number of dents. Send a photo on WhatsApp — we\'ll estimate for free.',
      },
    },
    {
      question: {
        ka: 'შესამჩნევი იქნება რემონტის ადგილი?',
        ru: 'Будет ли заметно место ремонта?',
        en: 'Will the repair spot be visible?',
      },
      answer: {
        ka: 'შემთხვევების 95%-ში — არა. შედეგს სპეციალურ განათებაში ვამოწმებთ. თუ PDR თქვენს შემთხვევას არ შეეფერება — გულახდილად გეტყვით და ალტერნატივას შემოგთავაზებთ.',
        ru: 'В 95% случаев — нет. Результат проверяем при специальном освещении. Если PDR не подходит для вашего случая — честно скажем и предложим альтернативу.',
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
        ru: 'Да, бессрочная гарантия на работу. Правильно удалённая вмятина не возвращается — металл навсегда принимает первоначальную форму.',
        en: 'Yes, lifetime warranty on workmanship. A properly removed dent doesn\'t come back — the metal permanently takes its original shape.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება ჩაზნექილობის მოცილება?',
        ru: 'Сколько времени занимает удаление вмятины?',
        en: 'How long does dent removal take?',
      },
      answer: {
        ka: 'მცირე ჩაზნექილობა — 30–60 წუთი. რამდენიმე ჩაზნექილობა — 2–4 საათი. სეტყვის დაზიანება — 1–2 დღე. ზუსტი ვადა სირთულეზეა დამოკიდებული.',
        ru: 'Небольшая вмятина — 30–60 минут. Несколько вмятин — 2–4 часа. Повреждения от града — 1–2 дня. Точные сроки зависят от сложности.',
        en: 'Small dent — 30–60 minutes. Multiple dents — 2–4 hours. Hail damage — 1–2 days. Exact timing depends on complexity.',
      },
    },
    {
      question: {
        ka: 'რომელი ჩაზნექილობების მოცილება შეიძლება უშეღებავად?',
        ru: 'Какие вмятины можно удалить без покраски?',
        en: 'Which dents can be removed without painting?',
      },
      answer: {
        ka: 'ნებისმიერი ჩაზნექილობა მკვეთრი ნაოჭებისა და საღებავის დაზიანების გარეშე. არ ვარგა: მკვეთრი ნაოჭები, დაზიანებები სიმტკიცის წიბოებზე, ბზარიანი საღებავით ჩაზნექილობები. ასეთ შემთხვევებში საჭიროა ტრადიციული კუზოვის რემონტი.',
        ru: 'Любые вмятины без резких заломов и повреждения краски. Не подходит: резкие заломы, повреждения на рёбрах жёсткости, вмятины с трещинами краски. В таких случаях нужен традиционный кузовной ремонт.',
        en: 'Any dents without sharp creases or paint damage. Not suitable: sharp creases, damage on reinforcement ridges, dents with cracked paint. In such cases, traditional body repair is needed.',
      },
    },
    {
      question: {
        ka: 'რატომ არის PDR უკეთესი ტრადიციულ რემონტზე?',
        ru: 'Почему PDR лучше традиционного ремонта?',
        en: 'Why is PDR better than traditional repair?',
      },
      answer: {
        ka: 'PDR ინარჩუნებს ქარხნულ საღებავს — ეს მნიშვნელოვანია ავტომობილის ღირებულებისთვის. 2–3-ჯერ იაფია ვიდრე ტრადიციული რემონტი შეღებვით. სრულდება საათებში და არა დღეებში. არ გჭირდებათ შემცვლელი მანქანა.',
        ru: 'PDR сохраняет заводскую краску — это важно для стоимости автомобиля. В 2–3 раза дешевле традиционного ремонта с покраской. Выполняется за часы, а не за дни. Не нужен подменный автомобиль.',
        en: 'PDR preserves the factory paint — this is important for the car\'s value. 2–3 times cheaper than traditional repair with repainting. Done in hours, not days. No need for a replacement car.',
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
        ru: 'Осмотр повреждения при специальном освещении. Получение доступа к обратной стороне панели. Выдавливание вмятины специальными рычагами или клеевой технологией (в труднодоступных местах). Финальная проверка при освещении.',
        en: 'Damage inspection under specialized lighting. Gaining access to the back of the panel. Pushing out the dent with special levers or glue pull technique (in hard-to-reach areas). Final inspection under lighting.',
      },
    },
    {
      question: {
        ka: 'საჭიროა თუ არა წინასწარ ჩაწერა?',
        ru: 'Нужна ли предварительная запись?',
        en: 'Is advance booking necessary?',
      },
      answer: {
        ka: 'სასურველია 1–2 დღით ადრე. მცირე ჩაზნექილობები ზოგჯერ იმავე დღეს შეგვიძლია. მოგვწერეთ WhatsApp-ზე — გირჩევთ უახლოეს თავისუფალ დროს.',
        ru: 'Желательно за 1–2 дня. Небольшие вмятины иногда можем принять в тот же день. Напишите в WhatsApp — подскажем ближайшее свободное время.',
        en: 'Preferably 1–2 days in advance. Small dents can sometimes be handled the same day. Message us on WhatsApp — we\'ll suggest the nearest available time.',
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
        ru: 'PDR (Paintless Dent Repair) — технология удаления вмятин без повреждения заводской краски. Мастер выдавливает вмятину изнутри специальными инструментами, возвращая металлу первоначальную форму.',
        en: 'PDR (Paintless Dent Repair) is a dent removal technology without damaging factory paint. A specialist pushes the dent out from the inside using special tools, returning the metal to its original shape.',
      },
    },
  ],

  'carwash': [
    {
      question: {
        ka: 'რა განსხვავებაა 2-ფაზიან და 3-ფაზიან დეტეილინგ რეცხვას შორის?',
        ru: 'В чём разница между 2-фазной и 3-фазной детейлинг-мойкой?',
        en: 'What is the difference between a 2-phase and 3-phase detailing wash?',
      },
      answer: {
        ka: 'დეტეილინგ რეცხვა არის საფუძვლიანი ხელით რეცხვა ორი ვედრის მეთოდით. პროცესი 2–3 საათს გრძელდება, გამოიყენება pH-ნეიტრალური ქიმია, რომელიც უსაფრთხოა კერამიკული და PPF საფარისთვის, და ხსნის დაბინძურებას, რომელსაც ავტომატური სარეცხი ვერ ხსნის.',
        ru: 'Детейлинг-мойка — это тщательная ручная мойка методом двух вёдер. Процесс занимает 2–3 часа, используется pH-нейтральная химия, безопасная для керамических покрытий и PPF, и удаляются загрязнения, которые автоматическая мойка не убирает.',
        en: 'A detailing wash is a thorough hand wash using the two-bucket method. The process takes 2–3 hours, uses pH-neutral chemicals safe for ceramic coatings and PPF, and removes contamination that automated car washes cannot handle.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანს გრძელდება მანქანის რეცხვა?',
        ru: 'Сколько времени занимает мойка автомобиля?',
        en: 'How long does a car wash take?',
      },
      answer: {
        ka: 'დეტეილინგ რეცხვა საშუალოდ 2–3 საათს მოითხოვს, ავტომობილის ზომისა და დაბინძურების ხარისხის მიხედვით.',
        ru: 'Детейлинг-мойка занимает в среднем 2–3 часа в зависимости от размера автомобиля и степени загрязнения.',
        en: 'A detailing wash takes an average of 2–3 hours depending on the car size and contamination level.',
      },
    },
    {
      question: {
        ka: 'უსაფრთხოა თუ არა რეცხვა PPF-ისთვის და კერამიკისთვის?',
        ru: 'Безопасна ли мойка для PPF и керамики?',
        en: 'Is the wash safe for PPF and ceramic coating?',
      },
      answer: {
        ka: 'დიახ. ჩვენ ვიყენებთ პროფესიონალურ pH-ნეიტრალურ ქიმიას, რომელიც სრულიად უსაფრთხოა კერამიკული საფარისა და PPF-ფილმისთვის.',
        ru: 'Да. Мы используем профессиональную pH-нейтральную химию, которая полностью безопасна для керамических покрытий и PPF-плёнок.',
        en: 'Yes. We use professional pH-neutral chemicals that are completely safe for ceramic coatings and PPF films.',
      },
    },
    {
      question: {
        ka: 'რა ქიმიას იყენებთ?',
        ru: 'Какую химию вы используете?',
        en: 'What chemicals do you use?',
      },
      answer: {
        ka: 'ჩვენ ვიყენებთ პროფესიონალურ pH-ნეიტრალურ ავტოქიმიას, რომელიც უსაფრთხოა ყველა სახის საფარისთვის, საღებავისა და დამცავი ფილმისთვის.',
        ru: 'Мы используем профессиональную pH-нейтральную автохимию, безопасную для всех типов покрытий, лакокрасочного покрытия и защитных плёнок.',
        en: 'We use professional pH-neutral car care products that are safe for all types of coatings, paintwork, and protective films.',
      },
    },
    {
      question: {
        ka: 'რა ღირს მანქანის რეცხვა?',
        ru: 'Сколько стоит мойка автомобиля?',
        en: 'How much does a car wash cost?',
      },
      answer: {
        ka: 'დეტეილინგ რეცხვის ფასი იწყება 45 ლარიდან სედანის ორფაზიანი რეცხვისთვის. საბოლოო ფასი დამოკიდებულია ავტომობილის კლასსა და შერჩეულ მომსახურებაზე.',
        ru: 'Стоимость детейлинг-мойки начинается от 45 лари за двухфазную мойку седана. Итоговая цена зависит от класса автомобиля и выбранных услуг.',
        en: 'Detailing wash starts from 45 GEL for a two-phase sedan wash. The final price depends on the vehicle class and selected services.',
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
        ru: 'У нас доступны оклейка PPF-плёнкой, смена цвета плёнкой, полировка, керамическое покрытие, тонировка стёкол, химчистка салона, детейлинг-мойка, шумоизоляция и ремонт лобового стекла.',
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
        ru: 'BESTAUTO работает на двух локациях в Тбилиси — Гурамишвили и Сабуртало. При записи поможем выбрать удобную для вас студию.',
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
        ru: 'Если вы не уверены, какая услуга вам подходит, лучший способ — бесплатный осмотр. На месте подберём оптимальное решение с учётом состояния автомобиля и вашей цели.',
        en: 'If you\'re not sure which service is right for you, the best way is a free inspection. On-site, we\'ll recommend the optimal solution based on your car\'s condition and your goal.',
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
        ru: 'Да. Клиенты часто объединяют несколько услуг — например, полировку и керамическое покрытие, или PPF и тонировку стёкол.',
        en: 'Yes. Clients often combine multiple services — for example, polishing and ceramic coating, or PPF and window tinting.',
      },
    },
    {
      question: {
        ka: 'რამდენ ხანში მპასუხობთ ჩაწერის შემდეგ?',
        ru: 'Как быстро вы отвечаете после записи?',
        en: 'How quickly do you respond after a booking request?',
      },
      answer: {
        ka: 'როგორც წესი, მოთხოვნის გამოგზავნიდან 15 წუთის განმავლობაში გიკავშირდებით. ასევე შეგიძლიათ მოგვწეროთ WhatsApp-ზე ან დაგვირეკოთ პირდაპირ.',
        ru: 'Как правило, отвечаем в течение 15 минут после отправки заявки. Также можете написать нам в WhatsApp или позвонить напрямую.',
        en: 'We typically respond within 15 minutes after you submit a request. You can also message us on WhatsApp or call directly.',
      },
    },
  ],

};
