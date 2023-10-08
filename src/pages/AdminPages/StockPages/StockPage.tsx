import { Tabs } from "@mantine/core";
import ProductosPage from "@pages/AdminPages/StockPages/ProductosPages/ProductosPage";
import CategoriasPage from "@pages/AdminPages/StockPages/CategoriasPage";
import InsumosPage from "@pages/AdminPages/StockPages/InsumosPage";
import { Category, Packages, Cheese } from "tabler-icons-react";
import { useNavigate, useParams } from "react-router-dom";

const Stock = (): JSX.Element => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <Tabs
      color="orange"
      variant="default"
      radius="md"
      keepMounted={false}
      value={tabValue}
      onTabChange={(value) => {
        navigate(`/admin/stock/${value as string}`);
      }}
      h="100%"
    >
      <Tabs.List grow position="center" h={50} my="md">
        <Tabs.Tab value="categorias" icon={<Category size="1.2rem" />} fz="lg">
          Categorías
        </Tabs.Tab>
        <Tabs.Tab value="productos" icon={<Packages size="1.2rem" />} fz="lg">
          Productos
        </Tabs.Tab>
        <Tabs.Tab value="insumos" icon={<Cheese size="1.2rem" />} fz="lg">
          Insumos
        </Tabs.Tab>
      </Tabs.List>
      {/* <SideFilter /> */}
      <Tabs.Panel value="categorias" h="100%">
        <CategoriasPage />
      </Tabs.Panel>
      <Tabs.Panel value="productos" h="100%">
        <ProductosPage />
      </Tabs.Panel>
      <Tabs.Panel value="insumos" h="100%">
        <InsumosPage />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Stock;
