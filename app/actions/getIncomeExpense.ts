'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { error: 'User not found' };

  const transactions = await db.transaction.findMany({ where: { userId } });

  const amounts = transactions.map((t) => t.amount);

  const income = amounts.filter((amt) => amt > 0).reduce((acc, amt) => acc + amt, 0);
  const expense = Math.abs(
    amounts.filter((amt) => amt < 0).reduce((acc, amt) => acc + amt, 0)
  );

  return { income, expense };
}

export default getIncomeExpense;
