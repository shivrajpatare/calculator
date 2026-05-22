export function calculateTip(
  billStr: string,
  selectedPreset: number | null,
  customTipStr: string,
  peopleStr: string
) {
  const bill = parseFloat(billStr);
  const people = parseInt(peopleStr, 10);
  
  let tipPercentage = 0;
  if (customTipStr) {
    const parsedCustomTip = parseFloat(customTipStr);
    if (!isNaN(parsedCustomTip)) {
      tipPercentage = parsedCustomTip;
    }
  } else if (selectedPreset !== null) {
    tipPercentage = selectedPreset;
  }

  // Handle invalid or empty values gracefully to avoid NaN and Infinity
  if (
    isNaN(bill) || bill <= 0 ||
    isNaN(people) || people <= 0 ||
    tipPercentage < 0
  ) {
    return {
      tipAmountPerPerson: 0,
      totalPerPerson: 0,
      grandTotal: 0,
    };
  }

  const totalTip = bill * (tipPercentage / 100);
  const grandTotal = bill + totalTip;
  const tipAmountPerPerson = totalTip / people;
  const totalPerPerson = grandTotal / people;

  return {
    tipAmountPerPerson,
    totalPerPerson,
    grandTotal,
  };
}

export function formatCurrency(value: number): string {
  if (isNaN(value) || value < 0) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
