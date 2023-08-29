import Loader from "@components/app/Loader/Loader";
import { useApiQuery } from "@hooks/useQueries";
import { productsStore } from "@store/adminStore";
import { useState } from "react";
import { type Category, type Product } from "types/types";
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
} from "@mantine/core";
import ModalPForm from "@components/admin/Stock/Productos/ModalPForm";
import { Edit, Plus, ListSearch } from "tabler-icons-react";
import { ESTADO } from "@utils/constants";

interface QueryProps {
  data: Product[];
  error: any;
  isLoading: boolean;
}

const ProductosPage = (): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editItem, setEditItem] = useState<Product | null>({
    nombre: "",
    descripcion: "",
    estado: ESTADO.DISPONIBLE,
    insumosIDS: [],
    receta: "",
    productoCategoria: { id: -1, nombre: "" } as Category,
    tiempoCocina: 0,
    imgURL: "",
    id: -1,
  } as Product);

  const { filters, setCurrentPage, totalPages, currentPage } = productsStore();
  const { data: products, isLoading } = useApiQuery(
    "GET|producto",
    filters
  ) as QueryProps;

  if (isLoading) return <Loader />;

  const rows =
    products !== undefined ? (
      products.map((product, i) => (
        <tr key={`product${+i + product.id}`}>
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

  const onCloseModal = (): void => {
    setEditItem(null);
    close();
  };

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
        <Input.Wrapper>
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
            total={totalPages}
            onChange={(value) => {
              setCurrentPage(value - 1);
            }}
            value={currentPage + 1}
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
        item={
          editItem != null
            ? editItem
            : ({
                nombre: "",
                descripcion: "",
                estado: ESTADO.DISPONIBLE,
                insumosIDS: [],
                receta: "",
                productoCategoria: { id: -1, nombre: "" } as Category,
                tiempoCocina: 0,
                imgURL: "",
                id: -1,
              } as Product)
        }
        onClose={onCloseModal}
      />
    </Container>
  );
};

export default ProductosPage;
