import { notifications } from "@mantine/notifications";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  },
  queryCache: new QueryCache({
    onError: (err: any) => {
      console.log("err", err);

      notifications.show({
        title: err.message,
        message: err.response?.data?.message ?? err.message,
        color: "red",
        radius: "sm",
        withBorder: true,
      });
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: () => {
      notifications.show({
        title: "Operación exitosa",
        message: "La operación se realizó con éxito",
        color: "green",
        radius: "sm",
        withBorder: true,
      });
    },

    onError: (err: any) => {
      console.log("err", err);

      notifications.show({
        title: err.message,
        message: err.response?.data?.message ?? err.message,
        color: "red",
        radius: "sm",
        withBorder: true,
      });
    },
  }),
});
