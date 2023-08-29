import { useApiQuery } from "@hooks/useQueries";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { User } from "types/types";

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

export function UsersPage() {
  const theme = useMantineTheme();
  const {
    data: users,
    isLoading,
    error,
  } = useApiQuery("GET|users/getUsers") as {
    data: User[];
    isLoading: boolean;
    error: any;
  };
  console.log(users);

  const rows = users ? (
    users.map((item) => (
      <tr key={item.username}>
        <td>
          <Group spacing="sm">
            {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
            <Text fz="sm" fw={500}>
              {item.username}
            </Text>
          </Group>
        </td>

        <td>
          {item.rol && (
            <Badge
              color={jobColors[item.rol.toLowerCase()]}
              variant={theme.colorScheme === "dark" ? "light" : "outline"}
            >
              {item.rol}
            </Badge>
          )}
        </td>
        <td>
          <Anchor component="button" size="sm">
            {item.email}
          </Anchor>
        </td>
        <td>
          <Text fz="sm" c="dimmed">
            {item.password}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <IconPencil size="1rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash size="1rem" stroke={1.5} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5}>No users found</td>
    </tr>
  );

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Job title</th>
            <th>Email</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
