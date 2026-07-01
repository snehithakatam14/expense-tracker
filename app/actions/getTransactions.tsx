'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Transaction } from '@/types/Transaction';

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactionsFromDb = await db.transaction.findMany({
      where: { userId },
      orderBy: {
        CreatedAt: 'desc',
      },
    });

    const transactions: Transaction[] = transactionsFromDb.map((t: any) => ({
      id: t.id,
      text: t.text,
      amount: t.amount,
      userId: t.userId,
      createdAt: t.CreatedAt ?? t.createdAt, // handle both cases
    }));

    return { transactions };
  } catch (error) {
    return { error: 'Database error' };
  }
}

export default getTransactions;