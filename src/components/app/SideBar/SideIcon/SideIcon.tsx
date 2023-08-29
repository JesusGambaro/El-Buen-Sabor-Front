import React from "react";
import { Tooltip } from "@mantine/core";
import { NavLink, NavLinkProps } from "react-router-dom";

interface SideIconProps {
  label: string,
  redirects?: boolean
  onClickFunc?: () => void
}

const SideIcon = ({ label,redirects,onClickFunc }: SideIconProps) => {
  const iconsPath: { [key: string]: string } = {
    Home: "fa-solid fa-home",
    Catálogo: "fa-solid fa-utensils",
    Carrito: "fa-solid fa-cart-shopping",
    Configuración: "fa-solid fa-user",
    Pedidos: "fa-solid fa-list",
  };

  return (
    <Tooltip
      label={label}
      position="right"
      openDelay={500}
      closeDelay={500}
      withArrow
    >
      <NavLink
        to={`/${label === "Home" ? "" : label.toLowerCase()}`}
        onClick={() => {
          if (onClickFunc) {
            onClickFunc();
          }
        }}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
        style={{
          textDecoration: "none",
          width: "3rem",
          height: "3rem",
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
