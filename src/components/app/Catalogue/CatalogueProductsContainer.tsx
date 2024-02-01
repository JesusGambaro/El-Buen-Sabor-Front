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
import { Producto } from "types/types";
import { LandingCard } from "../Landing/Cards/LandingProductCard";
import Loader from "../Loader/Loader";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { AlertCircle } from "tabler-icons-react";
import useMainStore from "@store/mainStore";

const CatalogueProductsContainer = () => {
  const { filter, setFilter, setProductos, productos } = useCatalogueStore();
  type QueryProps = {
    data: Producto[];
    error: any;
    isLoading: boolean;
  };
  const {
    data: products,
    error,
    isLoading,
  } = useApiQuery(
    "GET|producto/search" +
      `?idCategoria=${filter.id_categoria ? filter.id_categoria : ""}&` +
      `nombre=${filter.nombre_like ? filter.nombre_like : ""}&` +
      `precioMin=${filter.precioMin}&` +
      `precioMax=${filter.precioMax}&` +
      `descuento=${filter.descuento}`,
    null
  ) as QueryProps;
  // let products: Producto[] = [];
  // let isLoading: boolean = false;

  useEffect(() => {
    if (products) {
      setProductos(products);
    }
  }, [products]);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { isMobile } = useMainStore();
  return isLoading ? (
    <Loader />
  ) : (
    <Flex
      wrap={"wrap"}
      gap={"2rem"}
      justify={isMobile ? "center" : "start"}
      align={"top"}
      style={{ transition: "1s ease all" }}
      pos={"relative"}
      w={"100%"}
    >
      {productos?.length ? (
        <>
          {productos.map((product: Producto) => (
            <LandingCard
              key={"landing-card-" + product.id}
              product={product}
              isThemeBlack={dark}
            />
          ))}
          {productos.map((product: Producto) => (
            <LandingCard
              key={"landing-card-" + product.id}
              product={product}
              isThemeBlack={dark}
            />
          ))}
          {productos.map((product: Producto) => (
            <LandingCard
              key={"landing-card-" + product.id}
              product={product}
              isThemeBlack={dark}
            />
          ))}
        </>
      ) : (
        <Flex
          w={"20rem"}
          sx={{ borderRadius: "20px" }}
          justify={"center"}
          align={"flex-start"}
          p={"1rem"}
          gap={"1rem"}
          direction={"column"}
          h={"6rem"}
        >
          <Flex
            h={"100%"}
            w={"100%"}
            gap={"1rem"}
            justify={"flex-start"}
            align={"center"}
          >
            <AlertCircle color={dark ? "white" : "black"}></AlertCircle>
            <Title color={dark ? "white" : "black"} order={3} weight={500}>
              Lo sentimos
            </Title>
          </Flex>
          <Title color={dark ? "white" : "black"} order={4} weight={500}>
            No se encontraron productos
          </Title>
        </Flex>
      )}
    </Flex>
  );
};

export default CatalogueProductsContainer;
