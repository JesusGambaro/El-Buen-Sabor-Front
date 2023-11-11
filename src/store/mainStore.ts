import { create } from "zustand";
import { Carrito, CartItem, Direccion } from "types/types";
import createSelectors from "./selectors";
import { mountStoreDevtool } from "simple-zustand-devtools";

type MainStore = {
  cart?: Carrito;
  token: string;
  direcciones?: Direccion[];
  loading: boolean;
  isMobile: boolean;
  setToken: (token: string) => void;
  setCarrito: (cart: Carrito) => void;
  setLoading: (loading: boolean) => void;
  setIsMobile: (loading: boolean) => void;
  setDirecciones: (direcciones: Direccion[]) => void;
};

const initialState = {
  token: "",
  loading: false,
  isMobile: false,
};

const useMainStore = create<MainStore>((set, get) => ({
  ...initialState,
  setToken: (token: string) =>
    set((state) => ({
      ...state,
      token,
    })),
  setCarrito: (cart: Carrito) => {
    set((state) => ({
      ...state,
      cart,
    }));
  },
  setLoading: (loading: boolean) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setDirecciones: (direcciones: Direccion[]) => {
    set((state) => ({
      ...state,
      direcciones,
    }));
  },
  setIsMobile: (isMobile: boolean) => {
    set((state) => ({
      ...state,
      isMobile: isMobile,
    }));
  },
}));

mountStoreDevtool("Store", useMainStore);

export default useMainStore;
export const select = createSelectors(useMainStore);
