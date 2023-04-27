import React from "react";
import "./sidebar.scss";
import {
  Box,
  Flex,
  useColorModeValue,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Button,
  Image,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import SideIcon from "./SideIcon/SideIcon";
import Users from "@admin/Users/Users";
import NavBarAdmin from "@admin/NavBar/NavBar";
import Stock from "../Stock/Stock";

const SidebarAdmin = () => {
  let tabChangeTransition = "all 0.2s cubic-bezier(.08,.52,.52,1)";
  const { isOpen, onToggle } = useDisclosure();

  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");

  return (
    <Box w="100%" h="100%" pos="relative">
      {/* <NavBarAdmin /> */}
      <Tabs
        defaultIndex={1}
        orientation="vertical"
        w="100%"
        h="100%"
        transition={tabChangeTransition}
      >
        <TabList
          h="100%"
          w="20rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
          bg="orange"
          color={sidebarBg}
        >
          <Image src="/logo.png" w="10rem" />
          <Flex
            h="50%"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <SideIcon label="Dashboard" admin />
            <SideIcon label="Stock" admin />
            <SideIcon label="Pedidos" admin />
            <SideIcon label="Usuarios" admin />
            <SideIcon label="Configuración" admin />
          </Flex>
        </TabList>
        <TabPanels overflowY="auto" w="100%" h="100%">
          <TabPanel mt="2rem">Dashboard</TabPanel>
          <TabPanel>
            <Heading>
              Stock
            </Heading>
            <Stock />
          </TabPanel>
          <TabPanel h="100%">Pedidos</TabPanel>
          <TabPanel h="100%">
            <Users />
          </TabPanel>
          <TabPanel h="100%">Configuración</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default SidebarAdmin;
