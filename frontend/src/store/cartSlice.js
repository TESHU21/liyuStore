import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const newProduct = action.payload;
      const existing = state.items.find(i => i.id === newProduct.id);

      if (existing) {
        existing.quantity += newProduct.quantity;
      } else {
        state.items.push({ ...newProduct });
      }

      state.totalQuantity += newProduct.quantity;
      state.totalAmount += newProduct.price * newProduct.quantity;
    },

    removeProduct(state, action) {
      const id = action.payload;
      const index = state.items.findIndex(i => i.id === id);
      if (index !== -1) {
        const product = state.items[index];
        state.totalQuantity -= product.quantity;
        state.totalAmount -= product.price * product.quantity;
        state.items.splice(index, 1);
      }
    },

    updateProductQuantity(state, action) {
      const { id, quantity } = action.payload;
      const product = state.items.find(i => i.id === id);
      if (product) {
        const diff = quantity - product.quantity;
        product.quantity = quantity;
        state.totalQuantity += diff;
        state.totalAmount += product.price * diff;
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addProduct, removeProduct, updateProductQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
