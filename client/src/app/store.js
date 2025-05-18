import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import otpReducer from "../features/auth/otpSlice";
import expenseReducer from "../features/expense/expenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    otp:otpReducer,
    expense:expenseReducer
  },
});
export default store