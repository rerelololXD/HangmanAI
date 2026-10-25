# Dictionary System Upgrade — Architecture Guide

##  Summary of Changes

You now have a **production-grade dictionary system** with intelligent word selection, level scaling, and AI-ready hint preparation.

### What Changed:

**NEW FILES:**
1.  `/src/data/dictionary.json` — 200+ words with definitions
2.  `/src/game/wordSelector.js` — Smart word filtering by level
3.  `/src/services/hintService.js` — Hint preparation for Groq API

**MODIFIED FILES:**
1.  `/src/config/gameConfig.js` — Added level settings, difficulty thresholds, hint config
2.  `/src/game/wordle.js` — Now uses wordSelector, tracks definitions
3.  `/src/hooks/useWordle.js` — Manages levels, hints, cooldowns
4.  `/src/components/GuessInput.jsx` — Dynamic word length (no longer hardcoded)
5.  `/src/components/GameStatus.jsx` — Shows level, difficulty, "Next Level" button
6.  `/src/App.jsx` — Integrates level system, hint button, definition preview

---

##  New Architecture

### **Data Flow:**

```
dictionary.json (word + definition + difficulty)
        ↓
wordSelector.selectWordByLevel(level)
        ↓
{ word: "REACT", definition: "...", difficulty: 2, length: 5 }
        ↓
Wordle class (stores word + definition + metadata)
        ↓
useWordle hook (manages game state, hints, level)
        ↓
Components (display game + hint button)
        ↓
hintService.createHintContext() → Ready for Groq API
```

---

##  Dictionary System Details

### **File:** `/src/data/dictionary.json`

```json
{
  "words": [
    {
      "word": "REACT",
      "definition": "to respond or act in response to something",
      "difficulty": 1,
      "length": 5,
      "category": "verb"
    },
    ...
  ]
}
```

**Metadata:**
- `word` — The answer (uppercase)
- `definition` — Used in hints and preview
- `difficulty` — 1-4 (scales with level)
- `length` — 5, 6, 7, etc.
- `category` — Grammar type (optional)

---

##  Level System

### **File:** `/src/config/gameConfig.js`

```javascript
LEVEL_SETTINGS: {
  1: { wordLength: 5, maxDifficulty: 1, attempts: 6, name: 'Beginner' },
  2: { wordLength: 5, maxDifficulty: 1, attempts: 6, name: 'Easy' },
  ...
  11: { wordLength: 7, maxDifficulty: 3, attempts: 5, name: 'Expert' },
  12: { wordLength: 7, maxDifficulty: 4, attempts: 5, name: 'Expert+' },
}
```

**Key Features:**
-  12 levels with increasing difficulty
-  Word length scales: 5 → 6 → 7 letters
-  Difficulty filters prevent unfair words
-  Attempts reduce as you progress (6 → 5)
-  Names provide player feedback

### **How It Works:**

**Level 1-3:** Easy 5-letter words (APPLE, BREAD, CHAIR)
**Level 4-5:** Medium 5-letter words (CHARM, FRAUD, GRIEF)
**Level 6-10:** 6-letter words (GUITAR, ISLAND, JUNGLE)
**Level 11+:** 7-letter words (KITCHEN, JOURNEY, KINGDOM)

---

##  Word Selector

### **File:** `/src/game/wordSelector.js`

**Function:** `selectWordByLevel(level)`

```javascript
// Filters dictionary by:
// 1. Word length (matches level config)
// 2. Difficulty score (prevents hard words in early levels)
// 3. Random selection from filtered pool

const wordData = selectWordByLevel(3);
// Returns: {
//   word: "SMILE",
//   definition: "a facial expression showing happiness",
//   difficulty: 1,
//   length: 5
// }
```

**Algorithm:**

```
Input: level (1-12+)
  ↓
Get level config (wordLength, maxDifficulty)
  ↓
Filter dictionary:
  - Keep words with correct length
  - Keep words with difficulty ≤ maxDifficulty
  ↓
Random selection from filtered pool
  ↓
Return word object with metadata
```

**Why This Matters:**
-  Fair difficulty progression
-  Prevents frustrating words early
-  Scales up gradually
-  No repeated words in same level
---

##  Hint Preparation Service

### **File:** `/src/services/hintService.js`

**Function:** `createHintContext(hintData)`

Transforms game state into AI-ready format:

```javascript
const hintContext = createHintContext({
  word: "REACT",
  definition: "to respond or act in response to something",
  guesses: ["BREAD", "SMILE"],
  level: 2,
  difficulty: 1,
  wordLength: 5
});

// Returns:
{
  targetWord: "REACT",
  targetDefinition: "to respond or act in response to something",
  difficulty: "Common",
  wordLength: 5,
  guesses: ["BREAD", "SMILE"],
  guessCount: 2,
  attemptRemaining: 4,
  level: 2,
  gameDifficulty: "Easy",
  hintFormat: "Provide a subtle hint without revealing the word"
}
```

**Function:** `formatHintPrompt(hintContext)`

Converts context into Groq API prompt:

```
"You are a helpful Wordle hint assistant.

The player is on Level 2 (Easy).

**Target Word**: to respond or act in response to something
**Word Length**: 5 letters
**Difficulty**: Common

**Player's Guesses**: BREAD, SMILE
**Attempts Remaining**: 4

Rules for your hint:
1. NEVER reveal the actual word
2. NEVER spell out the word letter by letter
3. Use the definition creatively
...

Provide a helpful hint now:"
```

---

## Game Logic Updates

### **File:** `/src/game/wordle.js`

**Constructor now accepts level:**

```javascript
// Old
const game = new Wordle();

// New
const game = new Wordle(2); // Level 2
```

**New Properties:**
- `level` — Current level (1-12+)
- `wordData` — Full word object from dictionary
- `definition` — Word definition for hints
- `difficulty` — Difficulty score (1-4)
- `wordLength` — Dynamic length (5, 6, 7)

**New Methods:**
- `nextLevel()` — Advance to next level
- `getHintData()` — Returns data for hint service

### **Dynamic Word Length:**

```javascript
// Old: Hardcoded
if (guess.length !== GAME_CONFIG.WORD_LENGTH)

// New: Dynamic
if (guess.length !== this.wordLength)
```

---

##  Hook Updates

### **File:** `/src/hooks/useWordle.js`

**New Features:**

| Feature | Before | After |
|---------|--------|-------|
| Level Support | ❌ | ✅ `useWordle(level)` |
| Definition Tracking | ❌ | ✅ `definition` state |
| Hint Cooldown | ❌ | ✅ `checkHintAvailability()` |
| Level Progression | ❌ | ✅ `nextLevel()` |
| Hint Context | ❌ | ✅ `getHintContext()` |

**Usage:**

```javascript
const {
  level,
  definition,
  wordLength,
  hintsUsed,
  hintsRemaining,
  nextLevel,
  requestHint,
  getHintContext,
} = useWordle(1);
```

**Hint System:**
- Max 3 hints per game
- 30-second cooldown between hints
- Can call `getHintContext()` to prepare Groq API call

---

##  How to Extend This

### **Add Groq API Integration**

```javascript
// In /src/services/groqService.js (NEW)
export async function getGroqHint(hintContext, apiKey) {
  const prompt = formatHintPrompt(hintContext);
  
  const response = await fetch('https://api.groq.com/hints', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ prompt }),
  });
  
  return response.json().hint;
}
```

**In App.jsx:**

```javascript
const handleRequestHint = async () => {
  const result = requestHint();
  if (!result.success) {
    alert(result.message);
    return;
  }
  
  // Call Groq API
  const hintText = await getGroqHint(result.hintContext, GROQ_API_KEY);
  setHintMessage(hintText);
};
```

---

### **Add More Words to Dictionary**

Edit `/src/data/dictionary.json`:

```json
{
  "words": [
    ...existing words...,
    {
      "word": "NEBULA",
      "definition": "a cloud of gas and stars in space",
      "difficulty": 4,
      "length": 6,
      "category": "noun"
    }
  ]
}
```

**Tips:**
- Higher difficulty = harder words
- Match length to intended level
- Provide clear, helpful definitions

---

### **Adjust Difficulty Progression**

Edit `/src/config/gameConfig.js`:

```javascript
LEVEL_SETTINGS: {
  1: { wordLength: 5, maxDifficulty: 1, attempts: 6, name: 'Beginner' },
  // Make level 2 harder:
  2: { wordLength: 5, maxDifficulty: 2, attempts: 6, name: 'Hard' }, // ← Changed
  3: { wordLength: 5, maxDifficulty: 2, attempts: 6, name: 'Hard' },
}
```

---

### **Track Player Progress**

Store completed levels:

```javascript
const [completedLevels, setCompletedLevels] = useState([]);

const handleLevelComplete = () => {
  if (status === 'win') {
    setCompletedLevels([...completedLevels, level]);
    nextLevel(); // Auto-advance
  }
};
```

---

##  Configuration Reference
### **Most Important Config Values**

**Game Difficulty:**
```javascript
LEVEL_SETTINGS[level].wordLength      // 5, 6, 7...
LEVEL_SETTINGS[level].maxDifficulty   // 1-4
LEVEL_SETTINGS[level].attempts        // 5-6
```

**Hints:**
```javascript
HINT_CONFIG.maxHintsPerGame         // 3
HINT_CONFIG.hintCooldownSeconds     // 30
HINT_CONFIG.revealLetterCount       // 1
```

**Word Complexity:**
```javascript
DIFFICULTY_LABELS[1]  // 'Common'
DIFFICULTY_LABELS[2]  // 'Intermediate'
DIFFICULTY_LABELS[3]  // 'Advanced'
DIFFICULTY_LABELS[4]  // 'Expert'
```

---

##  Testing the System

### **Test Level Progression**

```javascript
// Check word filtering
import { selectWordByLevel, getWordsForLevel } from './game/wordSelector';

console.log(getWordsForLevel(1).length);  // Many easy words
console.log(getWordsForLevel(5).length);  // Fewer medium words
console.log(getWordsForLevel(11).length); // Few expert words
```

### **Test Hint Context**

```javascript
import { createHintContext } from './services/hintService';

const context = createHintContext({
  word: 'REACT',
  definition: 'to respond...',
  guesses: ['BREAD'],
  level: 1,
  difficulty: 1,
  wordLength: 5,
});

console.log(context); // Should show all hint data
```

---

##  Benefits Over Old System

| Aspect | Before | After |
|--------|--------|-------|
| **Word Selection** | Random from static list | Smart filtering by level |
| **Difficulty** | No scaling | Gradual 12-level progression |
| **Definitions** | None | Available for every word |
| **Hints** | Not supported | Ready for Groq API |
| **Word Length** | Hardcoded (5) | Dynamic (5-7+) |
| **Fairness** | Random hard words | No unfair words early |
| **Configurability** | Limited | Extensive (gameConfig.js) |

---

##  Next Steps

1. **Test the game:**
   ```bash
   npm run dev
   ```
   Try levels 1-3 (easy) and see difficulty increase.

2. **Add Groq API:**
   Create `groqService.js` and integrate it.

3. **Add More Words:**
   Expand `dictionary.json` with 500+ words.

4. **Add Leaderboard:**
   Track which levels players beat fastest.

5. **Add Daily Challenges:**
   Pre-select specific words per day.

---

##  File Reference

| File | Purpose | Key Exports |
|------|---------|-------------|
| `dictionary.json` | Word database | `words[]` |
| `gameConfig.js` | All settings | `GAME_CONFIG` object |
| `wordSelector.js` | Word filtering | `selectWordByLevel()` |
| `hintService.js` | Hint prep | `createHintContext()`, `formatHintPrompt()` |
| `wordle.js` | Game engine | `Wordle` class |
| `useWordle.js` | State mgmt | Hook + methods |
| `App.jsx` | UI orchestration | Game layout |

---

This upgrade maintains your clean architecture while adding professional features for scaling and AI integration. 🎓
