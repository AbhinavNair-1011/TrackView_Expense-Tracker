import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, fetchExpenseSummary, deleteExpense, resetPagination } from '../expenseSlice';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseSummary from '../components/ExpenseSummary';
import { CircleFadingArrowUp } from 'lucide-react';
import ExpenseInfoCard from '../components/ExpenseInfoCard';
import ExpenseFilters from '../components/ExpenseFilters';

const ExpensePage = () => {
  const dispatch = useDispatch();
  const { pagination, expenses, error, summary, summaryLoading, summaryError } = useSelector((state) => state.expense);
  const [showForm, setShowForm] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('list');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());


  useEffect(() => {
    const { from, to } = getRange();
    dispatch(fetchExpenseSummary({ fromDate: from, toDate: to }));
  }, [selectedDate, viewMode]);


  useEffect(() => {
    setPage(1)
  }, [search, category, sort, fromDate, toDate, selectedMonth, selectedYear])

  useEffect(() => {

    const bothDatesSelected = (fromDate && toDate);
    const monthYearSelected = selectedMonth && selectedYear;

    if (bothDatesSelected) {
      dispatch(fetchExpenses({ page, search, category, sort, fromDate, toDate }));
    } else if (monthYearSelected) {

      const y = Number(selectedYear);
      const m = Number(selectedMonth);
      const from = new Date(y, m - 1, 1).toISOString();
      const to = new Date(y, m, 0, 23, 59, 59, 999).toISOString();
      dispatch(fetchExpenses({ page, search, category, sort, fromDate: from, toDate: to }));
    }
  }, [dispatch, page, search, category, sort, toDate, selectedMonth, selectedYear]);



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

  const handleDeleteClick = async (id) => {
    try {
      const result = await dispatch(deleteExpense(id));

      if (deleteExpense.fulfilled.match(result)) {
        await dispatch(fetchExpenseSummary());
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getRange = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    if (viewMode === 'month') {
      const from = new Date(year, month, 1).toISOString();
      const to = new Date(year, month + 1, 0, 23, 59, 59, 999).toISOString();
      return { from, to };
    } else {
      const from = new Date(year, 0, 1).toISOString();
      const to = new Date(year, 11, 31, 23, 59, 59, 999).toISOString();
      return { from, to };
    }
  };


  const handlePrevMonth = () => {
  setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
};

const handleNextMonth = () => {
  const nextDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const isFutureMonth =
    nextDate.getFullYear() > currentYear ||
    (nextDate.getFullYear() === currentYear && nextDate.getMonth() > currentMonth);

  if (!isFutureMonth) {
    setSelectedDate(nextDate);
  }
};

  // if (summaryLoading) return <p>Loading summary...</p>;
  // if (summaryError) return <p>Error loading summary: {summaryError}</p>;


  return (
    <div className="max-w-7xl mx-auto">

      <ExpenseInfoCard />
      <div className='flex justify-between items-center mb-3'>

        <p className=" text-xs sm:text-sm text-gray-600 flex flex-wrap">
          Showing summary for: <div className='ml-1'>{viewMode === 'month'
            ? selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })
            : selectedDate.getFullYear()}</div>
        </p>

    <div className="flex items-center">
  <button
    className='bg-black text-white text-sm font-bold rounded-2xl px-2'
    onClick={handlePrevMonth}
  >
    &lt;
  </button>

  <button
    onClick={() => {
    }}
    className="text-[12px] sm:text-sm mx-2 text-gray-800"
  >
    {viewMode === 'month'
      ? selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })
      : selectedDate.getFullYear()}
  </button>

  <button
    className='bg-black text-white text-sm font-bold rounded-2xl px-2'
    onClick={handleNextMonth}
  >
    &gt;
  </button>
</div>


      </div>

      <ExpenseSummary summary={summary} />


      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}


      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">

        <div>
          <p className="text-gray-600 hidden sm:flex">Manage your expenses efficiently</p>
        </div>
        <button
          onClick={handleAddClick}
          className="w-full sm:w-fit sm:static sm:mt-0 mt-4 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          + Add Expense
        </button>

      </div>
      <div className="mb-6 border-b border-gray-200">

        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('list')}
            className={`${activeTab === 'list' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Expense List
            </div>
          </button>

        </nav>
      </div>

      <ExpenseFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
        fromDate={fromDate}
        toDate={toDate}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
        onFromDateChange={(val) => {
          setFromDate(val);

        }}
        onToDateChange={(val) => {
          setToDate(val);

        }}

      />

      <ExpenseList
        pagination={pagination}
        expenses={expenses}
        page={page}
        setPage={setPage}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />


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