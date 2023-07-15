import {
  Collapse,
  Text,
  UnstyledButton,
  rem,
  createStyles,
  Group,
  Box,
} from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
const useStyles = createStyles((theme) => ({
  categoriaPadre: {
    fontWeight: 500,
    background: "white",
    padding: ".5rem",
    "&:hover": {
      backgroundColor: "orange",
    },

    "&.active": {},
  },

  categoriaHijo: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    transition: "background-color 200ms ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? "black" : "white",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },

    "&.active": {
      backgroundColor: theme.colorScheme === "dark" ? "black" : "white",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      "&:hover": {
        backgroundColor: "orange",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));
interface LinksGroupProps {
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?: string;
}
export const CategoriaFilter = ({
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) => {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <>
      <Text
        className={
          classes.categoriaHijo +
          " " +
          (location.pathname.includes(link.link) ? "active" : "")
        }
        key={link.label}
      >
        {link.label}
      </Text>
    </>
  ));
  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (hasLinks) {
            setOpened((o) => !o);
            return;
          }
        }}
        className={
          classes.categoriaPadre +
          " " +
          (location.pathname === link ? "active" : "")
        }
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "rotate(-90deg)",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
};
