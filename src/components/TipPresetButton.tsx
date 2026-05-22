import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { layoutTransition } from '../constants/motion';

interface TipPresetButtonProps {
  value: number;
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * Tactile preset button with Framer Motion layout animation.
 *
 * Accessibility:
 * - `aria-pressed` communicates toggle state to screen readers.
 * - `focus-visible` ring for keyboard-only focus indication.
 * - `min-h-[48px]` ensures WCAG touch target compliance.
 *
 * Reduced motion:
 * - The layoutId travelling highlight is disabled when the user
 *   prefers reduced motion. The button falls back to an instant
 *   background swap instead.
 */
export const TipPresetButton: React.FC<TipPresetButtonProps> = ({
  value,
  isActive = false,
  onClick,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      whileHover={prefersReducedMotion ? {} : { y: -1 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
      transition={layoutTransition}
      className={`relative min-h-[48px] py-3 px-4 rounded-xl font-bold text-base outline-none select-none overflow-hidden
        transition-colors duration-150
        focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
        ${
          isActive
            ? 'text-background'
            : 'bg-background text-textPrimary border border-border hover:border-primary/40 active:bg-surfaceHover'
        }`}
    >
      {/* Animated highlight background — layoutId creates the
          "travelling pill" effect between presets */}
      {isActive && (
        <motion.div
          layoutId={prefersReducedMotion ? undefined : 'tipPresetHighlight'}
          className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
          transition={layoutTransition}
          style={{ zIndex: 0 }}
        />
      )}
      <span className="relative z-10">{value}%</span>
    </motion.button>
  );
};
