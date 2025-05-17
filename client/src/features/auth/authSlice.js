import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserAPI,
  loginUserAPI,
  logoutUserAPI,
  verifyUserCookieAPI,
  verifyLoginAPI,
} from './authApi';


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await registerUserAPI(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await loginUserAPI(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const verifyLogin = createAsyncThunk(
  'auth/verifyLogin',
  async (formData, thunkAPI) => {
    try {
      const response = await verifyLoginAPI(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await logoutUserAPI();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);

export const verifyUserCookie = createAsyncThunk(
  'auth/verifyUserCookie',
  async (_, thunkAPI) => {
    try {
      const response = await verifyUserCookieAPI();
      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Cookie verification failed');
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  twoFactorRequired: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetTwoFactor: (state) => {
      state.twoFactorRequired = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.twoFactor) {
          state.twoFactorRequired = true;
          state.isAuthenticated = false;
        } else {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.twoFactorRequired = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.twoFactorRequired = false;
      });

    builder
      .addCase(verifyLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
        state.isAuthenticated = true;
        state.twoFactorRequired = false;
      })
      .addCase(verifyLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loading = false;
        state.twoFactorRequired = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(verifyUserCookie.pending, (state) => {
        state.error = null;
      })
      .addCase(verifyUserCookie.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(verifyUserCookie.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetError, resetTwoFactor } = authSlice.actions;
export default authSlice.reducer;
