import { GAME_CONFIG } from '../config/gameConfig.js';
import { selectWordByLevel } from './wordSelector.js';

/**
 * Core Wordle Game Logic
 * Handles word selection, guess validation, and feedback generation
 * Pure logic - no side effects (except word selection)
 */

export class Wordle {
  constructor(level = 1) {
    this.level = level;
    this.wordData = selectWordByLevel(level);
    this.word = this.wordData.word;
    this.definition = this.wordData.definition;
    this.difficulty = this.wordData.difficulty;
    this.wordLength = this.wordData.length;
    this.guesses = [];
    this.status = GAME_CONFIG.STATUS_PLAYING;
  }

  /**
   * Check if a guess is valid (correct length, alphabetic, not already guessed)
   */
  isValidGuess(guess) {
    const normalized = guess.toUpperCase().trim();

    if (normalized.length !== this.wordLength) {
      return {
        valid: false,
        message: `Word must be ${this.wordLength} letters`,
      };
    }

    if (!/^[A-Z]+$/.test(normalized)) {
      return { valid: false, message: 'Only alphabetic characters allowed' };
    }

    if (this.guesses.includes(normalized)) {
      return { valid: false, message: 'Word already guessed' };
    }

    return { valid: true };
  }

  /**
   * Submit a guess and get feedback
   * Returns: { feedback: [...], isCorrect: bool }
   */
  submitGuess(guess) {
    const normalized = guess.toUpperCase().trim();
    const validation = this.isValidGuess(normalized);

    if (!validation.valid) {
      return { success: false, message: validation.message };
    }

    // Record the guess
    this.guesses.push(normalized);

    // Generate feedback for each letter
    const feedback = this.generateFeedback(normalized);
    const isCorrect = normalized === this.word;

    // Get max attempts for this level
    const levelConfig = GAME_CONFIG.LEVEL_SETTINGS[this.level] || GAME_CONFIG.LEVEL_SETTINGS[1];
    const maxAttempts = levelConfig.attempts;

    // Update game status
    if (isCorrect) {
      this.status = GAME_CONFIG.STATUS_WIN;
    } else if (this.guesses.length >= maxAttempts) {
      this.status = GAME_CONFIG.STATUS_LOSE;
    }

    return {
      success: true,
      feedback,
      isCorrect,
      attempts: this.guesses.length,
      maxAttempts,
    };
  }

  /**
   * Generate color feedback for a guess
   * Returns array of feedback values: 'correct', 'misplaced', 'unused'
   */
  generateFeedback(guess) {
    const feedback = [];
    const wordLetters = this.word.split('');
    const guessLetters = guess.split('');
    const used = new Array(this.word.length).fill(false);

    // First pass: mark correct letters (green)
    for (let i = 0; i < guessLetters.length; i++) {
      if (guessLetters[i] === wordLetters[i]) {
        feedback[i] = GAME_CONFIG.FEEDBACK_CORRECT;
        used[i] = true;
      }
    }

    // Second pass: mark misplaced (yellow) and unused (gray)
    for (let i = 0; i < guessLetters.length; i++) {
      if (feedback[i]) continue; // Already marked as correct

      const letterIndex = wordLetters.findIndex(
        (letter, idx) => letter === guessLetters[i] && !used[idx]
      );

      if (letterIndex !== -1) {
        feedback[i] = GAME_CONFIG.FEEDBACK_MISPLACED;
        used[letterIndex] = true;
      } else {
        feedback[i] = GAME_CONFIG.FEEDBACK_UNUSED;
      }
    }

    return feedback;
  }

  /**
   * Get the current game state
   */
  getState() {
    const levelConfig = GAME_CONFIG.LEVEL_SETTINGS[this.level] || GAME_CONFIG.LEVEL_SETTINGS[1];
    const maxAttempts = levelConfig.attempts;

    return {
      word: this.word,
      definition: this.definition,
      difficulty: this.difficulty,
      wordLength: this.wordLength,
      guesses: this.guesses,
      status: this.status,
      level: this.level,
      attempts: this.guesses.length,
      maxAttempts,
      isGameOver: this.status !== GAME_CONFIG.STATUS_PLAYING,
    };
  }

  /**
   * Reset the game (keep same level)
   */
  reset() {
    this.wordData = selectWordByLevel(this.level);
    this.word = this.wordData.word;
    this.definition = this.wordData.definition;
    this.difficulty = this.wordData.difficulty;
    this.wordLength = this.wordData.length;
    this.guesses = [];
    this.status = GAME_CONFIG.STATUS_PLAYING;
  }

  /**
   * Start a new level
   */
  nextLevel() {
    this.level += 1;
    this.reset();
  }

  /**
   * Get data for hint generation
   * Provides word, definition, and guesses for AI
   */
  getHintData() {
    return {
      word: this.word,
      definition: this.definition,
      guesses: this.guesses,
      level: this.level,
      difficulty: this.difficulty,
      wordLength: this.wordLength,
    };
  }
}

