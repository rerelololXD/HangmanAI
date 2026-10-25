<<<<<<< HEAD
# 🎮 Wordle-Style Game with Hangman Visuals - React + Vite + TailwindCSS

A hybrid word guessing game combining Wordle's sequential input system with Hangman visual feedback, featuring AI-powered hints and a progressive leveling system.

# 🎮 Wordle-Style Game with Hangman Visuals

A hybrid word guessing game combining Wordle's sequential input system with Hangman visual feedback, featuring AI-powered hints and a progressive leveling system.

---

## Project Overview

- Players enter letters sequentially to form words (Wordle-style)
- Hangman drawing reacts to incorrect full-word guesses
- AI provides contextual hints (never reveals the answer)
- Difficulty increases through levels with longer, rarer words

---

## Core Game Loop

1. Player types letters to build a word
2. Submits full word for evaluation
3. System checks correctness and gives feedback:
   - Green: correct letter, correct position
   - Yellow: correct letter, wrong position
   - Gray: incorrect letter
   - Hangman visual advances on wrong guesses
4. Optional AI hints can be requested
5. Success advances level; failure may reset or adjust

---

## Features

- Wordle-style sequential input
- Keyboard and UI button input
- Hangman visual feedback
- Leveling system with progressive difficulty
- AI hint system (sentence-based clues)

---

## Project Structure

```
src/
  components/      # UI components
  game/            # Game engine logic
  config/          # Game configuration
  data/            # Word dictionary
  hooks/           # React state hooks
  pages/           # Page components
  services/        # AI and hint logic
  utils/           # Utilities
  App.jsx          # Main orchestrator
  main.jsx         # Entry point
  index.css        # Styles
logs/
  latest_changes.md # Development log (see below)
```

---

## Gameplay Architecture

- State: tracks current guess, submitted guesses, game state (level, attempts, win/lose)
- Input: keyboard and optional UI buttons
- Validation: real-time checks for length, alphabetic, duplicates
- Feedback: green/yellow/gray tiles, Hangman visual advances on wrong guesses

---

## AI System

- Provides contextual, sentence-based hints (never reveals answer)
- Uses Groq API for hint generation
- Hints are safe, never output direct answers or letter positions

---

## Leveling System

- Levels increase word length and rarity
- Level 1-5: 5-letter words
- Level 6-10: 6-letter words
- Level 11+: 7+ letter words

---

## Development Logging System

- File: `/logs/latest_changes.md`
- MUST be updated EVERY time any file is modified
- MUST be overwritten (not appended)
- MUST describe:
  - What changed
  - Why it changed
  - What it affects

### HARD RULE:
If any code change is made and this file is NOT updated, the task is considered FAILED.

---

## AI Execution Rules

- Always read README.md before making changes
- Never ignore the logging system
- Never rewrite entire systems unless explicitly instructed
- Only make targeted, minimal changes
- Preserve all working functionality
- Avoid duplicate logic

---

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`

---

### Game Logic Layer (`/game`)

**`wordle.js`** - The Game Engine
- Pure JavaScript class, no React dependencies
- Handles word selection, validation, feedback generation, and Hangman state
- **Methods**:
  - `submitGuess(guess)` → Returns feedback and updates Hangman
  - `generateFeedback(guess)` → Calculates color codes
  - `getState()` → Returns current game state (including Hangman progress)
  - `reset()` → Starts a new game at current level
- **Why**: Game logic can be tested independently, reused elsewhere

**`wordList.js`** - Word Database
- Organized by difficulty level (`WORD_LISTS.easy`, `.medium`, etc.)
- `getRandomWord(level)` helper for level-appropriate selection
- Supports progressive difficulty scaling

**`wordSelector.js`** - Word Selection Logic
- Manages random selection based on current level
- Ensures variety and appropriate challenge

### State Management (`/hooks`)

**`useWordle.js`** - React Integration
- Wraps game engine with React state
- Manages: guesses, feedback, game status, Hangman progress, current level
- Provides: `submitGuess()`, `resetGame()`, `requestHint()` methods
- Why: Keeps components clean, logic separated

### UI Components (`/components`)

**`GameBoard.jsx`**
- Displays grid of guesses with color feedback
- Shows empty rows for remaining attempts
- Receives: guesses, feedbackHistory, maxAttempts

**`GuessInput.jsx`**
- Sequential letter input for building words
- Real-time validation (alphabetic, correct length)
- Supports keyboard and virtual keyboard input
- Prevents: invalid characters, over-length input

**`GameStatus.jsx`**
- Shows game messages ("You won!", "Game Over!")
- Displays attempt counter and level
- Shows "New Game" button when game ends

**`HintChat.jsx`**
- Displays AI-generated hints
- Manages hint request cooldown
- Integrates with chat interface

**`ChatMessage.jsx`**
- Renders individual chat messages
- Supports different message types (hints, system messages)

**`App.jsx`** - Orchestrator
- Manages game hook and routing
- Passes data to components
- Coordinates component interactions

### Services (`/services`)

**`aiService.js`**
- Handles Groq API integration for hint generation
- Manages API calls and response parsing
- Ensures hints are safe and non-spoiling

**`hintService.js`**
- Processes hint logic and formatting
- Generates contextual clues based on game state

### Pages (`/pages`)

**`Game.jsx`**
- Main game interface combining all components

**`Home.jsx`**
- Landing page with game introduction

**`HowToPlay.jsx`**
- Detailed instructions for gameplay

**`Credits.jsx`**
- Credits and acknowledgments

### Configuration (`/config`)

**`gameConfig.js`** - Single Source of Truth
```javascript
{
  WORD_LENGTH: 5,           // Increases with levels
  MAX_ATTEMPTS: 6,          // Game over threshold
  LEVEL_THRESHOLDS: {       // When to advance levels
    1: 5, 6: 6, 11: 7
  },
  FEEDBACK_CORRECT: 'correct',     // Green
  FEEDBACK_MISPLACED: 'misplaced', // Yellow
  FEEDBACK_UNUSED: 'unused',       // Gray
}
```
- **No hardcoded values** in any other files
- Easy difficulty tweaking
- Level-based configuration

### Data (`/data`)

**`dictionary.json`**
- Comprehensive word dictionary
- Supports multiple languages and difficulty levels
- Used for validation and selection
- Organized by difficulty level (`WORD_LISTS.easy`, `.medium`, etc.)
- `getRandomWord()` helper for random selection
- Future: Each level switches to different difficulty pool

### State Management (`/hooks`)

**`useWordle.js`** - React Integration
- Wraps `Wordle` class with React state
- Manages: guesses, feedback, game status, messages
- Provides: `submitGuess()`, `resetGame()` methods
- Why: Keeps components clean, logic separated

### UI Components (`/components`)

**`GameBoard.jsx`**
- Displays grid of guesses with color feedback
- Shows empty rows for remaining attempts
- Receives: guesses, feedbackHistory, maxAttempts

**`GuessInput.jsx`**
- Text input for user guess
- Real-time validation (alphabetic, 5 letters)
- Prevents: invalid guesses, duplicates
- Receives: onSubmit callback

**`GameStatus.jsx`**
- Shows game messages ("You won!", "Game Over!")
- Displays attempt counter
- Shows "New Game" button when game ends

**`App.jsx`** - Orchestrator
- Manages game hook
- Passes data to components
- Coordinates component interactions

### Configuration (`/config`)

**`gameConfig.js`** - Single Source of Truth
```javascript
{
  WORD_LENGTH: 5,           // Change to 6 or 7 for harder games
  MAX_ATTEMPTS: 6,          // Change to 5 for harder, 8 for easier
  FEEDBACK_CORRECT: 'correct',     // Green
  FEEDBACK_MISPLACED: 'misplaced', // Yellow
  FEEDBACK_UNUSED: 'unused',       // Gray
}
```
- **No hardcoded values** in any other files
- Easy difficulty tweaking
- Future: Load different configs per level

---

## 🧠 How It Works

### Guess Submission Flow

```
Player types letters sequentially: R-E-A-C-T
         ↓
GuessInput validates: correct length? Alphabetic? ✓
         ↓
Player submits full word "REACT"
         ↓
useWordle.submitGuess("REACT")
         ↓
game.submitGuess("REACT")
         ↓
Game Engine:
  1. Validates (hasn't been guessed before)
  2. Generates feedback via generateFeedback()
  3. Updates Hangman visual (advances on incorrect guess)
  4. Checks if correct: if yes → WIN + level up
  5. Checks if maxAttempts reached: if yes → LOSE + possible level reset
         ↓
Returns: { success, feedback, isCorrect, attempts, hangmanState, level }
         ↓
Hook updates state + feedbackHistory + Hangman progress
         ↓
Components re-render:
  - GameBoard shows colored tiles
  - Hangman visual updates
  - GameStatus shows message and level
  - HintChat displays available hints
```

### Feedback Generation Logic

```
Target Word: "REACT"
Player Guess: "GREAT"

Pass 1 - Mark Correct Letters (Green):
  G-R-E-A-T vs R-E-A-C-T
  Position 2: E = E ✓ (CORRECT)
  Position 3: A = A ✓ (CORRECT)
  Result: [?, correct, correct, ?, ?]

Pass 2 - Mark Misplaced & Unused:
  G: In REACT but not at position 0? → No → UNUSED
  R: In REACT but not at position 1? → Yes, at position 0 → MISPLACED
  T: In REACT but not at position 4? → Yes, at position 4 → CORRECT (already marked)
  Result: [unused, correct, correct, misplaced, correct]

Hangman Update: If guess incorrect, advance drawing by 1 stage
```
---

## 🔧 How to Extend This

### Next Features (Planned Enhancements)

#### **Enhanced AI Hints**
Improve `/services/aiService.js` and `/services/hintService.js`:
- Add more sophisticated prompt engineering for Groq API
- Implement hint difficulty scaling based on level
- Add hint cooldown and usage limits
- Create multiple hint types (definition, category, related words)

#### **Advanced Leveling System**
Extend `gameConfig.js`:
```javascript
LEVEL_SETTINGS: {
  1: { wordLength: 5, difficulty: 'easy', maxAttempts: 6 },
  6: { wordLength: 6, difficulty: 'medium', maxAttempts: 5 },
  11: { wordLength: 7, difficulty: 'hard', maxAttempts: 4 },
}
```
Update game logic to dynamically adjust based on level progression.

#### **Hangman Visual Enhancements**
- Add smooth animations for drawing progression
- Implement different Hangman themes/styles
- Add sound effects for visual updates

#### **Multi-Language Support**
Expand `/data/dictionary.json`:
- Add support for multiple languages
- Implement language selection in UI
- Adjust word validation for different alphabets

#### **Statistics & Leaderboards**
Create new components:
- `StatsPage.jsx` - Track win rates, streaks, average attempts
- `Leaderboard.jsx` - Local high scores
- Backend integration for global leaderboards

#### **Virtual Keyboard Component**
Create `/components/Keyboard.jsx`:
- Full virtual keyboard for mobile devices
- Highlight used letters with appropriate colors
- Show green/yellow/gray states on keys
- Touch-friendly button sizes

---

## 🧪 Testing (Future)

Create `/tests`:
```javascript
// test/wordle.test.js
import { Wordle } from '../src/game/wordle';

test('submitGuess returns correct feedback and updates Hangman', () => {
  const game = new Wordle();
  game.word = 'REACT';
  const result = game.submitGuess('GREAT');
  
  expect(result.feedback[2]).toBe('correct');
  expect(result.hangmanState).toBe(1); // Advanced by 1
});
```

---

## 📚 Key Design Principles Applied

✅ **Clean Code**
- Meaningful names: `FEEDBACK_CORRECT` not `fbc`
- Single Responsibility: GameBoard only displays, doesn't calculate
- Keep functions under 50 lines

✅ **No Hardcoding**
- All values in `gameConfig.js`
- Easy to adjust difficulty without touching logic

✅ **Modularity**
- Swap UI ↔ Logic independent
- Logic can be used in other projects (API, mobile, CLI)

✅ **Testability**
- Game logic has no side effects (except Math.random)
- Easy to test: `new Wordle()` → test methods → repeat

✅ **Scalability**
- Adding levels: extend wordList + config
- Adding hints: new service + component
- Adding languages: expand dictionary + validation

---

## 🎓 What You've Built

A **production-grade foundation** that demonstrates:
- ✅ Separation of concerns (logic ≠ UI)
- ✅ Component-driven architecture
- ✅ React hooks for state management
- ✅ Configurable, maintainable code
- ✅ Scalable structure for new features

**Ready to:**
- Add difficulty levels
- Integrate Groq API for hints
- Build backend for scores
- Deploy to production

---

*Built as a scalable, maintainable foundation for portfolio showcase.*
=======
# HangmanAI
Word Guess taiph sheeeeeee
>>>>>>> 97c5bf95ea275bf6bf29f91ab40b0a20b55c2193
