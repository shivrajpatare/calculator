import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DURATION, EASE } from '../constants/motion';

interface AnimatedValueProps {
  /** The formatted currency string, e.g. "$12.50" */
  value: string;
  className?: string;
}

/**
 * Renders a currency value with a subtle cross-fade whenever it changes.
 *
 * Design intent:
 * - Values don't just "snap" — they transition with a quick fade so
 *   the user perceives the update as smooth and intentional.
 * - The animation is fast enough (150ms) to feel instantaneous but
 *   slow enough to register emotionally.
 * - Layout is stable: the container never changes size during transition.
 */
export const AnimatedValue: React.FC<AnimatedValueProps> = ({ value, className }) => {
  // Track the previous value to detect actual changes
  const prevValue = useRef(value);
  const [displayKey, setDisplayKey] = useState(0);

  useEffect(() => {
    if (value !== prevValue.current) {
      prevValue.current = value;
      setDisplayKey((k) => k + 1);
    }
  }, [value]);

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
