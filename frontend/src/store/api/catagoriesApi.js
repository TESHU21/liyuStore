import { baseApi } from "@/store/api/baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/api/category",
        method: "GET",
      }),
      providesTags: (result) => {
        const list = result?.categories || result || [];
        return [
          { type: "Categories", id: "LIST" },

          ...list.map((category) => ({
            type: "Categories",
            id: category._id,
          })),
        ];
      },
      keepUnusedDataFor: 600,
    }),
    // Create a new catagory
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/api/category",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    // Update a category
    updateCategory: builder.mutation({
      query: ({ categoryId, formData }) => ({
        url: `/api/category/${categoryId}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Categories", id: "LIST" },
        { type: "Categories", id: categoryId },
      ],
    }),
    // Delete a category
    deleteCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `/api/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
