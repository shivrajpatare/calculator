import { VALIDATION, ERROR_MESSAGES } from '../constants/validation';

/**
 * Each validator returns `undefined` when the value is valid, or a
 * human-readable error string when it is not.
 *
 * IMPORTANT DESIGN DECISION — "typing-friendly" validation:
 * An empty string is *not* treated as an error by default. The user is
 * still typing and we don't want to flash errors before they've had a
 * chance to enter anything. The `required` flag can be used when you
 * want to enforce a non-empty state (e.g. on blur or before submission).
 */

// ─── Bill ────────────────────────────────────────────────────────────────────

export function validateBill(
  value: string,
  opts: { required?: boolean } = {},
): string | undefined {
  const trimmed = value.trim();

  // Allow empty while actively editing
  if (trimmed === '') {
    return opts.required ? ERROR_MESSAGES.bill.required : undefined;
  }

  const num = Number(trimmed);

  if (isNaN(num)) {
    return ERROR_MESSAGES.bill.invalid;
  }

  if (num <= 0) {
    return ERROR_MESSAGES.bill.tooLow;
  }

  if (num > VALIDATION.bill.max) {
    return ERROR_MESSAGES.bill.tooHigh;
  }

  return undefined;
}

// ─── Tip Percentage ──────────────────────────────────────────────────────────

export function validateTip(value: string): string | undefined {
  const trimmed = value.trim();

  // Empty custom tip is perfectly valid — a preset may be active instead
  if (trimmed === '') return undefined;

  const num = Number(trimmed);

  if (isNaN(num)) {
    return ERROR_MESSAGES.tip.invalid;
  }

  if (num < VALIDATION.tip.min) {
    return ERROR_MESSAGES.tip.negative;
  }

  if (num > VALIDATION.tip.max) {
    return ERROR_MESSAGES.tip.tooHigh;
  }

  return undefined;
}

// ─── People Count ────────────────────────────────────────────────────────────

export function validatePeople(
  value: string,
  opts: { required?: boolean } = {},
): string | undefined {
  const trimmed = value.trim();

  if (trimmed === '') {
    return opts.required ? ERROR_MESSAGES.people.required : undefined;
  }

  const num = Number(trimmed);

  if (isNaN(num)) {
    return ERROR_MESSAGES.people.invalid;
  }

  // Explicit decimal check — "2.5" passes isNaN but isn't a valid count
  if (!Number.isInteger(num)) {
    return ERROR_MESSAGES.people.decimal;
  }

  if (num < VALIDATION.people.min) {
    return ERROR_MESSAGES.people.tooLow;
  }

  return undefined;
}
