'use client';

import { useState } from 'react';

interface CurrencyControlProps {
  balance: number;
  income: number;
  expense: number;
  currency: string;
  rates: Record<string, number>;
}

const CurrencyControl: React.FC<CurrencyControlProps> = ({
  balance,
  income,
  expense,
  currency,
  rates,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const convert = (amount: number) => {
    const rate = rates[selectedCurrency] || 1;
    return (amount * rate).toFixed(2);
  };

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <h3>Currency Control</h3>
      <select
        value={selectedCurrency}
        onChange={(e) => setSelectedCurrency(e.target.value)}
        style={{ padding: '5px', marginBottom: '10px' }}
      >
        {Object.keys(rates).map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>

      <p>
        Balance: {selectedCurrency} {convert(balance)}
      </p>
      <p>
        Income: {selectedCurrency} {convert(income)}
      </p>
      <p>
        Expense: {selectedCurrency} {convert(expense)}
      </p>
    </div>
  );
};

export default CurrencyControl;
