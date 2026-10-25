const API_ENDPOINT = '/api/openrouter';

const DEFAULT_MODEL =
  import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o-mini';

export async function openrouterRequest(payload) {
  if (!payload || !Array.isArray(payload.messages)) {
    throw new Error('Invalid AI request: messages are required.');
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: payload.model || DEFAULT_MODEL,
      messages: payload.messages,
      max_tokens: payload.max_tokens ?? 150,
      temperature: payload.temperature ?? 0.7,
    }),
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error('The AI server returned an invalid response.');
  }

  if (!response.ok) {
    throw new Error(
      data?.error || `AI request failed with status ${response.status}.`
    );
  }

  const content = data?.choices?.[0]?.message?.content;

  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('The AI returned an empty response.');
  }

  return data;
}