import { Flex, Title, useMantineColorScheme } from "@mantine/core";
import React from "react";

const PedidoDetailPage = () => {
  useMantineColorScheme;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Flex
      maw="container.2xl"
      miw={"100vh"}
      display="flex"
      direction="column"
      c="start"
      align="center"
      bg={dark ? "#3e3e3e" : "#e6e6e6"}
      p={"1rem"}
      mih="100vh"
    >
      <Title color={dark ? "white" : "black"} order={1} mb="2rem">
        Catálogo
      </Title>
    </Flex>
  );
};

export default PedidoDetailPage;
