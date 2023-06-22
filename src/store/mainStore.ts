import { create } from "zustand";
import { Carrito, CartItem, Direccion } from "types/types";
import createSelectors from "./selectors";
import { mountStoreDevtool } from "simple-zustand-devtools";

type MainStore = {
  cart?: Carrito;
  token: string;
  direcciones?: Direccion[];
  loading: boolean;
  setToken: (token: string) => void;
  setCarrito: (cart: Carrito) => void;
  setDirecciones: (direcciones: Direccion[]) => void;
};

const initialState = {
  token: "",
  loading: false,
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
  setDirecciones: (direcciones: Direccion[]) => {
    set((state) => ({
      ...state,
      direcciones,
    }));
  },
}));

mountStoreDevtool("Store", useMainStore);

export default useMainStore;
export const select = createSelectors(useMainStore);
