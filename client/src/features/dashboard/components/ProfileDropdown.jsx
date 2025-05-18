import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../../auth/components/LogoutButton';

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative ">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {user?.full_name?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="hidden md:inline-block font-medium">{user?.full_name}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="transition-all duration-300 ease-in-out z-30 absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <div className="px-4 py-2 border-b border-gray-100  text-black ">
            <p className="text-sm font-semibold capitalize ">{user?.full_name}</p>
            <p className="text-xs truncate capitalize">{user?.email}</p>
          </div>
          <button
            onClick={() => {
              navigate('/dashboard/profile');
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          >
            <div className="flex items-center">
            
              Profile Settings
            </div>
          </button>
          <div className="">
            <LogoutButton  />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;