import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { getFetch, postPutFetch } from "@api/elbuensabor";

interface QueryData<T> {
  data: T | { content: T; totalPages: number };
  error: unknown;
  isLoading: boolean;
  refetch: () => void;
  functionFetch?: () => void;
}

export const useApiQuery = <T>(
  query: string,
  filters?: any,
  enabled = true
): QueryData<T> => {
  const { data, error, isLoading, refetch } = useQuery<T>(
    [query, filters],
    getFetch,
    {
      enabled,
      retry: false,
    }
  );
  return {
    data: data as T,
    error,
    isLoading,
    refetch,
  };
  /* Version nueva, pero no hace refetch
  return useQuery<T>({
    queryKey: [query],
    // queryFn: () => genericFetch({ query, filters } as any),
    enabled,
  }) as QueryData<T>; */
};

export const useApiMutation = <T>(query: string) => {
  const parentQuery = `GET|${query.split("|")[1]}/`;

  return useMutation(
    async (data: any) => await postPutFetch({ query, data } as any),
    {
      onMutate: async () => {
        await queryClient.cancelQueries([query]);
        const previousValue = queryClient.getQueryData([query]);

        return { previousValue };
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData([query], context?.previousValue);
      },
      onSuccess: (data) => {
        const similarQueries = queryClient.getQueryCache().findAll();
        similarQueries.forEach((query: any) => {
          if (query.queryKey[0].includes(parentQuery)) {
            queryClient.invalidateQueries(query.queryKey);
          }
        });
        // console.log("onSuccess: ", data);
        return { data };
      },
    }
  );
};

/* 
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
} */
