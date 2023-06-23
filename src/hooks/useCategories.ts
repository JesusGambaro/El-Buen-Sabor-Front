import { getCategories, getCategory } from "@api/elbuensabor";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { Category } from "types/types";

export const useCategories = () => {
    return useQuery<Category[]>(["categories"], getCategories, {
        enabled: true,
    })
}

export const useCategory = (id: string) => {
    return useQuery<Category>(["category", id], getCategory, {
        enabled: true,
    })
}
