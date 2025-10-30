"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const router = useRouter();
  const { registerNewUser, loading, error } = useAuthStore(); // 🔹 quitamos setAuth

  const [form, setForm] = useState({
    full_name: "",
    dpi: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    await registerNewUser(form);

    const token = localStorage.getItem("token");
    if (token) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      console.error("❌ Token no encontrado después del registro");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        Crear cuenta 🐾
      </h2>

      {/* 🔹 Estado de error o éxito */}
      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded-md text-center p-2">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-600 bg-green-50 border border-green-200 rounded-md text-center p-2">
          ¡Cuenta creada con éxito! Redirigiendo...
        </p>
      )}

      {/* 🔹 Campos ocultos para evitar autocompletado */}
      <input type="text" name="fakeusernameremembered" className="hidden" />
      <input
        type="password"
        name="fakepasswordremembered"
        className="hidden"
        autoComplete="new-password"
      />

      {/* 🔹 Campos del formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Nombre completo
          </label>
          <input
            type="text"
            name="full_name"
            autoComplete="off"
            placeholder="Ej. Juan Pérez"
            value={form.full_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-600">DPI</label>
          <input
            type="text"
            name="dpi"
            autoComplete="off"
            placeholder="Ej. 1234567890101"
            value={form.dpi}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-600">Teléfono</label>
          <input
            type="text"
            name="phone"
            autoComplete="off"
            placeholder="Ej. 555-8888"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Ej. cliente@mail.com"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-600">Contraseña</label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-600">Dirección</label>
          <input
            type="text"
            name="address"
            autoComplete="off"
            placeholder="Ej. Zona 4, Antigua Guatemala"
            value={form.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* 🔹 Botón de acción */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 rounded-md text-white font-semibold transition ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <p className="text-sm text-center text-gray-600 mt-3">
        ¿Ya tienes cuenta?{" "}
        <a
          href="/login"
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Inicia sesión aquí
        </a>
      </p>
    </motion.form>
  );
}
