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
};
