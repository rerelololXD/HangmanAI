import { useNavigate } from 'react-router-dom';
import { uiTheme } from '../theme/uiTheme';

export function Credits() {
  const navigate = useNavigate();

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.headerSection}>
          <button
            onClick={() => navigate('/')}
            style={styles.backButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = uiTheme.colors.backgroundTertiary}
            onMouseLeave={(e) => e.target.style.backgroundColor = uiTheme.colors.accentCorrect}
            title="Back to home"
          >
            ← Back
          </button>
          <h1 style={styles.pageTitle}>Credits</h1>
        </div>

        {/* Credits Content */}
        <div style={styles.contentPanel}>
          {/* Game */}
          <div style={styles.creditSection}>
            <h2 style={styles.creditTitle}>The Game</h2>
            <p style={styles.creditText}>
              This is a Wordle-inspired word guessing game with Hangman visuals built with React and modern web technologies.
            </p>
            <p style={{ ...styles.creditText, fontSize: uiTheme.typography.fontSizeSmall, color: uiTheme.colors.textMuted }}>
              Wordle is a game by <strong>Josh Wardle</strong>, now owned by The New York Times Company.
            </p>
          </div>

          {/* Technology Stack */}
          <div style={styles.creditSection}>
            <h2 style={styles.creditTitle}>Technology Stack</h2>
            <div style={styles.gridContainer}>
              <div style={styles.techBox}>
                <h3 style={styles.techTitle}>Frontend</h3>
                <ul style={styles.techList}>
                  <li>• React 18.2.0</li>
                  <li>• React Router 7.13.2</li>
                  <li>• Vite 4.5.14</li>
                  <li>• TailwindCSS 3.3.0</li>
                </ul>
              </div>
              <div style={styles.techBox}>
                <h3 style={styles.techTitle}>AI & APIs</h3>
                <ul style={styles.techList}>
                  <li>• Groq API (AI Hints)</li>
                  <li>• Gemma 2 Model</li>
                  <li>• Natural Language Processing</li>
                  <li>• Context-Aware Hints</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div style={styles.creditSection}>
            <h2 style={styles.creditTitle}>Features</h2>
            <ul style={styles.featureList}>
              <li>✓ Progressive difficulty levels (5 to 7+ letter words)</li>
              <li>✓ AI-powered smart hints using Groq API</li>
              <li>✓ Interactive Hangman AI character with hazard stages</li>
              <li>✓ Level-aware instruction tuning (easy to subtle hints)</li>
              <li>✓ Dialogue system with AI personality</li>
              <li>✓ Session persistence with localStorage</li>
              <li>✓ Responsive split layout design</li>
              <li>✓ Dark theme UI with smooth animations</li>
            </ul>
          </div>

          {/* Development */}
          <div style={styles.creditSection}>
            <h2 style={styles.creditTitle}>Development</h2>
            <p style={styles.creditText}>
              This game was developed as an educational project demonstrating:
            </p>
            <ul style={styles.devList}>
              <li>• Modern React patterns and hooks</li>
              <li>• Component composition and reusability</li>
              <li>• State management with React hooks</li>
              <li>• Third-party API integration</li>
              <li>• Modular theme-driven UI architecture</li>
              <li>• Responsive layout systems</li>
              <li>• Build optimization with Vite</li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div style={styles.creditSection}>
            <h2 style={styles.creditTitle}>Learning Resources</h2>
            <div style={styles.resourcesList}>
              <div style={styles.resourceItem}>
                <h3 style={styles.resourceTitle}>React Documentation</h3>
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  https://react.dev →
                </a>
              </div>
              <div style={styles.resourceItem}>
                <h3 style={styles.resourceTitle}>TailwindCSS</h3>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  https://tailwindcss.com →
                </a>
              </div>
              <div style={styles.resourceItem}>
                <h3 style={styles.resourceTitle}>Groq AI API</h3>
                <a
                  href="https://groq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  https://groq.com →
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footerPanel}>
            <p style={styles.footerText}>
              <strong>Made using React, AI, and modern web tech</strong>
            </p>
            <p style={{ ...styles.footerText, fontSize: uiTheme.typography.fontSizeSmall, marginTop: uiTheme.spacing.paddingSmall }}>
              © 2024 Wordle AI Game. All rights reserved.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={styles.ctaSection}>
          <button
            onClick={() => navigate('/game')}
            style={styles.ctaButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = uiTheme.colors.accentCorrect}
          >
            🎮 Play the Game
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: uiTheme.colors.backgroundPrimary,
    padding: uiTheme.spacing.paddingLarge,
  },

  contentWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.paddingLarge,
  },

  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapMedium,
    marginBottom: uiTheme.spacing.paddingLarge,
  },

  backButton: {
    alignSelf: 'flex-start',
    padding: `${uiTheme.spacing.paddingSmall} ${uiTheme.spacing.paddingMedium}`,
    backgroundColor: uiTheme.colors.accentCorrect,
    color: '#ffffff',
    border: 'none',
    borderRadius: uiTheme.borders.borderRadiusMedium,
    fontSize: uiTheme.typography.fontSizeBase,
    fontWeight: uiTheme.typography.fontWeightSemibold,
    cursor: 'pointer',
    transition: `all ${uiTheme.transitions.quick}`,
  },

  pageTitle: {
    fontSize: uiTheme.typography.fontSize3XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
    margin: 0,
  },

  contentPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapLarge,
    padding: uiTheme.spacing.paddingLarge,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  creditSection: {
    paddingBottom: uiTheme.spacing.paddingLarge,
    borderBottom: `1px solid ${uiTheme.colors.borderColor}`,
  },

  creditTitle: {
    fontSize: uiTheme.typography.fontSize2XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
    margin: `0 0 ${uiTheme.spacing.paddingSmall} 0`,
  },

  creditText: {
    fontSize: uiTheme.typography.fontSizeBase,
    color: uiTheme.colors.textMuted,
    margin: `0 0 ${uiTheme.spacing.paddingSmall} 0`,
    lineHeight: '1.6',
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: uiTheme.spacing.gapMedium,
  },

  techBox: {
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundTertiary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  techTitle: {
    fontSize: uiTheme.typography.fontSizeBase,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
    margin: `0 0 ${uiTheme.spacing.paddingSmall} 0`,
  },

  techList: {
    margin: 0,
    padding: 0,
    paddingLeft: uiTheme.spacing.paddingMedium,
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    listStyle: 'none',
  },

  featureList: {
    margin: 0,
    padding: 0,
    paddingLeft: uiTheme.spacing.paddingMedium,
    fontSize: uiTheme.typography.fontSizeBase,
    color: uiTheme.colors.textMuted,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapSmall,
  },

  devList: {
    margin: 0,
    padding: 0,
    paddingLeft: uiTheme.spacing.paddingMedium,
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapSmall,
  },

  resourcesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapMedium,
  },

  resourceItem: {
    padding: uiTheme.spacing.paddingSmall,
  },

  resourceTitle: {
    fontSize: uiTheme.typography.fontSizeBase,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
    margin: 0,
  },

  link: {
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.accentCorrect,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: `all ${uiTheme.transitions.quick}`,
  },

  footerPanel: {
    textAlign: 'center',
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundTertiary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    borderTop: `1px solid ${uiTheme.colors.accentCorrect}`,
  },

  footerText: {
    fontSize: uiTheme.typography.fontSizeBase,
    color: uiTheme.colors.textMuted,
    margin: 0,
  },

  ctaSection: {
    textAlign: 'center',
  },

  ctaButton: {
    padding: `${uiTheme.spacing.paddingMedium} ${uiTheme.spacing.paddingXLarge}`,
    backgroundColor: uiTheme.colors.accentCorrect,
    color: '#ffffff',
    border: 'none',
    borderRadius: uiTheme.borders.borderRadiusMedium,
    fontSize: uiTheme.typography.fontSizeLarge,
    fontWeight: uiTheme.typography.fontWeightBold,
    cursor: 'pointer',
    transition: `all ${uiTheme.transitions.normal}`,
  },
};
