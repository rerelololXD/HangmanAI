# What Changed — Visual Guide

##  Data Flow Comparison

### BEFORE (Simple)
```
wordList.js
  ↓
getRandomWord()
  ↓
"REACT" (string only)
  ↓
Game displays grid
```

### AFTER (Intelligent)
```
dictionary.json
  ↓
wordSelector.selectWordByLevel(level)
  ↓
{
  word: "REACT",
  definition: "to respond or act...",
  difficulty: 1,
  length: 5,
  category: "verb"
}
  ↓
Wordle class stores word + metadata
  ↓
Game displays definition as hint preview
  ↓
Hint system prepares context for AI
```

---

##  User Experience Changes

### BEFORE
```
┌─────────────────┐
│   5-LETTER GAME │
│  Guess the word │
└─────────────────┘

[GRID - 6 attempts]

[INPUT FIELD]
[GUESS BUTTON]
```

### AFTER
```
┌──────────────────────┐
│      WORDLE          │
│  Level 1: Beginner   │
│  Difficulty: Common  │
└──────────────────────┘

┌────────────────────────────────────────┐
│ Hint: a round fruit that grows on trees│
└────────────────────────────────────────┘

[GRID - 6 attempts]

[ HINT (3) BUTTON]    ← NEW
[ATTEMPTS: 0/6]
[Level 1: Beginner]     ← NEW
[Difficulty: Common]    ← NEW

[INPUT FIELD]           (Dynamic length)
[GUESS BUTTON]

[After Win/Lose]
[RETRY LEVEL] [NEXT LEVEL]  ← NEW
```

---

##  File Structure (What Changed)

```
wordle-game/
├── src/
│   ├── data/                           NEW
│   │   └── dictionary.json             NEW (200+ words)
│   │
│   ├── config/
│   │   └── gameConfig.js               UPDATED (levels, hints)
│   │
│   ├── game/
│   │   ├── wordle.js                   UPDATED (level support)
│   │   ├── wordSelector.js             NEW (smart filtering)
│   │   └── wordList.js                - (kept for compatibility)
│   │
│   ├── services/                       NEW
│   │   └── hintService.js              NEW (Groq prep)
│   │
│   ├── hooks/
│   │   └── useWordle.js                UPDATED (level mgmt)
│   │
│   ├── components/
│   │   ├── GameBoard.jsx              - (no changes needed)
│   │   ├── GuessInput.jsx              UPDATED (dynamic length)
│   │   ├── GameStatus.jsx              UPDATED (level info)
│   │   └── App.jsx                     UPDATED (new features)
│   │
│   └── ...
│
└── DICTIONARY_UPGRADE.md               NEW (guide)
```

---

##  Configuration Changes

### gameConfig.js BEFORE
```javascript
export const GAME_CONFIG = {
  WORD_LENGTH: 5,
  MAX_ATTEMPTS: 6,
  STATUS_PLAYING: 'playing',
  STATUS_WIN: 'win',
  STATUS_LOSE: 'lose',
  FEEDBACK_CORRECT: 'correct',
  FEEDBACK_MISPLACED: 'misplaced',
  FEEDBACK_UNUSED: 'unused',
};
```

### gameConfig.js AFTER
```javascript
export const GAME_CONFIG = {
  // ... all the old stuff ...
  
  // NEW: Level configuration (12 levels!)
  LEVEL_SETTINGS: {
    1: { wordLength: 5, maxDifficulty: 1, attempts: 6, name: 'Beginner' },
    2: { wordLength: 5, maxDifficulty: 1, attempts: 6, name: 'Easy' },
    // ... up to level 12 ...
    11: { wordLength: 7, maxDifficulty: 3, attempts: 5, name: 'Expert' },
    12: { wordLength: 7, maxDifficulty: 4, attempts: 5, name: 'Expert+' },
  },
  
  // NEW: Difficulty labels
  DIFFICULTY_LABELS: {
    1: 'Common',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
  },
  
  // NEW: Hint settings
  HINT_CONFIG: {
    maxHintsPerGame: 3,
    hintCooldownSeconds: 30,
    revealLetterCount: 1,
  },
};
```

---

##  State Changes in Hook

### useWordle() BEFORE
```javascript
const {
  word,
  guesses,
  feedbackHistory,
  status,
  attempts,
  maxAttempts,
  isGameOver,
  message,
  submitGuess,
  resetGame,
} = useWordle();
```

### useWordle() AFTER
```javascript
const {
  // Same as before
  word, guesses, feedbackHistory, status, 
  attempts, maxAttempts, isGameOver, message,
  
  //  NEW
  definition,           // Word definition
  level,               // Current level (1-12)
  difficulty,          // Word difficulty (1-4)
  wordLength,          // Dynamic length (5, 6, 7)
  hintsUsed,           // Hints used so far
  hintsRemaining,      // Hints left (3 - used)
  
  // NEW METHODS
  submitGuess,
  resetGame,
  nextLevel,           //  Advance to next level
  requestHint,         //  Request a hint
  getHintContext,      //  Prepare for Groq API
} = useWordle(1);      //  Pass initial level
```

---

##  Component Prop Changes

### GuessInput BEFORE
```jsx
<GuessInput 
  onSubmit={submitGuess} 
  isGameOver={false} 
/>
```

### GuessInput AFTER
```jsx
<GuessInput 
  onSubmit={submitGuess} 
  isGameOver={false}
  wordLength={wordLength}  // NEW (was hardcoded as 5)
/>
```

### GameStatus BEFORE
```jsx
<GameStatus
  message={message}
  attempts={attempts}
  maxAttempts={maxAttempts}
  isGameOver={isGameOver}
  onReset={resetGame}
/>
```

### GameStatus AFTER
```jsx
<GameStatus
  message={message}
  attempts={attempts}
  maxAttempts={maxAttempts}
  isGameOver={isGameOver}
  level={level}              //  NEW
  difficulty={difficulty}    //  NEW
  onReset={resetGame}
  onNextLevel={nextLevel}    //  NEW
/>
```

---

##  Dictionary.json Structure

```json
{
  "words": [
    {
      "word": "APPLE",
      "definition": "a round fruit that grows on trees, typically red or green",
      "difficulty": 1,
      "length": 5,
      "category": "noun"
    },
    {
      "word": "GUITAR",
      "definition": "a stringed musical instrument",
      "difficulty": 2,
      "length": 6,
      "category": "noun"
    },
    {
      "word": "KITCHEN",
      "definition": "a room where food is prepared",
      "difficulty": 3,
      "length": 7,
      "category": "noun"
    }
  ]
}
```

---

##  New Capabilities

### BEFORE
```javascript
// Random word, no context
const game = new Wordle();
console.log(game.word);  // "REACT"
```

### AFTER
```javascript
// Smart word selection with metadata
const game = new Wordle(2);  // Level 2
console.log(game.word);       // "DANCE"
console.log(game.definition); // "to move rhythmically to music"
console.log(game.difficulty); // 2
console.log(game.wordLength); // 5

// Hint context for AI
const hintData = game.getHintData();
// {
//   word: "DANCE",
//   definition: "to move rhythmically to music",
//   guesses: ["BREAD", "SMILE"],
//   level: 2,
//   difficulty: 2,
//   wordLength: 5
// }

// Next level
game.nextLevel(); // Now level 3, new word selected
```

---

##  Quick Testing Checklist

- [ ] Game starts at Level 1
- [ ] Definition shows as hint preview
- [ ] Word is 5 letters (level 1-5)
- [ ] Hint button shows 3 remaining
- [ ] After 6 wrong guesses, "Next Level" button appears
- [ ] Click "Next Level" → Level 2 starts
- [ ] Level 2 still has 5 letters (level 2 config)
- [ ] Click again → Level 6 has 6 letters
- [ ] Config shows level name and difficulty

---

##  Difficulty Progression

| Level | Length | Max Difficulty | Attempts | Example Words |
|-------|--------|-----------------|----------|---|
| 1-3 | 5 | 1 (Common) | 6 | APPLE, BREAD, CHAIR |
| 4-5 | 5 | 2 (Intermediate) | 6 | CHARM, FRAUD, GRIEF |
| 6-10 | 6 | 3 (Advanced) | 6→5 | GUITAR, ISLAND, MASTER |
| 11-12+ | 7 | 4 (Expert) | 5 | KITCHEN, JOURNEY, MYSTIFY |

---

This upgrade maintains all previous functionality while adding:
 12-level progression system
 Smart word filtering by difficulty
 Definitions for better hints
 Hint cooldown tracking
 AI-ready context preparation
 Full configurability
