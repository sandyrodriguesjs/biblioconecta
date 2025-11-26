import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3333",
  baseURL: "https://biblioconecta-back.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// ✅ Intercepta e adiciona o token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
