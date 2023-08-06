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
  Category,
  Product,
  Carrito,
  Direccion,
  CartItem,
} from "types/types";
import { Link, useLocation } from "react-router-dom";
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
interface responsePrefId {
  preferenceId: string;
}
export const CartDetailPage = () => {
  const { cart: carrito, loading, setCarrito, setLoading } = useMainStore();
  type QueryPropsProductos = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };
  const { data: productos } = useApiQuery(
    "GET|producto",
    null
  ) as QueryPropsProductos;
  const mobile = useMediaQuery(`(max-width: 700px)`);
  function obtenerElementosAlAzar(
    array: Product[],
    cantidad: number
  ): Product[] {
    const elementosAlAzar: Product[] = [];

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
  const [tipoEntrega, setTipoEntrega] = useState(0);
  const [tipoPago, setTipoPago] = useState(0);
  const [elementosAlAzar, setelementosAlAzar] = useState([] as Product[]);
  useEffect(() => {
    if (productos && productos.length) {
      setelementosAlAzar(obtenerElementosAlAzar(productos, 5));
    }
  }, [productos]);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const [prefId, setPrefId] = useState("");
  const mercadoPagoPayment = async (cart: Carrito) => {
    let cantArticulos = cart.productosComprados.reduce(
      (sum, producto) => sum + producto.cantidad,
      0
    );
    try {
      initMercadoPago("TEST-f9a81470-5f5f-467c-85fe-e3d799f97788", {
        locale: "es-AR",
      });
      const orderItem = {
        code: cart.totalCompra + "-" + cantArticulos,
        title: `${cantArticulos} artículos`,
        description: new Date(),
        price: cart.totalCompra,
      };
      // const pref_id: responsePrefId = await createPreferenceMP(orderItem);
      setPrefId("http://localhost:5173/carrito");
      setShowPaymentButton(true);
    } catch (error) {
      console.log(error);
    }
  };
  const [activeTab, setActiveTab] = useState<string | null>("productos");
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const useStyles = createStyles((theme) => ({
    tipoEntregaCheck: {
      border: "2px solid orange",
      width: "2rem",
      height: "2rem",
      transition: "0.2s ease all",
      "&:hover": {
        scale: "1.3",
        background: "orange",
        color: "white",
        marginTop: "-0.1rem",
      },
    },
    tipoEntregaCheckActive: {
      border: "2px solid orange",
      width: "2rem",
      height: "2rem",
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
  }));
  const { classes } = useStyles();
  type Pedido = {
    tipoEntrega: string;
    tipoPago: string;
    costoEnvio: number;
    descuentoPagoEfectivo: number;
    totalCostoPedido: number;
  };
  const [pedido, setPedido] = useState<Pedido>({
    tipoEntrega: "Delivery",
    tipoPago: "Tarjeta",
    costoEnvio: 100,
    descuentoPagoEfectivo: 0,
    totalCostoPedido: carrito ? carrito.totalCompra : 0,
  });

  // Función para calcular la sumatoria de la propiedad "cantidad" en el arreglo de "productosComprados"
  function calcularSumaCantidad() {
    // Verificamos que el objeto "carrito" no sea nulo y que el arreglo "productosComprados" exista
    if (
      carrito &&
      carrito.productosComprados &&
      carrito.productosComprados.length > 0
    ) {
      let sumaCantidad = 0;
      // Iteramos sobre los objetos dentro del arreglo "productosComprados"
      for (const producto of carrito.productosComprados) {
        // Sumamos la propiedad "cantidad" de cada objeto al total
        sumaCantidad += producto.cantidad;
      }
      return sumaCantidad;
    } else {
      // Si el objeto "carrito" es nulo o no tiene elementos en "productosComprados", devolvemos 0
      return 0;
    }
  }
  // Llamamos a la función para obtener la sumatoria de la propiedad "cantidad"
  const sumatoriaCantidad = calcularSumaCantidad();
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
      <Title className={classes.text} order={1}>
        El Buen Sabor
      </Title>
      <Title className={classes.text} order={2}>
        Carrito de compras
      </Title>

      {loading ? (
        <Loader size={"5rem"} color="orange"></Loader>
      ) : (
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
                <Flex gap={"1rem"} direction={"column"}>
                  {carrito?.productosComprados?.map((p) => {
                    return (
                      <CartDetailItemCard producto={p}></CartDetailItemCard>
                    );
                  })}
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
                  <CartForm></CartForm>
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

          <Container m={0}>
            <Flex
              miw={"25rem"}
              bg={"white"}
              p={"1rem"}
              m={0}
              style={{
                flexDirection: "column",
                borderRadius: "15px",
                gap: "1.5rem",
                flexGrow: 0,
              }}
            >
              <Title className={classes.textInverted}>Resumen del pedido</Title>
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
                  <Text className={classes.textInverted}>Tipo de entrega</Text>
                  <Flex gap={"2rem"}>
                    <Stack className={classes.checkContainer} align="center">
                      <Text
                        className={classes.textInverted}
                        size={13}
                        weight={"bold"}
                      >
                        Delivery
                      </Text>
                      <ActionIcon
                        onClick={() => {
                          setTipoEntrega(0);
                          setPedido({
                            ...pedido,
                            tipoEntrega: "Delivery",
                            costoEnvio: 100,
                          });
                        }}
                        color="orange"
                        className={
                          tipoEntrega == 0
                            ? classes.tipoEntregaCheckActive
                            : classes.tipoEntregaCheck
                        }
                      >
                        <IconTruckDelivery></IconTruckDelivery>
                      </ActionIcon>
                    </Stack>
                    <Stack className={classes.checkContainer} align="center">
                      <Text
                        className={classes.textInverted}
                        size={13}
                        weight={"bold"}
                      >
                        Local
                      </Text>
                      <ActionIcon
                        onClick={() => {
                          setTipoEntrega(1);
                          setPedido({
                            ...pedido,
                            tipoEntrega: "Local",
                            costoEnvio: 0,
                          });
                        }}
                        color="orange"
                        className={
                          tipoEntrega == 1
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
                  <Flex gap={"2rem"}>
                    <Stack className={classes.checkContainer} align="center">
                      <Text
                        className={classes.textInverted}
                        size={13}
                        weight={"bold"}
                      >
                        Tarjeta
                      </Text>
                      <ActionIcon
                        onClick={() => {
                          setTipoPago(0);
                          setPedido({
                            ...pedido,
                            tipoPago: "Tarjeta",
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
                        className={classes.textInverted}
                        size={13}
                        weight={"bold"}
                      >
                        Efectivo
                      </Text>
                      <ActionIcon
                        onClick={() => {
                          setTipoPago(1);
                          setPedido({
                            ...pedido,
                            tipoPago: "Efectivo",
                            descuentoPagoEfectivo: 15,
                          });
                        }}
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
                      <Text color="orange">
                        %
                      </Text>
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
                  <Text>{carrito?.totalCompra}</Text>
                </Text>
              </Flex>
              <Button
                h={"3rem"}
                p={".5rem"}
                onClick={() => {
                  setActiveTab("detalle-pedido");
                }}
              >
                <Text size={20} weight={"bold"}>
                  {activeTab == "productos" ? "Continuar" : "Comprar"}{" "}
                </Text>
              </Button>
            </Flex>
          </Container>
        </Flex>
      )}
    </Flex>
  );
};
const CartDetailItemCard = ({ producto }: { producto: CartItem }) => {
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
    delProducto({ id: producto.productoId });
  };
  const handleAddItem = () => {
    //updateCart({ ...item, quantity: item.quantity + 1 });
    addProduct({ id: producto.productoId });
  };
  const { setCarrito, setLoading } = useMainStore();
  useEffect(() => {
    if (addedData) {
      setLoading(true);
      setCarrito(addedData);
    } else if (removedData) {
      setLoading(true);
      setCarrito(removedData);
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
  const discountValue = (price: number = 0, discount: number) =>
    Math.floor(price - (price * discount) / 100);
  const { classes } = useStyles();
  return (
    <Card
      w={"100%"}
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
      <Image src={producto.imgURL} width={60} alt="Norway" />
      <Stack w={"20rem"} justify="center" align="start">
        <Text>{producto.producto}</Text>
        <Menu
          transitionProps={{
            transition: "rotate-right",
            duration: 150,
          }}
          withArrow
          width={300}
          position="bottom"
          shadow="md"
        >
          <Menu.Target>
            <Anchor component="button" type="button">
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
                  //handleDeleteItem();
                }}
              >
                Confirmar
              </Button>
              <Button color="red">Cancelar</Button>
            </Flex>
          </Menu.Dropdown>
        </Menu>
      </Stack>
      <Stack w={"10rem"} spacing={5} justify="center" align="center">
        {producto.descuento > 0 && (
          <Text
            display={"flex"}
            w={"5rem"}
            size={13}
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
              <Text>{producto.precioTotalSinDescuento}</Text>
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
          {isLoadingAdd || isLoadingDel ? (
            <Loader color="white" variant="dots" />
          ) : (
            <>
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

              <Text color="white">{producto.cantidad}</Text>
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
      </Stack>
    </Card>
  );
};
const CartForm = () => {
  const { user, isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    window.location.href = "/";
  }
  //console.log(user);
  interface MyFormValues {
    nombre: string;
    apellido: string;
    email: string;
    tipoEntrega: string;
  }
  const initialValues: MyFormValues = user
    ? {
        nombre: user.name ? user.name : "",
        apellido: user.name ? user.name : "",
        email: user.email ? user.email : "",
        tipoEntrega: "",
      }
    : { nombre: "", email: "", tipoEntrega: "", apellido: "" };

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
      console.log("termino");

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
      <Formik
        validationSchema={Yup.object({
          nombre: Yup.string().required("Campo requerido"),
          email: Yup.string()
            .email("Ingrese un email valido")
            .required("Campo requerido"),
        })}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {(Formik) => (
          <>
            <Form autoComplete="off">
              <Flex gap={5} direction={"column"}>
                <Flex
                  w={"100%"}
                  justify={"space-between"}
                  wrap={"wrap"}
                  gap={5}
                >
                  <Input.Wrapper
                    id="input-nombre"
                    withAsterisk
                    label={
                      <span
                        style={{ fontWeight: "bold", fontSize: "18px" }}
                        className={textClasses.textInverted}
                      >
                        Nombre Completo
                      </span>
                    }
                    error={Formik.errors.nombre}
                    w={"15rem"}
                  >
                    <Input
                      onChange={(e) => {
                        Formik.setFieldValue("nombre", e.target.value);
                      }}
                      name="nombre"
                      placeholder="Tu nombre..."
                    />
                  </Input.Wrapper>
                  <Input.Wrapper
                    id="input-nombre"
                    withAsterisk
                    label={
                      <span
                        style={{ fontWeight: "bold", fontSize: "18px" }}
                        className={textClasses.textInverted}
                      >
                        Email
                      </span>
                    }
                    error={Formik.errors.email}
                    w={"15rem"}
                  >
                    <Input
                      onChange={(e) => {
                        Formik.setFieldValue("email", e.target.value);
                      }}
                      name="email"
                      placeholder="Tu email..."
                    />
                  </Input.Wrapper>
                </Flex>
                <Title
                  mt={"0.5rem"}
                  mb={"0.5rem"}
                  order={4}
                  className={textClasses.textInverted}
                >
                  Direccion
                </Title>
                <Flex w={"100%"} gap={30} justify={"space-between"}>
                  <Select
                    placeholder="Elige una direccion"
                    searchable
                    nothingFound="No tenes direcciones"
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                      open();
                      return null;
                    }}
                    data={dataSelect?.length ? dataSelect : []}
                    style={{ flexGrow: "1" }}
                  />
                  <Button onClick={open}>Crear Direccion</Button>
                </Flex>
              </Flex>
            </Form>
          </>
        )}
      </Formik>
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
