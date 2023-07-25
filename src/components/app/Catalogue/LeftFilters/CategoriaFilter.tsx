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
  root: {
    backgroundColor: "transparent",
    display: "flex",
    gap: "0.5rem",
    flexDirection: "column",
  },

  control: {
    backgroundColor: "white",
    border: "none",
    display: "flex",
    width: "100%",
    height: "3rem",
    padding: "1rem",
    paddingRight: "0",
    justifyContent: "space-between",
    alignItems: "center",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderRadius: "10px",
    color:"black",
    "&:hover": {
      backgroundColor: "orange",
    },
    "& > span:nth-child(1)": {
      order: 2,
      paddingRight: "0.5rem",
      margin: 0,
    },
    "& > span:nth-child(2)": {
      order: 1,
    },
    "&[data-active]": {
      borderRadius: "0 10px 10px 0",
    },
  },

  item: {
    border: `${rem(1)} solid transparent`,
    position: "relative",
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    "&[data-active]": {
      zIndex: 1,
      "&::after": {
        height: "100%",
      },
    },
    "&::after": {
      position: "absolute",
      content: '""',
      width: rem(3),
      height: "0%",
      top: 0,
      left: 0,
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      background: "orange",
    },
  },

  categoriaPadre: {
    width: "100%",
    display: "flex",
    cursor: "pointer",
    height: "3rem",
    alignItems: "center",
    background: "white",
    justifyContent: "space-between",
    padding: "16px",
    paddingRight: "0",
    margin: "1rem 0",
    "&:hover": {
      background: "orange",
    },
    borderRadius: "10px",
    "&.active": {},
  },
  chevron: {
    transition: "transform 200ms ease",
  },
  panel: {
    width: "95%",
    gap: "1rem",
    display: "flex",
    flexDirection: "column",
    background: "",
    position: "relative",
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
          variant="default"
          key={category.nombre + "-panel"}
          style={{
            borderBottom: "none",
            justifyContent: "flex-end",
            padding: 0,
            margin: 0,
          }}
          unstyled
          w={"100%"}
          className={classes.root}
        >
          <Accordion.Item className={classes.panel} value={category.nombre}>
            <Accordion.Control className={classes.control}>
              {category.nombre}
            </Accordion.Control>
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
          key={category.nombre + "-box"}
        >
          <Text
            p={"1rem"}
            onClick={() => {
              props.handleSetFilter(category.id);
            }}
            className={classes.categoriaPadre}
          >
            {category.nombre}
          </Text>
        </Box>
      );
    }
    return returnValue;
  };
  const items = (hasCategorias ? categorias : []).map((category, i) => {
    let returnValue;
    if (!category.categoriaPadre) {
      returnValue = (
        <Accordion.Item
          className={classes.item}
          key={category.nombre + "-" + i}
          value={category.nombre}
        >
          {category.subCategoria?.length ? (
            <>
              <Accordion.Control className={classes.control}>
                {category.nombre}
              </Accordion.Control>
              <Accordion.Panel
                className={classes.panel}
                key={category.nombre + "-panel-" + i}
              >
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
              w={"100%"}
            >
              <Text
                p={"20px"}
                className={classes.categoriaPadre}
                onClick={() => {
                  props.handleSetFilter(category.id);
                }}
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
      <Accordion
        variant="default"
        style={{
          borderBottom: "none",
          justifyContent: "flex-end",
          padding: 0,
          margin: 0,
        }}
        unstyled
        w={"100%"}
        className={classes.root}
      >
        {items}
        <Accordion.Item className={classes.item} value="test">
          <Accordion.Control className={classes.control}>
            Test
          </Accordion.Control>
          <Accordion.Panel className={classes.panel} p={"0px"}>
            <Box
              display={"flex"}
              style={{ justifyContent: "flex-end", padding: 0, margin: 0 }}
            >
              <Text p={"20px"} className={classes.categoriaPadre}>
                Test Normal
              </Text>
            </Box>
            <Accordion
              variant="default"
              style={{
                borderBottom: "none",
                justifyContent: "flex-end",
                padding: 0,
                margin: 0,
              }}
              unstyled
              w={"100%"}
              className={classes.root}
            >
              <Accordion.Item className={classes.item} value="test">
                <Accordion.Control className={classes.control}>
                  Test Acordion
                </Accordion.Control>
                <Accordion.Panel className={classes.panel} p={"0px"}>
                  <Box
                    display={"flex"}
                    style={{
                      justifyContent: "flex-end",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <Text p={"20px"} className={classes.categoriaPadre}>
                      Test Normal
                    </Text>
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
