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
  Paper,
} from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation } from "@hooks/useQueries";
import { Producto } from "types/types";
import { useEffect } from "react";
import useMainStore from "@store/mainStore";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import {
  CartEditItemProduct,
  CreateCartFunc,
  CreateItemCarrito,
} from "@hooks/CarritoFunc";
import { GuardarEnLocalStorage } from "@hooks/LocalStorageFunc";

export const LandingCard = ({
  product,
  isThemeBlack,
}: {
  product: Producto;
  isThemeBlack?: boolean;
}) => {
  const { isAuthenticated } = useAuth0();
  const { filter, setFilter } = useCatalogueStore();
  const { mutate: editCart, data: addedData } = useApiMutation(
    "PUT|cart/editProduct"
  );
  const { setCarrito, setLoading, cart } = useMainStore();
  const addToCartHandler = async () => {
    if (!isAuthenticated && !cart) {
      return;
    }
    try {
      notifications.show({
        id: "adding-cartItem-" + product.id,
        loading: true,
        title: "Añadiendo al carrito",
        message: "Se esta guardando su producto al carrito",
        autoClose: false,
        withCloseButton: false,
      });
      
      if (
        cart?.productosManufacturados.find((x) => x.productoId == product.id)
      ) {
        GuardarEnLocalStorage("Carrito", CartEditItemProduct(cart, product.id, true, true));
      } else {
        if (!cart) return;
        let cartCopia = cart;
        let cartItem = CreateItemCarrito(product);
        cartCopia.productosManufacturados = [
          ...cartCopia.productosManufacturados,
          cartItem,
        ];
        cartCopia.totalCompra += cartItem.precioTotal;
        setCarrito(cartCopia);
        GuardarEnLocalStorage("Carrito", cartCopia);
      }
      notifications.update({
        id: "adding-cartItem-" + product.id,
        title: "Se añadio al carrito correctamente",
        message: "",
        icon: (
          <ActionIcon color="white" bg={"orange"} radius={"50%"}>
            <IconCheck color="white"></IconCheck>
          </ActionIcon>
        ),
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);

      notifications.update({
        id: "adding-cartItem-" + product.id,
        title: "Ocurrio un error intente nuevamente",
        message: "",
        icon: (
          <ActionIcon color="white" bg={"red"} radius={"50%"}>
            <IconX color="white"></IconX>
          </ActionIcon>
        ),
        autoClose: 2000,
      });
    }
  };

  const discountValue = (price: number = 0, discount: number) =>
    Math.floor(price - (price * discount) / 100);
  const { isMobile } = useMainStore()
  return (
    <>
      <Card
        w={isMobile ? "8rem" : "10rem"}
        style={{
          overflow: "visible",
        }}
        bg={"transparent"}
        key={product.id}
        mt="3rem"
        mih={"7rem"}
        pos={"relative"}
      >
        <Card.Section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            flexGrow: 1,
            zIndex: 2,
            flexDirection: "column",
            borderRadius: product.descuento ? "0 1.5rem 1.5rem 1.5rem" : "1rem",
          }}
          pos={"relative"}
          bg={!isThemeBlack ? "white" : "#25262b"}
        >
          <Link
            to={`/product/${product.id}`}
            style={{
              textDecoration: "none",
              maxWidth: isMobile ? "5rem" : "6rem",
              height: "5rem",
              margin: ".5rem auto",
              zIndex: 2,
              backgroundColor: "transparent",
            }}
          >
            <Image
              src={product.imgURL}
              alt={product.nombre}
              radius="50%"
              fit="cover"
              m="auto"
            />
          </Link>
          <Flex
            w={isMobile ? "8rem" : "10rem"}
            style={{
              display: "flex",
              padding: "1rem",
              height: "100%",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            <Title
              size=".7rem"
              mt="4"
              p={"0 2rem 0  0"}
              w={isMobile ? "8rem" : "10rem"}
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {product.nombre}
            </Title>

            <Text size=".8rem" color="black" display="flex" align="center">
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
            <Flex w={"100%"} gap={"0.2rem"} justify={"space-around"}>
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
                  size={isMobile ? ".8rem" : "1rem"}
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
              zIndex: 0,
            }}
          >
            {product.descuento}% OFF
          </Flex>
        )}
      </Card>
    </>
  );
};
