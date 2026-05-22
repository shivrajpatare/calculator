import React from 'react';
import clsx from 'clsx';

interface TipPresetButtonProps {
  value: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const TipPresetButton: React.FC<TipPresetButtonProps> = ({
  value,
  isActive = false,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "py-3 px-4 rounded-xl font-bold text-base transition-all duration-150 outline-none select-none",
        "focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-surface",
        isActive
          ? "bg-primary text-background shadow-lg shadow-primary/20 scale-[0.98]"
          : "bg-background text-textPrimary border border-border hover:bg-surfaceHover hover:border-primary/50 active:scale-95",
        className
      )}
    >
      {value}%
    </button>
  );
};
