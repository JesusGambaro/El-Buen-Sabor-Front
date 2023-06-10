import "./sidebar.scss";
import { Box, Flex } from "@chakra-ui/react";
import SideIcon from "./SideIcon/SideIcon";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
const SideBar = () => {
  const { isAuthenticated } = useAuth0();
  const [isOpen, setIsOpen] = useState(false)
  const mobile = useMediaQuery(`(max-width: 700px)`);
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
      left={mobile ? isOpen ? "100%" : "0" : "0"}
      zIndex={100}
      transition={"0.5s ease all"}
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
