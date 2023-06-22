
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Text,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { InputBase, RangeSlider, Title, Input } from "@mantine/core";
import { Category } from "types/types";
import { useEffect, useState } from "react";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";

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
  const {
    data: baseCategories,
    error,
    isLoading,
  } = useApiQuery("GET|categoria/all", null) as QueryProps;
  //console.log(baseCategories);
  //let baseCategories: Category[] = [];
  const [currentCategoriaName, setCurrentCategoriaName] = useState("");
  const [minMaxPrice, setMinMaxPrice] = useState({
    min: 0,
    max: 10000,
  });
  const NestedAccordion = ({
    categories,
    isRecursive,
  }: NestedAccordionProps) => {
    //console.log(categories.length);

    return (
      <>
        {categories?.length ? (
          <Accordion allowMultiple>
            {categories?.map((category) => {
              if (!isRecursive && category.categoriaPadre) return null;
              const subcategories = baseCategories.filter(
                (subCategory) => subCategory.categoriaPadre?.id === category.id
              );
              const hasChildren = subcategories.length > 0;
              return (
                <AccordionItem
                  key={category.id + Math.random() * 100}
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
                        props.handleSetFilter(category.id);
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
        ) : (
          <Text>No hay categorias</Text>
        )}
      </>
    );
  };
  return (
    <Container margin={0} borderRadius="md" minW={"15rem"} maxWidth={"20rem"}>
      {/* <Flex marginBottom={"1rem"}>
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
                  return c.id == props.currentIdCategoria;
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
      </Flex> */}

      <Flex gap={"1rem"} className="ofertaFilter">
        <Title order={3}>En Oferta</Title>
        <Checkbox colorScheme="orange" defaultChecked />
      </Flex>
      <br></br>
      <Flex flexDir={"column"} gap={".5rem"}>
        <Title order={3}>Filtro por precio min-max</Title>
        <Flex gap={"1rem"}>
          <Input
            value={minMaxPrice.min}
            onChange={(e) => {
              let _min = parseFloat(e.target.value);
              if (_min >= 0 && minMaxPrice.max - _min >= 1000) {
                setMinMaxPrice({ ...minMaxPrice, min: _min });
              }
            }}
          />
          <Input
            value={minMaxPrice.max}
            onChange={(e) => {
              let _max = parseFloat(e.target.value);
              if (_max >= 0 && _max - minMaxPrice.min >= 1000) {
                setMinMaxPrice({ ...minMaxPrice, max: _max });
              }
            }}
          />
        </Flex>
        <RangeSlider
          color="orange"
          size="lg"
          min={0}
          max={10000}
          defaultValue={[0, 10000]}
          value={[minMaxPrice.min, minMaxPrice.max]}
          label={null}
          minRange={1000}
          onChange={(e: any) => {
            //console.log(e[0], e[1]);
            setMinMaxPrice({ ...minMaxPrice, min: e[0], max: e[1] });
          }}
        />
      </Flex>
      <br></br>
      <Flex flexDir={"column"} gap={".5rem"}>
        <Title order={3}>Categorias</Title>
        <NestedAccordion categories={baseCategories} isRecursive={false} />
      </Flex>
    </Container>
  );
};
export default CatalogueLeftFilters;
