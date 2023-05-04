import { getCategories } from "@api/elbuensabor";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
} from "@chakra-ui/react";
import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useCart";
import { Category } from "Types/types";
import React from "react";

type Props = {};

const SideFilter = (props: Props) => {
  const {
    data: categories,
    error,
    isLoading,
  } = useApiQuery("categories", getCategories) as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };
  if (isLoading) return <Loader />;
  return (
    <Container
      maxW="container.md"
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      w="20%"
    >
      <NestedAccordion categories={categories} parent={-1} />
    </Container>
  );
};

type NestedAccordionProps = {
  categories: Category[];
  parent: number;
};

const NestedAccordion = ({ categories, parent }: NestedAccordionProps) => {
  console.log(categories);
  const subcategories = categories.filter(
    (category) => category.categoria_padre === parent
  );
  console.log("subcategories", subcategories);
  if (subcategories.length === 0) return null;
  return (
    <Accordion allowMultiple>
      {subcategories.map((category) => {
        return (
          <AccordionItem key={category.id} border="none">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {category.nombre}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <NestedAccordion
                categories={categories}
                parent={category.id as number}
              />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
export default SideFilter;
