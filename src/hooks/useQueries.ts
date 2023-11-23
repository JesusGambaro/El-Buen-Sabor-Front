import { type Query, useMutation, useQuery } from "@tanstack/react-query";
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
    refetch: refetch as () => void,
  };
};

export const useApiMutation = <T>(query: string, options?: any) => {
  const parentQuery = `GET|${query.split("|")[1]}/`;

  return useMutation(
    async (data: any) => await postPutFetch({ query, data } as any),
    {
      /* Versión original   
      onMutate: async () => {
          await queryClient.cancelQueries([query]);
          const previousValue = queryClient.getQueryData([query]);
  
          return { previousValue };
        }, */
      /*       onError: (err, variables, context) => {
        queryClient.setQueryData([query], context?.previousValue);
      }, 
      */ /* Versión sugerida,
      onSuccess: async (data, variables, context) => {
        const allActiveQueries = queryClient.getQueryCache().findAll();

        // store the queries that contain the parent query, just save the queryKey
        const similarQueries = allActiveQueries.map((query: Query) => {
          if (query.queryKey[0].includes(parentQuery)) {
            return {
              queryKey: query.queryKey[0],
            };
          }
          return null;
        });

        await queryClient.refetchQueries(similarQueries[0]);
        return { data };
      },
*/
      onSuccess: async (data, variables, context) => {
        const allActiveQueries = queryClient.getQueryCache().findAll();
        // Extract similar queries that contain the parentQuery in their queryKey
        const similarQueries = allActiveQueries
          .filter((query: Query) => query.queryKey[0].includes(parentQuery))
          .map((query: Query) => {
            return {
              queryKey: query.queryKey[0],
              type: "active",
            };
          });
        // Invalidate and refetch for all similar queries
        /*         await Promise.all(
          similarQueries.map(async (query) => {
            await queryClient.refetchQueries(query);
          })
        );
 */ await queryClient.refetchQueries(similarQueries[0]);
        return { data };
      },
    }
  );
};
