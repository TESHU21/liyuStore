import { baseApi } from "@/store/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/auth",
        method: "POST",
        data: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/api/users",
        method: "POST",
        data: userData,
      }),
    }),
    getCurrentUserProfile: builder.query({
      query: () => ({
        url: "/api/users/profile",
        method: "GET",
      }),
      providesTags: [{ type: "Users", id: "ME" }],
      keepUnusedDataFor: 300,
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/api/users/profile",
        method: "PUT",
        data: userData,
      }),
      invalidatesTags: [{ type: "Users", id: "ME" }],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Users", id: "ME" }],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetCurrentUserProfileQuery,
  useUpdateProfileMutation,
  useLogoutUserMutation,
} = authApi;
