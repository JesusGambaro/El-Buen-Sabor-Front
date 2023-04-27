import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import "./footer.scss";

export const Footer = () => {
  return (
    <Flex h="10rem" bgColor="orange" color="white" p={5} w="100%">
      {/*
          <Center h={"maxContainer"} w={"maxContainer"}>
            <Image
              height={"5rem"}
              objectFit="cover"
              src="https://res.cloudinary.com/dquqzevft/image/upload/v1680564907/Logo.png"
              alt="El Buen Sabor"
              ml={2}
            />
          </Center>
        
        <Spacer />
        */}
      <Flex flexDir={"column"} gap={"0.3rem"}>
        <Text fontWeight={"bold"}>
          <i
            className="fa-solid fa-location-dot"
            style={{ fontSize: "1.2rem" }}
          ></i>
          &nbsp; Luzuriaga 1413, Godoy Cruz, Mendoza
        </Text>
        <Spacer />
        <Text fontWeight={"bold"}>
          <i
            className="fa-brands fa-whatsapp"
            style={{ fontSize: "1.2rem" }}
          ></i>
          &nbsp; +542615166191
        </Text>
        <Spacer />
        <Text fontWeight={"bold"}>
          <i
            className="fa-solid fa-envelope"
            style={{ fontSize: "1.2rem" }}
          ></i>
          &nbsp; elbuensabor@gmail.com
        </Text>
      </Flex>
      <Spacer />
      <Flex flexDir={"column"}>
        <Text fontWeight={"bold"}>Métodos De Pago</Text>
        <Center>
          <SimpleGrid columns={2}>
            <Box w={"3rem"} fontSize={"2rem"}>
              <i className="fa-brands fa-cc-mastercard"></i>
            </Box>
            <Box w={"3rem"} fontSize={"2rem"}>
              <i className="fa-brands fa-cc-mastercard"></i>
            </Box>
            <Box w={"3rem"} fontSize={"2rem"}>
              <i className="fa-brands fa-cc-mastercard"></i>
            </Box>
            <Box w={"3rem"} fontSize={"2rem"}>
              <i className="fa-brands fa-cc-mastercard"></i>
            </Box>
          </SimpleGrid>
        </Center>
      </Flex>

      <Spacer></Spacer>
      <Flex flexDir={"column"} gap={"0.3rem"}>
        <Text gap={"1rem"} fontWeight={"bold"}>
          ¿Tienes alguna queja?&nbsp;
          <Link fontWeight={"normal"}>Click aqui para dejar la queja</Link>
        </Text>
        <Spacer />
        <Text gap={"1rem"} fontWeight={"bold"}>
          ¿Tienes alguna queja?&nbsp;
          <Link fontWeight={"normal"}>Click aqui para dejar la queja</Link>
        </Text>
        <Spacer />
        <Text gap={"1rem"} fontWeight={"bold"}>
          ¿Tienes alguna queja?&nbsp;
          <Link fontWeight={"normal"}>Click aqui para dejar la queja</Link>
        </Text>
      </Flex>
    </Flex>
  );
};
