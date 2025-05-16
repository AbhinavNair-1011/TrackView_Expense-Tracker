import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProfileAPI, updateProfileAPI, updatePasswordAPI } from './profileApi';


const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await fetchProfileAPI();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, thunkAPI) => {
    try {
      const response = await updateProfileAPI(profileData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData, thunkAPI) => {
    try {
      const response = await updatePasswordAPI(passwordData);
      return response.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update password');
    }
  }
);

const initialState = {
  userProfile: null,
  loading: false,
  error: null,
  updateMessage: null,
};


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateMessage = null

      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.updateMessage = "Updated Successfuly"
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.updateMessage = null

      })

      .addCase(updatePassword.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;

     });
  },
});

export const { clearProfileError } = profileSlice.actions;
export { fetchProfile, updateProfile, updatePassword }
export default profileSlice.reducer;
