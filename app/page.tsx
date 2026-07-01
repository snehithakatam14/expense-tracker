import { currentUser } from '@clerk/nextjs/server';
import Balance from '@/components/Balance';
import IncomeExpense from '@/components/IncomeExpense';
import AddTransaction from '@/components/AddTransaction';
import TransactionList from '@/components/TransactionList';
import CurrencyControl from '@/components/CurrencyControl';
import getUserBalance from '@/app/actions/getUserBalance';
import getIncomeExpense from '@/app/actions/getIncomeExpense';

export default async function HomePage() {
  const user = await currentUser();

  const username =
    user?.firstName ||
    user?.username ||
    (user?.emailAddresses[0]?.emailAddress
      ? user.emailAddresses[0].emailAddress.split('@')[0]
      : 'User');

  const { balance = 0 } = await getUserBalance();
  const { income = 0, expense = 0 } = await getIncomeExpense();

  const rates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    JPY: 1.8,
  };

  return (
    <main className="dashboard-container">
      {/* Welcome Section */}
      <h2 className="welcome-text">
        Welcome, <span className="highlight">{username}</span>
      </h2>

      {/* Balance and Currency Converter */}
      <div className="top-section">
        <div className="balance-card">
          <h3>Your Balance</h3>
          <p className="balance-amount">₹{balance.toFixed(2)}</p>
        </div>
        <div className="currency-card">
          <CurrencyControl
            balance={Number(balance.toFixed(2))}
            income={Number(income.toFixed(2))}
            expense={Number(expense.toFixed(2))}
            currency="INR"
            rates={rates}
          />
        </div>
      </div>

      {/* Income & Expense */}
      <div className="income-expense-section">
        <div className="income-expense-card">
          <h4>Income</h4>
          <p className="income-text">₹{income.toFixed(2)}</p>
        </div>
        <div className="income-expense-card">
          <h4>Expense</h4>
          <p className="expense-text">₹{expense.toFixed(2)}</p>
        </div>
      </div>

      {/* Add Transaction & History */}
      <div className="bottom-section">
        <div className="transaction-card">
          <AddTransaction />
        </div>
        <div className="transaction-card">
          <TransactionList />
        </div>
      </div>
    </main>
  );
}
