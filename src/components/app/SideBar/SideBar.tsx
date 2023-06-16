import "./sidebar.scss";
import { Box, Flex } from "@chakra-ui/react";
import SideIcon from "./SideIcon/SideIcon";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Drawer } from "@mantine/core";
import { SideBarProps } from "types/types";

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  const { isAuthenticated } = useAuth0();
  const mobile = useMediaQuery(`(max-width: 700px)`);
  return mobile ? (
    <Drawer opened={isOpen} w="100%" onClose={onClose} withCloseButton={true}>
      Drawer without header, press escape or click on overlay to close
    </Drawer>
  ) : (
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
