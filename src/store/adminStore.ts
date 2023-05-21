import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'

type BaseFilter = {
    nombre?: string;
    id?: number;
    page: number;
    totalPages: number;
}

type AdminStore = {
    categoriaFilter: BaseFilter;
    insumoFilter: BaseFilter;
    productoFilter: BaseFilter;
    setFilter: (filter: BaseFilter, name: string) => void;
    setPage: (page: number, name: string) => void;
    setTotalPages: (totalPages: number, name: string) => void;
}


const initialState = {
    categoriaFilter: {
        nombre: '',
        id: undefined,
        page: 0,
        totalPages: 0
    },
    insumoFilter: {
        nombre: '',
        category_id: undefined,
        page: 0,
        totalPages: 0
    },
    productoFilter: {
        nombre: '',
        category_id: undefined,
        supply_id: undefined,
        page: 0,
        totalPages: 0
    }
}

const useAdminStore = create<AdminStore>((set, get) => ({
    ...initialState,
    setFilter: (filter: BaseFilter, name: string) => set(
        (state) => ({
            ...state,
            [name]: {
                ...state[name as keyof AdminStore],
                ...filter
            }
        })
    ),
    setPage: (page: number, name: string) => set(
        (state) => ({
            ...state,
            [name]: {
                ...state[name as keyof AdminStore],
                page
            }
        })
    ),
    setTotalPages: (totalPages: number, name) => set(
        (state) => ({
            ...state,
            [name]: {
                ...state[name as keyof AdminStore],
                totalPages
            }
        })
    )
}))

mountStoreDevtool('Store', useAdminStore);

export default useAdminStore;
