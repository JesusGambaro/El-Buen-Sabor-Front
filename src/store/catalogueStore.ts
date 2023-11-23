import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { type Producto } from "types/types";

interface FilterCategory {
  nombre_like?: string | undefined | null;
  id_categoria?: number | undefined | null;
  precioMin: number;
  precioMax: number;
  descuento: boolean;
}

interface CatalogueStore {
  filter: FilterCategory;
  setFilter: (filter: FilterCategory) => void;
  setProductos: (productos: Producto[]) => void;
  productos: Producto[];
}

const initialState = {
  filter: { precioMax: 5000, precioMin: 0, descuento: false } as FilterCategory,
  productos: [] as Producto[],
};

const useCatalogueStore = create<CatalogueStore>((set, get) => ({
  ...initialState,
  setFilter: (filter: FilterCategory | undefined | null) => {
    set((state) => ({
      ...state,
      filter: {
        ...state.filter,
        ...filter,
      },
    }));
  },
  setProductos: (productos: Producto[]) => {
    set((state) => ({
      ...state,
      productos,
    }));
  },
}));

mountStoreDevtool("Store", useCatalogueStore);

export default useCatalogueStore;
