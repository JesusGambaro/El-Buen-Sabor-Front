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
import { Category } from "Types/types";
import { IconArrowRight, IconMathGreater } from "@tabler/icons-react";
export const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Flex
      h={"3rem"}
      
      bg={"orange"}
      sx={() => ({
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: "15px",
        cursor: "pointer",

        "&:hover": {
          backgroundColor: "orange",
          "& #hola": {
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "orangered",
            }
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
          <ActionIcon size="lg" id="hola">
            <IconArrowRight size="1.625rem" color={"orange"} />
          </ActionIcon>
        </Group>
      </Group>
    </Flex>
  );
};
