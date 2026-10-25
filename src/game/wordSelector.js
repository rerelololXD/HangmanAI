import dictionaryData from '../data/dictionary.json';

/**
 * Word Selector
 * Filters dictionary words by level, length, and difficulty
 * Prevents unfair words in early levels
 */

// Cache dictionary
const DICTIONARY = dictionaryData.words;

/**
 * Map level to game parameters
 * Levels 1-5: 5-letter words (easy to medium)
 * Levels 6-10: 6-letter words (medium to hard)
 * Levels 11+: 7+ letter words (hard to expert)
 */
function getLevelConfig(level) {
  return {
    1: { minLength: 5, maxLength: 5, maxDifficulty: 1 },
    2: { minLength: 5, maxLength: 5, maxDifficulty: 1 },
    3: { minLength: 5, maxLength: 5, maxDifficulty: 1 },
    4: { minLength: 5, maxLength: 5, maxDifficulty: 2 },
    5: { minLength: 5, maxLength: 5, maxDifficulty: 2 },
    6: { minLength: 6, maxLength: 6, maxDifficulty: 2 },
    7: { minLength: 6, maxLength: 6, maxDifficulty: 3 },
    8: { minLength: 6, maxLength: 6, maxDifficulty: 3 },
    9: { minLength: 6, maxLength: 6, maxDifficulty: 3 },
    10: { minLength: 6, maxLength: 6, maxDifficulty: 3 },
    11: { minLength: 7, maxLength: 7, maxDifficulty: 3 },
    12: { minLength: 7, maxLength: 7, maxDifficulty: 4 },
  }[level] || { minLength: 5, maxLength: 7, maxDifficulty: 4 };
}

/**
 * Filter dictionary by level
 * Returns candidate words for the current level
 */
function getWordsByLevel(level) {
  const config = getLevelConfig(level);

  return DICTIONARY.filter(
    (entry) =>
      entry.length >= config.minLength &&
      entry.length <= config.maxLength &&
      entry.difficulty <= config.maxDifficulty
  );
}

/**
 * Select a random word from filtered list
 * Returns: { word, definition, difficulty, length }
 */
export function selectWordByLevel(level) {
  const candidates = getWordsByLevel(level);

  if (candidates.length === 0) {
    console.warn(`No words found for level ${level}, falling back to level 1`);
    return selectWordByLevel(1);
  }

  // Pick random word from candidates
  const selected =
    candidates[Math.floor(Math.random() * candidates.length)];

  return {
    word: selected.word,
    definition: selected.definition,
    difficulty: selected.difficulty,
    length: selected.length,
    category: selected.category,
  };
}

/**
 * Get words for testing or admin purposes
 * WITHOUT revealing the answer
 */
export function getWordsForLevel(level) {
  return getWordsByLevel(level).map((w) => ({
    word: w.word,
    difficulty: w.difficulty,
    length: w.length,
  }));
}

/**
 * Get difficulty rating for a word
 * Useful for dynamically adjusting hints
 */
export function getDifficultyInfo(level) {
  const config = getLevelConfig(level);
  return {
    level,
    wordLength: config.minLength,
    maxDifficulty: config.maxDifficulty,
    availableWords: getWordsByLevel(level).length,
  };
}
