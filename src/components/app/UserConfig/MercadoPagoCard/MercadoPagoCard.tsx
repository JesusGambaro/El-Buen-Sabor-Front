import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export const MercadoPagoCard = ({
  cardType,
  cardNumber,
}: {
  cardType: string;
  cardNumber: number;
}) => {
  return (
    <Box
      w={"20rem"}
      background={"orange"}
      padding={".5rem"}
      borderRadius={"7px"}
      boxShadow={"5px 4px 6px rgba(0, 0, 0, 0.25);"}
    >
      <Flex flexDir={"row"} gap={"0.5rem"} alignItems={"center"}>
        <Text color="white">{cardType}</Text>
        <Spacer></Spacer>
        <Box
          bgColor={"white"}
          padding={"0.5rem"}
          w={"10rem"}
          borderRadius={"20px"}
          textAlign={"center"}
        >
          <Text>**** **** {cardNumber.toString().substring(0, 4)}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
