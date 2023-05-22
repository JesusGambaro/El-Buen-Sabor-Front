import React, { useEffect, useState } from "react";
import "./navbaradmin.scss";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Tag,
  Heading,
  TagLabel,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { adminPaths } from "@utils/constants";
import { CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

const NavBarAdmin = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const [jwt, setJwt] = useState<string>("");

  const fetchProtectedData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      console.log("Access Token:", accessToken);
      setJwt(accessToken);
    } catch (error) {
      console.error("Error retrieving access token:", error);
    }
  };
  useEffect(() => {
    console.log(user);
    fetchProtectedData();
  }, [user]);

  const { pathname } = useLocation();
  const trimName = (name: string = ""): string => {
    return name.includes("@") ? name.split("@")[0] : name;
  };
  const currentTitle: string =
    adminPaths.find((route) => pathname.includes(route.route))?.name || "";
  return (
    <SimpleGrid
      h="5.5rem"
      w="100%"
      pos="fixed"
      top="0"
      left="0"
      style={{ zIndex: 100 }}
      columns={4}
      alignItems="center"
      bg="white"
      boxShadow="0 0 10px rgba(0,0,0,0.2)"
    >
      <Heading
        h="100%"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {currentTitle}
      </Heading>
      <div>
        <textarea
          name="jwt"
          id="jwtr"
          cols={100}
          rows={5}
          value={jwt}
        ></textarea>
      </div>
      <div>
        <CopyButton value={jwt} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </div>
      <Tag
        h="50%"
        size="lg"
        colorScheme="orange"
        borderRadius="full"
        py={1}
        bg="orange"
        w="fit-content"
        ml="auto"
        mr={4}
      >
        {isAuthenticated && (
          <Image
            boxSize="2rem"
            borderRadius="full"
            src={user?.picture}
            alt={user?.name}
            mr={2}
          />
        )}
        <TagLabel
          _hover={{
            cursor: "pointer",
          }}
          onClick={() => {
            if (!isAuthenticated) {
              loginWithRedirect({
                appState: {
                  returnTo: "http://localhost:5173/admin/",
                },
              });
            }
          }}
          color="white"
        >
          {isAuthenticated ? trimName(user?.name || "") : "Iniciar sesión"}
        </TagLabel>
        {isAuthenticated && (
          <Menu isLazy>
            <MenuButton
              aria-label="Options"
              size="sm"
              cursor="pointer"
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="unstyled"
              bg="orange"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="all 0.2s"
              color="white"
              colorScheme="orange"
              _hover={{
                color: "white",
                bg: "orange",
              }}
              _expanded={{
                color: "white",
                bg: "orange",
              }}
              ml={1}
            />
            <MenuList>
              <MenuGroup title="Perfil">
                <MenuItem>Mi cuenta</MenuItem>
                <MenuItem>Pedidos </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Configuración">
                <MenuItem>Configuración</MenuItem>
                <MenuItem
                  onClick={() =>
                    logout({
                      logoutParams: {
                        returnTo: "http://localhost:5173/admin/",
                      },
                    })
                  }
                >
                  Salir
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
      </Tag>
    </SimpleGrid>
  );
};
export default NavBarAdmin;
