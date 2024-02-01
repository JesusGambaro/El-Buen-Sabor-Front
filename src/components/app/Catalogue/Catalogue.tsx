import {
  SimpleGrid,
  Container,
  Stack,
  Box,
  Flex,
  Title,
  useMantineColorScheme,
  createStyles,
  Text,
} from "@mantine/core";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./catalogue.scss";
import CatalogueLeftFilters from "./CatalogueLeftFilters";

import CatalogueProductsContainer from "./CatalogueProductsContainer";
import useCatalogueStore from "@store/catalogueStore";
import { useDisclosure } from "@mantine/hooks";
import useMainStore from "@store/mainStore";
const Catalogue = () => {
  //const { data: categories } = useCategories();
  const { filter, setFilter } = useCatalogueStore();
  const { isMobile } = useMainStore();

  let handleSetFilter = (
    precioMin: number,
    precioMax: number,
    descuento: boolean,
    id_categoria?: number | null,
    nombre_like?: string | null
  ) => {
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
  const [opened, { open, close }] = useDisclosure(isMobile ? false : true);
  return (
    <Flex
      miw={"100%"}
      display="flex"
      direction="column"
      c="start"
      align="center"
      bg={dark ? "#3e3e3e" : "#e6e6e6"}
      pl={20}
      mih="100vh"
    >
      <Title w={"100%"} className={classes.text} order={1} mb="2rem">
        Catálogo
      </Title>
      <Flex w={"100%"} align={"flex-start"}>
        <Title
          w={"min-content"}
          underline
          style={{ cursor: "pointer" }}
          order={2}
          className={classes.text}
          onClick={() => {
            if (!isMobile) return;
            if (opened) {
              close();
            } else {
              open();
            }
          }}
        >
          Filtros
        </Title>
        <Text color="orange">
          <i className="fa-solid fa-dollar-sign"></i>
        </Text>
      </Flex>

      <Flex
        gap={"0rem 2rem"}
        w={"100%"}
        direction={"row"}
        justify={"flex-start"}
        pos={"relative"}
        pb={"3rem"}
      >
        <CatalogueLeftFilters
          currentIdCategoria={filter.id_categoria}
          handleSetFilter={handleSetFilter}
          opened={opened}
        />
        <CatalogueProductsContainer />
      </Flex>
    </Flex>
  );
};
export default Catalogue;
