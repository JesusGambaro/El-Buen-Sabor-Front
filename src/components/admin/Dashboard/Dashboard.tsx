import { useRef, useEffect } from "react";
import {
  Container,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
type Props = {};

//REGISTER CHARTS

const Dashboard = (props: Props) => {
  return (
    <Tabs
      isFitted
      variant="solid-rounded"
      colorScheme="orange"
      mt={10}
      size="lg"
    >
      <TabList mb="1em">
        <Tab>Ranking de comidas</Tab>
        <Tab>Ingresos</Tab>
        <Tab>Ranking de clientes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel display="flex" flexDirection="row"></TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dashboard;
