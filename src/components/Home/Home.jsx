import React from "react";
import "./home.scss";
import {Container, VStack, Flex, Spacer, Box} from "@chakra-ui/react";
import SideBar from "../SideBar/SideBar";
const Home = () => {
  return (
    <Container
      maxW="container.xll"
      h="100vh"
      bg="#f9f6f6"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="2rem"
      p="0"
      overflow="hidden"
    >
      <Flex h="100%" w="100%">
        <SideBar />
      </Flex>
    </Container>
  );
};
export default Home;
