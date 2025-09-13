import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // if you ever send cookies
});

// Add Content-Type only for POST/PUT/PATCH
api.interceptors.request.use((config) => {
  if (["post", "put", "patch"].includes(config.method)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default api;
