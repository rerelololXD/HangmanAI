/**
 * HangmanAI Component
 * Interactive NPC character that represents the Hangman AI
 * Click to open dialogue, visual updates based on wrong guesses
 * HAZARDS: Sharks, Piranha pit, Fire pit, Spikes, Acid pool, Lava lake, Electric water, Dark void
 */

import { useState } from 'react';
import { uiTheme } from '../theme/uiTheme';

const HANGMAN_STAGES = [
  { label: 'Safe', hazard: 'cloud', emoji: '☁️' },
  { label: 'Sharks Below', hazard: 'sharks', emoji: '🦈' },
  { label: 'Piranha Pit', hazard: 'piranha', emoji: '🐟' },
  { label: 'Fire Below', hazard: 'fire', emoji: '🔥' },
  { label: 'Spikes', hazard: 'spikes', emoji: '⚡' },
  { label: 'Acid Pool', hazard: 'acid', emoji: '☢️' },
  { label: 'Lava Lake', hazard: 'lava', emoji: '🌋' },
  { label: 'Electric Water', hazard: 'electric', emoji: '⚡' },
  { label: 'Dark Void', hazard: 'void', emoji: '🕳️' },
];


// Visual state mapping for descent and damage
const DESCENT_STATES = [
  // Attempt 0: fully safe, high above hazard
  { yOffset: 0, showLegs: true, showTorso: true, showHead: true, showArms: true, damage: false },
  // Attempt 1: slightly lower
  { yOffset: 10, showLegs: true, showTorso: true, showHead: true, showArms: true, damage: false },
  // Attempt 2: even lower
  { yOffset: 20, showLegs: true, showTorso: true, showHead: true, showArms: true, damage: false },
  // Attempt 3: contact with hazard
  { yOffset: 30, showLegs: true, showTorso: true, showHead: true, showArms: true, damage: 'contact' },
  // Attempt 4: legs damaged/missing
  { yOffset: 40, showLegs: false, showTorso: true, showHead: true, showArms: true, damage: 'legs' },
  // Attempt 5: torso damaged
  { yOffset: 50, showLegs: false, showTorso: false, showHead: true, showArms: true, damage: 'torso' },
  // Attempt 6: head only (defeat)
  { yOffset: 60, showLegs: false, showTorso: false, showHead: true, showArms: false, damage: 'head' },
];

export function HangmanAI({ wrongGuesses = 0, maxAttempts = 6, onInteract, isGameOver = false, didWin = false }) {
  const [isHovered, setIsHovered] = useState(false);
  // Clamp attempts to max supported
  const attempt = Math.min(wrongGuesses, DESCENT_STATES.length - 1);
  const state = DESCENT_STATES[attempt];
  const isDoomed = attempt === DESCENT_STATES.length - 1;
  const isInDanger = attempt >= 4;

  // Stickman SVG with progressive descent and damage
  const getStickFigureSVG = () => {
    const y = state.yOffset;
    const color = uiTheme.colors.textPrimary;
    const damageColor = '#ef4444';
    const parts = [];
    // Head
    if (state.showHead) {
      parts.push(<circle key="head" cx="50" cy={30 + y} r="12" fill={isDoomed ? damageColor : color} />);
      // Optionally add a sad face or X eyes for defeat
      if (isDoomed) {
        parts.push(<line key="x1" x1={45} y1={27 + y} x2={48} y2={33 + y} stroke={damageColor} strokeWidth="1.5" />);
        parts.push(<line key="x2" x1={48} y1={27 + y} x2={45} y2={33 + y} stroke={damageColor} strokeWidth="1.5" />);
        parts.push(<line key="x3" x1={52} y1={27 + y} x2={55} y2={33 + y} stroke={damageColor} strokeWidth="1.5" />);
        parts.push(<line key="x4" x1={55} y1={27 + y} x2={52} y2={33 + y} stroke={damageColor} strokeWidth="1.5" />);
      }
    }
    // Torso
    if (state.showTorso) {
      parts.push(<line key="body" x1="50" y1={42 + y} x2="50" y2={70 + y} stroke={state.damage === 'torso' ? damageColor : color} strokeWidth="2" />);
    }
    // Arms
    if (state.showArms) {
      parts.push(<line key="larm" x1="50" y1={50 + y} x2="30" y2={60 + y} stroke={color} strokeWidth="2" />);
      parts.push(<line key="rarm" x1="50" y1={50 + y} x2="70" y2={60 + y} stroke={color} strokeWidth="2" />);
    }
    // Legs
    if (state.showLegs) {
      parts.push(<line key="lleg" x1="50" y1={70 + y} x2="35" y2={90 + y} stroke={state.damage === 'legs' ? damageColor : color} strokeWidth="2" />);
      parts.push(<line key="rleg" x1="50" y1={70 + y} x2="65" y2={90 + y} stroke={state.damage === 'legs' ? damageColor : color} strokeWidth="2" />);
    }
    // Optionally: add hazard contact effect at attempt 3
    if (state.damage === 'contact') {
      parts.push(<ellipse key="splash" cx="50" cy={95 + y} rx="18" ry="5" fill="#f59e0b" opacity="0.3" />);
    }
    return parts;
  };

  return (
    <div style={styles.container}>
      {/* Main clickable container */}
      <div
        style={{
          ...styles.interactiveBox,
          backgroundColor: isDoomed ? '#7f1d1d' : isInDanger ? '#7c2d12' : uiTheme.colors.backgroundSecondary,
          borderColor: isInDanger ? uiTheme.colors.accentWrong : uiTheme.colors.borderColor,
          cursor: isGameOver ? 'default' : 'pointer',
          opacity: isGameOver ? 0.6 : 1,
          transform: isHovered && !isGameOver ? 'scale(1.05)' : 'scale(1)',
          transition: `all ${uiTheme.transitions.quick}`,
        }}
        onClick={() => !isGameOver && onInteract?.()}
        onMouseEnter={() => !isGameOver && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Stick figure */}
        <div style={styles.figureContainer}>
          <svg width="100" height="160" viewBox="0 0 100 160" style={styles.svg}>
            {/* Rope (remains fixed) */}
            <line x1="50" y1="0" x2="50" y2={18 + state.yOffset} stroke={uiTheme.colors.textMuted} strokeWidth="1.5" opacity="0.6" />
            {/* Stickman descends with yOffset */}
            {getStickFigureSVG()}
            {/* Hazard surface (visual only, not logic) */}
            <rect x="20" y="140" width="60" height="10" rx="5" fill="#222" stroke="#444" strokeWidth="2" />
            {/* Optionally: hazard color accent */}
            <rect x="20" y="150" width="60" height="6" rx="3" fill="#f59e0b" opacity="0.5" />
          </svg>
        </div>

        {/* AI Status text */}
        <div style={styles.statusText}>
          {didWin ? (
            <p>😅 You made it!</p>
          ) : isDoomed ? (
            <p style={{ color: uiTheme.colors.accentWrong }}>I couldn't hold on...</p>
          ) : isInDanger ? (
            <p style={{ color: uiTheme.colors.accentPartial }}>Help! Click me!</p>
          ) : (
            <p>Click to chat</p>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      <div style={styles.progressContainer}>
        <div style={{ fontSize: '0.75rem', color: uiTheme.colors.textMuted, marginBottom: '0.25rem' }}>
          Pressure: {wrongGuesses}/{maxAttempts}
        </div>
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${(wrongGuesses / maxAttempts) * 100}%`,
              backgroundColor: isInDanger ? uiTheme.colors.accentWrong : uiTheme.colors.accentCorrect,
            }}
          />
        </div>
      </div>

      {/* ...removed tap to interact text... */}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: uiTheme.spacing.gapMedium,
    padding: uiTheme.spacing.paddingLarge,
    backgroundColor: uiTheme.colors.backgroundPrimary,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    minHeight: '550px',
    justifyContent: 'center',
  },

  interactiveBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: uiTheme.spacing.gapSmall,
    padding: uiTheme.spacing.paddingLarge,
    border: `2px solid ${uiTheme.colors.borderColor}`,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    minHeight: '320px',
    minWidth: '250px',
    boxShadow: uiTheme.shadows.softShadow,
  },

  figureContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: uiTheme.spacing.paddingSmall,
  },

  svg: {
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
  },

  statusText: {
    textAlign: 'center',
    color: uiTheme.colors.textPrimary,
    fontSize: uiTheme.typography.fontSizeLarge,
    fontWeight: uiTheme.typography.fontWeightSemibold,
  },

  progressContainer: {
    width: '100%',
    maxWidth: '150px',
  },

  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: uiTheme.colors.backgroundTertiary,
    borderRadius: uiTheme.borders.borderRadiusRound,
    overflow: 'hidden',
    border: `1px solid ${uiTheme.colors.borderColor}`,
  },

  progressFill: {
    height: '100%',
    transition: `width ${uiTheme.transitions.normal}`,
    borderRadius: uiTheme.borders.borderRadiusRound,
  },
};
