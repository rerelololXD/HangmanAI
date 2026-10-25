import { useState } from 'react';
import { uiTheme } from '../theme/uiTheme.js';

/**
 * GuessInput Component
 * Handles user input for guesses with validation feedback
 */
export function GuessInput({ onSubmit, isGameOver, wordLength }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();

    // Only allow alphabetic characters and max length
    if (/^[A-Z]*$/.test(value) && value.length <= wordLength) {
      setInput(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.length !== wordLength) {
      setError(`Enter ${wordLength} letters`);
      return;
    }

    const result = onSubmit(input);
    if (result.success) {
      setInput('');
      setError('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={styles.form}
    >
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          disabled={isGameOver}
          placeholder={`Enter ${wordLength}-letter word`}
          maxLength={wordLength}
          style={{ ...styles.input, ...(error && styles.inputError) }}
        />
        <button
          type="submit"
          disabled={isGameOver || input.length !== wordLength}
          style={{
            ...styles.button,
            backgroundColor: isGameOver || input.length !== wordLength ? uiTheme.colors.accentMuted : uiTheme.colors.accentCorrect,
            cursor: isGameOver || input.length !== wordLength ? 'not-allowed' : 'pointer',
            opacity: isGameOver || input.length !== wordLength ? 0.6 : 1,
          }}
        >
          Guess
        </button>
      </div>
      {error && <p style={styles.errorMessage}>{error}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: uiTheme.spacing.gapSmall,
  },

  inputGroup: {
    display: 'flex',
    gap: uiTheme.spacing.gapSmall,
    width: '100%',
  },

  input: {
    flex: 1,
    padding: uiTheme.spacing.paddingMedium,
    border: `2px solid ${uiTheme.colors.borderColor}`,
    borderRadius: uiTheme.borders.borderRadiusMedium,
    fontSize: uiTheme.typography.fontSize2XL,
    fontWeight: uiTheme.typography.fontWeightBold,
    textAlign: 'center',
    backgroundColor: uiTheme.colors.backgroundTertiary,
    color: uiTheme.colors.textPrimary,
    textTransform: 'uppercase',
    transition: `all ${uiTheme.transitions.quick}`,
    outline: 'none',
  },

  inputError: {
    borderColor: uiTheme.colors.accentWrong,
    backgroundColor: '#3a1a1a',
  },

  button: {
    padding: `${uiTheme.spacing.paddingSmall} ${uiTheme.spacing.paddingLarge}`,
    backgroundColor: uiTheme.colors.accentCorrect,
    color: '#ffffff',
    border: 'none',
    borderRadius: uiTheme.borders.borderRadiusMedium,
    fontSize: uiTheme.typography.fontSizeBase,
    fontWeight: uiTheme.typography.fontWeightBold,
    transition: `all ${uiTheme.transitions.quick}`,
  },

  errorMessage: {
    marginTop: uiTheme.spacing.paddingSmall,
    fontSize: uiTheme.typography.fontSizeSmall,
    color: uiTheme.colors.accentWrong,
    textAlign: 'center',
  },
};
