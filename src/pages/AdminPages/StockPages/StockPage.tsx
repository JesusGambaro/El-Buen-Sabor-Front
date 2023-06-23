import { Paper, Tabs } from "@mantine/core";
import ProductosPage from "@pages/AdminPages/StockPages/ProductosPages/ProductosPage";
import CategoriasPage from "@pages/AdminPages/StockPages/CategoriasPage";
import IngredientesPage from "@pages/AdminPages/StockPages/IngredientesPage";
import { Category, Packages, Cheese } from "tabler-icons-react";
import { useNavigate, useParams } from "react-router-dom";

const Stock = () => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Tabs
      color="orange"
      variant="default"
      radius="md"
      keepMounted={false}
      value={tabValue}
      onTabChange={(value) => navigate(`/admin/stock/${value}`)}
    >
      <Tabs.List grow position="center" h={50} mt="md">
        <Tabs.Tab value="categorias" icon={<Category size="1.2rem" />} fz="lg">
          Categorías
        </Tabs.Tab>
        <Tabs.Tab value="productos" icon={<Packages size="1.2rem" />}>
          Productos
        </Tabs.Tab>
        <Tabs.Tab value="insumos" icon={<Cheese size="1.2rem" />}>
          Ingredientes
        </Tabs.Tab>
      </Tabs.List>
      {/* <SideFilter /> */}
      <Tabs.Panel value="categorias" mt="xl">
        <CategoriasPage />
      </Tabs.Panel>
      <Tabs.Panel value="productos" mt="xl" display="flex">
        <ProductosPage />
      </Tabs.Panel>
      <Tabs.Panel value="insumos" mt="xl" display="flex">
        <IngredientesPage />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Stock;
