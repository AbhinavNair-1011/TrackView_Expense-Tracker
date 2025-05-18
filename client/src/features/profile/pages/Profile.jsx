import React, { useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import PersonalInfoForm from '../components/PersonalInfoForm';
import SecuritySection from '../components/SecuritySection';
import DeleteAccount from '../components/DeleteAccount';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, updatePassword } from '../profileSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { userProfile, error, loading, updateMessage } = useSelector((state) => state.profile);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      await dispatch(fetchProfile());
    }
    fetchUserProfile();
  }, []);

  const handlePersonalInfo = async (formData) => {
    return dispatch(updateProfile(formData)).unwrap();
  };

  const handlePasswordUpdate = async (passwordData) => {
    return dispatch(updatePassword(passwordData)).unwrap();  
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <ProfileHeader />

      {error && (
        <div className="mb-6 mt-2 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
    

      <div className="flex flex-col md:flex-row gap-8 mt-6">

        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <PersonalInfoForm
              onSubmit={handlePersonalInfo}
              loading={loading}
              error={error}
              userProfileData={userProfile}
              updateMessage={updateMessage}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <SecuritySection
              onPasswordUpdate={handlePasswordUpdate}
              loading={loading}
              updateMessage={updateMessage}
              userProfileData={userProfile}
            />
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;