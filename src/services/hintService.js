import { GAME_CONFIG } from '../config/gameConfig.js';

function getLevelSettings(level) {
  return (
    GAME_CONFIG.LEVEL_SETTINGS[level] ||
    GAME_CONFIG.LEVEL_SETTINGS[GAME_CONFIG.DEFAULT_LEVEL]
  );
}

function calculateFeedback(guess, targetWord) {
  const feedback = Array(guess.length).fill('unused');
  const remaining = targetWord.split('');

  // First pass: correct letters in correct positions.
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === targetWord[i]) {
      feedback[i] = 'correct';
      remaining[i] = null;
    }
  }

  // Second pass: letters in the word but in the wrong position.
  for (let i = 0; i < guess.length; i++) {
    if (feedback[i] === 'correct') continue;

    const index = remaining.indexOf(guess[i]);

    if (index !== -1) {
      feedback[i] = 'misplaced';
      remaining[index] = null;
    }
  }

  return feedback;
}

export function createHintContext({
  word,
  targetWord,
  definition,
  targetDefinition,
  guesses = [],
  level = GAME_CONFIG.DEFAULT_LEVEL,
  difficulty,
  wordLength,
  attemptsUsed,
  maxAttempts,
}) {
  const answer = String(targetWord ?? word ?? '').toUpperCase();
  const meaning = String(targetDefinition ?? definition ?? '');
  const normalizedGuesses = guesses.map((guess) =>
    String(typeof guess === 'string' ? guess : guess.word ?? '')
      .toUpperCase()
      .trim()
  ).filter(Boolean);

  const settings = getLevelSettings(level);

  const usedAttempts = Number.isFinite(attemptsUsed)
    ? attemptsUsed
    : normalizedGuesses.length;

  const attemptLimit = Number.isFinite(maxAttempts)
    ? maxAttempts
    : settings.attempts;

  const knownPositions = Array(answer.length).fill('_');
  const correctLetters = new Set();
  const misplacedLetters = new Set();
  const absentLetters = new Set();

  for (const guess of normalizedGuesses) {
    if (guess.length !== answer.length) continue;

    const feedback = calculateFeedback(guess, answer);

    for (let i = 0; i < guess.length; i++) {
      if (feedback[i] === 'correct') {
        knownPositions[i] = answer[i];
        correctLetters.add(answer[i]);
      } else if (feedback[i] === 'misplaced') {
        misplacedLetters.add(guess[i]);
      } else if (!answer.includes(guess[i])) {
        absentLetters.add(guess[i]);
      }
    }
  }

  return {
    targetWord: answer,
    targetDefinition: meaning,
    guesses: normalizedGuesses,
    guessCount: normalizedGuesses.length,
    attemptsUsed: usedAttempts,
    maxAttempts: attemptLimit,
    attemptsRemaining: Math.max(0, attemptLimit - usedAttempts),
    attemptRemaining: Math.max(0, attemptLimit - usedAttempts),
    level,
    difficulty,
    gameDifficulty: settings.name,
    wordLength: wordLength || answer.length,
    correctLetters: [...correctLetters],
    misplacedLetters: [...misplacedLetters],
    absentLetters: [...absentLetters],
    pattern: knownPositions.join(''),
    hintFormat:
      usedAttempts < 2
        ? 'Give a subtle semantic clue.'
        : 'Give a semantic clue and include the supplied letter pattern exactly.',
  };
}

export function checkHintAvailability(hintsUsed, lastHintTime) {
  const hintSettings = GAME_CONFIG.HINT_CONFIG;
  const now = Date.now();

  const used = Math.max(0, Number(hintsUsed) || 0);
  const maximum = hintSettings.maxHintsPerGame;

  if (used >= maximum) {
    return {
      available: false,
      canUse: false,
      reason: 'You have used all available hints for this game.',
      nextAvailableIn: 0,
    };
  }

  if (lastHintTime != null) {
    const elapsedSeconds = Math.max(0, (now - lastHintTime) / 1000);
    const cooldown = hintSettings.hintCooldownSeconds;
    const remaining = Math.max(0, Math.ceil(cooldown - elapsedSeconds));

    if (remaining > 0) {
      return {
        available: false,
        canUse: false,
        reason: `Please wait ${remaining} seconds before requesting another hint.`,
        nextAvailableIn: remaining,
      };
    }
  }

  return {
    available: true,
    canUse: true,
    reason: '',
    nextAvailableIn: 0,
  };
}