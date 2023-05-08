import React, { useEffect } from "react";
import axios from "axios";
import "./users.scss";
import {
  Container,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  IconButton,
  Select,
} from "@chakra-ui/react";

const Users = () => {
  const users = [
    {
      name: "Juan",
      lastname: "Perez",
      email: "perez@gmail.com",
      role: "Admin",
      status: "Baja",
    },
    {
      name: "Miguel",
      lastname: "Muñoz",
      email: "miguel@gmail.com",
      role: "User",
      status: "Alta",
    },
  ];
  return (
    <Container maxW="100vw" bg="#f9f6f6" p="0" h="100vh">
      <Heading as="h1" size="lg" textAlign="center" mt="2rem">
        Usuarios
      </Heading>
      <Flex w="100%" justifyContent="center" alignItems="center">
        <SimpleGrid
          w="100%"
          h="100%"
          templateRows={["repeat(2, 1fr)"]}
          templateColumns={["repeat(1, 1fr)"]}
          spacing={3}
        >
          {users.map((user, i) => (
            <Card key={i} w="100%" h="6rem" p="4" boxShadow="md" bg="white">
              <CardBody
                display="flex"
                justifyContent="space-between"
                w="100%"
                alignItems="center"
              >
                <Stack
                  direction="row"
                  divider={<StackDivider borderColor="gray.200" />}
                  align="center"
                  w="80%"
                >
                  <Box p="2">
                    <Text fontSize="sm" fontWeight="bold">
                      {user.name}
                    </Text>
                  </Box>
                  <Box p="2">
                    <Text fontSize="sm" fontWeight="bold">
                      {user.lastname}
                    </Text>
                  </Box>
                  <Box p="2">
                    <Text fontSize="sm" fontWeight="bold">
                      {user.email}
                    </Text>
                  </Box>
                  <Box p="2">
                    <Text fontSize="sm" fontWeight="bold">
                      {user.role}
                    </Text>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  divider={<StackDivider borderColor="gray.200" />}
                  align="center"
                  w="20%"
                >
                  <Select
                    placeholder={user.status}
                    size="sm"
                    w="10rem"
                    style={{
                      backgroundColor:
                        user.status === "Alta" ? "#48BB78" : "#F56565",
                      color: "white",
                    }}
                    borderRadius="md"
                    //placeholder cant be selected
                  >
                    <option value="Alta" style={{ color: "black" }}>
                      Alta
                    </option>
                    <option value="Baja" style={{ color: "black" }}>
                      Baja
                    </option>
                  </Select>
                  <IconButton
                    aria-label="Search database"
                    icon={<i className="fas fa-trash-alt"></i>}
                    colorScheme="white"
                  />
                  <IconButton
                    aria-label="Search database"
                    icon={<i className="fas fa-edit"></i>}
                    colorScheme="white"
                  />
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};
export default Users;
