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
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { addToCart, setAttempt } from "@redux/reducers/mainReducer";
import { useAuth0 } from '@auth0/auth0-react';

export const OfferCard = ({ category }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { isAuthenticated } = useAuth0();

    return (
        <Card
            w="10rem"
            key={"category" + category.id}
            borderRadius="2rem"
            size="sm"
            my="1rem"
            boxShadow="md"
        >
            <CardBody
                display="flex"
                flexDirection="column"
                justifyContent={"space-between"}
                alignItems="center"
            >
                <Image
                    src={category.img}
                    alt={category.name}
                    borderRadius="50%"
                    boxSize="4rem"
                    objectFit="cover"
                    m="auto"
                />
                <Heading size="sm" mt="4">
                    {category.name}
                </Heading>
                <IconButton aria-label="Go to category" icon={<ChevronRightIcon />}
                    size="sm" mt="1rem"
                    borderRadius="2rem"
                    bg="orange"
                    color="white"
                    _hover={{ bg: "orange.400" }}
                />
            </CardBody>
        </Card>
    )
}
