type Props = {
  income: number;
  expense: number;
};

const IncomeExpense = ({ income, expense }: Props) => (
  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
    <div>
      <h4>Income</h4>
      <p style={{ color: 'green', fontWeight: 'bold' }}>₹{income}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p style={{ color: 'red', fontWeight: 'bold' }}>₹{expense}</p>
    </div>
  </div>
);

export default IncomeExpense;
