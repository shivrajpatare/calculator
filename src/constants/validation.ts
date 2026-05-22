/**
 * Centralized validation constraints for the tip calculator.
 *
 * These constants define the acceptable bounds for every input field.
 * They are consumed by both the validation utilities and, optionally,
 * by the UI layer for hinting (e.g. placeholder text, aria-valuemax).
 */

export const VALIDATION = {
  /** Bill amount must be a positive number. Capped at ~1 trillion to prevent
   *  pathological inputs that stress layout or result in impractical numbers. */
  bill: {
    min: 0.01,
    max: 999999999999,
  },

  /**
   * Tip percentage upper bound.
   *
   * 200 % was chosen intentionally — it is generous enough to cover
   * extreme-generosity scenarios (charity events, exceptional service)
   * while still guarding against accidental or paste-induced values like
   * "10000". A 100 % cap would feel restrictive for power-users.
   */
  tip: {
    min: 0,
    max: 200,
  },

  /** People count must be a positive integer. */
  people: {
    min: 1,
  },
} as const;

/**
 * Human-readable, concise error messages.
 *
 * Each message is written in plain language to feel helpful rather than
 * technical.  They intentionally avoid the generic "Invalid input" pattern
 * and instead tell the user *what* to fix.
 */
export const ERROR_MESSAGES = {
  bill: {
    required: 'Enter a bill amount',
    invalid: 'Enter a valid number',
    tooLow: 'Bill must be greater than $0',
    tooHigh: 'Bill amount is too large',
  },
  tip: {
    invalid: 'Enter a valid tip percentage',
    tooHigh: `Tip can't exceed ${200}%`,
    negative: "Tip can't be negative",
  },
  people: {
    required: 'Enter the number of people',
    invalid: 'Enter a valid whole number',
    tooLow: 'Must be at least 1 person',
    decimal: 'People count must be a whole number',
  },
} as const;
