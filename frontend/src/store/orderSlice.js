import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

// 1. Create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/orders", orderData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response || error.message);
    }
  }
);

// 2. Verify payment
export const verifyPayment = createAsyncThunk(
  "orders/verifyPayment",
  async (reference, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/api/orders/verify-payment`, { reference });
      return res.data; // ✅ Only return response data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 3. Initialize Paystack Transaction
export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async ({ order, callback_url }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/orders/pay", { order, callback_url });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response || error.message);
    }
  }
);

// ✅ Fetch aLL orders by user
export const fetchAllOrderByUser  = createAsyncThunk(
  'products/fetchAllOrderByUser ',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/orders/mine");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch Orders by user"
      );
    }
  }
);
// ✅ Fetch Orders by user
export const fetchOrderById  = createAsyncThunk(
  'products/fetchOrderById ',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error || "Failed to fetch Order by Id"
      );
    }
  }
);


const initialState = {
  order: null,
  isCreatingOrder: false,
  createOrderSuccess: false,
  createOrderError: null,

  isPaying: false,
  paystackInit: null,
  payError: null,

  paymentVerified: false,
  isVerifyingPayment: false,
  verifyPaymentError: null,
   order_mine: null,
   orderdetail:null,
  isFetchingOrder: false,
  fetchOrderSuccess: false,
  fetchOrderError: null
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

      state.isPaying = false;
      state.paystackInit = null;
      state.payError = null;

      state.paymentVerified = false;
      state.isVerifyingPayment = false;
      state.verifyPaymentError = null;
       state.isFetchingOrder- false,
  state.fetchOrderSuccess- false,
  state.fetchOrderError=null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
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
      // Fetch User Order-Mine
      .addCase(fetchAllOrderByUser.pending, (state) => {
        state.isFetchingOrder = true;
        state.fetchOrderError = null;
        state.fetchOrderSuccess = false;
        
      })
      .addCase(fetchAllOrderByUser.fulfilled, (state, action) => {
        state.isFetchingOrder = false;
        state.fetchOrderSuccess = true;
        state.order_mine = action.payload;
      })
      .addCase(fetchAllOrderByUser.rejected, (state, action) => {
        state.isFetchingOrder = false;
        state.fe = action.payload;
      })
      // Fetch User Order-By Id
      .addCase(fetchOrderById.pending, (state) => {
        state.isFetchingOrder = true;
        state.fetchOrderError = null;
        state.fetchOrderSuccess = false;
        
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isFetchingOrder = false;
        state.fetchOrderSuccess = true;
        state.orderdetail = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isFetchingOrder = false;
        state.fetchOrderError = action.payload;
      })

      // Pay order
      .addCase(payOrder.pending, (state) => {
        state.isPaying = true;
        state.payError = null;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.isPaying = false;
        state.paystackInit = action.payload;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.isPaying = false;
        state.payError = action.payload;
      })

      // Verify payment
      .addCase(verifyPayment.pending, (state) => {
        state.isVerifyingPayment = true;
        state.verifyPaymentError = null;
        state.paymentVerified = false;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isVerifyingPayment = false;
        if (action.payload.status === "success") {
          state.paymentVerified = true;
          state.order = action.payload.order; // updated paid order
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
