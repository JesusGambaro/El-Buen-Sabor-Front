import "./stock.scss";
import { Tabs } from "@mantine/core";
import Products from "./Productos/Productos";
import Categories from "./Categories/Categories";
import Ingredientes from "./Insumos/Insumos";
import SideFilter from "./SideFilter/SideFilter";
import { Category, Packages, Cheese } from "tabler-icons-react";

const Stock = () => {
  return (
    <Tabs color="orange" variant="pills" radius="xl" defaultValue="categories">
      <Tabs.List grow position="center" h={50} mt="md">
        <Tabs.Tab value="categories" icon={<Category size="1.2rem" />} fz="lg">
          Categorías
        </Tabs.Tab>
        <Tabs.Tab value="products" icon={<Packages size="1.2rem" />}>
          Productos
        </Tabs.Tab>
        <Tabs.Tab value="ingredients" icon={<Cheese size="1.2rem" />}>
          Ingredientes
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="categories" mt="xl" display="flex">
        <SideFilter />
        <Categories />
      </Tabs.Panel>
      <Tabs.Panel value="products" mt="xl" display="flex">
        <SideFilter />
        <Products />
      </Tabs.Panel>
      <Tabs.Panel value="ingredients" mt="xl" display="flex">
        <SideFilter />
        <Ingredientes />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Stock;
