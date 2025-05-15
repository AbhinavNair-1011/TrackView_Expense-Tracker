import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserAPI,loginUserAPI } from './authApi';

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


const initialState = {
  user: null,
  loading: false,
  error: null,
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
        state.user = action.payload.user || action.payload; // adapt based on your payload shape
      })
      .addCase(thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  });
}
})

export { registerUser , loginUser};
export default authSlice.reducer;
