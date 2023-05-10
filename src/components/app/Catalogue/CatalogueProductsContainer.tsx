import React from "react";
import { Flex } from "@chakra-ui/react";
import { Product } from "Types/types";
import { LandingCard } from "../Landing/Cards/LandingProductCard";
import { useApiQuery } from "@hooks/useCart";
import { getLandingFiltered } from "@api/elbuensabor";
import Loader from "../Loader/Loader";
type Props = {
  filter: any;
};
const CatalogueProductsContainer = (props: Props) => {
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
    "getLandingFiltered",
    getLandingFiltered,
    props.filter
  ) as QueryProps;
  console.log(products);

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
