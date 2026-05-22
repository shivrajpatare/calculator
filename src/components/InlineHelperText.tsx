import React from 'react';
import clsx from 'clsx';

interface InlineHelperTextProps {
  message?: string;
  isError?: boolean;
  className?: string;
}

export const InlineHelperText: React.FC<InlineHelperTextProps> = ({
  message,
  isError = false,
  className,
}) => {
  // Always reserve space to avoid aggressive layout shifts (CLS) when errors toggle.
  return (
    <div className={clsx("min-h-[1.25rem] mt-1 transition-all duration-200", className)}>
      {message ? (
        <span
          className={clsx(
            "text-xs font-medium animate-fadeIn",
            isError ? "text-error" : "text-textSecondary"
          )}
        >
          {message}
        </span>
      ) : null}
    </div>
  );
};
