import React from "react";
import { Button, ButtonProps, Tab, Tooltip } from "@chakra-ui/react";
import { NavLink, NavLinkProps } from "react-router-dom";

const SideIcon = ({ label }: { label: string }) => {
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
      <NavLink
        to={`/${label === "Home" ? "" : label.toLowerCase()}`}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
        style={{ textDecoration: "none", width: "3rem", height: "3rem" ,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <i className={iconsPath[label]}></i>
      </NavLink>
    </Tooltip>
  );
};
export default SideIcon;
