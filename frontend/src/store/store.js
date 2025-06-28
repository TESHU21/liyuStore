import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice"
import uiReducer from "./uiSlice"
import categoryReducer from "./categorySlice"
import productReducer from "./productSlice"
import selectedProductReducer from "./selectedProductSlice"
import cartReducer from "./cartSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui:uiReducer,
    category:categoryReducer,
    products:productReducer,
    selectedProduct:selectedProductReducer,
    cart:cartReducer,
    // add other slices here (e.g., product, cart, order)
  },
});

export default store;