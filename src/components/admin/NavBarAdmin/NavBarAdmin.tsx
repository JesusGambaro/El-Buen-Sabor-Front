import {
  Navbar,
  Group,
  ScrollArea,
  createStyles,
  rem,
  Image,
  LoadingOverlay,
  Box,
} from "@mantine/core";

import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinksGroup";
import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
import { adminPaths } from "@utils/constants";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function NavBarAdmin() {
  const { classes } = useStyles();
  const links = adminPaths.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
  }: Auth0ContextInterface = useAuth0();
  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar} h="100vh">
      <Navbar.Section className={classes.header}>
        <Group position="center">
          <Image src="/logo.png" width={60} height={60} />
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Box pos="relative">
          <LoadingOverlay
            loaderProps={{ size: "sm", color: "orange", variant: "bars" }}
            overlayBlur={2}
            visible={isLoading}
          />
          <UserButton
            image={user?.picture}
            name={user?.name}
            email={user?.email}
            logout={logout}
            login={loginWithRedirect}
          />
        </Box>
      </Navbar.Section>
    </Navbar>
  );
}
