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
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation } from "@hooks/useQueries";
import { Product } from "types/types";
import { useEffect } from "react";
import useMainStore from "@store/mainStore";
export const LandingCard = ({ product }: { product: Product }) => {
  const toast = useToast();
  const { isAuthenticated } = useAuth0();
  const { filter, setFilter } = useCatalogueStore();
  const { mutate: editCart, data } = useApiMutation("PUT|cart/addProduct");
  const { setCarrito } = useMainStore();
  const addToCartHandler = async () => {
    if (!isAuthenticated) {
      return;
    }
    try {
      await addToCart();
      toast({
        title: "Producto agregado al carrito",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        description: `${product.nombre} se ha agregado al carrito`,
      });
    } catch (error) {}
  };
  const discountValue = (price: number = 0, discount: number) =>
    Math.floor(price - (price * discount) / 100);

  //const { mutate: addToCart } = useAddToCart();
  const addToCart = async () => {
    //updateCart({ ...item, quantity: item.quantity + 1 });
    await editCart({ id: product.id });
  };
  useEffect(() => {
    //console.log("cartEdited", data);
    if (data) {
      setCarrito(data);
    }
  }, [data]);
  return (
    <Card
      w="15rem"
      maxW="xs"
      key={product.id}
      borderRadius="2rem"
      size="sm"
      mt="3rem"
      maxH={"10rem"}
    >
      <CardBody
        mt={"2rem"}
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <Image
            src={product.imgURL}
            alt={product.nombre}
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
            {product.nombre}
          </Heading>
        </Link>

        <Stack>
          {/* <HStack spacing=".5">
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
          </HStack> */}
          <HStack mt="1" justify="space-between" align="center">
            <Text
              fontSize="md"
              as="span"
              color="black"
              display="flex"
              alignItems="center"
            >
              <Text
              //textDecoration={product.discount && "line-through"}
              >
                <i className="fa-solid fa-dollar-sign"></i>
                {product.precio}
              </Text>
              {/* {product.discount > 0 && (
                <Text as="span">
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{ marginRight: ".5rem" }}
                  ></i>
                  <i className="fa-solid fa-dollar-sign"></i>
                  {discountValue(product.precio, product.discount)}
                </Text>
              )} */}
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
  );
};
