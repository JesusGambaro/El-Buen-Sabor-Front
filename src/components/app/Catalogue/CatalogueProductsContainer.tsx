import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
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
  const { data:products, error, isLoading } = useApiQuery(
    "GET|producto",
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
    <Flex flexGrow={1} gap={"2rem"} flexWrap={"wrap"}>
      {products?.map((product: Product) => (
        <LandingCard key={"landing-card-" + product.id} product={product} />
      ))}
    </Flex>
  );
};

export default CatalogueProductsContainer;
