import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Container,
  TableContainer,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  IconButton,
  Select,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import {
  getCategories,
  updateCategoriaById,
  createCategoria,
  deleteCategoriaById,
} from "@redux/reducers/adminReducer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "types/types";

const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories() as any);
  }, [dispatch]);

  const { categories }: { categories: Category[] } = useSelector(
    (state: any) => state.admin
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteItem, setDeleteItem] = useState<Category>({} as Category);

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Table size="lg" variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th isNumeric>Id</Th>
              <Th>Nombre</Th>
              <Th isNumeric>Padre</Th>
              <Th>Edit</Th>
              <Th>Del</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category, i) => (
              <Tr key={"category" + i + category.id_categoria}>
                <Td isNumeric>{category.id}</Td>
                <Td>{category.nombre}</Td>
                <Td isNumeric>{category.categoria_padre}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => {}}
                    colorScheme="orange"
                  />
                </Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setDeleteItem(category);
                      onOpen();
                    }}
                    colorScheme="orange"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDeleteItem
        isOpen={isOpen}
        onClose={onClose}
        category={deleteItem}
      />
    </Container>
  );
};

export default Categories;

type Props = {
  category: Category;
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
};

const AlertDeleteItem = ({ category, isOpen, onClose }: Props) => {
  const cancelRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCategoriaById(category.id_categoria) as any);
    onClose();
  };
  console.log(category);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="slideInRight"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar Insumo
          </AlertDialogHeader>

          <AlertDialogBody>
            ¿Estas seguro que quieres borrar el rubro {category.nombre}?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
