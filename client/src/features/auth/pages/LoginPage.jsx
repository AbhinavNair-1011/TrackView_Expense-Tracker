import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { loginUser, verifyLogin } from '../authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

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
    <div className="max-w-md mx-auto p-4">
      <LoginForm
        onLoginSubmit={handleLoginSubmit}
        onOtpSubmit={handleOtpSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default LoginPage;
