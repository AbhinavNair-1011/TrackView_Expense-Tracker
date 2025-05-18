import React from 'react';
import ProfileAvatar from './ProfileAvatar';

const ProfileHeader = () => {
  return (
    <div className="flex-col sm:flex items-end p-1 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className='flex flex-col sm:flex-row w-full justify-between mb-4'>

        <div className='flex justify-between items-center'>
          <div className="relative mr-5  sm:mr-4 mb-5 sm:mb-0 ">
            <ProfileAvatar />
          </div>

          <div className="flex-1 ml-2 ">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Your Profile</h1>
            <p className="text-gray-500 text-sm md:text-base">
              Manage your personal information and security settings
            </p>


          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileHeader;