import { create } from "zustand";

export const useSavedStore = create<any>((set: any) => ({
  savedItems: [],
  savedPosts: [],
  repostedPosts: [],
  hydrate: () => {},
  saveItem: (item: any) =>
    set((state: any) => ({ savedItems: [...state.savedItems, item] })),
  removeItem: (id: string) =>
    set((state: any) => ({
      savedItems: state.savedItems.filter((i: any) => i.id !== id),
    })),
}));
