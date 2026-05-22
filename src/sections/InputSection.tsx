import React from 'react';
import { DollarSign, Users } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { InputField } from '../components/InputField';
import { TipPresetButton } from '../components/TipPresetButton';
import { SectionHeader } from '../components/SectionHeader';
import { InlineHelperText } from '../components/InlineHelperText';
import { TIP_PRESETS } from '../constants/presets';
import { sanitizePositiveDecimalInput, sanitizeIntegerInput } from '../utils/sanitize';

interface InputSectionProps {
  bill: string;
  onBillChange?: (val: string) => void;
  selectedPreset: number | null;
  onPresetSelect?: (val: number | null) => void;
  customTip: string;
  onCustomTipChange?: (val: string) => void;
  people: string;
  onPeopleChange?: (val: string) => void;
  errors?: {
    bill?: string;
    tip?: string;
    people?: string;
  };
}

export const InputSection: React.FC<InputSectionProps> = ({
  bill = '',
  onBillChange,
  selectedPreset = null,
  onPresetSelect,
  customTip = '',
  onCustomTipChange,
  people = '',
  onPeopleChange,
  errors = {},
}) => {
  // ── Sanitised change handlers ──────────────────────────────────────────

  const handleBillChange = (raw: string) => {
    onBillChange?.(sanitizePositiveDecimalInput(raw));
  };

  const handleCustomTipChange = (raw: string) => {
    const sanitized = sanitizePositiveDecimalInput(raw);
    onCustomTipChange?.(sanitized);
    onPresetSelect?.(null);
  };

  const handlePeopleChange = (raw: string) => {
    onPeopleChange?.(sanitizeIntegerInput(raw));
  };

  const handlePresetClick = (preset: number) => {
    onPresetSelect?.(preset);
    onCustomTipChange?.('');
  };

  const isCustomTipActive = customTip !== '';
  const tipHasError = !!errors.tip;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── Bill Input ───────────────────────────────────────────────── */}
      <InputField
        id="bill-input"
        label="Bill"
        placeholder="0.00"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={bill}
        onChange={handleBillChange}
        error={errors.bill}
        icon={<DollarSign className="w-5 h-5" />}
      />

      {/* ── Tip Selection ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <SectionHeader title="Select Tip %" />
        </div>

        {/* LayoutGroup enables the shared layoutId highlight to animate
            between preset buttons smoothly */}
        <LayoutGroup>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TIP_PRESETS.map((preset) => (
              <TipPresetButton
                key={preset}
                value={preset}
                isActive={selectedPreset === preset && !isCustomTipActive}
                onClick={() => handlePresetClick(preset)}
              />
            ))}

            {/* Custom Tip Input — sits in the presets grid */}
            <div className="relative group">
              <input
                id="custom-tip"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Custom"
                value={customTip}
                onChange={(e) => handleCustomTipChange(e.target.value)}
                aria-label="Custom tip percentage"
                aria-invalid={tipHasError ? true : undefined}
                aria-describedby={tipHasError ? 'custom-tip-error' : undefined}
                className={`w-full h-full min-h-[48px] bg-background border rounded-xl px-3 text-center font-bold text-base text-textPrimary tracking-wider outline-none
                  transition-colors duration-150
                  focus-visible:ring-2 focus-visible:ring-primary/20
                  ${
                    tipHasError
                      ? 'border-error/60 focus:border-error'
                      : isCustomTipActive
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/40 focus:border-primary'
                  }`}
              />
              {/* Inline % indicator */}
              <AnimatePresence>
                {isCustomTipActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary pointer-events-none"
                  >
                    %
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </LayoutGroup>

        {/* Tip error sits below the entire preset grid */}
        <InlineHelperText id="custom-tip-error" message={errors.tip} isError={!!errors.tip} />
      </div>

      {/* ── Number of People ─────────────────────────────────────────── */}
      <InputField
        id="people-input"
        label="Number of People"
        placeholder="1"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={people}
        onChange={handlePeopleChange}
        error={errors.people}
        icon={<Users className="w-5 h-5" />}
      />
    </div>
  );
};
