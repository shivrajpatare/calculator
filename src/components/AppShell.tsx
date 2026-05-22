import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 selection:bg-primary/20 selection:text-primary">
      {/* Top spacing / subtle logo */}
      <header className="w-full max-w-4xl flex items-center justify-between py-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center">
            <span className="text-background text-xs font-extrabold">%</span>
          </div>
          <span className="font-bold text-sm tracking-widest text-textPrimary uppercase">Splittr.</span>
        </div>
        <span className="text-xs text-textSecondary font-medium uppercase tracking-wider"> fellowship 2026</span>
      </header>

      {/* Main Container */}
      <main className="w-full flex-grow flex items-center justify-center">
        {children}
      </main>

      {/* Subtle footer */}
      <footer className="w-full max-w-4xl text-center py-4 mt-6">
        <p className="text-[10px] text-textSecondary uppercase tracking-widest">
          Secured & Optimized Premium Financial Utility
        </p>
      </footer>
    </div>
  );
};
