import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import "./navbar.scss";
import Cart from "@components/Cart/Cart";
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
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import {
  SearchIcon,
  ChevronDownIcon
} from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const NavBar = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading
  } = useAuth0();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box px={4} py={2} bg={useColorModeValue("white", "gray.800")}>
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
        <InputGroup size="md" w="50%" maxW="600px">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="orange.500" />}
          />
          <Input
            type="tel"
            placeholder="Buscar comida..."
            focusBorderColor="orange.500"
          />
        </InputGroup>
        <Spacer />
        {
          /** 
           * ? Color Mode   
           */
        }
        <Button onClick={toggleColorMode} visibility="hidden">
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        {
          /** 
           * * Login   
           */
        }
        <Tag size="lg" colorScheme="orange" borderRadius="full" py={1}>
          {
            isAuthenticated && (
              <Image
                boxSize='2rem'
                borderRadius='full'
                src={user.picture}
                alt={user.name}
                mr={2}
              />
            )
          }
          <TagLabel
            _hover={{
              cursor: "pointer",
            }}
            onClick={() => {
              if (!isAuthenticated) {
                loginWithRedirect();
              }
            }}
          >

            {isAuthenticated ? user.name
              : "Iniciar sesión"}
          </TagLabel>
          {isAuthenticated && (
            <Menu isLazy>
              <MenuButton
                aria-label="Options"
                size="sm"
                cursor="pointer"
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="link"
                colorScheme="orange"
                transition='all 0.2s'
              />
              <MenuList

              >
                <MenuGroup title="Perfil">
                  <MenuItem>Mi cuenta</MenuItem>
                  <MenuItem>Pedidos </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Configuración">
                  <MenuItem>Configuración</MenuItem>
                  <MenuItem
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  >Salir</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          )}
        </Tag>
        <Button ref={btnRef} colorScheme="orange" variant="ghost"
          onClick={onOpen}>
          <i className="fa-solid fa-cart-shopping"></i>
        </Button>
        <Cart isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} />
      </Flex>
    </Box>
  );
};
export default NavBar;
