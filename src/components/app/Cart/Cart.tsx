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
} from "@mantine/core";
import CartItem from "./CartItem/CartItem";
import Loader from "@app/Loader/Loader";
import {
  CartItem as cartItem,
  CartProps,
  CartItem as CartType,
  Category,
  Product,
  Carrito,
} from "types/types";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import useMainStore from "@store/mainStore";
import { Await, Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
const Cart = ({ isOpen, onClose, btnRef }: CartProps) => {
  // const { data: cartItems, isLoading } = useCart() as {
  //   data: CartType[];
  //   isLoading: boolean;
  // };et: [0]
  type QueryPropsCarrito = {
    data: Carrito;
    error: any;
    isLoading: boolean;
  };
  const { cart: carrito, loading, setCarrito, setLoading } = useMainStore();
  const { data, error, isLoading } = useApiQuery(
    "GET|cart/getCarrito",
    null
  ) as QueryPropsCarrito;
  // let data: Carrito = {productosComprados:[],totalCompra:0};
  // let isLoading = false;
  useEffect(() => {
    if (data && !carrito) {
      //console.log("holahgola");

      setCarrito(data);
    }
  }, [data]);

  return (
    // <Drawer
    //   isOpen={isOpen}
    //   onClose={onClose}
    //   finalFocusRef={btnRef}
    //   placement="right"
    //   size="md"
    // >
    //   <DrawerOverlay />
    //   <DrawerContent>
    //     <DrawerCloseButton
    //       color="orange.300"
    //       _hover={{
    //         color: "orange.500",
    //       }}
    //       size="lg"
    //     />
    //     <DrawerHeader as="h2" fontSize="2xl" fontWeight="bold">
    //       Tu carro de compras
    //     </DrawerHeader>
    //     <DrawerBody>
    //       <Flex
    //         flexDir="column"
    //         alignItems="center"
    //         overflowY="auto"
    //         h="100%"
    //         bg="white"
    //         pr={2}
    //       >
    //         {isLoading ? (
    //           <Loader />
    //         ) : carrito && carrito.productosComprados.length > 0 ? (
    //           <>
    //             {carrito.productosComprados?.map(
    //               (cartItem: cartItem, i: number) => (
    //                 <CartItem
    //                   key={"cart-item-" + i}
    //                   cartItem={cartItem}
    //                   index={i}
    //                 />
    //               )
    //             )}
    //             <EmptyCartBtn />
    //           </>
    //         ) : (
    //           <Alert
    //             status="warning"
    //             variant="subtle"
    //             flexDirection="column"
    //             alignItems="center"
    //             justifyContent="center"
    //             textAlign="center"
    //             height="100%"
    //             bg={"white"}
    //           >
    //             <AlertIcon boxSize="40px" mr={0} />
    //             <AlertTitle mt={4} mb={1} fontSize="lg">
    //               No hay productos en el carrito
    //             </AlertTitle>
    //           </Alert>
    //         )}
    //       </Flex>
    //     </DrawerBody>
    //     <DrawerFooter>
    //       {isLoading ? null : (
    //         <Flex
    //           w="100%"
    //           h="7rem"
    //           bg="white"
    //           mb={2}
    //           borderRadius="md"
    //           display="flex"
    //           flexDir="column"
    //           alignItems="end"
    //           justifyContent="center"
    //           px={3}
    //           visibility={
    //             carrito && carrito.productosComprados.length > 0
    //               ? "visible"
    //               : "hidden"
    //           }
    //         >
    //           <Text
    //             fontSize="sm"
    //             fontWeight="bold"
    //             as="span"
    //             h="3rem"
    //             display="flex"
    //             alignItems="center"
    //             justifyContent="space-between"
    //             gap={2}
    //           >
    //             <Tag size="md" variant="solid" bg="orange">
    //               <TagLabel>Total</TagLabel>
    //             </Tag>
    //             ${carrito?.totalCompra.toFixed(2)}
    //           </Text>
    //           <Button
    //             variant={"solid"}
    //             w="100%"
    //             h="4rem"
    //             {...btnStyle}
    //             onClick={onClose}
    //             as={Link}
    //             to="/carrito"
    //           >
    //             Continuar
    //           </Button>
    //         </Flex>
    //       )}
    //     </DrawerFooter>
    //   </DrawerContent>
    // </Drawer>
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
        {isLoading || loading ? (
          <Loader />
        ) : carrito && carrito.productosComprados.length > 0 ? (
          <>
            {carrito.productosComprados?.map(
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
                <Text>{carrito?.totalCompra.toFixed(2)}</Text>
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
            <EmptyCartBtn />
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

const EmptyCartBtn = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  //const { mutate: emptyCart } = useEmptyCart();

  const { cart: carrito, loading, setCarrito, setLoading } = useMainStore();
  const { mutate: clearCart, data: clearCartData } =
    useApiMutation("PUT|cart/clearCart");
  const handleClearCart = async () => {
    //emptyCart();
    setLoading(true);
    await ClearCart();
  };
  const ClearCart = async () => {
    //updateCart({ ...item, quantity: item.quantity + 1 });
    try {
      await clearCart(null);
    } catch (error) {}
  };
  useEffect(() => {
    //setCarrito(clearCartData);
    setLoading(false);
    console.log("entre",clearCartData);
  }, [clearCartData]);
  return (
    <>
      <Button w="100%" color="red" mih="3rem" onClick={handleClearCart}>
        Vaciar carrito
      </Button>
    </>
  );
};
export default Cart;
