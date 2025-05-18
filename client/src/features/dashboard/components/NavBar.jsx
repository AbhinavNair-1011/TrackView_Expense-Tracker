import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector(state => state.auth.user); 

  return (
    <nav className= " transition-all duration-300 ease-in-out w-full fixed z-20 bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      <Link to="/dashboard" className="text-xl font-bold flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 mr-2 text-blue-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        ExpenseTracker
      </Link>
      <ProfileDropdown user={user} />
    </nav>
  );
};

export default Navbar;