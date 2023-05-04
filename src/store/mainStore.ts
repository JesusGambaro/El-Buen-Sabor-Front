import { create } from 'zustand'
import { CartItem } from 'Types/types'
import createSelectors from './selectors'
import { mountStoreDevtool } from 'simple-zustand-devtools'

type MainStore = {
}

const initialState = {
  cart: [] as CartItem[]
}

const useMainStore = create<MainStore>((set, get) => ({
  ...initialState,
}))

mountStoreDevtool('Store', useMainStore);

export default useMainStore;
export const select = createSelectors(useMainStore);