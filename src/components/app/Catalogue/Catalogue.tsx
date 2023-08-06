import {
  SimpleGrid,
  Container,
  Stack,
  Box,
  Flex,
  Title,
  useMantineColorScheme,
  createStyles,
} from "@mantine/core";
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
  
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  
  const useStyles = createStyles((theme) => ({
    text: {
      color: dark ? "white" : "black",
    },
  }));
  const { classes } = useStyles();
  return (
    <Flex
      maw="container.2xl"
      miw={"100vh"}
      display="flex"
      direction="column"
      c="start"
      align="center"
      bg={dark ? "#3e3e3e" : "#e6e6e6"}
      p={"1rem"}
      mih="100vh"
    >
      <Title className={classes.text} order={1} mb="2rem">
        El Buen Sabor
      </Title>
      <Stack spacing={3} w="100%" dir={"column"}>
        <Title className={classes.text} order={1} mb="2rem">
          Catálogo
        </Title>

        <Flex gap={"0rem 2rem"} w={"100%"}  direction={"row"} justify={"flex-start"}>
          <CatalogueLeftFilters
            currentIdCategoria={filter.id_categoria}
            handleSetFilter={handleSetFilter}
          />
          <CatalogueProductsContainer/>
        </Flex>
      </Stack>
    </Flex>
  );
};
export default Catalogue;
