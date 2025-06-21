import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    // add other slices here (e.g., product, cart, order)
  },
});

export default store;