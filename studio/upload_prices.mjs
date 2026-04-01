import { readFileSync } from 'fs'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '3k4yh9kj',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

const merged = JSON.parse(readFileSync('/tmp/prices_merged.json', 'utf-8'))

// Build pricingPage document
const doc = {
  _id: 'pricingPage',
  _type: 'pricingPage',
  titleRu: 'Цены на детейлинг услуги',
  titleKa: 'ფასები',
  titleEn: 'Detailing Prices',
  sections: merged,
}

try {
  await client.createOrReplace(doc)
  console.log(`✅ Uploaded pricingPage with ${merged.length} sections, ${merged.reduce((a,s) => a + s.items.length, 0)} items`)
} catch(e) {
  // pricingPage schema may not have sections field yet - patch it
  console.log('Error:', e.message)
}
