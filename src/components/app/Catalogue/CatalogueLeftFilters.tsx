import { getCategories } from "@api/elbuensabor";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Container,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { RangeSlider, Title } from "@mantine/core";
import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
import useAdminStore from "@store/adminStore";
import useCatalogueStore from "@store/catalogueStore";
import { Category } from "Types/types";
import { useEffect, useState } from "react";

type Props = {
  handleSetFilter: (_id_categoria?: number, _nombre_like?: string) => void;
  currentIdCategoria?: number;
};
type NestedAccordionProps = {
  categories: Category[];
  isRecursive: boolean;
};
type QueryProps = {
  data: Category[];
  error: any;
  isLoading: boolean;
};

const CatalogueLeftFilters = (props: Props) => {
  const { filter, setFilter } = useAdminStore();
  const {
    data: baseCategories,
    error,
    isLoading,
  } = useApiQuery("GET|categorias", filter) as QueryProps;
  const [currentCategoriaName, setCurrentCategoriaName] = useState("");

  const NestedAccordion = ({
    categories,
    isRecursive,
  }: NestedAccordionProps) => {
    return (
      <Accordion marginTop="1rem" allowMultiple>
        {categories?.map((category) => {
          if (!isRecursive && category.categoria_padre !== -1) return null;
          const subcategories = baseCategories.filter(
            (subCategory) =>
              subCategory.categoria_padre === category.id_categoria
          );
          const hasChildren = subcategories.length > 0;
          return (
            <AccordionItem
              key={category.id_categoria + Math.random() * 100}
              border="none"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
                width="100%"
                _hover={{
                  background: "orange",
                  color: "white",
                }}
                borderRadius="15px"
              >
                <Text
                  fontSize="md"
                  fontWeight={hasChildren ? "bold" : "normal"}
                  textDecorationColor="orange.500"
                  _hover={{
                    textDecoration: "underline",
                    textDecorationColor: "orange.500",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    props.handleSetFilter(category.id_categoria);
                    setCurrentCategoriaName(category.nombre);
                  }}
                >
                  {category.nombre}
                </Text>
                <AccordionButton
                  width="10%"
                  justifyContent="center"
                  visibility={hasChildren ? "visible" : "hidden"}
                >
                  <AccordionIcon />
                </AccordionButton>
              </Box>
              {hasChildren && (
                <AccordionPanel p={1} pr={0}>
                  <NestedAccordion
                    categories={subcategories}
                    isRecursive={true}
                  />
                </AccordionPanel>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };
  return (
    <Container margin={0} borderRadius="md" minW={"15rem"} maxWidth={"20rem"}>
      <Flex marginBottom={"1rem"}>
        {props.currentIdCategoria && (
          <Box
            color={"white"}
            background={"orange"}
            padding={"0.5rem 0.7rem"}
            minW={"10rem"}
            borderRadius={"20px"}
          >
            <Flex
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"1rem"}
            >
              {
                baseCategories.find((c) => {
                  return c.id_categoria == props.currentIdCategoria;
                })?.nombre
              }
              <Button
                w={"1rem"}
                borderRadius={"50%"}
                colorScheme="orange"
                onClick={() => {
                  props.handleSetFilter(undefined);
                }}
              >
                X
              </Button>
            </Flex>
          </Box>
        )}
      </Flex>
      <Title order={3}>Filtro por precio min-max</Title>
      <br></br>
      <RangeSlider
        color="orange"
        size="lg"
        min={0}
        max={10000}
        defaultValue={[0, 10000]}
        label={(value: number) => {
          return `$${value}`;
        }}
        onChange={(e: any) => {
          console.log(e[0], e[1]);
        }}
      />
      <NestedAccordion categories={baseCategories} isRecursive={false} />
    </Container>
  );
};
export default CatalogueLeftFilters;
