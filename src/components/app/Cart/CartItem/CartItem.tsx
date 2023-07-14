import { Box, Image, Text, Button, Card } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { CartItem, Product } from "types/types";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import useMainStore from "@store/mainStore";

const CartItem = ({
  cartItem,
  index,
  isMobile,
}: {
  cartItem: CartItem;
  index: number;
  isMobile?: boolean;
}) => {
  const { mutate: addProduct, data: addedData } = useApiMutation(
    "PUT|cart/addProduct"
  );
  const { mutate: delProducto, data: removedData } = useApiMutation(
    "PUT|cart/delProduct"
  );

  const { setCarrito } = useMainStore();
  const cancelRef = useRef() as any;
  //const { onOpen: onOpenDeleteItem } = useDisclosure();
  //const { mutate: removeFromCart } = useRemoveFromCart();
  //const { mutate: updateCart } = useUpdateCart();

  const handleDeleteItem = () => {
    delProducto({ id: cartItem.productoId });
  };

  const handleOpenDeleteAlert = (item: CartItem, isTheLast = false) => {
    if (cartItem.cantidad > 1 && !isTheLast) {
      //updateCart({ ...item, quantity: item.quantity - 1 });
      return;
    }
    //onOpenDeleteItem();
  };

  const handleAddItem = () => {
    //updateCart({ ...item, quantity: item.quantity + 1 });
    addProduct({ id: cartItem.productoId });
  };
  useEffect(() => {
    console.log("entre");

    if (addedData) {
      setCarrito(addedData);
    } else if (removedData) {
      setCarrito(removedData);
    }
  }, [addedData, removedData]);

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
    // <Card
    //   w="100%"
    //   bg="white"
    //   shadow="md"
    //   mb={2}
    //   radius="md"
    //   display="flex"
    //   justifyContent="center"
    //   p={3}
    //   h={isMobile ? "10rem" : "5rem"}
    //   direction={{ base: "column", sm: "row" }}
    // >
    //   <Image
    //     boxSize="70px"
    //     src={cartItem.imgURL}
    //     alt="El Buen Sabor"
    //     borderRadius="md"
    //     objectFit="cover"
    //     maxW={{ base: "100%", sm: "200px" }}
    //   />
    //   <Box ml={3}>
    //     <Text fontSize="sm" fontWeight="bold" mb={1} mr={2}>
    //       {cartItem.producto}
    //     </Text>
    //     <Text fontSize="sm" fontWeight="bold">
    //       ${cartItem.precioTotal}
    //     </Text>
    //   </Box>
    //   <Spacer />

    //   <ButtonGroup
    //     alignItems={"center"}
    //     gap={"0.5rem"}
    //     size="sm"
    //     isAttached
    //     variant="outline"
    //   >
    //     <Button
    //       {...btnStyles}
    //       onClick={() => {
    //         handleDeleteItem();
    //       }}
    //     >
    //       -
    //     </Button>
    //     <Text fontSize="sm" fontWeight="bold">
    //       {cartItem.cantidad}
    //       <Text as="span" color="orange.500">
    //         U
    //       </Text>
    //     </Text>
    //     <Button
    //       {...btnStyles}
    //       onClick={() => {
    //         handleAddItem();
    //       }}
    //     >
    //       +
    //     </Button>
    //     {/* <Popover
    //       placement="left"
    //       isOpen={!!deleteItem}
    //       //leastDestructiveRef={cancelRef}
    //       onClose={() => setDeleteItem(null)}
    //       //motionPreset="slideInBottom"
    //     >
    //       <PopoverTrigger>
    //         <Button
    //           colorScheme="red"
    //           variant={deleteItem ? "solid" : "outline"}
    //           _hover={{ bg: "red.500", color: "white" }}
    //           onClick={() => {
    //             handleOpenDeleteAlert(cartItem, true);
    //           }}
    //         >
    //           <DeleteIcon />
    //         </Button>
    //       </PopoverTrigger>
    //       <PopoverContent>
    //         <PopoverHeader fontWeight="semibold">Confirmación</PopoverHeader>
    //         <PopoverArrow />
    //         <PopoverCloseButton />
    //         <PopoverBody>
    //           Esta seguro que desea eliminar {deleteItem?.producto} del
    //           carrito?
    //         </PopoverBody>
    //         <PopoverFooter display="flex" justifyContent="flex-end">
    //           <ButtonGroup size="sm">
    //             <Button ref={cancelRef} onClick={() => setDeleteItem(null)}>
    //               Cancelar
    //             </Button>
    //             <Button colorScheme="red" ml={3} onClick={handleDeleteItem}>
    //               Borrar
    //             </Button>
    //           </ButtonGroup>
    //         </PopoverFooter>
    //       </PopoverContent>
    //     </Popover> */}
    //   </ButtonGroup>
    // </Card>
    <Card w={"100%"} h={"5rem"}>
      <Box w={"100%"} pos={"absolute"}>
        <Image
          width="70px"
          src={cartItem.imgURL}
          alt="El Buen Sabor"
          radius="md"
          fit="cover"
          maw={{ base: "100%", sm: "200px" }}
        />
      </Box>
    </Card>
  );
};

export default CartItem;
