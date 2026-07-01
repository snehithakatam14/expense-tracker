import { NextResponse } from 'next/server';

// Cache variables (stored in memory)
let cachedRates: { [key: string]: number } | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Function to fetch from external API
async function fetchExchangeRates() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
  if (!res.ok) throw new Error("Failed to fetch currency rates");
  const data = await res.json();
  return data.rates;
}

// GET handler for the API route
export async function GET() {
  const now = Date.now();

  if (cachedRates && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    // ✅ Return cached rates if not expired
    return NextResponse.json({ rates: cachedRates, source: "cache" });
  }

  try {
    // ✅ Fetch fresh rates and update cache
    const rates = await fetchExchangeRates();
    cachedRates = rates;
    lastFetchTime = now;
    return NextResponse.json({ rates, source: "api" });
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 500 });
  }
}
