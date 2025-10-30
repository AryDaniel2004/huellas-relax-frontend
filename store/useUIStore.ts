import { create } from "zustand";

interface UIState {
  modalOpen: boolean;
  loading: boolean;
  openModal: () => void;
  closeModal: () => void;
  setLoading: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  modalOpen: false,
  loading: false,

  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
  setLoading: (value) => set({ loading: value }),
}));
