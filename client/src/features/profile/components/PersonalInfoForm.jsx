import React, { useEffect, useState } from 'react';
import { updateProfile } from '../profileSlice';

const PersonalInfoForm = ({ onSubmit, error, loading, userProfileData, onEditToggle }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: ''
  });
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    if (userProfileData) {
      setFormData({
        full_name: userProfileData.full_name || '',
        email: userProfileData.email || '',
        phone: userProfileData.phone || '',
        dob: userProfileData.dob || '',
        gender: userProfileData.gender || '',
        address: userProfileData.address || ''
      });
    }
  }, [userProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setUpdateMessage("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateMessage("");

    try {
      const result = await onSubmit(formData);
      setUpdateMessage("Updated Successfully");
      setTimeout(()=>{
        onEditToggle((prev)=>!prev)

      },2000)

    } catch (err) {
      setUpdateMessage("")
    }

  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              disabled
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col md:space-x-4 space-y-4 md:space-y-0 ">
          <div className="flex-1 flex flex-col items-center">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-2/4 px-3 py-2 border border-gray-300 bg-white rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {updateMessage && (
          <p className="text-center text-green-600 bg-green-50 px-4 py-3 rounded-md border border-green-200 mb-4 mx-auto max-w-md">
            {updateMessage}
          </p>
        )}
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;