import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of your user profile data
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: {
    path: string;
  };
}

// Define the state structure for this Redux slice
interface UserState {
  profile: UserProfile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  status: 'idle', // 'idle' means we haven't started fetching yet
  error: null,
};

// ⚙️ Async thunk for fetching the user profile
// This now relies on the browser automatically sending the HttpOnly cookie.
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/v1/auth/me'); // Relative path for your API route

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || 'Session not found or invalid');
    }

    const userData = await response.json();
    return userData as UserProfile;
  } catch (error: any) {
    return rejectWithValue(error.message || 'A network error occurred');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Standard reducer to clear user data on logout
    clearUser: (state) => {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  // Handle the different states of the async fetchUser action
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.profile = null; // Ensure profile is cleared on failure
        state.error = action.payload as string;
      });
  },
});

// Export actions and the reducer
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;

// Export selectors for easy access in your components
export const selectUserProfile = (state: { user: UserState }) => state.user.profile;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;