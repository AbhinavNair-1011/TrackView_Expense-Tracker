import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses, fetchExpenseSummary, deleteExpense, resetPagination, createDue, fetchDues } from '../expenseSlice';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseSummary from '../components/ExpenseSummary';
import ExpenseInfoCard from '../components/ExpenseInfoCard';
import ExpenseFilters from '../components/ExpenseFilters';
import ExpenseDueList from '../components/ExpenseDueList'
import ExpenseDueForm from '../components/ExpenseDueForm'
import ExpenseDueNotifications from '../components/ExpenseDueNotification';
import ExpenseLimit from '../components/ExpenseLimit';
import { useRef } from 'react';



const ExpensePage = () => {
  const dispatch = useDispatch();
  const { pagination, expenses, error, summary, summaryLoading, summaryError } = useSelector((state) => state.expense);
  const { dues } = useSelector((state) => state.expense);
  const ref=useRef(null)

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

  const [showDueForm, setShowDueForm] = useState(false);


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

 

  const handleAddClick = useCallback(() => {
    setEditExpenseId(null);
    setShowForm(true);
  }, []);

  const handleEditClick = useCallback((id) => {
    setEditExpenseId(id);
    setShowForm(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setShowForm(false);
    setEditExpenseId(null);
  }, []);

  const handleDeleteClick = useCallback(async (id) => {
    try {
      const result = await dispatch(deleteExpense(id));
      if (deleteExpense.fulfilled.match(result)) {
        await dispatch(fetchExpenseSummary());
      }
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

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

  const handleAddDue = (newDueData) => {
    dispatch(createDue(newDueData));
  };




  return (
    <div className="max-w-7xl mx-auto">

      <ExpenseInfoCard />
      <div className='flex justify-between items-center mb-3'>

        <p className=" text-xs sm:text-sm text-gray-600 flex flex-wrap">
          Showing summary for: <span className='ml-1'>{viewMode === 'month'
            ? selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })
            : selectedDate.getFullYear()}</span>
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


      {/* {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )} */}

      <div className="sm:mt-20 flex flex-col text-center sm:flex-row flex-wrap justify-between items-stretch gap-6 mb-14">

        <div className="flex-1 min-w-[260px] bg-[rgb(249,250,255)] p-6 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-800 text-sm sm:text-base font-semibold">Manage your expenses efficiently</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Track spending, filter by date or category, and stay within budget.
          </p>
          <button
            onClick={handleAddClick}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
          >
            + Add Expense
          </button>
        </div>

        <div className="flex-1 min-w-[260px] bg-[rgb(249,250,255)] p-6 rounded-xl border border-gray-100 shadow-sm ">
          <p className="text-yellow-700 text-sm sm:text-base font-semibold">Upcoming Dues</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Get email alerts for due's to be paid at month end
          </p>
          <button
            onClick={() => setShowDueForm((prev) => !prev)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm hover:bg-yellow-600 transition"
          >
            + Add Due
          </button>

        </div>

      </div>
        
      <ExpenseDueNotifications/>



      <div  className="mb-6 border-b border-gray-200 ">

        <nav className="-mb-px flex space-x-8" ref={ref} >
          <button
            onClick={() =>{ setActiveTab('list') ;
                 ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

            }}
            className={`${activeTab === 'list' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              My Expenses
            </div>
          </button>

          <button
            onClick={() => { setActiveTab('dues') ;
               ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

            }}
            className={`${activeTab === 'dues' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m-3-9a9 9 0 110 18 9 9 0 010-18zM17 9h.01M12 12v.01" />
              </svg>

              Monthly Dues
            </div>
          </button>

        </nav>


      </div>
      <div>
        {activeTab === 'list' &&
          <> <ExpenseFilters
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
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              setPage={setPage}
              scrollRef={ref}
            />
          </>
        }
        </div>

        {activeTab === 'dues' &&

          <ExpenseDueList
            dues={dues}
            scrollRef={ref}
           />
        }

      {showForm && (
        <ExpenseForm
          expenseId={editExpenseId}
          onClose={handleFormClose}
        />
      )}
      {showDueForm && (
        <ExpenseDueForm
          onSubmit={handleAddDue}
          onClose={() => setShowDueForm((prev) => !prev)}
         />
      )}


    </div>
  );
};

export default ExpensePage;