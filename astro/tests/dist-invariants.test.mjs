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

// Utility pages are generated without the full head pipeline.
const CONTENT_PAGES = pages.filter((p) => p.path !== '404.html');

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
    { pattern: /winter-windshield-care-cracks-prevention/, label: 'unpublished winter article' },
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
      if (!page.html.includes('id="prices"')) offenders.push(`${prefix}${slug} has no price block`);
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
