"use client";

import { useState } from "react";
import { api } from "@/lib/api";

interface NewPetModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewPetModal({ onClose, onSuccess }: NewPetModalProps) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/pets", {
        name,
        species,
        breed,
        weight_kg: parseFloat(weight),
      });
      onSuccess(); // 🔄 Recargar lista
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al crear mascota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
          🐶 Nueva Mascota
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nombre de la mascota"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-blue-500"
          />
          <input
            type="text"
            placeholder="Especie (Perro, Gato...)"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-blue-500"
          />
          <input
            type="text"
            placeholder="Raza"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-blue-500"
          />
          <input
            type="number"
            placeholder="Peso (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-blue-500"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
