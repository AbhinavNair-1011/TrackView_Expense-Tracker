import React from 'react';

const ExpenseSummary = ({ summary }) => {
  const {
    totalAmount = 0,
    totalCount = 0,
    mostRecentExpense,
    mostExpensiveCategory,
  } = summary || {};

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatAmount = (amount) => `${Number(amount || 0).toFixed(2)}`;

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="text-md sm:xl  font-semibold text-gray-900">
              {formatAmount(totalAmount)}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden sm:flex text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Number of Expenses</p>
            <p className="text-md sm:xl  font-semibold text-gray-900">{totalCount}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  hidden sm:flex text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Top Category</p>
            <p className="text-md sm:xl  font-semibold text-gray-900 capitalize">
              {mostExpensiveCategory?.category || 'N/A'}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {formatAmount(mostExpensiveCategory?.amount)}
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  hidden sm:flex text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Last Expense</p>
            <p className="text-md sm:xl  sm:text-xl font-semibold text-gray-900">
              {mostRecentExpense ? formatAmount(mostRecentExpense.amount) : 'N/A'}
            </p>
            <p className="text-sm text-gray-500">
              {mostRecentExpense ? formatDate(mostRecentExpense.date) : 'No expenses'}
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  hidden sm:flex text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
