import React from 'react';
import { ResetButton } from '../components/ResetButton';

interface ResultRowProps {
  label: string;
  sublabel: string;
  value: string | number;
}

const ResultRow: React.FC<ResultRowProps> = ({ label, sublabel, value }) => {
  return (
    <div className="flex justify-between items-center py-2 sm:py-3 select-none">
      <div className="flex flex-col">
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-textPrimary uppercase">
          {label}
        </span>
        <span className="text-[10px] sm:text-xs text-textSecondary font-medium">
          {sublabel}
        </span>
      </div>
      <div className="text-right pl-4 overflow-hidden">
        <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight block truncate font-sans">
          {value}
        </span>
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
    <section className="bg-background rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between border border-border h-full gap-8">
      {/* Calculated Results Summary Grid */}
      <div className="space-y-4 sm:space-y-6">
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
        
        {/* Subtle separator */}
        <hr className="border-border" />

        <ResultRow
          label="Grand Total"
          sublabel="total bill + tip"
          value={grandTotal}
        />
      </div>

      {/* Action Reset Button */}
      <div className="mt-auto pt-4">
        <ResetButton isDisabled={isResetDisabled} onClick={onReset} />
      </div>
    </section>
  );
};
