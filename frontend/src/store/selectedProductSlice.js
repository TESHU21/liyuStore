import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null, // holds the currently selected product
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    // Set the selected product data
    setSelectedProduct(state, action) {
      state.product = action.payload;
    },
    // Clear the selected product data
    clearSelectedProduct(state) {
      state.product = null;
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
