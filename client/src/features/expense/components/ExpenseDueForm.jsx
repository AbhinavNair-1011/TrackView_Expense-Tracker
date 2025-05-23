import React, { useState } from "react";

const ExpenseDueForm = ({ onClose, onSubmit }) => {

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    dueDate: getMonthEndDate(),
    isPaid: false,
  });

  function getMonthEndDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-500 p-6 rounded-xl shadow-xl border border-gray-200  mx-auto my-8Fplace w-full max-w-md"
      >
        <h3 className="text-white text-lg font-semibold mb-4">Expense Due Form</h3>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-white mb-1 ">Title</label>
          <input placeholder="e.g. due name" type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 " required maxLength={100} />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-white mb-1">Amount (₹)</label>
          <input placeholder="e.g. 150.00" type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 " min={0} step="0.01" required />
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-white mb-1">Due Date</label>
          <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 " required />
        </div>
        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-white text-sm bg-yellow-500 hover:bg-yellow-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg border border-gray-300 text-white text-sm font-medium bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
          >
            Submit Due
          </button>
        </div>

      </form>
    </div>
  );
};

export default ExpenseDueForm;
