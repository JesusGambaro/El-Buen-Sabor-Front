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
import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
import { Category } from "Types/types";

type Props = {
  setIdCategoria: (_id_categoria?: number) => void;
};
type NestedAccordionProps = {
  categories: Category[];
  isRecursive: boolean;
};

const CatalogueLeftFilters = (props: Props) => {
  const {
    data: baseCategories,
    error,
    isLoading,
  } = useApiQuery("categories", getCategories) as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };

  if (isLoading) return <Loader />;

  const NestedAccordion = ({
    categories,
    isRecursive,
  }: NestedAccordionProps) => {
    return (
      <Accordion allowMultiple>
        {categories.map((category) => {
          if (!isRecursive && category.categoria_padre !== -1) return null;
          const subcategories = baseCategories.filter(
            (subCategory) => subCategory.categoria_padre === category.id
          );
          const hasChildren = subcategories.length > 0;
          return (
            <AccordionItem
              
              key={category.id}
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
                  props.setIdCategoria(category.id);
                }}
                >
                  {category.nombre}
                </Text>
                <AccordionButton
                  onClick={(e) => {
                    console.log("click");
                  }}
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
    <Container  margin={0} borderRadius="md" minW={"15rem"} maxWidth={"20rem"}>
      <Flex marginBottom={"1rem"} >
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
            Acompañamientos
            <Button w={"1rem"} borderRadius={"50%"} colorScheme="orange">
              X
            </Button>
          </Flex>
        </Box>
      </Flex>
      <NestedAccordion categories={baseCategories} isRecursive={false} />
    </Container>
  );
};
export default CatalogueLeftFilters;
