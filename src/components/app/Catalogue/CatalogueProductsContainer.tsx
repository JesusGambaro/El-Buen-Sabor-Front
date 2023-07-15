import React, { useEffect } from "react";
import { Flex } from "@mantine/core";
import { Product } from "types/types";
import { LandingCard } from "../Landing/Cards/LandingProductCard";
import Loader from "../Loader/Loader";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";

const CatalogueProductsContainer = () => {
  const { filter, setFilter, setProductos, productos } = useCatalogueStore();
  type QueryProps = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };
  const { data: products, error, isLoading } = useApiQuery(
    "GET|producto/search" + `?${filter.id_categoria ? `id=${filter.id_categoria}&` : ""}${filter.nombre_like ? "nombre=" + filter.nombre_like : ""}`,
    null
  ) as QueryProps;
  // let products: Product[] = [];
  // let isLoading: boolean = false;

  useEffect(() => {
    if (products) {
      setProductos(products)
    }
  }, [products]);

  return isLoading ? (
    <Loader />
  ) : (
    <Flex style={{flexGrow:1,flexWrap:"wrap"}} gap={"2rem"}>
      {productos?.map((product: Product) => (
        <LandingCard key={"landing-card-" + product.id} product={product} />
      ))}
    </Flex>
  );
};

export default CatalogueProductsContainer;
