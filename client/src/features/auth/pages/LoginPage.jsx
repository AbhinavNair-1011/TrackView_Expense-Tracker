import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (formData) => {
    dispatch(loginUser(formData));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
};

export default LoginPage;
