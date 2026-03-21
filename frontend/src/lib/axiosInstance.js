// src/lib/axiosInstance.js
import axios from "axios";
import { trackAPICall } from "./performance";

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

    // Add request timestamp for performance tracking
    config.metadata = { startTime: new Date().getTime() };

    return config;
  },
  (error) => Promise.reject(error), // Handle request error
);

// Add a response interceptor to handle errors and track performance
axiosInstance.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date().getTime() - response.config.metadata.startTime;

    // Track API performance
    trackAPICall(response.config.url, duration, response.status);

    // Check if response is HTML (indicates wrong URL)
    if (response.headers["content-type"]?.includes("text/html")) {
      throw new Error(
        "API returned HTML instead of JSON - Check your API base URL",
      );
    }
    return response;
  },
  (error) => {
    // Calculate request duration for failed requests
    if (error.config) {
      const duration = new Date().getTime() - error.config.metadata.startTime;
      trackAPICall(
        error.config.url,
        duration,
        error.response?.status || 0,
        error.message,
      );
    }

    if (error.response?.status === 404) {
      console.error("API endpoint not found - Check your API base URL");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
