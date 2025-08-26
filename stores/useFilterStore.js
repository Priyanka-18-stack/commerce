import { create } from "zustand"; 
export const useFilterStore = create((set) => ({
  search: "",
  category: "all",
  setSearch: (s) => set({ search: s }),
  setCategory: (c) => set({ category: c }),
}));
