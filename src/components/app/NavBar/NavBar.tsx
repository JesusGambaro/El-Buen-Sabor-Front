import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import "./navbar.scss";
import Cart from "@app/Cart/Cart";
import {
  Box,
  Flex,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuGroup,
  MenuDivider,
  Tag,
  InputGroup,
  InputLeftElement,
  Input,
  TagLabel,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Text,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import useMainStore from "@store/mainStore";
import { useLocation } from "react-router-dom";
import useCatalogueStore from "@store/catalogueStore";
interface NavBarProps {
  openSideBar: () => void;
}

const NavBar = () => {
  const location = useLocation();
  const [nombre_like, setNombre_like] = useState("" as string);
  const { filter, setFilter } = useCatalogueStore();
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
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef(null);
  const mobile = useMediaQuery(`(max-width: 700px)`);
  const {
    isOpen: isOpenSideBar,
    onOpen: OpenSideBar,
    onClose: CloseSideBar,
  } = useDisclosure();
  const handleIsAuth = () => {
    if (isAuthenticated) {
      onOpen();
    } else {
    }
  };
  const trimName = (name: string = ""): string => {
    return name.includes("@") ? name.split("@")[0] : name;
  };

  return (
    <Box
      px={4}
      py={2}
      bg={useColorModeValue("white", "gray.800")}
      w="100%"
      pos="fixed"
      zIndex="100"
      h="5.5rem"
    >
      {mobile && (
        <Drawer isOpen={isOpenSideBar} onClose={CloseSideBar}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton
              color="orange.300"
              _hover={{
                color: "orange.500",
              }}
              size="lg"
            />
            <DrawerHeader as="h2" fontSize="2xl" fontWeight="bold">
              El Buen sabor
            </DrawerHeader>
            <DrawerBody></DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <Flex alignItems="center">
        <Box
          color="black"
          bg="white"
          borderRadius="md"
          onDragStart={(e) => e.preventDefault()}
          onClick={(e) => e.preventDefault()}
          cursor="pointer"
        >
          <Image
            boxSize="70px"
            objectFit="cover"
            src="https://res.cloudinary.com/dquqzevft/image/upload/v1680564907/Logo.png"
            alt="El Buen Sabor"
            ml={2}
          />
        </Box>
        <Spacer />
        <InputGroup size="md" w="30%" maxW="600px">
          <InputLeftElement
            onClick={() => {
              handleSetFilter();
            }}
            children={<SearchIcon color="orange" />}
          />
          <Input
            type="tel"
            placeholder="Buscar comida..."
            focusBorderColor="orange.300"
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
        </InputGroup>
        <Spacer />
        {/**
         * ? Color Mode
         */}
        <Button onClick={toggleColorMode} visibility="hidden">
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        {/**
         * * Login
         */}
        <Tag
          size="lg"
          colorScheme="orange"
          borderRadius="full"
          py={1}
          bg="orange"
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
                loginWithRedirect();
              }
            }}
            color="white"
          >
            {isAuthenticated ? trimName(user?.name) : "Iniciar sesión"}
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
                  <MenuItem
                    onClick={() => {
                      navigate("/pedidos");
                    }}
                  >
                    Pedidos
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/carrito");
                    }}
                  >
                    Carrito
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Configuración">
                  <MenuItem
                    onClick={() => {
                      navigate("/configuración");
                    }}
                  >
                    Mi cuenta
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
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
        {!inCartDetail && (
          <Button
            ref={btnRef}
            variant="solid"
            color="orange"
            bg="white"
            borderRadius="full"
            _hover={{
              bg: "white",
            }}
            onClick={handleIsAuth}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Button>
        )}

        {isAuthenticated && token?.length > 0 && (
          <Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
        )}
      </Flex>
    </Box>
  );
};
export default NavBar;
