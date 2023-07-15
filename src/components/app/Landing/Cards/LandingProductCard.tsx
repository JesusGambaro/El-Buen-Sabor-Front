import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  Flex,
  Tooltip,
  ActionIcon,
  Rating,
  Box,
} from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation } from "@hooks/useQueries";
import { Product } from "types/types";
import { useEffect } from "react";
import useMainStore from "@store/mainStore";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const LandingCard = ({
  product,
  isThemeBlack,
}: {
  product: Product;
  isThemeBlack?: boolean;
}) => {
  const { isAuthenticated } = useAuth0();
  const { filter, setFilter } = useCatalogueStore();
  const { mutate: editCart, data } = useApiMutation("PUT|cart/addProduct");
  const { setCarrito } = useMainStore();
  const addToCartHandler = async () => {
    if (!isAuthenticated) {
      return;
    }
    try {
      await addToCart()
        .then(() => {
          notifications.show({
            title: "Se añadio al carrito correctamente",
            message: "",
            icon: (
              <ActionIcon color="white" bg={"orange"} radius={"50%"}>
                <IconCheck color="white"></IconCheck>
              </ActionIcon>
            ),
          });
        })
        .catch(() => {
          notifications.show({
            title: "Ocurrio un error intente nuevamente",
            message: "",
            icon: (
              <ActionIcon color="white" bg={"red"} radius={"50%"}>
                <IconX color="white"></IconX>
              </ActionIcon>
            ),
          });
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
    <>
      <Card
        w="15rem"
        style={{
          overflow: "visible",
        }}
        bg={"transparent"}
        key={product.id}
        mt="3rem"
        mih={"7rem"}
      >
        <Card.Section
          style={{
            overflow: "visible",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            zIndex: 2,
            borderRadius: product.descuento ? "0 2rem 2rem 2rem" : "2rem",
            
          }}
          pos={"relative"}
          bg={!isThemeBlack ? "white" : "#25262b"}
          
        >
          <Link
            to={`/product/${product.id}`}
            style={{
              textDecoration: "none",
              position: "absolute",
              top: "0",
              width: "5rem",
            }}
          >
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
          </Link>
          <Flex
            style={{
              display: "flex",
              padding: ".5rem",
              height: "100%",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "1rem",
            }}
            
          >
            <Title size="sm" mt="4">
              {product.nombre}
            </Title>

            <Text size="md" color="black" display="flex" align="center">
              <Text color="orange">
                <i className="fa-solid fa-dollar-sign"></i>
              </Text>
              <Text
                color={isThemeBlack ? "white" : "black"}
                strikethrough={product.descuento > 0}
              >
                {product.precio}
              </Text>
              {product.descuento > 0 && (
                <>
                  <Text mr={"1rem"} ml={"1rem"} color="orange" component="span">
                    <i className="fa-solid fa-chevron-right"></i>
                  </Text>
                  <Text color="orange">
                    <i className="fa-solid fa-dollar-sign"></i>
                  </Text>
                  <Text color={isThemeBlack ? "white" : "black"}>
                    {discountValue(product.precio, product.descuento)}
                  </Text>
                </>
              )}
            </Text>
            <Flex w={"100%"} justify={"space-between"}>
              <Tooltip
                openDelay={500}
                transitionProps={{ transition: "skew-up", duration: 300 }}
                position="bottom"
                label={"Valoracion: " + product.valoracion}
                withArrow
                bg={"orange"}
              >
                <Rating
                  color="orange"
                  value={product.valoracion}
                  fractions={2}
                  readOnly
                />
              </Tooltip>

              <Tooltip
                openDelay={500}
                transitionProps={{ transition: "skew-up", duration: 300 }}
                position="bottom"
                label="Añadir al carrito"
                withArrow
                bg={"orange"}
              >
                <Text
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                  color="orange"
                  onClick={addToCartHandler}
                  w={"2rem"}
                  display={"flex"}
                >
                  <i className={"fa-solid fa-cart-shopping"}></i>
                </Text>
              </Tooltip>
            </Flex>
          </Flex>
        </Card.Section>
        {product.descuento > 0 && (
          <Flex
            bg={"orange"}
            pos={"absolute"}
            top={-22}
            left={0}
            h={"2.5rem"}
            style={{
              borderRadius: "10px 10px 0 0",
              padding: "0.1rem",
              width: "5rem",
              justifyContent: "center",
              alignItems: "start",
              fontWeight: "bold",
              fontSize: "12px",
              color: "white",
              zIndex: 1,
            }}
          >
            {product.descuento}% OFF
          </Flex>
        )}
      </Card>
    </>
  );
};
