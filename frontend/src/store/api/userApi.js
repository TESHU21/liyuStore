import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users
    fetchAllUsers: builder.query({
      query: () => ({
        url: "/api/users",
        method: "GET",
      }),
      providesTags: [{ type: "Users", id: "LIST" }],
      keepUnusedDataFor: 120,
    }),
    // delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    // update users
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/api/users/${user._id}`,
        method: "PUT",
        data: user,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useFetchAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
