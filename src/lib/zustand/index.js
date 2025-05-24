import { create } from "zustand";

export const useAppStore = create((set) => {
  return {
    materials: [],
    admin: null,
    crudDrawer: {
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
    deleteMaterial(id) {
      return set((state) => {
        const materials = state.materials.filter((el) => el.id !== id);
        return { materials };
      });
    },
    updateMaterial(data) {
      return set((state) => {
        const materials = state.materials.map((el) => {
          if (el.id === data.id) {
            return data;
          } else {
            return el;
          }
        });
        return { materials };
      });
    },
    setAdmin(value) {
      return set(() => {
        return { admin: value };
      });
    },
    setCrudDrawer(value) {
      let items = {};
      if (!value) {
        items = { gKeywords: [], gAuthors: [], gCoverImage: null };
      }
      return set((state) => {
        return {
          ...items,
          crudDrawer: { ...value, modal: !state.crudDrawer.modal },
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
