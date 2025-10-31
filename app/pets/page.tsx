"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import NewPetModal from "@/components/modals/NewPetModal";
import EditPetModal from "@/components/modals/EditPetModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import Image from "next/image";

export default function PetsPage() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [editPet, setEditPet] = useState<any | null>(null);
  const [deletePet, setDeletePet] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPet, setSelectedPet] = useState<any | null>(null);

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  async function fetchPets() {
    try {
      const { data } = await api.get("/pets/my");
      setPets(data || []);
    } catch (err) {
      console.error(" Error al cargar mascotas:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deletePet) return;
    try {
      await api.delete(`/pets/${deletePet.id}`);
      setDeletePet(null);
      fetchPets();
    } catch (err) {
      console.error(" Error al eliminar mascota:", err);
    }
  }

  const handleAddPhotoClick = (pet: any) => {
    setSelectedPet(pet);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedPet) return;

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("pet_id", selectedPet.id);

    try {
      const { data } = await api.post("/pets/upload-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPets((prev) =>
        prev.map((p) =>
          p.id === selectedPet.id ? { ...p, photo_url: data.url } : p
        )
      );
    } catch (err) {
      console.error(" Error al subir foto:", err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">
        Cargando tus mascotas...
      </p>
    );

  return (
    <main className="py-16 px-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-600 mb-10 text-center">
        Mis Mascotas 🐶🐱
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {pets.map((p) => (
          <div
            key={p.id}
            className="relative bg-white shadow rounded-lg p-6 text-center border border-gray-200"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => setEditPet(p)}
                className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
              >
                Editar
              </button>
              <button
                onClick={() => setDeletePet(p)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Eliminar
              </button>
            </div>

            <div
              className="w-40 h-40 mx-auto mb-4 flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 transition rounded-lg overflow-hidden"
              onClick={() => handleAddPhotoClick(p)}
            >
              {p.photo_url ? (
                <Image
  
                  src={`${apiBaseUrl}${p.photo_url}`}
                  alt={p.name}
                  width={160}
                  height={160}
                  className="w-40 h-40 object-cover mx-auto rounded-md border border-gray-200"
                />
              ) : (
                <div className="text-center text-gray-500 font-bold text-sm">
                  AGREGAR FOTO
                  <div className="text-xl">+</div>
                </div>
              )}
            </div>

   
            <h2 className="text-xl font-semibold mb-1 text-gray-800">
              {p.name}
            </h2>
            <p className="text-gray-600 mb-1 italic">{p.breed || "—"}</p>
            <p className="text-gray-500 text-sm capitalize">
              {p.species || "—"}
            </p>
            {p.weight_kg && (
              <p className="text-gray-700 text-sm mt-2">
                <strong>Peso:</strong> {p.weight_kg} kg
              </p>
            )}
            <p className="text-gray-400 text-xs mt-3">
              Creado: {new Date(p.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}

        
        <button
          onClick={() => setShowNewModal(true)}
          className="border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center w-64 h-40 text-gray-600 hover:bg-gray-50 hover:border-blue-500 transition"
        >
          <span className="text-4xl font-bold">+</span>
          <span className="text-sm font-semibold mt-2">
            AGREGAR MASCOTA NUEVA
          </span>
        </button>
      </div>


      {showNewModal && (
        <NewPetModal
          onClose={() => setShowNewModal(false)}
          onSuccess={fetchPets}
        />
      )}

      {editPet && (
        <EditPetModal
          pet={editPet}
          onClose={() => setEditPet(null)}
          onSuccess={fetchPets}
        />
      )}

      {deletePet && (
        <DeleteConfirmModal
          petName={deletePet.name}
          onCancel={() => setDeletePet(null)}
          onConfirm={handleDelete}
        />
      )}

      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </main>
  );
}
