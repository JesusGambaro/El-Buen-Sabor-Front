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
  const { setToken, token } = useMainStore();

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
      width: isAuthenticated ? "15rem" : "8rem",
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
    // <Box
    //   px={4}
    //   py={2}
    //   bg={useColorModeValue("white", "gray.800")}
    //   w="100%"
    //   pos="fixed"
    //   zIndex="100"
    //   h="5.5rem"
    // >
    //   {mobile && (
    //     <Drawer isOpen={isOpenSideBar} onClose={CloseSideBar}>
    //       <DrawerOverlay />
    //       <DrawerContent>
    //         <DrawerCloseButton
    //           color="orange.300"
    //           _hover={{
    //             color: "orange.500",
    //           }}
    //           size="lg"
    //         />
    //         <DrawerHeader as="h2" fontSize="2xl" fontWeight="bold">
    //           El Buen sabor
    //         </DrawerHeader>
    //         <DrawerBody></DrawerBody>
    //         <DrawerFooter></DrawerFooter>
    //       </DrawerContent>
    //     </Drawer>
    //   )}

    //   <Flex alignItems="center">
    //     <Box
    //       color="black"
    //       bg="white"
    //       borderRadius="md"
    //       onDragStart={(e) => e.preventDefault()}
    //       onClick={(e) => e.preventDefault()}
    //       cursor="pointer"
    //     >
    //       <Image
    //         boxSize="70px"
    //         objectFit="cover"
    //         src="https://res.cloudinary.com/dquqzevft/image/upload/v1680564907/Logo.png"
    //         alt="El Buen Sabor"
    //         ml={2}
    //       />
    //     </Box>
    //     <Spacer />
    //     <InputGroup size="md" w="30%" maxW="600px">
    //       <InputLeftElement
    //         onClick={() => {
    //           handleSetFilter();
    //         }}
    //         children={<SearchIcon color="orange" />}
    //       />
    //       <Input
    //         type="tel"
    //         placeholder="Buscar comida..."
    //         focusBorderColor="orange.300"
    //         onChange={(e) => {
    //           setNombre_like(e.target.value);
    //         }}
    //         onKeyDown={(e) => {
    //           if (e.key === "Enter") {
    //             handleSetFilter();
    //           } else if (e.key === "Backspace") {
    //             handleSetFilter();
    //           }
    //         }}
    //       />
    //     </InputGroup>
    //     <Spacer />
    //     {/**
    //      * ? Color Mode
    //      */}
    //     <Button onClick={toggleColorMode} visibility="hidden">
    //       Toggle {colorMode === "light" ? "Dark" : "Light"}
    //     </Button>
    //     {/**
    //      * * Login
    //      */}
    //     <Tag
    //       size="lg"
    //       colorScheme="orange"
    //       borderRadius="full"
    //       py={1}
    //       bg="orange"
    //     >
    //       {isAuthenticated && (
    //         <Image
    //           boxSize="2rem"
    //           borderRadius="full"
    //           src={user?.picture}
    //           alt={user?.name}
    //           mr={2}
    //         />
    //       )}
    //       <TagLabel
    //         _hover={{
    //           cursor: "pointer",
    //         }}
    //         onClick={() => {
    //           if (!isAuthenticated) {
    //             loginWithRedirect();
    //           }
    //         }}
    //         color="white"
    //       >
    //         {isAuthenticated ? trimName(user?.name) : "Iniciar sesión"}
    //       </TagLabel>
    //       {isAuthenticated && (
    //         <Menu isLazy>
    //           <MenuButton
    //             aria-label="Options"
    //             size="sm"
    //             cursor="pointer"
    //             as={Button}
    //             rightIcon={<ChevronDownIcon />}
    //             variant="unstyled"
    //             bg="orange"
    //             display="flex"
    //             alignItems="center"
    //             justifyContent="center"
    //             transition="all 0.2s"
    //             color="white"
    //             colorScheme="orange"
    //             _hover={{
    //               color: "white",
    //               bg: "orange",
    //             }}
    //             _expanded={{
    //               color: "white",
    //               bg: "orange",
    //             }}
    //             ml={1}
    //           />
    //           <MenuList>
    //             <MenuGroup title="Perfil">
    //   <MenuItem
    //     onClick={() => {
    //       navigate("/pedidos");
    //     }}
    //   >
    //     Pedidos
    //   </MenuItem>
    //   <MenuItem
    //     onClick={() => {
    //       navigate("/carrito");
    //     }}
    //   >
    //     Carrito
    //   </MenuItem>
    // </MenuGroup>
    // <MenuDivider />
    // <MenuGroup title="Configuración">
    //   <MenuItem
    //     onClick={() => {
    //       navigate("/configuración");
    //     }}
    //   >
    //     Mi cuenta
    //   </MenuItem>
    //   <MenuItem
    //     onClick={() =>
    //       logout({
    //         logoutParams: { returnTo: window.location.origin },
    //       })
    //     }
    //   >
    //     Salir
    //   </MenuItem>
    //             </MenuGroup>
    //           </MenuList>
    //         </Menu>
    //       )}
    //     </Tag>
    // {!inCartDetail && (
    //   <Button
    //     ref={btnRef}
    //     variant="solid"
    //     color="orange"
    //     bg="white"
    //     borderRadius="full"
    //     _hover={{
    //       bg: "white",
    //     }}
    //     onClick={handleIsAuth}
    //   >
    //     <i className="fa-solid fa-cart-shopping"></i>
    //   </Button>
    // )}

    // {isAuthenticated && token?.length > 0 && (
    //   <Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    // )}
    //   </Flex>
    // </Box>
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
            onClick={(e) => e.preventDefault()}
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
        <Flex px={"1rem"} align={"center"} gap={20}>
          <Badge
            className={classes.badgeAuth}
            fullWidth={false}
            leftSection={
              isAuthenticated && (
                <Avatar
                  alt="Avatar for badge"
                  size={35}
                  mr={5}
                  style={{ borderRadius: "50%" }}
                  src={user?.picture}
                />
              )
            }
            rightSection={
              isAuthenticated && (
                <Menu shadow="md" position="bottom-end" offset={20}>
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
              {isAuthenticated ? trimName(user?.name) : "Iniciar sesión"}
            </Text>
          </Badge>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
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
