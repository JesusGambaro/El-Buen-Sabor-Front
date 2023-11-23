import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import App from "./App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        audience: auth0Config.audience,
      }}
      onRedirectCallback={(appState) => {
        window.history.replaceState(
          {},
          document.title,
          appState?.returnTo || window.location.pathname
        );
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        <App />
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>
);
