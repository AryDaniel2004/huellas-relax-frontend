"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createService,
  updateServicePrice,
  updateRoomPrice,
} from "@/lib/admin";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Wrench } from "lucide-react";

interface Room {
  id: string;
  code: string;
  price: number;
}

export default function AdminPanelPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"analytics" | "edit">("edit");
  const [tipo, setTipo] = useState("servicio");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [idEditar, setIdEditar] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (tipo === "habitacion") {
      api
        .get("/rooms")
        .then((res) => {
          const mapped = res.data.map((r: any) => ({
            id: r.id,
            code: r.code,
            price: r.price,
          }));
          setRooms(mapped);
        })
        .catch((err) => console.error("Error cargando habitaciones:", err));
    }
  }, [tipo]);

  if (user && user.role !== "ADMIN") {
    alert(" Solo los administradores pueden acceder a este panel.");
    router.replace("/");
    return null;
  }

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createService({ name: nombre, price: Number(precio) });
      alert(" Servicio creado correctamente.");
      setNombre("");
      setPrecio("");
    } catch (err: any) {
      alert(" Error al crear servicio: " + (err.response?.data?.error || err.message));
    }
  };

  const handleActualizarServicio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!idEditar) {
        alert("Debes ingresar el ID del servicio a actualizar.");
        return;
      }
      await updateServicePrice(idEditar, Number(precio));
      alert(" Precio del servicio actualizado correctamente.");
      setIdEditar("");
      setPrecio("");
    } catch (err: any) {
      alert(" Error al actualizar: " + (err.response?.data?.error || err.message));
    }
  };

  const handleActualizarHabitacion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!idEditar) {
        alert("Selecciona una habitación para actualizar su precio.");
        return;
      }
      await updateRoomPrice(idEditar, Number(precio));
      alert("Precio de habitación actualizado correctamente.");
      setIdEditar("");
      setPrecio("");
    } catch (err: any) {
      alert(" Error al actualizar habitación: " + (err.response?.data?.error || err.message));
    }
  };

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };


  return (
    <main className="relative min-h-screen bg-gray-50 p-10 flex justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {activeTab === "analytics" ? (
          <motion.div
            key="analytics"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full flex flex-col items-center justify-start"
          >
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
              📊 Analíticas Generales
            </h1>
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 w-full max-w-6xl">
              <iframe
                title="AryPowerBi"
                width="100%"
                height="600"
                src="https://app.powerbi.com/view?r=eyJrIjoiZmFjNjA1NTItZjg3YS00ODNlLWEzZTUtMGI1YTc1Njk4MGI0IiwidCI6IjVmNTNiNGNlLTYzZDQtNGVlOC04OGQyLTIyZjBiMmQ0YjI3YSIsImMiOjR9"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg border border-gray-200"
              ></iframe>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-3xl"
          >
            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center flex items-center justify-center gap-2">
              <Wrench className="text-green-600 w-8 h-8" />
              Crear y Editar Servicios / Habitaciones
            </h1>

            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Tipo</label>
                <select
                  value={tipo}
                  onChange={(e) => {
                    setTipo(e.target.value);
                    setIdEditar("");
                    setNombre("");
                    setPrecio("");
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                >
                  <option value="servicio">Servicio</option>
                  <option value="habitacion">Habitación</option>
                </select>
              </div>

              {tipo === "servicio" ? (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Nombre o ID del Servicio
                    </label>
                    <input
                      type="text"
                      value={idEditar || nombre}
                      onChange={(e) => {
                        if (idEditar) setIdEditar(e.target.value);
                        else setNombre(e.target.value);
                      }}
                      placeholder={
                        idEditar
                          ? "ID del servicio a actualizar"
                          : "Nombre del nuevo servicio"
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Precio (Q)
                    </label>
                    <input
                      type="number"
                      value={precio}
                      onChange={(e) =>
                        setPrecio(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      placeholder="Ejemplo: 115.00"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={handleCrear}
                      className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Crear
                    </button>
                    <button
                      onClick={handleActualizarServicio}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Actualizar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Selecciona una Habitación
                    </label>
                    <select
                      value={idEditar}
                      onChange={(e) => setIdEditar(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    >
                      <option value="">-- Selecciona --</option>
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.code} — Q{r.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Nuevo Precio (Q)
                    </label>
                    <input
                      type="number"
                      value={precio}
                      onChange={(e) =>
                        setPrecio(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      placeholder="Ejemplo: 250.00"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      required
                    />
                  </div>

                  <button
                    onClick={handleActualizarHabitacion}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition w-full mt-4"
                  >
                    Guardar cambios
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex flex-col items-center justify-center text-sm font-semibold transition ${
            activeTab === "edit"
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          <div
            className={`w-0 h-0 border-t-[10px] border-b-[10px] border-l-[15px] ${
              activeTab === "edit"
                ? "border-l-blue-600"
                : "border-l-gray-400 hover:border-l-blue-500"
            }`}
          ></div>
          <span>CREAR<br />y editar</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex flex-col items-center justify-center text-sm font-semibold transition ${
            activeTab === "analytics"
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
        >
          <div
            className={`w-0 h-0 border-t-[10px] border-b-[10px] border-l-[15px] ${
              activeTab === "analytics"
                ? "border-l-blue-600"
                : "border-l-gray-400 hover:border-l-blue-500"
            }`}
          ></div>
          <span>Analíticas</span>
        </button>
      </div>
    </main>
  );
}
