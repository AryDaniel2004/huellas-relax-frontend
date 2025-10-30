import { create } from "zustand";
import { getBookings, createBooking } from "@/lib/bookings";

interface BookingState {
  bookings: any[];
  loading: boolean;
  fetchBookings: () => Promise<void>;
  addBooking: (booking: any) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  loading: false,

  fetchBookings: async () => {
    set({ loading: true });
    try {
      const data = await getBookings();
      set({ bookings: data });
    } finally {
      set({ loading: false });
    }
  },

  addBooking: async (booking) => {
    const data = await createBooking(booking);
    set((state) => ({ bookings: [...state.bookings, data] }));
  },
}));
