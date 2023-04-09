import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@utils/utils';

// Login and Register Reducer
const authState = {
    user: null,
    loading: false,
    hasErrors: false,
    token: null,
    isAuth: null,
    attempt: false,
};

export const login = createAsyncThunk('auth/login', async (payload) => {
    const { data: { user, token } } = await axios.post(API_URL + "login", payload);
    return { user, token };
});

export const register = createAsyncThunk('auth/register', async (payload) => {
    const { data: { user, token } } = await axios.post(API_URL + "register", payload);
    return { user, token };
});

const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        setAuth: (state, { payload }) => {
            state.isAuth = payload;
        },
        setAttempt: (state, { payload }) => {
            state.attempt = payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.loading = false;
                state.hasErrors = false;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
                state.hasErrors = true;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.loading = false;
                state.hasErrors = false;
                state.isAuth = true;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
                state.hasErrors = true;
            });
    },
});

// Landing Page Reducer
const landingState = {
    landingProducts: [],
    categories: [],
    loading: false,
    hasErrors: false,
};

export const getLandingProducts = createAsyncThunk('landingPage/getLandingProducts', async () => {
    const { data: { landing } } = await axios.get(API_URL + "getLanding");
    return landing;
});
export const getCategories = createAsyncThunk('landingPage/getCategories', async () => {
    const { data: { categories } } = await axios.get(API_URL + "getCategories");
    return categories;
});

const landingPageSlice = createSlice({
    name: 'landingPage',
    initialState: landingState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLandingProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLandingProducts.fulfilled, (state, { payload }) => {
                state.landingProducts = payload;
                state.loading = false;
                state.hasErrors = false;
            })
            .addCase(getLandingProducts.rejected, (state) => {
                state.loading = false;
                state.hasErrors = true;
            }).addCase(getCategories.pending, (state) => {
                state.loading = true;
            }).addCase(getCategories.fulfilled, (state, { payload }) => {
                state.categories = payload;
                state.loading = false;
                state.hasErrors = false;
            }).addCase(getCategories.rejected, (state) => {
                state.loading = false;
                state.hasErrors = true;
            }
            );
    },
});

// Cart Reducer
const cartState = {
    cartProducts: [],
    loading: false,
    hasErrors: false,
    total: 0,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
    const { data: { cartItems } } = await axios.get(API_URL + "getCartItems");
    return cartItems;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartState,
    reducers: {
        addToCart: (state, { payload }) => {
            const item = state.cartProducts.find((item) => item.id === payload.id);
            if (item) {
                item.quantity += payload.quantity;
            } else {
                state.cartProducts = [...state.cartProducts, payload];
            }
        },
        removeFromCart: (state, { payload: id }) => {
            state.cartProducts = state.cartProducts.filter((item) => item.id !== id);
        },
        clearCart: (state) => {
            state.cartProducts = [];
        },
        editCart: (state, { payload }) => {
            const { newItem, index } = payload;
            state.cartProducts = [...state.cartProducts.slice(0, index), newItem, ...state.cartProducts.slice(index + 1)];
        },
        getTotal: (state) => {
            state.total = state.cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartItems.fulfilled, (state, { payload }) => {
                state.cartProducts = payload;
                state.loading = false;
                state.hasErrors = false;
            })
            .addCase(getCartItems.rejected, (state) => {
                state.loading = false;
                state.hasErrors = true;
            });
    },
});

export const { logout, setAuth, setAttempt } = authSlice.actions;
export const { addToCart, removeFromCart, clearCart, editCart, getTotal } = cartSlice.actions;
export const authReducer = authSlice.reducer;
export const landingPageReducer = landingPageSlice.reducer;
export const cartReducer = cartSlice.reducer;