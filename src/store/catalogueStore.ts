import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { type Product } from "types/types";

interface FilterCategory {
  nombre_like?: string;
  id_categoria?: number;
}

interface CatalogueStore {
  filter: FilterCategory;
  setFilter: (filter: FilterCategory) => void;
  setProductos: (productos: Product[]) => void;
  productos: Product[];
}

const initialState = {
  filter: {} as FilterCategory,
  productos: [] as Product[],
};

const useCatalogueStore = create<CatalogueStore>((set, get) => ({
  ...initialState,
  setFilter: (filter: FilterCategory) => {
    set((state) => ({
      ...state,
      filter: {
        ...state.filter,
        ...filter,
      },
    }));
  },
  setProductos: (productos: Product[]) => {
    set((state) => ({
      ...state,
      productos,
    }));
  },
}));

mountStoreDevtool("Store", useCatalogueStore);

export default useCatalogueStore;
