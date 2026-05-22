import { useState, useMemo, useCallback } from 'react';
import { AppShell } from './components/AppShell';
import { ResponsiveContainer } from './components/ResponsiveContainer';
import { CalculatorCard } from './components/CalculatorCard';
import { InputSection } from './sections/InputSection';
import { ResultPanel } from './sections/ResultPanel';
import { calculateTip, formatCurrency } from './utils/calculations';
import { validateBill, validateTip, validatePeople } from './utils/validation';

export default function App() {
  // ── Primary input state ────────────────────────────────────────────────
  const [bill, setBill] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState('');
  const [people, setPeople] = useState('');

  // ── "Touched" tracking ─────────────────────────────────────────────────
  // Errors only show for fields the user has interacted with, preventing
  // a wall-of-red on first render or after a reset.
  const [touched, setTouched] = useState({
    bill: false,
    tip: false,
    people: false,
  });

  // Mark a field as touched on first meaningful edit.
  // We intentionally skip empty → empty transitions so that clearing
  // a field and immediately re-typing doesn't flash an error.
  const handleBillChange = useCallback((val: string) => {
    setBill(val);
    if (val !== '') setTouched((t) => ({ ...t, bill: true }));
  }, []);

  const handleCustomTipChange = useCallback((val: string) => {
    setCustomTip(val);
    if (val !== '') setTouched((t) => ({ ...t, tip: true }));
  }, []);

  const handlePresetSelect = useCallback((val: number | null) => {
    setSelectedPreset(val);
    // Selecting a preset clears the tip-touched state because the preset
    // itself is always valid.
    setTouched((t) => ({ ...t, tip: false }));
  }, []);

  const handlePeopleChange = useCallback((val: string) => {
    setPeople(val);
    if (val !== '') setTouched((t) => ({ ...t, people: true }));
  }, []);

  // ── Derived validation ─────────────────────────────────────────────────
  // Pure derivation — no side effects, no useEffect.
  // Errors are computed on every render but only *displayed* for touched
  // fields, so the user is never punished mid-keystroke.
  const errors = useMemo(() => {
    return {
      bill: touched.bill ? validateBill(bill) : undefined,
      tip: touched.tip ? validateTip(customTip) : undefined,
      people: touched.people ? validatePeople(people) : undefined,
    };
  }, [bill, customTip, people, touched]);

  // ── Derived calculations ───────────────────────────────────────────────
  // useMemo keeps the result object referentially stable when inputs
  // haven't actually changed, preventing unnecessary ResultPanel renders.
  const results = useMemo(() => {
    return calculateTip(bill, selectedPreset, customTip, people);
  }, [bill, selectedPreset, customTip, people]);

  // ── Reset ──────────────────────────────────────────────────────────────
  const hasValues = Boolean(
    bill || selectedPreset !== null || customTip || people,
  );

  const handleReset = useCallback(() => {
    setBill('');
    setSelectedPreset(null);
    setCustomTip('');
    setPeople('');
    setTouched({ bill: false, tip: false, people: false });
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <AppShell>
      <ResponsiveContainer>
        <CalculatorCard>
          {/* Left Panel: Inputs */}
          <section className="flex flex-col gap-6">
            <header className="border-b border-border/50 pb-4">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-textPrimary">
                Split &amp; Tip
              </h1>
              <p className="text-xs sm:text-sm text-textSecondary mt-1">
                Enter your billing details to see the live calculations.
              </p>
            </header>

            <InputSection
              bill={bill}
              onBillChange={handleBillChange}
              selectedPreset={selectedPreset}
              onPresetSelect={handlePresetSelect}
              customTip={customTip}
              onCustomTipChange={handleCustomTipChange}
              people={people}
              onPeopleChange={handlePeopleChange}
              errors={errors}
            />
          </section>

          {/* Right Panel: Results */}
          <ResultPanel
            tipAmountPerPerson={formatCurrency(results.tipAmountPerPerson)}
            totalPerPerson={formatCurrency(results.totalPerPerson)}
            grandTotal={formatCurrency(results.grandTotal)}
            isResetDisabled={!hasValues}
            onReset={handleReset}
          />
        </CalculatorCard>
      </ResponsiveContainer>
    </AppShell>
  );
}
