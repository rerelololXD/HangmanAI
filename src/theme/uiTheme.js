/**
 * UI Theme System
 * Centralized design tokens for all frontend components
 * Acts as a CSS-like configuration
 */

export const uiTheme = {
  // COLORS
  colors: {
    backgroundPrimary: '#0f1419',      // Dark, clean background
    backgroundSecondary: '#1a1f26',    // Slightly lighter panels
    backgroundTertiary: '#242a33',     // Hover/active states
    textPrimary: '#e0e6ed',            // Main text
    textMuted: '#8b95a5',              // Secondary text
    textInverse: '#0f1419',            // Text on light backgroundsh
    accentCorrect: '#10b981',          // Green for correct
    accentPartial: '#f59e0b',          // Yellow for partial
    accentWrong: '#ef4444',            // Red for wrong
    accentMuted: '#6b7280',            // Gray for inactive
    borderColor: '#374151',            // Border color
    shadowColor: 'rgba(0, 0, 0, 0.5)',  // Shadow color
  },

  // SPACING (in rem units)
  spacing: {
    paddingSmall: '0.5rem',    // 8px
    paddingMedium: '1rem',     // 16px
    paddingLarge: '1.5rem',    // 24px
    paddingXLarge: '2rem',     // 32px
    gapSmall: '0.5rem',        // 8px
    gapMedium: '1rem',         // 16px
    gapLarge: '1.5rem',        // 24px
  },

  // BORDERS
  borders: {
    borderRadiusSmall: '0.375rem',   // 6px
    borderRadiusMedium: '0.5rem',    // 8px
    borderRadiusLarge: '1rem',       // 16px
    borderRadiusRound: '9999px',     // Full round
  },

  // TYPOGRAPHY
  typography: {
    fontSizeSmall: '0.875rem',      // 14px
    fontSizeBase: '1rem',           // 16px
    fontSizeLarge: '1.125rem',      // 18px
    fontSizeXL: '1.25rem',          // 20px
    fontSize2XL: '1.5rem',          // 24px
    fontSize3XL: '2rem',            // 32px
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    fontWeightBold: '700',
  },

  // SHADOWS
  shadows: {
    softShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    panelShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
    hoverShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    glowShadow: '0 0 30px rgba(16, 185, 129, 0.2)',
  },

  // TRANSITIONS
  transitions: {
    quick: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  // COMPONENT STYLES
  components: {
    panel: {
      backgroundColor: '#1a1f26',
      borderRadius: '0.5rem',
      padding: '1rem',
      border: '1px solid #374151',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    },

    button: {
      base: {
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        border: 'none',
        transition: '150ms ease-in-out',
        textAlign: 'center',
      },
      primary: {
        backgroundColor: '#10b981',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#059669',
        },
      },
      secondary: {
        backgroundColor: '#242a33',
        color: '#e0e6ed',
        border: '1px solid #374151',
        '&:hover': {
          backgroundColor: '#2d333e',
        },
      },
      disabled: {
        backgroundColor: '#374151',
        color: '#8b95a5',
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },

    dialogBox: {
      backgroundColor: '#1a1f26',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      border: '1px solid #374151',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      maxHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
    },

    gridTile: {
      width: '3rem',
      height: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0.375rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      border: '2px solid #374151',
    },
  },

  // BREAKPOINTS
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },
};

/**
 * Helper: Convert theme object to inline styles
 * Usage: Object.assign({}, styles.panel)
 */
export const createStyles = (base, modifier = {}) => ({
  ...base,
  ...modifier,
});

export default uiTheme;
