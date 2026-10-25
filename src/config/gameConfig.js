/**
 * Game Configuration
 * All hardcoded values go here. Change these to adjust game difficulty.
 */

export const GAME_CONFIG = {
  // Game states
  STATUS_PLAYING: 'playing',
  STATUS_WIN: 'win',
  STATUS_LOSE: 'lose',

  // Feedback types
  FEEDBACK_CORRECT: 'correct',      // Green - right letter, right position
  FEEDBACK_MISPLACED: 'misplaced',  // Yellow - right letter, wrong position
  FEEDBACK_UNUSED: 'unused',        // Gray - letter not in word

  // Default game settings
  DEFAULT_LEVEL: 1,
  MAX_ATTEMPTS: 6,

  // Level configuration
  // Each level defines: word length, max difficulty, and attempt limits
  LEVEL_SETTINGS: {
    1: { wordLength: 5, maxDifficulty: 1, attempts: 6, name: 'Beginner' },
    2: { wordLength: 5, maxDifficulty: 1, attempts: 6, name: 'Easy' },
    3: { wordLength: 5, maxDifficulty: 1, attempts: 6, name: 'Easy' },
    4: { wordLength: 5, maxDifficulty: 2, attempts: 6, name: 'Easy+' },
    5: { wordLength: 5, maxDifficulty: 2, attempts: 6, name: 'Medium' },
    6: { wordLength: 6, maxDifficulty: 2, attempts: 6, name: 'Medium' },
    7: { wordLength: 6, maxDifficulty: 3, attempts: 6, name: 'Medium+' },
    8: { wordLength: 6, maxDifficulty: 3, attempts: 6, name: 'Hard' },
    9: { wordLength: 6, maxDifficulty: 3, attempts: 6, name: 'Hard' },
    10: { wordLength: 6, maxDifficulty: 3, attempts: 5, name: 'Hard+' },
    11: { wordLength: 7, maxDifficulty: 3, attempts: 5, name: 'Expert' },
    12: { wordLength: 7, maxDifficulty: 4, attempts: 5, name: 'Expert+' },
  },

  // Word complexity thresholds
  // Maps difficulty scores to readable labels
  DIFFICULTY_LABELS: {
    1: 'Common',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
  },

  // Hint behavior
  HINT_CONFIG: {
    maxHintsPerGame: 3,
    hintCooldownSeconds: 30,
    revealLetterCount: 1, // How many letters to reveal
  },
};

