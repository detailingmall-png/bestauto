/**
 * Seed script: Parse Tilda HTML export → structured JSON → Sanity documents.
 *
 * Usage:
 *   SANITY_PROJECT_ID=xxx SANITY_TOKEN=xxx node seed.mjs
 *
 * Or dry-run (no upload):
 *   DRY_RUN=1 node seed.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __dirname = dirname(fileURLToPath(import.meta.url))
const EXPORT_DIR = join(__dirname, '../tilda-export/project6825691')
const PAGE_MAP = JSON.parse(
  readFileSync(join(__dirname, '../astro/src/lib/page-map.json'), 'utf-8')
)

const isDryRun = process.env.DRY_RUN === '1'

const client = isDryRun
  ? null
  : createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET || 'production',
      token: process.env.SANITY_TOKEN,
      useCdn: false,
      apiVersion: '2024-01-01',
    })

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────

function readPage(filename) {
  try {
    return readFileSync(join(EXPORT_DIR, filename), 'utf-8')
  } catch {
    return ''
  }
}

function extractMeta(html, attr) {
  const m = html.match(new RegExp(`<meta[^>]+name="${attr}"[^>]+content="([^"]*)"`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+name="${attr}"`, 'i'))
  return m ? m[1].trim() : ''
}

function extractOgProperty(html, prop) {
  const m = html.match(new RegExp(`<meta[^>]+property="og:${prop}"[^>]+content="([^"]*)"`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+property="og:${prop}"`, 'i'))
  return m ? m[1].trim() : ''
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/)
  return m ? m[1].trim() : ''
}

function extractCanonical(html) {
  const m = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/)
  return m ? m[1].trim() : ''
}

// ────────────────────────────────────────────────────────────
// Build page groups by slug (grouping KA/RU/EN versions)
// ────────────────────────────────────────────────────────────

function groupPagesBySlug() {
  const groups = {}
  for (const [id, page] of Object.entries(PAGE_MAP)) {
    if (page.path.includes('.html')) continue
    const slug = page.slug
    if (!groups[slug]) groups[slug] = {}
    groups[slug][page.lang] = { id, ...page }
  }
  return groups
}

// ────────────────────────────────────────────────────────────
// Extract page content by reading HTML
// ────────────────────────────────────────────────────────────

function getPageData(lang, slug) {
  const groups = groupPagesBySlug()
  const group = groups[slug]
  if (!group || !group[lang]) return null
  const page = group[lang]
  const html = readPage(page.file)
  return {
    title: extractTitle(html),
    description: extractMeta(html, 'description'),
    ogTitle: extractOgProperty(html, 'title'),
    ogDescription: extractOgProperty(html, 'description'),
    canonical: extractCanonical(html),
  }
}

// ────────────────────────────────────────────────────────────
// Build seed documents
// ────────────────────────────────────────────────────────────

// Service slugs (12 main services)
const SERVICE_SLUGS = [
  'polishing',
  'ceramiccoating',
  'ppf-shield-wrapping',
  'vinyl-wrapping',
  'interior-cleaning',
  'auto-glass-tinting',
  'windshield-repair',
  'car-soundproofing',
  'computer-diagnostics',
  'paintless-dent-repair',
  'carwash',
]

function buildServiceDocs() {
  return SERVICE_SLUGS.map((slug, i) => {
    const ka = getPageData('ka', slug)
    const ru = getPageData('ru', slug)
    const en = getPageData('en', slug)
    return {
      _id: `service-${slug}`,
      _type: 'service',
      slug: { _type: 'slug', current: slug },
      order: i + 1,
      nameKa: ka?.ogTitle || ka?.title?.split('—')[0]?.trim() || '',
      nameRu: ru?.ogTitle || ru?.title?.split('—')[0]?.trim() || '',
      nameEn: en?.ogTitle || en?.title?.split('—')[0]?.trim() || '',
      descriptionKa: ka?.ogDescription || '',
      descriptionRu: ru?.ogDescription || '',
      descriptionEn: en?.ogDescription || '',
      seoTitleKa: ka?.title || '',
      seoTitleRu: ru?.title || '',
      seoTitleEn: en?.title || '',
      seoDescriptionKa: ka?.description || '',
      seoDescriptionRu: ru?.description || '',
      seoDescriptionEn: en?.description || '',
      pricing: [],
      benefits: [],
      faq: [],
    }
  })
}

// Blog posts — slugs starting with "blog/" plus standalone articles
function buildBlogDocs() {
  const groups = groupPagesBySlug()
  const blogSlugs = Object.keys(groups).filter(
    s => s.startsWith('blog/') || ['how-to-choose-detailing-studio', 'summer-car-care-georgia', 'top-5-car-paint-protection'].includes(s)
  )

  return blogSlugs.map(slug => {
    const ka = getPageData('ka', slug)
    const ru = getPageData('ru', slug)
    const en = getPageData('en', slug)
    const isArticle = !slug.startsWith('blog/')
    const id = slug.replace(/\//g, '-')
    return {
      _id: `blogpost-${id}`,
      _type: 'blogPost',
      slug: { _type: 'slug', current: slug },
      category: isArticle ? 'article' : 'blog',
      titleKa: ka?.title || '',
      titleRu: ru?.title || '',
      titleEn: en?.title || '',
      seoTitleKa: ka?.title || '',
      seoTitleRu: ru?.title || '',
      seoTitleEn: en?.title || '',
      seoDescriptionKa: ka?.description || '',
      seoDescriptionRu: ru?.description || '',
      seoDescriptionEn: en?.description || '',
    }
  })
}

// Service subpages
function buildSubpageDocs() {
  const groups = groupPagesBySlug()
  return Object.entries(groups)
    .filter(([slug]) => {
      const parts = slug.split('/')
      return parts.length === 2 && SERVICE_SLUGS.includes(parts[0]) && !slug.startsWith('blog/')
    })
    .map(([slug]) => {
      const ka = getPageData('ka', slug)
      const ru = getPageData('ru', slug)
      const en = getPageData('en', slug)
      const parentSlug = slug.split('/')[0]
      const id = slug.replace(/\//g, '-')
      return {
        _id: `subpage-${id}`,
        _type: 'serviceSubpage',
        service: { _type: 'reference', _ref: `service-${parentSlug}` },
        slug: { _type: 'slug', current: slug },
        titleKa: ka?.title || '',
        titleRu: ru?.title || '',
        titleEn: en?.title || '',
        seoTitleKa: ka?.title || '',
        seoTitleRu: ru?.title || '',
        seoTitleEn: en?.title || '',
        seoDescriptionKa: ka?.description || '',
        seoDescriptionRu: ru?.description || '',
        seoDescriptionEn: en?.description || '',
      }
    })
}

// Site settings
function buildSiteSettings() {
  return {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'BESTAUTO',
    studios: [
      {
        _key: 'guramishvili',
        nameRu: 'Студия Гурамишвили 78',
        nameKa: 'სტუდია გურამიშვილი 78',
        nameEn: 'Guramishvili Studio',
        addressRu: 'пр. Гурамишвили 78, Тбилиси',
        addressKa: 'გ. გურამიშვილის გამზ. 78, თბილისი',
        addressEn: 'Guramishvili Ave 78, Tbilisi',
        phone: '+995550000299',
        whatsapp: 'https://wa.me/995550000299',
        hoursRu: 'пн–вс 09:00–20:00',
        hoursKa: 'ორ–კვ 09:00–20:00',
        hoursEn: 'Mon–Sun 09:00–20:00',
      },
      {
        _key: 'politkovskaya',
        nameRu: 'Студия Политковская 51',
        nameKa: 'სტუდია პოლიტკოვსკაია 51',
        nameEn: 'Politkovskaya Studio',
        addressRu: 'ул. Анна Политковская 51, Тбилиси',
        addressKa: 'ა. პოლიტკოვსკაიას ქ. 51, თბილისი',
        addressEn: 'Anna Politkovskaya St 51, Tbilisi',
        phone: '+995550000199',
        whatsapp: 'https://wa.me/995550000199',
        hoursRu: 'пн–вс 09:00–20:00',
        hoursKa: 'ორ–კვ 09:00–20:00',
        hoursEn: 'Mon–Sun 09:00–20:00',
      },
    ],
    ga4Id: 'G-C088QPT7KV',
    gtmId: 'G-C088QPT7KV',
  }
}

// ────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────

async function seed() {
  const docs = [
    buildSiteSettings(),
    ...buildServiceDocs(),
    ...buildBlogDocs(),
    ...buildSubpageDocs(),
  ]

  console.log(`\n📦 Prepared ${docs.length} documents:`)
  const counts = {}
  for (const d of docs) {
    counts[d._type] = (counts[d._type] || 0) + 1
  }
  for (const [type, count] of Object.entries(counts)) {
    console.log(`  ${type}: ${count}`)
  }

  if (isDryRun) {
    console.log('\n🔍 Dry run — not uploading. Set DRY_RUN=0 to upload.')
    console.log('\nFirst service doc sample:')
    const sample = docs.find(d => d._type === 'service')
    console.log(JSON.stringify(sample, null, 2))
    return
  }

  if (!process.env.SANITY_PROJECT_ID) {
    console.error('\n❌ SANITY_PROJECT_ID not set. Run with DRY_RUN=1 to test without uploading.')
    process.exit(1)
  }

  console.log(`\n🚀 Uploading to Sanity project ${process.env.SANITY_PROJECT_ID}...`)

  // Upload in batches of 20
  const BATCH = 20
  for (let i = 0; i < docs.length; i += BATCH) {
    const batch = docs.slice(i, i + BATCH)
    const transaction = client.transaction()
    for (const doc of batch) {
      transaction.createOrReplace(doc)
    }
    await transaction.commit()
    console.log(`  ✓ Uploaded docs ${i + 1}–${Math.min(i + BATCH, docs.length)}`)
  }

  console.log('\n✅ Seed complete!')
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
