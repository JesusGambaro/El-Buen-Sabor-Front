import IndexAdmin from "@admin/IndexAdmin";
import Landing from "@components/app/Landing/Landing";
import SideBar from "@components/app/SideBar/SideBar";
import { ErrorPage } from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import ProductDetailPage from "@pages/ProductDetailPage";
import { createBrowserRouter } from "react-router-dom";
import Catalogue from "@components/app/Catalogue/Catalogue";
import { UserConfig } from "@components/app/UserConfig/UserConfig";
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
        element: <ProductDetailPage />,
        errorElement: <ErrorPage />,
      },

    ],
  },
  {
    path: "/admin",
    element: <IndexAdmin />,
  },
]);

export default BrowserRouter;
