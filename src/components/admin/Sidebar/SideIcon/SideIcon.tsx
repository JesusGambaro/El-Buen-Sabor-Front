import { Flex, Group, SimpleGrid, Text, Tooltip } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { Path } from "@utils/constants";
import "../sidebar.scss";

const SideIcon = ({ route }: { route: Path }) => {
  return (
    <Flex align="center" justify="start" w="80%" gap={6}>
      <NavLink
        to={route?.route || ""}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
        style={{
          textDecoration: "none",
          padding: "1rem",
          width: "100%",
          color: "white",
          borderRadius: "0.5rem",
        }}
      >
        <span className="icon">
          <i className={route?.icon}></i>
          <Text color="white">{route.name}</Text>
        </span>
      </NavLink>
    </Flex>
  );
};
export default SideIcon;
