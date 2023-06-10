import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import useAdminStore from "@store/adminStore";
import { useState } from "react";
import { Supply } from "Types/types";
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
  Image,
} from "@mantine/core";
import ModalForm from "./ModalIForm";
import { Edit, Plus, ListSearch } from "tabler-icons-react";

type QueryProps = {
  data: Supply[];
  error: any;
  isLoading: boolean;
};

const Insumos = () => {
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
  const { insumoFilter, setFilter, setPage } = useAdminStore();
  ///const [query, setQuery] = useState(filter.nombre || "");
  const {
    data: supplies,
    error,
    isLoading,
  } = useApiQuery("GET|insumo", insumoFilter) as QueryProps;

  if (isLoading) return <Loader />;

  const rows = supplies ? (
    supplies.map((supply, i) => (
      <tr key={"supply" + i + supply.id}>
        <td>{supply?.id}</td>
        <td>{supply?.nombre}</td>
        <td>
          {/* <Image src={supply?.imagen} width={50} height={50} /> */}
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
            total={insumoFilter.totalPages}
            onChange={(value) => setPage(value - 1, "insumoFilter")}
            value={insumoFilter.page + 1 || 1}
          />
        </caption>
        <thead>
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
      <ModalForm
        opened={opened}
        close={close}
        title={`${editItem.id === -1 ? "Crear" : "Editar"} insumo`}
        item={editItem}
        setItem={setEditItem}
      />
    </Container>
  );
};

export default Insumos;
