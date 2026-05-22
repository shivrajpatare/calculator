import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Root layout shell.
 *
 * - Provides a skip-to-content link for keyboard/screen-reader users.
 * - Uses semantic <header>, <main>, <footer> landmarks.
 * - Padding is tuned for mobile-first with progressive enhancement.
 * - `min-h-dvh` uses dynamic viewport height so the layout fills the
 *   visible area correctly on mobile browsers where the address bar
 *   collapses.
 */
export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen min-h-dvh bg-background text-textPrimary flex flex-col items-center justify-between px-4 py-3 sm:p-6 md:p-8 selection:bg-primary/20 selection:text-primary">
      {/* Skip link — invisible until focused via keyboard */}
      <a
        href="#calculator"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded-lg focus:text-sm focus:font-bold focus:outline-none"
      >
        Skip to calculator
      </a>

      {/* Branding header */}
      <header className="w-full max-w-4xl flex items-center justify-between py-3 sm:py-4 mb-2 sm:mb-4">
        <div className="flex items-center gap-2" aria-label="Splittr home">
          <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-md bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center" aria-hidden="true">
            <span className="text-background text-xs font-extrabold">%</span>
          </div>
          <span className="font-bold text-sm tracking-widest text-textPrimary uppercase">
            Splittr.
          </span>
        </div>
        <span className="text-[10px] sm:text-xs text-textSecondary font-medium uppercase tracking-wider">
          fellowship 2026
        </span>
      </header>

      {/* Main content area — `id` for skip-link target */}
      <main
        id="calculator"
        className="w-full flex-grow flex items-center justify-center"
        role="main"
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center py-3 sm:py-4 mt-4 sm:mt-6">
        <p className="text-[10px] text-textSecondary uppercase tracking-widest">
          Secured & Optimized Premium Financial Utility
        </p>
      </footer>
    </div>
  );
};
