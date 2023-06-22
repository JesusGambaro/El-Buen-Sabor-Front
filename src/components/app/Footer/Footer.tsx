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
import { useMediaQuery } from "@mantine/hooks";
export const Footer = () => {
  const mobile = useMediaQuery(`(max-width: 700px)`);
 

  return (
    <Flex
      h="10rem"
      bgColor="rgb(253, 126, 20)"
      color="white"
      p={5}
      zIndex={0}
      position="fixed"
      bottom="0"
      maxW={`calc(100vw - ${mobile ? "0rem" : "8rem"})`}
      width={"100vw"}
      left={mobile ? "0" : "8rem"}
    >
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
