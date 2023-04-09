import React from 'react'
import {
    ButtonGroup, Spacer, Box, Image,
    Text, Button, Popover, PopoverTrigger,
    PopoverContent, PopoverHeader, PopoverBody, PopoverFooter,
    PopoverArrow, PopoverCloseButton, useDisclosure, Card
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import { removeFromCart, editCart } from '@redux/reducers/mainReducer';

const CartItem = ({ product, index }) => {
    const [deleteItem, setDeleteItem] = useState(null);
    const cancelRef = useRef();
    const dispatch = useDispatch();
    const { onOpen: onOpenDeleteItem } = useDisclosure();

    const handleDeleteItem = () => {
        dispatch(removeFromCart(deleteItem.id));
        setDeleteItem(null);
    };

    const handleOpenDeleteAlert = (item, index, isTheLast = false) => {
        if (item.quantity > 1 && !isTheLast) {
            dispatch(editCart({ newItem: { ...item, quantity: item.quantity - 1 }, index }));
            return;
        }
        setDeleteItem(item);
        onOpenDeleteItem();
    };

    const handleAddItem = (item, index) => {
        dispatch(editCart({ newItem: { ...item, quantity: item.quantity + 1 }, index }));
    };

    const btnStyles = {
        colorScheme: "orange",
        variant: "outline",
        borderColor: "orange",
        color: "orange",
        _hover: {
            bg: "orange.400",
            color: "white",
        }
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
            direction={{ base: 'column', sm: 'row' }}
        >
            <Image
                boxSize="70px"
                src={product.img}
                alt="El Buen Sabor"
                borderRadius="md"
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
            />
            <Box ml={3}>
                <Text fontSize="sm" fontWeight="bold" mb={1} mr={2}>
                    {product.name}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                    ${Math.round(product.price * product.quantity)}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                    <Text as="span" color="orange.500">
                        x
                    </Text>
                    {product.quantity}
                </Text>
            </Box>
            <Spacer />

            <ButtonGroup size="sm" isAttached variant="outline">
                <Button {...btnStyles} onClick={() => { handleOpenDeleteAlert(product, index) }}>
                    -
                </Button>
                <Button {...btnStyles} onClick={() => { handleAddItem(product, index) }}>
                    +
                </Button>
                <Popover
                    placement='left'
                    isOpen={!!deleteItem}
                    leastDestructiveRef={cancelRef}
                    onClose={() => setDeleteItem(null)}
                    motionPreset="slideInRight"
                >
                    <PopoverTrigger>
                        <Button
                            colorScheme='red'
                            variant={deleteItem ? 'solid' : 'outline'}
                            _hover={{ bg: 'red.500', color: 'white' }}
                            onClick={() => { handleOpenDeleteAlert(product, index, true) }}>
                            <DeleteIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader fontWeight='semibold'>Confirmación</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            Esta seguro que desea eliminar {deleteItem?.name} del carrito?
                        </PopoverBody>
                        <PopoverFooter display='flex' justifyContent='flex-end'>
                            <ButtonGroup size='sm'>
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
    )
}

export default CartItem