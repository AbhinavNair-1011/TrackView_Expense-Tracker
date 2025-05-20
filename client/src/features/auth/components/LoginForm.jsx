import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLoginSubmit, onOtpSubmit, loading, error }) => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [otp, setOtp] = useState('');
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (error) setFormError(error);
  }, [error]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;
    setFormError('');
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const { email, password } = formData;
    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }

    try {
      const result = await onLoginSubmit(formData);
      if (result?.twoFactor) {
        setTwoFactorRequired(true);
      }
    } catch {
      setFormError('Login failed. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!otp) {
      setFormError('OTP is required.');
      return;
    }

    try {
      const result = await onOtpSubmit({ email: formData.email, otp, type: '2fa_setup' });
      if (!result?.success) {
        setFormError('Invalid OTP');
      }
    } catch {
      setFormError('OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-3 md:p-6 rounded-2xl shadow-md">
      <div className="">
        <div className="text-center ">
          <h2 className="text-xl  text-transparent mb-4 bg-clip-text bg-black">
            Welcome Back
          </h2>
        </div>

        {(formError || error) && (
          <div className="mb-0 md:mb-6 p-3 bg-red-100/80 border-l-4 border-red-500 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-red-800">{formError || error}</span>
          </div>
        )}

        <form onSubmit={twoFactorRequired ? handleOtpSubmit : handleLoginSubmit} className="space-y-5 p-2">
          <div >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/80 border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
              required
              disabled={twoFactorRequired}
            />
          </div>

          {!twoFactorRequired && (
            <div className='mb-6'>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/reset-password" className="text-sm text-blue-600 hover:text-blue-500 hover:underline transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/80 border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {twoFactorRequired && (
            <div className='mb-6'>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-white/20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the 6-digit OTP"
                required
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {twoFactorRequired ? 'Verifying...' : 'Signing in...'}
              </span>
            ) : twoFactorRequired ? (
              'Verify OTP'
            ) : (
              'Sign in'
            )}
          </button>

        </form>
      </div>

      <p className="text-sm text-center text-gray-600 p-4">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors">
          Sign up
        </Link>
      </p>

    </div>
  );
};

export default LoginForm;
