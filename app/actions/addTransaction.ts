'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');
  const typeValue = formData.get('type'); // ✅ Get type

  // Validate fields
  if (!textValue || !amountValue || !typeValue) {
    return { error: 'Text, amount, or type is missing' };
  }

  const text: string = textValue.toString();
  let amount: number = parseFloat(amountValue.toString());
  const type = typeValue.toString();

  if (isNaN(amount)) {
    return { error: 'Invalid amount' };
  }

  // ✅ If expense, make amount negative
  if (type === 'expense' && amount > 0) {
    amount = -amount;
  }

  // ✅ Auth
  const { userId } = await auth();
  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    // ✅ Revalidate homepage so balance updates immediately
    revalidatePath('/');

    return { data: transactionData };
  } catch (error) {
    return { error: 'Transaction not added' };
  }
}

export default addTransaction;
export { addTransaction };