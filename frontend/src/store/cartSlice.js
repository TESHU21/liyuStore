import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "liyu_cart";

const getInitialCartState = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!Array.isArray(parsed.items)) return null;
    return {
      items: parsed.items,
      totalQuantity: 0,
      totalAmount: 0,
    };
  } catch {
    return null;
  }
};

const recalcTotals = (state) => {
  let totalQuantity = 0;
  let totalAmount = 0;

  for (const item of state.items) {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    totalQuantity += qty;
    totalAmount += price * qty;
  }

  state.totalQuantity = totalQuantity;
  state.totalAmount = totalAmount;
};

const persistCart = (state) => {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({
        items: state.items,
      }),
    );
  } catch {
    // ignore write errors
  }
};

const initialState = getInitialCartState() || {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

recalcTotals(initialState);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const newProduct = action.payload;
      const existing = state.items.find((i) => i._id === newProduct._id);

      if (existing) {
        existing.quantity += Number(newProduct.quantity) || 0;
      } else {
        state.items.push({ ...newProduct });
      }

      recalcTotals(state);
      persistCart(state);
    },

    removeProductFromCart(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((i) => i._id === id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }

      recalcTotals(state);
      persistCart(state);
    },

    updateProductQuantity(state, action) {
      const { id, quantity } = action.payload;
      const product = state.items.find((i) => i._id === id);
      if (product) {
        product.quantity = Number(quantity) || 0;
      }

      recalcTotals(state);
      persistCart(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      persistCart(state);
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
