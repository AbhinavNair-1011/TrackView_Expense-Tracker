import React, { useEffect, useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import PersonalInfoForm from '../components/PersonalInfoForm';
import SecuritySection from '../components/SecuritySection';
import DeleteAccount from '../components/DeleteAccount';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile, updatePassword } from '../profileSlice';
import PersonalInfoView from '../components/PersonalInfoView'
import SecurityView from '../components/SecurityView';

const Profile = () => {
  const dispatch = useDispatch();
  const { userProfile, error, loading, updateMessage } = useSelector((state) => state.profile);
  const [isSecurityEditing, setIsSecurityEditing] = useState(false);
  const [isPersonalInfoEditing, setIsPersonalInfoEditing] = useState(false);




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
    <div className="max-w-6xl mx-auto  bg-gray-50 min-h-screen">

      <ProfileHeader />

      {error && (
        <div className="mb-6 mt-2 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8 mt-6">

        <div className="flex-1 space-y-6">

          {isPersonalInfoEditing ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <button
                  onClick={() => setIsPersonalInfoEditing(false)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
              <PersonalInfoForm
                onSubmit={handlePersonalInfo}
                loading={loading}
                error={error}
                userProfileData={userProfile}
                updateMessage={updateMessage}
                onEditToggle={setIsPersonalInfoEditing}
              />
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <button
                  onClick={() => setIsPersonalInfoEditing(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
              <PersonalInfoView userProfileData={userProfile} />
            </div>
          )}

          {isSecurityEditing ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
                <button
                  onClick={() => setIsSecurityEditing(false)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
              <SecuritySection
                onPasswordUpdate={handlePasswordUpdate}
                loading={loading}
                updateMessage={updateMessage}
                userProfileData={userProfile}
                onEditToggle={setIsSecurityEditing}
              />
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
                <button
                  onClick={() => setIsSecurityEditing(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Manage
                </button>
              </div>
              <SecurityView />
            </div>
          )}


        </div>
        {/* 
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <DeleteAccount />
          </div>
        </div> */}
      </div>




    </div>
  );
};

export default Profile;