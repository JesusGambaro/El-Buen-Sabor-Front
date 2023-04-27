import "./stock.scss";
import {
  Container,
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Products from "./Products/Products";
import Categories from "./Categories/Categories";
import Ingredientes from "./Ingredientes/Ingredientes";
import SideFilter from "../SideFilter/SideFilter";

const Stock = () => {
    
  return (
    <Tabs
      isFitted
      variant="soft-rounded"
      colorScheme="orange"
      mt={10}
      size="lg"
    >
      <TabList mb="1em">
        <Tab>Categorias</Tab>
        <Tab>Productos</Tab>
        <Tab>Ingredientes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Categories />
        </TabPanel>
        <TabPanel>
         {/*  <SideFilter /> */}
          <Products />
        </TabPanel>
        <TabPanel display="flex" flexDirection="row">
        {/*   <SideFilter /> */}
          <Ingredientes />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Stock;
