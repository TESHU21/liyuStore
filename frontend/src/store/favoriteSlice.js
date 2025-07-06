// store/favoriteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [], // Array of favorite product IDs or full product objects depending on your use case
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addProductToFavorite(state, action) {
      const product = action.payload; // product object or at least an id
      console.log("Product added to favourite",product)
      const exists = state.favorites.find(item => item._id === product._id);
      console.log(exists)
      if (!exists) {
        state.favorites.push(product);
      }
    },
    removeProductFromFavorite(state, action) {
      const productId = action.payload; // id of the product to remove
      state.favorites = state.favorites.filter(item => item._id !== productId);
    },
    clearFavorites(state) {
      state.favorites = [];
    }
  },
});

export const { addProductToFavorite, removeProductFromFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
