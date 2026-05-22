import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DURATION, EASE } from '../constants/motion';

interface ResetButtonProps {
  isDisabled?: boolean;
  onClick?: () => void;
}

/**
 * Reset button with smooth enabled/disabled transition.
 *
 * - `min-h-[48px]` touch target for mobile compliance.
 * - `aria-label` for clear screen-reader announcement.
 * - Reduced motion: disables hover/tap motion, keeps CSS transitions.
 */
export const ResetButton: React.FC<ResetButtonProps> = ({
  isDisabled = true,
  onClick,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      aria-label="Reset all fields"
      whileHover={isDisabled || prefersReducedMotion ? {} : { scale: 1.01, y: -1 }}
      whileTap={isDisabled || prefersReducedMotion ? {} : { scale: 0.98 }}
      animate={{
        opacity: isDisabled ? 0.45 : 1,
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : DURATION.normal,
        ease: EASE.out,
      }}
      className={`w-full min-h-[48px] py-3.5 sm:py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm outline-none select-none
        transition-colors duration-200
        focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${
          isDisabled
            ? 'bg-border text-textSecondary/40 cursor-not-allowed'
            : 'bg-primary text-background hover:bg-primaryHover active:bg-primaryHover shadow-lg shadow-primary/10 hover:shadow-primary/25'
        }`}
    >
      Reset
    </motion.button>
  );
};
