import "./sidebar.scss";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import SideIcon from "./SideIcon/SideIcon";
import Landing from "../Landing/Landing";
import Clients from "../Clients/Clients";
import { Footer } from "@app/Footer/Footer";
import { UserConfig } from "@app/UserConfig/UserConfig";

const SideBar = () => {
  let tabChangeTransition = "all 0.2s cubic-bezier(.08,.52,.52,1)";
  return (
    <Box w="100%" h="calc(100vh - 5.5rem)" pos="relative" top="5.5rem">
      <Tabs
        defaultIndex={0}
        orientation="vertical"
        w="100%"
        h="100%"
        transition={tabChangeTransition}
      >
        <TabList
          h="calc(100vh - 5.5rem)"
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
          
        </TabList>
        <TabPanels overflowY="auto" w="100%" h="100%">
          <TabPanel w="100%" display="flex">
            <Landing />
          </TabPanel>
          <TabPanel h="100%">
            <Clients />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
          <TabPanel>
            <UserConfig />
          </TabPanel>
          <Footer />
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default SideBar;
