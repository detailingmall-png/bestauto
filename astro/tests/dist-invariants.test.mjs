/**
 * Invariants over the built site. Run after `npm run build`:
 *
 *   node --test tests/dist-invariants.test.mjs
 *   DIST_DIR=/path/to/dist node --test tests/dist-invariants.test.mjs
 *
 * These are the cheap, high-value checks the HTML pipeline has no other way to
 * make: it is hundreds of string and regex transformations over Tilda exports,
 * and a broken one usually produces valid-looking HTML rather than a build error.
 *
 * Every assertion here exists because something actually shipped or nearly
 * shipped broken:
 *
 *  - `<title>` / description presence: a regex meant to escape quotes in
 *    `og:description` matched from the wrong `<meta content="` and swallowed
 *    everything up to it, mangling 261 of 484 pages and destroying `<title>` on
 *    259 of them. The build stayed green.
 *  - unescaped quote in a meta value: a quote typed into a Tilda description
 *    terminated the attribute early, so Google indexed an empty description.
 *  - `_lz` id uniqueness: both deferred-analytics blocks numbered from `_lz0`,
 *    so one loader re-ran the other block's script — a second Facebook PageView
 *    on every page load.
 *  - Tilda helpers on hand-built pages: the location pages reuse the Tilda nav
 *    and footer markup but ship no Tilda <head>, so `t_onReady`, `t_throttle`,
 *    `t_onFuncLoad` and the `t_menu__*` family were undefined there — six pages
 *    throwing ReferenceError with no mobile menu, for months.
 *  - a second Google tag loader: Tilda put the GA4 measurement ID into the GTM
 *    bootstrap template, so every page pulled `gtm.js` next to the `gtag/js`
 *    snippet that already configured the same ID. Harmless until Google's
 *    2026-10-02 change makes `gtm.js` initialise the tag on load — i.e. a second
 *    page_view per visit.
 *  - dead internal links: three articles linked to a service slug that does not
 *    exist and three to an unpublished article; all six returned 404 in
 *    production for months.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = process.env.DIST_DIR || 'dist';

if (!existsSync(DIST)) {
  throw new Error(`${DIST} not found — run \`npm run build\` first (or set DIST_DIR).`);
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return full.endsWith('.html') ? [full] : [];
  });
}

const pages = htmlFiles(DIST).map((path) => ({
  path: path.slice(DIST.length + 1),
  html: readFileSync(path, 'utf8'),
}));

/**
 * Indexable pages only — the SEO assertions below apply to what Google sees.
 *
 * Excluded:
 *  - documents with no `<html>` element: raw Tilda export fragments copied into
 *    public/files/, not pages;
 *  - anything marked `noindex` (404, the /review funnel, the /qr chooser), which
 *    intentionally ships without full head markup.
 *
 * There is no allowlist of named exceptions on purpose: a page either declares
 * itself non-indexable or it has to satisfy these assertions. qr.html used to be
 * listed here because it has no meta description — it is now noindex instead, so
 * if that tag is ever lost the page re-enters this set and the suite fails.
 */
const CONTENT_PAGES = pages.filter(
  (p) =>
    /<html[\s>]/i.test(p.html) &&
    !/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(p.html),
);

const DESCRIPTION_RE =
  /<meta\s+(?:name="description"\s+content="([\s\S]*?)"\s*\/?>|content="([^<]*?)"\s+name="description"\s*\/?>)/i;

test('every content page has a non-empty <title>', () => {
  const offenders = CONTENT_PAGES.filter((p) => {
    const match = p.html.match(/<title>([\s\S]*?)<\/title>/i);
    return !match || match[1].trim() === '';
  }).map((p) => p.path);
  assert.deepEqual(offenders, [], `pages without a usable <title>: ${offenders.length}`);
});

test('no meta attribute delimiter was escaped into &quot;', () => {
  // `content=&quot;` means an escape pass ate the attribute's own opening quote,
  // i.e. a replacement spanned across tags.
  const offenders = CONTENT_PAGES.filter((p) => /content=&quot;/.test(p.html)).map((p) => p.path);
  assert.deepEqual(offenders, [], `pages with a mangled attribute delimiter: ${offenders.length}`);
});

test('every content page has a parseable meta description', () => {
  const offenders = CONTENT_PAGES.filter((p) => !DESCRIPTION_RE.test(p.html)).map((p) => p.path);
  assert.deepEqual(offenders, [], `pages without a parseable description: ${offenders.length}`);
});

test('no meta value contains a raw quote that would truncate it', () => {
  const offenders = [];
  for (const p of CONTENT_PAGES) {
    const match = p.html.match(DESCRIPTION_RE);
    const value = match && (match[1] ?? match[2]);
    if (value && value.includes('"')) offenders.push(p.path);
  }
  assert.deepEqual(offenders, [], `pages with a truncating quote: ${offenders.length}`);
});

test('deferred-analytics ids are unique and every loader reference resolves', () => {
  const duplicated = [];
  const dangling = [];
  for (const p of CONTENT_PAGES) {
    const counts = new Map();
    for (const m of p.html.matchAll(/<script[^>]*id="(_lz[^"]*)"/g)) {
      counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
    }
    for (const [id, n] of counts) if (n > 1) duplicated.push(`${p.path}#${id}`);
    for (const arr of p.html.matchAll(/\[((?:"_lz[^"]*",?)+)\]/g)) {
      for (const ref of arr[1].matchAll(/"(_lz[^"]*)"/g)) {
        if (counts.get(ref[1]) !== 1) dangling.push(`${p.path}#${ref[1]}`);
      }
    }
  }
  assert.deepEqual(duplicated, [], 'duplicate _lz ids');
  assert.deepEqual(dangling, [], 'loader references to a missing or duplicated id');
});

test('the Facebook Pixel fires exactly one PageView per page', () => {
  const offenders = [];
  for (const p of CONTENT_PAGES) {
    const n = (p.html.match(/fbq\(\s*'track'\s*,\s*'PageView'\s*\)/g) ?? []).length;
    if (n > 1) offenders.push(`${p.path} (${n})`);
  }
  assert.deepEqual(offenders, [], 'pages firing PageView more than once');
});

test('no internal link points at a known-dead target', () => {
  const DEAD = [
    { pattern: /href="\/(?:ru\/|en\/)?ceramic"/, label: '/ceramic (slug is ceramiccoating)' },
  ];
  const offenders = [];
  for (const p of CONTENT_PAGES) {
    for (const { pattern, label } of DEAD) {
      if (pattern.test(p.html)) offenders.push(`${p.path} -> ${label}`);
    }
  }
  assert.deepEqual(offenders, [], 'links to dead targets');
});

test('every live service page gets its price block and one FAQ block', () => {
  const SERVICES = [
    'polishing', 'ceramiccoating', 'ppf-shield-wrapping', 'vinyl-wrapping',
    'interior-cleaning', 'interior-restoration', 'paintless-dent-repair',
    'auto-glass-tinting', 'windshield-repair', 'car-soundproofing',
    'computer-diagnostics',
  ];
  const offenders = [];
  for (const slug of SERVICES) {
    for (const prefix of ['', 'ru/', 'en/']) {
      const page = pages.find((p) => p.path === `${prefix}${slug}.html`);
      if (!page) {
        offenders.push(`${prefix}${slug} missing from build`);
        continue;
      }
      // Assert on rendered price rows, not on the `id="prices"` anchor: the KA
      // PPF page deliberately drops that anchor (it attaches to the wrong block
      // there — see the exception in [...slug].astro) while keeping the prices.
      const priceRows = (page.html.match(/<div class="ba-price-row/g) ?? []).length;
      if (priceRows === 0) offenders.push(`${prefix}${slug} has no price rows`);
      const faqCount = page.html.split(`id="${slug}-faq"`).length - 1;
      if (faqCount !== 1) offenders.push(`${prefix}${slug} has ${faqCount} FAQ blocks`);
    }
  }
  assert.deepEqual(offenders, [], 'service pages missing prices or FAQ');
});

test('location pages link to every live service', () => {
  const locations = pages.filter((p) => p.path.includes('locations/'));
  assert.ok(locations.length > 0, 'no location pages in build');
  const offenders = locations
    .map((p) => ({ path: p.path, n: (p.html.match(/ba-loc-svc"/g) ?? []).length }))
    .filter((x) => x.n !== 12)
    .map((x) => `${x.path} (${x.n} links, expected 12)`);
  assert.deepEqual(offenders, [], 'location pages with an incomplete service list');
});

test('the Google tag ships one loader, and it is gtag/js', () => {
  // `gtm.js` (and its ns.html <noscript> twin) is the legacy loader Tilda
  // emitted. It duplicates the gtag/js snippet in the body and, from
  // 2026-10-02, would fire its own page_view. Checked over every built
  // document, fragments included — the exports carry the snippet too.
  const legacy = pages
    .filter((p) => /gtm\.start|googletagmanager\.com\/(?:gtm\.js|ns\.html)/.test(p.html))
    .map((p) => p.path);
  assert.deepEqual(legacy, [], `pages still loading the GTM container: ${legacy.length}`);
});

test('every indexable page loads the Google tag exactly once', () => {
  // Both directions at once: stripping the legacy loader must not take the real
  // snippet with it, and no page may go untagged. The location pages used to:
  // hand-built, no Tilda body, so tracking.js sat there waiting for a `gtag`
  // that never arrived and dropped every phone/WhatsApp click.
  const offenders = [];
  for (const p of CONTENT_PAGES) {
    const loaders = (p.html.match(/googletagmanager\.com\/gtag\/js\?id=G-C088QPT7KV/g) ?? []).length;
    const configs = (p.html.match(/gtag\(\s*'config'\s*,\s*'G-C088QPT7KV'\s*\)/g) ?? []).length;
    if (loaders !== 1 || configs !== 1) {
      offenders.push(`${p.path} (${loaders} loaders, ${configs} config calls)`);
    }
  }
  assert.deepEqual(offenders, [], 'pages not carrying exactly one Google tag');
});

test('every Tilda helper a page calls is defined on that page', () => {
  // Calls come from the shared nav/footer markup; definitions come either from
  // an inline <script> or from a /js file the page actually loads. Reading the
  // referenced files keeps this honest instead of hardcoding a name list.
  const defsCache = new Map();
  const defsIn = (source) =>
    new Set([
      ...[...source.matchAll(/function\s+(t_[A-Za-z0-9_]+)/g)].map((m) => m[1]),
      ...[...source.matchAll(/window\.(t_[A-Za-z0-9_]+)\s*=/g)].map((m) => m[1]),
    ]);
  const defsOfScript = (webPath) => {
    if (!defsCache.has(webPath)) {
      const file = join('public', webPath.replace(/^\//, ''));
      defsCache.set(webPath, existsSync(file) ? defsIn(readFileSync(file, 'utf8')) : new Set());
    }
    return defsCache.get(webPath);
  };

  const offenders = [];
  for (const p of CONTENT_PAGES) {
    const called = new Set([...p.html.matchAll(/\b(t_[A-Za-z0-9_]+)\s*\(/g)].map((m) => m[1]));
    const defined = defsIn(p.html);
    for (const webPath of new Set(p.html.match(/\/js\/[A-Za-z0-9._-]+\.js/g) ?? [])) {
      for (const name of defsOfScript(webPath)) defined.add(name);
    }
    const missing = [...called].filter((name) => !defined.has(name)).sort();
    if (missing.length) offenders.push(`${p.path} -> ${missing.join(', ')}`);
  }
  assert.deepEqual(offenders, [], 'pages calling an undefined Tilda helper');
});
