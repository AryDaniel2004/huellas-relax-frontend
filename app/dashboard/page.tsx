"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function fetchUser() {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (err) {
      console.error("❌ Error obteniendo datos del usuario:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleUpload() {
    if (!file || !user) return;
    const formData = new FormData();
    formData.append("photo", file);

    try {
      setUploading(true);
      const { data } = await api.post(`/users/${user.id}/upload-photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("📸 Foto actualizada correctamente");
      setUser({ ...user, photo_url: data.photo_url });
    } catch (err) {
      alert("❌ Error al subir la foto");
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  if (loading)
    return <p className="text-center py-10 text-gray-500">Cargando perfil...</p>;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Mi Cuenta</h1>

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.photo_url || "/default-avatar.png"}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-300"
          />
          <input
            type="file"
            accept="image/*"
            className="mt-3 text-sm"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
          >
            {uploading ? "Subiendo..." : "Cambiar foto"}
          </button>
        </div>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>👤 Nombre:</strong> {user?.full_name || "No especificado"}
          </p>
          <p>
            <strong>📧 Correo:</strong> {user?.email}
          </p>
          <p>
            <strong>📱 Teléfono:</strong> {user?.phone || "No registrado"}
          </p>
          <p>
            <strong>🎭 Rol:</strong> {user?.role}
          </p>
        </div>
      </div>
    </main>
  );
}
