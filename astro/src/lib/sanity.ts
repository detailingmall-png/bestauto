import { createClient } from '@sanity/client'

// ──────────────────────────────────────────────
// Sanity client — used at build time for GROQ queries
// ──────────────────────────────────────────────

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
})

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface Studio {
  _key: string
  nameKa: string
  nameRu: string
  nameEn: string
  addressKa: string
  addressRu: string
  addressEn: string
  phone: string
  whatsapp: string
  hoursKa: string
  hoursRu: string
  hoursEn: string
  mapsUrl?: string
}

export interface SiteSettings {
  siteName: string
  studios: Studio[]
  ga4Id?: string
  gtmId?: string
  facebookUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
}

export interface ServicePreview {
  _id: string
  slug: { current: string }
  order: number
  nameKa: string
  nameRu: string
  nameEn: string
  descriptionKa?: string
  descriptionRu?: string
  descriptionEn?: string
}

export interface HomepageService {
  _id: string
  slug: { current: string }
  order: number
  nameKa: string
  nameRu: string
  nameEn: string
  homepageTaglineKa?: string
  homepageTaglineRu?: string
  homepageTaglineEn?: string
  homepageTier: number
  homepageImage?: {
    asset: { _ref: string; url: string }
  }
}

export interface PriceItem {
  _key: string
  nameKa: string
  nameRu: string
  nameEn: string
  price: string
  isPromo?: boolean
}

export interface Service extends ServicePreview {
  pricing: PriceItem[]
  seoTitleKa?: string
  seoTitleRu?: string
  seoTitleEn?: string
  seoDescriptionKa?: string
  seoDescriptionRu?: string
  seoDescriptionEn?: string
}

export interface BlogPost {
  _id: string
  slug: { current: string }
  category: 'blog' | 'article'
  titleKa?: string
  titleRu?: string
  titleEn?: string
  publishedAt?: string
  seoTitleKa?: string
  seoTitleRu?: string
  seoTitleEn?: string
  seoDescriptionKa?: string
  seoDescriptionRu?: string
  seoDescriptionEn?: string
}

// ──────────────────────────────────────────────
// GROQ queries
// ──────────────────────────────────────────────

/** Fetch site settings (phone numbers, addresses, studio hours) */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return null
  return sanityClient.fetch<SiteSettings>(
    `*[_type == "siteSettings" && _id == "siteSettings"][0]{
      siteName,
      studios[]{
        _key, nameKa, nameRu, nameEn,
        addressKa, addressRu, addressEn,
        phone, whatsapp, mapsUrl,
        hoursKa, hoursRu, hoursEn
      },
      ga4Id, gtmId,
      facebookUrl, instagramUrl, youtubeUrl
    }`
  )
}

/** Fetch all services ordered by menu position */
export async function getServices(): Promise<ServicePreview[]> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return []
  return sanityClient.fetch<ServicePreview[]>(
    `*[_type == "service"] | order(order asc) {
      _id,
      slug, order,
      nameKa, nameRu, nameEn,
      descriptionKa, descriptionRu, descriptionEn
    }`
  )
}

/** Fetch services marked for homepage display */
export async function getHomepageServices(): Promise<HomepageService[]> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return []
  return sanityClient.fetch<HomepageService[]>(
    `*[_type == "service" && showOnHomepage == true] | order(homepageTier asc, order asc) {
      _id, slug, order,
      nameKa, nameRu, nameEn,
      homepageTaglineKa, homepageTaglineRu, homepageTaglineEn,
      homepageTier,
      "homepageImage": homepageImage{
        asset->{ _ref, url }
      }
    }`
  )
}

/** Fetch a single service with pricing by slug */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return null
  return sanityClient.fetch<Service>(
    `*[_type == "service" && slug.current == $slug][0]{
      _id, slug, order,
      nameKa, nameRu, nameEn,
      descriptionKa, descriptionRu, descriptionEn,
      pricing[]{ _key, nameKa, nameRu, nameEn, price, isPromo },
      seoTitleKa, seoTitleRu, seoTitleEn,
      seoDescriptionKa, seoDescriptionRu, seoDescriptionEn
    }`,
    { slug }
  )
}

// ──────────────────────────────────────────────
// Pricing page types
// ──────────────────────────────────────────────

export interface PriceLineItem {
  _key: string
  nameRu: string
  nameKa: string
  nameEn: string
  price: string
  isPromo?: boolean
}

export interface PriceSection {
  _key: string
  titleRu: string
  titleKa: string
  titleEn: string
  items: PriceLineItem[]
}

export interface PricingPage {
  titleRu: string
  titleKa: string
  titleEn: string
  sections: PriceSection[]
}

/** Fetch full pricing page with all sections and line items */
export async function getPricingPage(): Promise<PricingPage | null> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return null
  return sanityClient.fetch<PricingPage>(
    `*[_type == "pricingPage" && _id == "pricingPage"][0]{
      titleRu, titleKa, titleEn,
      sections[]{
        _key, titleRu, titleKa, titleEn,
        items[]{ _key, nameRu, nameKa, nameEn, price, isPromo }
      }
    }`
  )
}

/** Fetch all blog posts for the index page */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) return []
  return sanityClient.fetch<BlogPost[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, slug, category,
      titleKa, titleRu, titleEn,
      publishedAt
    }`
  )
}
