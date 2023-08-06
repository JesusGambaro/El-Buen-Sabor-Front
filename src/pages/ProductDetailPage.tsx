import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { useProduct } from "@hooks/useProducts";
import useCatalogueStore from "@store/catalogueStore";
import { useEffect, useState } from "react";
import { useParams, Link, redirect, useNavigate } from "react-router-dom";
import { Product } from "types/types";
import { useMediaQuery } from "@mantine/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import useMainStore from "@store/mainStore";
import {
  SimpleGrid,
  Container,
  Stack,
  Box,
  Flex,
  Title,
  useMantineColorScheme,
  createStyles,
  Image,
  Text,
  Button,
  ActionIcon,
} from "@mantine/core";

import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { IconArrowBack, IconShoppingCart } from "@tabler/icons-react";
const ProductDetailPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { mutate: editCart, data: addedData } = useApiMutation(
    "PUT|cart/addProduct"
  );
  const { setCarrito, setLoading } = useMainStore();
  const addToCartHandler = async () => {
    if (!isAuthenticated) {
      return;
    }
    try {
      setLoading(true);
      notifications.show({
        id: "adding-cartItem",
        loading: true,
        title: "Añadiendo al carrito",
        message: "Se esta guardando su producto al carrito",
        autoClose: false,
        withCloseButton: false,
      });
      await addToCart().catch((err) => {
        notifications.update({
          id: "adding-cartItem",
          title: "Ocurrio un error intente nuevamente",
          message: err,
          icon: (
            <ActionIcon color="white" bg={"red"} radius={"50%"}>
              <IconX color="white"></IconX>
            </ActionIcon>
          ),
          autoClose: 2000,
        });
      });
    } catch (error) {
      
      notifications.update({
        id: "adding-cartItem",
        title: "Ocurrio un error intente nuevamente",
        message: "",
        icon: (
          <ActionIcon color="white" bg={"red"} radius={"50%"}>
            <IconX color="white"></IconX>
          </ActionIcon>
        ),
        autoClose: 2000,
      });
    }
  };
  

  //const { mutate: addToCart } = useAddToCart();
  const addToCart = async () => {
    //updateCart({ ...item, quantity: item.quantity + 1 });
    await editCart({ id: currentProduct.id });
  };
  useEffect(() => {
    //console.log("cartEdited", data);
    if (addedData) {
      setCarrito(addedData);
      notifications.update({
        id: "adding-cartItem",
        title: "Se añadio al carrito correctamente",
        message: "",
        icon: (
          <ActionIcon color="white" bg={"orange"} radius={"50%"}>
            <IconCheck color="white"></IconCheck>
          </ActionIcon>
        ),
        autoClose: 2000,
      });
      setLoading(false);
    }
  }, [addedData]);
  const { id } = useParams<{ id: string }>();
  const { filter, setFilter } = useCatalogueStore();
  const [currentFilter, setCurrentFilter] = useState(filter);
  type QueryProps = {
    data: Product;
    error: any;
    isLoading: boolean;
  };
  let idproducto = id ? id : -1;
  const {
    data: currentProduct,
    error: isError,
    isLoading,
  } = useApiQuery("GET|producto/" + id, null) as QueryProps;

  if (isError) {
    throw isError;
  }

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const useStyles = createStyles((theme) => ({
    text: {
      color: dark ? "white" : "black",
    },
  }));
  const discountValue = (price: number = 0, discount: number) =>
    Math.floor(price - (price * discount) / 100);
  const { classes } = useStyles();
  //let mobile = useMediaQuery(`(max-width: 700px)`) ? true : false;
  const navigate = useNavigate();
  return (
    <Flex
      maw="container.2xl"
      w={"100%"}
      display="flex"
      direction="column"
      c="start"
      align="center"
      bg={dark ? "#3e3e3e" : "#e6e6e6"}
      p={"1rem"}
      mih="100vh"
      pos={"relative"}
    > 
      <Flex top={0} w={"100%"} pos={"absolute"}>
        <Button onClick={() => {
          navigate("/catálogo")
        }} h={"4rem"} p={"0.5rem"} color={"orange"} w={"10rem"} leftIcon={<IconArrowBack></IconArrowBack>}>Volver</Button>
      </Flex>
      <Title className={classes.text} order={1} mb="2rem">
        El Buen Sabor
      </Title>
      <Stack spacing={10} w="100%" dir={"column"}>
        <Title className={classes.text} order={1} mb="2rem">
          Detalle del producto
        </Title>
        <Flex
          gap={"5rem"}
          w={"100%"}
          wrap={"wrap"}
          justify={"center"}
          align={"center"}
        >
          <Box
            w={"15rem"}
            h={"15rem"}
            style={{ borderRadius: "20px", backgroundColor: "#DF8300" }}
            p={"0.5rem"}
          >
            <Image
              radius="50%"
              fit="cover"
              m="auto"
              src={currentProduct?.imgURL}
            />
          </Box>
          <Stack mih={"15rem"} align="start" justify="space-between">
            <Title className={classes.text} order={1} mb="2rem">
              {currentProduct?.nombre}
            </Title>
            <Text>{currentProduct?.descripcion}</Text>
            <Flex w={"100%"} align="center" gap={"2rem"}>
              <Text size="md" color="black" display="flex" align="center">
                <Text color="orange">
                  <i className="fa-solid fa-dollar-sign"></i>
                </Text>
                <Text
                  className={classes.text}
                  strikethrough={currentProduct?.descuento > 0}
                >
                  {currentProduct?.precio}
                </Text>
                {currentProduct?.descuento > 0 && (
                  <>
                    <Text
                      mr={"1rem"}
                      ml={"1rem"}
                      color="orange"
                      component="span"
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </Text>
                    <Text color="orange">
                      <i className="fa-solid fa-dollar-sign"></i>
                    </Text>
                    <Text className={classes.text}>
                      {discountValue(
                        currentProduct?.precio,
                        currentProduct?.descuento
                      )}
                    </Text>
                  </>
                )}
              </Text>
              <Button h={"3rem"} color="orange" onClick={addToCartHandler}>
                Añadir al carrito
              </Button>
            </Flex>
          </Stack>
        </Flex>
        <Flex
          gap={"5rem"}
          w={"100%"}
          wrap={"wrap"}
          justify={"center"}
          align={"center"}
        >
          <Stack mih={"10rem"} align="start" justify="space-between">
            <Title className={classes.text} order={1} mb="2rem">
              Ingredientes
            </Title>
            <Flex w={"100%"} justify={"center"} gap={"1rem"}>
              {currentProduct?.insumos?.map((insumoProducto:any) => {
                return (
                  <>
                    <Box
                      style={{ borderRadius: "10px" }}
                      p={"1rem"}
                      bg={"orange"}
                    >
                      <Text color="white">{insumoProducto.insumo.nombre}</Text>
                    </Box>
                  </>
                );
              })}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
};
export default ProductDetailPage;
