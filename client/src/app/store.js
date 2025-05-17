import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import otpReducer from "../features/auth/otpSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    otp:otpReducer
  },
});
export default store