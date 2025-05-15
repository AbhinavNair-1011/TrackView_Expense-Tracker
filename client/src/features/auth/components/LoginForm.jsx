import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setFormError('Email and password are required.');
      return;
    }


    onSubmit(formData);
  };

  return (
<form 
  onSubmit={handleSubmit} 
  noValidate 
  aria-live="polite"
  className="w-full max-w-sm space-y-6"
>
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
    <p className="mt-2 text-gray-600">Sign in to your account</p>
  </div>

   {(formError || error) && (
    <div 
      role="alert"
      className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100 flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <span>{formError || error}</span>
    </div>
  )}

  <div className="space-y-2">
    <label 
      htmlFor="email" 
      className="block text-sm font-medium text-gray-700"
    >
      Email address
    </label>
    <input
      id="email"
      type="email"
      name="email"
      autoComplete="email"
      value={formData.email}
      onChange={handleChange}
      required
      aria-invalid={!!formError}
      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      placeholder="you@example.com"
    />
  </div>

  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label 
        htmlFor="password" 
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <a 
        href="/forgot-password" 
        className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
      >
        Forgot password?
      </a>
    </div>
    <input
      id="password"
      type="password"
      name="password"
      autoComplete="current-password"
      value={formData.password}
      onChange={handleChange}
      required
      aria-invalid={!!formError}
      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      placeholder="••••••••"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
      loading 
        ? 'bg-blue-400 cursor-not-allowed' 
        : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Logging in...
      </span>
    ) : (
      'Sign in'
    )}
  </button>

  <div className="text-center text-sm text-gray-600">
    Don't have an account?{' '}
    <Link
      to="/register" 
      className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
    >
      Sign up
    </Link>
  </div>
</form>
  );
};

export default LoginForm;
