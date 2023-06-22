import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { Direccion } from "types/types";

export const DireccionCard = ({direccion}: {direccion:Direccion}) => {
  return (
    <Box
      w={"30rem"}
      background={"orange"}
      padding={".5rem"}
      borderRadius={"7px"}
      boxShadow={"5px 4px 6px rgba(0, 0, 0, 0.25);"}
    >
      <Flex flexDir={"row"} justify={"space-evenly"} align={"center"} alignItems={"center"}>
        <Text color="white">{direccion.departamento}</Text>
        <Text color="white">{direccion.calleNombre}</Text>
        <Text color="white">{direccion.numeracion}</Text>
      </Flex>
    </Box>
  );
};
