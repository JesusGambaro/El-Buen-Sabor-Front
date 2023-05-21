import SideIcon from "./SideIcon/SideIcon";
import Users from "@admin/Users/Users";
import Stock from "../Stock/Stock";
import Dashboard from "@admin/Dashboard/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Flex } from "@mantine/core";
import { adminPaths } from "@utils/constants";

const SidebarAdmin = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Box
      h="calc(100vh - 5.5rem)"
      pos="fixed"
      top="5.5rem"
      left="0"
      w="20rem"
      display="flex"
      dir="column"
      bg="orange"
      p="1rem"
    >
      <Flex
        h="80%"
        direction="column"
        justify="space-evenly"
        align="center"
        w="100%"
      >
        {adminPaths.map((route) => (
          <SideIcon key={route.name} route={route} />
        ))}
      </Flex>
    </Box>
  );
};
export default SidebarAdmin;
