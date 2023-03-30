import React from "react";
import {
  SimpleGrid,
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Text,
  Divider,
  CardFooter,
  Button,
  ButtonGroup,
  Image,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import {PhoneIcon, AddIcon, WarningIcon} from "@chakra-ui/icons";
import "./landing.scss";
import axios from "axios";
import {useEffect, useState} from "react";
import {API_URL, mainColor} from "../../../utils";
const Landing = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL + "getLanding")
      .then(({data}) => {
        setProducts(data.landing);
        console.log(data.landing);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const discountValue = (price, discount) =>
    Math.floor(price - (price * discount) / 100);

  return (
    <SimpleGrid spacing={3} columns={{base: 1, md: 2, lg: 3, xl: 4}}>
      {products.map((product) => (
        <Card
          w="100%"
          maxW="sm"
          key={product.id}
          boxShadow="lg"
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
                        style={{marginRight: ".5rem"}}
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
                  bg={mainColor}
                  size="sm"
                />
              </HStack>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};
export default Landing;
