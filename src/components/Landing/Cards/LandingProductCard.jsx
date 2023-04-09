import React from 'react'
import {
    Card,
    Heading,
    CardBody,
    Stack,
    Text,
    Image,
    IconButton,
    HStack,
    useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { addToCart, setAttempt } from "@redux/reducers/mainReducer";
import { useAuth0 } from '@auth0/auth0-react';

export const LandingCard = ({ product }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { isAuthenticated } = useAuth0();

    const addToCartHandler = () => {
        if (!isAuthenticated) {
            dispatch(setAttempt(true));
            return;
        }
        const cartItem = {
            id: product.id,
            name: product.name,
            price: discountValue(product.price, product.discount),
            img: product.img,
            quantity: 1,
        };
        dispatch(addToCart(cartItem));
        toast({
            title: "Producto agregado al carrito",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
            description: `${product.name} se ha agregado al carrito`,
        });
    };
    const discountValue = (price, discount) =>
        Math.floor(price - (price * discount) / 100);

    return (
        <Card
            w="100%"
            maxW="xs"
            key={product.id}
            borderRadius="2rem"
            size="sm"
            mt="3rem"
        >
            <CardBody
                mt={"2rem"}
                display="flex"
                flexDirection="column"
                justifyContent={"space-between"}
            >
                <Image
                    src={product.img}
                    alt={product.name}
                    borderRadius="50%"
                    boxSize="6rem"
                    objectFit="cover"
                    m="auto"
                    position="absolute"
                    top="-3rem"
                    left="0"
                    right="0"
                />
                <Heading size="sm" mt="4">
                    {product.name}
                </Heading>
                <Stack mt="1">
                    <HStack spacing=".5">
                        {new Array(5).fill("").map((_, i) => {
                            return i + 1 <= Math.floor(product.rating) ? (
                                <i key={i} className="fa-solid fa-star"></i>
                            ) : product.rating - Math.floor(product.rating) === 0.5 &&
                                i === Math.floor(product.rating) ? (
                                <i key={i} className="fa-solid fa-star-half-stroke"></i>
                            ) : (
                                <i key={i} className="fa-regular fa-star"></i>
                            );
                        })}
                    </HStack>
                    <HStack mt="1" justify="space-between" align="center">
                        <Text
                            fontSize="md"
                            as="span"
                            color="black"
                            display="flex"
                            alignItems="center"
                        >
                            <Text textDecoration={product.discount && "line-through"}>
                                <i className="fa-solid fa-dollar-sign"></i>
                                {product.price}
                            </Text>
                            {product.discount > 0 && (
                                <Text as="span">
                                    <i
                                        className="fa-solid fa-chevron-right"
                                        style={{ marginRight: ".5rem" }}
                                    ></i>
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    {discountValue(product.price, product.discount)}
                                </Text>
                            )}
                        </Text>
                        <IconButton
                            aria-label="Añadir al carrito"
                            icon={<AddIcon />}
                            variant="solid"
                            borderRadius="50%"
                            colorScheme="orange"
                            bg="orange"
                            size="sm"
                            onClick={addToCartHandler}
                        />
                    </HStack>
                </Stack>
            </CardBody>
        </Card>
    )
}
