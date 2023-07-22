import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Mark,
  Select,
  SimpleGrid,
  Stack,
  Text,
  FormLabelProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  border,
  Card,
} from "@chakra-ui/react";
import useMainStore from "@store/mainStore";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Loader from "@app/Loader/Loader";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
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
} from "types/types";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { btnStyle } from "@utils/theme";
import CartItem from "@components/app/Cart/CartItem/CartItem";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { InputLabel } from "@mantine/core/lib/Input/InputLabel/InputLabel";
import { useMediaQuery } from "@mantine/hooks";
import useCatalogueStore from "@store/catalogueStore";
import { LandingCard } from "@components/app/Landing/Cards/LandingProductCard";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
interface responsePrefId {
  preferenceId: string;
}
export const CartDetailPage = () => {
  const { cart: carrito, loading, setCarrito } = useMainStore();
  type QueryPropsProductos = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };
  const { data: productos } = useApiQuery(
    "GET|producto",
    null
  ) as QueryPropsProductos;
  const [tabIndex, setTabIndex] = useState(0);
  const setActiveTab = (index: number) => {
    setTabIndex(index);
  };
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
  return (
    <Container
      maxW="container.2xl"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      bg="#f9f6f6"
      gap={".5rem"}
      p={0}
    >
      <SimpleGrid w="100%" columns={1}>
        <Button
          colorScheme="orange"
          as={Link}
          to="/catálogo"
          w={"15rem"}
          h={"3rem"}
        >
          <ChevronLeftIcon />
          Volver al catálogo
        </Button>
      </SimpleGrid>
      {loading ? (
        <Loader />
      ) : carrito && carrito.productosComprados.length > 0 ? (
        <Flex
          flexWrap={"wrap"}
          w={"95%"}
          justifyContent={"center"}
          alignItems={"top"}
        >
          <Tabs index={tabIndex} isLazy>
            <TabPanels>
              <TabPanel
                w="100%"
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                flexDir={"column"}
                gap={"1rem"}
                p={0}
              >
                <Stack
                  flexBasis={"35rem"}
                  flexShrink={"2"}
                  height={"40rem"}
                  background={"blackAlpha.100"}
                  p={"1rem"}
                  spacing={5}
                >
                  <Heading as="h2" size="lg" mb="1rem">
                    Productos
                  </Heading>
                  <Flex
                    flexDir={"column"}
                    id="products-container"
                    margin={0}
                    height={"30rem"}
                    overflow={"scroll"}
                    overflowX={"hidden"}
                    paddingRight={"1rem"}
                  >
                    {carrito.productosComprados?.map(
                      (cartItem: cartItem, i: number) => (
                        <CartItem
                          key={"cart-item-" + i}
                          cartItem={cartItem}
                          index={i}
                          isMobile={mobile}
                        />
                      )
                    )}
                  </Flex>
                </Stack>
              </TabPanel>
              <TabPanel
                w="100%"
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                flexDir={"column"}
                gap={"1rem"}
                p={0}
              >
                <Stack
                  flexBasis={"35rem"}
                  flexShrink={"2"}
                  background={"blackAlpha.100"}
                  p={"1rem"}
                  spacing={5}
                >
                  <Heading as="h2" size="lg" mb="1rem">
                    Detalle del pedido
                  </Heading>
                  <CartForm />
                  <Button
                    variant={"solid"}
                    w="10rem"
                    h="3rem"
                    {...btnStyle}
                    onClick={() => {
                      setActiveTab(0);
                    }}
                  >
                    Volver
                  </Button>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Stack
            background={"blackAlpha.100"}
            id="resumen-compra"
            p={"1rem"}
            spacing={5}
            height={"30rem"}
            w={mobile ? "100%" : ""}
          >
            <Heading as="h2" size="lg" mb="1rem">
              Resumen de compra
            </Heading>
            <Flex w={"90%"} justifyContent={"space-between"}>
              <Text>
                Productos {"("}
                <Mark fontWeight={"bold"}>
                  {carrito?.productosComprados.reduce(
                    (sum, producto) => sum + producto.cantidad,
                    0
                  )}
                </Mark>
              </Text>
              <Text>
                $<Mark fontWeight={"bold"}>{carrito.totalCompra}</Mark>
              </Text>
            </Flex>
            <Flex w={"90%"} justifyContent={"space-between"}>
              <Text>Envio</Text>
              {tipoEntrega == 1 ? (
                <Text>
                  $<Mark fontWeight={"bold"}>{carrito.totalCompra * 0.1}</Mark>
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Flex>
            <Flex w={"90%"} justifyContent={"space-between"}>
              <Text>Descuento</Text>
              {tipoEntrega == 0 ? (
                <Text textDecoration={"line-through"}>
                  $<Mark fontWeight={"bold"}>{carrito.totalCompra * 0.1}</Mark>
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Flex>
            <Box w={"90%"} height={"2px"} background={"grey"}></Box>
            <Flex w={"90%"} justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Total</Text>
              {tipoEntrega == 0 ? (
                <Text>
                  $
                  <Mark fontWeight={"bold"}>
                    {carrito.totalCompra - carrito.totalCompra * 0.1}
                  </Mark>
                </Text>
              ) : (
                <Text>
                  $
                  <Mark fontWeight={"bold"}>
                    {carrito.totalCompra + carrito.totalCompra * 0.1}
                  </Mark>
                </Text>
              )}
            </Flex>
            <Stack>
              <Heading as="h6" fontSize="1.3rem">
                Seleccione el tipo de entrega
              </Heading>
              <Select
                onChange={(e) => {
                  setTipoEntrega(parseInt(e.target.value));
                }}
                background={"white"}
              >
                <option value="0">Retiro en local</option>
                <option value="1">Delivery</option>
              </Select>
            </Stack>

            {showPaymentButton && tabIndex == 1 ? (
              <div id="wallet_container">
                <Wallet initialization={{ preferenceId: prefId }} />
              </div>
            ) : (
              <Button
                variant={"solid"}
                w="20rem"
                h="4rem"
                {...btnStyle}
                onClick={() => {
                  setActiveTab(1);
                  mercadoPagoPayment(carrito);
                }}
              >
                Continuar
              </Button>
            )}
          </Stack>
        </Flex>
      ) : (
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="100%"
          bg={"white"}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            No hay productos en el carrito
          </AlertTitle>
        </Alert>
      )}
      <Heading as="h2" size="lg" mb="1rem">
        Tambien te puede interesar
      </Heading>
      <Flex
        marginBottom={"2rem"}
        flexGrow={1}
        align={"center"}
        justify={"center"}
        w={"100%"}
        gap={"2rem"}
        flexWrap={"wrap"}
      >
        {elementosAlAzar.map((product: Product) => (
          <LandingCard key={"landing-card-" + product.id} product={product} />
        ))}
      </Flex>
    </Container>
  );
};

const CartForm = () => {
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();
  if (!isAuthenticated) {
    window.location.href = "/";
  }
  //console.log(user);
  interface MyFormValues {
    nombre: string;
    email: string;
    tipoEntrega: string;
  }
  const initialValues: MyFormValues = user
    ? {
        nombre: user.name ? user.name : "",
        email: user.email ? user.email : "",
        tipoEntrega: "",
      }
    : { nombre: "", email: "", tipoEntrega: "" };
  const labelStyle = {
    fontWeight: "bold",
    display: "flex",
    p: 0,
    m: 0,
    alignItems: "center",
    minW: "5rem",
  };

  interface QueryProps {
    data: Direccion[];
    error: any;
    isLoading: boolean;
  }
  const [isOpen, setisOpen] = useState<boolean>(false);

  const { mutate: addDirection, data: addedDataDirection } = useApiMutation(
    "POST|direcciones/addDireccion"
  );
  const { direcciones, loading, setDirecciones } = useMainStore();
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
  return (
    <>
      {ModalAddCard(
        isOpen,
        () => {
          setisOpen(false);
        },
        (newDireccion: Direccion) => {
          setisOpen(false);
          addDirection(newDireccion);
        }
      )}
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
            <Form autoComplete="off" className="form-obraAlta">
              <Flex flexWrap={"wrap"} gap={5}>
                <InputGroup
                  flexBasis={"15rem"}
                  flexShrink={"2"}
                  flexGrow={"1"}
                  flexDir={"column"}
                  gap={"1rem"}
                >
                  <FormLabel {...labelStyle}>Nombre</FormLabel>
                  <Input
                    fontWeight={"semibold"}
                    focusBorderColor="#ffb701"
                    name="nombre"
                    as={Field}
                    background={"white"}
                  ></Input>
                  <Text fontWeight={"bold"} color={"red"}>
                    {Formik.errors.nombre}
                  </Text>
                </InputGroup>
                <InputGroup
                  flexBasis={"20rem"}
                  flexGrow={"2"}
                  flexDir={"column"}
                  gap={"1rem"}
                >
                  <FormLabel {...labelStyle}>Email</FormLabel>
                  <Input
                    fontWeight={"semibold"}
                    focusBorderColor="#ffb701"
                    name="email"
                    as={Field}
                    background={"white"}
                  ></Input>
                  <Text fontWeight={"bold"} color={"red"}>
                    {Formik.errors.email}
                  </Text>
                </InputGroup>
              </Flex>
              <Flex flexDir={"column"} gap={"1rem"}>
                <Text {...labelStyle}>Direccion</Text>
                <Flex gap={"0.5rem"}>
                  <Select background={"white"}>
                    {direcciones?.map((d) => {
                      return (
                        <option value={d.id}>
                          {d.departamento} - {d.calleNombre} - {d.numeracion}
                        </option>
                      );
                    })}
                  </Select>
                  <Button
                    size="xl"
                    w="10rem"
                    h="2.5rem"
                    padding={"1rem"}
                    {...btnStyle}
                    onClick={() => {
                      setisOpen(true);
                    }}
                  >
                    + Agregar Direccion
                  </Button>
                </Flex>
              </Flex>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

const ModalAddCard = (_isOpen = false, onClose: any, onSave: any) => {
  const inputStyle = {
    background: "white",
    color: "orange",
    border: "1px solid white",
    //boxShadow: "5px 4px 6px rgba(0, 0, 0, 0.25);",
    _hover: {
      boxShadow: "0rem 0rem 0rem .15rem white",
    },
    w: "xs",
    _focus: {
      boxShadow: "none",
      border: "2px solid white",
    },
  };
  const leftAddonStyle = {
    background: "white",
    color: "orange",
    _hover: {
      boxShadow: "0rem 0rem 0rem .15rem white",
    },
  };
  const labelStyle = {
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "0px",
    color: "white",
    marginBottom: "1.5rem",
  } as FormLabelProps;

  const [showActual, setshowActual] = useState(false);
  const handleClickActual = () => setshowActual(!showActual);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [newDireccion, setNewDireccion] = useState<Direccion>({
    aclaracion: "",
    calleNombre: "",
    departamento: "",
    nroPiso: 0,
    numeracion: 0,
    id: -1,
  });

  return (
    <Modal
      isOpen={_isOpen}
      onClose={() => {
        onClose();
      }}
      size={"xl"}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        border="5px solid #FFFFFF"
        background="#FB9300"
        box-shadow="5px 4px 6px rgba(0, 0, 0, 0.25)"
        border-radius="15px"
      >
        <ModalHeader
          {...labelStyle}
          h={"100%"}
          lineHeight={""}
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={"xx-large"}
        >
          Agrega una nueva direccion
        </ModalHeader>
        <ModalCloseButton
          _hover={{
            background: "orange",
            border: "2px solid white",
            color: "white",
          }}
          background="#FFFFFF"
          color={"orange"}
          fontWeight={"bold"}
          fontSize={"1.1rem"}
          border-radius="15px"
          alignItems={"center"}
        />

        <ModalBody pb={6}>
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
              console.log(values);
              onSave(values);
            }}
          >
            {(Formik) => (
              <>
                <Form autoComplete="off" className="form-obraAlta">
                  <Flex flexWrap={"wrap"} gap={6}>
                    <InputGroup
                      flexBasis={"20rem"}
                      flexGrow={"2"}
                      flexDir={"column"}
                      gap={".5rem"}
                    >
                      <FormLabel {...labelStyle}>Departamento</FormLabel>
                      <Input
                        fontWeight={"semibold"}
                        focusBorderColor="#ffb701"
                        name="departamento"
                        as={Field}
                        background={"white"}
                      ></Input>
                      <Text fontWeight={"bold"} color={"white"}>
                        {Formik.errors.departamento}
                      </Text>
                    </InputGroup>
                    <InputGroup
                      flexBasis={"20rem"}
                      flexGrow={"2"}
                      flexDir={"column"}
                      gap={".5rem"}
                    >
                      <FormLabel {...labelStyle}>Calle</FormLabel>
                      <Input
                        fontWeight={"semibold"}
                        focusBorderColor="#ffb701"
                        name="calleNombre"
                        as={Field}
                        background={"white"}
                      ></Input>
                      <Text fontWeight={"bold"} color={"white"}>
                        {Formik.errors.calleNombre}
                      </Text>
                    </InputGroup>
                    <Flex
                      justifyContent={"space-between"}
                      flexWrap={"wrap"}
                      gap={5}
                    >
                      <InputGroup
                        flexBasis={"10rem"}
                        flexDir={"column"}
                        gap={".5rem"}
                        flexGrow={"2"}
                      >
                        <FormLabel {...labelStyle}>Numeracion</FormLabel>
                        <Input
                          fontWeight={"semibold"}
                          focusBorderColor="#ffb701"
                          name="numeracion"
                          as={Field}
                          type="number"
                          background={"white"}
                        ></Input>
                        <Text fontWeight={"bold"} color={"white"}>
                          {Formik.errors.numeracion}
                        </Text>
                      </InputGroup>
                      <InputGroup
                        flexBasis={"5rem"}
                        flexDir={"column"}
                        gap={".5rem"}
                        flexGrow={"2"}
                      >
                        <FormLabel {...labelStyle}>Numero Piso</FormLabel>
                        <Input
                          fontWeight={"semibold"}
                          focusBorderColor="#ffb701"
                          name="nroPiso"
                          as={Field}
                          type="number"
                          background={"white"}
                        ></Input>
                      </InputGroup>
                    </Flex>
                  </Flex>
                  <Flex
                    paddingTop={"1rem"}
                    gap={5}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                    flexDir={"row"}
                  >
                    <Button
                      background={"#ffb701"}
                      _hover={{
                        background: "#e4a400",
                      }}
                      color={"white"}
                      onClick={() => {
                        //onSave(newCard);
                      }}
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      color={"white"}
                      background={"red"}
                      _hover={{
                        background: "red.900",
                      }}
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Form>
              </>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
