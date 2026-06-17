import { create } from "zustand";

export const useAuthStore = create<any>((set: any) => ({
  user: null,
  isAuthenticated: false,
  setAuthenticated: (status: boolean) => set({ isAuthenticated: status }),
  setUser: (user: any) => set({ user }),
  login: (user: any) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
