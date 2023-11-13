import { useEffect, useRef } from "react";
import {
  Drawer,
  Text,
  Button,
  Flex,
  Alert,
  Title,
  Mark,
  Box,
  Card,
  createStyles,
  Menu,
} from "@mantine/core";
import CartItem from "./CartItem/CartItem";
import Loader from "@app/Loader/Loader";
import {
  CartItem as cartItem,
  CartProps,
  CartItem as CartType,
  Categoria,
  Producto,
  Carrito,
  InsumoCarrito,
  CarritoVanilla,
} from "types/types";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import useMainStore from "@store/mainStore";
import { Await, Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import { CreateCartFunc } from "../../../hooks/CarritoFunc";
import {
  GuardarEnLocalStorage,
  ObtenerDeLocalStorage,
} from "@hooks/LocalStorageFunc";
const Cart = ({ isOpen, onClose, btnRef }: CartProps) => {
  // const { data: cartItems, isLoading } = useCart() as {
  //   data: CartType[];
  //   isLoading: boolean;
  // };et: [0]
  const { cart: carrito, loading, setCarrito, setLoading } = useMainStore();
  type QueryPropsCarrito = {
    data: CarritoVanilla;
    error: any;
    isLoading: boolean;
    refetch: () => void;
  };
  const { data, error, isLoading, refetch } = useApiQuery(
    "GET|cart/getCarrito",
    null
  ) as QueryPropsCarrito;
  // let data: Carrito = {productosComprados:[],totalCompra:0};
  // let isLoading = false;

  useEffect(() => {
    let carritoLocalStorage = ObtenerDeLocalStorage("Carrito");
    if (carritoLocalStorage) {
      console.log(carritoLocalStorage);
      
      setCarrito(carritoLocalStorage);
    } else {
      setCarrito({
        productosAgregados: [],
        productosManufacturados: [],
        totalCompra: 0,
      });
    }
  }, []);

  const { mutate: clearCart, data: clearCartData } =
    useApiMutation("PUT|cart/clearCart");
  const handleClearCart = async () => {
    setCarrito({
      productosAgregados: [],
      productosManufacturados: [],
      totalCompra: 0,
    });
    GuardarEnLocalStorage("Carrito", {
      productosAgregados: [],
      productosManufacturados: [],
      totalCompra: 0,
    });
  };
  const useStyles = createStyles((theme) => ({
    text: {
      color: theme.colorScheme !== "dark" ? theme.colors.dark[6] : theme.white,
    },
  }));
  const { classes } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Drawer
      opened={isOpen}
      onClose={onClose}
      title={
        <p style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>Carrito</p>
      }
      position="right"
      transitionProps={{
        transition: "slide-left",
        duration: 200,
        timingFunction: "ease-in-out",
      }}
      overlayProps={{ opacity: 0.5, blur: 4 }}
      bg={"#f9f6f6"}
    >
      <Flex direction={"column"} gap={3} align="center" h="100%" pr={2}>
        {carrito &&
          carrito.productosManufacturados &&
          carrito.productosManufacturados.length > 0 ? (
          <>
            {carrito.productosManufacturados?.map(
              (cartItem: cartItem, i: number) => (
                <CartItem
                  key={"cart-item-" + i}
                  cartItem={cartItem}
                  index={i}
                />
              )
            )}
            <Card
              w={"100%"}
              p={"0.5rem"}
              style={{ gap: "1rem" }}
              display={"flex"}
            >
              <Text weight={"bold"}>Total</Text>
              <Text color="black" display={"flex"}>
                <Text color="orange">
                  <i className="fa-solid fa-dollar-sign"></i>
                </Text>
                <Text className={classes.text}>
                  {carrito?.totalCompra?.toFixed(2)}
                </Text>
              </Text>
            </Card>

            <Link
              style={{
                textDecoration: "none",
                color: "white",
                background: "orange",
                width: "100%",
                height: "4rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
              }}
              onClick={onClose}
              to="/carrito"
            >
              Continuar
            </Link>
            <Menu
              transitionProps={{
                transition: "rotate-right",
                duration: 150,
              }}
              withArrow
              width={300}
              position="bottom"
              shadow="md"
              opened={opened}
            >
              <Menu.Target>
                <Button onClick={open} w="100%" color="red" mih="3rem">
                  Vaciar carrito
                </Button>
              </Menu.Target>

              <Menu.Dropdown w={"100%"}>
                <Menu.Label>
                  <Text align="center">¿Esta seguro de vaciar el carrito?</Text>
                </Menu.Label>
                <Flex
                  w={"100%"}
                  p={"1rem"}
                  justify={"space-between"}
                  align={"center"}
                >
                  <Button
                    onClick={() => {
                      close();
                      handleClearCart();
                    }}
                    color="red"
                  >
                    Confirmar
                  </Button>
                  <Button onClick={close}>Cancelar</Button>
                </Flex>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : (
          <Alert
            icon={<></>}
            title="El carrito esta vacio!"
            color="red"
            w={"100%"}
          >
            Agrega productos para verlos aqui.
          </Alert>
        )}
      </Flex>
    </Drawer>
  );
};

export default Cart;
