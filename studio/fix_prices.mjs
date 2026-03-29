import { readFileSync } from 'fs'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3k4yh9kj',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const sections = JSON.parse(readFileSync('/tmp/prices_fixed.json', 'utf-8'))

// --- Fix section 0: Polishing (RU has 5 items, EN/KA have 4 — missing the promo) ---
// RU order: [body, promo, headlights, interior, glass]
// EN/KA order: [body, headlights, interior, glass]
const s0en = sections[0].items.map(it => it.nameEn)  // [full, headlight, interior, glass, '']
const s0ka = sections[0].items.map(it => it.nameKa)
sections[0].items = sections[0].items.map((it, j) => {
  if (j === 0) return { ...it, nameEn: s0en[0], nameKa: s0ka[0] }  // body polishing ✓
  if (j === 1) return { ...it, nameEn: '', nameKa: '' }              // promo — no EN/KA equivalent
  return { ...it, nameEn: s0en[j - 1], nameKa: s0ka[j - 1] }        // shift back 1 for rest
})

// --- Fix section titles 1–10 (empty titles in RU due to parsing) ---
// Correct titles from Tilda RU:
const ruTitles = [
  'Цены на полировку автомобиля',
  'Цены на нанесение защитных покрытий',
  'Цены на детейлинг химчистку и мойку',
  'Цены на восстановление салона',
  'Цены на беспокрасочное удаление вмятин (PDR)',
  'Цены на ремонт сколов и трещин автостекол',
  'Цены на оклейку пленкой PPF',
  'Цены на оклейку кузова виниловой пленкой',
  'Цены на тонировку стекол автомобиля',
  'Цены на шумоизоляцию автомобиля',
  'Цены на компьютерную диагностику автомобиля',
]
const enTitles = [
  'Car polishing prices',
  'Protective coating prices',
  'Detailing dry cleaning & car wash prices',
  'Interior restoration prices',
  'Paintless Dent Repair (PDR) prices',
  'Windshield chip & crack repair prices',
  'PPF film wrapping prices',
  'Vinyl film wrapping prices',
  'Car window tinting prices',
  'Car soundproofing prices',
  'Computer diagnostics prices',
]
const kaTitles = [
  'მანქანის გასაპრიალებელი ფასები',
  'დამცავი საფარის ფასები',
  'დეტეილინგ ქიმწმენდის და მრეცხავი ფასები',
  'ინტერიერის რესტავრაციის ფასები',
  'PDR - ღრეჩოს გასწორება ფასები',
  'საქარე მინის ნახვრეტებისა და ბზარების შეკეთება',
  'PPF ფირის გადაკვრის ფასები',
  'ვინილის ფირის გადაკვრის ფასები',
  'ავტომობილის მინების შეფერვის ფასები',
  'ავტომობილის ხმაურის იზოლაციის ფასები',
  'კომპიუტერული დიაგნოსტიკის ფასები',
]

sections.forEach((s, i) => {
  s.titleRu = ruTitles[i] || s.titleRu
  s.titleEn = enTitles[i] || s.titleEn
  s.titleKa = kaTitles[i] || s.titleKa
})

// --- Fix section 2: Cleaning (RU[0] is manual wash, no EN equivalent) ---
// RU: [manual wash, light, moderate, heavy, odor]
// EN: [light, moderate, heavy, odor]
const s2en = ['', ...sections[2].items.slice(0,4).map(it => it.nameEn)]
const s2ka = ['', ...sections[2].items.slice(0,4).map(it => it.nameKa)]
sections[2].items = sections[2].items.map((it, j) => ({
  ...it,
  nameEn: s2en[j] ?? '',
  nameKa: s2ka[j] ?? '',
}))

// Print for review
sections.forEach((s,i) => {
  console.log(`\n${i}. ${s.titleRu} | ${s.titleEn}`)
  s.items.forEach((it,j) => {
    console.log(`  [${j}] RU:${it.nameRu} | EN:${it.nameEn}`)
  })
})

// Upload to Sanity
const doc = {
  _id: 'pricingPage',
  _type: 'pricingPage',
  titleRu: 'Цены на детейлинг услуги',
  titleKa: 'ფასები',
  titleEn: 'Detailing Prices',
  sections,
}
await client.createOrReplace(doc)
console.log(`\n✅ Uploaded ${sections.length} sections, ${sections.reduce((a,s) => a + s.items.length, 0)} items`)
