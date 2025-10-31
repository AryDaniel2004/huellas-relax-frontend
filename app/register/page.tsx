"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { AiFillHome } from "react-icons/ai"; 

export default function RegisterPage() {
  const router = useRouter();
  const { registerNewUser, loading, error } = useAuthStore();

  const [form, setForm] = useState({
    full_name: "",
    dpi: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerNewUser(form);
    router.push("/dashboard");
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
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Crear cuenta 🐾
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">DPI</label>
            <input
              type="text"
              name="dpi"
              value={form.dpi}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>


        <p className="text-sm text-center text-gray-600 mt-3">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </main>
  );
}
