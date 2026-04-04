/**
 * Static content for studio location pages.
 * Each location has multilingual text, FAQ, and metadata.
 */

export interface LocationFaq {
  readonly question: Record<string, string>;
  readonly answer: Record<string, string>;
}

export interface LocationData {
  readonly key: string;
  readonly slug: string;
  readonly name: Record<string, string>;
  readonly address: Record<string, string>;
  readonly phone: string;
  readonly whatsapp: string;
  readonly hours: Record<string, string>;
  readonly mapsUrl: string;
  readonly mapsEmbed: string;
  readonly description: Record<string, string>;
  readonly parking: Record<string, string>;
  readonly faqs: readonly LocationFaq[];
}

export const LOCATIONS: readonly LocationData[] = [
  {
    key: 'guramishvili',
    slug: 'guramishvili',
    name: {
      ka: 'BESTAUTO გურამიშვილი',
      ru: 'BESTAUTO Гурамишвили',
      en: 'BESTAUTO Guramishvili',
    },
    address: {
      ka: 'გურამიშვილის გამზ. 78, თბილისი',
      ru: 'пр. Гурамишвили 78, Тбилиси',
      en: 'Guramishvili Ave. 78, Tbilisi',
    },
    phone: '+995550000299',
    whatsapp: '995550000299',
    hours: {
      ka: 'ორშ–შაბ 10:00 – 20:00',
      ru: 'Пн–Сб 10:00 – 20:00',
      en: 'Mon–Sat 10:00 – 20:00',
    },
    mapsUrl: 'https://maps.app.goo.gl/vQqfwBCT9oKqMVDr5',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2976.5!2d44.7536!3d41.7634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQ1JzQ4LjIiTiA0NMKwNDUnMTMuMCJF!5e0!3m2!1sen!2sge!4v1',
    description: {
      ka: 'BESTAUTO გურამიშვილის სტუდია მდებარეობს გურამიშვილის გამზირზე, გლდანის რაიონში. სტუდიაში ხორციელდება ყველა სახის დეტეილინგ მომსახურება: PPF დამცავი ფირი, კერამიკული დაფარვა, პოლირება, ფერის შეცვლა, მინების ტონირება, ქიმწმენდა, ხმის იზოლაცია და კომპიუტერული დიაგნოსტიკა.',
      ru: 'Студия BESTAUTO на проспекте Гурамишвили расположена в районе Глдани. В студии выполняются все виды детейлинг-услуг: PPF защитная плёнка, керамическое покрытие, полировка, смена цвета плёнкой, тонировка стёкол, химчистка салона, шумоизоляция и компьютерная диагностика.',
      en: 'BESTAUTO Guramishvili studio is located on Guramishvili Avenue in the Gldani district. The studio offers the full range of detailing services: PPF paint protection film, ceramic coating, polishing, color change wrap, window tinting, interior cleaning, soundproofing, and computer diagnostics.',
    },
    parking: {
      ka: 'სტუდიის წინ არის უფასო პარკინგი 5+ ადგილით. მისვლა მოსახერხებელია როგორც გლდანიდან, ისე თემქადან.',
      ru: 'Перед студией есть бесплатная парковка на 5+ мест. Удобный подъезд со стороны Глдани и Темка.',
      en: 'Free parking for 5+ cars in front of the studio. Easy access from both Gldani and Temka directions.',
    },
    faqs: [
      {
        question: {
          ka: 'რა მისამართზეა BESTAUTO გურამიშვილის სტუდია?',
          ru: 'По какому адресу находится студия BESTAUTO Гурамишвили?',
          en: 'Where is BESTAUTO Guramishvili studio located?',
        },
        answer: {
          ka: 'სტუდია მდებარეობს გურამიშვილის გამზ. 78, გლდანის რაიონში, თბილისი. Google Maps-ზე ძიებისას აკრიფეთ „BESTAUTO Guramishvili".',
          ru: 'Студия расположена по адресу пр. Гурамишвили 78, район Глдани, Тбилиси. В Google Maps ищите «BESTAUTO Guramishvili».',
          en: 'The studio is at Guramishvili Ave. 78, Gldani district, Tbilisi. Search "BESTAUTO Guramishvili" on Google Maps.',
        },
      },
      {
        question: {
          ka: 'რა სამუშაო საათებია?',
          ru: 'Какое время работы студии?',
          en: 'What are the working hours?',
        },
        answer: {
          ka: 'სტუდია მუშაობს ორშაბათიდან შაბათამდე, 10:00-დან 20:00-მდე.',
          ru: 'Студия работает с понедельника по субботу, с 10:00 до 20:00.',
          en: 'The studio is open Monday to Saturday, 10:00 AM to 8:00 PM.',
        },
      },
      {
        question: {
          ka: 'არის თუ არა პარკინგი?',
          ru: 'Есть ли парковка рядом со студией?',
          en: 'Is there parking available?',
        },
        answer: {
          ka: 'დიახ, სტუდიის წინ არის უფასო პარკინგი 5-ზე მეტ ავტომობილზე.',
          ru: 'Да, перед студией есть бесплатная парковка на 5+ автомобилей.',
          en: 'Yes, there is free parking for 5+ cars right in front of the studio.',
        },
      },
      {
        question: {
          ka: 'რა სერვისებს გთავაზობთ ამ ლოკაციაზე?',
          ru: 'Какие услуги доступны в этой студии?',
          en: 'What services are available at this location?',
        },
        answer: {
          ka: 'ხელმისაწვდომია ყველა სერვისი: PPF დამცავი ფირი, კერამიკული დაფარვა, პოლირება, ფერის შეცვლა დამცავი ფირით, მინების ტონირება, ქიმწმენდა, ხმის იზოლაცია, ავტომინების შეკეთება, კომპიუტერული დიაგნოსტიკა და პრემიუმ რეცხვა.',
          ru: 'Доступны все услуги: PPF защитная плёнка, керамика, полировка, смена цвета плёнкой, тонировка, химчистка, шумоизоляция, ремонт автостекол, компьютерная диагностика и премиум-мойка.',
          en: 'All services are available: PPF film, ceramic coating, polishing, color change wrap, window tinting, interior cleaning, soundproofing, windshield repair, computer diagnostics, and premium car wash.',
        },
      },
    ],
  },
  {
    key: 'saburtalo',
    slug: 'saburtalo',
    name: {
      ka: 'BESTAUTO საბურთალო',
      ru: 'BESTAUTO Сабуртало',
      en: 'BESTAUTO Saburtalo',
    },
    address: {
      ka: 'ანა პოლიტკოვსკაიას ქ. 51, თბილისი',
      ru: 'ул. Анна Политковская 51, Тбилиси',
      en: 'Anna Politkovskaya St. 51, Tbilisi',
    },
    phone: '+995550000199',
    whatsapp: '995550000199',
    hours: {
      ka: 'ორშ–შაბ 10:00 – 20:00',
      ru: 'Пн–Сб 10:00 – 20:00',
      en: 'Mon–Sat 10:00 – 20:00',
    },
    mapsUrl: 'https://maps.app.goo.gl/NkR4PvcJEGr5DQWK8',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d44.7436!3d41.7234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQzJzI0LjIiTiA0NMKwNDQnMzYuMCJF!5e0!3m2!1sen!2sge!4v1',
    description: {
      ka: 'BESTAUTO საბურთალოს სტუდია მდებარეობს ანა პოლიტკოვსკაიას ქუჩაზე, საბურთალოს რაიონში. სტუდიაში ხორციელდება ყველა სახის დეტეილინგ მომსახურება: PPF დამცავი ფირი, კერამიკული დაფარვა, პოლირება, ფერის შეცვლა, მინების ტონირება, ქიმწმენდა, ხმის იზოლაცია და კომპიუტერული დიაგნოსტიკა.',
      ru: 'Студия BESTAUTO на Сабуртало расположена на улице Анна Политковская, район Сабуртало. В студии выполняются все виды детейлинг-услуг: PPF защитная плёнка, керамическое покрытие, полировка, смена цвета плёнкой, тонировка стёкол, химчистка салона, шумоизоляция и компьютерная диагностика.',
      en: 'BESTAUTO Saburtalo studio is located on Anna Politkovskaya Street in the Saburtalo district. The studio offers the full range of detailing services: PPF paint protection film, ceramic coating, polishing, color change wrap, window tinting, interior cleaning, soundproofing, and computer diagnostics.',
    },
    parking: {
      ka: 'სტუდიის ეზოში არის უფასო პარკინგი. ადვილი მისასვლელია ვაჟა-ფშაველას გამზირიდან.',
      ru: 'Во дворе студии есть бесплатная парковка. Удобный подъезд с проспекта Важа-Пшавела.',
      en: 'Free parking in the studio yard. Easy access from Vazha-Pshavela Avenue.',
    },
    faqs: [
      {
        question: {
          ka: 'რა მისამართზეა BESTAUTO საბურთალოს სტუდია?',
          ru: 'По какому адресу находится студия BESTAUTO Сабуртало?',
          en: 'Where is BESTAUTO Saburtalo studio located?',
        },
        answer: {
          ka: 'სტუდია მდებარეობს ანა პოლიტკოვსკაიას ქ. 51, საბურთალოს რაიონში, თბილისი. Google Maps-ზე ძიებისას აკრიფეთ „BESTAUTO Saburtalo".',
          ru: 'Студия расположена по адресу ул. Анна Политковская 51, район Сабуртало, Тбилиси. В Google Maps ищите «BESTAUTO Saburtalo».',
          en: 'The studio is at Anna Politkovskaya St. 51, Saburtalo district, Tbilisi. Search "BESTAUTO Saburtalo" on Google Maps.',
        },
      },
      {
        question: {
          ka: 'რა სამუშაო საათებია?',
          ru: 'Какое время работы студии?',
          en: 'What are the working hours?',
        },
        answer: {
          ka: 'სტუდია მუშაობს ორშაბათიდან შაბათამდე, 10:00-დან 20:00-მდე.',
          ru: 'Студия работает с понедельника по субботу, с 10:00 до 20:00.',
          en: 'The studio is open Monday to Saturday, 10:00 AM to 8:00 PM.',
        },
      },
      {
        question: {
          ka: 'არის თუ არა პარკინგი?',
          ru: 'Есть ли парковка рядом со студией?',
          en: 'Is there parking available?',
        },
        answer: {
          ka: 'დიახ, სტუდიის ეზოში არის უფასო პარკინგი.',
          ru: 'Да, во дворе студии есть бесплатная парковка.',
          en: 'Yes, there is free parking in the studio yard.',
        },
      },
      {
        question: {
          ka: 'როგორ მივიდე საბურთალოს სტუდიამდე?',
          ru: 'Как добраться до студии на Сабуртало?',
          en: 'How do I get to the Saburtalo studio?',
        },
        answer: {
          ka: 'სტუდია მდებარეობს ვაჟა-ფშაველას გამზირთან ახლოს. მეტროსადგურიდან „დელისი" დაახლოებით 10 წუთის სავალი გზაა.',
          ru: 'Студия расположена недалеко от проспекта Важа-Пшавела. От станции метро «Делиси» — около 10 минут пешком.',
          en: 'The studio is near Vazha-Pshavela Avenue. About a 10-minute walk from Delisi metro station.',
        },
      },
    ],
  },
];

/** Lookup location by slug. */
export function getLocation(slug: string): LocationData | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
