import React from "react";
import "./home.scss";
import { Container, VStack, Flex, Spacer, Box } from "@chakra-ui/react";
import SideBar from "@components/SideBar/SideBar";
import NavBar from "@components/NavBar/NavBar";

const Home = () => {
  return (
    <Container
      maxW="100vw"
      h="100vh"
      bg="#f9f6f6"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p="0"
      overflow="hidden"
    >
      <Flex h="100%" w="100%" flexDir="column">
        <NavBar />
        <SideBar />
      </Flex>
    </Container>
  );
};
export default Home;
