import { api } from "./api";

export async function getPets() {
  const { data } = await api.get("/pets");
  return data;
}

export async function getPetById(id: string) {
  const { data } = await api.get(`/pets/${id}`);
  return data;
}

export async function createPet(pet: any) {
  const { data } = await api.post("/pets", pet);
  return data;
}

export async function updatePet(id: string, pet: any) {
  const { data } = await api.put(`/pets/${id}`, pet);
  return data;
}

export async function deletePet(id: string) {
  const { data } = await api.delete(`/pets/${id}`);
  return data;
}
