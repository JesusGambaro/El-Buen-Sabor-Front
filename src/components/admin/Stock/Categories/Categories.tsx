import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import useAdminStore from "@store/adminStore";
import { useState } from "react";
import { Category } from "Types/types";
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
} from "@mantine/core";
import ModalForm from "./ModalCForm";
import { Edit, Plus, ListSearch } from "tabler-icons-react";

type QueryProps = {
  data: Category[];
  error: any;
  isLoading: boolean;
};

const Categories = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [editItem, setEditItem] = useState<Category>({
    id: -1,
    nombre: "",
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
      <tr key={"category" + i + category.id}>
        <td>{category?.id}</td>
        <td>{category?.nombre}</td>
        <td>
          {categories.find((c) => c.id === category.categoriaPadre?.id)?.nombre ||
            "-"}
        </td>
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
  return (
    <Container w="100%" maw="100%" p="0">
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
      <Table
        verticalSpacing={"sm"}
        striped
        captionSide="bottom"
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <caption>
          <Pagination
            color="orange"
            total={categoriaFilter.totalPages}
            onChange={(value) => setPage(value - 1, "categoriaFilter")}
            value={categoriaFilter.page + 1 || 1}
          />
        </caption>
        <thead>
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
      <ModalForm
        opened={opened}
        close={close}
        title={editItem.id >= 0 ? "Editar categoría" : "Crear categoría"}
        item={editItem}
        setItem={setEditItem}
      />
    </Container>
  );
};

export default Categories;
