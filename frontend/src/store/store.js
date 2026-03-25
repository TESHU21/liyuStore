import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./uiSlice";

import selectedProductReducer from "./selectedProductSlice";
import cartReducer from "./cartSlice";
import favouriteReducer from "./favoriteSlice";
import Favourite from "@/pages/favourite/Favourite";

import { baseApi } from "./api/baseApi";
const store = configureStore({
  reducer: {
    ui: uiReducer,

    selectedProduct: selectedProductReducer,
    cart: cartReducer,
    favourite: favouriteReducer,

    // add other slices here (e.g., product, cart, order)
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
