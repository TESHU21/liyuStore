import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ✅ Async Thunk for login
 const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
        
      const response = await axiosInstance.post('/api/users/auth', credentials);

      return response.data; // Expected to return { user, token }
    } catch (err) {
             


      // Return a clean error message for rejected case
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);
// Async Thunk for register
 const registerUser=createAsyncThunk('auth/registerUser',
  async(formData,thunkAPI)=>{
    try{
      const response= await axiosInstance.post('/api/users',formData)
      return response.data
    }
    catch(error){
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Sign Up Failed,Please try again.")

    }
  }
)
// Async Thunk for Fetching User
 const getUser=createAsyncThunk('auth/getUser',
  async(_,thunkAPI)=>{
    try{
      const response= await axiosInstance.get('/api/users')
      return response.data
    }
    catch(error){
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetching User Failed,Please try again.")

    }
  }
)

const updateProfile=createAsyncThunk("auth/updateProfile",async(data,thunkAPI)=>{
  try{
    const response= await axiosInstance.put('/api/users/profile',data)
      return response.data
  }
  catch(error){
          return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetching User Profile Failed,Please try again.")


  }
})
const getCurrentUserProfile=createAsyncThunk("auth/getCurrentUserProfile",async(_,thunkAPI)=>{
  try{
    const response= await axiosInstance.get('/api/users/profile')
      return response.data
  }
  catch(error){
          return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetching User Profile Failed,Please try again.")


  }
})
// ✅ The auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
     user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
      
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from storage on logout
      localStorage.removeItem('user'); // Remove token from storage on logout
    },
  },
  extraReducers: (builder) => {
   
    builder
     // login case
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous error
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); // Persist token
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Persist token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Show custom error from rejectWithValue
      })
      // register user case
      .addCase(registerUser.pending,(state)=>{
         state.isLoading = true;
        state.error = null; // Clear previous error

      })
      .addCase(registerUser.fulfilled,(state,action)=>{
         state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token); // Persist token
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Persist token


      })
      .addCase(registerUser.rejected,(state,action)=>{
         state.isLoading = false;
        state.error = action.payload; // set error message from rejected action

      })
      // Fetch Users from backend
      .addCase(getUser.pending,(state)=>{
         state.isLoading = true;
        state.error = null; // Clear previous error

      })
      .addCase(getUser.fulfilled,(state,action)=>{
         state.isLoading = false;
        // state.user = action.payload.user;
        


      })
      .addCase(getUser.rejected,(state,action)=>{
         state.isLoading = false;
        state.error = action.payload; // set error message from rejected action

      })
      // Fetch current profiles
      .addCase(getCurrentUserProfile.pending,(state)=>{
         state.isLoading = true;
        state.error = null; // Clear previous error

      })
      .addCase(getCurrentUserProfile.fulfilled,(state,action)=>{
         state.isLoading = false;
        // state.user = action.payload.user;
        


      })
      .addCase(getCurrentUserProfile.rejected,(state,action)=>{
         state.isLoading = false;
        state.error = action.payload; // set error message from rejected action

      })
      // Update current profiles
      .addCase(updateProfile.pending,(state)=>{
         state.isLoading = true;
        state.error = null; // Clear previous error

      })
      .addCase(updateProfile.fulfilled,(state,action)=>{
         state.isLoading = false;
        // state.user = action.payload.user;
        


      })
      .addCase(updateProfile.rejected,(state,action)=>{
         state.isLoading = false;
        state.error = action.payload; // set error message from rejected action

      })
  },
});

// ✅ Export actions and reducer
export const { logout} = authSlice.actions;
export {loginUser,registerUser,getUser,getCurrentUserProfile,updateProfile}
export default authSlice.reducer;
