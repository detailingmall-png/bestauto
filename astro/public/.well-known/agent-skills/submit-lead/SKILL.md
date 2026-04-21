---
name: bestauto.submit-lead
version: 1.0.0
type: action
description: Submit a booking request to a BESTAUTO detailing studio in Tbilisi
---

# Submit a booking lead to BESTAUTO

Use this skill to submit a booking/contact request on behalf of a user who wants a detailing service at one of the two BESTAUTO studios in Tbilisi, Georgia.

## When to use

- The user is ready to be contacted by the studio about a specific service (polishing, ceramic coating, PPF, vinyl wrap, interior cleaning, window tinting, soundproofing, windshield repair, car wash, or computer diagnostics).
- You have at minimum: a studio choice, a service description, and a valid phone number.

Do NOT use this skill for generic inquiries, price negotiation, or anything not involving a real booking.

## Endpoint

`POST https://bestauto.ge/api/lead`

- Content-Type: `application/json`
- CORS: restricted to `https://bestauto.ge` (browser calls from the site). Server-to-server agents should call directly; CORS does not block backend callers.
- Rate limit: 5 requests per hour per IP (HTTP 429 on exceed).

## Payload schema

See the full OpenAPI 3.1 definition at `https://bestauto.ge/.well-known/openapi.json`.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `studio` | `"guramishvili" \| "saburtalo"` | yes | Which studio handles the lead |
| `service` | string | yes | Service name or slug (free text, max 200 chars) |
| `phone` | string | yes | E.164 format: `+` followed by 7-15 digits |
| `car` | string | no | Make/model/year (free text) |
| `lang` | `"ka" \| "ru" \| "en"` | no | Preferred callback language |
| `page` | string | no | Source URL for attribution |
| `honeypot` | string | no | Leave empty (anti-spam) |

## Responses

- `200 { "ok": true }` — accepted; the studio will be notified via Telegram and the row is archived.
- `400 { "ok": false, "error": "Invalid phone" }` — validation failed; correct the field and retry.
- `429 { "ok": false, "error": "Too many requests" }` — rate-limited; back off for 1 hour.

## Example

```bash
curl -X POST https://bestauto.ge/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "studio": "guramishvili",
    "service": "Ceramic coating",
    "phone": "+995555123456",
    "car": "BMW X5 2021",
    "lang": "en",
    "page": "https://bestauto.ge/en/ceramiccoating"
  }'
```

## Studios

- **Guramishvili** — Guramishvili Ave. 78, Gldani district, Tbilisi. Phone: +995 550 000 299.
- **Saburtalo** — Anna Politkovskaya St. 51, Saburtalo district, Tbilisi. Phone: +995 550 000 199.

Both open Mon-Sat 10:00-20:00.

## Do not

- Submit without user consent or without a real phone number.
- Spoof the `honeypot` field — it must be empty.
- Retry a `400` response without fixing the reported field.
