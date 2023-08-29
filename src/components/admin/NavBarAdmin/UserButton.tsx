import { LogoutOptions } from "@auth0/auth0-react";
import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Menu,
  Box,
} from "@mantine/core";
import {
  IconBell,
  IconLogout,
  IconSearch,
  IconChevronRight,
  IconSettings,
  IconLogin,
} from "@tabler/icons-react";
import { useLocation } from "react-router";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image?: string;
  name?: string;
  email?: string;
  login: () => void;
  logout: (params: LogoutOptions) => void;
}

export function UserButton({
  image,
  name,
  email,
  login,
  logout,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();

  const location = useLocation();

  if (!image || !name || !email) {
    return (
      <UnstyledButton className={classes.user} onClick={() => login()}>
        <Group position="center">
          <IconLogin size={20} />
          <Text size="md" weight={500}>
            Iniciar sesión
          </Text>
        </Group>
      </UnstyledButton>
    );
  }
  return (
    <Menu
      position="right"
      offset={8}
      arrowPosition="center"
      withArrow
      trigger="hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>

              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>
            <IconChevronRight size="0.9rem" stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Perfil</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>Configuración</Menu.Item>
        <Menu.Item icon={<IconBell size={14} />}>Notificaciones</Menu.Item>
        <Menu.Label>Más</Menu.Label>
        <Menu.Item icon={<IconSearch size={14} />}>Buscar</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          icon={<IconLogout size={14} />}
          onClick={() => {
            alert(`${window.location.origin}${location.pathname}`);

            logout({
              logoutParams: {
                returnTo: `${window.location.origin}${location.pathname}`,
              },
            });
          }}
        >
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
