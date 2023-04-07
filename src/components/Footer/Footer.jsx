import React from "react";
import {
  Box,
  Center,
  Image,
  Flex,
  SimpleGrid,
  Link,
  Spacer,
  Container,
  Text,
} from "@chakra-ui/react";
import "./footer.scss";
export const Footer = () => {
  return (
    <div className="footer">
      <Flex h={"100%"} bgColor={"orange"} color={"white"} p={"1rem"}>
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
          <Flex align={"center"} justify={"left"} w={"20rem"} gap={"1rem"}>
            <i class="fa-solid fa-location-dot"></i>
            Luzuriaga 1413, Godoy Cruz, Mendoza
          </Flex>
          <Spacer />
          <Flex />
          <Flex align={"center"} justify={"left"} w={"20rem"} gap={"1rem"}>
            <i class="fa-brands fa-whatsapp"></i>
            +542615166191
          </Flex>
          <Spacer />
          <Flex align={"center"} justify={"left"} w={"20rem"} gap={"1rem"}>
            <i class="fa-solid fa-envelope"></i>
            elbuensabor@gmail.com
          </Flex>
        </Flex>

        <Spacer></Spacer>
        <Flex flexDir={"column"}>
          <Text>Metodos De Pago</Text>
          <Center>
            <SimpleGrid columns={"2"}>
              <Box w={"3rem"} fontSize={"2rem"}>
                <i class="fa-brands fa-cc-mastercard"></i>
              </Box>
              <Box w={"3rem"} fontSize={"2rem"}>
                <i class="fa-brands fa-cc-mastercard"></i>
              </Box>
              <Box w={"3rem"} fontSize={"2rem"}>
                <i class="fa-brands fa-cc-mastercard"></i>
              </Box>
              <Box w={"3rem"} fontSize={"2rem"}>
                <i class="fa-brands fa-cc-mastercard"></i>
              </Box>
            </SimpleGrid>
          </Center>
        </Flex>

        <Spacer></Spacer>
        <Flex flexDir={"column"} gap={"0.3rem"}>
          <Flex gap={"1rem"}>
            ¿Tienes alguna queja?<Link>Click aqui para dejar la queja</Link>
          </Flex>
          <Spacer />
          <Flex gap={"1rem"}>
            ¿Tienes alguna queja?<Link>Click aqui para dejar la queja</Link>
          </Flex>
          <Spacer />
          <Flex gap={"1rem"}>
            ¿Tienes alguna queja?<Link>Click aqui para dejar la queja</Link>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};
