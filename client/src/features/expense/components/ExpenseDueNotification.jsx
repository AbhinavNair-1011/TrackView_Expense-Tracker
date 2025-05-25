import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDueNotification } from "../expenseSlice";
import { AlertTriangle, ChevronUp, ChevronDown, Clock } from "lucide-react";

const ExpenseDueNotifications = ({urgentDues}) => {
  const [showUrgent, setShowUrgent] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(false);

  const [urgentDuesLocal, setUrgentDuesLocal] = useState([]);
  const [upcomingDuesLocal, setUpcomingDuesLocal] = useState([]);


  useEffect(() => {
    const today = new Date();

    const urgent = [];
    const upcoming = [];

    urgentDues.forEach((due) => {
      const dueDate = new Date(due.dueDate);
      const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 3) urgent.push(due);
      else upcoming.push(due);
    });

    setUrgentDuesLocal(urgent);
    setUpcomingDuesLocal(upcoming);
  }, [urgentDues]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const toggleUrgent = () => {
    setShowUrgent((prev) => {
      if (!prev) setShowUpcoming(false);
      return !prev;
    });
  };

  const toggleUpcoming = () => {
    setShowUpcoming((prev) => {
      if (!prev) setShowUrgent(false);
      return !prev;
    });
  };

  return (
    <div className=" space-y-2 mt-6 mb-10 pb-5">
      {urgentDuesLocal.length > 0 && (
        <div className="bg-red-100 text-red-800 p-3 rounded-xl shadow">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={toggleUrgent}
          >
            <div className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="w-5 h-5" />
              {urgentDuesLocal.length} Urgent Due
              {urgentDuesLocal.length > 1 ? "s" : ""} within 3 days
            </div>
            {showUrgent ? <ChevronUp /> : <ChevronDown />}
          </div>
          {showUrgent && (
            <ul className="mt-2 space-y-1 max-h-[280px] overflow-scroll">
              {urgentDuesLocal.map((due) => (
                <li
                  key={due.id}
                  className="flex items-center justify-between gap-2 px-2 py-1 bg-white/60 rounded text-sm shadow-sm"
                >
                  <span className="truncate font-medium text-gray-800">
                    {due.title}
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                    Due: {formatDate(due.dueDate)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {upcomingDuesLocal.length > 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-xl shadow">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={toggleUpcoming}
          >
            <div className="flex items-center gap-2 font-semibold">
              <Clock className="w-5 h-5" />
              {upcomingDuesLocal.length} Due
              {upcomingDuesLocal.length > 1 ? "s" : ""} this week
            </div>
            {showUpcoming ? <ChevronUp /> : <ChevronDown />}
          </div>
          {showUpcoming && (
            <ul className="mt-2 space-y-1 max-h-[280px] overflow-scroll">
              {upcomingDuesLocal.map((due) => (
                <li
                  key={due.id}
                  className="flex items-center justify-between gap-2 px-2 py-1 bg-white/60 rounded text-sm shadow-sm"
                >
                  <span className="truncate font-medium text-gray-800">
                    {due.title}
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                    Due: {formatDate(due.dueDate)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {(!upcomingDuesLocal || upcomingDuesLocal.length === 0) && (
        <div className="bg-green-100 text-green-800 p-3 rounded-xl shadow flex items-center gap-2 font-semibold">
          <Clock className="w-5 h-5" />
          No upcoming dues this week
        </div>
      )}
    </div>
  );
};

export default ExpenseDueNotifications;
