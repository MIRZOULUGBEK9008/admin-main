import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    materials: [],
    admin: null,
    addItemDrawer: {
      modal: false,
      title: null,
      description: null,
      children: null,
      height: null,
    },
    gKeywords: [],
    gAuthors: [],
    gCoverImage: null,
    setMaterials(materials, type) {
      return set((state) => {
        if (type === "one") {
          return { materials: [...state.materials, materials] };
        } else {
          return { materials };
        }
      });
    },
    setAdmin(value) {
      return set(() => {
        return { admin: value };
      });
    },
    setAddItemDrawer(value) {
      return set((state) => {
        return {
          addItemDrawer: { ...value, modal: !state.addItemDrawer.modal },
        };
      });
    },
    setGKeywords(gKeywords) {
      return set(() => {
        return {
          gKeywords,
        };
      });
    },
    setGAuthors(gAuthors) {
      return set(() => {
        return {
          gAuthors,
        };
      });
    },
    setGCoverImage(url) {
      return set(() => {
        return {
          gCoverImage: url,
        };
      });
    },
  };
});
