/**
 * HazardDisplay Component
 * Placeholder for displaying hazard visual information during gameplay
 * Will be used to show custom visual hazard representations
 */

import { uiTheme } from '../theme/uiTheme';

export function HazardDisplay({ level = 1, isActive = false }) {
  return (
    <div style={styles.container}>
      <div style={styles.hazardBox}>
        <p style={styles.label}>Hazard Display Area</p>
        <div style={styles.placeholder}>
          {/* Placeholder for custom hazard assets */}
          <div style={{ fontSize: '3rem', opacity: 0.4 }}>⚠️</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '150px',
    padding: uiTheme.spacing.paddingMedium,
  },

  hazardBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '300px',
    padding: uiTheme.spacing.paddingLarge,
    backgroundColor: uiTheme.colors.backgroundSecondary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    border: `2px dashed ${uiTheme.colors.borderColor}`,
    gap: uiTheme.spacing.gapMedium,
  },

  label: {
    margin: 0,
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.textMuted,
    fontWeight: uiTheme.typography.fontWeightSemibold,
    textAlign: 'center',
  },

  placeholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '80px',
  },
};
