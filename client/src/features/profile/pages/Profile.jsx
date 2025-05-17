import React, { useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import PersonalInfoForm from '../components/PersonalInfoForm';
import SecuritySection from '../components/SecuritySection';
import DeleteAccount from '../components/DeleteAccount';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile,updatePassword } from '../profileSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { userProfile, error, loading, updateMessage } = useSelector((state) => state.profile);
  useEffect(() => {

    const fetchUserProfile = async () => {

      await dispatch(fetchProfile());
    }
    fetchUserProfile()

  }, []);

  const handlePersonalInfo = async (formData) => {
    return dispatch(updateProfile(formData)).unwrap();
  };

  const handlePasswordUpdate = async (passwordData) => {
  return dispatch(updatePassword(passwordData)).unwrap()  

  };
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileHeader />

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="flex-1 space-y-6">

          <PersonalInfoForm
            onSubmit={handlePersonalInfo}
            loading={loading}
            error={error}
            userProfileData={userProfile}
            updateMessage={updateMessage} />

          <SecuritySection
           onPasswordUpdate={handlePasswordUpdate}
          loading={loading}
          updateMessage={updateMessage}
          userProfileData={userProfile}
          />
        </div>

        <div className="md:w-1/3">
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Profile;