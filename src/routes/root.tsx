import { ErrorPage } from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import StockPage from "@pages/AdminPages/StockPages/StockPage";
import AdminPage from "@pages/AdminPages/AdminPage";
import IngredientesPage from "@pages/AdminPages/StockPages/IngredientesPage";
import { UsersPage } from "@pages/AdminPages/UsersPage";
import { ProductoFormPage } from "@pages/AdminPages/StockPages/ProductosPages/ProductoFormPage";
import DashboardPage from "@pages/AdminPages/DashBoardPages/DashboardPage";
import Landing from "@components/app/Landing/Landing";
import Catalogue from "@components/app/Catalogue/Catalogue";
import ProductDetailPage from "@pages/ProductDetailPage";
import { CartDetailPage } from "@pages/CartDetailPage";
import { Pedidos } from "@components/app/Pedidos/Pedidos";
ProductDetailPage
const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage/>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/catálogo",
        element: <Catalogue />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/configuración",
        element: <></>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/carrito",
        element: <CartDetailPage/>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/pedidos",
        element: <Pedidos></Pedidos>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/pedidos/:id",
        element: <Pedidos></Pedidos>,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/dashboard/:tabValue",
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin/stock/:tabValue",
        element: <StockPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/admin/stock/:tabValue/edit/:id",
            element: <ProductoFormPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/admin/stock/:tabValue/create",
            element: <ProductoFormPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "/admin/pedidos",
        element: <IngredientesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin/usuarios",
        element: <UsersPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin/configuracion",
        element: <></>,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default BrowserRouter;
