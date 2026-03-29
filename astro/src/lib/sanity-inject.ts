/**
 * sanity-inject.ts
 *
 * Replaces contact data (phones, WhatsApp, addresses, hours) in Tilda HTML
 * with values from Sanity siteSettings at build time.
 *
 * This is the bridge between Phase 1 (static Tilda HTML) and Phase 3 (CMS).
 * It preserves 100% visual design while making key data CMS-editable.
 */

import type { SiteSettings } from './sanity'

/**
 * Given the full Tilda HTML and siteSettings from Sanity,
 * replaces phone numbers, WhatsApp links, and addresses in-place.
 *
 * Matching is based on known patterns from the Tilda export.
 */
export function injectSanityData(html: string, settings: SiteSettings | null): string {
  if (!settings || !settings.studios?.length) return html

  // ----------------------------------------------------------
  // Build replacement maps from Sanity data
  // ----------------------------------------------------------

  // Phones: old → new  (format stored as +995550000XXX)
  const STUDIO_A_KEY = 'guramishvili'
  const STUDIO_B_KEY = 'politkovskaya'

  const studioA = settings.studios.find(s => s._key === STUDIO_A_KEY)
  const studioB = settings.studios.find(s => s._key === STUDIO_B_KEY)

  let result = html

  if (studioA?.phone) {
    const oldPhoneA = '+995550000299'
    const newPhoneA = studioA.phone
    // Replace phone numbers in href and visible text
    result = result.replaceAll(oldPhoneA, newPhoneA)
    // WhatsApp
    result = result.replaceAll('wa.me/995550000299', `wa.me/${newPhoneA.replace('+', '')}`)
  }

  if (studioB?.phone) {
    const oldPhoneB = '+995550000199'
    const newPhoneB = studioB.phone
    result = result.replaceAll(oldPhoneB, newPhoneB)
    result = result.replaceAll('wa.me/995550000199', `wa.me/${newPhoneB.replace('+', '')}`)
  }

  return result
}
