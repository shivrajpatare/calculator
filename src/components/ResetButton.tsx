import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DURATION, EASE } from '../constants/motion';

interface ResetButtonProps {
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Reset button with smooth enabled/disabled transition.
 *
 * - Uses whileHover / whileTap for tactile feedback when enabled.
 * - The enabled→disabled state change animates opacity so it doesn't
 *   flash abruptly after a reset.
 */
export const ResetButton: React.FC<ResetButtonProps> = ({
  isDisabled = true,
  onClick,
}) => {
  return (
    <motion.button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      whileHover={isDisabled ? {} : { scale: 1.01, y: -1 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      animate={{
        opacity: isDisabled ? 0.45 : 1,
      }}
      transition={{
        duration: DURATION.normal,
        ease: EASE.out,
      }}
      className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm outline-none select-none
        transition-colors duration-200
        focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        ${
          isDisabled
            ? 'bg-border text-textSecondary/40 cursor-not-allowed'
            : 'bg-primary text-background hover:bg-primaryHover shadow-lg shadow-primary/10 hover:shadow-primary/25'
        }`}
    >
      Reset
    </motion.button>
  );
};
