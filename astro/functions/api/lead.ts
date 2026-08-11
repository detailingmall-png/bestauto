/**
 * Cloudflare Pages Function — lead form handler.
 *
 * Receives form submissions, validates them, sends a Telegram
 * notification to the studio group chat, and writes a backup
 * row to Google Sheets (via Apps Script webhook).
 *
 * Environment variables (set in Cloudflare Pages dashboard):
 *   TG_BOT_TOKEN_299    — Telegram bot token for Guramishvili group
 *   TG_CHAT_ID_299      — Telegram group chat ID for Guramishvili
 *   TG_THREAD_ID_299    — (optional) message_thread_id when Guramishvili group is a forum (topics enabled)
 *   TG_BOT_TOKEN_199    — Telegram bot token for Saburtalo group
 *   TG_CHAT_ID_199      — Telegram group chat ID for Saburtalo
 *   TG_THREAD_ID_199    — (optional) message_thread_id when Saburtalo group is a forum
 *   GOOGLE_SHEETS_WEBHOOK_URL — Google Apps Script doPost URL
 *
 * KV namespace binding (set in Pages > Settings > Functions):
 *   LEADS_RATE_LIMIT — Cloudflare KV namespace for rate limiting
 */

interface Env {
  TG_BOT_TOKEN_299: string;
  TG_CHAT_ID_299: string;
  TG_THREAD_ID_299?: string;
  TG_BOT_TOKEN_199: string;
  TG_CHAT_ID_199: string;
  TG_THREAD_ID_199?: string;
  GOOGLE_SHEETS_WEBHOOK_URL: string;
  LEADS_RATE_LIMIT: KVNamespace;
  FB_CAPI_TOKEN_PRIMARY?: string;
  FB_CAPI_TOKEN_SECONDARY?: string;
  FB_TEST_EVENT_CODE_PRIMARY?: string;
  FB_TEST_EVENT_CODE_SECONDARY?: string;
  GA4_MP_API_SECRET?: string;
}

const GA4_MEASUREMENT_ID = 'G-C088QPT7KV';

const FB_API_VERSION = 'v21.0';
const FB_PIXELS: ReadonlyArray<{
  id: string;
  tokenKey: keyof Env;
  testKey: keyof Env;
}> = [
  { id: '2082195352165865', tokenKey: 'FB_CAPI_TOKEN_PRIMARY',   testKey: 'FB_TEST_EVENT_CODE_PRIMARY' },
  { id: '1250999350496996', tokenKey: 'FB_CAPI_TOKEN_SECONDARY', testKey: 'FB_TEST_EVENT_CODE_SECONDARY' },
];

interface LeadPayload {
  studio: 'guramishvili' | 'saburtalo';
  service: string;
  phone: string;
  car?: string;
  lang?: string;
  page?: string;
  honeypot?: string;
}

const VALID_STUDIOS = ['guramishvili', 'saburtalo'] as const;
const PHONE_RE = /^\+\d{7,15}$/;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SEC = 3600; // 1 hour
// Cap the blocking Telegram call: the visitor waits on it, and a hung request
// must not delay the Sheets backup or the thank-you response.
const TELEGRAM_TIMEOUT_MS = 5000;
// Sheets runs in waitUntil (off the response path) so it can afford longer.
const SHEETS_TIMEOUT_MS = 10000;
// Coarse body cap. Compared against Content-Length (a client hint, so it can be
// absent or wrong) and then against the decoded text length, which counts UTF-16
// code units rather than bytes — for Georgian/Cyrillic text the effective byte
// ceiling is up to ~3x this. That is fine for an anti-abuse cap; it is not a
// precise byte limit, and the platform limit still applies above it.
const MAX_BODY_BYTES = 8192;

const STUDIO_LABELS: Record<string, string> = {
  guramishvili: 'Guramishvili',
  saburtalo: 'Saburtalo',
};

// ---------------------------------------------------------------------------
// Rate limiting via KV
// ---------------------------------------------------------------------------

async function isRateLimited(
  kv: KVNamespace | undefined,
  ip: string,
): Promise<boolean> {
  if (!kv) return false; // skip when KV not bound (local dev)

  // Fail open on a KV error. An unhandled throw here would 500 the handler and
  // lose a real lead — the opposite of what this endpoint is for. Under-throttling
  // during a KV outage is the cheaper failure.
  try {
    const key = `rl:${ip}`;
    const raw = await kv.get(key);
    const count = raw ? parseInt(raw, 10) : 0;

    if (count >= RATE_LIMIT_MAX) return true;

    await kv.put(key, String(count + 1), {
      expirationTtl: RATE_LIMIT_WINDOW_SEC,
    });
    return false;
  } catch (e) {
    console.error(`[lead] rate limit check failed, allowing request: ${String(e)}`);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Attribution — extract GA4 client_id / session_id / gclid for server-side
// form_submit (GA4 Measurement Protocol). Cookies may arrive either in the
// request `Cookie` header (browser-side call) or forwarded in the webhook body
// (Tilda "send cookies" option), so we look in both. Values are read-only.
// ---------------------------------------------------------------------------

const GA_STREAM_ID = 'C088QPT7KV'; // GA4 measurement id G-C088QPT7KV

interface Attribution {
  clientId?: string;
  sessionId?: string;
  gclid?: string;
  source: 'header' | 'body' | 'none';
}

function parseCookieBlob(blob: string): Record<string, string> {
  // Handles both "a=b; c=d" (header) and "a: b\n c: d" (Tilda email/webhook) forms.
  const out: Record<string, string> = {};
  for (const part of blob.split(/[;\n]/)) {
    const m = part.match(/^\s*([\w.-]+)\s*[:=]\s*(.+?)\s*$/);
    if (m && m[2] !== 'deleted') out[m[1]] = m[2];
  }
  return out;
}

function extractAttribution(request: Request, payload: LeadPayload): Attribution {
  const header = request.headers.get('cookie') || '';
  const bodyBlob =
    typeof (payload as unknown as Record<string, unknown>).cookies === 'string'
      ? ((payload as unknown as Record<string, unknown>).cookies as string)
      : '';

  let source: Attribution['source'] = 'none';
  let blob = '';
  if (header.includes('_ga') || header.includes('_gclid')) {
    blob = header;
    source = 'header';
  } else if (bodyBlob.includes('_ga') || bodyBlob.includes('_gclid')) {
    blob = bodyBlob;
    source = 'body';
  }

  const kv = parseCookieBlob(blob);

  let clientId: string | undefined;
  const ga = kv['_ga']; // GA1.1.<a>.<b>
  if (ga) {
    const p = ga.split('.');
    if (p.length >= 4) clientId = `${p[2]}.${p[3]}`;
  }

  let sessionId: string | undefined;
  const gaStream = kv[`_ga_${GA_STREAM_ID}`]; // GS2.1.s<sid>$...
  if (gaStream) {
    const m = gaStream.match(/(?:^|\.)s(\d+)/);
    if (m) sessionId = m[1];
  }

  return { clientId, sessionId, gclid: kv['_gclid'], source };
}

// ---------------------------------------------------------------------------
// GA4 Measurement Protocol — server-side `form_submit` conversion event.
// Fires for every valid lead, from the server, so it does not depend on the
// browser keeping the page open, ad-blockers, or deferred gtag loading. Reuses
// the visitor's GA4 client_id + session_id (from the _ga / _ga_<stream> cookies
// sent on the browser's same-origin fetch) so GA4 attributes it to the live
// session — and therefore to the Google Ads click (gclid) captured at session
// start. This is the event the Google Ads conversion imports.
// ---------------------------------------------------------------------------

async function sendGa4FormSubmit(
  env: Env,
  attribution: Attribution,
  lead: LeadPayload,
): Promise<void> {
  if (!env.GA4_MP_API_SECRET) {
    console.error('[lead] ga4 mp skipped: GA4_MP_API_SECRET not set');
    return;
  }

  // client_id is required by MP. Fall back to a synthetic id so the event still
  // lands (unattributed) if the _ga cookie somehow did not reach us.
  const clientId =
    attribution.clientId ||
    `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;

  const params: Record<string, unknown> = {
    engagement_time_msec: 1,
    studio: lead.studio,
    service: lead.service,
    lang: lead.lang || '',
    form_action: 'server',
  };
  if (attribution.sessionId) params.session_id = attribution.sessionId;
  if (attribution.gclid) params.gclid = attribution.gclid;

  const url =
    `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}` +
    `&api_secret=${encodeURIComponent(env.GA4_MP_API_SECRET)}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: [{ name: 'form_submit', params }],
      }),
    });
    console.log(
      `[lead] ga4 mp status=${res.status} cid=${attribution.clientId ? 'real' : 'fallback'} sid=${attribution.sessionId ? 'y' : 'n'} gclid=${attribution.gclid ? 'y' : 'n'}`,
    );
  } catch (e) {
    console.error(`[lead] ga4 mp fetch failed: ${String(e)}`);
  }
}

// ---------------------------------------------------------------------------
// Telegram Bot API — send message to group
// ---------------------------------------------------------------------------

async function sendTelegram(
  env: Env,
  lead: LeadPayload,
): Promise<{ ok: boolean; error?: string }> {
  const botToken =
    lead.studio === 'guramishvili'
      ? env.TG_BOT_TOKEN_299
      : env.TG_BOT_TOKEN_199;
  const chatId =
    lead.studio === 'guramishvili'
      ? env.TG_CHAT_ID_299
      : env.TG_CHAT_ID_199;
  const threadIdRaw =
    lead.studio === 'guramishvili'
      ? env.TG_THREAD_ID_299
      : env.TG_THREAD_ID_199;

  if (!botToken || !chatId) {
    return { ok: false, error: 'Telegram not configured' };
  }

  const threadId =
    typeof threadIdRaw === 'string' && /^\d+$/.test(threadIdRaw.trim())
      ? parseInt(threadIdRaw.trim(), 10)
      : undefined;

  const studioName = STUDIO_LABELS[lead.studio] || lead.studio;
  const lines = [
    `\u{1F514} *\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 \u0441 \u0441\u0430\u0439\u0442\u0430\\!*`,
    ``,
    `*\u0421\u0442\u0443\u0434\u0438\u044F:* ${escapeMarkdown(studioName)}`,
    `*\u0423\u0441\u043B\u0443\u0433\u0430:* ${escapeMarkdown(lead.service)}`,
    `*\u0422\u0435\u043B\u0435\u0444\u043E\u043D:* ${escapeMarkdown(lead.phone)}`,
  ];
  if (lead.car) lines.push(`*\u0410\u0432\u0442\u043E:* ${escapeMarkdown(lead.car)}`);
  if (lead.lang) lines.push(`*\u042F\u0437\u044B\u043A:* ${escapeMarkdown(lead.lang)}`);

  const message = lines.join('\n');
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text: message,
    parse_mode: 'MarkdownV2',
  };
  if (threadId !== undefined) body.message_thread_id = threadId;

  console.log(`[lead] tg send studio=${lead.studio} chat=${chatId} thread=${threadId ?? 'none'}`);

  // Never throw: the caller awaits this before registering the Google Sheets
  // backup, so an unhandled network error here used to drop the lead entirely
  // (no Sheets row, no Meta CAPI, no GA4 — the visitor got a 500). A network
  // failure or timeout must degrade to { ok: false } so the backup still runs.
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });
  } catch (e) {
    console.error(`[lead] tg fetch failed studio=${lead.studio}: ${String(e)}`);
    return { ok: false, error: `Telegram unreachable: ${String(e)}` };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '<unreadable body>');
    console.error(`[lead] tg fail studio=${lead.studio} status=${res.status} body=${text}`);
    return { ok: false, error: `Telegram ${res.status}: ${text}` };
  }

  console.log(`[lead] tg ok studio=${lead.studio}`);
  return { ok: true };
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

// ---------------------------------------------------------------------------
// Google Sheets backup — via Apps Script webhook
// ---------------------------------------------------------------------------

async function writeToSheets(
  env: Env,
  lead: LeadPayload,
  tgStatus: string,
): Promise<void> {
  if (!env.GOOGLE_SHEETS_WEBHOOK_URL) return;

  const row = {
    timestamp: new Date().toISOString(),
    studio: lead.studio,
    service: lead.service,
    phone: lead.phone,
    car: lead.car || '',
    lang: lead.lang || 'ru',
    page: lead.page || '',
    wa_status: tgStatus,
  };

  // Best-effort: never fail the request. But this is the lead's backup store, so
  // a failure here means the lead may exist nowhere — always log it loudly.
  try {
    const res = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(SHEETS_TIMEOUT_MS),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '<unreadable body>');
      console.error(
        `[lead] SHEETS BACKUP FAILED studio=${lead.studio} phone=${lead.phone} status=${res.status} body=${text}`,
      );
      return;
    }
    console.log(`[lead] sheets ok studio=${lead.studio} tg=${tgStatus}`);
  } catch (e) {
    console.error(
      `[lead] SHEETS BACKUP FAILED studio=${lead.studio} phone=${lead.phone} error=${String(e)}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Meta Conversions API — server-side Lead with Advanced Matching (phone hash)
// ---------------------------------------------------------------------------

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

interface CapiPixelResult {
  pixel: string;
  ok: boolean;
  status: number;
  events_received?: number;
  fbtrace_id?: string;
  error?: string;
}

async function sendOnePixel(
  pixelId: string,
  token: string,
  event: Record<string, unknown>,
  testEventCode: string | undefined,
): Promise<CapiPixelResult> {
  const payload: Record<string, unknown> = { data: [event] };
  if (testEventCode) payload.test_event_code = testEventCode;
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let body: { events_received?: number; fbtrace_id?: string; error?: { message?: string } } | null = null;
    try {
      body = await resp.json();
    } catch {
      // ignore parse errors
    }
    return {
      pixel: pixelId,
      ok: resp.ok,
      status: resp.status,
      events_received: body?.events_received,
      fbtrace_id: body?.fbtrace_id,
      error: body?.error?.message,
    };
  } catch {
    return { pixel: pixelId, ok: false, status: 0, error: 'fetch_failed' };
  }
}

async function sendLeadCAPI(
  env: Env,
  request: Request,
  lead: LeadPayload,
): Promise<CapiPixelResult[]> {
  // Phone normalised to E.164 digits-only (no '+'), lowercase, then SHA-256.
  const phoneDigits = lead.phone.replace(/\D/g, '');
  const phoneHash = await sha256Hex(phoneDigits);

  // Only cf-connecting-ip — X-Forwarded-For is client-controlled and would let a
  // caller feed Meta's advanced matching a forged address.
  const ip = request.headers.get('cf-connecting-ip') || '';
  const ua = request.headers.get('user-agent') || '';
  const cookies = parseCookies(request.headers.get('cookie'));

  const userData: Record<string, string> = {
    ph: phoneHash,
    client_ip_address: ip,
    client_user_agent: ua,
    // Business is Georgia-only — pre-hashed sha256("ge") per Meta AM spec.
    country: '309d20864f274b097f64106ec08fde76b42486d4e2f7165c7a9a233533dd8fc3',
  };
  if (cookies._fbp) userData.fbp = cookies._fbp;
  if (cookies._fbc) userData.fbc = cookies._fbc;
  if (cookies.ba_ext_id) {
    userData.external_id = await sha256Hex(cookies.ba_ext_id.toLowerCase().trim());
  }

  const event = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: crypto.randomUUID(),
    event_source_url:
      typeof lead.page === 'string' && lead.page.startsWith('https://bestauto.ge')
        ? lead.page
        : 'https://bestauto.ge/',
    action_source: 'website',
    user_data: userData,
    custom_data: {
      studio: lead.studio,
      service: lead.service,
      lang: lead.lang || '',
    },
  };

  const results = await Promise.all(
    FB_PIXELS.map(async (p): Promise<CapiPixelResult> => {
      const token = env[p.tokenKey];
      if (typeof token !== 'string' || !token) {
        return { pixel: p.id, ok: false, status: 0, error: 'missing_token' };
      }
      const testCode = env[p.testKey];
      const testCodeStr = typeof testCode === 'string' && testCode ? testCode : undefined;
      return sendOnePixel(p.id, token, event, testCodeStr);
    }),
  );
  return results;
}

// ---------------------------------------------------------------------------
// Request handler
// ---------------------------------------------------------------------------

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // --- Parse body (capped: a real lead is a few hundred bytes) ---
  let payload: LeadPayload;
  try {
    const declaredLength = Number(request.headers.get('content-length') || '0');
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return jsonResponse(413, { ok: false, error: 'Payload too large' });
    }
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return jsonResponse(413, { ok: false, error: 'Payload too large' });
    }
    payload = JSON.parse(raw);
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON' });
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON' });
  }

  // --- Honeypot ---
  if (payload.honeypot) {
    // Silently accept to not reveal the trap
    return jsonResponse(200, { ok: true });
  }

  // --- Validate ---
  if (
    !payload.studio ||
    !VALID_STUDIOS.includes(payload.studio as (typeof VALID_STUDIOS)[number])
  ) {
    return jsonResponse(400, { ok: false, error: 'Invalid studio' });
  }
  if (!payload.service || typeof payload.service !== 'string') {
    return jsonResponse(400, { ok: false, error: 'Service required' });
  }
  const phone = (payload.phone || '').replace(/[\s\-()]/g, '');
  if (!PHONE_RE.test(phone)) {
    return jsonResponse(400, { ok: false, error: 'Invalid phone' });
  }
  payload.phone = phone;

  // --- Rate limit ---
  const ip = request.headers.get('cf-connecting-ip') || '0.0.0.0';
  if (await isRateLimited(env.LEADS_RATE_LIMIT, ip)) {
    return jsonResponse(429, { ok: false, error: 'Too many requests' });
  }

  // --- Attribution for the server-side GA4 form_submit event ---
  const attribution = extractAttribution(request, payload);
  console.log(
    `[lead] attribution src=${attribution.source} cid=${attribution.clientId ? 'yes' : 'no'} sid=${attribution.sessionId ? 'yes' : 'no'} gclid=${attribution.gclid ? 'yes' : 'no'}`,
  );

  // --- Notify Telegram, then back up to Sheets ---
  // Not parallel: the Sheets row records Telegram's outcome in its wa_status
  // column, so it is chained onto the Telegram promise.
  // The Sheets backup is handed to the runtime BEFORE we await Telegram, so the
  // lead is persisted even if anything on the response path fails afterwards.
  // The extra .catch keeps that guarantee structural rather than relying on
  // sendTelegram never rejecting.
  const tgPromise = sendTelegram(env, payload).catch((e) => ({
    ok: false,
    error: `Telegram threw: ${String(e)}`,
  }));
  context.waitUntil(
    tgPromise.then((r) =>
      writeToSheets(env, payload, r.ok ? 'delivered' : r.error || 'failed'),
    ),
  );
  // Still awaited so the notification is attempted before we answer the visitor;
  // the result itself is already logged inside sendTelegram().
  await tgPromise;
  // Fire-and-forget Meta CAPI Lead with Advanced Matching (phone hash + IP/UA + fbp/fbc).
  // Runs server-side after the response is sent so user latency is not affected.
  context.waitUntil(sendLeadCAPI(env, request, payload));
  // Fire-and-forget GA4 form_submit conversion (server-side, attributed via the
  // visitor's GA4 client_id/session_id + gclid). This is what the Google Ads
  // conversion imports — so it fires reliably for every real lead.
  context.waitUntil(sendGa4FormSubmit(env, attribution, payload));

  // Even if Telegram fails or is unreachable, the lead is captured in Sheets
  // (registered above, before this path could fail) — return ok to the user.
  return jsonResponse(200, { ok: true });
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function jsonResponse(
  status: number,
  body: Record<string, unknown>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://bestauto.ge',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://bestauto.ge',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};
