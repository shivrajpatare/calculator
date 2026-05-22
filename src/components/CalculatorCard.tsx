import React from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import { DURATION, EASE } from '../constants/motion';

interface CalculatorCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main card container with a gentle mount animation.
 *
 * Reduced motion: skips the mount animation entirely and renders
 * at full opacity immediately.
 */
export const CalculatorCard: React.FC<CalculatorCardProps> = ({ children, className }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : DURATION.moderate,
        ease: EASE.out,
      }}
      className={clsx(
        'w-full bg-surface rounded-3xl border border-border shadow-2xl shadow-black/30',
        'p-4 sm:p-6 md:p-8',
        'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',
        className,
      )}
    >
      {children}
    </motion.div>
  );
};
