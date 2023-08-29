import React from "react";
import {
  Container,
  Checkbox,
  Button,
  Input,
  Text,
  Flex,
  Modal,
  Stack,
  Select,
  Card,
  SimpleGrid,
  Box,
  useMantineColorScheme,
  createStyles,
  Title,
} from "@mantine/core";
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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const useStyles = createStyles((theme) => ({
    text: {
      color: dark ? "white" : "black",
    },
    tableHeadStyle : {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "20%",
    height: "2.5rem",
    border: "none",
    fontWeight: "bold",
  }
  }));
  const { classes } = useStyles();
  return (
    <Flex
      maw="container.2xl"
      miw={"100vh"}
      display="flex"
      direction="column"
      c="start"
      align="center"
      bg={dark ? "#3e3e3e" : "#e6e6e6"}
      p={"1rem"}
      mih="100vh"
    >
      <Stack spacing={3} w="100%">
        <Title className={classes.text} order={3} mb="1rem">
          Categorías
        </Title>
        <Title className={classes.text} order={3} mb="1rem">
          Filtros
        </Title>
        <Flex gap={"1rem"} justify={"flex-start"} align={"flex-end"}>
          <Select data={["Entregado","Cancelado","Enviando"]} {...selectStyle} placeholder="Buscar por estado..">
            
          </Select>
          <Input
            {...selectStyle}
            w={"20rem"}
            placeholder="Buscar por nombre producto.."
          ></Input>
          <Flex direction={"column"}>
            <Text weight={"bold"}>Fecha Inicial</Text>
            <Input
              {...selectStyle}
              w={"10rem"}
              type="date"
              placeholder="Buscar por nombre producto.."
            ></Input>
          </Flex>
          <Flex direction={"column"}>
            <Text weight={"bold"}>Fecha Final</Text>
            <Input
              {...selectStyle}
              w={"10rem"}
              type="date"
              placeholder="Buscar por nombre producto.."
            ></Input>
          </Flex>
        </Flex>
        <Flex w={"100%"} bg={"re"} align={"center"}>
          <Text className={classes.tableHeadStyle}>Id del pedido</Text>
          <Text className={classes.tableHeadStyle}>Fecha entrega</Text>
          <Text className={classes.tableHeadStyle}>Precio total</Text>
          <Text className={classes.tableHeadStyle}>Estado</Text>
          <Text className={classes.tableHeadStyle}>Acciones</Text>
        </Flex>
        <Flex>
          <Card w={"100%"}>
            <Flex align={"center"} w={"100%"}>
              <Text className={classes.tableHeadStyle}>99</Text>
              <Text className={classes.tableHeadStyle}>24/04/2004</Text>
              <Text className={classes.tableHeadStyle}>$999.9</Text>
              <Flex className={classes.tableHeadStyle}>
                <Box
                  h={"2.3rem"}
                  w={"10rem"}
                  style={{color:"white",borderRadius:"10px",fontWeight:"bold",justifyContent:"center",alignItems:"center"}}
                  display={"flex"}
                  bg={"orange"}
                >
                  En Delivery
                </Box>
              </Flex>

              <Flex
                className={classes.tableHeadStyle}
                h={"5rem"}
                direction="column"
                justify={"center"}
                align={"center"}
                gap={".5rem"}
              >
                <Button
                  w={"12rem"}
                  h={"2rem"}
                  color={"orange"}
                  style={{fontWeight:"bold",borderRadius:"10px",justifyContent:"center", alignItems:"center"}}
                 
                  display={"flex"}
                  
                 
                  component={Link}
                  to="/pedidos/1"
                >
                  Ver Detalle
                </Button>
                <Button
                  w={"12rem"}
                  h={"2rem"}
                  color={"orange"}
                   style={{fontWeight:"bold",borderRadius:"10px",justifyContent:"center", alignItems:"center"}}
                 
                >
                  Ver Factura
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Stack>
    </Flex>
  );
};
