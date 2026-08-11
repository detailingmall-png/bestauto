/**
 * Contract tests for the Meta CAPI forwarder (functions/api/capi.js).
 *
 * Run: npm run test:capi   (no dependencies — uses Node's built-in Request/Response)
 *
 * `fetch` is stubbed, so nothing reaches Meta and no real events are produced.
 * KV is stubbed with a Map, so the flood guard runs without Cloudflare.
 */
import { onRequestPost } from '../functions/api/capi.js';

let sent = [];
globalThis.fetch = async (url, init) => {
  sent.push({ url: String(url), body: JSON.parse(init.body) });
  return new Response(JSON.stringify({ events_received: 1, fbtrace_id: 'stub' }), { status: 200 });
};

const kvStore = new Map();
const kv = {
  get: async (k) => kvStore.get(k) ?? null,
  put: async (k, v) => { kvStore.set(k, v); },
};
const env = { FB_CAPI_TOKEN_PRIMARY: 't1', FB_CAPI_TOKEN_SECONDARY: 't2', LEADS_RATE_LIMIT: kv };

function req(headers, body) {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);
  return new Request('https://bestauto.ge/api/capi', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: payload,
  });
}
const GOOD = { event_name: 'PageView', event_id: 'abcd1234efgh', event_source_url: 'https://bestauto.ge/polishing' };
const SAME = { origin: 'https://bestauto.ge', 'cf-connecting-ip': '203.0.113.7' };

let pass = 0, fail = 0;
async function check(label, headers, body, expectStatus, expectError) {
  sent = [];
  const res = await onRequestPost({ request: req(headers, body), env });
  const json = await res.json();
  const okStatus = res.status === expectStatus;
  const okError = expectError === undefined || json.error === expectError;
  const acao = res.headers.get('access-control-allow-origin');
  if (okStatus && okError) { pass++; console.log(`  PASS  ${label} -> ${res.status} ${json.error ?? 'ok'} (ACAO ${acao})`); }
  else { fail++; console.log(`  FAIL  ${label} -> got ${res.status} ${JSON.stringify(json).slice(0,90)}, want ${expectStatus} ${expectError ?? ''}`); }
  return { res, json };
}

console.log('--- origin gate ---');
await check('no origin / referer / sec-fetch-site (curl)', {}, GOOD, 403, 'forbidden_origin');
await check('foreign origin', { origin: 'https://evil.example' }, GOOD, 403, 'forbidden_origin');
await check('prefix-lookalike origin', { origin: 'https://bestauto.ge.evil.example' }, GOOD, 403, 'forbidden_origin');
await check('valid origin', SAME, GOOD, 200);
await check('subdomain origin', { origin: 'https://www.bestauto.ge' }, GOOD, 200);
await check('no origin but sec-fetch-site', { 'sec-fetch-site': 'same-origin' }, GOOD, 200);
await check('no origin but own referer', { referer: 'https://bestauto.ge/polishing' }, GOOD, 200);
await check('no origin, foreign referer', { referer: 'https://evil.example/x' }, GOOD, 403, 'forbidden_origin');

console.log('--- body limits & validation ---');
await check('oversized body', SAME, JSON.stringify({ ...GOOD, custom_data: { pad: 'x'.repeat(9000) } }), 413, 'payload_too_large');
await check('malformed json', SAME, '{not json', 400, 'invalid_json');
await check('array body', SAME, [1, 2], 400, 'invalid_body');
await check('unknown event', SAME, { ...GOOD, event_name: 'Purchase' }, 400, 'invalid_event_name');
await check('short event_id', SAME, { ...GOOD, event_id: 'abc' }, 400, 'invalid_event_id');

console.log('--- event_source_url ---');
const a = await check('lookalike source url is replaced', SAME, { ...GOOD, event_source_url: 'https://bestauto.ge.evil.example/x' }, 200);
console.log('        forwarded source_url =', sent[0].body.data[0].event_source_url);
if (sent[0].body.data[0].event_source_url !== 'https://bestauto.ge/') { fail++; console.log('  FAIL  lookalike url leaked'); } else pass++;
await check('http (non-https) source url is replaced', SAME, { ...GOOD, event_source_url: 'http://bestauto.ge/x' }, 200);
console.log('        forwarded source_url =', sent[0].body.data[0].event_source_url);
if (sent[0].body.data[0].event_source_url !== 'https://bestauto.ge/') { fail++; console.log('  FAIL  http url leaked'); } else pass++;
await check('own url is kept', SAME, GOOD, 200);
console.log('        forwarded source_url =', sent[0].body.data[0].event_source_url);
if (sent[0].body.data[0].event_source_url !== 'https://bestauto.ge/polishing') { fail++; console.log('  FAIL  own url was rewritten'); } else pass++;

console.log('--- event_time clamp ---');
const now = Math.floor(Date.now() / 1000);
await check('ancient event_time', SAME, { ...GOOD, event_time: 1 }, 200);
let t = sent[0].body.data[0].event_time;
console.log(`        clamped to now-${now - t}s (limit 604800)`);
if (now - t > 7 * 24 * 3600) { fail++; console.log('  FAIL  not clamped'); } else pass++;
await check('far-future event_time', SAME, { ...GOOD, event_time: now + 99999999 }, 200);
t = sent[0].body.data[0].event_time;
console.log(`        clamped to now+${t - now}s (limit 300)`);
if (t - now > 300) { fail++; console.log('  FAIL  not clamped'); } else pass++;

console.log('--- conversion rate limit (PageView must stay unlimited) ---');
kvStore.clear();
let blockedAt = null;
for (let i = 1; i <= 15; i++) {
  const res = await onRequestPost({ request: req(SAME, { ...GOOD, event_name: 'Lead', event_id: `lead${i}0000` }), env });
  if (res.status === 429 && blockedAt === null) blockedAt = i;
}
console.log(`        Lead blocked starting at request #${blockedAt} (limit ${12})`);
if (blockedAt === 13) pass++; else { fail++; console.log('  FAIL  unexpected block point'); }
kvStore.clear();
let pvBlocked = 0;
for (let i = 0; i < 40; i++) {
  const res = await onRequestPost({ request: req(SAME, GOOD), env });
  if (res.status === 429) pvBlocked++;
}
console.log(`        PageView blocked ${pvBlocked}/40, KV keys written: ${kvStore.size}`);
if (pvBlocked === 0 && kvStore.size === 0) pass++; else { fail++; console.log('  FAIL  PageView consumed rate limit / KV writes'); }

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
