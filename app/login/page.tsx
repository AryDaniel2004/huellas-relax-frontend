"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { AiFillHome } from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user, accessToken } = await login(email, password);

      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      alert(`Bienvenido, ${user.full_name || "usuario"} `);

      if (user.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error(" Error al iniciar sesión:", err);
      setError("Credenciales incorrectas o error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center py-24 px-6 bg-gray-50 min-h-screen relative">

      <a
        href="/"
        className="absolute top-8 left-8 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:bg-gray-100 transition"
        title="Volver al inicio"
      >
        <AiFillHome size={26} className="text-gray-800" />
      </a>


      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Iniciar Sesión
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Correo electrónico</label>
          <input
            type="email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>


        <div className="mb-4">
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>


        {error && (
          <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded border border-red-200 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Regístrate aquí
          </a>
        </div>
      </form>
    </main>
  );
}
