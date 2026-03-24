import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import selectedProductReducer from "./selectedProductSlice";
import cartReducer from "./cartSlice";
import favouriteReducer from "./favoriteSlice";
import Favourite from "@/pages/favourite/Favourite";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import { baseApi } from "./api/baseApi";
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    category: categoryReducer,
    products: productReducer,
    selectedProduct: selectedProductReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
    users: userReducer,
    orders: orderReducer,
    // add other slices here (e.g., product, cart, order)
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
