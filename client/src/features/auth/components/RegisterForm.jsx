import React, { useState } from 'react';

const RegisterForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
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
    const { first_name, last_name, email, phone, password, confirm_password } = formData;

    if (!first_name || !last_name || !email || !phone || !password || !confirm_password) {
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
  className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-5"
>
  <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Create Account</h2>

  {(formError || error) && (
    <div 
      role="alert"
      className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100"
    >
      {formError || error}
    </div>
  )}

  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-1">
      <label 
        htmlFor="first_name" 
        className="block text-sm font-medium text-gray-700"
      >
        First Name
      </label>
      <input
        id="first_name"
        type="text"
        name="first_name"
        autoComplete="given-name"
        value={formData.first_name}
        onChange={handleChange}
        required
        aria-invalid={!!formError}
        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>

    <div className="space-y-1">
      <label 
        htmlFor="last_name" 
        className="block text-sm font-medium text-gray-700"
      >
        Last Name
      </label>
      <input
        id="last_name"
        type="text"
        name="last_name"
        autoComplete="family-name"
        value={formData.last_name}
        onChange={handleChange}
        required
        aria-invalid={!!formError}
        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
  </div>

  <div className="space-y-1">
    <label 
      htmlFor="email" 
      className="block text-sm font-medium text-gray-700"
    >
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
      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>

  <div className="space-y-1">
    <label 
      htmlFor="phone" 
      className="block text-sm font-medium text-gray-700"
    >
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
      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-1">
      <label 
        htmlFor="password" 
        className="block text-sm font-medium text-gray-700"
      >
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
        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>

    <div className="space-y-1">
      <label 
        htmlFor="confirm_password" 
        className="block text-sm font-medium text-gray-700"
      >
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
        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
  </div>

  <button 
    type="submit" 
    disabled={loading}
    className={`w-full mt-6 py-3 px-4 text-sm font-medium rounded-lg text-white transition-colors ${
      loading
        ? 'bg-blue-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
    }`}
    aria-disabled={loading}
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
</form>

  );
};

export default RegisterForm;
