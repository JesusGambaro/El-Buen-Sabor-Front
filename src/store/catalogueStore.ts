import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

type FilterCategory = {
    nombre_like?: string;
    id_categoria?: number;
    id?: number;
}

type CatalogueStore = {
    filter: FilterCategory;
    setFilter: (filter: FilterCategory) => void;
}


const initialState = {
    filter: {
    } as FilterCategory
}

const useCatalogueStore = create<CatalogueStore>((set, get) => ({
    ...initialState,
    setFilter: (filter: FilterCategory) => set(
        (state) => ({
            ...state,
            filter: {
                ...state.filter,
                ...filter
            }
        })
    )
}))

mountStoreDevtool('Store', useCatalogueStore);

export default useCatalogueStore;
