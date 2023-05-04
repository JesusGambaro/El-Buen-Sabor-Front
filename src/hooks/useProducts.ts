import { getLanding, getProduct } from "@api/elbuensabor";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Product } from "Types/types";

export const useProducts = () => {
    return useQuery<Product[]>(["landingProducts"], getLanding)
}

export const useProduct = (id: string) => {
    return useQuery<Product>(["landingProduct", id], getProduct)
}

