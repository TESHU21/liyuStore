// src/lib/axiosInstance.js
import axios from 'axios';

// Create a custom Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Loaded from your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the Authorization token (if present)
axiosInstance.interceptors.request.use(
  (config) => {
    const stringToken = sessionStorage.getItem('Token'); // Get token from localStorage
    const token=JSON.parse(stringToken)
    if (token) {
      // Bracket notation is used for universal compatibility
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request error
);

export default axiosInstance;
