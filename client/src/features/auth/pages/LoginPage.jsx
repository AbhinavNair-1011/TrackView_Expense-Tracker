import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../authSlice';
import { useEffect } from 'react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);


  const handleSubmit = async (formData) => {

    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }

  };

  return (
    <div className="max-w-md mx-auto p-4">
      <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
};

export default LoginPage;
