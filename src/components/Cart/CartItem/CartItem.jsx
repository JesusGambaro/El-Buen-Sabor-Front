import React from 'react'
import {
    ButtonGroup,
    Spacer,
    Box,
    Image,
    Text,
    Button,

} from '@chakra-ui/react';



const CartItem = ({ product, index, handleOpenDeleteAlert, handleAddItem }) => {
    const btnStyles = {
        colorScheme: "orange",
        _hover: {
            bg: "orange.500",
            color: "white",
        }
    };
    return (
        <Box
            w="100%"
            h="100px"
            bg="white"
            boxShadow="md"
            mb={2}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={3}
        >
            <Image
                boxSize="70px"
                objectFit="cover"
                src={product.img}
                alt="El Buen Sabor"
                borderRadius="md"
            />
            <Box ml={3}>
                <Text fontSize="sm" fontWeight="bold" mb={1} mr={2}>
                    {product.name}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                    $ {Math.round(product.price * product.quantity)}
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
            </ButtonGroup>
        </Box>
    )
}

export default CartItem