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

export async function onRequestPost(context) {
  const { request, env } = context;

  const origin = request.headers.get('origin') || '';
  if (origin && !REQUEST_ORIGIN_RE.test(origin)) {
    return jsonResponse({ ok: false, error: 'forbidden_origin' }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
  }

  if (!body || typeof body !== 'object') {
    return jsonResponse({ ok: false, error: 'invalid_body' }, 400);
  }
  if (!ALLOWED_EVENTS.has(body.event_name)) {
    return jsonResponse({ ok: false, error: 'invalid_event_name' }, 400);
  }
  if (typeof body.event_id !== 'string' || body.event_id.length < 8 || body.event_id.length > 128) {
    return jsonResponse({ ok: false, error: 'invalid_event_id' }, 400);
  }

  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    '';
  const userAgent = request.headers.get('user-agent') || '';

  const userData = {
    client_ip_address: clientIp,
    client_user_agent: userAgent
  };
  if (typeof body.fbp === 'string' && body.fbp) userData.fbp = body.fbp;
  if (typeof body.fbc === 'string' && body.fbc) userData.fbc = body.fbc;

  const eventTime =
    Number.isFinite(body.event_time) && body.event_time > 0
      ? Math.floor(body.event_time)
      : Math.floor(Date.now() / 1000);

  const sourceUrl =
    typeof body.event_source_url === 'string' && body.event_source_url.startsWith('https://bestauto.ge')
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
  return jsonResponse({ ok: allOk, results }, 200);
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

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': 'https://bestauto.ge'
    }
  });
}
