import { create } from 'zustand';

export const DATA_MODES = [
  {
    id: "standard",
    name: "Standard Data Sync",
    desc: "Optimized for speed and regular usage. Includes background uploads.",
    icon: "zap",
  },
  {
    id: "power",
    name: "Power Saving Mode",
    desc: "Only load media on Wi-Fi. Pauses background activity to save battery.",
    icon: "battery",
  },
  {
    id: "incognito",
    name: "Incognito Sync",
    desc: "Does not store any local cache on the device. Data is cleared on exit.",
    icon: "ghost",
  },
];

interface DataModeState {
  dataMode: string;
  setDataMode: (mode: string) => void;
}

export const useDataModeStore = create<DataModeState>((set) => ({
  dataMode: "standard",
  setDataMode: (mode: string) => set({ dataMode: mode }),
}));
