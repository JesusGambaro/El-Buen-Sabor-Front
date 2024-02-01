
import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
  getStylesRef,
  Flex,
} from "@mantine/core";
import { Categoria } from "types/types";
import { IconArrowRight, IconMathGreater } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useCatalogueStore from "@store/catalogueStore";
import useMainStore from "@store/mainStore";
export const CategoryCard = ({ category }: { category: Categoria }) => {
  const navigate = useNavigate();
  const { filter, setFilter } = useCatalogueStore();
  let handleSetFilter = (id_categoria: number| undefined | null, nombre_like?: string) => {
    setFilter({
      ...filter,
      id_categoria,
      nombre_like,
    });
  };
  const {isMobile} = useMainStore()
  return (
    <Flex
      h={"3rem"}
      sx={() => ({
        background: "rgb(253, 126, 20)",
        textAlign: "center",
        borderRadius: "15px",
        cursor: "pointer",
        color: "white",
        fontWeight: "bold",
        transition: "0.2s ease-in-out all",
        border: "3px solid rgb(253, 126, 20)",
        "&:hover": {
          backgroundColor: "white",
          borderColor: "rgb(253, 126, 20)",
          color: "rgb(253, 126, 20)",
          "& #icon": {
            color: "rgb(253, 126, 20)",
          },
        },
        "& #icon": {
          color: "white",
          transition: "0s ease-in-out all",
          backgroundColor: "transparent",
          "&:hover": {
            color: "rgb(202, 100, 15)",
          },
        },
      })}
      gap={"md"}
      align={"center"}
      justify={"space-between"}
      m={0}
      p={"1rem"}
      onClick={() => {
        handleSetFilter(category.id)
        navigate("/catálogo")
      }}
    >
      <Text fw={600}>{category.nombre}</Text>
      <Group position="apart">
        <Group spacing={0}>
          <ActionIcon bg={"transparent"} size="lg" id="icon-button">
            <IconArrowRight id="icon" size="1.625rem" />
          </ActionIcon>
        </Group>
      </Group>
    </Flex>
  );
};
