import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { ResponsiveContainer } from './components/ResponsiveContainer';
import { CalculatorCard } from './components/CalculatorCard';
import { InputSection } from './sections/InputSection';
import { ResultPanel } from './sections/ResultPanel';

export default function App() {
  // Setup lightweight state to make forms interactive, keeping business logic out for Phase 2
  const [bill, setBill] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState('');
  const [people, setPeople] = useState('');

  // Static preview values for Phase 1
  const tipAmountPerPerson = '$0.00';
  const totalPerPerson = '$0.00';
  const grandTotal = '$0.00';

  // Toggle Reset button state visually if any input has been filled
  const hasValues = !!(bill || selectedPreset || customTip || people);

  const handleReset = () => {
    setBill('');
    setSelectedPreset(null);
    setCustomTip('');
    setPeople('');
  };

  // Mock static layout errors for visual verification of error state styling
  const errors = {
    bill: undefined,
    tip: undefined,
    people: undefined,
  };

  return (
    <AppShell>
      <ResponsiveContainer>
        <CalculatorCard>
          {/* Left Panel: Inputs Container */}
          <section className="flex flex-col gap-6">
            <header className="border-b border-border/50 pb-4">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-textPrimary">
                Split & Tip
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary mt-1">
                Enter your billing details to see the live calculations.
              </p>
            </header>

            <InputSection
              bill={bill}
              onBillChange={setBill}
              selectedPreset={selectedPreset}
              onPresetSelect={setSelectedPreset}
              customTip={customTip}
              onCustomTipChange={setCustomTip}
              people={people}
              onPeopleChange={setPeople}
              errors={errors}
            />
          </section>

          {/* Right Panel: Results Summary Container */}
          <ResultPanel
            tipAmountPerPerson={tipAmountPerPerson}
            totalPerPerson={totalPerPerson}
            grandTotal={grandTotal}
            isResetDisabled={!hasValues}
            onReset={handleReset}
          />
        </CalculatorCard>
      </ResponsiveContainer>
    </AppShell>
  );
}
