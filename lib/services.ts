import { api } from "./api";

export async function getServices() {
  const { data } = await api.get("/services");
  return data;
}

export async function getServiceById(id: string) {
  const { data } = await api.get(`/services/${id}`);
  return data;
}

export async function createService(service: any) {
  const { data } = await api.post("/services", service);
  return data;
}

export async function updateService(id: string, service: any) {
  const { data } = await api.put(`/services/${id}`, service);
  return data;
}

export async function deleteService(id: string) {
  const { data } = await api.delete(`/services/${id}`);
  return data;
}
