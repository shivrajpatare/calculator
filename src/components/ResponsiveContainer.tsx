import React from 'react';
import clsx from 'clsx';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx("w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-0", className)}>
      {children}
    </div>
  );
};
