import { useState, useEffect } from "react";
import "./navbar.scss";
import Cart from "@app/Cart/Cart";
import {
  Box,
  Image,
  Container,
  Flex,
  useMantineColorScheme,
  ActionIcon,
  Navbar,
  Input,
  Tooltip,
  Button,
  createStyles,
  getStylesRef,
  Avatar,
  Badge,
  Group,
  Menu,
  Text,
  Drawer,
} from "@mantine/core";
import {
  IconSun,
  IconMoonStars,
  IconSearch,
  IconChevronDown,
  IconShoppingCart,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import useMainStore from "@store/mainStore";
import { useLocation } from "react-router-dom";
import useCatalogueStore from "@store/catalogueStore";
import { List, Logout } from "tabler-icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useApiQuery } from "@hooks/useQueries";
import { Carrito } from "types/types";
interface NavBarProps {
  openSideBar: () => void;
}

const NavBar = () => {
  const location = useLocation();
  const [nombre_like, setNombre_like] = useState("" as string);
  const { filter, setFilter } = useCatalogueStore();
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  let handleSetFilter = () => {
    setFilter({
      ...filter,
      nombre_like,
    });
  };
  const [inCartDetail, setInCartDetail] = useState(
    location.pathname == "/carrito"
  );
  useEffect(() => {
    setInCartDetail(location.pathname == "/carrito");
  }, [location.pathname]);
  const { setToken, token, isMobile,setSideBarOpen} = useMainStore();

  const navigate = useNavigate();
  const {
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
  } = useAuth0();
  const fetchProtectedData = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      //console.log("Access Token:", accessToken);
      setToken(accessToken);
    } catch (error) {
      console.error("Error retrieving access token:", error);
    }
  };
  useEffect(() => {
    //console.log(user);
    if (isAuthenticated) {
      fetchProtectedData();
    }
  }, [user]);
  type QueryPropsCarrito = {
    data: Carrito;
    error: any;
    isLoading: boolean;
  };
  const btnRef: any = React.useRef(null);
  const mobile = useMediaQuery(`(max-width: 700px)`);
  const handleIsAuth = () => {
    if (isAuthenticated) {
      open();
    } else {
    }
  };
  const trimName = (name: string = ""): string => {
    return name.includes("@") ? name.split("@")[0] : name;
  };
  const useStyles = createStyles((theme) => ({
    buttonSearch: {
      backgroundColor: "transparent",
      [`&:hover`]: {
        backgroundColor: "transparent",
        color: "red",
        iconSearch: {
          color: "red",
        },
      },
      width: "3rem",
      ref: getStylesRef("button"),
    },
    iconSearch: {
      color: "#fd7e14",
      display: "flex",
      opacity: 0.2,
      zIndex: 3,
      cursor: "pointer",
      flexGrow: 1,
      [`&:hover`]: {
        opacity: 1,
      },
    },
    inputSearch: {
      width: "100%",
      input: {
        "&:focus-within": {
          border: "solid 2px orange",
        },
        transition: "border-width 0.1s ease-in-out",
        borderWidth: "0.15rem",
        border: "solid 1px orange",
      },
    },
    badgeAuth: {
      backgroundColor: "#fd7e14",
      color: "white",
      width: isAuthenticated ? (isMobile ? "5rem" : "15rem") : "8rem",
      cursor: !isAuthenticated ? "pointer" : "default",
      minHeight: isAuthenticated ? "2.5rem" : "2rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      span: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      },
    },
  }));
  const { classes } = useStyles();

  return (
    <>
      <Navbar
        bg={dark ? "#181818" : "white"}
        w="100%"
        style={{
          zIndex: 100,
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
        h="5.5rem"
      >
        <Flex w={"8rem"} justify={"center"} h={"100%"} align="center">
          <Box
            color="black"
            bg="transparent"
            onDragStart={(e) => e.preventDefault()}
            onClick={(e) => {
              if (!isMobile) return;
              setSideBarOpen(true);
            }}
          >
            <Image
              maw={"70px"}
              mx="auto"
              radius="md"
              src="https://res.cloudinary.com/dquqzevft/image/upload/v1680564907/Logo.png"
              alt="Random image"
            />
          </Box>
        </Flex>
        <Flex w={"30rem"} justify={"center"} h={"100%"} align="center">
          <Input
            placeholder="Busca un producto.."
            className={classes.inputSearch}
            rightSection={
              <div>
                <IconSearch
                  onClick={() => {
                    handleSetFilter();
                  }}
                  className={classes.iconSearch}
                  size="1.1rem"
                />
              </div>
            }
            onChange={(e) => {
              setNombre_like(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSetFilter();
              } else if (e.key === "Backspace") {
                handleSetFilter();
              }
            }}
          />
        </Flex>
        <Flex px={"1rem"} align={"center"} gap={10}>
          <Badge
            className={classes.badgeAuth}
            fullWidth={false}
            leftSection={
              isAuthenticated && (
                <Avatar
                  alt="Avatar for badge"
                  size={35}
                  style={{ borderRadius: "50%" }}
                  src={user?.picture}
                />
              )
            }
            rightSection={
              isAuthenticated && (
                <Menu
                  shadow="md"
                  position={"bottom-end"}
                  offset={20}
                  
                >
                  <Menu.Target>
                    <IconChevronDown
                      cursor={"pointer"}
                      size={24}
                    ></IconChevronDown>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item
                      onClick={() => {
                        navigate("/pedidos");
                      }}
                      icon={<List size={14} />}
                    >
                      Pedidos
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        navigate("/carrito");
                      }}
                      icon={<IconShoppingCart size={14} />}
                    >
                      Carrito
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        navigate("/configuración");
                      }}
                      icon={<IconSettings size={14} />}
                    >
                      Configuración de cuenta
                    </Menu.Item>
                    {!isMobile ? (
                      <></>
                    ) : (
                      <Menu.Item
                        onClick={() => toggleColorScheme()}
                        icon={
                          <ActionIcon
                            variant="outline"
                            color={dark ? "yellow" : "blue"}
                          >
                            {dark ? (
                              <IconSun size="1.1rem" />
                            ) : (
                              <IconMoonStars size="1.1rem" />
                            )}
                          </ActionIcon>
                        }
                      >
                        Cambiar tema
                      </Menu.Item>
                    )}
                    <Menu.Divider />
                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      color="red"
                      icon={<IconLogout size={14} />}
                    >
                      Salir
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )
            }
          >
            <Text
              onClick={() => {
                if (!isAuthenticated) {
                  loginWithRedirect();
                }
              }}
              color="white"
            >
              {isAuthenticated
                ? !isMobile
                  ? trimName(user?.name)
                  : ""
                : "Iniciar sesión"}
            </Text>
          </Badge>
          {isMobile ? (
            <></>
          ) : (
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
            >
              {dark ? (
                <IconSun size="1.1rem" />
              ) : (
                <IconMoonStars size="1.1rem" />
              )}
            </ActionIcon>
          )}
          {!inCartDetail && (
            <ActionIcon
              variant="transparent"
              color={dark ? "yellow" : "blue"}
              onClick={handleIsAuth}
            >
              <i className={"fa-solid fa-cart-shopping"}></i>
            </ActionIcon>
          )}

          {isAuthenticated && token?.length > 0 && (
            <Cart isOpen={opened} onClose={close} btnRef={btnRef} />
          )}
        </Flex>
      </Navbar>
    </>
  );
};
export default NavBar;
