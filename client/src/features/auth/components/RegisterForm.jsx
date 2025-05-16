import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const RegisterForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    full_name:'',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { full_name, email, phone, password, confirm_password } = formData;

    if (!full_name|| !email || !phone || !password || !confirm_password) {
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
<form 
  onSubmit={handleSubmit} 
  noValidate 
  aria-live="polite"
  className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4"
>
  <h2 className="text-2xl font-bold text-gray-800 text-center">Create Account</h2>

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

    <div className="space-y-1">
      <label htmlFor="full_name" className="block text-sm text-gray-600">
        Full Name
      </label>
      <input
        id="first_name"
        type="text"
        name="full_name"
        autoComplete="given-name"
        value={formData.full_name}
        onChange={handleChange}
        required
        aria-invalid={!!formError}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

 

  <div className="space-y-1">
    <label htmlFor="email" className="block text-sm text-gray-600">
      Email
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
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div className="space-y-1">
    <label htmlFor="phone" className="block text-sm text-gray-600">
      Phone Number
    </label>
    <input
      id="phone"
      type="tel"
      name="phone"
      autoComplete="tel"
      value={formData.phone}
      onChange={handleChange}
      required
      aria-invalid={!!formError}
      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div className="grid grid-cols-2 gap-3">
    <div className="space-y-1">
      <label htmlFor="password" className="block text-sm text-gray-600">
        Password
      </label>
      <input
        id="password"
        type="password"
        name="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        required
        aria-invalid={!!formError}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div className="space-y-1">
      <label htmlFor="confirm_password" className="block text-sm text-gray-600">
        Confirm Password
      </label>
      <input
        id="confirm_password"
        type="password"
        name="confirm_password"
        autoComplete="new-password"
        value={formData.confirm_password}
        onChange={handleChange}
        required
        aria-invalid={!!formError}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>

  <button
    type="submit"
    disabled={loading}
    className={`w-full mt-4 py-2 px-4 text-sm font-medium rounded-md text-white ${
      loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
    }`}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Registering...
      </span>
    ) : (
      'Register'
    )}
  </button>

  <div className="text-center text-sm text-gray-600">
    Already have an account?{' '}
      <Link 
    to="/" 
    className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
  >
    Sign in
  </Link>
  </div>
</form>

  );
};

export default RegisterForm;
