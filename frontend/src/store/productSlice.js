import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// ✅ Fetch paginated / shop products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/products");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch products",
      );
    }
  },
);

// ✅ Fetch aLL pRODUCTS
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/products");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch products",
      );
    }
  },
);

// ✅ Fetch product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch product",
      );
    }
  },
);

// ✅ Create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, thunkAPI) => {
    try {
      console.log("Create Form Data", formData);
      const response = await axiosInstance.post("/api/products", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Creating product failed",
      );
    }
  },
);

// ✅ Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log("Updating product ID:", id);
      console.log("With data:", formData);
      const response = await axiosInstance.put(`/api/products/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error("Update Product Error:", error.response?.data);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Updating product failed",
      );
    }
  },
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Deleting product failed",
      );
    }
  },
);
// Add Review
export const createReview = createAsyncThunk(
  "products/createReview",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/api/products/${id}/reviews`,
        formData,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fail To Post Review",
      );
    }
  },
);
// Fetch Review
export const fetchProductReview = createAsyncThunk(
  "products/fetchProductReview",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}/reviews`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fail To Fetch Review",
      );
    }
  },
);
// Fetch Review
export const fetchTopProducts = createAsyncThunk(
  "products/fetchTopProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/products/top`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fail To Fetch Review",
      );
    }
  },
);

// ✅ Product Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    reviews: null,
    top_products: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch all Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Product created successfully!";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Product updated successfully!";
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.product && state.product._id === action.payload._id) {
          state.product = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Product deleted successfully!";
        state.products = state.products.filter(
          (p) => p._id !== action.payload._id,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createReview
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; // Clear error on success
        state.success = "Review posted successfully!";
        // Optional: Update product reviews if you store them here
        // For example, if state.product exists:
        if (state.product) {
          state.product.reviews.push(action.payload);
          state.product.numReviews = state.product.reviews.length;
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })

      // fetchProductReview
      .addCase(fetchProductReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; // Clear error on success
        state.success = null;
        // Store fetched reviews if you have a state slice for it, e.g.:
        state.reviews = action.payload;
      })
      .addCase(fetchProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      })
      // fetchTopProducts
      .addCase(fetchTopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null; // Clear error on success
        state.success = null;
        // Store fetched reviews if you have a state slice for it, e.g.:
        state.top_products = action.payload;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = null;
      });
  },
});

// ✅ Export reducer & actions
export const { clearMessages } = productSlice.actions;
export default productSlice.reducer;
