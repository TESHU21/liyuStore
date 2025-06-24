import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

// ✅ Fetch all categories
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/api/category/');
      return response.data; // Expected: array of categories
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch categories.'
      );
    }
  }
);

// ✅ Create a new category
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/api/category', formData);
      return response.data; // Expected: created category
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Creating category failed.'
      );
    }
  }
);

// ✅ Update a category
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ categoryId, formData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/api/category/${categoryId}`, formData);
      return response.data; // Expected: updated category
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Updating category failed.'
      );
    }
  }
);
// ✅ Delete a category
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/api/category/${categoryId}`);
      console.log('Backend response on successful delete:', res.data); // Log success message

      // Return the categoryId to the reducer so it knows which item to remove from state
      return categoryId; 
    } catch (err) {
      console.error('Frontend error during delete operation:', err); // Log the full error
      
      const errorMessage = err.response?.data?.error || err.message || 'Deleting category failed.';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ Slice
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload;

      })

      // Update
   .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Find the index of the updated category and replace it
        // action.payload is the updated category object from the backend
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id // Use _id from MongoDB
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload;
      })
       .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload is the categoryId string returned by the thunk (e.g., "685aac12015a21eb7a3a3e4d")
        const idToDelete = action.payload;
        
       
        state.categories = state.categories.filter(
          (category) => {
            const keep = category._id !== idToDelete;
            console.log(`   Comparing category._id (${category._id}) with idToDelete (${idToDelete}): ${keep}`);
            return keep;
          }
        );
        console.log("   Categories after filter:", state.categories.map(c => c._id));
      })

      // // Delete
      // .addCase(deleteCategory.fulfilled, (state, action) => {
      //   state.categories = state.categories.filter(c => c.id !== action.payload);
      // })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default categorySlice.reducer;
