import { addToCart, emptyCart, getCart, removeFromCart, updateCart } from "@api/elbuensabor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItem } from "Types/types";
import { queryClient } from "../queryClient";

type QueryData<T> = {
    data: T;
    error: unknown;
    isLoading: boolean;
    refetch: () => void;
};


export const useApiQuery = <T>(query: string, func: () => Promise<T>, enabled = true): QueryData<T> => {
    const { data, error, isLoading, refetch } = useQuery<T>([query], func, {
        enabled
    });
    return { data: data as T, error, isLoading, refetch };
};

export const useApiMutation = <T>(query: string, func: (data: T) => Promise<T>) => {
    const parentQuery = query.includes('/') && query.split('/')[0];
    return useMutation(func, {
        onMutate: async (data) => {
            await queryClient.cancelQueries([query]);
            const previousValue = queryClient.getQueryData([query]);
            console.log('onMutate');
            return { previousValue };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData([query], context?.previousValue);
            console.log('onError');
        },
        onSettled: () => {
            queryClient.invalidateQueries([query]);
            if (parentQuery) {
                queryClient.invalidateQueries([parentQuery]);
            }
        }
    });
};



export const useCart = () => {
    return useQuery<CartItem[]>(["cart"], getCart, {
        enabled: true
    });
}
//get the id of the product and the quantity from p
export const useAddToCart = () => {
    const { refetch } = useCart();
    return useMutation(addToCart, {
        onSuccess: () => {
            refetch();
        }
    });
}

export const useRemoveFromCart = () => {
    const { refetch } = useCart();
    return useMutation(removeFromCart, {
        onSuccess: () => {
            refetch();
        }
    });
}

export const useUpdateCart = () => {
    const { refetch } = useCart();
    return useMutation(updateCart, {
        onSuccess: () => {
            refetch();
        }
    });
}

export const useEmptyCart = () => {
    const { refetch } = useCart();
    const cartItemsIds = useCart().data?.map((item) => item.product.id_producto) as number[];
    return useMutation(() => emptyCart(cartItemsIds), {
        onSuccess: () => {
            refetch();
        }
    });
}

