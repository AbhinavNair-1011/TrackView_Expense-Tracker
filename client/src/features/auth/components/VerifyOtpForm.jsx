import React from 'react';

const VerifyOtpForm = ({ otp, setOtp, onSubmit, loading }) => (
  <div className="max-w-md mx-auto bg-slate-100 p-8 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Verify OTP</h2>
    
    <div className="mb-6">
      <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
        6-Digit Verification Code
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="6"
          placeholder="123456"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            setOtp(value);
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-center tracking-widest font-mono text-xl"
          required
        />
      </div>
    </div>

    <button
      onClick={onSubmit}
      disabled={loading || otp.length !== 6}
      className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md ${
        loading || otp.length !== 6 ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Verifying...
        </span>
      ) : (
        'Verify Code'
      )}
    </button>

    <p className="mt-4 text-sm text-gray-600 text-center">
      Enter the 6-digit code sent to your email
    </p>
  </div>
);

export default VerifyOtpForm;