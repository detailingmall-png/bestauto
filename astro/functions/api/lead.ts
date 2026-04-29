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
 *   TG_BOT_TOKEN_199    — Telegram bot token for Saburtalo group
 *   TG_CHAT_ID_199      — Telegram group chat ID for Saburtalo
 *   GOOGLE_SHEETS_WEBHOOK_URL — Google Apps Script doPost URL
 *
 * KV namespace binding (set in Pages > Settings > Functions):
 *   LEADS_RATE_LIMIT — Cloudflare KV namespace for rate limiting
 */

interface Env {
  TG_BOT_TOKEN_299: string;
  TG_CHAT_ID_299: string;
  TG_BOT_TOKEN_199: string;
  TG_CHAT_ID_199: string;
  GOOGLE_SHEETS_WEBHOOK_URL: string;
  LEADS_RATE_LIMIT: KVNamespace;
  FB_CAPI_TOKEN_PRIMARY?: string;
  FB_CAPI_TOKEN_SECONDARY?: string;
  FB_TEST_EVENT_CODE_PRIMARY?: string;
  FB_TEST_EVENT_CODE_SECONDARY?: string;
}

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

  const key = `rl:${ip}`;
  const raw = await kv.get(key);
  const count = raw ? parseInt(raw, 10) : 0;

  if (count >= RATE_LIMIT_MAX) return true;

  await kv.put(key, String(count + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SEC,
  });
  return false;
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

  if (!botToken || !chatId) {
    return { ok: false, error: 'Telegram not configured' };
  }

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

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'MarkdownV2',
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: `Telegram ${res.status}: ${text}` };
  }

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

  await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(row),
  }).catch(() => {
    // Sheets write is best-effort — do not fail the request
  });
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

  const ip =
    request.headers.get('cf-connecting-ip') ||
    (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    '';
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

  // --- Parse body ---
  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
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

  // --- Send Telegram + write Sheets in parallel ---
  const tgResult = await sendTelegram(env, payload);
  // Fire-and-forget Sheets write (don't block the response)
  context.waitUntil(
    writeToSheets(env, payload, tgResult.ok ? 'delivered' : tgResult.error || 'failed'),
  );
  // Fire-and-forget Meta CAPI Lead with Advanced Matching (phone hash + IP/UA + fbp/fbc).
  // Runs server-side after the response is sent so user latency is not affected.
  context.waitUntil(sendLeadCAPI(env, request, payload));

  // Even if Telegram fails, the lead is captured in Sheets — return ok to the user
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
