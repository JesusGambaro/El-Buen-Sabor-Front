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
import { useDisclosure } from "@mantine/hooks";
const Catalogue = () => {
  //const { data: categories } = useCategories();
  const { filter, setFilter } = useCatalogueStore();
  let handleSetFilter = (precioMin: number,precioMax: number,descuento: boolean,id_categoria?: number | null, nombre_like?: string | null,) => {
    setFilter({
      ...filter,
      precioMin,
      precioMax,
      descuento,
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
  const [opened, { open, close }] = useDisclosure(true);
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
      <Stack spacing={3} w="100%" dir={"column"}>
        <Title className={classes.text} order={1} mb="2rem">
          Catálogo
        </Title>
        <Title
          w={"min-content"}
          underline
          style={{ cursor: "pointer" }}
          order={2}
          className={classes.text}
          onClick={!opened ? open : close}
        >
          Filtros
        </Title>
        <Flex
          gap={"0rem 2rem"}
          w={"100%"}
          direction={"row"}
          justify={"flex-start"}
          pos={"relative"}
          style={{zIndex:999}}
        >
          <CatalogueLeftFilters
            currentIdCategoria={filter.id_categoria}
            handleSetFilter={handleSetFilter}
            opened={opened}
          />
          <CatalogueProductsContainer />
        </Flex>
      </Stack>
    </Flex>
  );
};
export default Catalogue;
