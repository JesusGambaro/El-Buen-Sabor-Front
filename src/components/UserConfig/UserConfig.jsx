import React, { useState } from "react";
import {
  SimpleGrid,
  Heading,
  Container,
  Checkbox,
  Button,
  Input,
  InputRightElement,
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
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { MercadoPagoCard } from "./MercadoPagoCard/MercadoPagoCard";
export const UserConfig = () => {
  const inputStyle = {
    border: "1px solid rgb(216, 216, 216)",
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
  const [isOpen, setisOpen] = useState(false);
  const [mercadoPagoCards, setMercadoPagoCards] = useState([]);

  return (
    <Container maxW="container.xl" minH={"63vh"}>
      <Heading as="h1" size="md" mb="2rem">
        Configuracion de usuario
      </Heading>
      <Flex flexDir={"row"} h={"max-content"}>
        <Flex flexDir="column" gap={"1rem"}>
          <Checkbox colorScheme="orange" defaultChecked>
            <Text fontWeight={"bold"}>Modo Oscuro</Text>
          </Checkbox>
          <Button size="xl" w={"max-content"} padding={"1rem"} {...buttonStyle}>
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
        <Spacer />
        <Flex flexDir={"column"} gap={"1rem"}>
          <InputGroup flexDir="column">
            <Text mb="8px">Email:</Text>
            <Input w={"xl"} focusBorderColor="#ffb701" {...inputStyle}></Input>
          </InputGroup>
          <Spacer />
          <InputGroup flexDir="column">
            <Text mb="8px">Email:</Text>
            <Input w={"xl"} focusBorderColor="#ffb701" {...inputStyle}></Input>
          </InputGroup>
          <Spacer />

          <Text mb="8px">Tarjetas</Text>
          <Flex flexDir="column" gap={".5rem"}>
            {mercadoPagoCards.length > 0 && mercadoPagoCards.map((mercadoPagoCard) => {
              return (
                <MercadoPagoCard
                  cardType={"Mercado Pago"}
                  cardNumber={mercadoPagoCard.cardNumber}
                />
              );
            })}
            <Button
              size="xl"
              w={"max-content"}
              padding={"1rem"}
              {...buttonStyle}
              onClick={() => {
                setisOpen(true);
              }}
            >
              Agregar tarjeta
            </Button>
            {ModalAddCard(
              isOpen,
              () => {
                setisOpen(false);
              },
              (data) => {
                if (data.numeroTarjeta) {
                  setMercadoPagoCards(...mercadoPagoCards, data);
                  setisOpen(false);
                }
              }
            )}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
const ModalAddCard = (_isOpen, onClose, onSave) => {
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
    fontFamily: "cursive",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "0px",
    color: "white",
    marginBottom: "1.5rem",
  };
  const [showActual, setshowActual] = React.useState(false);
  const handleClickActual = () => setshowActual(!showActual);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [newData, setNewData] = useState({
    numeroTarjeta: 0,
    fechaVencimiento: "",
    codigoSeguridad: 0,
  });
  return (
    <Modal
      isOpen={_isOpen}
      onClose={() => {
        onClose();
        setNewData({
          numeroTarjeta: 0,
          fechaVencimiento: "",
          codigoSeguridad: 0,
        });
      }}
      size={"xl"}
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
          Agrega una nueva tarjeta
        </ModalHeader>
        <ModalCloseButton
          background="#FFFFFF"
          boxShadow="5px 4px 6px rgba(0, 0, 0, 0.25)"
          border-radius="15px"
        />
        <ModalBody pb={6}>
          <Flex flexDir={"column"} gap={"2rem"}>
            <FormControl>
              <FormLabel {...labelStyle}>Numero de tarjeta</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Input
                    placeholder="**** **** ****"
                    {...inputStyle}
                    type={"text"}
                    value={newData.numeroTarjeta ? newData.numeroTarjeta : ""}
                    onChange={({ target }) => {
                      setNewData({ ...newData, numeroTarjeta: target.value });
                    }}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel {...labelStyle}>Fecha de vencimiento</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Input
                    placeholder=""
                    {...inputStyle}
                    type={"date"}
                    value={
                      newData.fechaVencimiento ? newData.fechaVencimiento : ""
                    }
                    onChange={({ target }) => {
                      setNewData({
                        ...newData,
                        fechaVencimiento: target.value,
                      });
                    }}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel {...labelStyle}>Codigo Seguridad</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Input
                    placeholder="***"
                    {...inputStyle}
                    type={"text"}
                    value={
                      newData.codigoSeguridad ? newData.codigoSeguridad : ""
                    }
                    onChange={({ target }) => {
                      setNewData({ ...newData, codigoSeguridad: target.value });
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
              onSave(newData);
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
