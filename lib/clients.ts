import { api } from "./api";

export async function getClients() {
  const { data } = await api.get("/clients");
  return data;
}

export async function getClientById(id: string) {
  const { data } = await api.get(`/clients/${id}`);
  return data;
}

export async function createClient(client: any) {
  const { data } = await api.post("/clients", client);
  return data;
}

export async function updateClient(id: string, client: any) {
  const { data } = await api.put(`/clients/${id}`, client);
  return data;
}

export async function deleteClient(id: string) {
  const { data } = await api.delete(`/clients/${id}`);
  return data;
}
