import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../expenseSlice';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';

const ExpensePage = () => {
  const dispatch = useDispatch();
  const { pagination,expenses, loading, error } = useSelector((state) => state.expense);
  const [showForm, setShowForm] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);

const [page, setPage] = useState(1);

useEffect(() => {
  dispatch(fetchExpenses({ page }));
}, [page]);

  const handleAddClick = () => {
    setEditExpenseId(null);
    setShowForm(true);
  };

  const handleEditClick = (id) => {
    setEditExpenseId(id);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditExpenseId(null);
  };

  return (
    <div className="p-1 sm:p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Expense
        </button>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ExpenseList  
        pagination={pagination}
        expenses={expenses}
        page={page}
        setPage={setPage}        
        onEdit={handleEditClick} />
      )}

      {showForm && (
        <ExpenseForm 
          expenseId={editExpenseId} 
          onClose={handleFormClose} 
        />
      )}
    </div>
  );
};

export default ExpensePage;