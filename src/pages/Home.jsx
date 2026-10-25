import { useNavigate } from 'react-router-dom';
import { uiTheme } from '../theme/uiTheme';

export function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Logo */}
        <div style={styles.logoSection}>
          <h1 style={styles.mainTitle}>HANGMAN.ai</h1>
          <p style={styles.subtitle}>Guess the word in 6 attempts, or our little friend will face the consequences...</p>
        </div>

        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <button
            onClick={() => navigate('/game')}
            style={{ ...styles.button, backgroundColor: uiTheme.colors.accentCorrect }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = uiTheme.colors.accentCorrect}
          >
            Play Game
          </button>

          <button
            onClick={() => navigate('/how-to-play')}
            style={{ ...styles.button, backgroundColor: uiTheme.colors.accentPartial }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
            onMouseLeave={(e) => e.target.style.backgroundColor = uiTheme.colors.accentPartial}
          >
            How to Play
          </button>

          <button
            onClick={() => navigate('/credits')}
            style={{ ...styles.button, backgroundColor: uiTheme.colors.accentMuted }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
            onMouseLeave={(e) => e.target.style.backgroundColor = uiTheme.colors.accentMuted}
          >
            Credits
          </button>
        </div>

        {/* Feature highlights */}
        <div style={styles.highlightsSection}>
          <div style={styles.highlightItem}>
            <p style={styles.highlightText}>AI-Powered Hints</p>
          </div>
          <div style={styles.highlightItem}>
            <p style={styles.highlightText}>Progressive Levels</p>
          </div>
          <div style={styles.highlightItem}>
            <p style={styles.highlightText}>Simple Hint Systems</p>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>Test your vocabulary, reasoning, and help our AI buddy survive</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: uiTheme.colors.backgroundPrimary,
    padding: uiTheme.spacing.paddingLarge,
  },

  content: {
    maxWidth: '600px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.paddingXLarge,
  },

  logoSection: {
    textAlign: 'center',
    marginBottom: uiTheme.spacing.paddingXLarge,
  },

  mainTitle: {
    fontSize: uiTheme.typography.fontSize3XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
    margin: 0,
    marginBottom: uiTheme.spacing.paddingMedium,
  },

  subtitle: {
    fontSize: uiTheme.typography.fontSizeLarge,
    color: uiTheme.colors.textMuted,
    margin: 0,
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapMedium,
  },

  button: {
    width: '100%',
    padding: `${uiTheme.spacing.paddingMedium} ${uiTheme.spacing.paddingLarge}`,
    fontSize: uiTheme.typography.fontSizeLarge,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: '#ffffff',
    border: 'none',
    borderRadius: uiTheme.borders.borderRadiusMedium,
    cursor: 'pointer',
    transition: `all ${uiTheme.transitions.normal}`,
    transform: 'scale(1)',
  },

  highlightsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: uiTheme.spacing.gapMedium,
    marginTop: uiTheme.spacing.paddingLarge,
  },

  highlightItem: {
    textAlign: 'center',
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  highlightText: {
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    margin: 0,
    fontWeight: uiTheme.typography.fontWeightMedium,
  },

  footer: {
    textAlign: 'center',
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    marginTop: uiTheme.spacing.paddingXLarge,
  },
};
