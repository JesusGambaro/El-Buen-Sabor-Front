import React, { useEffect } from "react";
import {
  Alert,
  Container,
  Flex,
  SimpleGrid,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { Product } from "types/types";
import { LandingCard } from "../Landing/Cards/LandingProductCard";
import Loader from "../Loader/Loader";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { AlertCircle } from "tabler-icons-react";

const CatalogueProductsContainer = () => {
  const { filter, setFilter, setProductos, productos } = useCatalogueStore();
  type QueryProps = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };
  const {
    data: products,
    error,
    isLoading,
  } = useApiQuery(
    "GET|producto/search" +
      `?${filter.id_categoria ? `id=${filter.id_categoria}&` : ""}${
        filter.nombre_like ? "nombre=" + filter.nombre_like : ""
      }`,
    null
  ) as QueryProps;
  // let products: Product[] = [];
  // let isLoading: boolean = false;

  useEffect(() => {
    if (products) {
      setProductos(products);
    }
  }, [products]);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return isLoading ? (
    <Loader />
  ) : (
    <Flex
      wrap={"wrap"}
      gap={"2rem"}
      h={"50vh"}
      justify={"start"}
      align={"top"}
      style={{ transition: "1s ease all" }}
    >
      {productos?.length ? (
        <>
          {productos.map((product: Product) => (
            <LandingCard
              key={"landing-card-" + product.id}
              product={product}
              isThemeBlack={dark}
            />
          ))}
        </>
      ) : (
        <Flex
          w={"100%"}
          bg={"orange"}
          sx={{ borderRadius: "20px" }}
          h={"5rem"}
          justify={"center"}
          align={"center"}
          p={"1rem"}
          gap={"1rem"}
          direction={"column"}
        >
          <Flex
            h={"4rem"}
            w={"100%"}
            gap={"1rem"}
            justify={"flex-start"}
            align={"center"}
          >
            <AlertCircle color="white"></AlertCircle>
            <Title color="white" order={3} weight={500}>
              Lo sentimos
            </Title>
          </Flex>
          <Title color="white" order={4} weight={500}>
            No se encontraron productos
          </Title>
        </Flex>
      )}
    </Flex>
  );
};

export default CatalogueProductsContainer;
