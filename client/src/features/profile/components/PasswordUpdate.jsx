import React, { useState } from 'react';
import { updatePassword } from '../profileSlice';

const PasswordUpdate = ({ onSubmit, loading , onEditToggle}) => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
    setUpdateMessage("")
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!passwords.current) {
      newErrors.current = 'Current password is required';
    }

    if (!passwords.new) {
      newErrors.new = 'New password is required';
    } else if (passwords.new.length < 8) {
      newErrors.new = 'Password must be at least 8 characters';
    }

    if (passwords.new !== passwords.confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateMessage("")
    if (!validateForm()) return;

    try {

      const result = await onSubmit({
        currentPassword: passwords.current,
        newPassword: passwords.new
      });

      setUpdateMessage("Password Updated Successfully");
      setPasswords({
    current: '',
    new: '',
    confirm: '',
  })
    setTimeout(()=>{
        onEditToggle((prev)=>!prev)

      },2000)

    } catch (err) {
      setErrors({ updatePassword: err })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Password
        </label>
        <input
          type="password"
          name="current"
          value={passwords.current}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${errors.current ? 'border-red-500' : 'border-gray-300'
            } focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.current && (
          <p className="mt-1 text-sm text-red-600">{errors.current}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          type="password"
          name="new"
          value={passwords.new}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${errors.new ? 'border-red-500' : 'border-gray-300'
            } focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.new && (
          <p className="mt-1 text-sm text-red-600">{errors.new}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirm"
          value={passwords.confirm}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${errors.confirm ? 'border-red-500' : 'border-gray-300'
            } focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.confirm && (
          <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
        )}
      </div>

      {errors.updatePassword && (
        <p className="mt-1 text-sm text-red-600">{errors.updatePassword}</p>
      )}
      {updateMessage && (
        <p className="text-center text-green-600 bg-green-50 px-4 py-3 rounded-md border border-green-200 mb-4 mx-auto max-w-md">
          {updateMessage}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
};

export default PasswordUpdate;