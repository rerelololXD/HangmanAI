import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWordle } from '../hooks/useWordle';
import { GameBoard } from '../components/GameBoard';
import { GuessInput } from '../components/GuessInput';
import { GameStatus } from '../components/GameStatus';
import { GameLayout } from '../components/GameLayout';
import { HangmanAI } from '../components/HangmanAI';
import { DialogChoiceBox } from '../components/DialogChoiceBox';
import { generateDialogue } from '../services/dialogueService';
import { GAME_CONFIG } from '../config/gameConfig';
import { uiTheme } from '../theme/uiTheme';

export function Game() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [aiState, setAiState] = useState({
    step: 'choice', // 'choice' | 'hint' | 'response'
    aiMessage: '',
    isLoading: false,
    hintRequested: false,
  });
  const {
    word,
    definition,
    guesses,
    feedbackHistory,
    status,
    level,
    difficulty,
    wordLength,
    attempts,
    maxAttempts,
    isGameOver,
    message,
    hintsUsed,
    hintsRemaining,
    chatMessages,
    chatLoading,
    submitGuess,
    resetGame,
    nextLevel,
    requestHintWithChat,
  } = useWordle(1);

  // Dialogue options (uses dialogueService for dynamic responses)
  const dialogueOptions = [
    {
      label: 'Are you okay?',
      onSelect: async () => {
        // Ask the dialogue service for a short persona response
        setAiState({ step: 'response', aiMessage: '', isLoading: true, hintRequested: false });
        try {
          const res = await generateDialogue({ topics: ['Are you okay?'], tone: 'concise', maxTokens: 60 });
          setAiState({
            step: 'response',
            aiMessage: res.success ? res.text : (res.error || 'I could not respond.'),
            isLoading: false,
            hintRequested: false,
          });
        } catch (err) {
          setAiState({ step: 'response', aiMessage: 'Error generating response.', isLoading: false, hintRequested: false });
        }
      },
    },
    {
      label: 'Give me a hint',
      onSelect: async () => {
        setAiState({
          step: 'hint',
          aiMessage: 'Alright… I shouldn’t be doing this…',
          isLoading: true,
          hintRequested: true,
        });
        await requestHintWithChat();
        setAiState((prev) => ({ ...prev, isLoading: false }));
      },
    },
  ];

  const handleHangmanClick = () => {
    setDialogOpen(true);
    setAiState({
      step: 'choice',
      aiMessage: 'What do you want to ask?',
      isLoading: false,
      hintRequested: false,
    });
  };

  // LEFT PANEL: Game Content
  const gamePanel = (
    <div style={styles.gamePanelWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <button
          onClick={() => navigate('/')}
          style={{ ...styles.btn, ...styles.btnSecondary }}
          title="Back to home"
        >
          ← Home
        </button>
        <div style={styles.headerCenter}>
          <h1 style={styles.title}>Hangman.AI</h1>
          <p style={styles.subtitle}>
            Level {level} — {GAME_CONFIG.LEVEL_SETTINGS[level]?.name}
          </p>
        </div>
      </div>

      {/* Game Stats */}
      <div style={styles.statsPanel}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Attempts</span>
          <span style={styles.statValue}>
            {attempts}/{maxAttempts}
          </span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Hints</span>
          <span style={{ ...styles.statValue, color: hintsRemaining > 0 ? uiTheme.colors.accentCorrect : uiTheme.colors.accentWrong }}>
            {hintsRemaining}
          </span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Guesses</span>
          <span style={styles.statValue}>{guesses.length}</span>
        </div>
      </div>

      {/* Definition */}
      <div style={styles.definitionPanel}>
        <p style={styles.definitionLabel}>Definition:</p>
        <p style={styles.definitionText}>{definition}</p>
      </div>

      {/* Game Board */}
      <GameBoard
        guesses={guesses}
        feedbackHistory={feedbackHistory}
        wordLength={wordLength}
        maxAttempts={maxAttempts}
      />

      {/* Status Message */}
      {message && (
        <GameStatus
          message={message}
          isCorrect={status === 'win'}
        />
      )}

      {/* Guess Input */}
      {!isGameOver && (
        <GuessInput
          onSubmit={submitGuess}
          wordLength={wordLength}
          disabled={isGameOver}
        />
      )}

      {/* Action Buttons */}
      <div style={styles.buttonGroup}>
        {status !== 'playing' && (
          <button
            onClick={status === 'win' ? nextLevel : resetGame}
            style={{
              ...styles.btn,
              backgroundColor: status === 'win' ? '#10b981' : '#ef4444',
            }}
          >
            {status === 'win' ? 'Next Level →' : 'Try Again'}
          </button>
        )}

        {isGameOver && hintsRemaining === 0 && (
          <p style={{ ...styles.text, color: uiTheme.colors.accentWrong }}>
            No hints remaining
          </p>
        )}
      </div>
    </div>
  );

  // RIGHT PANEL: Hangman AI Character
  const hangmanPanel = (
    <div>
      <HangmanAI
        wrongGuesses={guesses.length - (status === 'win' ? 1 : 0)}
        maxAttempts={maxAttempts}
        onInteract={handleHangmanClick}
        isGameOver={isGameOver}
        didWin={status === 'win'}
      />
    </div>
  );

  return (
    <>
      {/* Split Layout */}
      <div className="game-layout">
        <div className="left-panel">{gamePanel}</div>
        <div className="right-panel">{hangmanPanel}</div>
      </div>

      {/* AI Dialogue Choice Modal */}
      <DialogChoiceBox
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aiMessage={
          aiState.step === 'choice'
            ? aiState.aiMessage
            : aiState.aiMessage
        }
        options={
          aiState.step === 'choice' ? dialogueOptions : [
            {
              label: 'Back',
              onSelect: () => setAiState({
                step: 'choice',
                aiMessage: 'What do you want to ask?',
                isLoading: false,
                hintRequested: false,
              }),
            },
          ]
        }
        isLoading={chatLoading || aiState.isLoading}
      >
        {/* Only show hint if requested and available */}
        {aiState.step === 'hint' && !chatLoading && chatMessages.length > 1 && (
          <div style={{ marginTop: 16 }}>
            <div style={{
              background: '#1f3a3a',
              color: uiTheme.colors.accentCorrect,
              padding: '12px 20px',
              borderRadius: uiTheme.borders.borderRadiusMedium,
              border: `1px solid ${uiTheme.colors.accentCorrect}`,
              fontWeight: uiTheme.typography.fontWeightMedium,
              fontSize: uiTheme.typography.fontSizeBase,
              maxWidth: '85%',
            }}>
              {chatMessages[chatMessages.length - 1].text}
            </div>
          </div>
        )}
      </DialogChoiceBox>
    </>
  );
}

const styles = {
  gamePanelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapLarge,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: uiTheme.spacing.gapMedium,
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  headerCenter: {
    textAlign: 'center',
    flex: 1,
  },

  title: {
    margin: 0,
    fontSize: uiTheme.typography.fontSize3XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
  },

  subtitle: {
    margin: '0.5rem 0 0 0',
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
  },

  btn: {
    padding: `${uiTheme.spacing.paddingSmall} ${uiTheme.spacing.paddingMedium}`,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    fontSize: uiTheme.typography.fontSizeSmall,
    fontWeight: uiTheme.typography.fontWeightSemibold,
    cursor: 'pointer',
    border: 'none',
    transition: `all ${uiTheme.transitions.quick}`,
    whiteSpace: 'nowrap',
  },

  btnPrimary: {
    backgroundColor: uiTheme.colors.accentCorrect,
    color: '#ffffff',
  },

  btnSecondary: {
    backgroundColor: uiTheme.colors.backgroundTertiary,
    color: uiTheme.colors.textPrimary,
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  statsPanel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: uiTheme.spacing.gapMedium,
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
    textAlign: 'center',
  },

  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapSmall,
  },

  statLabel: {
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    fontWeight: uiTheme.typography.fontWeightMedium,
  },

  statValue: {
    fontSize: uiTheme.typography.fontSize2XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.accentCorrect,
  },

  definitionPanel: {
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.accentPartial}`,
    borderLeft: `4px solid ${uiTheme.colors.accentPartial}`,
  },

  definitionLabel: {
    margin: 0,
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    marginBottom: uiTheme.spacing.gapSmall,
  },

  definitionText: {
    margin: 0,
    fontSize: uiTheme.typography.fontSizeLarge,
    fontWeight: uiTheme.typography.fontWeightSemibold,
    color: uiTheme.colors.textPrimary,
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapMedium,
    marginTop: uiTheme.spacing.gapMedium,
  },

  text: {
    margin: 0,
    fontSize: uiTheme.typography.fontSizeSmall,
    textAlign: 'center',
  },
};
