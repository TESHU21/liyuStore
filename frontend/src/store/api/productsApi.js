import { baseApi } from "@/store/api/baseApi";
const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/api/products",
        method: "GET",
      }),
      providesTags: (result) => {
        const list = result?.data || [];
        return Array.isArray(list)
          ? [
              {
                type: "Products",
                id: "LIST",
                ...list
                  .filter((product) => product._id)
                  .map((product) => ({ type: "Products", id: product._id })),
              },
            ]
          : [{ type: "Products", id: "LIST" }];
      },
      keepUnusedDataFor: 120,
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
      keepUnusedDataFor: 300,
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: "/api/products/top",
        method: "GET",
      }),
      providesTags: [{ type: "TopProducts", id: "LIST" }],
      keepUnusedDataFor: 300,
    }),
    getProductReviews: builder.query({
      query: (id) => ({
        url: `/api/products/${id}/reviews`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ProductReviews", id }],
      keepUnusedDataFor: 300,
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/api/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
        { type: "TopProducts", id: "LIST" },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Products", id },
        { type: "Products", id: "LIST" },
        { type: "TopProducts", id: "LIST" },
      ],
    }),
    createReview: builder.mutation({
      query: ({ id, reviewData }) => ({
        url: `/api/products/${id}/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        { type: "Reviews", id },
      ],
    }),
    fetchReview: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}/reviews`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Reviews", id }],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetTopProductsQuery,
  useGetProductReviewsQuery,
  useCreateProductQuery,
  useUpdateProductQuery,
  useDeleteProductQuery,
  useCreateReviewQuery,
  useFetchReviewQuery,
} = productsApi;
