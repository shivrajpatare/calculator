export default function App() {
  return (
    <main className="min-h-screen bg-background text-textPrimary flex items-center justify-center p-4 sm:p-8">
      {/* Container constraint for the single-screen calculator */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface rounded-3xl shadow-2xl p-6 sm:p-8 border border-border">
        
        {/* Left Side: Input Form Scaffold */}
        <section className="flex flex-col gap-6">
          <header>
            <h1 className="text-2xl font-semibold tracking-tight">Tip Calculator</h1>
            <p className="text-sm text-textSecondary mt-1">Calculate your share easily</p>
          </header>
          
          <div className="space-y-4">
            <p className="text-sm text-textSecondary italic">Input form goes here...</p>
          </div>
        </section>

        {/* Right Side: Output Summary Scaffold */}
        <section className="bg-background rounded-2xl p-6 flex flex-col justify-between border border-border">
          <div className="space-y-4">
            <p className="text-sm text-textSecondary italic">Live output goes here...</p>
          </div>
          
          <button className="w-full mt-8 py-3 px-4 bg-primary text-background font-semibold rounded-xl opacity-50 cursor-not-allowed">
            Reset
          </button>
        </section>

      </div>
    </main>
  );
}
