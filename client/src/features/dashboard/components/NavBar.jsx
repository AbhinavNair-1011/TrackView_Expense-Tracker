import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow">
      <Link to="/dashboard" className="text-xl font-bold">
        ExpenseTracker
      </Link>
      <ProfileDropdown />
    </nav>
  );
};

export default Navbar;
