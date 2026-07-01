import { NextResponse } from 'next/server';
import getIncomeExpense from '@/app/actions/getIncomeExpense';

export async function GET() {
  try {
    const { income, expense } = await getIncomeExpense();
    return NextResponse.json({ income, expense });
  } catch (error) {
    console.error("Error fetching income and expense:", error);
    return NextResponse.json({ error: 'Failed to fetch income/expense' }, { status: 500 });
  }
}
