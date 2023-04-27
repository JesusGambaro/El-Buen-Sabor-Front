import App from "../App";
import IndexAdmin from "@admin/IndexAdmin";
import { createBrowserRouter } from "react-router-dom";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <IndexAdmin />,
  },
]);

export default BrowserRouter;
