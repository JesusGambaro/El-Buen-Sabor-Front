import { CloseIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Divider,
  Text,
} from "@chakra-ui/react";
import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useQueries";
import useAdminStore from "@store/adminStore";
import { Category } from "types/types";
type NestedAccordionProps = {
  categories: Category[];
  isRecursive: boolean;
};

const SideFilter = () => {
  const { categoriaFilter, setFilter } = useAdminStore();

  const { data: baseCategories, isLoading } = useApiQuery(
    "GET|categoria/allWOPage"
  ) as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };

  const NestedAccordion = ({
    categories,
    isRecursive,
  }: NestedAccordionProps) => {
    return (
      <Accordion allowMultiple>
        {categories.map((category) => {
          const hasChildren = category.subCategoria
            ? category.subCategoria.length > 0
            : false;
          const subcategories = category.subCategoria
            ? category.subCategoria
            : [];
          if (!hasChildren) return;
          return (
            <AccordionItem key={category.id} border="none">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                width="100%"
                bg={
                  categoriaFilter.id === category.id
                    ? "orange.500"
                    : "transparent"
                }
                color={categoriaFilter.id === category.id ? "white" : "black"}
                borderRadius="md"
              >
                <Text
                  fontSize="md"
                  fontWeight={hasChildren ? "bold" : "normal"}
                  onClick={() => {
                    setFilter(
                      { ...categoriaFilter, id: category.id },
                      "categoriaFilter"
                    );
                  }}
                  minH={8}
                  alignItems="center"
                  display="flex"
                  textDecorationColor="orange"
                  _hover={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    textDecorationColor: "orange",
                  }}
                >
                  {category.nombre}
                </Text>
                <AccordionButton
                  width="10%"
                  justifyContent="center"
                  visibility={hasChildren ? "visible" : "hidden"}
                >
                  {categoriaFilter.id === category.id ? (
                    <CloseIcon
                      onClick={() => {
                        setFilter(
                          { ...categoriaFilter, id: NaN },
                          "categoriaFilter"
                        );
                      }}
                    />
                  ) : (
                    !hasChildren && <AccordionIcon />
                  )}
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
              {categoriaFilter.id !== category.id && <Divider />}
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
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Categorías
      </Text>
      {isLoading && <Loader />}
      {baseCategories ? (
        <NestedAccordion categories={baseCategories} isRecursive={false} />
      ) : (
        <Text fontSize="md" fontWeight="bold" mb={4}>
          No hay categorías
        </Text>
      )}
    </Container>
  );
};

export default SideFilter;
