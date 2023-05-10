import {
  createCategory,
  deleteCategory,
  getCart,
  getCategories,
  updateCategory,
} from "@api/elbuensabor";
import { DeleteIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";
import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
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

  const [editItem, setEditItem] = useState<Category>({} as Category);
  const { filter, setFilter } = useAdminStore();
  const [query, setQuery] = useState(filter.nombre_like || "");
  const {
    data: categories,
    error,
    isLoading,
  } = useApiQuery("GET/categorias", filter) as QueryProps;

  const { mutate: create } = useApiMutation("POST/categorias");
  const { mutate: edit } = useApiMutation("PUT/categorias");

  if (isLoading) return <Loader />;

  const rows = categories.map((category, i) => (
    <tr key={"category" + i + category.id_categoria}>
      <td>{category?.id}</td>
      <td>{category?.nombre}</td>
      <td>
        {categories.find((c) => c.id === category.categoria_padre)?.nombre ||
          "-"}
      </td>
      <td>
        <Badge color={category.alta === "Disponible" ? "lime" : "red"}>
          {category?.alta}
        </Badge>
      </td>
      <td>
        <ActionIcon
          aria-label="Edit"
          onClick={() => {
            setEditItem(category);
          }}
        >
          <Edit />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <Container w="100%" maw="100%" p="0">
      <Flex justify="space-between" align="center" mb="1rem">
        <Button
          leftIcon={<Plus />}
          color="orange"
          size="md"
          onClick={() => {
            open();
            setEditItem({
              id: -1,
              nombre: "",
              categoria_padre: -1,
              id_categoria: -1,
              img: "",
              alta: "Disponible",
            });
          }}
        >
          Crear Rubro
        </Button>
        <Input.Wrapper
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilter({ ...filter, nombre_like: query });
            }
          }}
        >
          <Input
            size="md"
            type="tel"
            placeholder="Buscar comida..."
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
          {/* <Pagination color="orange" {...pagination} total={10} /> */}
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
        title={editItem.id === -1 ? "Crear Rubro" : "Editar Rubro"}
      />
    </Container>
  );
};

export default Categories;
