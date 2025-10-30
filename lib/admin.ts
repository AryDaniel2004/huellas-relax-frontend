import { api } from "./api";

// ✅ Crear nuevo servicio
export async function createService(payload: {
  name: string;
  description?: string;
  price: number;
}) {
  const { data } = await api.post("/admin/services", payload);
  return data;
}

// ✅ Actualizar precio de servicio
export async function updateServicePrice(id: string, price: number) {
  const { data } = await api.patch(`/admin/services/${id}`, { price });
  return data;
}

// ✅ Actualizar precio de habitación
export async function updateRoomPrice(id: string, price: number) {
  const { data } = await api.patch(`/admin/rooms/${id}/price`, { price });
  return data;
}
