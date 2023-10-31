import { useApiQuery } from "@hooks/useQueries";
import {
  Accordion,
  Box,
  Card,
  Flex,
  Image,
  Mark,
  Stack,
  Text,
  Title,
  createStyles,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { useParams } from "react-router-dom";
import { Line, Tex } from "tabler-icons-react";
import { Carrito, Direccion } from "types/types";
import "./GeneralStyles.scss";
type Pedidos = {
  pedidoID: number;
  carritoDTO: Carrito;
  direccionPedido: Direccion;
  esDelivery: boolean;
  esMercadoPago: boolean;
  estado: string;
  costeEnvio: number;
  descuentoAplicado: number;
  total: number;
  fechaInicio: string;
  fechaFinal: Date;
  fechaInicioString: string;
};
const PedidoDetailPage = () => {
  useMantineColorScheme;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { id } = useParams<{ id: string }>();
  const {
    data: pedido,
    error,
    isLoading: isLoadingPedidos,
  } = useApiQuery("GET|pedidos/getPedido/" + (id ? id : "")) as {
    data: Pedidos;
    error: boolean;
    isLoading: boolean;
  };
  const useStyles = createStyles((theme) => ({
    text: {
      fontSize: "1rem",
      color: "black",
      fontWeight: "normal",
    },
    textData: {
      fontSize: "1rem",

      color: "black",
      fontWeight: "bold",
    },
    mark: {
      color: "orange",
      fontWeight: "bold",
      background: "none",
    },
    dataContainer: {
      justifyContent: "space-between",
      alignItems: "center",
      width: "15rem",
    },
    control: {
      color: dark ? "white" : "black",
      background: dark ? "black" : "white",
    },
    panel: {
      background: "#fd7e14",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "1rem",
      gap: "1rem",
      width: "100%",
      minHeight: "6rem",
    },
    detalleCard: {
      width: "100%",
      height: "3rem",
      display: "flex",
      borderRadius: "15px",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "1rem",
      overflow: "visible",
    },
  }));
  const { classes, theme } = useStyles();
  const detalleItems = pedido
    ? [
        {
          label: "Tipo de entrega",
          text: pedido.esDelivery ? "Delivery" : "Retiro en local",
          faIconClassName: "fa-solid fa-bicycle",
        },
        {
          label: "Tipo de pago",
          text: pedido.esMercadoPago ? "Mercado pago" : "Efectivo",
          faIconClassName: "fa-solid fa-credit-card",
        },
        {
          label: "Fecha del pediodo",
          text: pedido?.fechaInicio.split("T")[0],
          faIconClassName: "fa-solid fa-calendar-days",
        },
        {
          label: "Estado del pedido",
          text: pedido?.estado.replace("_", " "),
          faIconClassName: "fa-solid fa-bag-shopping",
        },
      ]
    : [];
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
      <Title color={dark ? "white" : "black"} order={1} mb="2rem">
        Detalle Pedido
      </Title>
      {pedido ? (
        <>
          <Accordion
            w={"35rem"}
            color="black"
            variant="contained"
            transitionDuration={500}
            p={0}
            defaultValue={"Productos"}
          >
            <Accordion.Item value={"Productos"}>
              <Accordion.Control className={classes.control}>
                Productos
              </Accordion.Control>
              <Accordion.Panel bg={"#fd7e14"}>
                <Flex className={classes.panel}>
                  {pedido.carritoDTO?.productosManufacturados?.map(
                    (producto) => {
                      return (
                        <Card
                          w={"100%"}
                          h={"5.5rem"}
                          withBorder
                          style={{
                            display: "flex",
                            borderRadius: "15px",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "1rem",
                            overflow: "visible",
                          }}
                        >
                          <Image
                            src={producto.urlIMG}
                            width={60}
                            alt="imagen producto"
                          />
                          <Text>{producto.nombre}</Text>
                          <Stack
                            w={"10rem"}
                            spacing={3}
                            justify="center"
                            align="center"
                          >
                            {/* descuento */}
                            {producto.descuento > 0 && (
                              <Text
                                display={"flex"}
                                w={"5rem"}
                                size={10}
                                style={{
                                  gap: "0.5rem",
                                  justifyContent: "center",
                                  alignItems: "end",
                                }}
                              >
                                <Text color="orange">-{10}%</Text>
                                <Text
                                  display={"flex"}
                                  style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text color="orange">
                                    <i className="fa-solid fa-dollar-sign"></i>
                                  </Text>
                                  <Text strikethrough>
                                    {/* Total */}
                                    {producto.precioTotalSinDescuento}
                                  </Text>
                                </Text>
                              </Text>
                            )}

                            <Text
                              w={"5rem"}
                              display={"flex"}
                              style={{
                                justifyContent: "center",
                                alignItems: "end",
                              }}
                            >
                              <Text color="orange">
                                <i className="fa-solid fa-dollar-sign"></i>
                              </Text>
                              <Text>{producto.precioTotal}</Text>
                            </Text>
                            <Flex
                              direction="row"
                              bg={"orange"}
                              justify={"center"}
                              align={"center"}
                              gap={5}
                              w={"5rem"}
                              style={{ borderRadius: "5px", padding: "0.1rem" }}
                            >
                              <Text color="white">{producto.cantidad}</Text>
                            </Flex>
                          </Stack>
                        </Card>
                      );
                    }
                  )}
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value={"DetallesPedido"}>
              <Accordion.Control className={classes.control}>
                Detalles del pedido
              </Accordion.Control>
              <Accordion.Panel bg={"#fd7e14"}>
                <Flex className={classes.panel}>
                  {detalleItems.map((d) => {
                    return (
                      <Card className={classes.detalleCard}>
                        <i className={d.faIconClassName}></i>
                        <Flex direction={"column"} justify={"center"}>
                          <Text size={"10px"} weight={"normal"}>
                            {d.label}
                          </Text>
                          <Text size={"15px"} weight={"bold"}>
                            {d.text}
                          </Text>
                        </Flex>
                      </Card>
                    );
                  })}
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value={"Resumen"}>
              <Accordion.Control className={classes.control}>
                Resumen
              </Accordion.Control>
              <Accordion.Panel
                style={{ background: "#25262b" }}
                // bg={"#fd7e14"}
              >
                <Flex
                  className={classes.panel}
                  p={0}
                  bg={dark ? "#25262b" : "white"}
                  align={"center"}
                >
                  <Card className={classes.detalleCard} bg={"none"}>
                    <Flex w={"100%"} justify={"space-between"}>
                      <Text size={"13px"} weight={"normal"}>
                        Costo de envio
                      </Text>
                      <Text size={"15px"} weight={"bold"}>
                        {pedido.esDelivery ? (
                          <>
                            +<Mark className={classes.mark}>$</Mark>
                            {pedido.costeEnvio}
                          </>
                        ) : (
                          <Mark className={classes.mark}>-</Mark>
                        )}
                      </Text>
                    </Flex>
                  </Card>
                  <Box bg={"black"} w={"95%"} h={"1px"}></Box>
                  <Card className={classes.detalleCard} bg={"none"}>
                    <Flex w={"100%"} justify={"space-between"}>
                      <Text size={"13px"} weight={"normal"}>
                        Descuento total
                      </Text>
                      <Text size={"15px"} weight={"bold"}>
                        {pedido.descuentoAplicado > 0 ? (
                          <>
                            -<Mark className={classes.mark}>$</Mark>
                            {pedido.descuentoAplicado}
                          </>
                        ) : (
                          <Mark className={classes.mark}>-</Mark>
                        )}
                      </Text>
                    </Flex>
                  </Card>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
            <Card
              w={"100%"}
              h={"3rem"}
              style={{ borderRadius: "0rem 0rem 0.25rem  0.25rem " }}
              className={classes.control}
            >
              <Flex justify={"space-between"}>
                <Text>Total:</Text>
                <Text weight={"bold"}>
                  <Mark className={classes.mark}>$</Mark>
                  {pedido.total}
                </Text>
              </Flex>
            </Card>
          </Accordion>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default PedidoDetailPage;
