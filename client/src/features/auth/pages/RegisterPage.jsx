import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import { registerUser, resetError } from '../authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);


    useEffect(() => {
      dispatch(resetError());
    }, []);

  const handleRegister = async (formData) => {
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-center  px-1 lg:px-8">
      <div className="sm:mx-auto sm:w-full md:max-lg">
        <h2 className="mt-6 text-center text-3xl md:text4xlfont-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
         Join our community and unlock exclusive features
        </p>

      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <RegisterForm 
            onSubmit={handleRegister} 
            loading={loading} 
            error={error} 
          />

   
        
      </div>
    </div>
  );
};

export default RegisterPage;