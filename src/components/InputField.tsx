import React from 'react';
import clsx from 'clsx';

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  value?: string | number;
  onChange?: (val: string) => void;
}

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
  return (
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-textSecondary">
          {label}
        </label>
        {error && (
          <span className="text-xs font-medium text-error animate-fadeIn">
            {error}
          </span>
        )}
      </div>

      <div className="relative flex items-center group">
        {icon && (
          <div className={clsx(
            "absolute left-4 transition-colors duration-150 pointer-events-none text-textSecondary",
            error ? "text-error/70" : "group-focus-within:text-primary"
          )}>
            {icon}
          </div>
        )}

        <input
          {...props}
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            "w-full bg-background border rounded-xl py-3.5 text-right font-bold text-lg text-textPrimary tracking-wide transition-all duration-150 outline-none",
            icon ? "pl-12 pr-4" : "px-4",
            error 
              ? "border-error focus:ring-2 focus:ring-error/20" 
              : "border-border hover:border-textSecondary/30 focus:border-primary focus:ring-2 focus:ring-primary/20",
            props.disabled && "opacity-50 cursor-not-allowed bg-background"
          )}
        />
      </div>
    </div>
  );
};
