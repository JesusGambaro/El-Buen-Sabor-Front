import React, { useEffect } from "react";
import "./home.scss";
import { Container, VStack, Flex, Spacer, Box } from "@chakra-ui/react";
import SideBar from "@components/SideBar/SideBar";
import NavBar from "@components/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import InvalidAuthDialog from "@components/InvalidAuthDialog/InvalidAuthDialog";
import { useDispatch } from "react-redux";
import { setAuth } from "@redux/reducers/mainReducer";
const Home = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuth(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <Container
      maxW="100vw"
      bg="#f9f6f6"
      p="0"
      h="100vh"
    >
      <InvalidAuthDialog />
      <NavBar />
      <SideBar />
    </Container>
  );
};
export default Home;
