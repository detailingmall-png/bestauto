/**
 * Cloudflare Pages Function — director complaint handler (review-gating funnel).
 *
 * Receives complaints submitted on /review, validates them, and sends a Telegram
 * notification to the SAME per-studio group chat used by the lead form (lead.ts) —
 * the message is clearly marked as a complaint. Optionally fires a server-side GA4
 * `director_complaint` event so the interception rate is measurable.
 *
 * Environment variables — REUSED from the lead form (lead.ts); already configured
 * in Cloudflare Pages, so NO new variables are required. Complaints land in the
 * same per-studio group as leads (299 = Guramishvili, 199 = Saburtalo):
 *   TG_BOT_TOKEN_299 / TG_CHAT_ID_299 / TG_THREAD_ID_299  (Guramishvili)
 *   TG_BOT_TOKEN_199 / TG_CHAT_ID_199 / TG_THREAD_ID_199  (Saburtalo)
 *   GA4_MP_API_SECRET — (optional) GA4 Measurement Protocol secret (shared)
 *
 * KV namespace binding (optional, reused from lead.ts):
 *   LEADS_RATE_LIMIT — Cloudflare KV namespace for rate limiting
 */

interface Env {
  // Same per-studio Telegram bot + chats as lead.ts (already set in Cloudflare).
  TG_BOT_TOKEN_299: string;
  TG_CHAT_ID_299: string;
  TG_THREAD_ID_299?: string;
  TG_BOT_TOKEN_199: string;
  TG_CHAT_ID_199: string;
  TG_THREAD_ID_199?: string;
  GA4_MP_API_SECRET?: string;
  LEADS_RATE_LIMIT?: KVNamespace;
}

const GA4_MEASUREMENT_ID = 'G-C088QPT7KV';

type Studio = 'guramishvili' | 'saburtalo';
type Lang = 'ru' | 'ka' | 'en';

interface ComplaintPayload {
  studio: Studio;
  lang?: Lang;
  contact: string;
  message: string;
  page?: string;
  company?: string; // honeypot field (hidden input on the page)
}

const VALID_STUDIOS: readonly Studio[] = ['guramishvili', 'saburtalo'];
const VALID_LANGS: readonly Lang[] = ['ru', 'ka', 'en'];
const MIN_LEN = 5;
const MAX_CONTACT = 200;
const MAX_MESSAGE = 4000;
const RATE_LIMIT_MAX = 6;
const RATE_LIMIT_WINDOW_SEC = 3600; // 1 hour

const STUDIO_LABELS: Record<Studio, string> = {
  guramishvili: 'Guramishvili',
  saburtalo: 'Saburtalo',
};

// ---------------------------------------------------------------------------
// Rate limiting via KV (reuses the lead namespace with a distinct key prefix)
// ---------------------------------------------------------------------------

async function isRateLimited(kv: KVNamespace | undefined, ip: string): Promise<boolean> {
  if (!kv) return false; // skip when KV not bound (local dev)

  const key = `rl:complaint:${ip}`;
  const raw = await kv.get(key);
  const count = raw ? parseInt(raw, 10) : 0;

  if (count >= RATE_LIMIT_MAX) return true;

  await kv.put(key, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW_SEC });
  return false;
}

// ---------------------------------------------------------------------------
// Telegram Bot API — send the complaint to the director
// ---------------------------------------------------------------------------

function escapeMarkdown(text: string): string {
  return text.replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

function tbilisiTime(): string {
  try {
    // "YYYY-MM-DD HH:mm:ss" in Tbilisi local time
    return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Tbilisi' });
  } catch {
    return new Date().toISOString();
  }
}

async function sendTelegram(env: Env, c: ComplaintPayload): Promise<{ ok: boolean; error?: string }> {
  // Same per-studio routing as lead.ts: 299 = Guramishvili, 199 = Saburtalo.
  const botToken = c.studio === 'guramishvili' ? env.TG_BOT_TOKEN_299 : env.TG_BOT_TOKEN_199;
  const chatId = c.studio === 'guramishvili' ? env.TG_CHAT_ID_299 : env.TG_CHAT_ID_199;

  if (!botToken || !chatId) {
    console.error(`[complaint] telegram not configured for studio=${c.studio}`);
    return { ok: false, error: 'Telegram not configured' };
  }

  const threadRaw = c.studio === 'guramishvili' ? env.TG_THREAD_ID_299 : env.TG_THREAD_ID_199;
  const threadId =
    typeof threadRaw === 'string' && /^\d+$/.test(threadRaw.trim())
      ? parseInt(threadRaw.trim(), 10)
      : undefined;

  const studioLabel = STUDIO_LABELS[c.studio] || c.studio;
  const lines = [
    `\u{1F6A8} *Жалоба с сайта \\(перехват отзыва\\)*`,
    ``,
    `*Студия:* ${escapeMarkdown(studioLabel)}`,
    `*Язык:* ${escapeMarkdown(c.lang || '—')}`,
    `*Контакт:* ${escapeMarkdown(c.contact)}`,
    ``,
    `*Сообщение:*`,
    escapeMarkdown(c.message),
    ``,
    `*Время:* ${escapeMarkdown(tbilisiTime())} \\(Tbilisi\\)`,
  ];
  if (c.page) lines.push(`*Источник:* ${escapeMarkdown(c.page)}`);

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text: lines.join('\n'),
    parse_mode: 'MarkdownV2',
    disable_web_page_preview: true,
  };
  if (threadId !== undefined) body.message_thread_id = threadId;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  console.log(`[complaint] tg send studio=${c.studio} chat=${chatId} thread=${threadId ?? 'none'}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[complaint] tg fail status=${res.status} body=${text}`);
    return { ok: false, error: `Telegram ${res.status}` };
  }

  console.log('[complaint] tg ok');
  return { ok: true };
}

// ---------------------------------------------------------------------------
// GA4 Measurement Protocol — optional server-side `director_complaint` event
// ---------------------------------------------------------------------------

async function sendGa4(env: Env, c: ComplaintPayload): Promise<void> {
  if (!env.GA4_MP_API_SECRET) return;

  const clientId = `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`;
  const url =
    `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}` +
    `&api_secret=${encodeURIComponent(env.GA4_MP_API_SECRET)}`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        events: [
          {
            name: 'director_complaint',
            params: { studio: c.studio, lang: c.lang || '', engagement_time_msec: 1 },
          },
        ],
      }),
    });
  } catch (e) {
    console.error(`[complaint] ga4 fail: ${String(e)}`);
  }
}

// ---------------------------------------------------------------------------
// Request handler
// ---------------------------------------------------------------------------

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let payload: ComplaintPayload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON' });
  }

  // --- Honeypot: silently accept to avoid revealing the trap ---
  if (payload.company) {
    return jsonResponse(200, { ok: true });
  }

  // --- Validate ---
  if (!payload.studio || !VALID_STUDIOS.includes(payload.studio)) {
    return jsonResponse(400, { ok: false, error: 'Invalid studio' });
  }
  const contact = (payload.contact || '').trim();
  const message = (payload.message || '').trim();
  if (contact.length < MIN_LEN) {
    return jsonResponse(400, { ok: false, error: 'Contact too short' });
  }
  if (message.length < MIN_LEN) {
    return jsonResponse(400, { ok: false, error: 'Message too short' });
  }

  const clean: ComplaintPayload = {
    studio: payload.studio,
    lang: payload.lang && VALID_LANGS.includes(payload.lang) ? payload.lang : undefined,
    contact: contact.slice(0, MAX_CONTACT),
    message: message.slice(0, MAX_MESSAGE),
    page:
      typeof payload.page === 'string' && payload.page.startsWith('https://bestauto.ge')
        ? payload.page
        : undefined,
  };

  // --- Rate limit ---
  const ip = request.headers.get('cf-connecting-ip') || '0.0.0.0';
  if (await isRateLimited(env.LEADS_RATE_LIMIT, ip)) {
    return jsonResponse(429, { ok: false, error: 'Too many requests' });
  }

  // --- Deliver to director + fire-and-forget GA4 ---
  const tg = await sendTelegram(env, clean);
  context.waitUntil(sendGa4(env, clean));

  // Always show the user the thank-you screen: a Telegram delivery failure is an
  // ops problem (logged above), not the user's fault. `delivered` lets the client
  // distinguish for its own logging if needed. Mirrors lead.ts behaviour.
  return jsonResponse(200, { ok: true, delivered: tg.ok });
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function jsonResponse(status: number, body: Record<string, unknown>): Response {
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
