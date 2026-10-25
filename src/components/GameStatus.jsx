import { uiTheme } from '../theme/uiTheme.js';

/**
 * GameStatus Component
 * Displays game message only - buttons are handled in parent component
 */
export function GameStatus({
  message,
  isCorrect,
}) {
  return (
    <div style={styles.container}>
      {/* Main Message */}
      {message && (
        <div style={{
          ...styles.message,
          color: isCorrect ? uiTheme.colors.accentCorrect : uiTheme.colors.accentWrong,
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: uiTheme.spacing.paddingMedium,
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  message: {
    fontSize: uiTheme.typography.fontSizeLarge,
    fontWeight: uiTheme.typography.fontWeightBold,
    margin: 0,
  },
};
