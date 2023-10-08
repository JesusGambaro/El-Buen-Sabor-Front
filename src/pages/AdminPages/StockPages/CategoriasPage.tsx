import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useQueries";
import { categoriesStore } from "@store/adminStore";
import { useState } from "react";
import { type Categoria } from "types/types";
import { useDisclosure } from "@mantine/hooks";
import {
  Badge,
  Button,
  Pagination,
  ActionIcon,
  Container,
  Flex,
  Input,
  Space,
  createStyles,
  Table,
  ScrollArea,
  rem,
} from "@mantine/core";
import ModalForm from "@components/admin/Stock/Categories/ModalCForm.refator";
import { Edit, Plus, ListSearch } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import Th from "@components/admin/Stock/ThSorter/ThSorter";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",
    zIndex: 1,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
}));

const CategoriasPage = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);
  const maxTableHeight = rem(window.innerHeight - 300);
  const navigate = useNavigate();
  const { classes } = useStyles();

  const [editItem, setEditItem] = useState<Categoria | null>({
    nombre: "",
    estado: "DISPONIBLE",
    tipo: "PRODUCTO",
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
  } = categoriesStore();

  const setSorting = (field: keyof Categoria): void => {
    const reversed =
      field === sortBy.field ? !(sortBy.direction === "desc") : false;
    setSortBy(field, reversed ? "desc" : "asc");
  };

  const [query, setQuery] = useState(filters?.nombre ?? "");
  const { data: categories, isLoading } = useApiQuery(
    "GET|categoria/filter",
    getFilters()
  ) as {
    data: Categoria[];
    error: any;
    isLoading: boolean;
  };

  if (isLoading) return <Loader />;

  const rows =
    Array.isArray(categories) && categories.length > 0 ? (
      categories.map((category, i) => (
        <tr
          key={`category-${category.nombre}-${category.id ?? category.nombre}`}
          style={{ cursor: "pointer" }}
        >
          <td>{category?.id}</td>
          <td
            onClick={() => {
              navigate(`/admin/categoria/${category.id ?? ""}`);
            }}
          >
            {category?.nombre}
          </td>
          <td>{category.categoriaPadre?.nombre}</td>
          <td>
            <Badge color={category.estado === "DISPONIBLE" ? "lime" : "red"}>
              {category?.estado}
            </Badge>
          </td>
          <td>
            <Badge color={category.tipo === "PRODUCTO" ? "grape" : "teal"}>
              {category?.tipo ?? "-"}
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

  const onModalClose = (): void => {
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
              setFilters({ ...filters, nombre: query });
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
          miw={700}
          verticalSpacing={"sm"}
          captionSide="bottom"
          highlightOnHover
          withColumnBorders
          striped
        >
          <thead className={classes.header}>
            <tr>
              <Th
                sorted={sortBy.field === "id"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("id");
                }}
              >
                ID
              </Th>
              <Th
                sorted={sortBy.field === "nombre"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("nombre");
                }}
              >
                Nombre
              </Th>
              <th
              /* 
                sorted={sortBy.field === "categoriaPadre"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("categoriaPadre");
                }} 
              */
              >
                Categoría padre
              </th>
              <Th
                sorted={sortBy.field === "estado"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("estado");
                }}
              >
                Disponibilidad
              </Th>
              <Th
                sorted={sortBy.field === "tipo"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("tipo");
                }}
              >
                Tipo
              </Th>
              <th>Editar</th>
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
        value={currentPage + 1 ?? 1}
        mt={8}
      />
      <ModalForm
        opened={opened}
        onClose={onModalClose}
        item={
          editItem ?? {
            nombre: "",
            estado: "DISPONIBLE",
            tipo: "PRODUCTO",
          }
        }
      />
    </Container>
  );
};

export default CategoriasPage;
