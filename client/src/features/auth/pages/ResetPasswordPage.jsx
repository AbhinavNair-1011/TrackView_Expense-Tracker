import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { sendOtp, verifyOtp, resetPassword, resetOtpState } from '../otpSlice';
import SendOtpForm from '../components/SendOtpForm';
import VerifyOtpForm from '../components/VerifyOtpForm';
import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error, message } = useSelector((state) => state.otp);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState('sendOtp');

  const handleSendOtp = async () => {
    const result = await dispatch(sendOtp({ email, type: 'forgot_password' }));
    if (sendOtp.fulfilled.match(result)) setStep('verifyOtp');
  };

  const handleVerifyOtp = async () => {
    const result = await dispatch(verifyOtp({ email, type: 'forgot_password', otp }));
    if (verifyOtp.fulfilled.match(result)) setStep('resetPassword');
  };

const handleResetPassword = async () => {
  const result = await dispatch(resetPassword({ email, newPassword }));
  if (resetPassword.fulfilled.match(result)) {
    dispatch(resetOtpState());
    setEmail('');
    setOtp('');
    setNewPassword('');
    navigate('/'); 
  }
};
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {message && <div className="mb-4 text-green-600">{message}</div>}

      {step === 'sendOtp' && (
        <SendOtpForm email={email} setEmail={setEmail} onSubmit={handleSendOtp} loading={loading} />
      )}

      {step === 'verifyOtp' && (
        <VerifyOtpForm otp={otp} setOtp={setOtp} onSubmit={handleVerifyOtp} loading={loading} />
      )}

      {step === 'resetPassword' && (
        <ResetPasswordForm
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          onSubmit={handleResetPassword}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ResetPasswordPage;
