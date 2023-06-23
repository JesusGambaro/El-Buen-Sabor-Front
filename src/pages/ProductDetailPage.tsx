import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Mark,
  Modal,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { useProduct } from "@hooks/useProducts";
import { Title } from "@mantine/core";
import useCatalogueStore from "@store/catalogueStore";
import { useEffect, useState } from "react";
import { useParams, Link, redirect } from "react-router-dom";
import { Product } from "types/types";
import { useMediaQuery } from "@mantine/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import useMainStore from "@store/mainStore";

const ProductDetailPage = () => {
  const toast = useToast();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { setCarrito } = useMainStore();
  const { mutate: editCart, data } = useApiMutation("PUT|cart/addProduct");
  const addToCartHandler = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    try {
      await addToCart();
      toast({
        title: "Producto agregado al carrito",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        description: `${currentProduct.nombre} se ha agregado al carrito`,
      });
    } catch (error) {}
  };
  const addToCart = async () => {
    //updateCart({ ...item, quantity: item.quantity + 1 });
    await editCart({ id: currentProduct.id });
  };
  useEffect(() => {
    //console.log("cartEdited", data);
    if (data) {
      setCarrito(data);
    }
  }, [data]);
  const { id } = useParams<{ id: string }>();
  const { filter, setFilter } = useCatalogueStore();
  const [currentFilter, setCurrentFilter] = useState(filter);
  type QueryProps = {
    data: Product;
    error: any;
    isLoading: boolean;
  };
  let isError = false;
  let idproducto = id ? id : -1;
  const {
    data: currentProduct,
    error,
    isLoading,
  } = useApiQuery("GET|producto/" + idproducto, null) as QueryProps;

  // const {
  //   data: p,
  //   error: isError,
  //   isLoading,
  // } = useApiQuery("GET|producto/"+id, null) as QueryProps;
  // useEffect(() => {
  //   if (p) {
  //     setCurrentProduct(currentProduct);
  //   }
  // }, [p])

  if (isError) {
    throw isError;
  }
  if (isLoading) {
    return <Loader />;
  }
  //let mobile = useMediaQuery(`(max-width: 700px)`) ? true : false;
  return (
    <Container
      maxW="container.2xl"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      bg="#f9f6f6"
      p={"0"}
      gap={"1rem"}
    >
      <Flex w="100%">
        <Button
          colorScheme="orange"
          as={Link}
          to="/catálogo"
          h={"3rem"}
          w={"15rem"}
        >
          <ChevronLeftIcon />
          Volver al catálogo
        </Button>
      </Flex>
      <Heading p={"1rem"} w={"100%"} as="h1" size="1rem" textAlign="left">
        Detalle del producto
      </Heading>
      {id && currentProduct ? (
        <Flex
          flexDir={"column"}
          w="100%"
          align={"center"}
          justifyContent={"center"}
          gap={"1rem"}
          flexWrap={"wrap"}
        >
          <Flex
            gap={"5rem 5rem"}
            width={"90%"}
            justifyContent={"center"}
            align={"center"}
            flexWrap={"wrap"}
          >
            <Heading w={"20rem"} as="h1" size="2rem" textAlign="start">
              {currentProduct.nombre}
            </Heading>
            <Flex w={"20rem"}>
              <Box
                boxSize={"15rem"}
                bg={"orange.500"}
                borderRadius={"50%"}
                alignItems={"center"}
                display="flex"
                justifyContent="center"
                order={0}
                position={"relative"}
              >
                <Image
                  src={currentProduct.imgURL}
                  alt={currentProduct.nombre}
                  w={"13rem"}
                  objectFit={"cover"}
                  borderRadius="50%"
                  overflow={"hidden"}
                />
              </Box>
            </Flex>
          </Flex>
          {/* <Box
            width={"90%"}
            height={".3rem"}
            color={"transparent"}
            background="#FB9300"
          >
            -
          </Box> */}
          <Flex
            gap={"3rem 5rem"}
            width={"90%"}
            align={"center"}
            justifyContent={"center"}
            flexWrap={"wrap"}
          >
            <Stack
              h={"30rem"}
              w={"20rem"}
              spacing={3}
              justifyContent={"flex-start"}
              boxSize={"20rem"}
            >
              <Heading as="h2" size="lg">
                Descripción
              </Heading>
              <Text fontSize={"1.3rem"}>{currentProduct.descripcion}</Text>
              <Heading as="h2" size="lg">
                Receta
              </Heading>
              <Text fontSize={"1.3rem"}>{currentProduct.receta}</Text>
            </Stack>
            <Stack
              h={"30rem"}
              spacing={3}
              justifyContent={"flex-start"}
              boxSize={"20rem"}
            >
              <Heading as="h2" size="lg">
                Precio
              </Heading>
              <Text fontSize="1.4rem">
                <Mark color={"orange"}>$</Mark>
                {currentProduct.precio}
              </Text>
              <Heading as="h2" size="lg">
                Preparacion
              </Heading>
              <Text fontSize={"1.3rem"}>
                {currentProduct.tiempoCocina / 60}min
              </Text>
              <Button
                colorScheme="orange"
                w="10rem"
                onClick={() => {
                  addToCartHandler();
                }}
              >
                Agregar al carrito
              </Button>
            </Stack>
          </Flex>

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
        </Flex>
      ) : (
        <Title>No se encontro el producto</Title>
      )}
    </Container>
  );
};
export default ProductDetailPage;
