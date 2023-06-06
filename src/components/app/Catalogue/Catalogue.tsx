import {
  SimpleGrid,
  Heading,
  Container,
  Stack,
  Box,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { getLandingFiltered, getCategories } from "@api/elbuensabor";
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
import { Product, Category } from "Types/types";
import useCatalogueStore from "@store/catalogueStore";
import { useState } from "react";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
import CatalogueProductsContainer from "./CatalogueProductsContainer";
const Catalogue = () => {
  //const { data: categories } = useCategories();
  //const { filter, setFilter } = useCatalogueStore();

  // let handleSetFilter = (_id_categoria?: number, _nombre_like?: string) => {
  //   setFilter({
  //     ...filter,
  //     id_categoria: _id_categoria,
  //     nombre_like: _nombre_like,
  //   });
  // };
  
  //--Temploral
  let filter = { id_categoria: 0 };
  let handleSetFilter = () => {
    return;
  };
  //--
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
          <Flex gap={"0rem 2rem"} justifyContent={"flex-start"}>
            <CatalogueLeftFilters
              currentIdCategoria={filter.id_categoria}
              handleSetFilter={handleSetFilter}
            />
            <CatalogueProductsContainer></CatalogueProductsContainer>
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
};
export default Catalogue;
