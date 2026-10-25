import { GAME_CONFIG } from '../config/gameConfig.js';
import { uiTheme } from '../theme/uiTheme.js';

/**
 * GameBoard Component
 * Displays all guesses with color feedback using theme system
 */
export function GameBoard({ guesses, feedbackHistory, wordLength, maxAttempts }) {
  const getFeedbackColor = (feedback) => {
    switch (feedback) {
      case GAME_CONFIG.FEEDBACK_CORRECT:
        return {
          backgroundColor: uiTheme.colors.accentCorrect,
          color: '#ffffff',
          borderColor: uiTheme.colors.accentCorrect,
        };
      case GAME_CONFIG.FEEDBACK_MISPLACED:
        return {
          backgroundColor: uiTheme.colors.accentPartial,
          color: '#ffffff',
          borderColor: uiTheme.colors.accentPartial,
        };
      case GAME_CONFIG.FEEDBACK_UNUSED:
        return {
          backgroundColor: uiTheme.colors.accentWrong,
          color: '#ffffff',
          borderColor: uiTheme.colors.accentWrong,
        };
      default:
        return {
          backgroundColor: uiTheme.colors.backgroundTertiary,
          color: uiTheme.colors.textMuted,
          borderColor: uiTheme.colors.borderColor,
        };
    }
  };

  const tileStyle = (feedback) => ({
    width: uiTheme.components.gridTile.width,
    height: uiTheme.components.gridTile.height,
    display: uiTheme.components.gridTile.display,
    alignItems: uiTheme.components.gridTile.alignItems,
    justifyContent: uiTheme.components.gridTile.justifyContent,
    borderRadius: uiTheme.components.gridTile.borderRadius,
    fontSize: uiTheme.components.gridTile.fontSize,
    fontWeight: uiTheme.components.gridTile.fontWeight,
    border: `2px solid`,
    ...getFeedbackColor(feedback),
    transition: `all ${uiTheme.transitions.normal}`,
    transform: 'scale(1)',
  });

  return (
    <div style={styles.boardContainer}>
      {/* Show all guesses with their feedback */}
      {guesses.map((guess, guessIndex) => (
        <div key={guessIndex} style={styles.guessRow}>
          {guess.split('').map((letter, letterIndex) => (
            <div
              key={letterIndex}
              style={tileStyle(feedbackHistory[guessIndex]?.[letterIndex])}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}

      {/* Show empty rows for remaining attempts */}
      {Array.from({ length: maxAttempts - guesses.length }).map(
        (_, rowIndex) => (
          <div key={`empty-${rowIndex}`} style={styles.guessRow}>
            {Array.from({ length: wordLength }).map((_, letterIndex) => (
              <div
                key={letterIndex}
                style={{
                  ...tileStyle(null),
                  backgroundColor: uiTheme.colors.backgroundTertiary,
                }}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

const styles = {
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapSmall,
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  guessRow: {
    display: 'flex',
    gap: uiTheme.spacing.gapSmall,
    justifyContent: 'center',
  },
};
