import { create } from "zustand";
import { login, logout, registerUser, getCurrentUser } from "@/lib/auth";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

interface RegisterPayload {
  full_name: string;
  dpi: string;
  phone: string;
  email: string;
  password: string;
  address: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  loginUser: (email: string, password: string) => Promise<boolean>;
  registerNewUser: (data: RegisterPayload) => Promise<void>;
  logoutUser: () => void;
  checkAuth: () => Promise<void>;
  setError: (message: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null, // ⚠️ arranca vacío, se llenará en checkAuth()
  loading: false,
  error: null,
  initialized: false,

  // 🔹 LOGIN
  loginUser: async (email, password) => {
    console.log("🔑 loginUser() iniciado con:", email);
    set({ loading: true, error: null });
    try {
      const data = await login(email, password);
      console.log("🟢 loginUser() respuesta:", data);

      if (data?.accessToken) {
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        set({
          token: data.accessToken,
          user: data.user,
          initialized: true,
        });
        console.log("✅ Sesión iniciada correctamente:", data.user);
        return true;
      }

      console.warn("⚠️ No se recibió accessToken en loginUser()");
      set({ error: "Token no recibido" });
      return false;
    } catch (err: any) {
      console.error("❌ Error en loginUser:", err);
      set({ error: err.response?.data?.error || "Error de autenticación" });
      return false;
    } finally {
      set({ loading: false });
      console.log("🔚 loginUser() finalizado");
    }
  },

  // 🔹 REGISTRO
  registerNewUser: async (payload) => {
    console.log("🧾 registerNewUser() iniciado");
    set({ loading: true, error: null });
    try {
      const data = await registerUser(payload);
      console.log("🟢 registerNewUser() respuesta:", data);
      if (data?.accessToken) {
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        set({ token: data.accessToken, user: data.user });
      }
      console.log("✅ Usuario registrado:", data.user);
    } catch (err: any) {
      console.error("❌ Register Error:", err.response?.data || err.message);
      set({
        error:
          err.response?.data?.error ||
          "Error al registrar usuario. Revisa los datos ingresados.",
      });
    } finally {
      set({ loading: false });
      console.log("🔚 registerNewUser() finalizado");
    }
  },

  // 🔹 LOGOUT
  logoutUser: () => {
    console.log("🚪 logoutUser() ejecutado");
    logout();
    sessionStorage.clear();
    localStorage.removeItem("token");
    set({ user: null, token: null, initialized: true });
  },

  // 🔹 CHECK AUTH (con espera real y control estable)
  checkAuth: async () => {
  console.log("🔍 checkAuth() iniciado");

  if (typeof window === "undefined") {
    console.warn("❌ checkAuth() abortado: window undefined");
    return;
  }

  const storedToken =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  // Si no hay token, usuario visitante
  if (!storedToken) {
    console.warn("⚠️ No hay token → modo visitante");
    set({ user: null, token: null, initialized: true });
    return;
  }

  try {
    const user = await getCurrentUser(storedToken);
    console.log("🟢 getCurrentUser():", user);

    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      set({
        user,
        token: storedToken,
        initialized: true,
      });
      console.log("✅ Sesión restaurada correctamente");
    } else {
      console.warn("🚫 Token inválido o expirado");
      sessionStorage.clear();
      localStorage.removeItem("token");
      set({ user: null, token: null, initialized: true });
    }
  } catch (err) {
    console.error("❌ checkAuth() Error:", err);
    sessionStorage.clear();
    localStorage.removeItem("token");
    set({ user: null, token: null, initialized: true });
  }
},


  setError: (msg) => set({ error: msg }),
}));
