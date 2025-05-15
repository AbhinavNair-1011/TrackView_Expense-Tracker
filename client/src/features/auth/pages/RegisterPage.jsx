import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import { registerUser } from '../authSLice';


const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (formData) => {
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
    </div>
  );
};

export default RegisterPage;
