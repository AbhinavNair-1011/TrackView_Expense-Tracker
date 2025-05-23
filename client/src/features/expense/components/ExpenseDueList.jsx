import { useEffect, useMemo, useState } from "react";
import { fetchDues, markDuePaid, deleteDue } from "../expenseSlice";
import { useDispatch } from "react-redux";

const ExpenseDueList = ({ dues }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const today = new Date();

    useEffect(() => {
        dispatch(fetchDues({ status: activeTab, query: searchTerm }))
            .unwrap()
            .then((result) => {
                setLoading(false);

            });

    }, [activeTab, searchTerm, dispatch]);


    const getDaysBetween = (dateStr) => {
        const dueDate = new Date(dateStr);
        return Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    };

   const filteredDues = useMemo(() => {
    return dues.filter(due => {
        if (activeTab === 'upcoming') return !due.isPaid && getDaysBetween(due.dueDate) >= 0;
        if (activeTab === 'overdue') return !due.isPaid && getDaysBetween(due.dueDate) < 0;
        if (activeTab === 'paid') return due.isPaid;
        return true;
    });
}, [dues, activeTab]);
  const grouped = useMemo(() => {
    if (activeTab !== 'upcoming') {
        return { ['Please clear your dues']: filteredDues };
    }

    const result = {
        Today: [],
        Tomorrow: [],
        'This Week': [],
        'This Month': [],
        Later: [],
    };

    filteredDues.forEach(due => {
        const days = getDaysBetween(due.dueDate);
        if (days === 0) result.Today.push(due);
        else if (days === 1) result.Tomorrow.push(due);
        else if (days <= 6) result['This Week'].push(due);
        else if (days <= 30) result['This Month'].push(due);
        else result.Later.push(due);
    });

    return result;
}, [filteredDues, activeTab]);

    const groupedByTitle = useMemo(() => {
        return dues.reduce((acc, due) => {
            const key = due.title.trim().split(/\s+/).length === 1 ? due.title : due.title.trim();
            if (!acc[key]) acc[key] = [];
            acc[key].push(due);
            return acc;
        }, {});
    }, [dues]);

    const handleMarkAllFilteredPaid = () => {
        const unpaidIds = filteredDues.filter(d => !d.isPaid).map(d => d.id);
        if (unpaidIds.length) {
            dispatch(markDuePaid(unpaidIds)).then(() => {
                dispatch(fetchDues({ status: activeTab, query: searchTerm }));
            });
        }
    };

    const handleMarkGroupPaid = (group) => {
        const unpaidIds = group.filter(d => !d.isPaid).map(d => d.id);
        if (unpaidIds.length) {
            dispatch(markDuePaid(unpaidIds)).then(() => {
                dispatch(fetchDues({ status: activeTab, query: searchTerm }));
            });
        }
    };

    const handleMarkSinglePaid = (id) => {
        dispatch(markDuePaid([id])).then(() => {
            dispatch(fetchDues({ status: activeTab, query: searchTerm }));
        });
    };

    const handleDeleteDue = (id) => {
        dispatch(deleteDue(id)).then(() => {
            dispatch(fetchDues({ status: activeTab, query: searchTerm }));
        });
    };

    const tabs = ['upcoming', 'overdue', 'paid'];

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-50 mb-5 shadow-inner w-full pl-9 pr-20 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            />
            <svg className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
                <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 bg-red-600 text-white top-2 flex items-center justify-center w-5 h-5 rounded-full"
                    aria-label="Clear search"
                >
                    &times;
                </button>
            )}
            {searchTerm && filteredDues.length > 0 && (
                <div className="flex flex-row justify-between items-end mt-6 border-t pt-4">
                    <div className="text-sm font-medium text-gray-700">
                        Total Amount: ₹{filteredDues.reduce((sum, due) => sum + due.amount, 0)}
                    </div>
                    <button
                        onClick={handleMarkAllFilteredPaid}
                        className="mt-2 sm:mt-0 bg-green-100 text-green-700 text-[11px] px-2 py-1 rounded hover:bg-green-200"
                    >
                        Mark All Paid
                    </button>
                </div>
            )}

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => { setLoading(true); setActiveTab(tab) }}
                                className={`text-sm px-4 py-1.5 rounded-full transition-colors ${activeTab === tab
                                    ? 'bg-blue-600 text-white font-medium'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 min-h-[200px]">


                    {loading ? (
                        <div className="flex justify-center py-10">
                            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        </div>
                    ) : (
                        <>
                            {searchTerm && activeTab !== "paid" ? (
                                Object.entries(groupedByTitle).map(([title, group]) => {
                                    const total = group.reduce((sum, d) => sum + d.amount, 0);
                                    return (
                                        <div key={title} className="bg-gray-50 border p-3 rounded-md mb-3">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-semibold text-gray-700">{title}</h3>
                                                    <p className="text-sm text-gray-500">{group.length} dues · ₹{total}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleMarkGroupPaid(group)}
                                                    className="sm:text-sm pl-0 p-[2px] text-[12px] sm:px-3 sm:py-1.5 bg-green-50 text-green-600 rounded-md transition-colors"
                                                >
                                                    Mark All Paid
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                Object.entries(grouped).map(([groupName, dues]) =>
                                    dues.length > 0 && (
                                        <div key={groupName} className="space-y-2">
                                            <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                                                {activeTab !== "paid" ? groupName : "Cleared Dues, Keep it up"}
                                            </h4>
                                            <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                                                {dues.map((due) => (
                                                    <li
                                                        key={due.id}
                                                        className="grid grid-cols-2 sm:grid-cols-3 items-start px-4 py-3 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className="flex items-end gap-2">
                                                            <span className="text-md truncate font-medium text-gray-800">{due.title}</span>
                                                        </div>

                                                        <div className="text-sm text-gray-700 row-span-2 h-full flex flex-col text-right sm:flex-row justify-evenly sm:items-center items-end">
                                                            <div className="text-[14px] text-start min-w-[60px]">₹{due.amount}</div>
                                                            {activeTab === 'upcoming' && (
                                                                <div className="text-xs text-gray-500 min-w-[106px]">
                                                                    Due {new Date(due.dueDate).toLocaleDateString('en-IN', {
                                                                        day: 'numeric',
                                                                        month: 'short',
                                                                    })}
                                                                </div>
                                                            )}
                                                            {activeTab === 'overdue' && (
                                                                <div className="text-xs text-red-600 font-medium min-w-[106px]">
                                                                    Overdue by {Math.abs(getDaysBetween(due.dueDate))} day{Math.abs(getDaysBetween(due.dueDate)) > 1 ? 's' : ''}
                                                                </div>
                                                            )}
                                                            {activeTab === 'paid' && (
                                                                <div className="text-xs text-gray-500 min-w-[106px]">
                                                                    Paid on date not active yet
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="text-right flex gap-2 justify-start sm:justify-end">
                                                            {!due.isPaid && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleMarkSinglePaid(due.id)}
                                                                        className="sm:text-sm pl-0 p-[2px] text-[10px] sm:px-3 sm:py-1.5 bg-green-50 text-green-600 rounded-md transition-colors"
                                                                    >
                                                                        Mark Paid
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteDue(due.id)}
                                                                        className="text-gray-400 hover:text-red-600 p-1"
                                                                        title="Delete"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m4-3h2a1 1 0 011 1v1H8V5a1 1 0 011-1z" />
                                                                        </svg>
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )
                                )
                            )}

                            {!loading && filteredDues.length === 0 && (
                                <div className="text-center py-8 space-y-2">
                                    <p className="text-gray-500">No dues {activeTab}.</p>
                                    <button
                                        disabled
                                        className="inline-flex items-center px-4 py-2 text-sm text-gray-400 bg-gray-100 rounded-full cursor-not-allowed"
                                    >
                                        Add Your First Due
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpenseDueList;
