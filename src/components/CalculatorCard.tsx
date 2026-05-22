import React from 'react';
import clsx from 'clsx';

interface CalculatorCardProps {
  children: React.ReactNode;
  className?: string;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "w-full bg-surface rounded-3xl border border-border shadow-2xl p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};
