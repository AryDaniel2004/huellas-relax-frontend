"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function LoginForm() {
  const router = useRouter();
  const { loginUser, loading, error } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await loginUser(email, password);

    if (success) {
      alert("Inicio de sesión Carlos");
      router.push("/dashboard");
    } else {
      alert("Error al iniciar sesión. Verifica tus datos.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Iniciar Sesión
      </h2>

      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded-md text-center p-2">
          {error}
        </p>
      )}

      <div>
        <label className="block mb-1 font-medium text-gray-600">
          Correo electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-600">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 rounded-md text-white font-semibold transition ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Ingresando..." : "Iniciar Sesión"}
      </button>

      <p className="text-sm text-center text-gray-600 mt-3">
        ¿No tienes cuenta?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Regístrate aquí
        </a>
      </p>
    </form>
  );
}
