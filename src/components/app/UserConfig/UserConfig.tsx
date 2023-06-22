import { useEffect, useState } from "react";
import * as Yup from "yup";
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
} from "@chakra-ui/react";

import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  ErrorMessage,
  Formik,
} from "formik";
import { DireccionCard } from "./DireccionesCard/DireccionCard";
import { useAuth0 } from "@auth0/auth0-react";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { Direccion } from "types/types";
import useMainStore from "@store/mainStore";
type CreditCard = {
  cardNumber: number;
  cardName: string;
  cardDate: Date;
  cardCvv: number;
};
export const UserConfig = () => {
  const inputStyle = {
    display: "flex",
    borderRadius: "5px",
    paddingLeft: ".5rem",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "25rem",
    height: "2.5rem",
    border: "1px solid rgb(216, 216, 216)",
    transition: ".2s ease-in-out all",
    _hover: {
      boxShadow: "0rem 0rem 0rem .15rem #ffb701",
    },
    boxShadow: "5px 4px 6px rgba(0, 0, 0, 0.25);",
  };
  const buttonStyle = {
    background: "orange",
    color: "white",
    _hover: {
      background: "darkorange",
      transform: "Scale(1.03)",
    },
  };
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [mercadoPagoCards, setMercadoPagoCards] = useState<CreditCard[]>([]);
  const {
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
  } = useAuth0();
  interface QueryProps {
    data: Direccion[];
    error: any;
    isLoading: boolean;
  }
  const { direcciones, loading, setDirecciones } = useMainStore();
  const { mutate: addDirection, data: addedDataDirection } = useApiMutation(
    "POST|direcciones/addDireccion"
  );
  const { data: dataDirecciones, error } = useApiQuery(
    "GET|direcciones/getDirecciones",
    null
  ) as QueryProps;
  if (!isAuthenticated) {
    window.location.href = "/";
  }

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
    <Container
      maxW="container.2xl"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      bg="#f9f6f6"
    >
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
      <Heading as="h1" size="xl" mb="2rem">
        El Buen Sabor
      </Heading>
      <Stack spacing={3} w="100%">
        <Heading as="h2" size="lg" mb="1rem">
          Configuracion de cuenta
        </Heading>
        <Flex flexDir={"row"} justify={"space-evenly"} w={"90%"} h={"max-content"}>
          <Flex flexDir={"column"} gap={"1rem"}>
            <InputGroup flexDir="column">
              <Text mb="8px">Usuario:</Text>
              <Text {...inputStyle}>{user?.nickname}</Text>

              {/* <Input
                w={"25rem"}
                focusBorderColor="#ffb701"
                {...inputStyle}
                value={user?.nickname}
                contentEditable={false}
              ></Input> */}
            </InputGroup>
            <Spacer />
            <InputGroup flexDir="column">
              <Text mb="8px">Email:</Text>
              <Text {...inputStyle}>{user?.email}</Text>
            </InputGroup>
            <Spacer />
            <Flex w={"100%"} justifyContent={"space-between"}>
              <Button
                size="xl"
                w={"max-content"}
                padding={"1rem"}
                {...buttonStyle}
                onClick={() => {
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });
                }}
              >
                Cerar Sesion
              </Button>
              <Button
                size="xl"
                w={"max-content"}
                padding={"1rem"}
                {...buttonStyle}
                onClick={() => {
                  setisOpen(true);
                }}
              >
                Cambiar su contraseña
              </Button>
            </Flex>
          </Flex>
          <Flex flexDir="column" gap={"1rem"}>
            {/* <Checkbox colorScheme="orange" defaultChecked>
              <Text fontWeight={"bold"}>Modo Oscuro</Text>
            </Checkbox> */}
            <Text mb="8px">Direcciones</Text>
            <Flex flexDir="column" gap={".5rem"}>
              {direcciones?.map((dir) => {
                return <DireccionCard key={dir.id +"-"+ dir.calleNombre} direccion={dir}></DireccionCard>;
              })}
            </Flex>
            <Button
              size="xl"
              w="12rem"
              h="2.5rem"
              {...buttonStyle}
              onClick={() => {
                setisOpen(true);
              }}
            >
              + Agregar Direccion
            </Button>
          </Flex>
        </Flex>
      </Stack>
    </Container>
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
