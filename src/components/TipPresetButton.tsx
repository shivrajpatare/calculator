import React from 'react';
import { motion } from 'framer-motion';
import { layoutTransition } from '../constants/motion';

interface TipPresetButtonProps {
  value: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Tactile preset button with Framer Motion layout animation.
 *
 * - Active state uses a motion.div overlay so the highlight "travels"
 *   between buttons via layoutId, creating a connected selection feel.
 * - Hover lifts the button subtly via translateY.
 * - Press-down feedback via whileTap scale.
 * - focus-visible ring for keyboard navigation.
 */
export const TipPresetButton: React.FC<TipPresetButtonProps> = ({
  value,
  isActive = false,
  onClick,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={layoutTransition}
      className={`relative py-3 px-4 rounded-xl font-bold text-base outline-none select-none overflow-hidden
        transition-colors duration-150
        focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
        ${
          isActive
            ? 'text-background'
            : 'bg-background text-textPrimary border border-border hover:border-primary/40'
        }`}
    >
      {/* Animated highlight background — shared layoutId creates the
          "travelling pill" effect when switching between presets */}
      {isActive && (
        <motion.div
          layoutId="tipPresetHighlight"
          className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
          transition={layoutTransition}
          style={{ zIndex: 0 }}
        />
      )}
      <span className="relative z-10">{value}%</span>
    </motion.button>
  );
};
