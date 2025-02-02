import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // API Base URL
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Request interceptor to dynamically add token
apiClient.interceptors.request.use((config) => {
  // const token = import.meta.env.VITE_TOKEN || localStorage.getItem("access_token"); // Retrieve token dynamically
  const token = localStorage.getItem("access_token") || import.meta.env.VITE_TOKEN; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
