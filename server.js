import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = Number(process.env.PORT) || 4000;
const MAX_BODY_BYTES = 64 * 1024;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

const OPENROUTER_ENDPOINT =
  'https://openrouter.ai/api/v1/chat/completions';

const DEFAULT_MODEL =
  process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

// Load .env if the key wasn't supplied by the environment.
function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env');

  if (!existsSync(envPath)) return;

  const contents = readFileSync(envPath, 'utf8');

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const API_KEY = process.env.OPENROUTER_API_KEY;

if (!API_KEY) {
  console.error(
    'Missing OPENROUTER_API_KEY. Add it to your server .env file.'
  );
}

const rateLimitStore = new Map();

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });

  res.end(JSON.stringify(data));
}

function getClientIp(req) {
  // Use the socket address. Do not trust arbitrary X-Forwarded-For
  // values unless your deployment configures a trusted proxy.
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    rateLimitStore.set(ip, {
      startedAt: now,
      count: 1,
    });

    return false;
  }

  current.count += 1;

  return current.count > RATE_LIMIT;
}

function readJsonBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let body = '';
    let size = 0;

    req.on('data', (chunk) => {
      size += chunk.length;

      if (size > MAX_BODY_BYTES) {
        rejectBody(
          Object.assign(new Error('Request body is too large.'), {
            statusCode: 413,
          })
        );

        req.destroy();
        return;
      }

      body += chunk.toString('utf8');
    });

    req.on('end', () => {
      try {
        resolveBody(JSON.parse(body || '{}'));
      } catch {
        rejectBody(
          Object.assign(new Error('Request body must be valid JSON.'), {
            statusCode: 400,
          })
        );
      }
    });

    req.on('error', rejectBody);
  });
}

function validatePayload(payload) {
  if (
    !payload ||
    typeof payload !== 'object' ||
    !Array.isArray(payload.messages) ||
    payload.messages.length < 1 ||
    payload.messages.length > 10
  ) {
    return 'A valid messages array is required.';
  }

  for (const message of payload.messages) {
    if (
      !message ||
      !['system', 'user', 'assistant'].includes(message.role) ||
      typeof message.content !== 'string' ||
      message.content.length > 12_000
    ) {
      return 'One or more messages are invalid.';
    }
  }

  if (
    payload.model !== undefined &&
    (typeof payload.model !== 'string' ||
      payload.model.length > 150)
  ) {
    return 'The model value is invalid.';
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  if (req.url === '/health' && req.method === 'GET') {
    return sendJson(res, 200, { status: 'ok' });
  }

  if (req.url !== '/api/openrouter') {
    return sendJson(res, 404, { error: 'Route not found.' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  if (!API_KEY) {
    return sendJson(res, 503, {
      error: 'The AI service is not configured on the server.',
    });
  }

  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return sendJson(res, 429, {
      error: 'Too many AI requests. Please try again shortly.',
    });
  }

  try {
    const payload = await readJsonBody(req);
    const validationError = validatePayload(payload);

    if (validationError) {
      return sendJson(res, 400, {
        error: validationError,
      });
    }

    const requestedTokens = Number(payload.max_tokens) || 150;
    const maxTokens = Math.min(
      300,
      Math.max(1, Math.floor(requestedTokens))
    );

    const requestedTemperature =
      Number(payload.temperature ?? 0.5);

    const temperature = Number.isFinite(requestedTemperature)
      ? Math.min(1, Math.max(0, requestedTemperature))
      : 0.5;

    const upstreamResponse = await fetch(OPENROUTER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'X-Title': 'Hangman.AI',
      },
      body: JSON.stringify({
        model: payload.model || DEFAULT_MODEL,
        messages: payload.messages,
        max_tokens: maxTokens,
        temperature,
      }),
      signal: AbortSignal.timeout(30_000),
    });

    const responseText = await upstreamResponse.text();

    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = {
        error: 'OpenRouter returned an invalid response.',
      };
    }

    if (!upstreamResponse.ok) {
      console.error(
        'OpenRouter request failed:',
        upstreamResponse.status,
        responseData?.error?.message || responseData?.error || ''
      );

      return sendJson(res, upstreamResponse.status, {
        error:
          responseData?.error?.message ||
          (typeof responseData?.error === 'string'
            ? responseData.error
            : 'The AI provider rejected the request.'),
      });
    }

    return sendJson(res, 200, responseData);
  } catch (error) {
    console.error('AI proxy error:', error.message);

    if (res.headersSent || res.destroyed) return;

    const statusCode = error.statusCode || 502;

    return sendJson(res, statusCode, {
      error:
        statusCode === 413
          ? 'Request body is too large.'
          : statusCode === 400
            ? error.message
            : error.name === 'TimeoutError'
              ? 'The AI request timed out.'
              : 'Unable to contact the AI service.',
    });
  }
});

// Periodically remove expired rate-limit entries.
setInterval(() => {
  const now = Date.now();

  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now - entry.startedAt >= RATE_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}, RATE_WINDOW_MS).unref();

server.listen(PORT, () => {
  console.log(`Hangman.AI server listening on port ${PORT}`);
});