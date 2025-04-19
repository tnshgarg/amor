import axios from "axios";

// Create an axios instance with base URL and default headers
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://amorbackend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the auth token for all future requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // Add more detailed logging
    console.log("Setting auth token:");
    console.log("Token value:", token.substring(0, 10) + "...");
    console.log("Current headers:", api.defaults.headers.common);
  } else {
    delete api.defaults.headers.common["Authorization"];
    console.log("Auth token cleared");
    console.log("Current headers:", api.defaults.headers.common);
  }
};

// Add an interceptor to log requests
api.interceptors.request.use(
  (config) => {
    console.log("Making request to:", config.url);
    console.log("Request headers:", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
