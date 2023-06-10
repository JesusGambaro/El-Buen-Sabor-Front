import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import useAdminStore from "@store/adminStore";
import { useState } from "react";
import { Product } from "Types/types";
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
import ModalPForm from "./ModalPForm";
import { Edit, Plus, ListSearch } from "tabler-icons-react";

type QueryProps = {
  data: Product[];
  error: any;
  isLoading: boolean;
};

const Productos = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [editItem, setEditItem] = useState<Product>({
    id: -1,
    nombre: "",
    descripcion: "",
    estado: "DISPONIBLE",
    receta: "",
    productoCategoria: {
      id: -1,
      nombre: "",
    },
    tiempoCocina: 0,
    insumoSet: [] as number[],
  } as Product);
  const { productoFilter, setFilter, setPage } = useAdminStore();
  ///const [query, setQuery] = useState(filter.nombre || "");
  const {
    data: products,
    error,
    isLoading,
  } = useApiQuery("GET|producto", productoFilter) as QueryProps;

  if (isLoading) return <Loader />;

  const rows = products ? (
    products.map((product, i) => (
      <tr key={"product" + i + product.id}>
        <td>{product?.id}</td>
        <td>{product?.nombre}</td>
        <td>
          <Image src={product?.imgURL} width={50} height={50} />
        </td>
        <td>{product?.tiempoCocina}</td>
        <td>{product?.descripcion}</td>
        <td>${product?.productoCategoria.nombre}</td>
        <td>
          <Badge color={product.estado === "DISPONIBLE" ? "lime" : "red"}>
            {product?.estado}
          </Badge>
        </td>
        <td>
          <ActionIcon
            aria-label="Edit"
            onClick={() => {
              setEditItem(product);
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
        No hay productos
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
          Crear producto
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
            placeholder="Buscar producto..."
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
            total={productoFilter.totalPages}
            onChange={(value) => setPage(value - 1, "insumoFilter")}
            value={productoFilter.page + 1 || 1}
          />
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Tiempo de cocina</th>
            <th>Descripción</th>
            <th>Categoria</th>
            <th>Disponibilidad</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <ModalPForm
        opened={opened}
        close={close}
        title={`${editItem.id === -1 ? "Crear" : "Editar"} producto`}
        item={editItem}
        setItem={setEditItem}
      />
    </Container>
  );
};

export default Productos;
