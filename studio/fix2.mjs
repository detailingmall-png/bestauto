import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3k4yh9kj', dataset: 'production',
  token: process.env.SANITY_TOKEN, useCdn: false, apiVersion: '2024-01-01',
})

const doc = await client.fetch('*[_type=="pricingPage"][0]')

// Fix section 6 (PPF): correct EN/KA order
// EN Tilda: full, hood+fenders, panoramic roof, headlights (4 items)
// RU order: full, hood+bumper+fenders, hood only, bumper only, front headlights, panoramic roof (6 items)
const enPPF = ['Full vehicle wrapping', 'Hood, front bumper, front fenders, and pillars wrapping', '', '', 'Headlights wrapping', 'Panoramic roof wrapping']
const kaPPF = ['სრული შეფუთვა', 'კაპოტის შეფუთვა, წინა ბამპერი, წინა ფარები, სვეტები', '', '', 'ფარის სტიკერი', 'პანორამული სახურავის სტიკერი']
doc.sections[6].items = doc.sections[6].items.map((it, j) => ({...it, nameEn: enPPF[j] ?? '', nameKa: kaPPF[j] ?? ''}))

// Fix section 8 (tinting): add correct EN for windshield
const enTint = ['Rear side window tinting', 'Front side window tinting', 'Rear windshield tinting', 'Front windshield tinting']
const kaTint = ['უკანა გვერდითი მინები', 'წინა გვერდითი მინები', 'უკანა საქარე მინის დაბურვა', 'წინა საქარე მინის დაბურვა']
doc.sections[8].items = doc.sections[8].items.map((it, j) => ({...it, nameEn: enTint[j] ?? '', nameKa: kaTint[j] ?? ''}))

// Fix section 2 item 0 (manual car wash): add EN/KA
doc.sections[2].items[0].nameEn = 'Hand detailing car wash'
doc.sections[2].items[0].nameKa = 'ხელით დეტეილინგ მრეცხავი'

await client.createOrReplace(doc)
console.log('✅ Fixed sections 2, 6, 8')
