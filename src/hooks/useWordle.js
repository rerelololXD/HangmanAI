import { useCallback, useRef, useState } from 'react';

import { Wordle } from '../game/wordle.js';
import { GAME_CONFIG } from '../config/gameConfig.js';
import {
  checkHintAvailability,
  createHintContext,
} from '../services/hintService.js';
import { generateHint } from '../services/aiService.js';

export function useWordle() {
  const [game, setGame] = useState(
    () => new Wordle(GAME_CONFIG.DEFAULT_LEVEL)
  );

  const [gameState, setGameState] = useState(() => game.getState());
  const [feedback, setFeedback] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [message, setMessage] = useState('');

  const [hintsUsed, setHintsUsed] = useState(0);
  const [lastHintTime, setLastHintTime] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [isHintLoading, setIsHintLoading] = useState(false);

  // A ref blocks duplicate requests immediately, before React re-renders.
  const hintRequestInFlight = useRef(false);

  const maxHints = GAME_CONFIG.HINT_CONFIG.maxHintsPerGame;

  const hintsRemaining = Math.max(0, maxHints - hintsUsed);

  const appendChatMessage = useCallback((role, content) => {
    setChatMessages((previous) => [
      ...previous,
      {
        role,
        content,
        text: content,
        message: content,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const submitGuess = useCallback(
    (guess) => {
      if (gameState.isGameOver) {
        const result = {
          success: false,
          message: 'This game has ended. Start a new game to continue.',
        };

        setMessage(result.message);
        return result;
      }

      const result = game.submitGuess(guess);

      if (!result.success) {
        setMessage(result.message);
        return result;
      }

      const updatedState = game.getState();

      setGameState(updatedState);
      setFeedback(result.feedback);
      setFeedbackHistory((previous) => [...previous, result.feedback]);

      if (result.isCorrect) {
        setMessage('Correct! You guessed the word.');
      } else if (updatedState.isGameOver) {
        setMessage(`Game over. The word was ${updatedState.word}.`);
      } else {
        setMessage('');
      }

      return result;
    },
    [game, gameState.isGameOver]
  );

  const getHintContext = useCallback(() => {
    const hintData = game.getHintData();

    return createHintContext({
      ...hintData,
      guesses: [...hintData.guesses],
      attemptsUsed: game.getState().attempts,
      maxAttempts: game.getState().maxAttempts,
    });
  }, [game]);

  // Check availability without consuming a hint.
  const requestHint = useCallback(() => {
    if (hintRequestInFlight.current) {
      return {
        success: false,
        error: 'A hint request is already in progress.',
      };
    }

    if (gameState.isGameOver) {
      return {
        success: false,
        error: 'You cannot request a hint after the game has ended.',
      };
    }

    const availability = checkHintAvailability(
      hintsUsed,
      lastHintTime
    );

    if (!availability.canUse) {
      return {
        success: false,
        error: availability.reason,
        nextAvailableIn: availability.nextAvailableIn,
      };
    }

    return {
      success: true,
      hintContext: getHintContext(),
      hintsRemaining,
    };
  }, [
    gameState.isGameOver,
    getHintContext,
    hintsUsed,
    hintsRemaining,
    lastHintTime,
  ]);

  const requestHintWithChat = useCallback(async () => {
    if (hintRequestInFlight.current) {
      return {
        success: false,
        error: 'A hint request is already in progress.',
      };
    }

    const request = requestHint();

    if (!request.success) {
      setMessage(request.error);
      return request;
    }

    hintRequestInFlight.current = true;
    setIsHintLoading(true);
    setMessage('');

    appendChatMessage('user', 'Please give me a hint.');

    try {
      const result = await generateHint(request.hintContext);

      if (!result.success) {
        const errorMessage =
          result.error || 'The hint could not be generated.';

        appendChatMessage('assistant', errorMessage);
        setMessage(errorMessage);

        // Do not consume a hint when generation fails.
        return result;
      }

      // Consume a hint only after successful generation.
      setHintsUsed((previous) => previous + 1);
      setLastHintTime(Date.now());

      appendChatMessage('assistant', result.hint);

      return {
        ...result,
        hintsRemaining: Math.max(0, hintsRemaining - 1),
      };
    } catch (error) {
      const errorMessage =
        error.message || 'Unable to generate a hint right now.';

      appendChatMessage('assistant', errorMessage);
      setMessage(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      hintRequestInFlight.current = false;
      setIsHintLoading(false);
    }
  }, [
    appendChatMessage,
    hintsRemaining,
    requestHint,
  ]);

  const resetGame = useCallback(() => {
    hintRequestInFlight.current = false;

    game.reset();

    setGameState(game.getState());
    setFeedback([]);
    setFeedbackHistory([]);
    setMessage('');
    setHintsUsed(0);
    setLastHintTime(null);
    setChatMessages([]);
    setIsHintLoading(false);
  }, [game]);

  const nextLevel = useCallback(() => {
    hintRequestInFlight.current = false;

    game.nextLevel();

    setGameState(game.getState());
    setFeedback([]);
    setFeedbackHistory([]);
    setMessage('');
    setHintsUsed(0);
    setLastHintTime(null);
    setChatMessages([]);
    setIsHintLoading(false);
  }, [game]);

  return {
    // Game state
    game,
    gameState,
    state: gameState,
    word: gameState.word,
    definition: gameState.definition,
    guesses: gameState.guesses,
    status: gameState.status,
    level: gameState.level,
    difficulty: gameState.difficulty,
    wordLength: gameState.wordLength,
    attempts: gameState.attempts,
    maxAttempts: gameState.maxAttempts,
    isGameOver: gameState.isGameOver,
    feedback,
    feedbackHistory,
    message,
    gameMessage: message,

    // Guessing
    submitGuess,

    // Hints
    getHintContext,
    requestHint,
    requestHintWithChat,
    hintsUsed,
    hintsRemaining,
    isHintLoading,
    chatLoading: isHintLoading,

    // Chat
    chatMessages,
    messages: chatMessages,

    // Game progression
    resetGame,
    nextLevel,
  };
}