import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: `${baseURL}/v1`,
  withCredentials: true, 
});


api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn(" Sesión expirada o token inválido");

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      console.warn(" Acceso prohibido para este rol");
    }

    return Promise.reject(error);
  }
);
