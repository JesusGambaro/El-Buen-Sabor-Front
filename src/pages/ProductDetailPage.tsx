import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Stat,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useCart";
import { useProduct } from "@hooks/useProducts";
import useCatalogueStore from "@store/catalogueStore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "Types/types";
const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { filter, setFilter } = useCatalogueStore();
  const [currentFilter, setCurrentFilter] = useState(filter);
  type QueryProps = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };
  const {
    data: products,
    error: isError,
    isLoading,
  } = useApiQuery("GET|getLanding", {
    id: Number(id),
    nombre_like: undefined,
    id_categoria: undefined,
  }) as QueryProps;
  useEffect(() => {
   
    setFilter({
      id: Number(id),
      nombre_like: undefined,
      id_categoria: undefined,
    });
  }, []);
  const handleSetFilter = () => {
    
    setFilter({ ...currentFilter,id: undefined });
  };
  if (isError) {
    throw isError;
  }
  if (isLoading) {
    return <Loader />;
  }
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
      <SimpleGrid w="100%" columns={2} spacing={10} templateColumns="1fr 5fr">
        <Button
          colorScheme="orange"
          as={Link}
          to="/catálogo"
          onClick={() => {
            handleSetFilter();
          }}
        >
          <ChevronLeftIcon />
          Volver a Home
        </Button>
        <Heading as="h1" size="xl" textAlign="center">
          {products && products[0].nombre}
        </Heading>
      </SimpleGrid>
      <Grid
        templateColumns="1fr 1fr"
        gap={6}
        mt="2rem"
        alignItems="center"
        justifyContent="center"
        h="90%"
      >
        <Box w="100%" display="flex" justifyContent="center">
          <Image
            src={products && products[0].imagen}
            alt={products && products[0].nombre}
            w="20rem"
            borderRadius="md"
          />
        </Box>
        <Stack spacing={3}>
          <Heading as="h2" size="lg">
            Descripción
          </Heading>
          <Text>
            {(products && products[0].descripcion) ||
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo dolores veritatis ipsa officiis consectetur libero facere aperiam vitae earum vero amet tenetur, fugit ullam nam dolore. Doloribus odit officia molestiae."}
          </Text>
          <Heading as="h2" size="lg">
            Precio
          </Heading>
          <Stat>
            <StatNumber fontSize="1.4rem">
              ${products && products[0].precio}
            </StatNumber>
          </Stat>
          <Button colorScheme="orange" size="lg" w="50%">
            Agregar al carrito
          </Button>
        </Stack>
        {/* <Stack spacing={3}>
          <Heading as="h2" size="lg">
            Receta
          </Heading>
          <Text>
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            culpa cum nulla autem. Nobis neque eveniet sapiente quam deserunt,
            quas laborum tempora iste facilis eligendi id quia temporibus quod
            quasi."
          </Text>
          <Heading as="h2" size="lg">
            Ingredientes
          </Heading>
          <Text>"Lorem ipsum dolor sit amet consectetur"</Text>
          <Heading as="h2" size="lg">
            Preparación
          </Heading>
          <Text>"Lorem ipsum dolor sit amet consectetur"</Text>
        </Stack> */}
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
