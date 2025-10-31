"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export function BookingForm() {
  const [form, setForm] = useState({
    serviceId: "",
    start_date: "",
    end_date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/bookings", form);
    alert("Reserva creada exitosamente ");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Servicio</label>
        <input
          type="text"
          value={form.serviceId}
          onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
          className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-primary/30"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Fecha Inicio</label>
        <input
          type="date"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-primary/30"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Fecha Fin</label>
        <input
          type="date"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-primary/30"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Crear Reserva
      </button>
    </form>
  );
}
