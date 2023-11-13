import { RouterProvider } from "react-router-dom";
import Router from "./routes/root";
import {
  type ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { useEffect, type JSX } from "react";
import useMainStore from "@store/mainStore";

function App(): JSX.Element {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme): void => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([
    [
      "mod+J",
      () => {
        toggleColorScheme();
      },
    ],
  ]);
  const { setIsMobile,cart} = useMainStore();
  const matches = useMediaQuery('(max-width: 700px)');
  
  useEffect(() => {
    setIsMobile(matches);
  }, [matches])
  
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <Container
          size="xl"
          fluid
          p={0}
          h="100vh"
          style={{
            overflowY: "hidden",
          }}
        >
          <RouterProvider router={Router} />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
export default App;
