import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../expenseSlice';
import { useEffect } from 'react';


const ExpenseList = ({ pagination, expenses, onEdit, page, setPage }) => {

  if (!expenses.length) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-lg">No expenses found. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Date
              </div>
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Category
              </div>
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Description
              </div>
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              <div className="flex items-center justify-end gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Amount
              </div>
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {expenses.map(({ id, date, category, description, amount }) => (
            <tr
              key={id}
              className="transition-all hover:bg-indigo-50/50 hover:shadow-sm h-16 "
            >
              <td className="whitespace-nowrap px-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 mr-4 font-medium">
                    {new Date(date).getDate()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 ">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${category === 'food' ? 'bg-green-100 text-green-800' :
                  category === 'transport' ? 'bg-blue-100 text-blue-800' :
                    category === 'housing' ? 'bg-purple-100 text-purple-800' :
                      category === 'entertainment' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                  }`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 max-w-xs">
                <p className="text-sm text-gray-800 truncate hover:text-clip">
                  {description || <span className="text-gray-400">No description</span>}
                </p>
              </td>
              <td className="whitespace-nowrap px-6  text-right">
                <span className="text-base font-semibold text-gray-900">
                  {amount}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 text-center">
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => onEdit(id)}
                    className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition-all"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(id)}
                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-all"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setPage(page => Math.max(page - 1, 1))}
          disabled={pagination?.page <= 1}
          className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(pagination?.pages || 1)].map((_, index) => {
          const pageNumber = index + 1;
          const isActive = pagination?.page === pageNumber;

          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-2 rounded ${isActive
                  ? 'bg-indigo-700 text-white'
                  : 'bg-indigo-100 text-indigo-700'
                }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => setPage(page => Math.min(page + 1, pagination?.pages || 1))}
          disabled={pagination?.page >= pagination?.pages}
          className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>




    </div>
  );
};

export default ExpenseList;