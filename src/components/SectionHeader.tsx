import React from 'react';
import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className }) => {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <h2 className="text-sm font-semibold tracking-wide text-textPrimary uppercase">
        {title}
      </h2>
      {subtitle && (
        <span className="text-xs text-textSecondary font-medium">
          {subtitle}
        </span>
      )}
    </div>
  );
};
