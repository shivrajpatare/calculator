import React from 'react';
import { DollarSign, Users } from 'lucide-react';
import { InputField } from '../components/InputField';
import { TipPresetButton } from '../components/TipPresetButton';
import { SectionHeader } from '../components/SectionHeader';
import { TIP_PRESETS } from '../constants/presets';

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
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Bill Input Group */}
      <InputField
        id="bill-input"
        label="Bill"
        placeholder="0.00"
        type="text"
        inputMode="decimal"
        value={bill}
        onChange={onBillChange}
        error={errors.bill}
        icon={<DollarSign className="w-5 h-5" />}
      />

      {/* Tip Selection Group */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <SectionHeader title="Select Tip %" />
          {errors.tip && (
            <span className="text-xs font-medium text-error animate-fadeIn">
              {errors.tip}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TIP_PRESETS.map((preset) => (
            <TipPresetButton
              key={preset}
              value={preset}
              isActive={selectedPreset === preset && !customTip}
              onClick={() => {
                onPresetSelect?.(preset);
                onCustomTipChange?.(''); // clear custom tip when preset is selected
              }}
            />
          ))}

          {/* Custom Tip Input sits in the presets grid */}
          <div className="relative group">
            <input
              id="custom-tip"
              type="text"
              inputMode="decimal"
              placeholder="Custom"
              value={customTip}
              onChange={(e) => {
                onCustomTipChange?.(e.target.value);
                onPresetSelect?.(null); // clear preset selection when custom is typed
              }}
              className={`w-full h-full min-h-[48px] bg-background border rounded-xl px-3 text-center font-bold text-base text-textPrimary tracking-wider transition-all duration-150 outline-none
                ${customTip 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-border hover:border-textSecondary/30 focus:border-primary focus:ring-2 focus:ring-primary/20'
                }`}
            />
            {customTip && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary pointer-events-none">
                %
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Number of People Group */}
      <InputField
        id="people-input"
        label="Number of People"
        placeholder="1"
        type="text"
        inputMode="numeric"
        value={people}
        onChange={onPeopleChange}
        error={errors.people}
        icon={<Users className="w-5 h-5" />}
      />
    </div>
  );
};
