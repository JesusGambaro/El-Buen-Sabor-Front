import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useQueries";
import { suppliesStore } from "@store/adminStore";
import { useState, type JSX } from "react";
import { type Insumo } from "types/types";
import { useDisclosure } from "@mantine/hooks";
import {
  Badge,
  Button,
  Pagination,
  Table,
  ActionIcon,
  Container,
  Flex,
  Input,
  rem,
  ScrollArea,
  Space,
  createStyles,
  Group,
} from "@mantine/core";
import ModalForm from "@components/admin/Stock/Insumos/ModalIForm";
import { Edit, Plus, ListSearch, List } from "tabler-icons-react";
import Th from "@components/admin/Stock/ThSorter/ThSorter";
import ModalMeasureUnits from "@components/admin/Stock/Insumos/ModalMeasureUnits";

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
const InsumosPage = (): JSX.Element => {
  const [isOpenedCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [
    isOpenMeasureUnits,
    { open: openMeasureUnits, close: closeMeasureUnits },
  ] = useDisclosure(false);
  const maxTableHeight = rem(window.innerHeight - 300);
  const { classes } = useStyles();
  const [editItem, setEditItem] = useState<Insumo | null>(null);

  const {
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    sortBy,
    setSortBy,
    getFilters,
  } = suppliesStore();

  const setSorting = (field: keyof Insumo): void => {
    const reversed =
      field === sortBy.field ? sortBy.direction !== "desc" : false;
    setSortBy(field, reversed ? "desc" : "asc");
  };

  const [query, setQuery] = useState(filters?.nombre ?? "");
  const { data: supplies, isLoading } = useApiQuery(
    "GET|insumo/filter",
    getFilters()
  ) as {
    data: Insumo[];
    isLoading: boolean;
  };
  if (isLoading) return <Loader />;

  const rows =
    Array.isArray(supplies) && supplies.length > 0 ? (
      supplies.map((supply, i) => (
        <tr key={`supply-${supply.nombre}-${supply.id ?? i}`}>
          <td>{supply?.id}</td>
          <td>{supply?.nombre}</td>
          <td>{supply?.stock_minimo}</td>
          <td>{supply?.stock_actual}</td>
          <td>{supply?.categoria?.nombre}</td>
          <td>{supply?.unidad_medida?.nombre}</td>
          <td>${supply?.costo}</td>
          <td>
            <Badge color={supply.es_complemento ? "teal" : "yellow"}>
              {supply.es_complemento ? "SI" : "NO"}
            </Badge>
          </td>
          <td>
            <Badge color={supply.estado === "DISPONIBLE" ? "lime" : "red"}>
              {supply?.estado}
            </Badge>
          </td>
          <td>
            <ActionIcon
              aria-label="Edit"
              onClick={() => {
                setEditItem(supply);
                openCreate();
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
          No hay insumos
        </td>
      </tr>
    );

  const onModalClose = (type: "create" | "list"): void => {
    if (type === "create") {
      setEditItem(null);
      closeCreate();
      return;
    }
    closeMeasureUnits();
  };

  return (
    <Container w="100%" maw="100%" p="0">
      {isLoading && <Loader />}
      <Flex justify="space-between" align="center" mb="1rem">
        <Group spacing="xs">
          <Button
            leftIcon={<Plus />}
            color="orange"
            size="md"
            onClick={openCreate}
          >
            Crear insumo
          </Button>
          <Button
            leftIcon={<List />}
            color="orange"
            size="md"
            onClick={openMeasureUnits}
          >
            Ver unidades de medida
          </Button>
        </Group>
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
            placeholder="Buscar insumo..."
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
          striped
          captionSide="bottom"
          highlightOnHover
          withBorder
          withColumnBorders
          style={{ tableLayout: "fixed" }}
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
              <Th
                sorted={sortBy.field === "stock_minimo"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("stock_minimo");
                }}
              >
                Stock mínimo
              </Th>
              <Th
                sorted={sortBy.field === "stock_actual"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("stock_actual");
                }}
              >
                Stock actual
              </Th>
              {/*  <Th
                sorted={sortBy.field === "categoria"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("categoria");
                }}
              ></Th> */}
              <th>Categoría</th>
              <Th
                sorted={sortBy.field === "unidad_medida"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("unidad_medida");
                }}
              >
                Unidad de medida
              </Th>
              <Th
                sorted={sortBy.field === "costo"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("costo");
                }}
              >
                Costo
              </Th>
              <Th
                sorted={sortBy.field === "es_complemento"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("es_complemento");
                }}
              >
                Es complemento
              </Th>
              <Th
                sorted={sortBy.field === "estado"}
                reversed={sortBy.direction === "desc"}
                onSort={() => {
                  setSorting("estado");
                }}
              >
                Disponibilidad
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
      <ModalMeasureUnits
        opened={isOpenMeasureUnits}
        onClose={() => {
          onModalClose("list");
        }}
      />
      <ModalForm
        opened={isOpenedCreate}
        onClose={() => {
          onModalClose("create");
        }}
        item={editItem}
      />
    </Container>
  );
};

export default InsumosPage;
