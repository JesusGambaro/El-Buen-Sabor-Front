import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

type FilterCategoryy = {
    nombre_like?: string;
    id?: number;
}

type AdminStore = {
    filter: FilterCategoryy;
    setFilter: (filter: FilterCategoryy) => void;
}


const initialState = {
    filter: {
        nombre_like: '',
        id: undefined
    }
}

const useAdminStore = create<AdminStore>((set, get) => ({
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

mountStoreDevtool('Store', useAdminStore);

export default useAdminStore;
