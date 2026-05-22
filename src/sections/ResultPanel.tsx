import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <div className="flex justify-between items-center py-2.5 sm:py-3 select-none">
      <div className="flex flex-col gap-0.5">
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
      <div className="text-right pl-4 overflow-hidden">
        <AnimatedValue
          value={String(value)}
          className={`font-extrabold tracking-tight font-sans ${
            isPrimary
              ? 'text-3xl sm:text-4xl md:text-[2.75rem] text-primary'
              : 'text-2xl sm:text-3xl md:text-4xl text-primary/85'
          }`}
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
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.moderate, ease: EASE.out, delay: 0.08 }}
      className="bg-background rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between border border-border/80 h-full gap-6"
    >
      {/* Result rows */}
      <div className="space-y-3 sm:space-y-4">
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

        {/* Subtle separator with refined opacity */}
        <div className="relative py-1">
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
