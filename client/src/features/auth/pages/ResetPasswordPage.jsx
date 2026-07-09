import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { sendOtp, verifyOtp, resetPassword, resetOtpState, resendOtp } from '../otpSlice';
import SendOtpForm from '../components/SendOtpForm';
import VerifyOtpForm from '../components/VerifyOtpForm';
import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPasswordPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error , resendLoading } = useSelector((state) => state.otp);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState('sendOtp');
  const [message, setMessage] = useState("")

  const handleSendOtp = async () => {
    const result = await dispatch(sendOtp({ email, type: 'forgot_password' }));
    if (sendOtp.fulfilled.match(result)) {
      setStep('verifyOtp');
      setMessage("OTP sent successfully")
    }
  };
const handleReSendOtp = async () => {
    const result = await dispatch(resendOtp({ email, type: 'forgot_password' }));
    if (resendOtp.fulfilled.match(result)) {
      setStep('verifyOtp');
      setMessage("OTP resent successfully")
    }
  };
  const handleVerifyOtp = async () => {
    const result = await dispatch(verifyOtp({ email, type: 'forgot_password', otp }));
    if (verifyOtp.fulfilled.match(result)) {
      setStep('resetPassword');
      setMessage("OTP verified")

    }
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
  const goBack = () => {
    setOtp("")
    setMessage("");
    dispatch(resetOtpState())
    if (step === 'verifyOtp') {
      setStep('sendOtp');
    } else if (step === 'resetPassword') {
      setStep('verifyOtp');
    } else {
      navigate('/');
    }
  };

  return (
    <div className=" min-h-screen p-6 border rounded shadow bg-gradient-to-br from-slate-100 via-blue-100 to-cyan-100">
      <button
        onClick={goBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>

      <h2 className="text-2xl font-semibold mb-4 text-center md:mt-10">Reset Password</h2>

      <div className='w-full flex justify-center ' >

        <div className={`mb-4 w-md  ${error ? 'text-red-600' : message ? 'text-green-600' : 'hidden'}`}>
          {error || message}
        </div>

      </div>


      {step === 'sendOtp' && (
        <SendOtpForm email={email} setEmail={setEmail} onSubmit={handleSendOtp} loading={loading} onResendSubmit={handleReSendOtp} />
      )}

      {step === 'verifyOtp' && (
        <VerifyOtpForm otp={otp} setOtp={setOtp} onSubmit={handleVerifyOtp} loading={loading} onResendSubmit={handleReSendOtp} resendLoading={resendLoading} />
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
