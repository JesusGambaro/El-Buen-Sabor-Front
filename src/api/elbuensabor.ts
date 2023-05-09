import { QueryFunctionContext } from "@tanstack/react-query";
import api from "../libs/axios";
import { CartItem, Category, Product } from "Types/types";


export const getCategory = async ({ queryKey }: QueryFunctionContext) => {
    const [_, id] = queryKey;
    const { data: category } = await api.get(`categorias/${id}`);
    return category;
}

type LandingFilter = {
    query?: string;
    id?: number;
}
export const getLandingFiltered = async (params?: QueryFunctionContext) => {
    const [_, filter] = params?.queryKey as [string, LandingFilter];

    let query = '/';
    if (filter) {
        Object.keys(filter).forEach((key) => {
            if (!filter[key as keyof FilterParams]) return;
            const separator = query.indexOf("?") !== -1 ? "&" : "?";
            query += `${separator}${key}=${filter[key as keyof FilterParams]}`;
        });
    }
    console.log("landingQuery: "+query);
    
    const { data } = await api.get(`categorias${query}`);
    return data;
}
export const getLanding = async () => {
    let { data: landing } = await api.get("getLanding");
    landing = landing.map((product: any) => {
        return {
            id_producto: product.id,
            nombre: product.name,
            imagen: product.img,
            precio: product.price,
            rating: product.rating,
        } as Product
    })
    return landing
}

export const getProduct = async ({ queryKey }: QueryFunctionContext) => {
    const [_, id] = queryKey;
    let { data: product } = await api.get(`getLanding/${id}`);
    product = {
        id_producto: product.id,
        nombre: product.name,
        imagen: product.img,
        precio: product.price,
        rating: product.rating,
    } as Product;

    return product;
}

export const getCart = async () => {
    const { data } = await api.get("getCartItems");
    console.log('data');

    const cart = data.map((item: any) => {
        return {
            product: {
                id_producto: item.id,
                nombre: item.name,
                imagen: item.img,
                precio: item.price,
                rating: item.rating,
            },
            quantity: item.quantity,
        }
    })
    return cart;
}

export const addToCart = async ({ product, quantity }: CartItem) => {
    const item2 = {
        id: product.id_producto,
        name: product.nombre,
        price: product.precio,
        img: product.imagen,
        quantity: quantity,
        discount: product.discount,
    }
    const { data } = await api.post("getCartItems", item2);
    return data;
}

export const removeFromCart = async ({ product }: CartItem) => {
    const { data } = await api.delete(`getCartItems/${product.id_producto}`);
    return data;
}

export const updateCart = async ({ product, quantity }: CartItem) => {
    const item2 = {
        id: product.id_producto,
        name: product.nombre,
        price: product.precio,
        img: product.imagen,
        quantity: quantity,
        discount: product.discount,
    }
    const { data } = await api.put(`getCartItems/${item2.id}`, item2);
    return data;
}

export const emptyCart = async (cartItemsIds: number[]) => {
    //for each item in cartItemsIds, delete it from cart
    const promises = cartItemsIds.map((id) => {
        return api.delete(`getCartItems/${id}`);
    })
    await Promise.all(promises);
    return;
}

export const createCategory = async (category: Category) => {
    console.log('category', category, 'api');

    const { data: newCategory } = await api.post("categorias", category);
    return newCategory;
}

export const updateCategory = async (category: Category) => {
    const { data } = await api.put(`categorias/${category.id}`, category);
    return data;
}

export const deleteCategory = async (id: number) => {
    const { data } = await api.delete(`categorias/${id}`);
    return data;
}

type FilterParams = {
    query?: string;
    id?: number;
}

export const getCategories = async (params?: QueryFunctionContext) => {
    const [_, filter] = params?.queryKey as [string, FilterParams];

    let query = '/';
    if (filter) {
        Object.keys(filter).forEach((key) => {
            if (!filter[key as keyof FilterParams]) return;
            const separator = query.indexOf("?") !== -1 ? "&" : "?";
            query += `${separator}${key}=${filter[key as keyof FilterParams]}`;
        });
    }
    console.log(query);
    
    const { data } = await api.get(`categorias${query}`);
    return data;
}


type GenericFetch = {
    url: string;
    method: string;
    data?: string;
    headers?: any;
}

export const fetchBackend = async <T = any>(params: QueryFunctionContext): Promise<T> => {
    console.log('params', params);
    const [_, method, endpoint, data] = params.queryKey as [string, string, string, any | undefined];
    const options = {
        url: endpoint,
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
    } as GenericFetch;
    if (data) {
        options.data = JSON.stringify(data);
    }
    console.log('options', options);

    return api(options).then((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.statusText);
        }
    });
}
