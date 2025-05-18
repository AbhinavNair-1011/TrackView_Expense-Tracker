import React, { useState } from 'react';
import PasswordUpdate from './PasswordUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '../../auth/otpSlice';
import { useEffect } from 'react';

const SecuritySection = ({ onEditToggle, onPasswordUpdate, loading, updateMessage, userProfileData }) => {
  const { loading: faLoading } = useSelector((state) => state.otp);

  const dispatch = useDispatch();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [otpStep, setOtpStep] = useState('initial');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userProfileData) {
      setEmail(userProfileData.email);
      setTwoFactorEnabled(userProfileData.two_fa_enabled === true)
    }
  }, [userProfileData]);





  const handleEnable2FA = async () => {
    try {
      await dispatch(sendOtp({ email, type: '2fa_login' })).unwrap();
      setOtpStep('verify');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.trim().length !== 6) {
      setOtpError('A valid 6-digit OTP is required.');
      return;
    }

    try {
      setOtpError('');
      await dispatch(verifyOtp({ email, otp, type: '2fa_login' })).unwrap();
      
      setTwoFactorEnabled(true);
      setOtpStep('enabled');
      setOtp('');
      setTimeout(() => {
        onEditToggle((prev) => !prev)

      }, 1000);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      setOtpError('Invalid OTP. Please try again.');
    }
  };



  const handleCancelVerifyOtp = () => {
    setOtpStep("initial");
    setOtpError("");
    setOtp("")
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-6">
        <PasswordUpdate
          onSubmit={onPasswordUpdate}
          loading={loading}
          updateMessage={updateMessage}
          onEditToggle={onEditToggle}
        />

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-md font-medium text-gray-700">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-500 mt-1">
            {twoFactorEnabled
              ? 'Extra security layer is enabled for your account'
              : 'Add an extra layer of security to your account'}
          </p>

          {otpStep === 'initial' && (
            <button
              onClick={handleEnable2FA}
              disabled={twoFactorEnabled ? true : (loading ? true : false)}
              className={`mt-3 px-3 py-1.5 text-sm rounded-md transition-colors ${loading
                ? 'bg-blue-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${twoFactorEnabled ? 'bg-green-400 cursor-not-allowed hover:bg-green-400' : ''}`}

            >
              {faLoading ? 'Sending OTP...' : (twoFactorEnabled ? '2FA Active' : 'Enable 2FA')}
            </button>
          )}


          {otpStep === 'verify' && (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-gray-600">
                We've sent a verification code to your email. Please enter it below:
              </p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleVerifyOtp}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Verify
                </button>
                <button
                  onClick={handleCancelVerifyOtp}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {otpStep === 'enabled' && (
            <button
              onClick={handleEnable2FA}
              disabled={twoFactorEnabled ? true : (loading ? true : false)}
              className={`mt-3 px-3 py-1.5 text-sm rounded-md transition-colors ${loading
                ? 'bg-blue-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${twoFactorEnabled ? 'bg-green-400 cursor-not-allowed hover:bg-green-400' : ''}`}

            >
              {faLoading ? 'Sending OTP...' : (twoFactorEnabled ? '2FA Active' : 'Enable 2FA')}
            </button>

          )}
          {otpError && (
            <div className="flex items-center gap-2 text-sm mt-3 text-red-600 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-1 1v3a1 1 0 102 0V7a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{otpError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;