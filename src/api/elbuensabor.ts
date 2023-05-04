import { QueryFunctionContext } from "@tanstack/react-query";
import api from "../libs/axios";
import { useNavigate } from "react-router-dom";
import { CartItem, Category, Product } from "Types/types";

export const getCategories = async () => {
    const { data: categories } = await api.get("categorias");
    return categories;
}

export const getCategory = async ({ queryKey }: QueryFunctionContext) => {
    const [_, id] = queryKey;
    const { data: category } = await api.get(`categorias/${id}`);
    return category;
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
    const { data } = await api.put(`getCartItems/${2}`, item2);
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
