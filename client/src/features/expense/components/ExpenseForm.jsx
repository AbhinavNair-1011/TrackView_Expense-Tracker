import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExpense, updateExpense } from '../expenseSlice';
import {
  DollarSign,
  Folder,
  CalendarDays,
  FileText,
  X
} from "lucide-react";

const ExpenseForm = ({ expenseId, onClose }) => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expense);
  const editingExpense = expenseId ? expenses.find((e) => e.id === expenseId) : null;

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount.toString(),
        category: editingExpense?.category,
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

    if (expenseId) {
      dispatch(updateExpense({ id: expenseId, ...payload }));
    } else {
      dispatch(createExpense(payload));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-zinc-200 rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {expenseId ? 'Edit Expense' : 'Add New Expense'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-gray-500" /> Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g. 150.00"
                className={`w-full shadow-inner bg-slate-100 px-4 py-2.5 rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            </div>

            <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
  <Folder className="w-4 h-4 text-gray-500" /> Category
</label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full shadow-inner bg-slate-100   px-4 py-2.5 rounded-2xl border appearance-none  focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
              >
                <option value="">Select category</option>
                <option value="food"> Food</option>
                <option value="transport">Transport</option>
                <option value="housing"> Housing</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities"> Utilities</option>
                <option value="other"> Other</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
  <CalendarDays className="w-4 h-4 text-gray-500" /> Date
</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full shadow-inner bg-slate-100   px-4 py-2.5 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            <div>
             
<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
  <FileText className="w-4 h-4 text-gray-500" /> Description (optional)
</label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Uber ride to airport..."
                className={`w-full px-4 py-2.5 rounded-2xl shadow-inner bg-slate-100  border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
              >
                {expenseId ? 'Update Expense' : 'Add Expense'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default ExpenseForm;