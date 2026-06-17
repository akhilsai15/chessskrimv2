import { create } from "zustand";

export const useOfflineStore = create<any>((set: any) => ({
  isOffline: false,
  offlineVibes: [],
  loadVibes: () => {},
  deleteVibe: () => {},
  setOffline: (status: boolean) => set({ isOffline: status }),
}));
