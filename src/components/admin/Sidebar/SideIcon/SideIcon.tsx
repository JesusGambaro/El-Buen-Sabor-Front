import React from "react";
import { Tab, Tooltip, Text } from "@chakra-ui/react";

const SideIcon = ({
  label,
  admin = false,
}: {
  label: string;
  admin?: boolean;
}) => {
  const customIconsProps = {
    height: "3rem",
    width: "3rem",
    borderRadius: admin ? "10" : "50%",
    fontSize: "1.2rem",
    _selected: {
      bg: "orange",
      color: "white",
    },
    _hover: {
      bg: admin ? "white" : "orange",
      boxShadow: admin ? "" : "0rem 0rem 0rem .2rem #ffb701",
      color: admin ? "black" : "white",
      transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
    },
    //onClick: onToggle,
  };

  const iconsPath: { [key: string]: string } = {
    Home: "fa-solid fa-home",
    Catálogo: "fa-solid fa-utensils",
    Carrito: "fa-solid fa-cart-shopping",
    Configuración: "fa-solid fa-gear",
    Usuarios: "fa-solid fa-users",
    Dashboard: "fa-solid fa-chart-bar",
    Pedidos: "fa-solid fa-shopping-bag",
    Stock: "fa-solid fa-box",
  };

  return (
    <Tooltip
      label={label}
      placement="right"
      hasArrow
      openDelay={500}
      closeDelay={500}
      hidden={admin}
    >
      <Tab
        {...customIconsProps}
        display="flex"
        justifyContent={admin ? "flex-start" : "center"}
        w="100%"
      >
        <i className={iconsPath[label]}></i>
        {admin && (
          <Text fontSize="md" fontWeight="bold" ml="1rem">
            {label}
          </Text>
        )}
      </Tab>
    </Tooltip>
  );
};
export default SideIcon;
