/**
 * GameLayout Component
 * Responsive split layout: Wordle game LEFT / Hangman AI RIGHT
 * Stacks vertically on mobile
 */

import { uiTheme } from '../theme/uiTheme';

export function GameLayout({ gamePanel, hangmanPanel }) {
  return (
    <div style={styles.container}>
      {/* LEFT: Game Panel */}
      <div style={styles.leftPanel}>
        {gamePanel}
      </div>

      {/* RIGHT: Hangman AI Panel */}
      <div style={styles.rightPanel}>
        {hangmanPanel}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: uiTheme.spacing.paddingLarge,
    padding: uiTheme.spacing.paddingLarge,
    minHeight: '100vh',
    backgroundColor: uiTheme.colors.backgroundPrimary,
    
    // Mobile: stack vertically
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: uiTheme.spacing.paddingMedium,
      padding: uiTheme.spacing.paddingMedium,
    },
  },

  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapLarge,
    
    // Mobile: full width
    '@media (max-width: 768px)': {
      order: 1,
    },
  },

  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapLarge,
    
    // Mobile: full width, below game
    '@media (max-width: 768px)': {
      order: 2,
    },
  },
};

// Convert styles to inline style object (since we can't use @media in inline styles directly)
// This is handled by wrapper or use CSS-in-JS library
// For now, return responsive container with media query string for external CSS
export const layoutCSSRules = `
  .game-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${uiTheme.spacing.paddingLarge};
    padding: ${uiTheme.spacing.paddingLarge};
    min-height: 100vh;
    background-color: ${uiTheme.colors.backgroundPrimary};
  }

  .game-layout .left-panel {
    display: flex;
    flex-direction: column;
    gap: ${uiTheme.spacing.gapLarge};
  }

  .game-layout .right-panel {
    display: flex;
    flex-direction: column;
    gap: ${uiTheme.spacing.gapLarge};
  }

  @media (max-width: 768px) {
    .game-layout {
      grid-template-columns: 1fr;
      gap: ${uiTheme.spacing.paddingMedium};
      padding: ${uiTheme.spacing.paddingMedium};
    }

    .game-layout .left-panel {
      order: 1;
    }

    .game-layout .right-panel {
      order: 2;
    }
  }

  @media (max-width: 640px) {
    .game-layout {
      padding: ${uiTheme.spacing.paddingSmall};
      gap: ${uiTheme.spacing.paddingSmall};
    }

    .game-layout .left-panel,
    .game-layout .right-panel {
      gap: ${uiTheme.spacing.gapMedium};
    }
  }
`;
