import React, { useRef } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../expenseSlice';
import { useEffect } from 'react';


const ExpenseList = ({ pagination, expenses, onEdit, page, setPage, onDelete }) => {
 const listTopRef = useRef(null);

  const handlePreviousPageChange = (page) => {
  setPage(page => Math.max(page - 1, 1))
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
const handleNextPageChange=()=>{
   setPage(page => Math.min(page + 1, pagination?.pages || 1))
      listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

}
  if (!expenses.length) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-lg">No expenses found. Add your first expense!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 min-h-1" ref={listTopRef} >
      <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider rounded-t-lg">
        <div className="col-span-3">Date</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-4">Description</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      <div className="space-y-2 "   >
        {expenses.map(({ id, date, category, description, amount }) => (
          <div key={id}  className="group bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow p-4">
            <div className="sm:hidden grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-gray-500">Date</span>
                <span className="font-medium">
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <span className="text-xs text-gray-500">Amount</span>
                <span className="font-medium">{amount}</span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-xs text-gray-500">Category</span>
                <span
                  className={`text-xs font-medium  rounded-full w-fit ${category === 'food'
                      ? 'bg-green-50 text-green-700'
                      : category === 'transport'
                        ? 'bg-blue-50 text-blue-700'
                        : category === 'housing'
                          ? 'bg-purple-50 text-purple-700'
                          : category === 'entertainment'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-gray-50 text-gray-700'
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </div>

              <div className="flex justify-end items-end space-x-2">
                <button onClick={() => onEdit(id)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button onClick={() => onDelete(id)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {description && (
                <div className="col-span-2">
                  <span className="text-xs text-gray-500">Notes</span>
                  <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
                </div>
              )}
            </div>


            <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3 text-sm">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>

              <div className="col-span-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${category === 'food' ? 'bg-green-50 text-green-700' :
                  category === 'transport' ? 'bg-blue-50 text-blue-700' :
                    category === 'housing' ? 'bg-purple-50 text-purple-700' :
                      category === 'entertainment' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-50 text-gray-700'
                  }`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </div>
              <div className="col-span-4 text-sm text-gray-700 truncate">
                {description || <span className="text-gray-400">—</span>}
              </div>
              <div className="col-span-2 text-right text-sm font-medium">
                {amount}
              </div>
              <div className="col-span-1 flex justify-end space-x-2">
                <button onClick={() => onEdit(id)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button onClick={() => onDelete(id)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="text-sm text-gray-500 mb-2 sm:mb-0">
          Showing page {pagination?.page} of {pagination?.pages}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePreviousPageChange}
            disabled={pagination?.page <= 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {[...Array(Math.min(5, pagination?.pages || 1))].map((_, i) => {
              const pageNum = pagination?.page <= 3
                ? i + 1
                : Math.min(pagination?.pages || 1, pagination?.page + i - 2);
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 text-sm rounded-md ${pagination?.page === pageNum
                    ? 'bg-gray-200 text-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleNextPageChange}
            disabled={pagination?.page >= pagination?.pages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;