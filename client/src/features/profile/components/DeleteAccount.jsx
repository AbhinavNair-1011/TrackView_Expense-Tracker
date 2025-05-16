import React, { useState } from 'react';

const DeleteAccount = () => {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
      <h2 className="text-lg font-semibold text-red-700">Delete Account</h2>
      <p className="text-sm text-gray-600 mt-2">
        Permanently remove your account and all associated data
      </p>
      
      {!isConfirming ? (
        <button
          onClick={() => setIsConfirming(true)}
          className="mt-4 px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Delete Account
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-gray-700">Are you sure? This action cannot be undone.</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsConfirming(false)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-3 py-1.5 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;