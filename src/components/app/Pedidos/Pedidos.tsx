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
  Select,
  Card,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Pedidos = () => {
  const selectStyle = {
    display: "flex",
    borderRadius: "5px",
    paddingLeft: ".5rem",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "15rem",
    height: "2.5rem",
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
  const tableHeadStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: "2.5rem",
    border: "none",
    fontWeight: "bold",
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
    >
      <Heading as="h1" size="xl" mb="2rem">
        El Buen Sabor
      </Heading>
      <Stack spacing={3} w="100%">
        <Heading as="h2" size="lg" mb="1rem">
          Pedidos
        </Heading>
        <Heading as="h4" size="md" mb="1rem">
          Filtros
        </Heading>
        <Flex gap={"1rem"} justify={"flex-start"} align={"flex-end"}>
          <Select {...selectStyle} placeholder="Buscar por estado..">
            <option>Entregado</option>
            <option>Cancelado</option>
            <option>Enviando</option>
          </Select>
          <Input
            {...selectStyle}
            w={"20rem"}
            placeholder="Buscar por nombre producto.."
          ></Input>
          <Flex flexDir={"column"}>
            <Text fontWeight={"bold"}>Fecha Inicial</Text>
            <Input
              {...selectStyle}
              w={"10rem"}
              type="date"
              placeholder="Buscar por nombre producto.."
            ></Input>
          </Flex>
          <Flex flexDir={"column"}>
            <Text fontWeight={"bold"}>Fecha Final</Text>
            <Input
              {...selectStyle}
              w={"10rem"}
              type="date"
              placeholder="Buscar por nombre producto.."
            ></Input>
          </Flex>
        </Flex>
        <Flex w={"100%"} alignItems={"center"}>
          <Text {...tableHeadStyle}>Id del pedido</Text>
          <Text {...tableHeadStyle}>Fecha entrega</Text>
          <Text {...tableHeadStyle}>Precio total</Text>
          <Text {...tableHeadStyle}>Estado</Text>
          <Text {...tableHeadStyle}>Acciones</Text>
        </Flex>
        <Flex>
          <Card w={"100%"}>
            <Flex alignItems={"center"} w={"100%"}>
              <Text {...tableHeadStyle}>99</Text>
              <Text {...tableHeadStyle}>24/04/2004</Text>
              <Text {...tableHeadStyle}>$999.9</Text>
              <Flex {...tableHeadStyle}>
                <Box
                  height={"2.3rem"}
                  width={"10rem"}
                  color={"white"}
                  fontWeight={"bold"}
                  borderRadius={"10px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  background={"orange"}
                >
                  En Delivery
                </Box>
              </Flex>

              <Flex
                {...tableHeadStyle}
                height={"5rem"}
                flexDir="column"
                justify={"center"}
                alignItems={"center"}
                gap={".5rem"}
              >
                <Button
                  width={"12rem"}
                  height={"2rem"}
                  color={"white"}
                  fontWeight={"bold"}
                  borderRadius={"10px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  background="#fd7e14"
                  _hover={{ background: "#b0570d" }}
                  as={Link}
                  to="/pedidos/1"
                >
                  Ver Detalle
                </Button>
                <Button
                  width={"12rem"}
                  height={"2rem"}
                  color={"white"}
                  fontWeight={"bold"}
                  borderRadius={"10px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  background="#fd7e14"
                  _hover={{ background: "#b0570d" }}
                >
                  Ver Factura
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Stack>
    </Container>
  );
};
