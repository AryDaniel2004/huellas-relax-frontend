"use client";

import "../styles/globals.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { checkAuth, initialized, token } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true); // 🔹 evita redirección prematura

  useEffect(() => {
  console.log("📡 useEffect ejecutado — ruta:", pathname);

  const publicPaths = ["/", "/login", "/register"];
  const isPublic = publicPaths.includes(pathname);

  // Ejecutar checkAuth al iniciar (solo una vez)
  if (!initialized) {
    (async () => {
      console.log("🔹 Ejecutando checkAuth() inicial");
      await checkAuth();
      setChecking(false);
    })();
  }

  // ⚠️ Redirección SOLO si ya está inicializado y SIN token
  if (initialized && !token && !isPublic) {
    console.log("🚪 Redirigiendo a /login (sin token y ruta privada)");
    router.replace("/login");
  }

  // 🚫 Si está logueado e intenta volver a /login → a su dashboard
  if (initialized && token && pathname === "/login") {
    console.log("🏠 Usuario logueado en /login → redirigiendo a /admin");
    router.replace("/admin");
  }
}, [pathname, initialized, token]);


  // 🕓 Mientras verificamos sesión, no renderizar el contenido
  if (checking) {
    console.log("⏳ Layout renderiza pantalla de verificación (checking=true)");
    return (
      <html lang="es">
        <body className="flex justify-center items-center h-screen bg-slate-50 text-slate-600">
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Verificando sesión...</p>
            <p className="text-sm text-gray-400">Por favor espera 🐾</p>
          </div>
        </body>
      </html>
    );
  }

  // ✅ Render normal
  console.log("🎯 Layout renderiza contenido normal (initialized=true)");

  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col">
        {!["/login", "/register"].includes(pathname) && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!["/login", "/register"].includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
