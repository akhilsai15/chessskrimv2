import { create } from "zustand";

export const useSettingsStore = create<any>((set: any) => ({
  settings: {},
  regionalBoostEnabled: false,
  setRegionalBoost: (status: boolean) => set({ regionalBoostEnabled: status }),
  updateSettings: (newSettings: any) =>
    set((state: any) => ({ settings: { ...state.settings, ...newSettings } })),
}));
