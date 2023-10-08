import { type LogoutOptions } from "@auth0/auth0-react";
import {
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  type UnstyledButtonProps,
} from "@mantine/core";
import {
  IconBell,
  IconChevronRight,
  IconLogin,
  IconLogout,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import { useMantineTheme } from "@utils/theme";
import { useLocation } from "react-router";

interface UserButtonProps extends UnstyledButtonProps {
  image?: string;
  name?: string;
  email?: string;
  login: () => void;
  logout: (params: LogoutOptions) => void;
}

export const UserButton = ({
  image,
  name,
  email,
  login,
  logout,
  ...others
}: UserButtonProps): JSX.Element => {
  const { classes } = useMantineTheme();

  const location = useLocation();

  if ([image, name, email].some((v) => v === undefined || v === null)) {
    return (
      <UnstyledButton
        className={classes.user}
        onClick={() => {
          login();
        }}
      >
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
};
