import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice"
import uiReducer from "./uiSlice"
import categoryReducer from "./categorySlice"
import productReducer from "./productSlice"
import selectedProductReducer from "./selectedProductSlice"
import cartReducer from "./cartSlice"
import favouriteReducer from "./favoriteSlice"
import Favourite from '@/pages/favourite/Favourite';
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui:uiReducer,
    category:categoryReducer,
    products:productReducer,
    selectedProduct:selectedProductReducer,
    cart:cartReducer,
    favourite:favouriteReducer,
    // add other slices here (e.g., product, cart, order)
  },
});

export default store;