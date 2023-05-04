import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import theme from "./utils/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import App from "./App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </QueryClientProvider>
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
