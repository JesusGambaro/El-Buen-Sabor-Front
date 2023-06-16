import { Heading, CardBody, IconButton } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
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
import { Category } from "types/types";
import { IconArrowRight, IconMathGreater } from "@tabler/icons-react";
export const CategoryCard = ({ category }: { category: Category }) => {
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
    >
      <Text fw={600}>{category.nombre}</Text>
      <Group position="apart">
        <Group spacing={0}>
          <ActionIcon size="lg" id="icon-button">
            <IconArrowRight id="icon" size="1.625rem" />
          </ActionIcon>
        </Group>
      </Group>
    </Flex>
  );
};
