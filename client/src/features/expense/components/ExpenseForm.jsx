import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExpense, updateExpense } from '../expenseSlice';
import { DollarSign, Folder, CalendarDays, FileText } from "lucide-react";
import { fetchExpenseSummary } from '../expenseSlice';

const ExpenseForm = ({ expenseId, onClose }) => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);
  const editingExpense = expenseId ? expenses.find((e) => e.id === expenseId) : null;

  const [formData, setFormData] = useState({
  amount: '',
  category: '',
  description: '',
  date: new Date().toLocaleDateString('en-CA') 
});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        description: editingExpense.description || '',
        date: editingExpense.date.slice(0, 10),
      });
    }
  }, [editingExpense]);

  const validate = () => {
    const errs = {};
    if (!formData.amount || isNaN(formData.amount)) {
      errs.amount = 'Please enter a valid number';
    } else if (Number(formData.amount) <= 0) {
      errs.amount = 'Amount must be positive';
    }

    if (!formData.category) {
      errs.category = 'Category is required';
    }

    if (formData.description && formData.description.length > 200) {
      errs.description = 'Description too long (max 200 chars)';
    }

    if (!formData.date) {
      errs.date = 'Date is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;

  const payload = {
    amount: Number(formData.amount),
    category: formData.category.trim(),
    description: formData.description.trim(),
    date: formData.date,
  };

  let action;
  if (expenseId) {
    action = updateExpense({ id: expenseId, ...payload });
  } else {
    action = createExpense(payload);
  }

  dispatch(action).then(result => {
    if (updateExpense.fulfilled.match(result) || createExpense.fulfilled.match(result)) {
      dispatch(fetchExpenseSummary());
      onClose();
    } else {
      console.error('Failed to save expense:', result.error);
    }
  });
};


  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
  <div className="w-full max-w-md bg-blue-600 rounded-xl shadow-xl overflow-hidden animate-fadeIn   mx-auto my-8">
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-white">
          {expenseId ? 'Edit Expense' : 'Add New Expense'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className=" text-white block text-sm font-medium  mb-1">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-white" />
              Amount
            </span>
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g. 150.00"
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
          />
          {errors.amount && <p className="mt-1 text-xs text-white">*{errors.amount}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-white mb-1">
            <span className="flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-white" />
              Category
            </span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="housing">Housing</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <p className="mt-1 text-xs text-white">*{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-white mb-1">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-white" />
              Date
            </span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
          />
          {errors.date && <p className="mt-1 text-xs text-white">*{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-white" />
              Description (optional)
            </span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Uber ride to airport..."
            className={`w-full px-3 py-2 rounded-lg border resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
          />
          {errors.description && <p className="mt-1 text-xs text-white">*{errors.description}</p>}
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-white border-gray-300 text-sm hover:bg-blue-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg border border-gray-300 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
          >
            {expenseId ? 'Update' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default ExpenseForm;
