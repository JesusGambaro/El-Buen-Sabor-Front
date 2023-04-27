import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import theme from "./utils/theme";
import { RouterProvider } from "react-router-dom";
import BrowserRouter from "./routes/root";

const aut0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Auth0Provider
        domain={aut0Config.domain}
        clientId={aut0Config.clientId}
        authorizationParams={{
          redirect_uri: aut0Config.redirectUri,
        }}
      >
        <RouterProvider router={BrowserRouter} />
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
