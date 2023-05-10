import "./sidebar.scss";
import { Box, Flex } from "@chakra-ui/react";
import SideIcon from "./SideIcon/SideIcon";
import { useAuth0 } from "@auth0/auth0-react";

const SideBar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Box
      h="calc(100vh - 5.5rem)"
      w="8rem"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      position="fixed"
      top="5.5rem"
      left="0"
    >
      <Flex
        h="50%"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
        w="100%"
      >
        <SideIcon label="Home" />
        <SideIcon label="Catálogo" />
        {isAuthenticated && (
          <>
            <SideIcon label="Carrito" />
            <SideIcon label="Configuración" />
          </>
        )}
      </Flex>
    </Box>
  );
};
export default SideBar;
