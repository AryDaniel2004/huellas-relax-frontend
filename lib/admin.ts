import { api } from "./api";


export async function createService(payload: {
  name: string;
  description?: string;
  price: number;
}) {
  const { data } = await api.post("/admin/services", payload);
  return data;
}


export async function updateServicePrice(id: string, price: number) {
  const { data } = await api.patch(`/admin/services/${id}`, { price });
  return data;
}


export async function updateRoomPrice(id: string, price: number) {
  const { data } = await api.patch(`/admin/rooms/${id}/price`, { price });
  return data;
}
