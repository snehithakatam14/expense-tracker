'use client';
import { useRef } from 'react';
import addTransaction from '@/app/actions/addTransaction';
import { toast } from 'react-toastify';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added successfully');
      formRef.current?.reset();
    }
  };

  return (
    <>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clientAction}>
        {/* Text Input */}
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
            required
          />
        </div>

        {/* Amount Input */}
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br /> (just enter the number)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount..."
            step="0.01"
            required
          />
        </div>

        {/* ✅ Dropdown for Type */}
        <div className="form-control">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
