import { NextResponse } from 'next/server';
import getUserBalance from '@/app/actions/getUserBalance';

export async function GET() {
  try {
    const { balance } = await getUserBalance();
    return NextResponse.json({ balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
}
