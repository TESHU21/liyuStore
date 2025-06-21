import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ✅ Async Thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
        
      const response = await axiosInstance.post('/api/users/auth', credentials);

      return response.data; // Expected to return { user, token }
    } catch (err) {
              console.log("❌ Login error:", err); // <-- Log the full error object
                    console.log("❌ Login error:", err); // <-- Log the full error object
      console.log("❌ Response data:", err.response?.data); // <-- Log API error response (if any)
      console.log("❌ Response status:", err.response?.status); // <-- Status code if present


      // Return a clean error message for rejected case
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

// ✅ The auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from storage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); // Persist token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Show custom error from rejectWithValue
      });
  },
});

// ✅ Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
