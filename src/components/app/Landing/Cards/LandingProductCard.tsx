import { Card, Image, Text, Badge, Button, Group, Title } from "@mantine/core";
import { AddIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation } from "@hooks/useQueries";
import { Product } from "types/types";
import { useEffect } from "react";
import useMainStore from "@store/mainStore";
export const LandingCard = ({ product }: { product: Product }) => {
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
    <Card w="15rem" key={product.id} radius="2rem" mt="3rem" mah={"10rem"}>
      <Card.Section>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <Image
            src={product.imgURL}
            alt={product.nombre}
            radius="50%"
            fit="cover"
            m="auto"
            pos="absolute"
            top="-3rem"
            left="0"
            right="0"
          />
          <Title size="sm" mt="4">
            {product.nombre}
          </Title>
        </Link>

        <Text size="md" color="black" display="flex" align="center">
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
        {/* <IconButton
              aria-label="Añadir al carrito"
              icon={<AddIcon />}
              variant="solid"
              borderRadius="50%"
              colorScheme="orange"
              bg="orange"
              size="sm"
              onClick={addToCartHandler}
            /> */}
      </Card.Section>
    </Card>
  );
};
