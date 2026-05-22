import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { DURATION, EASE } from '../constants/motion';

interface AnimatedValueProps {
  /** The formatted currency string, e.g. "$12.50" */
  value: string;
  className?: string;
}

/**
 * Renders a currency value with a subtle cross-fade whenever it changes.
 *
 * Reduced motion:
 * - When the user prefers reduced motion, values snap instantly
 *   without fade/blur transitions.
 *
 * Accessibility:
 * - The outer span carries the value as text content so screen
 *   readers always announce the current number.
 */
export const AnimatedValue: React.FC<AnimatedValueProps> = ({ value, className }) => {
  const prefersReducedMotion = useReducedMotion();
  const prevValue = useRef(value);
  const [displayKey, setDisplayKey] = useState(0);

  useEffect(() => {
    if (value !== prevValue.current) {
      prevValue.current = value;
      setDisplayKey((k) => k + 1);
    }
  }, [value]);

  // Reduced motion: render value directly without animation wrapper
  if (prefersReducedMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className} style={{ display: 'inline-block', position: 'relative' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayKey}
          initial={{ opacity: 0.4, y: 6, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -4, filter: 'blur(2px)' }}
          transition={{
            duration: DURATION.fast,
            ease: EASE.out,
          }}
          style={{ display: 'inline-block' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
