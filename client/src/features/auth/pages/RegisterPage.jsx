import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import { registerUser } from '../authSLice';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (formData) => {
   const result=await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
    </div>
  );
};

export default RegisterPage;
