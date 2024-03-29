import {
  Box,
  Image,
  Text,
  Button,
  Card,
  Flex,
  ActionIcon,
  createStyles,
  Title,
  Menu,
  Loader,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { CartItem, Product } from "types/types";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import useMainStore from "@store/mainStore";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Tex } from "tabler-icons-react";

const CartItem = ({
  cartItem,
  index,
  isMobile,
}: {
  cartItem: CartItem;
  index: number;
  isMobile?: boolean;
}) => {
  const {
    mutate: addProduct,
    data: addedData,
    isLoading: isLoadingAdd,
  } = useApiMutation("PUT|cart/addProduct");
  const {
    mutate: delProducto,
    data: removedData,
    isLoading: isLoadingDel,
  } = useApiMutation("PUT|cart/delProduct");
  const handleDeleteItem = () => {
    delProducto({ id: cartItem.productoId });
  };

  const handleAddItem = () => {
    //updateCart({ ...item, quantity: item.quantity + 1 });
    addProduct({ id: cartItem.productoId });
  };
  const discountValue = (price: number = 0, discount: number) =>
    Math.floor(price - (price * discount) / 100);
  const { setCarrito } = useMainStore();
  const cancelRef = useRef() as any;
  //const { onOpen: onOpenDeleteItem } = useDisclosure();
  //const { mutate: removeFromCart } = useRemoveFromCart();
  //const { mutate: updateCart } = useUpdateCart();

  useEffect(() => {
    if (addedData) {
      setCarrito(addedData);
    } else if (removedData) {
      setCarrito(removedData);
      console.log(removedData);
    }
  }, [addedData, removedData]);

  const useStyles = createStyles((theme) => ({
    buttonCantidad: {
      backgroundColor: "transparent",
      [`&:hover`]: {
        backgroundColor: "orange",
        color: "red",
        iconSearch: {
          color: "red",
        },
      },
    },
    card: {
      marginTop: "1rem",
      backgroundColor: "white",
      boxShadow: "0 0 10px -5px black",
      overflow: "visible",
    },
  }));
  const { classes } = useStyles();
  return (
    <Card w={"100%"} p={"1rem"} className={classes.card} dir="row">
      <Flex direction={"row"} gap={10} justify={"flex-start"} align={"center"}>
        <Box bg={"#eeebeb"} style={{ borderRadius: "10px" }}>
          <Image
            width="70px"
            src={cartItem.urlIMG}
            alt="El Buen Sabor"
            radius="md"
            fit="cover"
            maw={{ base: "100%", sm: "200px" }}
          />
        </Box>
        <Flex w={"100%"} direction="column">
          <Title color="black" size="sm" mt="4">
            {cartItem.nombre}
          </Title>
          <Text color="black" style={{gap:"1rem"}} display={"flex"}>
            <Text w={"2rem"}>c/u:</Text>
            <Text color="black" display={"flex"}>
              <Text color="orange">
              <i className="fa-solid fa-dollar-sign"></i>
            </Text>
            <Text strikethrough={cartItem.descuento > 0}>
              {cartItem.precioUnitario}
            </Text>

            {cartItem.descuento > 0 && (
              <>
                <Text mr={"1rem"} ml={"1rem"} color="orange" component="span">
                  <i className="fa-solid fa-chevron-right"></i>
                </Text>
                <Text color="orange">
                  <i className="fa-solid fa-dollar-sign"></i>
                </Text>
                <Text color="black">
                  {discountValue(cartItem.precioUnitario, cartItem.descuento)}
                </Text>
              </>
            )}
            </Text>
            
          </Text>

          <Flex direction="row" justify={"space-between"}>
            <Text color="black" style={{gap:"1rem"}} display={"flex"}>
              <Text w={"2rem"}>Total:</Text>
              <Text color="black" display={"flex"}>
                <Text color="orange">
                  <i className="fa-solid fa-dollar-sign"></i>
                </Text>
                {cartItem.precioTotal}
              </Text>
            </Text>
            <Flex
              direction="row"
              bg={"orange"}
              justify={"center"}
              align={"center"}
              gap={5}
              style={{ borderRadius: "5px", padding: "0.1rem" }}
            >
              {isLoadingAdd || isLoadingDel ? (
                <Loader color="white" variant="dots" />
              ) : (
                <>
                  {cartItem.cantidad == 1 ? (
                    <Menu
                      transitionProps={{
                        transition: "rotate-right",
                        duration: 150,
                      }}
                      withArrow
                      width={300}
                      position="bottom-end"
                      shadow="md"
                    >
                      <Menu.Target>
                        <ActionIcon
                          className={classes.buttonCantidad}
                          size={20}
                        >
                          <IconMinus color="white"></IconMinus>
                        </ActionIcon>
                      </Menu.Target>

                      <Menu.Dropdown w={"100%"}>
                        <Menu.Label>
                          <Text align="center">
                            ¿Esta seguro de eliminar el item del carrito?
                          </Text>{" "}
                        </Menu.Label>
                        <Menu.Item
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          display={"flex"}
                          dir="row"
                        >
                          <Flex
                            w={"100%"}
                            justify={"space-between"}
                            align={"center"}
                          >
                            <Button
                              onClick={() => {
                                handleDeleteItem();
                              }}
                            >
                              Confirmar
                            </Button>
                            <Button color="red">Cancelar</Button>
                          </Flex>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  ) : (
                    <ActionIcon
                      onClick={() => {
                        handleDeleteItem();
                      }}
                      className={classes.buttonCantidad}
                      size={20}
                    >
                      <IconMinus color="white"></IconMinus>
                    </ActionIcon>
                  )}

                  <Text color="white">{cartItem.cantidad}</Text>
                  <ActionIcon
                    onClick={() => {
                      handleAddItem();
                    }}
                    className={classes.buttonCantidad}
                    size={20}
                  >
                    <IconPlus color="white"></IconPlus>
                  </ActionIcon>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CartItem;
