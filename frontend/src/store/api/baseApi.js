import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "@/lib/axiosInstance";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "Products",
    "Product",
    "TopProducts",
    "Reviews",
    "Users",
    "Orders",
  ],
  endpoints: () => ({}),
});
