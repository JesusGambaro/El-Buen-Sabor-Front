import {
  SimpleGrid,
  Heading,
  Container,
  Stack,
  Box,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./catalogue.scss";
import CatalogueLeftFilters from "./CatalogueLeftFilters";

import CatalogueProductsContainer from "./CatalogueProductsContainer";
import useCatalogueStore from "@store/catalogueStore";
const Catalogue = () => {
  //const { data: categories } = useCategories();
  const { filter, setFilter } = useCatalogueStore();
  let handleSetFilter = (id_categoria?: number, nombre_like?: string) => {
    setFilter({
      ...filter,
      id_categoria,
      nombre_like,
    });
  };
  
  //--Temploral
  // let filter = { id_categoria: 0 };
  // let handleSetFilter = () => {
  //   return;
  // };
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
