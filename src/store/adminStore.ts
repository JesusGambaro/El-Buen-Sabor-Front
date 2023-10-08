// Store for admin pages using zustand
import {
  type MeasureUnit,
  type Categoria,
  type Producto,
  type Insumo,
  type Usuario,
} from "types/types";
import { type StoreApi, type UseBoundStore, create } from "zustand";

// Generic store interface
interface Store<T> {
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (size: number) => void;
  sortBy: {
    field: string;
    direction: "asc" | "desc";
  };
  setSortBy: (field: string, direction: "asc" | "desc") => void;
  getFilters: () => Record<string, string | number>;
}

// Initial state
const initialState = {
  filters: {},
  currentPage: 0,
  totalPages: 0,
  sortBy: {
    field: "id",
    direction: "asc" as "asc",
  },
};

// Generic store creator
const useAdminStore = <T>(): UseBoundStore<StoreApi<Store<any>>> => {
  return create<Store<T>>((set, get) => ({
    ...initialState,
    setFilters: (filters: Record<string, string>) => {
      set({ filters });
    },
    setCurrentPage: (page: number) => {
      set({ currentPage: page });
    },
    setTotalPages: (size: number) => {
      set({ totalPages: size });
    },
    setSortBy: (field: string, direction: "asc" | "desc") => {
      set({ sortBy: { field, direction } });
    },
    // Get filters is used for get requests, with pagination, sorting and filters
    getFilters: () => {
      const { filters, currentPage, sortBy } = get();
      return {
        ...filters,
        page: currentPage,
        sort: `${sortBy.field},${sortBy.direction}`,
      };
    },
  }));
};

// Create stores for each entity
export const suppliesStore = useAdminStore<Insumo>();
export const productsStore = useAdminStore<Producto>();
export const categoriesStore = useAdminStore<Categoria>();
export const measuresUnitsStore = useAdminStore<MeasureUnit>();
export const usersStore = useAdminStore<Usuario>();

// Create a map for each entity
const storeMap: Record<string, UseBoundStore<StoreApi<Store<any>>>> = {
  insumo: suppliesStore,
  producto: productsStore,
  categoria: categoriesStore,
  um: measuresUnitsStore,
  users: usersStore,
};

// Set total pages for each entity store
export const setTotalPages = (entity: string, totalPages: number): void => {
  const store = storeMap[entity];
  console.log("store", entity, totalPages);

  const { setTotalPages, setCurrentPage } = store.getState();
  if (store !== undefined) {
    setTotalPages(totalPages);
    // If the response has only one page, set current page to 0 to avoid pagination errors
    if (totalPages === 1) {
      setCurrentPage(0);
    }
  }
};
