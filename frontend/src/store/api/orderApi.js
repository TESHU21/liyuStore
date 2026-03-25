import { baseApi } from "@/store/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch aLL orders by user
    fetchAllOrderByUser: builder.query({
      query: () => ({
        url: "/api/orders/mine",
        method: "GET",
      }),
      providesTags: [{ type: "Orders", id: "LIST" }],
      keepUnusedDataFor: 120,
    }),
    // Fetch Orders by user
    fetchOrderById: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Orders", id }],
      keepUnusedDataFor: 300,
    }),

    fetchAllOrders: builder.query({
      query: () => ({
        url: "/api/orders",
        method: "GET",
      }),
      providesTags: [{ type: "Orders", id: "LIST" }],
      keepUnusedDataFor: 120,
    }),
    // 1. create order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/api/orders",
        method: "POST",
        data: orderData,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    // 2. verify payment
    verifyPayment: builder.mutation({
      query: (reference) => ({
        url: "/api/orders/verify-payment",
        method: "POST",
        data: { reference },
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    // 3. pay order
    payOrder: builder.mutation({
      query: ({ order, callback_url }) => ({
        url: "/api/orders/pay",
        method: "POST",
        data: { order, callback_url },
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  usePayOrderMutation,
  useFetchAllOrderByUserQuery,
  useFetchOrderByIdQuery,
  useFetchAllOrdersQuery,
} = orderApi;
