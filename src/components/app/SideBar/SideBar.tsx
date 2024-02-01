import "./sidebar.scss";
import {
  Box,
  Drawer,
  Flex,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import SideIcon from "./SideIcon/SideIcon";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import { SideBarProps } from "types/types";
import useMainStore from "@store/mainStore";

const SideBar = () => {
  const { isAuthenticated } = useAuth0();
  const mobile = useMediaQuery(`(max-width: 700px)`);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [opened, { open, close }] = useDisclosure(false);
  const {sideBarOpen,setSideBarOpen} = useMainStore()
  return mobile ? (
    <Drawer
      opened={sideBarOpen}
      onClose={() => {
        setSideBarOpen(false);
      }}
      size={"60%"}
      position="left"
      transitionProps={{
        transition: "slide-right",
        duration: 200,
        timingFunction: "ease-in-out",
      }}
      overlayProps={{ opacity: 0.5, blur: 4 }}
      bg={"#f9f6f6"}
    >
      <Flex
        h="80vh"
        justify={"center"}
        align="flex-start"
        w="100%"
        direction={"column"}
        gap={"3rem"}
      >
        <Flex gap={"1rem"} align={"center"}>
          <SideIcon label="Home" />
          <Title order={5}>Inicio</Title>
        </Flex>
        <Flex gap={"1rem"} align={"center"}>
          <SideIcon label="Catálogo" />
          <Title order={5}>Catálogo</Title>
        </Flex>

        {isAuthenticated && (
          <>
          
            <Flex gap={"1rem"} align={"center"}>
              <SideIcon label="Carrito" />
              <Title order={5}>Carrito</Title>
            </Flex>
            <Flex gap={"1rem"} align={"center"}>
              <SideIcon label="Configuración" />
              <Title order={5}>Configuración</Title>
            </Flex>
            <Flex gap={"1rem"} align={"center"}>
              <SideIcon label="Pedidos" />
              <Title order={5}>Pedidos</Title>
            </Flex>
          </>
        )}
      </Flex>
    </Drawer>
  ) : (
    <Flex
      h="calc(100vh - 5.5rem)"
      w="8rem"
      bg={dark ? "#181818" : "white"}
      justify="space-between"
      align="center"
      pos="fixed"
      top="5.5rem"
      style={{ zIndex: 99 }}
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
