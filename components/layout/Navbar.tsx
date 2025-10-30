"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const { user, logoutUser, token, checkAuth, initialized } = useAuthStore();

  // 🔹 Verifica sesión solo una vez al montar
  useEffect(() => {
    if (!initialized) checkAuth();
  }, [checkAuth, initialized]);

  // 🕓 Cargando sesión inicial
  if (!initialized) {
    return (
      <nav className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto text-center text-gray-500">
          Cargando sesión...
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo Huellas & Relax"
            className="h-8 w-8 object-contain"
          />
          <span className="text-blue-700 font-bold text-xl">
            Huellas & Relax
          </span>
        </Link>

        {/* 🔹 Enlaces principales */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link
            href="/"
            className="relative transition-all duration-300 hover:text-blue-600 hover:-translate-y-[2px]
                       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0
                       after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
                       hover:after:w-full"
          >
            Inicio
          </Link>

          <Link
            href="/services"
            className="relative transition-all duration-300 hover:text-blue-600 hover:-translate-y-[2px]
                       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0
                       after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
                       hover:after:w-full"
          >
            Servicios
          </Link>

          <Link
            href="/bookings"
            className="relative transition-all duration-300 hover:text-blue-600 hover:-translate-y-[2px]
                       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0
                       after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
                       hover:after:w-full"
          >
            Reservas
          </Link>

          <Link
            href="/pets"
            className="relative transition-all duration-300 hover:text-blue-600 hover:-translate-y-[2px]
                       after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0
                       after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
                       hover:after:w-full"
          >
            Mascotas
          </Link>

          {/* 🔒 Solo visible si hay token */}
          {token && (
            <Link
              href="/dashboard"
              className="relative transition-all duration-300 hover:text-blue-600 hover:-translate-y-[2px]
                         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0
                         after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
                         hover:after:w-full"
            >
              Mi Cuenta
            </Link>
          )}

          {/* 🧠 Solo los ADMIN verán esta pestaña */}
          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="relative transition-all duration-300 text-black font-semibold hover:text-blue-600 hover:-translate-y-[2px]
                         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0
                         after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300
                         hover:after:w-full"
            >
              Administrar
            </Link>
          )}
        </div>

        {/* 🔹 Botones derechos */}
        <div className="flex items-center space-x-3">
          {!token ? (
            <>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">
                👋 {user?.full_name?.split(" ")[0] || "Usuario"}
              </span>
              <button
                onClick={logoutUser}
                className="text-red-600 font-semibold hover:underline"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
