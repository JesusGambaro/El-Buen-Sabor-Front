import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useQueries";
import useAdminStore from "@store/adminStore";
import { useState } from "react";
import { Category } from "types/types";
import { useDisclosure, usePagination } from "@mantine/hooks";
import {
  Badge,
  Button,
  Pagination,
  Table,
  ActionIcon,
  Container,
  Flex,
  Input,
  ScrollArea,
  Space,
  List,
  rem,
  useMantineTheme,
} from "@mantine/core";
import ModalForm from "@components/admin/Stock/Categories/ModalCForm";
import { Edit, Plus, ListSearch } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

type QueryProps = {
  data: Category[];
  error: any;
  isLoading: boolean;
};

const CategoriasPage = () => {
  const currentTheme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const maxTableHeight = rem(window.innerHeight - 300);
  const navigate = useNavigate();
  const [editItem, setEditItem] = useState<Category | null>({
    id: -1,
    nombre: "",
    categoriaPadre: {
      id: -1,
    },
    estado: "DISPONIBLE",
  } as Category);
  const { categoriaFilter, setFilter, setPage } = useAdminStore();
  const [query, setQuery] = useState(categoriaFilter.nombre || "");
  const {
    data: categories,
    error,
    isLoading,
  } = useApiQuery("GET|categoria/filter", categoriaFilter) as QueryProps;

  if (isLoading) return <Loader />;

  const rows = categories ? (
    categories.map((category, i) => (
      <tr key={"category" + i + category.id} style={{ cursor: "pointer" }}>
        <td>{category?.id}</td>
        <td onClick={() => navigate("/admin/categoria/" + category.id)}>
          {category?.nombre}
        </td>
        <td>{category.categoriaPadre?.nombre}</td>
        <td>
          <Badge color={category.estado === "DISPONIBLE" ? "lime" : "red"}>
            {category?.estado}
          </Badge>
        </td>
        <td>
          <ActionIcon
            aria-label="Edit"
            onClick={() => {
              setEditItem(category);
              open();
            }}
          >
            <Edit />
          </ActionIcon>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={10} style={{ textAlign: "center" }}>
        No hay categorías
      </td>
    </tr>
  );

  const onModalClose = () => {
    setEditItem(null);
    close();
  };
  return (
    <Container w="100%" maw="100%" h="100%">
      <Flex justify="space-between" align="center" mb="1rem">
        <Button
          leftIcon={<Plus />}
          color="orange"
          size="md"
          onClick={() => {
            open();
          }}
        >
          Crear categoría
        </Button>
        <Input.Wrapper
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilter(
                { ...categoriaFilter, nombre: query },
                "categoriaFilter"
              );
            }
          }}
        >
          <Input
            size="md"
            type="tel"
            placeholder="Buscar categoría..."
            icon={<ListSearch />}
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
          captionSide="bottom"
          highlightOnHover
          withBorder
          withColumnBorders
          striped
          style={{ tableLayout: "fixed" }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor:
                currentTheme.colorScheme === "dark"
                  ? currentTheme.colors.dark[7]
                  : currentTheme.colors.gray[0],
            }}
          >
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría padre</th>
              <th>Disponibilidad</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Space h={20} />
      <Pagination
        color="orange"
        total={categoriaFilter.totalPages}
        onChange={(value) => setPage(value - 1, "categoriaFilter")}
        value={categoriaFilter.page + 1 || 1}
        mt={8}
      />
      <ModalForm
        opened={opened}
        onClose={onModalClose}
        item={
          editItem ||
          ({
            id: -1,
            nombre: "",
            categoriaPadre: {
              id: -1,
            },
            estado: "DISPONIBLE",
          } as Category)
        }
      />
    </Container>
  );
};

export default CategoriasPage;
