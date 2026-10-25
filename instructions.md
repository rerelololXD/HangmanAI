# AI_INSTRUCTIONS.md

## Wordle AI Game (Groq-Powered) — Development Guide


## 🎯 Core Features

### 1. Wordle Game Logic

* 5-letter words initially
* Color feedback system:

  * Green = correct position
  * Yellow = correct letter, wrong position
  * Gray = incorrect letter

### 2. Level System

* Level 1–5: 5-letter common words
* Level 6–10: 6-letter words
* Level 11+: longer + less common words

Difficulty increases by:

* Word length
* Word rarity
* Reduced attempts (optional)

### 3. AI Hint System (Groq API)

* Player can request hints
* AI gives:

  * Subtle clues (NOT direct answers)
  * Difficulty-adjusted hints
  * Encouragement / guidance

---

## ⚙️ Technical Requirements

### Frontend

* React (functional components only)
* TailwindCSS for styling

### Backend (optional but recommended)

* Node.js + Express
* API routes for:

  * Word generation
  * Hint generation (Groq)

### State Management

* Use React hooks
* Keep state minimal and organized

---

## 📁 Project Structure

Follow this structure strictly:

```
/src
  /components
  /pages
  /hooks
  /utils
  /services
  /config
  /game

/api
/tests
/docs

AI_INSTRUCTIONS.md
README.md
```

---

## 🧠 AI Behavior Rules

When generating code, you MUST:

### Code Quality

* Write clean, readable code
* Use meaningful variable names
* Keep functions under 50 lines
* Avoid duplication

### Modularity

* Separate logic from UI
* Use reusable components
* Keep game logic in `/game`

### Explain Code

After generating code:

* Explain what it does
* Explain why it’s structured that way

---

## ⚙️ Configurability Rules

ALL important values must be configurable.

Create `/config/gameConfig.js`:

```js
export const GAME_CONFIG = {
  maxAttempts: 6,
  baseWordLength: 5,
  levelIncreaseStep: 5,
  hintCooldown: 1,
};
```

DO NOT hardcode values inside logic.

---

## 🧩 Game Logic Guidelines

### Word System

* Use word lists grouped by difficulty
* Store in `/data/words.js`

Example:

```js
export const WORDS = {
  easy: ["apple", "bread"],
  medium: ["planet", "silver"],
  hard: ["quantum", "zephyr"]
};
```

---

### Level Scaling Logic

AI must implement:

* Increase word length every few levels
* Switch difficulty pools
* Optionally reduce attempts

---

## 🤖 Groq AI Integration

### Requirements

* Use Groq API for hints
* NEVER reveal the full word
* Hints must:

  * Be vague but helpful
  * Match difficulty level

---

### Example Prompt Template

```txt
You are a Wordle assistant.

The correct word is: {word}

Player guesses:
{guesses}

Level: {level}

Give a hint without revealing the word.
Keep it subtle and helpful.
```

---

### AI Behavior Rules

* No direct answers
* No spelling out letters fully
* Avoid obvious hints at higher levels

---

## 🔄 Development Workflow (VERY IMPORTANT)

Follow this exact process:

---

### STEP 1 — Architecture First

Before coding:

* Explain folder structure
* Explain component breakdown
* Explain state flow

---

### STEP 2 — Build Core Game Logic

* Word selection
* Input handling
* Guess validation
* Feedback system

---

### STEP 3 — Build UI

* Grid display
* Keyboard input
* Feedback colors

---

### STEP 4 — Add Levels

* Level tracking
* Difficulty scaling

---

### STEP 5 — Add AI Hints

* Groq API integration
* Hint button
* Cooldown system

---

### STEP 6 — Polish

* Animations
* Error handling
* UI improvements

---

## 🧪 Testing Rules

AI should:

* Suggest test cases
* Validate edge cases:

  * Invalid words
  * Repeated guesses
  * Game reset

---

## 📘 Documentation Requirements

AI must help generate:

### README.md must include:

* Project overview
* Features
* Tech stack
* Setup instructions
* Screenshots

---

### Code Comments

* Explain complex logic only
* Avoid over-commenting

---

## 🚫 Strict Limitations

AI MUST NOT:

* Dump full project code at once
* Skip explanation
* Hardcode values
* Ignore folder structure
* Use overly complex solutions

---

## ✅ Expected Output Style

When helping:

1. Explain approach first
2. Generate code in parts
3. Explain code after
4. Suggest improvements

---

## 🚀 Goal

By the end of this project, the codebase should be:

* Clean
* Scalable
* Configurable
* Understandable by a junior developer
* Ready to showcase in a portfolio

---

## 🧠 Final Reminder

You are NOT just generating code.

You are:

* Teaching
* Structuring
* Improving engineering thinking

Act like a **senior engineer guiding a junior developer**.
