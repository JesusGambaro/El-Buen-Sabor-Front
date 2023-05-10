import {
  SimpleGrid,
  Heading,
  Container,
  Stack,
  Box,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import {
  getLandingFiltered
} from "@api/elbuensabor";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./catalogue.scss";
import Loader from "@app/Loader/Loader";
import { LandingCard } from "../Landing/Cards/LandingProductCard";
import { CategoryCard } from "../Landing/Cards/CategoryCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useProducts } from "@hooks/useProducts";
import { useCategories } from "@hooks/useCategories";
import CatalogueLeftFilters from "./CatalogueLeftFilters";
import { Product } from "Types/types";
import useCatalogueStore from "@store/catalogueStore";
import { useState } from "react";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
const Catalogue = () => {
  const { data: categories } = useCategories();
  const { filter, setFilter } = useCatalogueStore();
  const [query, setQuery] = useState(filter);
  type QueryProps = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };
  const {
    data: products,
    error,
    isLoading, 
  } = useApiQuery("getLandingFiltered", getLandingFiltered, filter) as QueryProps;
  let setIdCategoria = (_id_categoria: number) => {
    setQuery({ ...query, id_categoria: _id_categoria });
  };
  return (
    <Container
      maxW="container.2xl"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      bg="#f9f6f6"
    >
      <Heading as="h1" size="xl" mb="2rem">
        El Buen Sabor
      </Heading>
      <Stack spacing={3} w="100%" flexDirection={"column"}>
        <Heading as="h2" size="lg" mb="1rem">
          Catálogo
        </Heading>

        <Box>
          {isLoading ? (
            <Loader />
          ) : (
            <Flex gap={"0rem 2rem"} justifyContent={"flex-start"}>
              <CatalogueLeftFilters setIdCategoria={setIdCategoria} />
              <Flex flexGrow={1} gap={"2rem"} flexWrap={"wrap"}>
                {products?.map((product: Product) => (
                  <LandingCard
                    key={"landing-card-" + product.id_producto}
                    product={product}
                  />
                ))}
              </Flex>
            </Flex>
          )}
        </Box>
      </Stack>
    </Container>
  );
};
export default Catalogue;
