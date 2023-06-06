import {
  ButtonGroup,
  Spacer,
  Box,
  Image,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Card,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { CartItem, Product } from "Types/types";
import { useRemoveFromCart, useUpdateCart } from "@hooks/useCart";

const CartItem = ({
  cartItem,
  index,
}: {
  cartItem: CartItem;
  index: number;
}) => {
  const [deleteItem, setDeleteItem] = useState<CartItem | null>(null);

  const cancelRef = useRef() as any;
  const { onOpen: onOpenDeleteItem } = useDisclosure();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: updateCart } = useUpdateCart();
  const { product } = cartItem;
  const handleDeleteItem = () => {
    if (!deleteItem) return;
    removeFromCart(deleteItem);
    setDeleteItem(null);
  };

  const handleOpenDeleteAlert = (item: CartItem, isTheLast = false) => {
    if (cartItem.quantity > 1 && !isTheLast) {
      updateCart({ ...item, quantity: item.quantity - 1 });
      return;
    }
    setDeleteItem(item);
    onOpenDeleteItem();
  };

  const handleAddItem = (item: CartItem, index: number) => {
    updateCart({ ...item, quantity: item.quantity + 1 });
  };

  const btnStyles = {
    colorScheme: "orange",
    variant: "outline",
    borderColor: "orange",
    color: "orange",
    _hover: {
      bg: "orange.400",
      color: "white",
    },
  };

  return (
    <Card
      w="100%"
      bg="white"
      boxShadow="md"
      mb={2}
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={3}
      direction={{ base: "column", sm: "row" }}
    >
      <Image
        boxSize="70px"
        src={product.imgURL}
        alt="El Buen Sabor"
        borderRadius="md"
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
      />
      <Box ml={3}>
        <Text fontSize="sm" fontWeight="bold" mb={1} mr={2}>
          {product.nombre}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          ${/*Math.round((product.precio || 0) * cartItem.quantity)*/}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          <Text as="span" color="orange.500">
            x
          </Text>
          {cartItem.quantity}
        </Text>
      </Box>
      <Spacer />

      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          {...btnStyles}
          onClick={() => {
            handleOpenDeleteAlert(cartItem);
          }}
        >
          -
        </Button>
        <Button
          {...btnStyles}
          onClick={() => {
            handleAddItem(cartItem, index);
          }}
        >
          +
        </Button>
        <Popover
          placement="left"
          isOpen={!!deleteItem}
          //leastDestructiveRef={cancelRef}
          onClose={() => setDeleteItem(null)}
          //motionPreset="slideInBottom"
        >
          <PopoverTrigger>
            <Button
              colorScheme="red"
              variant={deleteItem ? "solid" : "outline"}
              _hover={{ bg: "red.500", color: "white" }}
              onClick={() => {
                handleOpenDeleteAlert(cartItem, true);
              }}
            >
              <DeleteIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmación</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              Esta seguro que desea eliminar {deleteItem?.product?.nombre} del
              carrito?
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button ref={cancelRef} onClick={() => setDeleteItem(null)}>
                  Cancelar
                </Button>
                <Button colorScheme="red" ml={3} onClick={handleDeleteItem}>
                  Borrar
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
    </Card>
  );
};

export default CartItem;
