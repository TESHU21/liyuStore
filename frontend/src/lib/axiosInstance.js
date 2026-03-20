// src/lib/axiosInstance.js
import axios from "axios";

// Create a custom Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Loaded from your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the Authorization token (if present)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      // Bracket notation is used for universal compatibility
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error), // Handle request error
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if response is HTML (indicates wrong URL)
    if (response.headers["content-type"]?.includes("text/html")) {
      throw new Error(
        "API returned HTML instead of JSON - Check your API base URL",
      );
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 404) {
      console.error("API endpoint not found - Check your API base URL");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
