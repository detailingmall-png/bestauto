/**
 * Cloudflare Pages Function - health check endpoint.
 *
 * Referenced as the `status` link in /.well-known/api-catalog (RFC 9727).
 * Returns service status and current timestamp. No side effects.
 */

interface HealthResponseBody {
  readonly status: 'ok';
  readonly service: 'bestauto-lead-api';
  readonly time: string;
}

function buildResponse(body: HealthResponseBody, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    },
  });
}

export const onRequestGet: PagesFunction = async () => {
  const body: HealthResponseBody = {
    status: 'ok',
    service: 'bestauto-lead-api',
    time: new Date().toISOString(),
  };
  return buildResponse(body);
};

export const onRequestHead: PagesFunction = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
};
