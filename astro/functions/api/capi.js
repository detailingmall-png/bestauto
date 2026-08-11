/**
 * Meta Conversions API forwarder.
 *
 * Browser sends event payload to /api/capi (same-origin POST).
 * This Cloudflare Pages Function enriches it with server-side data
 * (client IP, user agent) and forwards to Meta Graph API for BOTH
 * pixels in parallel using their respective access tokens.
 *
 * Dedup with browser-side Pixel: client supplies a UUID `event_id`,
 * also passed to fbq as `eventID`. Meta dedupes by (event_name, event_id).
 *
 * Environment variables (Cloudflare Pages -> Settings -> Environment variables):
 *   FB_CAPI_TOKEN_PRIMARY        — Secret. Token for pixel 2082195352165865
 *   FB_CAPI_TOKEN_SECONDARY      — Secret. Token for pixel 1250999350496996
 *   FB_TEST_EVENT_CODE_PRIMARY   — (optional) Plaintext. Shows events for the
 *                                  primary pixel in Events Manager Test Events tab
 *   FB_TEST_EVENT_CODE_SECONDARY — (optional) Plaintext. Same for the secondary pixel
 *   LEADS_RATE_LIMIT             — (optional) KV namespace, shared with lead.ts.
 *                                  Absent → the conversion flood guard is skipped.
 *
 * THREAT MODEL — read before "fixing" the checks below.
 *
 * This endpoint cannot authenticate its caller. The site is fully static and
 * edge-cached, so any token embedded in the page is public by construction, and
 * a browser cannot be distinguished from a script that copies its headers. The
 * checks here therefore raise the cost of casual abuse — they are not auth:
 *
 *   - same-origin signal (Origin / Sec-Fetch-Site / Referer) rejects plain
 *     `curl`-style posts that carry none of the three;
 *   - the event allowlist bounds which Meta events can ever be produced;
 *   - the body cap bounds how much work one request can cause;
 *   - event_time is clamped so replayed events cannot land outside Meta's window;
 *   - conversion-grade events (Lead, Contact, …) are rate limited per IP.
 *
 * PageView/ViewContent are deliberately NOT rate limited: they fire on every
 * page load, and a KV write per view would exhaust the KV write budget and add
 * latency to every visit. If pixel pollution is ever observed in practice, the
 * next real fix is to stop trusting the browser for conversion events and emit
 * them only from server-side handlers (lead.ts already does this for Lead).
 */

const FB_API_VERSION = 'v21.0';

const PIXELS = [
  { id: '2082195352165865', tokenEnv: 'FB_CAPI_TOKEN_PRIMARY',   testEnv: 'FB_TEST_EVENT_CODE_PRIMARY' },
  { id: '1250999350496996', tokenEnv: 'FB_CAPI_TOKEN_SECONDARY', testEnv: 'FB_TEST_EVENT_CODE_SECONDARY' }
];

const ALLOWED_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'Contact',
  'Lead',
  'InitiateCheckout',
  'FindLocation',
  'Search',
  'CompleteRegistration',
  'Schedule'
]);

const REQUEST_ORIGIN_RE = /^https:\/\/(?:[a-z0-9-]+\.)?bestauto\.ge$/i;

// Events worth spending a KV operation on. Low volume, high impact on ad
// optimisation if inflated.
const CONVERSION_EVENTS = new Set([
  'Lead',
  'Contact',
  'Schedule',
  'CompleteRegistration',
  'InitiateCheckout'
]);
const CONVERSION_LIMIT_MAX = 12;
const CONVERSION_LIMIT_WINDOW_SEC = 3600; // 1 hour

// A legitimate payload is a few hundred bytes; 8 KB leaves generous headroom.
// Checked against Content-Length (a client hint — it can be absent under chunked
// encoding) and then against the decoded text length, which counts UTF-16 code
// units rather than bytes, so Georgian/Cyrillic payloads get up to ~3x this in
// wire bytes. It is a coarse anti-abuse cap, not a precise byte limit, and the
// body is already buffered by the time the second check runs — Cloudflare's own
// request-size limit is the hard ceiling.
const MAX_BODY_BYTES = 8192;
const MAX_URL_LENGTH = 2048;
// Meta rejects events older than 7 days; allow a little clock skew forward.
const EVENT_TIME_MAX_AGE_SEC = 7 * 24 * 3600;
const EVENT_TIME_MAX_SKEW_SEC = 300;

/**
 * Best-effort same-origin check. Returns the validated origin (for CORS) or
 * null when the request carries no same-origin signal at all.
 *
 * `Origin` alone is not enough: it is absent on some same-origin POSTs, and the
 * previous version treated "absent" as "allowed", which let any script through.
 */
function validateRequestOrigin(request) {
  const origin = request.headers.get('origin') || '';
  if (origin) {
    return REQUEST_ORIGIN_RE.test(origin) ? origin : null;
  }
  if (request.headers.get('sec-fetch-site') === 'same-origin') {
    return 'https://bestauto.ge';
  }
  const referer = request.headers.get('referer') || '';
  if (!referer) return null;
  try {
    const refOrigin = new URL(referer).origin;
    return REQUEST_ORIGIN_RE.test(refOrigin) ? refOrigin : null;
  } catch (_) {
    return null;
  }
}

/**
 * Strict own-site URL check. `startsWith('https://bestauto.ge')` used to accept
 * `https://bestauto.ge.evil.example/...` because it never parsed the host.
 */
function isOwnSiteUrl(value) {
  if (typeof value !== 'string' || value.length > MAX_URL_LENGTH) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && REQUEST_ORIGIN_RE.test(parsed.origin);
  } catch (_) {
    return false;
  }
}

/**
 * Coarse per-IP flood guard for conversion events. Non-atomic get→put, same as
 * lead.ts: concurrent requests can slip past, which is acceptable for a guard
 * whose job is to stop volume, not to be exact. Fails open when KV is unbound.
 */
async function isConversionFlood(kv, ip) {
  if (!kv || !ip) return false;
  const key = `capi:${ip}`;
  try {
    const raw = await kv.get(key);
    const count = raw ? parseInt(raw, 10) : 0;
    if (count >= CONVERSION_LIMIT_MAX) return true;
    await kv.put(key, String(count + 1), {
      expirationTtl: CONVERSION_LIMIT_WINDOW_SEC
    });
    return false;
  } catch (e) {
    console.error(`[capi] rate limit check failed: ${String(e)}`);
    return false;
  }
}

// Business is Georgia-only — every event is attributed to country=ge.
// Pre-computed SHA-256 of "ge" (lowercase, no whitespace) per Meta AM spec.
const COUNTRY_GE_HASH =
  '309d20864f274b097f64106ec08fde76b42486d4e2f7165c7a9a233533dd8fc3';

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const allowedOrigin = validateRequestOrigin(request);
  if (!allowedOrigin) {
    return jsonResponse({ ok: false, error: 'forbidden_origin' }, 403);
  }

  // Cap the body before parsing. Content-Length is a hint only (it can be absent
  // or wrong), so the decoded text is checked too.
  const declaredLength = Number(request.headers.get('content-length') || '0');
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, error: 'payload_too_large' }, 413, allowedOrigin);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return jsonResponse({ ok: false, error: 'payload_too_large' }, 413, allowedOrigin);
    }
    body = JSON.parse(raw);
  } catch (e) {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400, allowedOrigin);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return jsonResponse({ ok: false, error: 'invalid_body' }, 400, allowedOrigin);
  }
  if (!ALLOWED_EVENTS.has(body.event_name)) {
    return jsonResponse({ ok: false, error: 'invalid_event_name' }, 400, allowedOrigin);
  }
  if (typeof body.event_id !== 'string' || body.event_id.length < 8 || body.event_id.length > 128) {
    return jsonResponse({ ok: false, error: 'invalid_event_id' }, 400, allowedOrigin);
  }

  // Only cf-connecting-ip. X-Forwarded-For is client-controlled, so using it as a
  // fallback would let a caller rotate the rate-limit key at will (or pin it to
  // someone else's address) and would feed a forged IP to Meta's matching.
  const clientIp = request.headers.get('cf-connecting-ip') || '';
  const userAgent = request.headers.get('user-agent') || '';

  if (
    CONVERSION_EVENTS.has(body.event_name) &&
    (await isConversionFlood(env.LEADS_RATE_LIMIT, clientIp))
  ) {
    console.error(`[capi] conversion flood blocked event=${body.event_name} ip=${clientIp}`);
    return jsonResponse({ ok: false, error: 'rate_limited' }, 429, allowedOrigin);
  }

  const userData = {
    client_ip_address: clientIp,
    client_user_agent: userAgent,
    country: COUNTRY_GE_HASH
  };
  if (typeof body.fbp === 'string' && body.fbp) userData.fbp = body.fbp;
  if (typeof body.fbc === 'string' && body.fbc) userData.fbc = body.fbc;
  if (typeof body.external_id === 'string' && body.external_id) {
    userData.external_id = await sha256Hex(body.external_id.toLowerCase().trim());
  }

  // Clamp to Meta's accepted window so a replayed or forged timestamp cannot
  // backdate an event (or park it in the future).
  const nowSec = Math.floor(Date.now() / 1000);
  const claimedTime =
    Number.isFinite(body.event_time) && body.event_time > 0
      ? Math.floor(body.event_time)
      : nowSec;
  const eventTime = Math.min(
    nowSec + EVENT_TIME_MAX_SKEW_SEC,
    Math.max(nowSec - EVENT_TIME_MAX_AGE_SEC, claimedTime)
  );

  const sourceUrl = isOwnSiteUrl(body.event_source_url)
    ? body.event_source_url
    : 'https://bestauto.ge/';

  const customData =
    body.custom_data && typeof body.custom_data === 'object' && !Array.isArray(body.custom_data)
      ? sanitizeCustomData(body.custom_data)
      : {};

  const fbEvent = {
    event_name: body.event_name,
    event_time: eventTime,
    event_id: body.event_id,
    event_source_url: sourceUrl,
    action_source: 'website',
    user_data: userData,
    custom_data: customData
  };

  const results = await Promise.all(
    PIXELS.map((pixel) => sendToPixel(pixel, fbEvent, env))
  );

  // Always return 200 so Cloudflare edge does not replace the body with a
  // generic 5xx error page — backend status is encoded in `ok` and `results`.
  const allOk = results.every((r) => r.ok);
  return jsonResponse({ ok: allOk, results }, 200, allowedOrigin);
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get('origin') || '';
  const allowed = REQUEST_ORIGIN_RE.test(origin) ? origin : 'https://bestauto.ge';
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowed,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}

async function sendToPixel(pixel, fbEvent, env) {
  const token = env[pixel.tokenEnv];
  if (!token) {
    return { pixel: pixel.id, ok: false, status: 0, error: 'missing_token' };
  }

  const payload = { data: [fbEvent] };
  const testCode = env[pixel.testEnv];
  if (testCode) {
    payload.test_event_code = testCode;
  }

  const url =
    'https://graph.facebook.com/' +
    FB_API_VERSION +
    '/' +
    pixel.id +
    '/events?access_token=' +
    encodeURIComponent(token);

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    let fbBody = null;
    try {
      fbBody = await resp.json();
    } catch (_) {
      // ignore body parse errors
    }
    return {
      pixel: pixel.id,
      ok: resp.ok,
      status: resp.status,
      events_received: fbBody && fbBody.events_received,
      fbtrace_id: fbBody && fbBody.fbtrace_id,
      error: fbBody && fbBody.error ? fbBody.error.message : undefined
    };
  } catch (e) {
    return { pixel: pixel.id, ok: false, status: 0, error: 'fetch_failed' };
  }
}

function sanitizeCustomData(input) {
  const out = {};
  let i = 0;
  for (const k in input) {
    if (!Object.prototype.hasOwnProperty.call(input, k)) continue;
    if (i++ >= 16) break;
    if (typeof k !== 'string' || k.length > 64) continue;
    const v = input[k];
    if (v === null || v === undefined) continue;
    if (typeof v === 'string') {
      out[k] = v.length > 256 ? v.slice(0, 256) : v;
    } else if (typeof v === 'number' && Number.isFinite(v)) {
      out[k] = v;
    } else if (typeof v === 'boolean') {
      out[k] = v;
    }
  }
  return out;
}

function jsonResponse(body, status, allowedOrigin) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      // Echo the validated origin so www./staging subdomains are not blocked by
      // CORS after the request has already been accepted.
      'Access-Control-Allow-Origin': allowedOrigin || 'https://bestauto.ge'
    }
  });
}
