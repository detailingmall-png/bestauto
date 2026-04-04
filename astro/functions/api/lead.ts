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
}

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
