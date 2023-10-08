import {
  Navbar,
  Group,
  ScrollArea,
  Image,
  LoadingOverlay,
  Box,
} from "@mantine/core";

import { UserButton } from "./UserButton";
import { LinksGroup } from "./NavbarLinksGroup";
import { adminPaths } from "@utils/constants";
import { type Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
import { useMantineTheme } from "@utils/theme";

export const NavBarAdmin = (): JSX.Element => {
  const { classes } = useMantineTheme();
  const links = adminPaths.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const { isLoading, user, loginWithRedirect, logout }: Auth0ContextInterface =
    useAuth0();
  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar} h="100vh">
      <Navbar.Section className={classes.header2}>
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
            login={loginWithRedirect as any}
          />
        </Box>
      </Navbar.Section>
    </Navbar>
  );
};
