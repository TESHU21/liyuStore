import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Create order after payment callback
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/orders", orderData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 2. Verify payment status (call backend to verify with Paystack)
export const verifyPayment = createAsyncThunk(
  "orders/verifyPayment",
  async (reference, { rejectWithValue }) => {
    try {
      // Assuming your backend has an endpoint to verify payment by reference
      const res = await axios.get(`/api/paystack/verify/${reference}`);
      return res.data; // e.g., { status: 'success', order: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  order: null,
  isCreatingOrder: false,
  createOrderSuccess: false,
  createOrderError: null,

  paymentVerified: false,
  isVerifyingPayment: false,
  verifyPaymentError: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.isCreatingOrder = false;
      state.createOrderSuccess = false;
      state.createOrderError = null;
      state.paymentVerified = false;
      state.isVerifyingPayment = false;
      state.verifyPaymentError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createOrder handlers
      .addCase(createOrder.pending, (state) => {
        state.isCreatingOrder = true;
        state.createOrderError = null;
        state.createOrderSuccess = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isCreatingOrder = false;
        state.createOrderSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isCreatingOrder = false;
        state.createOrderError = action.payload;
      })

      // verifyPayment handlers
      .addCase(verifyPayment.pending, (state) => {
        state.isVerifyingPayment = true;
        state.verifyPaymentError = null;
        state.paymentVerified = false;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isVerifyingPayment = false;
        if (action.payload.status === "success") {
          state.paymentVerified = true;
          state.order = action.payload.order; // optional: updated order details
        } else {
          state.paymentVerified = false;
          state.verifyPaymentError = "Payment verification failed";
        }
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isVerifyingPayment = false;
        state.paymentVerified = false;
        state.verifyPaymentError = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
