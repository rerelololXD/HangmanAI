import { uiTheme } from '../theme/uiTheme';

/**
 * DialogChoiceBox
 * Reusable dialogue box with dynamic options and AI response system
 */
export function DialogChoiceBox({
  isOpen,
  onClose,
  options = [],
  aiMessage = '',
  isLoading = false,
  children
}) {
  return (
    <>
      {isOpen && (
        <>
          <div style={styles.backdrop} onClick={onClose} />

          {/* Choices ABOVE dialog */}
          <div style={styles.choicesContainer}>
            <div style={styles.choicesInner}>
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  style={styles.choiceButton}
                  onClick={opt.onSelect}
                  disabled={isLoading}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        style={{
          ...styles.dialogBox,
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          animation: isOpen
            ? `slideUp ${uiTheme.transitions.normal} ease-out`
            : 'none',
        }}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>Hang</h2>

          <button
            onClick={onClose}
            style={styles.closeButton}
            title="Close dialogue (ESC)"
          >
            ✕
          </button>
        </div>

        <div style={styles.dialogContainer}>
          <div style={styles.aiMessage}>
            <div style={styles.messageBubble}>{aiMessage}</div>
          </div>

          {children}
        </div>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 40,
  },

  dialogBox: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderTopLeftRadius: uiTheme.borders.borderRadiusLarge,
    borderTopRightRadius: uiTheme.borders.borderRadiusLarge,
    border: `1px solid ${uiTheme.colors.borderColor}`,
    borderBottomWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '60vh',
    transition: `transform ${uiTheme.transitions.normal} ease-in-out`,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: uiTheme.spacing.paddingLarge,
    borderBottom: `1px solid ${uiTheme.colors.borderColor}`,
    backgroundColor: uiTheme.colors.backgroundTertiary,
  },

  title: {
    margin: 0,
    fontSize: uiTheme.typography.fontSize2XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    color: uiTheme.colors.textPrimary,
  },

  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: uiTheme.colors.textMuted,
  },

  dialogContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: uiTheme.spacing.paddingLarge,
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapLarge,
  },

  aiMessage: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  messageBubble: {
    backgroundColor: uiTheme.colors.backgroundTertiary,
    color: uiTheme.colors.textPrimary,
    padding: `${uiTheme.spacing.paddingMedium} ${uiTheme.spacing.paddingLarge}`,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `1px solid ${uiTheme.colors.borderColor}`,
    maxWidth: '85%',
    lineHeight: '1.5',
  },

  /* CHOICES */
  choicesContainer: {
    position: 'fixed',
    left: 0,
    right: 0,
    zIndex: 55,
    display: 'flex',
    justifyContent: 'flex-start',
    bottom: 'calc(25vh + 8px)',
    paddingLeft: 'max(16px, 8vw)',
    paddingRight: 'max(16px, 8vw)',
  },

  choicesInner: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
  },

  choiceButton: {
    padding: `${uiTheme.spacing.paddingSmall} ${uiTheme.spacing.paddingMedium}`,
    backgroundColor: uiTheme.colors.accentPartial,
    color: uiTheme.colors.textOnAccent,
    border: 'none',
    borderRadius: uiTheme.borders.borderRadiusLarge,
    cursor: 'pointer',
    fontSize: uiTheme.typography.fontSizeBase,
    fontWeight: uiTheme.typography.fontWeightSemibold,
    boxShadow: uiTheme.shadows.lightShadow,
  },
};