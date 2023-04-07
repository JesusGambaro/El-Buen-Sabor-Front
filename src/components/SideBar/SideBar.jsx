import React from "react";
import "./sidebar.scss";
import {mainColor} from "../../utils/utils";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  Collapse,
  ScaleFade,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Tooltip,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import SideIcon from "./SideIcon/SideIcon";
import Landing from "../Landing/Landing";
import Clients from "../Clients/Clients";

const SideBar = () => {
  let tabChangeTransition = "all 0.2s cubic-bezier(.08,.52,.52,1)";
  const {isOpen, onToggle} = useDisclosure();

  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");

  return (
    <Box display={{sm: "none", xl: "block"}} minH="100%" w="100%">
      <Tabs
        defaultIndex={0}
        orientation="vertical"
        w="100%"
        h="100%"
        transition={tabChangeTransition}
      >
        <TabList
          h="100%"
          w="8rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          bg="white"
        >
          <Flex
            h="50%"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <SideIcon label="Home" />
            <SideIcon label="Catálogo" />
            <SideIcon label="Carrito" />
            <SideIcon label="Configuración" />
          </Flex>
          <Button bg={mainColor} color="white" w="100%" h="3rem">
            <i className="fa-solid fa-right-from-bracket"></i>{" "}
          </Button>
        </TabList>
        <TabPanels bg="#f9f5f5">
          <TabPanel>
            <Landing />
          </TabPanel>
          <TabPanel>
            <Clients />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
          {/*<ScaleFade initialScale={0.9} in=></ScaleFade>*/}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default SideBar;
