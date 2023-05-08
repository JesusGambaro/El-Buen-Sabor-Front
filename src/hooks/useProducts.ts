import { fetchBackend, getLanding, getProduct } from "@api/elbuensabor";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Product } from "Types/types";

export const useProducts = (query: string) => {
    const method = query.split('/')[0];
    const url = query.split('/')[1];

    return useQuery<Product[]>(["getProductsLanding"
        , method, url
    ], fetchBackend)
}

export const useProduct = (id: string) => {
    return useQuery<Product>(["landingProduct", id], getProduct)
}

