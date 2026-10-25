/**
 * Dialogue Service
 * Lightweight backbone for generating randomized, persona-driven dialogues
 * using the same Groq API key as `aiService.js`.
 *
 * This file provides a small, maintainable wrapper you can extend with
 * prompt variations, persona pools, or server-side proxying later.
 */

import { openrouterRequest } from './openrouterClient.js';

const DEFAULT_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'gpt-4o-mini';

// Simple set of personas to vary tone and phrasing
const PERSONAS = [
  { id: 'helpful', label: 'Helpful Assistant' },
  { id: 'sarcastic', label: 'Wry Companion' },
  { id: 'cheerful', label: 'Cheerful Guide' },
  { id: 'mysterious', label: 'Mysterious Hint-Giver' },
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildSystemPrompt(persona, tone) {
  // Minimal system prompt that can be expanded by the owner later
  return `You are a concise conversational AI acting as: ${persona.label}.
Respond in a ${tone} tone. Keep replies short (1-3 sentences) unless asked otherwise.
Never reveal secret answers or spoil the game.`;
}

/**
 * Request a dialogue response from Groq API.
 * @param {Object} options
 * @param {string[]} [options.topics] - Optional seed topics or context strings
 * @param {string} [options.personaId] - Persona id to use (falls back to random)
 * @param {string} [options.tone] - Tone hint: 'friendly'|'serious'|'playful' etc.
 * @param {number} [options.temperature] - Model temperature (0-1)
 * @param {number} [options.maxTokens] - Max tokens to request
 */
export async function getDialogueResponse({
  topics = [],
  personaId = null,
  tone = 'humorous',
  temperature = 0.8,
  maxTokens = 80,
} = {}) {
  const persona = personaId ? (PERSONAS.find(p => p.id === personaId) || pickRandom(PERSONAS)) : pickRandom(PERSONAS);

  const systemPrompt = buildSystemPrompt(persona, tone);
  const userPrompt = `Context: ${topics.length ? topics.join(' | ') : 'general chit-chat'}\nKeep it brief and use the persona described.`;

  const body = {
    model: DEFAULT_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: maxTokens,
    temperature,
  };

  try {
    const data = await openrouterRequest(body);
    const raw = data?.choices?.[0]?.message?.content || '';
    const text = String(raw).trim();

    return {
      success: true,
      persona: persona.id,
      personaLabel: persona.label,
      text,
      model: body.model,
      raw: data,
    };
  } catch (err) {
    console.error('DialogueService Error:', err);
    return {
      success: false,
      error: err.message || String(err),
      text: 'Sorry, I could not generate a response right now.',
    };
  }
}

/**
 * Convenience wrapper kept for parity with `aiService.generateHint`.
 */
export async function generateDialogue(opts) {
  return await getDialogueResponse(opts);
}

export function getAvailablePersonas() {
  return PERSONAS.map(p => ({ id: p.id, label: p.label }));
}
