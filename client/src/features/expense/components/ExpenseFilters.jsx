import React, { useEffect, useState } from 'react';

const ExpenseFilters = ({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    sort,
    onSortChange,
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
}) => {

    const [localSearch, setLocalSearch] = useState(search);

    useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(localSearch);
        }, 1000);

        return () => clearTimeout(handler);
    }, [localSearch, onSearchChange]);

    const [expandedSection, setExpandedSection] = useState("initial");

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const categories = [
        { value: 'food', label: 'Food' },
        { value: 'transport', label: 'Transport' },
        { value: 'housing', label: 'Housing' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'other', label: 'Other' }
    ];

    const sortOptions = [
        { value: 'date_desc', label: 'Date: Newest First' },
        { value: 'date_asc', label: 'Date: Oldest First' },
        { value: 'amount_desc', label: 'Amount: High to Low' },
        { value: 'amount_asc', label: 'Amount: Low to High' }
    ];

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const accountCreatedYear = 2022;

    const availableYears = [];
    for (let year = accountCreatedYear; year <= currentYear; year++) {
        availableYears.push(year);
    }

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const displayableMonths = selectedYear < currentYear
        ? months
        : selectedYear === currentYear
            ? months.slice(0, currentMonth)
            : [];

    const handleClearAll = () => {
        setExpandedSection(null)
        onSearchChange(""),
            onCategoryChange(""),
            onSortChange(""),
            onFromDateChange(""),
            onToDateChange("")
    }

    return (
        <div className="bg-gray-50 p-3 rounded-lg shadow-xs border border-gray-100 mb-4">
            <div className="relative mb-2">
                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="bg-zinc-50  shadow-inner w-full pl-9 pr-20 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />
                <svg
                    className="absolute left-2.5 top-2 h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >f
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                <div className="absolute right-1.5 top-1 flex  bg-orange-400">
                    <button
                        onClick={() => toggleSection('category')}
                        className={` px-1 sm:px-2.5 sm:py-1  text-[10px] sm:tex-sm rounded-full transition-all bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 
                            ${category ? "bg-purple-100 text-purple-700" : ""}`}
                    >
                        <span className={`flex items-center  `}>
                            {category ? (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                                    {categories.find(c => c.value === category)?.label}
                                </>
                            ) : (
                                <>
                                    <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                    Category
                                </>
                            )}
                        </span>
                    </button>

                    <button
                        onClick={() => toggleSection('sort')}
                        className={` p-1 sm:px-2.5 sm:py-1  text-[10px] sm:tex-sm rounded-full transition-all ${sort
                            ? 'bg-purple-100 text-purple-700 border border-purple-200 shadow-xs hover:bg-purple-200/80'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                    >
                        <span className="flex items-center">
                            {sort ? (
                                <>
                                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {sort === 'highest' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />}
                                        {sort === 'lowest' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />}
                                        {sort === 'latest' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                        {sort === 'oldest' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                    </svg>
                                    {sortOptions.find(s => s.value === sort)?.label}
                                </>
                            ) : (
                                <>
                                    <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                    </svg>
                                    Sort
                                </>
                            )}
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center mt-3">
                <div className='flex flex-col-reverse '>
                    <button
                        onClick={() => {
                            onFromDateChange('');
                            onToDateChange("");
                            if (expandedSection === "date") {
                                setExpandedSection("")
                            } else {

                                setExpandedSection("date");
                            }
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center  bg-yellow-50 p-1 underline"
                    >
                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {expandedSection === "date" ? " Close date range" : "Add date range"}
                    </button>

                </div>
                <button
                    onClick={handleClearAll}
                    className="text-xs bg-red-400 hover:-translate-y-0.5 p-1 rounded-md text-white font-bold ml-auto"
                >
                    Clear all
                </button>
            </div>
            {expandedSection && (
                <div className="mt-1 p-2 bag-gray-50 rounded-md border-gray-100">
                    {expandedSection === 'category' && (
                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.value}
                                        onClick={() => onCategoryChange(cat.value)}
                                        className={`px-2 py-0.5 text-xs rounded ${category === cat.value
                                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => { onCategoryChange(''); setExpandedSection(null) }
                                }
                                className="text-xs text-gray-500 hover:text-gray-700"
                            >
                                Clear category
                            </button>
                        </div>
                    )}

                    {expandedSection === 'sort' && (
                        <div className="space-y-1.5">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => onSortChange(option.value)}
                                    className={`block w-full text-left px-2 py-1 text-xs rounded ${sort === option.value
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'hover:bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                            <button
                                onClick={() => { onSortChange(''); setExpandedSection(null) }}
                                className="text-xs text-gray-500 hover:text-gray-700"
                            >
                                Clear sort
                            </button>
                        </div>
                    )}

                    {expandedSection === 'date' && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <label className="block text-gray-500 mb-0.5">From</label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => onFromDateChange(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-200 rounded text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-0.5">To</label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => onToDateChange(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-200 rounded text-xs"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            {expandedSection !== "date" &&
                <div className="mb-6 mt-6 flex  flex-row items-start justify-center md:justify-start flex-wrap">

                    <select
                        value={selectedYear}
                        onChange={(e) => onYearChange(Number(e.target.value))}
                        className=" rounded-md border text-[13px]  h-6 mr-1 bg-white"
                    >
                        {availableYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>


                        {displayableMonths.map((text, idx) => {
                            const monthNum = idx + 1;
                            const isSelected = selectedMonth === monthNum;

                            return (
                                <button
                                    key={monthNum}
                                    onClick={() => {
                                        onMonthChange(monthNum);

                                    }}
                                    className={`px-2 py-[2px] mx-1 text-xs rounded border
                ${isSelected ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}
                hover:bg-gray-300
              `}
                                >
                                    {text}
                                </button>
                            );
                        })}
                    </div>


         
            }
            {fromDate &&
                <button
                    onClick={() => {
                        onFromDateChange('')
                        onToDateChange("")
                        setExpandedSection("")
                    }}
                    className="text-xs text-gray-900 hover:text-gray-700 bg-slate-100"
                >
                    Clear selected date range
                </button>
            }


        </div >

    );
};

export default ExpenseFilters;
