import { type User as Auth0User, useAuth0 } from "@auth0/auth0-react";
import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useQueries";
import {
  Avatar,
  Button,
  Code,
  Container,
  Grid,
  Tabs,
  Text,
  rem,
} from "@mantine/core";
import {
  IconInfoSquareRounded,
  IconLock,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { useMantineTheme } from "@utils/theme";
import { log } from "console";
import { type User } from "types/types";

const UserConfigPage = (): JSX.Element => {
  const { classes } = useMantineTheme();
  const { user: auth0User, isLoading, logout } = useAuth0<Auth0User>();

  const { data: user, isLoading: isGetting } = useApiQuery(
    "GET|users/getOne",
    {
      id: auth0User?.sub,
    },
    !isLoading
  ) as {
    data: User;
    error: any;
    isLoading: boolean;
  };

  const codeForPreviousDemo = `{
    ${auth0User?.sub}
  }`;

  if (isGetting) return <Loader />;

  return (
    <Tabs
      w="100%"
      maw="100%"
      h="100%"
      style={{ border: ".1rem solid red" }}
      mt="lg"
      color="orange"
      variant="default"
      orientation="vertical"
      defaultValue="personalInfo"
      styles={(theme) => ({
        tabLabel: {
          width: "100%",
          textAlign: "center",
          fontWeight: "bold",
        },
        tab: {
          padding: "1rem",
        },
      })}
    >
      <Tabs.List position="left" w="20%">
        <Avatar
          src={auth0User?.picture}
          size={120}
          radius={120}
          mx="auto"
          my="lg"
        />
        <Tabs.Tab value="personalInfo" icon={<IconUserCircle size="1.4rem" />}>
          Información personal
        </Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconLock size="1.4rem" />}>
          Contraseña y seguridad
        </Tabs.Tab>
        <Button
          variant="light"
          color="red"
          onClick={() => {
            logout().then(() => {
              window.location.reload();
              window.localStorage.removeItem("token");
              window.location.href = "/admin";
            });
          }}
        >
          Cerrar sesión
        </Button>
      </Tabs.List>
      <Tabs.Panel value="personalInfo" pl="xs">
        <Code>{JSON.stringify(user, null, 2)}</Code>
      </Tabs.Panel>
      <Tabs.Panel value="settings" pl="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserConfigPage;
