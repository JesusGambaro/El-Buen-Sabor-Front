import { useEffect } from "react";
import "./home.scss";
import { Container } from "@chakra-ui/react";
import SideBar from "@app/SideBar/SideBar";
import NavBar from "@app/NavBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import InvalidAuthDialog from "@app/InvalidAuthDialog/InvalidAuthDialog";
import { useDispatch } from "react-redux";
import { setAuth } from "@redux/reducers/mainReducer";

const Home = () => {
  const { isAuthenticated }: any = useAuth0();
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(setAuth(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <Container maxW="100vw" bg="#f9f6f6" p="0" h="100vh">
      <InvalidAuthDialog />
      <NavBar />
      <SideBar />
    </Container>
  );
};
export default Home;
