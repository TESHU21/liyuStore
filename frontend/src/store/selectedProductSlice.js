import { createSlice } from "@reduxjs/toolkit";

const SELECTED_PRODUCT_STORAGE_KEY = "liyu_selected_product";

const getInitialSelectedProductState = () => {
  try {
    const raw = sessionStorage.getItem(SELECTED_PRODUCT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      product: parsed.product ?? null,
    };
  } catch {
    return null;
  }
};

const persistSelectedProduct = (state) => {
  try {
    sessionStorage.setItem(
      SELECTED_PRODUCT_STORAGE_KEY,
      JSON.stringify({
        product: state.product,
      }),
    );
  } catch {
    // ignore write errors
  }
};

const initialState = getInitialSelectedProductState() || {
  product: null, // holds the currently selected product
};

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    // Set the selected product data
    setSelectedProduct(state, action) {
      state.product = action.payload;

      persistSelectedProduct(state);
    },
    // Clear the selected product data
    clearSelectedProduct(state) {
      state.product = null;

      persistSelectedProduct(state);
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  selectedProductSlice.actions;

export default selectedProductSlice.reducer;
