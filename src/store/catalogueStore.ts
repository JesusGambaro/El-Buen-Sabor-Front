import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

type FilterCategoryy = {
    nombre_like?: string;
    id_categoria?: number;
}

type CatalogueStore = {
    filter: FilterCategoryy;
    setFilter: (filter: FilterCategoryy) => void;
}


const initialState = {
    filter: {
        nombre_like: '',
    }
}

const useCatalogueStore = create<CatalogueStore>((set, get) => ({
    ...initialState,
    setFilter: (filter: FilterCategoryy) => set(
        (state) => ({
            ...state,
            filter: {
                ...state.filter,
                ...filter
            }
        })
    )
}))

mountStoreDevtool('Catalogue', useCatalogueStore);

export default useCatalogueStore;
