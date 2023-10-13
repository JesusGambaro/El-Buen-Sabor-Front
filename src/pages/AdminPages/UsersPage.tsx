import Th from "@components/admin/Stock/ThSorter/ThSorter";
import ModalForm from "@components/admin/Users/ModalUForm";
import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useQueries";
import {
  Avatar,
  Table,
  Group,
  Text,
  ActionIcon,
  Menu,
  ScrollArea,
  Badge,
  Container,
  Flex,
  Button,
  Input,
  Space,
  Pagination,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usersStore } from "@store/adminStore";
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
  IconListSearch,
  IconCheck,
} from "@tabler/icons-react";
import { useMantineTheme } from "@utils/theme";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { type User } from "types/types";

export const UsersPage = (): JSX.Element => {
  const { classes } = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const [editItem, setEditItem] = useState<User | null>({
    username: "",
    email: "",
    blocked: false,
    direccionList: [],
    picture: "",
    email_verified: null,
  });
  const {
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    sortBy,
    setSortBy,
    getFilters,
  } = usersStore();

  const setSorting = (field: keyof User): void => {
    const reversed =
      field === sortBy.field ? sortBy.direction !== "desc" : false;
    setSortBy(field, reversed ? "desc" : "asc");
  };

  const [query, setQuery] = useState(filters?.nombre ?? "");
  const { data: users, isLoading } = useApiQuery(
    "GET|users/search",
    getFilters()
  ) as {
    data: User[];
    isLoading: boolean;
  };
  if (isLoading) return <Loader />;

  const rows =
    Array.isArray(users) && users.length > 0 ? (
      users.map((item) => (
        <tr key={`user id-${item.id ?? "0"}}`}>
          {/* <td>
            <Text fz="sm" fw={500}>
              {item.id}
            </Text>
          </td> */}
          <td>
            <Group spacing="sm">
              <Avatar size={40} src={item.picture} radius={40} />
              <div>
                <Text fz="sm" fw={500}>
                  {item.username}
                </Text>
              </div>
            </Group>
          </td>
          <td>
            <Text fz="sm">{item.email}</Text>
          </td>
          <td style={{ textAlign: "center" }}>
            <ThemeIcon
              variant={item?.email_verified !== null ? "success" : "error"}
              radius="xl"
              size="sm"
            >
              {item.email_verified !== null && (
                <IconCheck size="1rem" stroke={1.5} />
              )}
            </ThemeIcon>
          </td>
          <td>
            <Badge
              color={item.blocked ? "red" : "teal"}
              variant="light"
              fullWidth
            >
              {item.blocked ? "Bloqueado" : "Activo"}
            </Badge>
          </td>
          <td style={{ textAlign: "center" }}>{item.rol?.name}</td>
          <td>
            <Group spacing={0} position="center">
              <ActionIcon>
                <IconPencil
                  size="1rem"
                  stroke={1.5}
                  onClick={() => {
                    setEditItem(item);
                    open();
                  }}
                />
              </ActionIcon>
              <Menu
                transitionProps={{ transition: "pop" }}
                withArrow
                position="bottom-end"
                withinPortal
              >
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size="1rem" stroke={1.5} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconMessages size="1rem" stroke={1.5} />}>
                    Send message
                  </Menu.Item>
                  <Menu.Item icon={<IconNote size="1rem" stroke={1.5} />}>
                    Add note
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconReportAnalytics size="1rem" stroke={1.5} />}
                  >
                    Analytics
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconTrash size="1rem" stroke={1.5} />}
                    color="red"
                  >
                    Terminate contract
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={5} style={{ textAlign: "center" }}>
          No hay usuarios
        </td>
      </tr>
    );

  const maxTableHeight = rem(window.innerHeight - 300);

  const onModalClose = (): void => {
    setEditItem(null);
    close();
  };
  return (
    <Container w="100%" maw="100%" p="0">
      {isLoading && <Loader />}
      <Text fz="xl" mt="md" fw={500}>
        Usuarios
      </Text>
      <Flex justify="space-between" align="center" my="1rem">
        <Group spacing="xs">
          <Button leftIcon={<Plus />} color="orange" size="md" onClick={open}>
            Crear usuario
          </Button>
        </Group>
        <Input.Wrapper
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilters({ ...filters, query });
            }
          }}
        >
          <Input
            size="md"
            type="tel"
            placeholder="Buscar usuario..."
            icon={<IconListSearch />}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            styles={(theme) => ({
              input: {
                borderColor: theme.colors.orange[5],
                borderWidth: 1,
                "&:focus-within": {
                  borderColor: theme.colors.orange[7],
                  borderWidth: 2,
                },
              },
            })}
          />
        </Input.Wrapper>
      </Flex>
      <ScrollArea h={maxTableHeight}>
        <Table
          verticalSpacing={"sm"}
          striped
          highlightOnHover
          style={{ tableLayout: "fixed" }}
        >
          <thead className={classes.header}>
            <tr>
              {/*  <Th
                sorted={sortBy.field === "id"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("id");
                }}
              >
                ID
              </Th> */}
              <Th
                sorted={sortBy.field === "username"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("username");
                }}
              >
                Usuario
              </Th>
              <Th
                sorted={sortBy.field === "email"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("email");
                }}
              >
                Email
              </Th>
              <Th
                sorted={sortBy.field === "email_verified"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("email_verified");
                }}
                width="15%"
              >
                Email verificado
              </Th>
              <Th
                sorted={sortBy.field === "bloqueado"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("blocked");
                }}
                width="10%"
              >
                Estado
              </Th>
              <th style={{ width: "15%" }}>Rol</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Space h={20} />
      <Pagination
        color="orange"
        total={totalPages}
        onChange={(value) => {
          setCurrentPage(value - 1);
        }}
        value={currentPage + 1}
        mt={8}
      />
      <ModalForm
        opened={opened}
        onClose={onModalClose}
        item={
          editItem ?? {
            username: "",
            email: "",
            blocked: false,
            direccionList: [],
            picture: "",
            email_verified: null,
          }
        }
      />
    </Container>
  );
};
