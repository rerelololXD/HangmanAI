import { openrouterRequest } from './openrouterClient.js';

const DEFAULT_MODEL =
  import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o-mini';

function getDifficultyInstruction(level) {
  if (level <= 3) {
    return 'Use a straightforward clue about the word’s meaning.';
  }

  if (level <= 6) {
    return 'Use a moderately subtle clue. Avoid giving away the answer.';
  }

  if (level <= 9) {
    return 'Use an indirect clue that requires some thought.';
  }

  return 'Use a challenging, precise clue without making it obscure or misleading.';
}

function sanitizeDefinition(definition, targetWord) {
  const escapedWord = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  return definition
    .replace(new RegExp(`\\b${escapedWord}\\b`, 'gi'), 'this term')
    .trim();
}

function normalizeHint(text) {
  return text
    .split('\n')[0]
    .replace(/^["'“”]+|["'“”]+$/g, '')
    .replace(/^(?:hint|clue)\s*:\s*/i, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function containsAnswer(hint, targetWord) {
  if (!hint || !targetWord) return false;

  const escapedWord = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const answerPattern = new RegExp(`\\b${escapedWord}\\b`, 'i');

  return answerPattern.test(hint);
}

function buildPatternLine(pattern) {
  if (!pattern || !/^[A-Z_]+$/.test(pattern)) {
    return '';
  }

  return ` Pattern: ${pattern}.`;
}

export async function getAIHint({
  targetWord,
  targetDefinition,
  definition,
  guesses = [],
  level = 1,
  attemptsUsed,
  attempts,
  maxAttempts,
  correctLetters = [],
  misplacedLetters = [],
  absentLetters = [],
  pattern,
}) {
  const answer = String(targetWord || '').toUpperCase().trim();
  const meaning = String(targetDefinition ?? definition ?? '').trim();
  const usedAttempts = Number.isFinite(attemptsUsed)
    ? attemptsUsed
    : Number.isFinite(attempts)
      ? attempts
      : guesses.length;

  if (!answer || !meaning) {
    return {
      success: false,
      error: 'Missing the target word or its definition.',
    };
  }

  if (!Number.isFinite(maxAttempts) || maxAttempts < 1) {
    return {
      success: false,
      error: 'The maximum number of attempts is missing or invalid.',
    };
  }

  const difficultyInstruction = getDifficultyInstruction(level);
  const safeDefinition = sanitizeDefinition(meaning, answer);

  const includePattern = usedAttempts >= 2;
  const requiredPattern = includePattern
    ? pattern || '_'.repeat(answer.length)
    : '';

  const systemPrompt = `
You are the hint assistant for a word-guessing game.

Rules:
- Never state the target word.
- Never spell out the entire target word.
- Give one concise, helpful clue in one sentence.
- Use the definition and the player's progress to guide the clue.
- Do not claim that a letter is correct unless the supplied information confirms it.
- Do not include multiple alternative answers.
- Do not include greetings, explanations of your role, or markdown.
- Difficulty instruction: ${difficultyInstruction}
${
  includePattern
    ? `- After your clue, the application will append this exact pattern: ${requiredPattern}. Do not invent or modify a pattern yourself.`
    : '- Do not reveal a letter pattern or the answer.'
}
`.trim();

  const userPrompt = `
Target word (for your reasoning only): ${answer}
Definition: ${safeDefinition}
Level: ${level}
Attempts used: ${usedAttempts}
Maximum attempts: ${maxAttempts}
Previous guesses: ${guesses.join(', ') || 'None'}
Correct letters: ${correctLetters.join(', ') || 'None known'}
Misplaced letters: ${misplacedLetters.join(', ') || 'None known'}
Absent letters: ${absentLetters.join(', ') || 'None known'}
`.trim();

  try {
    const response = await openrouterRequest({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 100,
      temperature: 0.5,
    });

    let hint = normalizeHint(
      response.choices[0].message.content
    );

    if (!hint) {
      throw new Error('The AI returned an empty hint.');
    }

    // If the AI accidentally reveals the answer, use a safer fallback.
    if (containsAnswer(hint, answer)) {
      hint = `Think about the meaning: ${safeDefinition}`;
    }

    // Keep the hint concise and append a deterministic pattern when needed.
    hint = hint.slice(0, 240).trim();

    if (includePattern) {
      hint = `${hint.replace(/[.!?]+$/, '')}.${buildPatternLine(requiredPattern)}`;
    } else if (!/[.!?]$/.test(hint)) {
      hint += '.';
    }

    return {
      success: true,
      hint,
      model: response.model || DEFAULT_MODEL,
    };
  } catch (error) {
    console.error('AI hint generation failed:', error);

    return {
      success: false,
      error: error.message || 'Unable to generate a hint right now.',
    };
  }
}

export async function generateHint(hintContext) {
  return getAIHint(hintContext);
}