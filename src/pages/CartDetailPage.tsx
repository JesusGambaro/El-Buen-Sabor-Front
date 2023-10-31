import useMainStore from "@store/mainStore";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { notifications } from "@mantine/notifications";
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  ErrorMessage,
  Formik,
} from "formik";
import {
  CartItem as cartItem,
  CartProps,
  CartItem as CartType,
  Categoria,
  Producto,
  Carrito,
  Direccion,
  CartItem,
  Insumo,
  InsumoCarrito,
} from "types/types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { InputLabel } from "@mantine/core/lib/Input/InputLabel/InputLabel";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import useCatalogueStore from "@store/catalogueStore";
import { LandingCard } from "@components/app/Landing/Cards/LandingProductCard";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import {
  Card,
  Container,
  Flex,
  Image,
  Tabs,
  Text,
  Title,
  useMantineColorScheme,
  ActionIcon,
  Menu,
  Loader,
  createStyles,
  Button,
  Stack,
  Anchor,
  Switch,
  Input,
  Select,
  Modal,
  Textarea,
  Box,
  Transition,
  Mark,
  Skeleton,
  Overlay,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconBuildingStore,
  IconCar,
  IconCards,
  IconCash,
  IconCheck,
  IconCreditCard,
  IconCurrency,
  IconCurrencyDollar,
  IconMinus,
  IconPlus,
  IconTruckDelivery,
  IconX,
} from "@tabler/icons-react";
import axios from "axios";
import { CreateCartFunc } from "@components/app/Cart/CreateCartFunc";
interface responsePrefId {
  preferenceId: string;
}

export const CartDetailPage = () => {
  const { cart: carrito, setCarrito, token } = useMainStore();
  type QueryPropsProductos = {
    data: Producto[];
    error: any;
    isLoading: boolean;
  };
  const { data: productos } = useApiQuery(
    "GET|producto",
    null
  ) as QueryPropsProductos;
  const mobile = useMediaQuery(`(max-width: 700px)`);
  function obtenerElementosAlAzar(
    array: Producto[],
    cantidad: number
  ): Producto[] {
    const elementosAlAzar: Producto[] = [];

    // Copia el array original para no modificarlo

    // Obtiene elementos al azar hasta alcanzar la cantidad deseada
    while (elementosAlAzar.length < cantidad && array.length > 0) {
      // Genera un índice aleatorio válido dentro del rango del array copiado
      const indice = Math.floor(Math.random() * array.length);

      // Obtiene el elemento aleatorio y lo elimina del array copiado
      const elemento = array.splice(indice, 1)[0];
      //console.log(elemento);

      // Agrega el elemento aleatorio al array de elementos al azar
      elementosAlAzar.push(elemento);
    }

    return elementosAlAzar;
  }
  const [loading, setLoading] = useState(false);
  const [tipoEntrega, setTipoEntrega] = useState(0);
  const [tipoPago, setTipoPago] = useState(0);
  const [elementosAlAzar, setelementosAlAzar] = useState([] as Producto[]);
  useEffect(() => {
    if (productos && productos.length) {
      setelementosAlAzar(obtenerElementosAlAzar(productos, 5));
    }
  }, [productos]);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const [prefId, setPrefId] = useState("");

  const [activeTab, setActiveTab] = useState<string | null>("productos");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const useStyles = createStyles((theme) => ({
    tipoEntregaCheck: {
      border: "2px solid orange",
      width: ".5rem",
      height: ".5rem",
      transition: "0.2s ease all",
      "&:hover": {
        scale: "1.3",
        background: "orange",
        color: "white",
      },
    },
    tipoEntregaCheckActive: {
      border: "2px solid orange",
      width: ".5rem",
      height: ".5rem",
      background: "orange",
      color: "white",
      scale: "1.3",
      cursor: "default",
      transition: "0.2s ease all",
      "&:hover": {
        background: "orange",
        color: "white",
      },
    },
    checkContainer: {
      width: "3rem",
    },
    text: {
      color: theme.colorScheme !== "dark" ? theme.colors.dark[6] : theme.white,
    },
    textInverted: {
      color: theme.colors.dark[6],
    },
    pedidoInfo: {
      marginLeft: "-10%",
      opacity: 0,
      transition: ".2s ase all",
    },
    pedidoInfoActive: {
      marginLeft: "0",
      opacity: 1,
      transition: ".2s ease all",
    },
    detailContainer: {
      fontSize: ".8rem",
    },
  }));
  const { classes } = useStyles();
  //"EN_PROCESO"
  type Pedido = {
    esMercadoPago: boolean;
    costoEnvio: number;
    descuentoPagoEfectivo: number;
    totalCostoPedido: number;
    estado: string;
    esDelivery: boolean;
    direccionId?: number;
  };
  const [pedido, setPedido] = useState<Pedido>({
    esDelivery: true,
    esMercadoPago: true,
    costoEnvio: 500,
    descuentoPagoEfectivo: 0,
    totalCostoPedido: carrito ? carrito.totalCompra : 0,
    estado: "EN_PROCESO",
  });

  // Función para calcular la sumatoria de la propiedad "cantidad" en el arreglo de "productosManufacturados"
  function calcularSumaCantidad() {
    // Verificamos que el objeto "carrito" no sea nulo y que el arreglo "productosManufacturados" exista
    if (
      carrito &&
      carrito.productosManufacturados &&
      carrito.productosManufacturados.length > 0
    ) {
      let sumaCantidad = 0;
      // Iteramos sobre los objetos dentro del arreglo "productosManufacturados"
      for (const producto of carrito.productosManufacturados) {
        // Sumamos la propiedad "cantidad" de cada objeto al total
        sumaCantidad += producto.cantidad;
      }
      return sumaCantidad;
    } else {
      // Si el objeto "carrito" es nulo o no tiene elementos en "productosManufacturados", devolvemos 0
      return 0;
    }
  }
  const calculoTotalCarrito = () => {
    let totalCarrito = carrito?.totalCompra;
    if (!totalCarrito) {
      return 0;
    }
    if (pedido.esDelivery) {
      totalCarrito += 500;
    }
    if (!pedido.esMercadoPago) {
      totalCarrito -= totalCarrito * 0.15;
    }
    return totalCarrito;
  };
  const totalCarrito = calculoTotalCarrito();
  // Llamamos a la función para obtener la sumatoria de la propiedad "cantidad"
  const sumatoriaCantidad = calcularSumaCantidad();
  const { data: insumosAgregados } = useApiQuery(
    "GET|insumo/getAgregados",
    null
  ) as {
    data: InsumoCarrito[];
    error: any;
    isLoading: boolean;
  };
  const {
    mutate: buyCart,
    data: buyCartData,
    isLoading: isLoadingBuyCart,
  } = useApiMutation("POST|checkout");
  const handleComprar = () => {
    if (pedido.esMercadoPago) {
      initMercadoPago("TEST-50126389-bcb6-4e53-a669-c8620ea69726");
    }
    buyCart(pedido);
  };
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Buy Cart", buyCartData);
    if (buyCartData) {
      if (pedido.esMercadoPago) {
        setPrefId(buyCartData.preferenceId);
        setShowPaymentButton(true);
      } else {
        if (buyCartData.exito) {
          setCarrito({
            productosAgregados: [],
            productosManufacturados: [],
            totalCompra: 0,
          });
          navigate("/");
        }
      }
    }
  }, [buyCartData]);

  return (
    <Flex
      maw="container.2xl"
      w={"100%"}
      direction="column"
      c="start"
      align="center"
      justify="center"
      bg={dark ? "#3e3e3e" : "#e6e6e6"}
      p={"1rem"}
      mih="100vh"
      pos={"relative"}
      gap={"1rem"}
    >
      <LoadingOverlay
        pb={"20%"}
        visible={isLoadingBuyCart}
        zIndex={1000}
        loaderProps={{ color: "orange" }}
      />
      <Title className={classes.text} order={2}>
        Carrito de compras
      </Title>

      <Flex
        w={"100%"}
        direction="row"
        c="start"
        justify="center"
        bg={dark ? "#3e3e3e" : "#e6e6e6"}
        p={"1rem"}
        mih="100vh"
        pos={"relative"}
        gap={"1rem"}
        wrap={"wrap"}
      >
        <Tabs value={activeTab} onTabChange={setActiveTab}>
          <Tabs.Panel value="productos">
            <Container
              w={"40rem"}
              bg={"white"}
              p={"1rem"}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "15px",
                gap: "1rem",
              }}
            >
              <Title className={classes.textInverted}>Productos</Title>
              <Flex
                mah={"30rem"}
                pr={".5rem"}
                style={{ overflowY: "scroll" }}
                direction={"column"}
              >
                <Flex gap={"1rem"} direction={"column"}>
                  {carrito?.productosManufacturados?.length ? (
                    <>
                      {carrito?.productosManufacturados?.map((p, i) => {
                        return (
                          <CartDetailItemCard
                            key={i}
                            producto={p}
                            editCartRuta="cart/editProduct"
                            delCompletoRuta="PUT|cart/delProductCompleto"
                            setLoading={setLoading}
                            loading={loading}
                          ></CartDetailItemCard>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <Title  order={4} className={classes.textInverted}>
                          No hay productos{" "}
                          <Link to={"/catálogo"} style={{color:"orange"}}>Click aqui para Agregar</Link>
                      </Title>
                    </>
                  )}
                </Flex>
                {carrito?.productosAgregados?.length ? (
                  <>
                    <Title order={4} className={classes.textInverted}>
                      Productos Agregados
                    </Title>
                    <Flex gap={"1rem"} direction={"column"}>
                      {carrito.productosAgregados.map((insumo, i) => {
                        return (
                          // <CartComplementItem
                          //   key={i}
                          //   insumo={insumo}
                          // ></CartComplementItem>
                          <CartDetailItemCard
                            key={i}
                            producto={insumo}
                            editCartRuta="cart/editCompleto"
                            delCompletoRuta="PUT|cart/delComplementoCompleto"
                            setLoading={setLoading}
                            loading={loading}
                          ></CartDetailItemCard>
                        );
                      })}
                    </Flex>
                  </>
                ) : (
                  <></>
                )}
              </Flex>
            </Container>
          </Tabs.Panel>
          <Tabs.Panel value="detalle-pedido">
            <Container
              w={"40rem"}
              bg={"white"}
              p={"1rem"}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "15px",
                gap: "1rem",
              }}
            >
              <Title className={classes.textInverted}>
                Informacion Adicional
              </Title>
              <Flex gap={"1rem"} direction={"column"}>
                <CartForm
                  setDireccion={(direccion?: number) => {
                    setPedido({ ...pedido, direccionId: direccion });
                  }}
                ></CartForm>
              </Flex>
              <Button
                h={"3rem"}
                p={".5rem"}
                type="reset"
                onClick={() => {
                  setActiveTab("productos");
                }}
                color="red"
              >
                <Text size={20} weight={"bold"}>
                  Volver
                </Text>
              </Button>
            </Container>
          </Tabs.Panel>
        </Tabs>
        {!carrito?.productosManufacturados?.length ? (
          <></>
        ) : (
          <>
            <Container m={0}>
              <Flex
                miw={"5rem"}
                bg={"white"}
                p={"1rem"}
                m={0}
                style={{
                  flexDirection: "column",
                  borderRadius: "15px",
                  gap: "1rem",
                  flexGrow: 0,
                }}
                className={classes.detailContainer}
              >
                <Title order={3} className={classes.textInverted}>
                  Resumen del pedido
                </Title>
                <Flex gap={"1.5rem"} direction={"column"}>
                  <Flex justify={"space-between"}>
                    <Text className={classes.textInverted}>
                      Productos{` (${sumatoriaCantidad})`}
                    </Text>
                    <Text
                      color="black"
                      w={"5rem"}
                      display={"flex"}
                      style={{ justifyContent: "center", alignItems: "end" }}
                    >
                      <Text color="orange">
                        <i className="fa-solid fa-dollar-sign"></i>
                      </Text>
                      <Text className={classes.textInverted}>
                        {carrito?.totalCompra}
                      </Text>
                    </Text>
                  </Flex>
                  <Flex justify={"space-between"} align={"center"}>
                    <Text className={classes.textInverted}>
                      Tipo de entrega
                    </Text>
                    <Flex gap={"1rem"}>
                      <Stack className={classes.checkContainer} align="center">
                        <Text
                          className={classes.textInverted}
                          weight={"bold"}
                          size={10}
                        >
                          Delivery
                        </Text>
                        <ActionIcon
                          onClick={() => {
                            setTipoEntrega(0);
                            setPedido({
                              ...pedido,
                              esDelivery: true,
                              costoEnvio: 100,
                            });
                          }}
                          disabled={!pedido.esMercadoPago}
                          color="orange"
                          className={
                            pedido.esDelivery
                              ? classes.tipoEntregaCheckActive
                              : classes.tipoEntregaCheck
                          }
                        >
                          <IconTruckDelivery></IconTruckDelivery>
                        </ActionIcon>
                      </Stack>
                      <Stack className={classes.checkContainer} align="center">
                        <Text
                          size={10}
                          className={classes.textInverted}
                          weight={"bold"}
                        >
                          Local
                        </Text>
                        <ActionIcon
                          onClick={() => {
                            setTipoEntrega(1);
                            setPedido({
                              ...pedido,
                              esDelivery: false,
                              costoEnvio: 0,
                            });
                          }}
                          color="orange"
                          className={
                            !pedido.esDelivery
                              ? classes.tipoEntregaCheckActive
                              : classes.tipoEntregaCheck
                          }
                        >
                          <IconBuildingStore></IconBuildingStore>
                        </ActionIcon>
                      </Stack>
                    </Flex>
                  </Flex>
                  <Flex justify={"space-between"} align={"center"}>
                    <Text className={classes.textInverted}>Tipo de pago</Text>
                    <Flex gap={"1rem"}>
                      <Stack className={classes.checkContainer} align="center">
                        <Text
                          size={10}
                          className={classes.textInverted}
                          weight={"bold"}
                        >
                          Tarjeta
                        </Text>
                        <ActionIcon
                          onClick={() => {
                            setTipoPago(0);
                            setPedido({
                              ...pedido,
                              esMercadoPago: true,
                              descuentoPagoEfectivo: 0,
                            });
                          }}
                          color="orange"
                          className={
                            tipoPago == 0
                              ? classes.tipoEntregaCheckActive
                              : classes.tipoEntregaCheck
                          }
                        >
                          <IconCreditCard></IconCreditCard>
                        </ActionIcon>
                      </Stack>
                      <Stack className={classes.checkContainer} align="center">
                        <Text
                          size={10}
                          className={classes.textInverted}
                          weight={"bold"}
                        >
                          Efectivo
                        </Text>
                        <ActionIcon
                          onClick={() => {
                            setTipoPago(1);
                            setPedido({
                              ...pedido,
                              esMercadoPago: false,
                              descuentoPagoEfectivo: 15,
                            });
                          }}
                          disabled={pedido.esDelivery}
                          color="orange"
                          className={
                            tipoPago == 1
                              ? classes.tipoEntregaCheckActive
                              : classes.tipoEntregaCheck
                          }
                        >
                          <IconCash></IconCash>
                        </ActionIcon>
                      </Stack>
                    </Flex>
                  </Flex>
                  <Flex
                    pos={"relative"}
                    h={pedido?.costoEnvio > 0 ? "min-content" : 0}
                    w={"100%"}
                  >
                    <Flex
                      className={
                        pedido?.costoEnvio > 0
                          ? classes.pedidoInfoActive
                          : classes.pedidoInfo
                      }
                      w={"100%"}
                      justify={"space-between"}
                    >
                      <Text className={classes.textInverted}>Costo Envio</Text>
                      <Text
                        color="black"
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
                        <Text className={classes.textInverted}>
                          {pedido?.costoEnvio}
                        </Text>
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    pos={"relative"}
                    h={pedido?.descuentoPagoEfectivo > 0 ? "min-content" : 0}
                    w={"100%"}
                  >
                    <Flex
                      className={
                        pedido?.descuentoPagoEfectivo > 0
                          ? classes.pedidoInfoActive
                          : classes.pedidoInfo
                      }
                      w={"100%"}
                      justify={"space-between"}
                    >
                      <Text className={classes.textInverted}>
                        Descuento pago efectivo
                      </Text>
                      <Text
                        color="black"
                        w={"5rem"}
                        display={"flex"}
                        style={{
                          justifyContent: "center",
                          alignItems: "end",
                        }}
                      >
                        <Text color="orange">%</Text>
                        <Text className={classes.textInverted}>
                          {pedido?.descuentoPagoEfectivo}
                        </Text>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Box w={"100%"} h={"1px"} bg={"black"}></Box>
                <Flex justify={"space-between"}>
                  <Text className={classes.textInverted} weight={"bold"}>
                    Total
                  </Text>
                  <Text
                    color="black"
                    w={"5rem"}
                    display={"flex"}
                    style={{ justifyContent: "center", alignItems: "end" }}
                  >
                    <Text color="orange">
                      <i className="fa-solid fa-dollar-sign"></i>
                    </Text>
                    <Text>{totalCarrito}</Text>
                  </Text>
                </Flex>
                {carrito?.productosManufacturados.length ? (
                  isLoadingBuyCart ? (
                    <Flex w={""}>
                      <Loader></Loader>
                    </Flex>
                  ) : showPaymentButton && prefId != "" ? (
                    <Flex id="wallet_container">
                      <Wallet initialization={{ preferenceId: prefId }} />
                    </Flex>
                  ) : (
                    <Button
                      h={"3rem"}
                      p={".5rem"}
                      onClick={() => {
                        if (activeTab == "productos") {
                          setActiveTab("detalle-pedido");
                        } else {
                          handleComprar();
                        }
                      }}
                    >
                      <Text size={20} weight={"bold"}>
                        {activeTab == "productos" ? "Continuar" : "Comprar"}
                      </Text>
                    </Button>
                  )
                ) : (
                  <></>
                )}
              </Flex>
            </Container>
            <Container
              w={"100%"}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Title order={3} className={classes.text}>
                Quiza te puede interesar
              </Title>
              <Flex>
                {insumosAgregados?.map((insumo) => {
                  return (
                    <CartComplementItem insumo={insumo}></CartComplementItem>
                  );
                })}
              </Flex>
            </Container>
          </>
        )}
      </Flex>
    </Flex>
  );
};

const CartComplementItem = ({ insumo }: { insumo: InsumoCarrito }) => {
  const {
    mutate: addProduct,
    data: addedData,
    isLoading: isLoadingAdd,
  } = useApiMutation("PUT|cart/addProduct");
  const {
    mutate: delProducto,
    data: removedData,
    isLoading: isLoadingDel,
  } = useApiMutation("PUT|cart/delProduct");
  const handleDeleteItem = () => {
    //delProducto({ id: producto.productoId });
  };
  const handleAddItem = () => {
    //addProduct({ id: producto.productoId });
  };
  const { setCarrito, setLoading } = useMainStore();
  useEffect(() => {
    if (addedData) {
      //setCarrito(addedData);
    } else if (removedData) {
      //setCarrito(removedData);
    }
  }, [addedData, removedData]);

  const useStyles = createStyles((theme) => ({
    buttonCantidad: {
      backgroundColor: "transparent",
      [`&:hover`]: {
        backgroundColor: "orange",
        color: "red",
        iconSearch: {
          color: "red",
        },
      },
    },
    card: {
      marginTop: "1rem",
      backgroundColor: "white",
      boxShadow: "0 0 10px -5px black",
      overflow: "visible",
    },
  }));
  const { classes } = useStyles();

  return (
    <Card
      w={"6rem"}
      withBorder
      style={{
        display: "flex",
        borderRadius: "15px",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        overflow: "visible",
        flexDirection: "column",
      }}
    >
      <Image
        src={insumo.urlIMG ? insumo.urlIMG : insumo.urlImg}
        width={70}
        alt="imagen insumo"
      />
      <Stack w={"10rem"} spacing={3} justify="center" align="center">
        <Text
          w={"5rem"}
          display={"flex"}
          style={{ justifyContent: "center", alignItems: "end" }}
        >
          <Text color="orange">
            <i className="fa-solid fa-dollar-sign"></i>
          </Text>
          <Text>{insumo.precioTotal ? insumo.precioTotal : insumo.costo}</Text>
        </Text>
        {!insumo.costo ? (
          <Flex
            direction="row"
            bg={"orange"}
            justify={"center"}
            align={"center"}
            gap={5}
            w={"5rem"}
            style={{ borderRadius: "5px", padding: "0.1rem" }}
          >
            {isLoadingAdd || isLoadingDel ? (
              <Loader color="white" variant="dots" />
            ) : (
              <>
                {insumo?.cantidad == 1 ? (
                  <Menu
                    transitionProps={{
                      transition: "rotate-right",
                      duration: 150,
                    }}
                    withArrow
                    width={300}
                    position="bottom-end"
                    shadow="md"
                  >
                    <Menu.Target>
                      <ActionIcon className={classes.buttonCantidad} size={20}>
                        <IconMinus color="white"></IconMinus>
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown w={"100%"}>
                      <Menu.Label>
                        <Text align="center">
                          ¿Esta seguro de eliminar el item del carrito?
                        </Text>{" "}
                      </Menu.Label>
                      <Menu.Item
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        display={"flex"}
                        dir="row"
                      >
                        <Flex
                          w={"100%"}
                          justify={"space-between"}
                          align={"center"}
                        >
                          <Button
                            onClick={() => {
                              handleDeleteItem();
                            }}
                          >
                            Confirmar
                          </Button>
                          <Button color="red">Cancelar</Button>
                        </Flex>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                ) : (
                  <ActionIcon
                    onClick={() => {
                      handleDeleteItem();
                    }}
                    className={classes.buttonCantidad}
                    size={20}
                  >
                    <IconMinus color="white"></IconMinus>
                  </ActionIcon>
                )}

                <Text color="white">{insumo.cantidad}</Text>
                <ActionIcon
                  onClick={() => {
                    handleAddItem();
                  }}
                  className={classes.buttonCantidad}
                  size={20}
                >
                  <IconPlus color="white"></IconPlus>
                </ActionIcon>
              </>
            )}
          </Flex>
        ) : (
          <Button w={"5rem"} color="orange">
            <Text size={11}>Agregar</Text>{" "}
          </Button>
        )}
      </Stack>
    </Card>
  );
};

const CartDetailItemCard = ({
  producto,
  editCartRuta,
  delCompletoRuta,
  setLoading,
  loading,
}: {
  producto: any;
  editCartRuta: string;
  delCompletoRuta: string;
  setLoading: (val: boolean) => void;
  loading: boolean;
}) => {
  const [delCompleteMenu, setdelCompleteMenu] = useState(false);
  const [rutaAdicional, setRutaAdicional] = useState("PUT|");
  const {
    mutate: editCarrito,
    data: editCarritoData,
    isLoading: isLoadingCarrito,
  } = useApiMutation(rutaAdicional + editCartRuta);

  const {
    mutate: delProductoCompleto,
    data: removedDataCompleta,
    isLoading: isLoadingDelCompleto,
  } = useApiMutation(delCompletoRuta);

  const handleDeleteComplete = async () => {
    setLoading(true);
    notifications.cleanQueue();
    notifications.show({
      id: "deliting-cartItem",
      loading: true,
      title: "Eliminando del carrito",
      message: "Se esta eliminando su producto del carrito",
      autoClose: false,
      withCloseButton: false,
    });
    const DelProduct = async () => {
      return delProductoCompleto({
        id: producto.productoId ? producto.productoId : producto.id,
      });
    };
    await DelProduct().catch((err) => {
      notifications.update({
        id: "deliting-cartItem",
        title: "Ocurrio un error intente nuevamente",
        message: err,
        icon: (
          <ActionIcon color="white" bg={"red"} radius={"50%"}>
            <IconX color="white"></IconX>
          </ActionIcon>
        ),
        autoClose: 2000,
      });
    });
  };

  const handleEditCart = async (agregando: boolean) => {
    setLoading(true);
    notifications.clean();

    notifications.show({
      id: "edit-cartItem",
      loading: true,
      title: agregando ? "Añadiendo al carrito" : "Eliminando del carrito",
      message: agregando
        ? "Se esta guardando su producto al carrito"
        : "Se esta eliminando su producto del carrito",
      autoClose: false,
      withCloseButton: false,
    });
    const EditCart = async () => {
      return editCarrito({
        id: producto.productoId ? producto.productoId : producto.id,
      });
    };
    await EditCart()
      .then(() => {})
      .catch((err) => {
        notifications.update({
          id: "edit-cartItem",
          title: "Ocurrio un error intente nuevamente",
          message: err,
          icon: (
            <ActionIcon color="white" bg={"red"} radius={"50%"}>
              <IconX color="white"></IconX>
            </ActionIcon>
          ),
          autoClose: 2000,
        });
      });
  };
  const { setCarrito } = useMainStore();
  useEffect(() => {
    const SetearCarritoEditado = async () => {
      if (editCarritoData) {
        let nuevoCarrito = CreateCartFunc(editCarritoData);
        await setCarrito(nuevoCarrito);
        setLoading(false);
        notifications.clean();
        notifications.show({
          id: "edit-cartItem",
          title: "Se edito el carrito correctamente",
          message: "",
          icon: (
            <ActionIcon color="white" bg={"orange"} radius={"50%"}>
              <IconCheck color="white"></IconCheck>
            </ActionIcon>
          ),
          autoClose: 500,
        });
      } else if (removedDataCompleta) {
        let nuevoCarrito = CreateCartFunc(removedDataCompleta);
        await setCarrito(nuevoCarrito);
        setLoading(false);
        notifications.cleanQueue();
        notifications.show({
          id: "deliting-cartItem",
          title: "Se elimino del carrito correctamente",
          message: "",
          icon: (
            <ActionIcon color="white" bg={"orange"} radius={"50%"}>
              <IconCheck color="white"></IconCheck>
            </ActionIcon>
          ),
          autoClose: 500,
        });
      }
    };
    SetearCarritoEditado();
  }, [editCarritoData, removedDataCompleta]);

  const useStyles = createStyles((theme) => ({
    buttonCantidad: {
      backgroundColor: "transparent",
      [`&:hover`]: {
        backgroundColor: "orange",
        color: "red",
        iconSearch: {
          color: "red",
        },
      },
    },
    card: {
      marginTop: "1rem",
      backgroundColor: "white",
      boxShadow: "0 0 10px -5px black",
      overflow: "visible",
    },
  }));
  const { classes } = useStyles();

  return loading ? (
    <>
      <Skeleton w={"100%"} h={"5.5rem"} radius={"15px"} />
    </>
  ) : (
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
      <Image src={producto.urlIMG} width={60} alt="imagen producto" />
      <Stack w={"20rem"} justify="center" align="start">
        <Text>{producto.nombre}</Text>
        <Menu
          transitionProps={{
            transition: "rotate-right",
            duration: 150,
          }}
          withArrow
          width={300}
          position="bottom"
          shadow="md"
          opened={delCompleteMenu}
        >
          <Menu.Target>
            <Anchor
              onClick={() => {
                setdelCompleteMenu(true);
              }}
              component="button"
              type="button"
            >
              Eliminar
            </Anchor>
          </Menu.Target>

          <Menu.Dropdown w={"100%"}>
            <Menu.Label>
              <Text align="center">
                ¿Esta seguro de eliminar el item del carrito?
              </Text>
            </Menu.Label>
            <Flex
              w={"100%"}
              p={"1rem"}
              justify={"space-between"}
              align={"center"}
            >
              <Button
                onClick={() => {
                  setdelCompleteMenu(false);
                  handleDeleteComplete();
                }}
              >
                Confirmar
              </Button>
              <Button
                color="red"
                onClick={() => {
                  setdelCompleteMenu(false);
                }}
              >
                Cancelar
              </Button>
            </Flex>
          </Menu.Dropdown>
        </Menu>
      </Stack>
      <Stack w={"10rem"} spacing={3} justify="center" align="center">
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
            <Text color="orange">-{producto.descuento}%</Text>
            <Text
              display={"flex"}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text color="orange">
                <i className="fa-solid fa-dollar-sign"></i>
              </Text>
              <Text strikethrough>{producto.precioTotalSinDescuento}</Text>
            </Text>
          </Text>
        )}

        <Text
          w={"5rem"}
          display={"flex"}
          style={{ justifyContent: "center", alignItems: "end" }}
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
          {producto?.cantidad == 1 ? (
            <Menu
              transitionProps={{
                transition: "rotate-right",
                duration: 150,
              }}
              withArrow
              width={300}
              position="bottom-end"
              shadow="md"
            >
              <Menu.Target>
                <ActionIcon className={classes.buttonCantidad} size={20}>
                  <IconMinus color="white"></IconMinus>
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown w={"100%"}>
                <Menu.Label>
                  <Text align="center">
                    ¿Esta seguro de eliminar el item del carrito?
                  </Text>{" "}
                </Menu.Label>
                <Menu.Item
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  display={"flex"}
                  dir="row"
                >
                  <Flex w={"100%"} justify={"space-between"} align={"center"}>
                    <Button
                      onClick={() => {
                        setRutaAdicional("DELETE|");
                        handleEditCart(false);
                      }}
                    >
                      Confirmar
                    </Button>
                    <Button color="red">Cancelar</Button>
                  </Flex>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <ActionIcon
              onClick={() => {
                setRutaAdicional("DELETE|");
                handleEditCart(false);
              }}
              className={classes.buttonCantidad}
              size={20}
            >
              <IconMinus color="white"></IconMinus>
            </ActionIcon>
          )}

          <Text color="white">{producto.cantidad}</Text>
          <ActionIcon
            onClick={() => {
              setRutaAdicional("PUT|");
              handleEditCart(true);
            }}
            className={classes.buttonCantidad}
            size={20}
          >
            <IconPlus color="white"></IconPlus>
          </ActionIcon>
        </Flex>
      </Stack>
    </Card>
  );
};
const CartForm = ({
  setDireccion,
  faltaDireccion,
}: {
  setDireccion: (dir?: number) => void;
  faltaDireccion?: boolean;
}) => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    window.location.href = "/";
  }

  interface QueryProps {
    data: Direccion[];
    error: any;
    isLoading: boolean;
  }

  const {
    mutate: addDirection,
    data: addedDataDirection,
    isLoading: direccionLoading,
  } = useApiMutation("POST|direcciones/addDireccion");
  const { direcciones, loading, setDirecciones } = useMainStore();
  const [directionLoading, setDirectionLoading] = useState(false);
  const { data: dataDirecciones, error } = useApiQuery(
    "GET|direcciones/getDirecciones",
    null
  ) as QueryProps;
  useEffect(() => {
    if (dataDirecciones && !direcciones) {
      setDirecciones(dataDirecciones);
    }
  }, [dataDirecciones]);
  useEffect(() => {
    if (addedDataDirection) {
      setDirecciones(addedDataDirection);
    }
  }, [addedDataDirection]);
  const useStyles = createStyles((theme) => ({
    text: {
      color: theme.colorScheme !== "dark" ? theme.colors.dark[6] : theme.white,
    },
    textInverted: {
      color: theme.colors.dark[6],
    },
  }));
  const { classes: textClasses } = useStyles();

  const dataSelect = direcciones?.map((direccion) => ({
    value: `${direccion.id}`,
    label: `${direccion.departamento}, ${direccion.calleNombre}, ${direccion.numeracion}`,
  }));
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Flex gap={5} direction={"column"}>
        <Title
          mt={"0.5rem"}
          mb={"0.5rem"}
          order={4}
          className={textClasses.textInverted}
        >
          Direccion{" "}
          <Mark
            bg={"transparent"}
            style={{ fontWeight: "bold", color: "orange" }}
          >
            *
          </Mark>
        </Title>
        {faltaDireccion ? (
          <Title style={{ fontWeight: "bold", color: "orange" }} order={6}>
            Este campo es obligatorio
          </Title>
        ) : (
          <></>
        )}
        <Flex w={"100%"} gap={30} justify={"space-between"}>
          <Select
            placeholder="Elige una direccion"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              open();
              return null;
            }}
            data={dataSelect?.length ? dataSelect : []}
            style={{ flexGrow: "1" }}
            clearable
            onChange={(id) => {
              if (id != null) {
                setDireccion(Number.parseInt(id));
              } else {
                console.log(id);
                setDireccion();
              }
            }}
          />
          <Button onClick={open}>Crear Direccion</Button>
        </Flex>
      </Flex>
      <Modal
        opened={opened}
        onClose={!directionLoading ? close : () => {}}
        closeOnClickOutside={false}
        title={
          <Title
            mt={"0.5rem"}
            mb={"0.5rem"}
            order={3}
            className={textClasses.text}
          >
            Crea una direccion
          </Title>
        }
        centered
      >
        <ModalAddDirection
          setDirectionLoading={(directionLoading: boolean) => {
            setDirectionLoading(directionLoading);
          }}
          onClose={close}
        ></ModalAddDirection>
      </Modal>
    </>
  );
};

const ModalAddDirection = ({
  setDirectionLoading,
  onClose,
}: {
  setDirectionLoading: (directionLoading: boolean) => void;
  onClose: () => void;
}) => {
  const [newDireccion, setNewDireccion] = useState<Direccion>({
    aclaracion: "",
    calleNombre: "",
    departamento: "",
    nroPiso: 0,
    numeracion: 0,
    id: -1,
  });
  const useStyles = createStyles((theme) => ({
    text: {
      color: theme.colorScheme !== "dark" ? theme.colors.dark[6] : theme.white,
      fontWeight: "bold",
    },
    textInverted: {
      color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    },
  }));
  const { classes: textClasses } = useStyles();
  const {
    mutate: addDirection,
    data: addedDataDirection,
    isLoading: direccionLoading,
  } = useApiMutation("POST|direcciones/addDireccion");
  const { direcciones, loading, setDirecciones } = useMainStore();
  const addDirecctionToUser = async (values: Direccion) => {
    //updateCart({ ...item, quantity: item.quantity + 1 });
    await addDirection(values);
  };
  const addDirecctionToUserHandler = async (values: Direccion) => {
    try {
      setDirectionLoading(true);

      notifications.show({
        id: "adding-direccion",
        loading: true,
        title: "Añadiendo la direccion",
        message: "Se esta guardando su direccion",
        autoClose: false,
        withCloseButton: false,
      });
      await addDirecctionToUser(values).catch((err) => {
        notifications.update({
          id: "adding-direccion",
          title: "Ocurrio un error intente nuevamente",
          message: err,
          icon: (
            <ActionIcon color="white" bg={"red"} radius={"50%"}>
              <IconX color="white"></IconX>
            </ActionIcon>
          ),
          autoClose: 2000,
        });
      });
    } catch (error) {
      setDirectionLoading(false);
      console.log(error);

      notifications.update({
        id: "adding-direccion",
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
  useEffect(() => {
    //console.log("cartEdited", data);
    if (addedDataDirection) {
      setDirecciones(addedDataDirection);
      setDirectionLoading(false);
      onClose();
      notifications.update({
        id: "adding-direccion",
        title: "Se añadio la direcccion correctamente",
        message: "",
        icon: (
          <ActionIcon color="white" bg={"orange"} radius={"50%"}>
            <IconCheck color="white"></IconCheck>
          </ActionIcon>
        ),
        autoClose: 2000,
      });
    }
  }, [addedDataDirection]);
  return (
    <Formik
      validationSchema={Yup.object({
        departamento: Yup.string().required("*Campo requerido"),
        calleNombre: Yup.string().required("*Campo requerido"),
        numeracion: Yup.number()
          .moreThan(0, "Ingrese un valor valido")
          .required("*Campo requerido"),
      })}
      initialValues={newDireccion}
      enableReinitialize={true}
      onSubmit={async (values) => {
        addDirecctionToUserHandler(values);
      }}
    >
      {(Formik) => (
        <>
          <Form autoComplete="off" className="form-direccion">
            <Flex direction={"column"} gap={20}>
              <Input.Wrapper
                id="input-departamento"
                withAsterisk
                label={<span className={textClasses.text}>Departamento</span>}
                error={
                  Formik.touched.departamento ? Formik.errors.departamento : ""
                }
                w={"100%"}
              >
                <Input
                  onChange={(e) => {
                    Formik.setFieldValue("departamento", e.target.value);
                  }}
                  name="departamento"
                  placeholder="Tu departamento..."
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="input-departamento"
                withAsterisk
                label={<span className={textClasses.text}>Calle</span>}
                error={
                  Formik.touched.calleNombre ? Formik.errors.calleNombre : ""
                }
                w={"100%"}
              >
                <Input
                  onChange={(e) => {
                    Formik.setFieldValue("calleNombre", e.target.value);
                  }}
                  name="calleNombre"
                  placeholder="Tu calle..."
                />
              </Input.Wrapper>
              <Flex wrap={"wrap"} justify={"space-between"} gap={20}>
                <Input.Wrapper
                  id="input-departamento"
                  withAsterisk
                  label={<span className={textClasses.text}>Numeracion</span>}
                  error={
                    Formik.touched.numeracion ? Formik.errors.numeracion : ""
                  }
                  style={{ flexBasis: "10rem", flexGrow: "1" }}
                >
                  <Input
                    onChange={(e) => {
                      Formik.setFieldValue("numeracion", e.target.value);
                    }}
                    type="number"
                    name="numeracion"
                    placeholder="Tu numeracion..."
                  />
                </Input.Wrapper>
                <Input.Wrapper
                  id="input-departamento"
                  label={<span className={textClasses.text}>Nro de Piso</span>}
                  style={{ flexBasis: "10rem", flexGrow: "1" }}
                >
                  <Input
                    onChange={(e) => {
                      Formik.setFieldValue("nroPiso", e.target.value);
                    }}
                    type="number"
                    name="nroPiso"
                    placeholder="Tu Nro de Piso..."
                  />
                </Input.Wrapper>
              </Flex>
              <Input.Wrapper
                id="input-aclaracion"
                label={<span className={textClasses.text}>Aclaracion</span>}
                error={
                  Formik.touched.aclaracion ? Formik.errors.aclaracion : ""
                }
                w={"100%"}
              >
                <Textarea
                  onChange={(e) => {
                    Formik.setFieldValue("aclaracion", e.target.value);
                  }}
                  autosize
                  minRows={4}
                  maxRows={8}
                  name="aclaracion"
                  placeholder="Tu aclaracion..."
                />
              </Input.Wrapper>
              <Button
                type="submit"
                style={{ pointerEvents: direccionLoading ? "none" : "all" }}
                color="orange"
              >
                {!direccionLoading ? "Guardar Direccion" : "Guardando..."}
              </Button>
            </Flex>
          </Form>
        </>
      )}
    </Formik>
  );
};
