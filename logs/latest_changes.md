# Latest Changes Log

This file documents the most recent changes made to the codebase. It is
overwritten on each Copilot modification, as required by README.md.

## Recent Update (October 25, 2026) - Restore Gameplay Hook/UI Compatibility

### Files Modified
- `src/hooks/useWordle.js` — Added the flattened game-state fields and aliases
  consumed by Game.jsx while retaining the existing `gameState` and `state`
  return values. Added feedback history, a `chatLoading` alias, and a `text`
  field on chat entries to match current UI consumption.
- `logs/latest_changes.md` — Updated this required latest-change record.

### Why
- Game.jsx destructured fields that the replacement hook returned only inside
  `gameState`, causing a render-time exception when it read `guesses.length`.
- The page also expected per-guess `feedbackHistory`, `chatLoading`, and chat
  message `text`, which were absent or named differently in the hook.

### Impact
- Basic game startup, board rendering, guess feedback display, and the page's
  loading/message bindings now use compatible hook/UI shapes.
- Nested state and existing hook methods remain available for compatibility.
- AI requests remain optional and are not required to initialize gameplay.
