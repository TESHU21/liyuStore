import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice"
import uiReducer from "./uiSlice"
import categoryReducer from "./categorySlice"
import productReducer from "./productSlice"
import selectedProductReducer from "./selectedProductSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui:uiReducer,
    category:categoryReducer,
    products:productReducer,
    selectedProduct:selectedProductReducer,
    // add other slices here (e.g., product, cart, order)
  },
});

export default store;