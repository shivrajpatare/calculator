import React from 'react';
import clsx from 'clsx';
import { InlineHelperText } from './InlineHelperText';

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  value?: string | number;
  onChange?: (val: string) => void;
}

/**
 * Accessible numeric input field with inline error display.
 *
 * Mobile-optimised:
 * - `min-h-[48px]` ensures touch targets meet WCAG 2.5.5 (44×44 minimum).
 * - `text-base` (16px) prevents iOS auto-zoom on focus.
 * - `focus-visible` ring only shows for keyboard users, not touch.
 * - aria-invalid + aria-describedby link error messages for screen readers.
 */
export const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  error,
  value = '',
  onChange,
  className,
  id,
  placeholder,
  ...props
}) => {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className={clsx('flex flex-col gap-1.5 sm:gap-2 w-full', className)}>
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-textSecondary"
        >
          {label}
        </label>
      </div>

      <div className="relative flex items-center group">
        {icon && (
          <div
            className={clsx(
              'absolute left-4 transition-colors duration-150 pointer-events-none text-textSecondary',
              error ? 'text-error/70' : 'group-focus-within:text-primary',
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        <input
          {...props}
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && errorId ? errorId : undefined}
          className={clsx(
            // Base — min-h-[48px] touch target, text-base to prevent iOS zoom
            'w-full min-h-[48px] bg-background border rounded-xl py-3 sm:py-3.5 text-right font-bold text-base sm:text-lg text-textPrimary tracking-wide outline-none',
            'transition-colors duration-150',
            icon ? 'pl-12 pr-4' : 'px-4',
            // Focus-visible ring only for keyboard navigation
            'focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
            error
              ? 'border-error/60 focus:border-error focus-visible:ring-error/30'
              : 'border-border hover:border-textSecondary/30 focus:border-primary focus-visible:ring-primary/30',
            props.disabled && 'opacity-50 cursor-not-allowed',
          )}
        />
      </div>

      {/* Always present — reserves space even when empty to avoid CLS */}
      <InlineHelperText id={errorId} message={error} isError={!!error} />
    </div>
  );
};
