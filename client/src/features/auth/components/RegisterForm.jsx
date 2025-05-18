import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    two_factor_enabled: false
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { full_name, email, phone, password, confirm_password } = formData;

    if (!full_name || !email || !phone || !password || !confirm_password) {
      setFormError('All fields are required.');
      return;
    }

    if (password !== confirm_password) {
      setFormError('Passwords do not match.');
      return;
    }

    onSubmit(formData);
  };

  return (
<form onSubmit={handleSubmit} className="space-y-5  shadow-md p-3 md:p-6 rounded-2xl">
  

  {(formError || error) && (
    <div className="p-3 bg-red-100/80 border-l-4 border-red-500 rounded-lg flex items-center gap-2 text-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <span className="text-red-800">{formError || error}</span>
    </div>
  )}

  <div className="space-y-4">
    <div>
      <input
        type="text"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-4 py-3 text-sm bg-white/90 border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full px-4 py-3 text-sm bg-white/90 border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full px-4 py-3 text-sm bg-white/90 border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-3 text-sm bg-white/90 border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full px-4 py-3 text-sm bg-white/90 border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  </div>

      <div className="flex items-center justify-between p-4">
          <div>
            <label htmlFor="two_factor_enabled" className="block text-sm font-medium text-gray-700">
              Enable Two-Factor Authentication
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Adds extra security to your account
            </p>
          </div>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="two_factor_enabled"
              id="two_factor_enabled"
              checked={formData.two_factor_enabled}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  two_factor_enabled: e.target.checked
                });
              }}
              className="sr-only"
            />
            <label
              htmlFor="two_factor_enabled"
              className={`block overflow-hidden h-6 rounded-full cursor-pointer ${formData.two_factor_enabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white transform transition-transform ${formData.two_factor_enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
              />
            </label>
          </div>
        </div>

  <button
    type="submit"
    disabled={loading}
    className={`w-full  py-3 px-4 rounded-lg font-medium text-white transition-all ${loading 
      ? 'bg-blue-400 cursor-not-allowed' 
      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
    }`}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Creating account...
      </span>
    ) : (
      'Create Account'
    )}
  </button>

  <div className="text-center text-sm text-gray-600 pt-2">
    Already have an account?{' '}
    <Link 
      to="/" 
      className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
    >
      Sign in
    </Link>
  </div>
</form>
  );
};

export default RegisterForm;