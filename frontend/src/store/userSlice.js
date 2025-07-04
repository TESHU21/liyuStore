import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

//  Fetch all users
export const getAllUsers = createAsyncThunk('users/getAll', async () => {
  const response = await axiosInstance.get('/api/users');
  return response.data;
});

//Delete user
export const deleteUser = createAsyncThunk('users/delete', async (userId) => {
  await axiosInstance.delete(`/api/users/${userId}`);
  return userId;
});

//  Edit user
export const editUser = createAsyncThunk('users/edit', async ({ id, userData }) => {
  const response = await axiosInstance.put(`/api/users/${id}`, userData);
  return response.data; // return the updated user
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔄 getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      //  deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      })

      //  editUser
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex((u) => u._id === updatedUser._id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        state.loading = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
