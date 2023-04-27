import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, clearCart, getTotal } from "@redux/reducers/mainReducer";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  Text,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  AlertTitle,
  useDisclosure,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import CartItem from "./CartItem/CartItem";
import Loader from "@app/Loader/Loader";
import { btnStyle } from "@utils/theme";
import { Product, CartProps } from "Types/types";

const Cart = ({ isOpen, onClose, btnRef }: CartProps) => {
  const {
    loading,
    cartProducts: cartItems,
    total,
  } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={btnRef}
      placement="right"
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          color="orange.300"
          _hover={{
            color: "orange.500",
          }}
          size="lg"
        />
        <DrawerHeader as="h2" fontSize="2xl" fontWeight="bold">
          Tu carro de compras
        </DrawerHeader>
        <DrawerBody>
          <Flex
            flexDir="column"
            alignItems="center"
            overflowY="auto"
            h="100%"
            bg="white"
            pr={2}
          >
            {loading ? (
              <Loader />
            ) : cartItems.length > 0 ? (
              <>
                {cartItems.map((product: Product, i: number) => (
                  <CartItem
                    key={"cart-item-" + i}
                    product={product}
                    index={i}
                  />
                ))}
                <EmptyCartBtn />
              </>
            ) : (
              <Alert
                status="warning"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="100%"
                bg={"white"}
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  No hay productos en el carrito
                </AlertTitle>
              </Alert>
            )}
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          {loading ? null : (
            <Flex
              w="100%"
              h="7rem"
              bg="white"
              mb={2}
              borderRadius="md"
              display="flex"
              flexDir="column"
              alignItems="end"
              justifyContent="center"
              px={3}
              visibility={cartItems.length > 0 ? "visible" : "hidden"}
            >
              <Text
                fontSize="sm"
                fontWeight="bold"
                as="span"
                h="3rem"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <Tag size="md" variant="solid" bg="orange">
                  <TagLabel>Total</TagLabel>
                </Tag>
                ${total.toFixed(2)}
              </Text>
              <Button
                variant={"solid"}
                w="100%"
                h="4rem"
                {...btnStyle}
                onClick={() => {
                  alert("Continuar");
                }}
              >
                Continuar
              </Button>
            </Flex>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const EmptyCartBtn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" w="100%" minH="3rem" onClick={onOpen}>
        Vaciar carrito
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        motionPreset="slideInRight"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Vaciar Carrito</AlertDialogHeader>
            <AlertDialogBody>
              ¿Está seguro que desea vaciar el carrito?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleClearCart}>
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default Cart;
