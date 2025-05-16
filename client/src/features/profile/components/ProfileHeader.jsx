import React from 'react';
import ProfileAvatar from './ProfileAvatar';

const ProfileHeader = () => {
  return (
    <div className="flex items-center gap-6">
      <ProfileAvatar />
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        <p className="text-gray-600">Manage your personal information and security settings</p>
      </div>
    </div>
  );
};

export default ProfileHeader;