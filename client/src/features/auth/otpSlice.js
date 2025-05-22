import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../app/axiosConfig"

const initialState = {
  verified: false,
  loading: false,
  error: null,
  message: null,
};




export const sendOtp = createAsyncThunk(
  'otp/sendOtp',
  async ({ email, type }, thunkAPI) => {
    try {
      const response = await api.post('/auth/send-otp', { email, type });
      return response.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to send OTP');
    }
  }
);

export const resendOtp = createAsyncThunk(
  'otp/resendOtp',
  async ({ email, type }, thunkAPI) => {
    try {
      const response = await api.post('/auth/send-otp', { email, type });
      return response.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to send OTP');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async ({ email, type, otp }, thunkAPI) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, type, otp });
      return response.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to verify OTP');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'otp/resetPassword',
  async ({ email, newPassword }, thunkAPI) => {
    try {
      const response = await api.post('/auth/reset-password', { email, newPassword });
      return response.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to reset password');
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    resetOtpState(state) {
      state.verified = false;
      state.loading = false;
      state.error = null;
      state.message = null;
      state.resendLoading=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send OTP';
      })
      .addCase(resendOtp.pending, (state) => {
        state.resendLoading=true
        state.error = null;
        state.message = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendLoading=false
        state.error=null;
        state.message = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.message=null;
        state.error = action.payload || 'Failed to send OTP';
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;
        state.message = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to verify OTP';
        state.message = null;

      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = null
        state.verified = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reset password';
        state.message = null;

      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
