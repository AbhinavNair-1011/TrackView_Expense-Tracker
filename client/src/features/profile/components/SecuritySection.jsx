import React from 'react';
import PasswordUpdate from './PasswordUpdate';

const SecuritySection = ({onPasswordUpdate,loading,updateMessage}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Security</h2>
      <div className="space-y-6">
        
        <PasswordUpdate 
        onSubmit={onPasswordUpdate}
        loading={loading}
        updateMessage={updateMessage}
        />

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-md font-medium text-gray-700">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
          <button className="mt-3 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;