import { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import SideBar from "@app/SideBar/SideBar";
import NavBar from "@app/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import InvalidAuthDialog from "@app/InvalidAuthDialog/InvalidAuthDialog";
import { Outlet } from "react-router-dom";
import { Footer } from "@components/app/Footer/Footer";
import { useMediaQuery } from "@mantine/hooks";
const HomePage = () => {
  const { isAuthenticated }: any = useAuth0();

  useEffect(() => {}, [isAuthenticated]);
  const mobile = useMediaQuery(`(max-width: 700px)`);
  return (
    <Container maxW="100vw" bg="#f9f6f6" p="0" h="100vh">
      <NavBar />
      <InvalidAuthDialog />
      <Container
        overflowY="auto"
        p="0"
        h="calc(100vh - 5.5rem)"
        position="fixed"
        maxW={`calc(100vw - ${mobile ? "0rem" : "8rem"})`}
        w={"100vw"}
        top="5.5rem"
        //left="8rem"
        left={`${mobile ? "0rem" : "8rem"}`}
        zIndex={2}
        pb="10rem"
      >
        <Outlet />
      </Container>
      <SideBar />
      <Footer />
    </Container>
  );
};
export default HomePage;
