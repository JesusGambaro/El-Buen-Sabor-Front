import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import theme from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Auth0Provider
        domain="dev-jyps2gw84pxnplkp.us.auth0.com"
        clientId="7UXRO6kTy2WycWoDvEdhLRPLCv89WC0p"
        authorizationParams={{
          redirect_uri: "http://localhost:5173",
        }}
      >
        <App />
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
