import { create } from "zustand";
import { Carrito, CartItem } from "types/types";
import createSelectors from "./selectors";
import { mountStoreDevtool } from "simple-zustand-devtools";

type MainStore = {
  cart?: Carrito;
  token: string;
  loading: boolean;
  setToken: (token: string) => void;
  setCarrito: (cart: Carrito) => void;
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
    console.log("cart",cart);
    
    set((state) => ({
      ...state,
      cart,
    }));
  },
}));

mountStoreDevtool("Store", useMainStore);

export default useMainStore;
export const select = createSelectors(useMainStore);
