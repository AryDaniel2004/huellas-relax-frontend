import { api } from "./api";

export async function getBookings() {
  const { data } = await api.get("/bookings");
  return data;
}

export async function getBookingById(id: string) {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
}

export async function createBooking(booking: any) {
  const { data } = await api.post("/bookings", booking);
  return data;
}

export async function updateBookingStatus(id: string, status: string) {
  const { data } = await api.patch(`/bookings/${id}/status`, { status });
  return data;
}
