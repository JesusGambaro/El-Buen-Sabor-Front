import { fetchBackend, getLanding, getProduct } from "@api/elbuensabor";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Product } from "types/types";

export const useProducts = () => {
    //params = query: string
    // const method = query.split('/')[0];
    // const url = query.split('/')[1];

    // return useQuery<Product[]>(["getProductsLanding"
    //     , method, url
    // ], fetchBackend)
    return useQuery<Product[]>(["landingProduct"], getLanding)
}
export const useProduct = (id: string) => {
    return useQuery<Product>(["landingProduct", id], getProduct)
}

