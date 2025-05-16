import React from 'react';
import LogoutButton from '../../auth/components/LogoutButton';
import { useNavigate } from 'react-router-dom';


const ProfileDropdown = () => {
    const navigate = useNavigate();


  return (
    <div className="relative">
      <button className="bg-gray-700 px-3 py-1 rounded">Profile ▾</button>
      <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow rounded">
        <button
          onClick={() => navigate('/dashboard/profile')}
          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
        >
          Update Profile
        </button>
     <LogoutButton/>
      </div>
    </div>
  );
};

export default ProfileDropdown;
