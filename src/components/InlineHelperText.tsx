import React from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface InlineHelperTextProps {
  message?: string;
  isError?: boolean;
  className?: string;
  /** Optional id for aria-describedby linkage */
  id?: string;
}

/**
 * Reserves a fixed-height slot to prevent layout shift (CLS) when
 * errors appear / disappear. Uses Framer Motion for a calm fade + slide
 * transition so errors never feel jarring.
 */
export const InlineHelperText: React.FC<InlineHelperTextProps> = ({
  message,
  isError = false,
  className,
  id,
}) => {
  return (
    <div
      className={clsx('min-h-[1.25rem] mt-1', className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {message ? (
          <motion.span
            key={message}
            id={id}
            role={isError ? 'alert' : undefined}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={clsx(
              'text-xs font-medium block',
              isError ? 'text-error' : 'text-textSecondary',
            )}
          >
            {message}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
