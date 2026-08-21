/**
 * The Google tag (GA4) for pages this repo builds itself.
 *
 * Pages migrated from Tilda carry the tag inside their exported HTML, so they
 * need nothing from here. Hand-built pages — the location pages — have no
 * Tilda body, which left them as the only indexable pages on the site with no
 * analytics at all: /js/tracking.js shipped there, waited for a `gtag` that
 * was never defined, and dropped every phone/WhatsApp/CTA click.
 *
 * Loading matches the migrated pages: the config call runs inline (so
 * tracking.js finds `gtag` immediately and queues into dataLayer), while the
 * library itself is interaction-gated — first scroll/click/touch/keydown, or a
 * 20s fallback. Lighthouse never interacts, so this costs no TBT.
 */
import { interactionGate } from './html-extractor';

export const GA_MEASUREMENT_ID = 'G-C088QPT7KV';

/** Fallback for visitors who never interact. Matches delayAnalytics(). */
const GATE_FALLBACK_MS = 20000;

export function googleTagSnippet(): string {
  const config =
    `<script>window.dataLayer=window.dataLayer||[];` +
    `function gtag(){dataLayer.push(arguments)}` +
    `gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');</script>`;

  const load =
    `var s=document.createElement('script');s.async=true;` +
    `s.src='https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';` +
    `document.head.appendChild(s);`;

  return `${config}<script>${interactionGate(load, GATE_FALLBACK_MS)}</script>`;
}
