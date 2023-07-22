import {
  Collapse,
  Text,
  UnstyledButton,
  rem,
  createStyles,
  Group,
  Box,
  Accordion,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Tex } from "tabler-icons-react";
import { Category } from "types/types";
import { useApiQuery } from "@hooks/useQueries";
const useStyles = createStyles((theme) => ({
  categoriaPadre: {
    width: "100%",
    display: "flex",
    cursor: "pointer",
    height: "4rem",
    alignItems: "center",
    "&:hover": {
      background: "orange",
    },
    borderRadius: "10px",
    "&.active": {},
  },

  categoriaHijo: {
    width: "90%",
    margin: 0,
    padding: 0,

    "&.active": {},
  },

  categoriaHijoSinSub: {
    width: "90%",
    margin: 0,
    padding: 0,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    height: "4rem",
    cursor: "pointer",
    "&:hover": {
      background: "orange",
    },
    "&.active": {},
  },

  chevron: {
    transition: "transform 200ms ease",
  },
  categoriaControl: {
    padding: 0,
    span: {
      margin: 0,
    },
    height: "4rem",
    borderRadius: "10px",
    "&:hover": {
      background: "orange",
    },
    "span:last-child": {
      padding: "1rem",
    },
  },
  panel: {
    padding: 0,
    background: "",
    position: "relative",
    "&::after": {
      position: "absolute",
      content: '""',
      width: rem(3),
      height: "100%",
      top: 0,
      left: 20,
      background: "orange",
    },
  },
}));
type Props = {
  handleSetFilter: (_id_categoria?: number, _nombre_like?: string) => void;
};
export const CategoriaFilter = (props: Props) => {
  const { classes, theme } = useStyles();

  const {
    data: categorias,
    error,
    isLoading,
  } = useApiQuery("GET|categoria/all", null) as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };
  const hasCategorias = Array.isArray(categorias);
  const crearCategoriaRecursive = (category: Category) => {
    let returnValue;
    if (category.subCategoria?.length) {
      returnValue = (
        <Accordion
          display={"flex"}
          style={{ justifyContent: "flex-end", padding: 0, margin: 0 }}
          variant="default"
        >
          <Accordion.Item
            className={classes.categoriaHijo}
            value={category.nombre}
            sx={{ borderBottom: "none" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Accordion.Control className={classes.categoriaControl}>
                {category.nombre}
              </Accordion.Control>
            </Box>
            <Accordion.Panel className={classes.panel}>
              {category.subCategoria.map((c) => {
                return crearCategoriaRecursive(c);
              })}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      );
    } else {
      returnValue = (
        <Box
          display={"flex"}
          style={{ justifyContent: "flex-end", padding: 0, margin: 0 }}
        >
          <Text p={"1rem"} onClick={() => {
                  props.handleSetFilter(category.id);
                }} className={classes.categoriaHijoSinSub}>
            {category.nombre}
          </Text>
        </Box>
      );
    }
    return returnValue;
  };
  const items = (hasCategorias ? categorias : []).map((category) => {
    let returnValue;
    if (!category.categoriaPadre) {
      returnValue = (
        <Accordion.Item sx={{ borderBottom: "none" }} value={category.nombre}>
          {category.subCategoria?.length ? (
            <>
              <Accordion.Control className={classes.categoriaPadre}>
                {category.nombre}
              </Accordion.Control>
              <Accordion.Panel w={"20rem"} className={classes.panel}>
                {category.subCategoria &&
                  category.subCategoria.map((c) => {
                    return crearCategoriaRecursive(c);
                  })}
              </Accordion.Panel>
            </>
          ) : (
            <Box
              display={"flex"}
              style={{ justifyContent: "flex-end", padding: 0, margin: 0 }}
            >
              <Text
                p={"20px"}
                onClick={() => {
                  props.handleSetFilter(category.id);
                }}
                className={classes.categoriaPadre}
              >
                {category.nombre}
              </Text>
            </Box>
          )}
        </Accordion.Item>
      );
    }
    return returnValue;
  });

  return (
    <>
      <Title w={"100%"} align="left" weight={"500"} order={3}>
        Categorias
      </Title>
      <Accordion variant="default" sx={{ borderBottom: "none" }} w={"20rem"}>
        {items}
      </Accordion>
    </>
  );
};
