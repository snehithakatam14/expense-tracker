export const fetchExchangeRates = async (base: string = 'INR') => {
  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${base}`);
    const data = await res.json();
    return data.rates; // Example: { USD: 0.012, EUR: 0.011, GBP: 0.009 }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {};
  }
};
