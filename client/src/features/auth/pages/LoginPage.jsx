import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { loginUser, resetError, verifyLogin } from '../authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetError());
  }, []);

  const handleLoginSubmit = async (formData) => {
    const result = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(result)) {
      if (result.payload?.twoFactor) {
        return { twoFactor: true };
      } else if (result.payload?.user) {
        navigate('/dashboard');
        return { success: true };
      }
    }
    return { success: false };
  };

  const handleOtpSubmit = async (formData) => {
    const result = await dispatch(verifyLogin(formData));
    if (verifyLogin.fulfilled.match(result)) {
      if (result.payload?.user) {
        navigate('/dashboard');
        return { success: true };
      }
    }
    return { success: false };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl md:text4xl p-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <LoginForm
            onLoginSubmit={handleLoginSubmit}
            onOtpSubmit={handleOtpSubmit}
            loading={loading}
            error={error}
          />
    
      </div>
    </div>
  );
};

export default LoginPage;