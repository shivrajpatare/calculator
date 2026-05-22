/**
 * Input sanitisation helpers.
 *
 * These are intentionally *light-touch*. They strip characters that can
 * never be part of a valid numeric value (letters, special characters from
 * paste), but they NEVER reformat the value or move the cursor.
 *
 * Philosophy: let the user type freely; validate *after* — never fight
 * the keyboard.
 */

/**
 * Allow digits, at most one decimal point, and an optional leading minus.
 * Strips everything else (e.g. pasted letters, currency symbols, commas).
 */
export function sanitizeDecimalInput(raw: string): string {
  // Strip anything that isn't a digit, dot, or minus sign
  let cleaned = raw.replace(/[^0-9.\-]/g, '');

  // Allow minus only as the very first character
  const hasLeadingMinus = cleaned.startsWith('-');
  cleaned = cleaned.replace(/-/g, '');
  if (hasLeadingMinus) cleaned = '-' + cleaned;

  // Allow only the first decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }

  return cleaned;
}

/**
 * Like sanitizeDecimalInput but disallows decimals and minus signs.
 * Intended for the people-count field (integer-only UX).
 */
export function sanitizeIntegerInput(raw: string): string {
  return raw.replace(/[^0-9]/g, '');
}

/**
 * Like sanitizeDecimalInput but disallows minus signs.
 * Intended for the bill and tip fields (no negative values expected).
 */
export function sanitizePositiveDecimalInput(raw: string): string {
  // Strip anything that isn't a digit or dot
  let cleaned = raw.replace(/[^0-9.]/g, '');

  // Allow only the first decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }

  return cleaned;
}
