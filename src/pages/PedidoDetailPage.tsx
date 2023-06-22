import React from "react";
import {
  Heading,
  Container,
  Checkbox,
  Button,
  Input,
  InputGroup,
  Text,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormLabelProps,
  Stack,
  Box,
  Card,
  Image,
  Mark,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
export const PedidoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const textLayout = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "23rem",
    height: "11rem",
    border: "none",
    fontWeight: "bold",
    gap: "1rem",
  };
  const cardItem = {
    display: "flex",
    borderRadius: "5px",
    paddingLeft: ".5rem",
    justifyContent: "center",
    alignItems: "center",
    width: "30rem",
    height: "8rem",
    border: "none",
    transition: ".2s ease-in-out all",
    _hover: {
      border: "none",
      boxShadow: "0rem 0rem 0rem .2rem #ffb701",
    },
    _focus: {
      border: "none",
      boxShadow: "0rem 0rem 0rem .2rem #ffb701",
    },
    boxShadow: "1px 2px 5px rgba(0, 0, 0, 0.5);",
  };
  return (
    <Container
      maxW="container.2xl"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      bg="#f9f6f6"
      p={0}
    >
      <Flex w="100%">
        <Button
          colorScheme="orange"
          as={Link}
          to="/pedidos"
          onClick={() => {
            //handleSetFilter();
          }}
          h={"3rem"}
        >
          <ChevronLeftIcon />
          Volver al catálogo
        </Button>
      </Flex>
      <Stack p={"1rem"} w={"100%"}>
        <Heading  textAlign={"center"} as="h1" size="xl" mb="2rem">
          El Buen Sabor
        </Heading>
        <Stack spacing={3} w="100%">
          <Heading as="h2" size="lg" mb="1rem">
            Detalle Pedido
          </Heading>
          <Flex display={"flex"} justify={"center"}>
            <Flex {...textLayout} alignItems={"start"} flexDir={"column"}>
              <Text w={"100%"} textAlign={"start"} className="fecha">
                Subtotal: $1500
              </Text>

              <Text w={"100%"} textAlign={"start"} className="fecha">
                Descuento: %0($0)
              </Text>
              <Text w={"100%"} textAlign={"start"} className="fecha">
                Envio: $100
              </Text>
              <Box
                width={"50%"}
                height={".3rem"}
                color={"transparent"}
                background="#FB9300"
              >
                -
              </Box>
              <Text w={"100%"} textAlign={"start"} className="fecha">
                Total: $1400
              </Text>
            </Flex>

            <Flex {...textLayout} flexDir={"column"}>
              <Text w={"100%"} textAlign={"start"} className="fecha">
                Forma de pago: Mercado Pago
              </Text>

              <Text w={"100%"} textAlign={"start"} className="fecha">
                Tipo de entrega: Delivery
              </Text>

              <Text w={"100%"} textAlign={"start"} className="fecha">
                Fecha de pedido: 23/10/2020
              </Text>

              <Text w={"100%"} textAlign={"start"} className="fecha">
                Cantidad de items: 5
              </Text>
            </Flex>

            <Flex {...textLayout} flexDir={"column"}>
              <Text w={"100%"} textAlign={"start"} className="fecha">
                Departamento: Godoy Cruz
              </Text>
              <Text w={"100%"} textAlign={"start"} className="fecha">
                Calle: Luzuriaga
              </Text>

              <Text w={"100%"} textAlign={"start"} className="fecha">
                Numeracion: 1413
              </Text>
            </Flex>
          </Flex>
          <Box width={"90%"} height={".5rem"} background="#FB9300"></Box>
        </Stack>
        <Stack spacing={3} w="100%" p={"2rem 0rem"}>
          <Heading as="h4" size="md" mb="1rem">
            Productos
          </Heading>
          <Flex
            flexWrap={"wrap"}
            gap={"2rem 5rem"}
            width={"90%"}
            justifyContent={"center"}
            height={"31rem"}
            padding={"2rem 0rem"}
            marginBottom={"2rem"}
            overflowY={"scroll"}
          >
            <Card {...cardItem} p={0}>
              <Link
                to={`/product/${1}`}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={
                    "https://assets.stickpng.com/images/5882482de81acb96424ffaac.png"
                  }
                  borderRadius="50%"
                  boxSize="6rem"
                  p={"1rem"}
                  objectFit="cover"
                />
                <Text>Hamburguesa Big Mac</Text>
                <Text>
                  <Mark color={"orange"}>x</Mark>5
                </Text>
                <Text>
                  <Mark color={"orange"}>$</Mark>100
                </Text>
              </Link>
            </Card>
            <Card {...cardItem} p={0}>
              <Link
                to={`/product/${1}`}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={
                    "https://assets.stickpng.com/images/5882482de81acb96424ffaac.png"
                  }
                  borderRadius="50%"
                  boxSize="6rem"
                  p={"1rem"}
                  objectFit="cover"
                />
                <Text>Hamburguesa Big Mac</Text>
                <Text>
                  <Mark color={"orange"}>x</Mark>5
                </Text>
                <Text>
                  <Mark color={"orange"}>$</Mark>100
                </Text>
              </Link>
            </Card>
            <Card {...cardItem} p={0}>
              <Link
                to={`/product/${1}`}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={
                    "https://assets.stickpng.com/images/5882482de81acb96424ffaac.png"
                  }
                  borderRadius="50%"
                  boxSize="6rem"
                  p={"1rem"}
                  objectFit="cover"
                />
                <Text>Hamburguesa Big Mac</Text>
                <Text>
                  <Mark color={"orange"}>x</Mark>5
                </Text>
                <Text>
                  <Mark color={"orange"}>$</Mark>100
                </Text>
              </Link>
            </Card>
            <Card {...cardItem} p={0}>
              <Link
                to={`/product/${1}`}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={
                    "https://assets.stickpng.com/images/5882482de81acb96424ffaac.png"
                  }
                  borderRadius="50%"
                  boxSize="6rem"
                  p={"1rem"}
                  objectFit="cover"
                />
                <Text>Hamburguesa Big Mac</Text>
                <Text>
                  <Mark color={"orange"}>x</Mark>5
                </Text>
                <Text>
                  <Mark color={"orange"}>$</Mark>100
                </Text>
              </Link>
            </Card>
            <Card {...cardItem} p={0}>
              <Link
                to={`/product/${1}`}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={
                    "https://assets.stickpng.com/images/5882482de81acb96424ffaac.png"
                  }
                  borderRadius="50%"
                  boxSize="6rem"
                  p={"1rem"}
                  objectFit="cover"
                />
                <Text>Hamburguesa Big Mac</Text>
                <Text>
                  <Mark color={"orange"}>x</Mark>5
                </Text>
                <Text>
                  <Mark color={"orange"}>$</Mark>100
                </Text>
              </Link>
            </Card>
            <Card {...cardItem} p={0}>
              <Link
                to={`/product/${1}`}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={
                    "https://assets.stickpng.com/images/5882482de81acb96424ffaac.png"
                  }
                  borderRadius="50%"
                  boxSize="6rem"
                  p={"1rem"}
                  objectFit="cover"
                />
                <Text>Hamburguesa Big Mac</Text>
                <Text>
                  <Mark color={"orange"}>x</Mark>5
                </Text>
                <Text>
                  <Mark color={"orange"}>$</Mark>100
                </Text>
              </Link>
            </Card>
            <Card {...cardItem} p={0}>
              <Link
                to={`/product/${1}`}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={
                    "https://assets.stickpng.com/images/5882482de81acb96424ffaac.png"
                  }
                  borderRadius="50%"
                  boxSize="6rem"
                  p={"1rem"}
                  objectFit="cover"
                />
                <Text>Hamburguesa Big Mac</Text>
                <Text>
                  <Mark color={"orange"}>x</Mark>5
                </Text>
                <Text>
                  <Mark color={"orange"}>$</Mark>100
                </Text>
              </Link>
            </Card>
            <Card {...cardItem} p={0}>
              <Link
                to={`/product/${1}`}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={
                    "https://assets.stickpng.com/images/5882482de81acb96424ffaac.png"
                  }
                  borderRadius="50%"
                  boxSize="6rem"
                  p={"1rem"}
                  objectFit="cover"
                />
                <Text>Hamburguesa Big Mac</Text>
                <Text>
                  <Mark color={"orange"}>x</Mark>5
                </Text>
                <Text>
                  <Mark color={"orange"}>$</Mark>100
                </Text>
              </Link>
            </Card>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};
