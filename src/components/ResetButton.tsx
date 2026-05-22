import React from 'react';
import clsx from 'clsx';

interface ResetButtonProps {
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  isDisabled = true,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        "w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-200 outline-none select-none",
        "focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background",
        isDisabled
          ? "bg-border text-textSecondary/40 cursor-not-allowed opacity-50"
          : "bg-primary text-background hover:bg-primaryHover active:scale-[0.98] shadow-lg shadow-primary/10 hover:shadow-primary/20",
        className
      )}
    >
      Reset
    </button>
  );
};
