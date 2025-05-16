import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserAPI,loginUserAPI ,logoutUserAPI , verifyUserCookieAPI} from './authApi';

const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await registerUserAPI(formData);
      return response.data; 
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await loginUserAPI(formData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await logoutUserAPI();
    
    } catch (error) {
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
);

const verifyUserCookie = createAsyncThunk(
  'auth/verify-cookie',
  async (_, thunkAPI) => {
    try {
      const response = await verifyUserCookieAPI();
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'cookie verification failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
  [registerUser, loginUser].forEach((thunk) => {
    builder
      .addCase(thunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload; 
        state.isAuthenticated=true
      })
      .addCase(thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated=false
      });
  });
  builder
  .addCase(logoutUser.fulfilled, (state) => {
    state.user = null;
    state.isAuthenticated = false;
    state.error = null;
    state.loading=false;
  })
  .addCase(logoutUser.rejected, (state, action) => {
    state.error = action.payload;
        state.loading=false;

  });

builder
  .addCase(verifyUserCookie.pending, (state) => {
    state.error = null;
  })
  .addCase(verifyUserCookie.fulfilled, (state, action) => {
    state.user = action.payload.user;
    state.isAuthenticated = true;

  })
  .addCase(verifyUserCookie.rejected, (state) => {
    state.user = null;
    state.isAuthenticated = false;
  });
}
})

export { registerUser , loginUser, logoutUser,verifyUserCookie};
export default authSlice.reducer;
