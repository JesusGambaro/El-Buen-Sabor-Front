import React from "react";
import { Tab, Tooltip } from "@chakra-ui/react";

const SideIcon = ({ label }: { label: string }) => {
  const customIconsProps = {
    height: "3rem",
    width: "3rem",
    borderRadius: "50%",
    fontSize: "1.2rem",
    _selected: {
      bg: "orange",
      color: "white",
    },
    _hover: {
      bg: "orange",
      boxShadow: "0rem 0rem 0rem .2rem #ffb701",
      color: "white",
    },
    //onClick: onToggle,
  };

  const iconsPath: { [key: string]: string } = {
    Home: "fa-solid fa-home",
    Catálogo: "fa-solid fa-utensils",
    Carrito: "fa-solid fa-cart-shopping",
    Configuración: "fa-solid fa-gear",
  };

  return (
    <Tooltip
      label={label}
      placement="right"
      hasArrow
      openDelay={500}
      closeDelay={500}
    >
      <Tab {...customIconsProps}>
        <i className={iconsPath[label]}></i>
      </Tab>
    </Tooltip>
  );
};
export default SideIcon;
