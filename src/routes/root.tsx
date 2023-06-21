import Landing from "@components/app/Landing/Landing";
import { ErrorPage } from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import ProductDetailPage from "@pages/ProductDetailPage";
import { createBrowserRouter } from "react-router-dom";
import Catalogue from "@components/app/Catalogue/Catalogue";
import { UserConfig } from "@components/app/UserConfig/UserConfig";
import Dashboard from "@components/admin/Dashboard/Dashboard";
import Stock from "@components/admin/Stock/Stock";
import AdminPage from "@pages/AdminPage";
import {CartDetailPage} from "@pages/CartDetailPage";

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
        element: <ProductDetailPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/catálogo",
        element: <Catalogue />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/configuración",
        element: <UserConfig />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/carrito",
        element: <CartDetailPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  // {
  //   path: "/admin",
  //   element: <AdminPage />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: "/admin/",
  //       element: <Dashboard />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "/admin/stock",
  //       element: <Stock />,
  //       errorElement: <ErrorPage />,
  //     },
  //     // {
  //     //   path: "/admin/categoria/:id",
  //     //   element: <CategoryDetail />,
  //     //   errorElement: <ErrorPage />,
  //     // },
  //     {
  //       path: "/admin/pedidos",
  //       element: <Stock />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "/admin/usuarios",
  //       element: <Stock />,
  //       errorElement: <ErrorPage />,
  //     },
  //     {
  //       path: "/admin/configuracion",
  //       element: <Stock />,
  //       errorElement: <ErrorPage />,
  //     },
  //   ],
  // },
]);

export default BrowserRouter;
