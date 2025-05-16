import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer
  },
});
export default store