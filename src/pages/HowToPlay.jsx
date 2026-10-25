import { useNavigate } from 'react-router-dom';
import { uiTheme } from '../theme/uiTheme';

export function HowToPlay() {
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
          <h1 style={styles.pageTitle}>How to Play</h1>
        </div>

        {/* Rules */}
        <div style={styles.contentPanel}>
          {/* Rule 1 */}
          <div style={{ ...styles.ruleSection, borderLeftColor: uiTheme.colors.accentCorrect }}>
            <h2 style={styles.ruleTitle}>The Goal</h2>
            <p style={styles.ruleText}>
              Guess the word in 6 attempts or fewer. Each time you submit a guess, you get feedback about your letters.
            </p>
          </div>

          {/* Rule 2 */}
          <div style={{ ...styles.ruleSection, borderLeftColor: uiTheme.colors.accentPartial }}>
            <h2 style={styles.ruleTitle}>Color Feedback</h2>
            <div style={styles.feedbackContainer}>
              <div style={styles.feedbackItem}>
                <div style={{ ...styles.tileSample, backgroundColor: uiTheme.colors.accentCorrect }}>A</div>
                <p style={styles.ruleText}>
                  <strong>Green:</strong> Correct letter in the correct position
                </p>
              </div>
              <div style={styles.feedbackItem}>
                <div style={{ ...styles.tileSample, backgroundColor: uiTheme.colors.accentPartial }}>A</div>
                <p style={styles.ruleText}>
                  <strong>Yellow:</strong> Correct letter in the wrong position
                </p>
              </div>
              <div style={styles.feedbackItem}>
                <div style={{ ...styles.tileSample, backgroundColor: uiTheme.colors.accentWrong }}>A</div>
                <p style={styles.ruleText}>
                  <strong>Gray:</strong> Letter is not in the word
                </p>
              </div>
            </div>
          </div>

          {/* Rule 3 */}
          <div style={{ ...styles.ruleSection, borderLeftColor: uiTheme.colors.accentCorrect }}>
            <h2 style={styles.ruleTitle}>AI-Powered Hints</h2>
            <p style={styles.ruleText}>
              You get hints through an <strong>Interactive Hangman AI</strong>. Click the character to interact and request contextual clues.
            </p>
            <div style={styles.infoBox}>
              <p style={styles.infoTitle}>How the AI Hint Works:</p>
              <ul style={styles.infoList}>
                <li>✓ Click the Hangman AI character to open dialogue</li>
                <li>✓ The AI generates natural sentence-based clues</li>
                <li>✓ Replaces the target word with "______"</li>
                <li>✓ Difficulty adjusts based on your level</li>
                <li>✓ Limited hints to encourage strategic thinking</li>
              </ul>
            </div>
            <p style={styles.exampleText}>
              <strong>Example:</strong> For "EXAMINE" (to look at closely), the AI might say: <br/>
              <em>"Please ______ this document carefully for errors."</em>
            </p>
            <p style={styles.hintNote}>
              🎯 Hint Difficulty: Easy on Level 1-5, Medium on Level 6-10, Hard on Level 11+
            </p>
          </div>

          {/* Rule 4 */}
          <div style={{ ...styles.ruleSection, borderLeftColor: uiTheme.colors.accentPartial }}>
            <h2 style={styles.ruleTitle}>Levels & Difficulty</h2>
            <p style={styles.ruleText}>
              <strong>Levels 1-5:</strong> 5-letter words, easier AI hints, 6 attempts
            </p>
            <p style={styles.ruleText}>
              <strong>Levels 6-10:</strong> 6-letter words, moderate AI hints, 5-6 attempts
            </p>
            <p style={styles.ruleText}>
              <strong>Levels 11+:</strong> 7+ letter words, subtle AI hints, 5 attempts
            </p>
            <p style={{ ...styles.ruleText, fontSize: uiTheme.typography.fontSizeSmall }}>
              Leveling is automatic when you win. Each level resets the board, hints, and the Hangman Regenerates. If you lose, press <strong>Try Again</strong> to replay at the same difficulty.
            </p>
          </div>

          {/* Rule 5 */}
          <div style={{ ...styles.ruleSection, borderLeftColor: uiTheme.colors.accentWrong }}>
            <h2 style={styles.ruleTitle}>Hangman Visual System</h2>
            <p style={styles.ruleText}>
              The Hangman AI is trapped over increasingly dangerous hazards:
            </p>
            <ul style={styles.hazardList}>
              <li>Sharks • Piranhas • Fire • Spikes</li>
              <li>Acid • Lava • Electric Water • Dark Void</li>
            </ul>
            <p style={{ ...styles.ruleText, fontStyle: 'italic' }}>
              Each wrong guess advances the Hangman deeper into danger. The more wrong guesses, the more desperate the AI becomes—reflected in their dialogue!
            </p>
          </div>

          {/* Hint Difficulty Levels */}
          <div style={{ ...styles.ruleSection, borderLeftColor: uiTheme.colors.accentPartial }}>
            <h2 style={styles.ruleTitle}>Hint Difficulty by Level</h2>
            <div style={styles.difficultyGrid}>
              <div style={styles.difficultyBox}>
                <p style={styles.difficultyTitle}>Levels 1-5 (Easy)</p>
                <p style={styles.difficultyText}>Simple, direct hints that clearly relate to the definition. Perfect for learning.</p>
              </div>
              <div style={styles.difficultyBox}>
                <p style={styles.difficultyTitle}>Levels 6-10 (Medium)</p>
                <p style={styles.difficultyText}>Moderately abstract hints requiring some thought and reasoning.</p>
              </div>
              <div style={styles.difficultyBox}>
                <p style={styles.difficultyTitle}>Levels 11+ (Hard)</p>
                <p style={styles.difficultyText}>Subtle, tricky hints designed to challenge your thinking.</p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div style={styles.tipsSection}>
            <h3 style={styles.tipsTitle}>Pro Tips (Made by the AI)</h3>
            <ul style={styles.tipsList}>
              <li>✓ Start with common letters like E, A, R, O, T, N, S</li>
              <li>✓ Use feedback from each guess to eliminate possibilities</li>
              <li>✓ Think about word patterns and common letter combinations</li>
              <li>✓ Use AI hints strategically when stuck, not immediately</li>
              <li>✓ Pay close attention to hint wording for clues</li>
              <li>✓ At higher levels, hints are trickier—read carefully!</li>
              <li>✓ Watch the Hangman's desperation grow—it's fun feedback!</li>
            </ul>
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
            🎮 Ready to Play?
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
    maxWidth: '900px',
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

  ruleSection: {
    paddingLeft: uiTheme.spacing.paddingLarge,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    paddingBottom: uiTheme.spacing.paddingMedium,
    borderBottom: `1px solid ${uiTheme.colors.borderColor}`,
  },

  ruleTitle: {
    fontSize: uiTheme.typography.fontSize2XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
    margin: `0 0 ${uiTheme.spacing.paddingSmall} 0`,
  },

  ruleText: {
    fontSize: uiTheme.typography.fontSizeBase,
    color: uiTheme.colors.textMuted,
    margin: `0 0 ${uiTheme.spacing.paddingSmall} 0`,
    lineHeight: '1.6',
  },

  feedbackContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapSmall,
  },

  feedbackItem: {
    display: 'flex',
    alignItems: 'center',
    gap: uiTheme.spacing.gapMedium,
    marginBottom: uiTheme.spacing.paddingSmall,
  },

  tileSample: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: uiTheme.borders.borderRadiusSmall,
    flexShrink: 0,
  },

  infoBox: {
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundTertiary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.accentCorrect}`,
    marginTop: uiTheme.spacing.paddingSmall,
    marginBottom: uiTheme.spacing.paddingSmall,
  },

  infoTitle: {
    fontSize: uiTheme.typography.fontWeightSemibold,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
    margin: `0 0 ${uiTheme.spacing.paddingSmall} 0`,
  },

  infoList: {
    margin: 0,
    padding: 0,
    paddingLeft: uiTheme.spacing.paddingMedium,
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    listStyle: 'none',
  },

  exampleText: {
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    margin: uiTheme.spacing.paddingSmall,
    fontStyle: 'italic',
  },

  hintNote: {
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    margin: uiTheme.spacing.paddingSmall,
  },

  hazardList: {
    margin: 0,
    padding: 0,
    fontSize: uiTheme.typography.fontSizeBase,
    color: uiTheme.colors.textMuted,
    listStyle: 'none',
    lineHeight: '1.8',
  },

  difficultyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: uiTheme.spacing.gapMedium,
    marginTop: uiTheme.spacing.paddingSmall,
  },

  difficultyBox: {
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundTertiary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  difficultyTitle: {
    fontSize: uiTheme.typography.fontSizeBase,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
    margin: 0,
    marginBottom: uiTheme.spacing.paddingSmall,
  },

  difficultyText: {
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    margin: 0,
  },

  tipsSection: {
    padding: uiTheme.spacing.paddingMedium,
    backgroundColor: uiTheme.colors.backgroundTertiary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    borderTop: `2px solid ${uiTheme.colors.accentCorrect}`,
    marginTop: uiTheme.spacing.paddingLarge,
  },

  tipsTitle: {
    fontSize: uiTheme.typography.fontSize2XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.accentCorrect,
    margin: `0 0 ${uiTheme.spacing.paddingMedium} 0`,
  },

  tipsList: {
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
