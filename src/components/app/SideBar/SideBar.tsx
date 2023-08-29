import "./sidebar.scss";
import { Box, Flex, useMantineColorScheme } from "@mantine/core";
import SideIcon from "./SideIcon/SideIcon";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import { SideBarProps } from "types/types";

const SideBar = () => {
  const { isAuthenticated } = useAuth0();
  const mobile = useMediaQuery(`(max-width: 700px)`);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return mobile ? (
    <></>
  ) : (
    <Flex
      h="calc(100vh - 5.5rem)"
      w="8rem"
      bg={dark ? "#181818" : "white"}
      justify="space-between"
      align="center"
      pos="fixed"
        top="5.5rem"
        style={{zIndex:99}}
    >
      <Flex
        h="50%"
        justify={"space-evenly"}
        align="center"
        w="100%"
        direction={"column"}
      >
        <SideIcon label="Home" />
        <SideIcon label="Catálogo" />
        {isAuthenticated && (
          <>
            <SideIcon label="Carrito" />
            <SideIcon label="Configuración" />
            <SideIcon label="Pedidos" />
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default SideBar;
