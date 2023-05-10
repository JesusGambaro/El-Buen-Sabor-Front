import { getCategories } from "@api/elbuensabor";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Text,
} from "@chakra-ui/react";
import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useCart";
import useAdminStore from "@store/adminStore";
import { Category } from "Types/types";

type NestedAccordionProps = {
  categories: Category[];
  isRecursive: boolean;
};

const SideFilter = () => {
  const { data: baseCategories, isLoading } = useApiQuery("GET/categorias") as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };

  const { filter, setFilter } = useAdminStore();

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
            <AccordionItem key={category.id} border="none">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
                width="100%"
                bg={filter.id === category.id ? "orange.200" : "white"}
              >
                <Text
                  fontSize="md"
                  fontWeight={hasChildren ? "bold" : "normal"}
                  onClick={() => {
                    setFilter({ ...filter, id: category.id });
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
    <Container
      maxW="container.md"
      p={4}
      borderRadius="md"
      maxWidth={["100%", "100%", "100%", "100%", "20%"]}
    >
      <NestedAccordion categories={baseCategories} isRecursive={false} />
    </Container>
  );
};

export default SideFilter;
