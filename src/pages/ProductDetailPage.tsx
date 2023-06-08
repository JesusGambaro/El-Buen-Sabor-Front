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
import { Title } from "@mantine/core";
import useCatalogueStore from "@store/catalogueStore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "Types/types";
const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { filter, setFilter } = useCatalogueStore();
  const [currentFilter, setCurrentFilter] = useState(filter);
  const [currentProduct, setCurrentProduct] = useState({} as Product);
  type QueryProps = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };

  const {
    data: products,
    error: isError,
    isLoading,
  } = useApiQuery("GET|producto", null) as QueryProps;

  console.log("Detail: ", id);
  setTimeout(() => {
    console.log("Detail productos: ", products);
  }, 5000);
  useEffect(() => {
    setFilter({
      id: Number(id),
      nombre_like: undefined,
      id_categoria: undefined,
    });
  }, []);
  useEffect(() => {
    let _currentProduct;
    let _id: Number = -1;
    if (id) {
      _id = parseFloat(id);
    }
    _currentProduct = products?.find((e) => {
      return e.id == _id;
    });

    if (_currentProduct) {
      setCurrentProduct(_currentProduct);
    }
  }, [products]);
  const handleSetFilter = () => {
    setFilter({ ...currentFilter, id: undefined });
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
      </SimpleGrid>
      <Grid
        templateColumns="1fr 1fr"
        gap={6}
        mt="2rem"
        alignItems="center"
        justifyContent="center"
        h="90%"
      >
        {id && currentProduct ? (
          <>
            <Heading as="h1" size="xl" textAlign="center">
              {currentProduct.nombre}
            </Heading>
            <Box w="100%" display="flex" justifyContent="center">
              <Image
                src={currentProduct.imgURL}
                alt={currentProduct.nombre}
                w="20rem"
                borderRadius="md"
              />
            </Box>
            <Stack spacing={3}>
              <Heading as="h2" size="lg">
                Descripción
              </Heading>
              <Text>
                {currentProduct.descripcion}
              </Text>
              <Heading as="h2" size="lg">
                Precio
              </Heading>
              <Stat>
                <StatNumber fontSize="1.4rem">
                  $9999
                </StatNumber>
              </Stat>
              <Button colorScheme="orange" size="lg" w="50%">
                Agregar al carrito
              </Button>
            </Stack>
            <Stack spacing={3}>
              <Heading as="h2" size="lg">
                Receta
              </Heading>
              <Text>
                {currentProduct.receta}
              </Text>
            </Stack>
            {/* 
          <Heading as="h2" size="lg">
            Ingredientes
          </Heading>
          <Text>"Lorem ipsum dolor sit amet consectetur"</Text>
          <Heading as="h2" size="lg">
            Preparación
          </Heading>
          <Text>"Lorem ipsum dolor sit amet consectetur"</Text>
        </Stack> */}
          </>
        ) : (
          <Title>No se encontro el producto</Title>
        )}
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
