import { useState, useEffect, useRef } from "react";
import "./cart.scss";
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
  useDisclosure,
  Tag,
  TagLabel,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import axios from "axios";
import { API_URL } from "../../utils/utils";
import CartItem from "./CartItem/CartItem";

const Cart = ({ isOpen, onClose, btnRef }) => {
  const { onOpen } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const cancelRef = useRef();

  const handleDeleteItem = () => {
    setCartItems(cartItems.filter((item) => item.id !== deleteItem.id));
    setDeleteItem(null);
    //onClose();
  };

  const handleOpenDeleteAlert = (item, index) => {
    if (item.quantity > 1) {
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      }
      setCartItems([...cartItems.slice(0, index), updatedItem, ...cartItems.slice(index + 1)]);
      return;
    }
    setDeleteItem(item);
    onOpen();
  };

  const totalCart = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleAddItem = (item, index) => {
    const updatedItem = {
      ...item,
      quantity: item.quantity + 1,
    }
    setCartItems([...cartItems.slice(0, index), updatedItem, ...cartItems.slice(index + 1)]);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL + "getCartItems")
      .then(({ data }) => {
        // duplicar el array
        //  data.cartItems = [...data.cartItems, ...data.cartItems];
        // agregar la propiedad quantity
        setTimeout(() => {
          setCartItems(data.cartItems);
          setLoading(false);
        }, 1000);
        console.log(data.cartItems);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
      }
      );
  }, []);

  const cartItemsProps = {
    handleOpenDeleteAlert,
    handleAddItem,
  };

  return (
    <>
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
            <AlertDialog
              isOpen={!!deleteItem}
              leastDestructiveRef={cancelRef}
              onClose={() => setDeleteItem(null)}
              motionPreset="slideInRight"
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader>Eliminar del carrito</AlertDialogHeader>
                  <AlertDialogBody>
                    Esta seguro que desea eliminar {deleteItem?.name} del carrito?
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={() => setDeleteItem(null)}>
                      Cancelar
                    </Button>
                    <Button colorScheme="red" ml={3} onClick={handleDeleteItem}>
                      Borrar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            <Flex flexDir="column" alignItems="center" overflowY="auto" h="100%">
              {
                loading ?
                  (<Spinner
                    thickness='.3rem'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='orange'
                    size='xl'
                  />) :
                  cartItems.length > 0 ?
                    (cartItems.map((product, i) => (
                      <CartItem key={"cart-item-" + i} product={product} index={i} {...cartItemsProps}
                      />
                    )))
                    :
                    (<Alert
                      status='warning'
                      variant='subtle'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                      textAlign='center'
                      height='100%'
                      bg={"white"}
                    >
                      <AlertIcon boxSize='40px' mr={0} />
                      <AlertTitle mt={4} mb={1} fontSize='lg'>
                        No hay productos en el carrito
                      </AlertTitle>
                    </Alert>)
              }
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Flex
              w="100%"
              h="8rem"
              bg="white"
              boxShadow="md"
              mb={2}
              borderRadius="md"
              display="flex"
              flexDir="column"
              alignItems="end"
              justifyContent="center"
              px={3}
              visibility={cartItems.length > 0 ? "visible" : "hidden"}
              onClick={() => { alert("Continuar") }}
            >
              <Text fontSize="sm" fontWeight="bold"
                as="span"
                h="3rem"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <Tag size="md" variant="solid" colorScheme="orange">
                  <TagLabel>Total</TagLabel>
                </Tag>
                ${totalCart.toFixed(2)}</Text>
              <Button colorScheme="orange"
                w="100%"
                h="4rem"
              >Continuar</Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Cart;
