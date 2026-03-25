// store/favoriteSlice.js
import { createSlice } from "@reduxjs/toolkit";

const FAVORITES_STORAGE_KEY = "liyu_favorites";

const getInitialFavoritesState = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!Array.isArray(parsed.favorites)) return null;
    return {
      favorites: parsed.favorites,
    };
  } catch {
    return null;
  }
};

const persistFavorites = (state) => {
  try {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify({
        favorites: state.favorites,
      }),
    );
  } catch {
    // ignore write errors
  }
};

const initialState = getInitialFavoritesState() || {
  favorites: [], // Array of favorite product IDs or full product objects depending on your use case
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addProductToFavorite(state, action) {
      const product = action.payload; // product object or at least an id
      const exists = state.favorites.find((item) => item._id === product._id);
      if (!exists) {
        state.favorites.push(product);
      }

      persistFavorites(state);
    },
    removeProductFromFavorite(state, action) {
      const productId = action.payload; // id of the product to remove
      state.favorites = state.favorites.filter(
        (item) => item._id !== productId,
      );

      persistFavorites(state);
    },
    clearFavorites(state) {
      state.favorites = [];

      persistFavorites(state);
    },
  },
});

export const {
  addProductToFavorite,
  removeProductFromFavorite,
  clearFavorites,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
