/**
 * Centralised motion tokens.
 *
 * Every Framer Motion transition in the app references these constants
 * so durations, easings and spring configs stay consistent.
 * Changing a value here ripples through every animation at once.
 */

import type { Transition } from 'framer-motion';

// ── Duration scale (seconds) ─────────────────────────────────────────────────
export const DURATION = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.2,
  moderate: 0.3,
  slow: 0.45,
} as const;

// ── Easing curves ────────────────────────────────────────────────────────────
export const EASE = {
  /** Smooth deceleration — feels responsive on entry */
  out: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Snappy ease-in-out — good for state toggles */
  inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Very gentle spring-like curve for value changes */
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const,
} as const;

// ── Reusable transition presets ──────────────────────────────────────────────

/** Fade + slide-up — used for error messages, helper text */
export const fadeSlideUp: Transition = {
  duration: DURATION.fast,
  ease: EASE.out,
};

/** Quick fade — used for value emphasis pulses */
export const fadeFast: Transition = {
  duration: DURATION.instant,
  ease: EASE.out,
};

/** Standard layout transition — used for button state changes */
export const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 35,
  mass: 0.8,
};

/** Card mount animation */
export const cardMount: Transition = {
  duration: DURATION.moderate,
  ease: EASE.out,
};
