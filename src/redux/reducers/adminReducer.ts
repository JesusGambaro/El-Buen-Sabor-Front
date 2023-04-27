import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@utils/utils';
import { AdminState } from 'types/types';

// Login and Register Reducer
//productos manejados en ingles
const adminState: AdminState = {
    products: [],
    supplies: [],
    categories: [],
    loading: false,
    hasErrors: false,
    product: null,
    productLoading: false,
    productHasErrors: false
}

export const getProducts = createAsyncThunk(
    'admin/getProducts',
    async () => {
        const response = await axios.get(`${API_URL}/products`);
        console.log(response.data);
        return response.data;
    }
);

export const getSupplies = createAsyncThunk(
    'admin/getSupplies',
    async () => {
        const { data } = await axios.get(`${API_URL}insumos`);
        return data.slice(1);
    }
);

export const deleteSupplyById = createAsyncThunk(
    'admin/deleteSupplyById',
    async (id: number) => {
        const { data } = await axios.delete(`${API_URL}insumos/${id}`);
        return data;
    }
);
export const createSupply = createAsyncThunk(
    'admin/createSupply',
    async (supply: any) => {
        const { data } = await axios.post(`${API_URL}insumos`, supply);
        return data;
    }
);
export const updateSupplyById = createAsyncThunk(
    'admin/updateSupplyById',
    async (supply: any) => {
        const { data } = await axios.put(`${API_URL}insumos/${supply.id_insumo}`, supply);
        return data;
    }
);

export const getCategories = createAsyncThunk(
    'admin/getCategories',
    async () => {
        const response = await axios.get(`${API_URL}/categories`);
        console.log(response.data);
        return response.data;
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: adminState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product);
        },
        addSupply: (state, action) => {
            state.supplies.push(action.payload);
        },
        deleteSupply: (state, action) => {
            console.log(action.payload);
            state.supplies = state.supplies.filter(supply => supply.id_insumo !== action.payload);
        },
        updateSupply: (state, action) => {
            state.supplies = state.supplies.map(supply => supply.id_insumo === action.payload.id ? action.payload : supply);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.hasErrors = false;
        }
        );
        builder.addCase(getProducts.rejected, (state) => {
            state.loading = false;
            state.hasErrors = true;
        }
        );
        builder.addCase(getSupplies.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(getSupplies.fulfilled, (state, action) => {
            console.log(action.payload);
            const supplies = action.payload.map((supply: any) => {
                return { ...supply, id_insumo: supply.id }
            })
            state.supplies = supplies;
            state.loading = false;
            state.hasErrors = false;
        }
        );
        builder.addCase(getSupplies.rejected, (state) => {
            state.loading = false;
            state.hasErrors = true;
        }
        );
        builder.addCase(deleteSupplyById.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(deleteSupplyById.fulfilled, (state, action) => {
            const { arg: id } = action.meta;
            state.supplies = state.supplies.filter(supply => supply.id_insumo !== id);
            state.loading = false;
            state.hasErrors = false;
        }
        );
        builder.addCase(deleteSupplyById.rejected, (state) => {
            state.loading = false;
            state.hasErrors = true;
        }
        );
        builder.addCase(createSupply.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createSupply.fulfilled, (state, action) => {
            state.supplies.push(action.payload);
            state.loading = false;
            state.hasErrors = false;
        });
        builder.addCase(createSupply.rejected, (state) => {
            state.loading = false;
            state.hasErrors = true;
        });
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
        }
        );
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = false;
            state.hasErrors = false;
        }
        );
        builder.addCase(getCategories.rejected, (state) => {
            state.loading = false;
            state.hasErrors = true;
        }
        );
    }
});


export const { addProduct,
    deleteProduct,
    updateProduct,
    addSupply,
    deleteSupply,
    updateSupply,
} = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
