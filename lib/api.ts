import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/v1", // 🔥 fija directamente, sin variable
  withCredentials: false,
});

// ✅ Interceptor: agrega el token automáticamente a cada request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // 🔹 Preferimos sessionStorage para sesiones temporales (más seguro)
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

// ✅ Interceptor de respuesta: maneja errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("🔒 Sesión expirada o token inválido");

      // Limpiar tanto localStorage como sessionStorage
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      // Redirigir al login de forma segura
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    if (status === 403) {
      console.warn("🚫 Acceso prohibido para este rol");
    }

    return Promise.reject(error);
  }
);
