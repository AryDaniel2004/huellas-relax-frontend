import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${baseURL}/v1`,
  headers: { "Content-Type": "application/json" },
});


export async function login(email: string, password: string) {
  try {
    const { data } = await api.post("/auth/login", { email, password });

    if (!data?.user || !data?.accessToken) {
      throw new Error("Respuesta inválida del servidor");
    }

    sessionStorage.setItem("token", data.accessToken);
    sessionStorage.setItem("user", JSON.stringify(data.user));

    console.log(" LOGIN:", data.user);
    return data;
  } catch (err: any) {
    console.error(" LOGIN ERROR:", err.response?.data || err.message);
    throw err;
  }
}


export async function refreshToken() {
  try {
    const { data } = await api.post("/auth/refresh");
    if (data?.accessToken) {
      localStorage.setItem("token", data.accessToken);
      console.log(" Token actualizado:", data.accessToken);
    }
    return data;
  } catch (err: any) {
    console.error(" REFRESH ERROR:", err.response?.data || err.message);
    throw err;
  }
}


export function logout() {
  sessionStorage.clear();
  localStorage.removeItem("token");
  console.log("👋 Sesión cerrada");
  window.location.href = "/login";
}


export async function registerUser(data: {
  full_name: string;
  dpi: string;
  phone: string;
  email: string;
  password: string;
  address: string;
}) {
  try {
    const res = await api.post("/auth/register", data);

    if (res.data?.user?.role && res.data.user.role !== "CUSTOMER") {
      throw new Error("Solo se pueden registrar clientes (CUSTOMER).");
    }

    console.log(" REGISTER CUSTOMER:", res.data.user);
    return res.data;
  } catch (err: any) {
    console.error(" REGISTER ERROR:", err.response?.data || err.message);
    throw err;
  }
}


export async function getCurrentUser(token: string) {
  try {
    const { data } = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!data?.id || !data?.role) {
      console.warn(" Respuesta inesperada en /auth/me:", data);
      return null;
    }

    if (data.role !== "CUSTOMER" && data.role !== "ADMIN") {
      console.warn(" Usuario con rol no permitido:", data.role);
      return null;
    }

    console.log(" Usuario autenticado:", data);
    return data;
  } catch (err: any) {
    const status = err.response?.status;
    if (status === 401 || status === 403) {
      console.warn(" Token inválido o sin permisos");
      return null;
    }

    console.error("❌ ME ERROR:", err.response?.data || err.message);
    return null;
  }
}
