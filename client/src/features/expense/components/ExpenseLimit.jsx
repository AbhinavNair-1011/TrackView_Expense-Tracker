import React, { useState } from "react";

const ExpenseLimit = () => {
  const [limit, setLimit] = useState(1500);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const expenses = [
    { category: "Food", amount: 420, color: "bg-amber-500" },
    { category: "Transport", amount: 180, color: "bg-blue-500" },
    { category: "Entertainment", amount: 150, color: "bg-purple-500" },
    { category: "Bills", amount: 350, color: "bg-red-500" },
  ];

  const duePayments = [
    { name: "Netflix", amount: 15, dueIn: 3 },
    { name: "Electric", amount: 85, dueIn: 5 },
    { name: "Rent", amount: 1200, dueIn: 8 },
  ];

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const progressPercentage = Math.min((totalSpent / limit) * 100, 100);

  return (
    <div className="w-full p-6 rounded-xl blur-sm border border-gray-200 shadow-sm bg-black">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Spending Dashboard</h2>
          <p className="text-gray-500">Track and manage your expenses</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1 rounded-full text-sm ${activeTab === "overview" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("dues")}
            className={`px-3 py-1 rounded-full text-sm ${activeTab === "dues" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
          >
            Upcoming Dues
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Monthly Limit: ${limit}</span>
              <span className={`font-semibold ${totalSpent > limit ? "text-red-500" : "text-green-600"}`}>
                Spent: ${totalSpent}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${progressPercentage > 80 ? "bg-red-500" : progressPercentage > 50 ? "bg-amber-500" : "bg-green-500"}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>80%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Category Breakdown</h3>
            <div className="space-y-3">
              {expenses.map((expense, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${expense.color} mr-2`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span>{expense.category}</span>
                      <span>${expense.amount}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                      <div 
                        className="h-1.5 rounded-full bg-gray-400" 
                        style={{ width: `${(expense.amount / totalSpent) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "dues" && (
        <div className="space-y-4">
          <h3 className="font-medium">Upcoming Payments</h3>
          {duePayments.map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{payment.name}</div>
                <div className="text-sm text-gray-500">Due in {payment.dueIn} days</div>
              </div>
              <div className="font-semibold">${payment.amount}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          min="0"
          placeholder="Update monthly limit ($)"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none"
        />
        <button
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Update Limit
        </button>
      </div>
    </div>
  );
};

export default ExpenseLimit;