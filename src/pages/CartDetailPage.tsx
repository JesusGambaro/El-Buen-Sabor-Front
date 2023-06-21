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
} from "@chakra-ui/react";
import useMainStore from "@store/mainStore";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Loader from "@app/Loader/Loader";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  ErrorMessage,
  Formik,
} from "formik";
interface Values {
  firstName: string;
  lastName: string;
  email: string;
}
import {
  CartItem as cartItem,
  CartProps,
  CartItem as CartType,
  Category,
  Product,
  Carrito,
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
import { useApiQuery } from "@hooks/useQueries";
export const CartDetailPage = () => {
  const { cart: carrito, loading, setCarrito } = useMainStore();
  const { productos } = useCatalogueStore();
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
      console.log(elemento);

      // Agrega el elemento aleatorio al array de elementos al azar
      elementosAlAzar.push(elemento);
    }

    return elementosAlAzar;
  }
  const [tipoEntrega, setTipoEntrega] = useState(0);
  const [elementosAlAzar, setelementosAlAzar] = useState([] as Product[]);
  useEffect(() => {
    if (productos.length) {
      setelementosAlAzar(obtenerElementosAlAzar(productos, 5));
    }
  }, [productos]);
  let cantProductos = carrito?.productosComprados.reduce(
    (sum, producto) => sum + producto.cantidad,
    0
  );

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
      <Heading p={"1rem"} as="h2" textAlign={"left"} w={"100%"} size="xl">
        Carrito de compras
      </Heading>
      {loading ? (
        <Loader />
      ) : carrito && carrito.productosComprados.length > 0 ? (
        <Tabs w={"100%"} index={tabIndex} isLazy>
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
              <SimpleGrid
                templateAreas={"2fr 1fr"}
                background={"blackAlpha.100"}
                columns={2}
                minChildWidth={mobile ? "15rem" : "30rem"}
                w={mobile ? "95%" : "75%"}
              >
                <Stack p={"2rem"} spacing={10}>
                  <Heading as="h2" size="lg" mb="1rem">
                    Productos
                  </Heading>
                  <SimpleGrid
                    minChildWidth={mobile ? "15rem" : "30rem"}
                    spacing={5}
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
                        />
                      )
                    )}
                  </SimpleGrid>
                </Stack>
                <Stack id="resumen-compra" p={"2rem"} spacing={10}>
                  <Heading as="h2" size="lg" mb="1rem">
                    Resumen de compra
                  </Heading>
                  <Flex w={"90%"} justifyContent={"space-between"}>
                    <Text fontSize="1.3rem">
                      Productos {"("}
                      <Mark fontWeight={"bold"}>
                        {carrito?.productosComprados.reduce(
                          (sum, producto) => sum + producto.cantidad,
                          0
                        )}
                      </Mark>
                      {")"}
                    </Text>
                    <Text fontSize="1.3rem">
                      $<Mark fontWeight={"bold"}>{carrito.totalCompra}</Mark>
                    </Text>
                  </Flex>
                  <Flex w={"90%"} justifyContent={"space-between"}>
                    <Text fontSize="1.3rem">Envio</Text>
                    {tipoEntrega == 1 ? (
                      <Text fontSize="1.3rem">
                        $
                        <Mark fontWeight={"bold"}>
                          {carrito.totalCompra * 0.1}
                        </Mark>
                      </Text>
                    ) : (
                      <Text fontSize="1.3rem">-</Text>
                    )}
                  </Flex>
                  <Flex w={"90%"} justifyContent={"space-between"}>
                    <Text fontSize="1.3rem">Descuento</Text>
                    {tipoEntrega == 0 ? (
                      <Text fontSize="1.3rem" textDecoration={"line-through"}>
                        $
                        <Mark fontWeight={"bold"}>
                          {carrito.totalCompra * 0.1}
                        </Mark>
                      </Text>
                    ) : (
                      <Text fontSize="1.3rem">-</Text>
                    )}
                  </Flex>
                  <Box w={"90%"} height={"2px"} background={"grey"}></Box>
                  <Flex w={"90%"} justifyContent={"space-between"}>
                    <Text fontSize="1.4rem" fontWeight={"bold"}>
                      Total
                    </Text>
                    {tipoEntrega == 0 ? (
                      <Text fontSize="1.3rem">
                        $
                        <Mark fontWeight={"bold"}>
                          {carrito.totalCompra - carrito.totalCompra * 0.1}
                        </Mark>
                      </Text>
                    ) : (
                      <Text fontSize="1.3rem">
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
                      <option value="0" selected>
                        Retiro en local
                      </option>
                      <option value="1">Delivery</option>
                    </Select>
                  </Stack>

                  <Button
                    variant={"solid"}
                    w="20rem"
                    h="4rem"
                    {...btnStyle}
                    onClick={() => {
                      setActiveTab(1);
                    }}
                  >
                    Continuar
                  </Button>
                </Stack>
              </SimpleGrid>
              <Heading as="h2" size="lg" mb="1rem">
                Tambien te puede interesar
              </Heading>
              <Flex flexGrow={1} w={"100%"} gap={"2rem"} flexWrap={"wrap"}>
                {elementosAlAzar.map((product: Product) => (
                  <LandingCard
                    key={"landing-card-" + product.id}
                    product={product}
                  />
                ))}
              </Flex>
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
              <SimpleGrid
                templateAreas={"2fr 1fr"}
                background={"blackAlpha.100"}
                columns={2}
                minChildWidth={mobile ? "15rem" : "30rem"}
                w={mobile ? "100%" : "75%"}
              >
                <Stack p={"2rem"} spacing={10}>
                  <Heading as="h2" size="lg" mb="1rem">
                    Detalle del pedido
                  </Heading>
                  <CartForm />
                  <Button
                    variant={"solid"}
                    w="20rem"
                    h="4rem"
                    {...btnStyle}
                    onClick={() => {
                      setActiveTab(0);
                    }}
                  >
                    Volver
                  </Button>
                </Stack>
                <Stack id="resumen-compra" p={"2rem"} spacing={10}>
                  <Heading as="h2" size="lg" mb="1rem">
                    Resumen de compra
                  </Heading>
                  <Flex w={"90%"} justifyContent={"space-between"}>
                    <Text fontSize="1.3rem">
                      Productos {"("}
                      <Mark fontWeight={"bold"}>
                        {carrito?.productosComprados.reduce(
                          (sum, producto) => sum + producto.cantidad,
                          0
                        )}
                      </Mark>
                      {")"}
                    </Text>
                    <Text fontSize="1.3rem">
                      $<Mark fontWeight={"bold"}>{carrito.totalCompra}</Mark>
                    </Text>
                  </Flex>
                  <Flex w={"90%"} justifyContent={"space-between"}>
                    <Text fontSize="1.3rem">Envio</Text>
                    {tipoEntrega == 1 ? (
                      <Text fontSize="1.3rem">
                        $
                        <Mark fontWeight={"bold"}>
                          {carrito.totalCompra * 0.1}
                        </Mark>
                      </Text>
                    ) : (
                      <Text fontSize="1.3rem">-</Text>
                    )}
                  </Flex>
                  <Flex w={"90%"} justifyContent={"space-between"}>
                    <Text fontSize="1.3rem">Descuento</Text>
                    {tipoEntrega == 0 ? (
                      <Text fontSize="1.3rem" textDecoration={"line-through"}>
                        $
                        <Mark fontWeight={"bold"}>
                          {carrito.totalCompra * 0.1}
                        </Mark>
                      </Text>
                    ) : (
                      <Text fontSize="1.3rem">-</Text>
                    )}
                  </Flex>
                  <Box w={"90%"} height={"2px"} background={"grey"}></Box>
                  <Flex w={"90%"} justifyContent={"space-between"}>
                    <Text fontSize="1.4rem" fontWeight={"bold"}>
                      Total
                    </Text>
                    {tipoEntrega == 0 ? (
                      <Text fontSize="1.3rem">
                        $
                        <Mark fontWeight={"bold"}>
                          {carrito.totalCompra - carrito.totalCompra * 0.1}
                        </Mark>
                      </Text>
                    ) : (
                      <Text fontSize="1.3rem">
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
                      <option value="0" selected>
                        Retiro en local
                      </option>
                      <option value="1">Delivery</option>
                    </Select>
                  </Stack>

                  <Button
                    variant={"solid"}
                    w="20rem"
                    h="4rem"
                    {...btnStyle}
                    onClick={() => {
                      //setActiveTab(1);
                    }}
                  >
                    Confirmar Pedido
                  </Button>
                </Stack>
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
    </Container>
  );
};
interface Direccion {
  calleNombre: string;
  departamento: string;
  numeracion: number;
  aclaracion: string;
  nroPiso: number;
  id?: number;
}
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
  const {
    data: direcciones,
    error: dirError,
    isLoading,
  } = useApiQuery("GET|direcciones/getDirecciones", null) as QueryProps;
  const [isOpen, setisOpen] = useState<boolean>(false);
  return (
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
              <Select background={"white"}>
                {direcciones?.map((d) => {
                  return (
                    <option value={d.id} selected>
                      {d.departamento} - {d.calleNombre} - {d.numeracion}
                    </option>
                  );
                })}
              </Select>
              <Button
                size="xl"
                w="10rem"
                h="3rem"
                padding={"1rem"}
                {...btnStyle}
                onClick={() => {
                  setisOpen(true);
                }}
              >
                + Agregar Direccion
              </Button>

              {ModalAddCard(
                isOpen,
                () => {
                  setisOpen(false);
                },
                (newDireccion: Direccion) => {
                  setisOpen(false);
                }
              )}
            </Flex>
          </Form>
        </>
      )}
    </Formik>
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
  });
  const [isOpen, setisOpen] = useState<boolean>(false);
  return (
    <Modal
      isOpen={_isOpen}
      onClose={() => {
        onClose();
      }}
      size={"xl"}
      isCentered
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
        />

        <ModalBody pb={6}>
          <Flex flexDir={"column"} gap={"2rem"}>
            <FormControl>
              <FormLabel {...labelStyle}>Departamento</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Input
                    {...inputStyle}
                    type={"text"}
                    value={newDireccion.departamento}
                    onChange={({ target }) => {
                      setNewDireccion({
                        ...newDireccion,
                        departamento: target.value,
                      });
                    }}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            background={"#ffb701"}
            _hover={{
              background: "#e4a400",
            }}
            color={"white"}
            mr={3}
            onClick={() => {
              //onSave(newCard);
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
