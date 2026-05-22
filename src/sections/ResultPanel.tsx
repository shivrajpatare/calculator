import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ResetButton } from '../components/ResetButton';
import { AnimatedValue } from '../components/AnimatedValue';
import { DURATION, EASE } from '../constants/motion';

interface ResultRowProps {
  label: string;
  sublabel: string;
  value: string | number;
  /** Visually larger treatment for the primary row */
  isPrimary?: boolean;
}

const ResultRow: React.FC<ResultRowProps> = ({
  label,
  sublabel,
  value,
  isPrimary = false,
}) => {
  const valueStr = String(value);
  const len = valueStr.length;

  // Fluid adaptive typography using clamp() to prevent truncation or wrapping.
  // We use string length to adjust the upper/lower bounds of the clamp.
  const sizeClass = isPrimary
    ? len > 14
      ? 'text-[clamp(1rem,2.5vw,1.5rem)]' // Max 24px
      : len > 11
        ? 'text-[clamp(1.25rem,3.5vw,1.875rem)]' // Max 30px
        : 'text-[clamp(1.5rem,5vw,2.25rem)]' // Max 36px (text-4xl)
    : len > 14
      ? 'text-[clamp(0.875rem,2vw,1.125rem)]' // Max 18px
      : len > 11
        ? 'text-[clamp(1rem,2.5vw,1.5rem)]' // Max 24px
        : 'text-[clamp(1.25rem,4vw,1.875rem)]'; // Max 30px (text-3xl)

  return (
    <div className="flex justify-between items-center py-2.5 sm:py-3 select-none gap-3">
      <div className="flex flex-col gap-0.5 shrink-0">
        <span
          className={`font-semibold tracking-wide uppercase ${
            isPrimary
              ? 'text-sm sm:text-base text-textPrimary'
              : 'text-xs sm:text-sm text-textPrimary'
          }`}
        >
          {label}
        </span>
        <span className="text-[10px] sm:text-xs text-textSecondary font-medium">
          {sublabel}
        </span>
      </div>
      <div className="text-right">
        <AnimatedValue
          value={valueStr}
          className={`font-extrabold tracking-tight font-sans block transition-all duration-300 ${
            isPrimary ? 'text-primary' : 'text-primary/85'
          } ${sizeClass}`}
        />
      </div>
    </div>
  );
};

interface ResultPanelProps {
  tipAmountPerPerson?: string | number;
  totalPerPerson?: string | number;
  grandTotal?: string | number;
  isResetDisabled?: boolean;
  onReset?: () => void;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  tipAmountPerPerson = '$0.00',
  totalPerPerson = '$0.00',
  grandTotal = '$0.00',
  isResetDisabled = true,
  onReset,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : DURATION.moderate,
        ease: EASE.out,
        delay: prefersReducedMotion ? 0 : 0.08,
      }}
      aria-label="Calculation results"
      className="bg-background rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between border border-border/80 h-full gap-4 sm:gap-6"
    >
      {/* Live region — screen readers announce value changes */}
      <div className="space-y-2 sm:space-y-3" aria-live="polite" aria-atomic="false">
        <ResultRow
          label="Tip Amount"
          sublabel="/ person"
          value={tipAmountPerPerson}
        />
        <ResultRow
          label="Total"
          sublabel="/ person"
          value={totalPerPerson}
        />

        {/* Refined separator */}
        <div className="relative py-1" aria-hidden="true">
          <hr className="border-border/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background px-3 text-[9px] uppercase tracking-[0.2em] text-textSecondary/50 font-medium">
              combined
            </span>
          </div>
        </div>

        <ResultRow
          label="Grand Total"
          sublabel="total bill + tip"
          value={grandTotal}
          isPrimary
        />
      </div>

      {/* Reset */}
      <div className="mt-auto pt-2">
        <ResetButton isDisabled={isResetDisabled} onClick={onReset} />
      </div>
    </motion.section>
  );
};
