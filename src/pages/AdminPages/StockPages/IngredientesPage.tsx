import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useQueries";
import { suppliesStore } from "@store/adminStore";
import { useState } from "react";
import { type Supply } from "types/types";
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
  Image,
  rem,
  ScrollArea,
  Space,
  useMantineTheme,
} from "@mantine/core";
import ModalForm from "@components/admin/Stock/Insumos/ModalIForm";
import { Edit, Plus, ListSearch } from "tabler-icons-react";

interface QueryProps {
  data: Supply[];
  error: any;
  isLoading: boolean;
}

const InsumosPage = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editItem, setEditItem] = useState<Supply>({
    id: -1,
    nombre: "",
    estado: "DISPONIBLE",
    costo: 0,
    imagen: "",
    stockActual: 0,
    stockMinimo: 0,
  } as Supply);
  const { filters, getFilters, currentPage, totalPages, setCurrentPage } =
    suppliesStore();
  /// const [query, setQuery] = useState(filter.nombre || "");
  const { data: supplies, isLoading } = useApiQuery(
    "GET|insumo/filter",
    getFilters()
  ) as QueryProps;

  const rows =
    supplies !== undefined ? (
      supplies.map((supply, i) => (
        <tr key={`supply${i + supply.id}`}>
          <td>{supply?.id}</td>
          <td>{supply?.nombre}</td>
          <td>
            <Image src={supply?.imagen} width={50} height={50} />
          </td>
          <td>{supply?.stockMinimo}</td>
          <td>{supply?.stockActual}</td>
          <td>${supply?.costo}</td>
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
          No hay insumos
        </td>
      </tr>
    );

  const maxTableHeight = rem(window.innerHeight - 300);
  const currentTheme = useMantineTheme();

  return (
    <Container w="100%" maw="100%" p="0">
      {isLoading && <Loader />}
      <Flex justify="space-between" align="center" mb="1rem">
        <Button leftIcon={<Plus />} color="orange" size="md" onClick={open}>
          Crear insumo
        </Button>
        <Input.Wrapper
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              //    setFilter({ ...filter, nombre: query });
            }
          }}
        >
          <Input
            size="md"
            type="tel"
            placeholder="Buscar insumo..."
            icon={<ListSearch />}
            // value={query}
            onChange={(e) => {
              // setQuery(e.target.value);
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
              <th>Imagen</th>
              <th>Stock mínimo</th>
              <th>Stock actual</th>
              <th>Costo</th>
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
        total={totalPages}
        onChange={(value) => {
          setCurrentPage(value - 1);
        }}
        value={currentPage + 1}
      />

      <ModalForm
        close={close}
        opened={opened}
        title={`${editItem.id === -1 ? "Crear" : "Editar"} insumo`}
        item={editItem}
        setItem={setEditItem}
      />
    </Container>
  );
};

export default InsumosPage;
