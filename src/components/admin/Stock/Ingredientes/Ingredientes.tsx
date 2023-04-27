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
  Tfoot,
  IconButton,
  Select,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { deleteSupply, deleteSupplyById, getSupplies } from "@redux/reducers/adminReducer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Supply } from "types/types";

const Ingredientes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSupplies() as any);
  }, [dispatch]);

  const { supplies }: { supplies: Supply[] } = useSelector(
    (state: any) => state.admin
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteItem, setDeleteItem] = useState<Supply>({} as Supply);

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Table size="lg" variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th isNumeric>Min</Th>
              <Th isNumeric>Actual</Th>
              <Th isNumeric>Costo</Th>
              <Th>Estado</Th>
              <Th>Edit</Th>
              <Th>Del</Th>
            </Tr>
          </Thead>
          <Tbody>
            {supplies.map((supply, i) => (
              <Tr key={"supply" + i + supply.id_categoria}>
                <Td>{supply.nombre}</Td>
                <Td isNumeric>{supply.stock_minimo}</Td>
                <Td isNumeric>{supply.stock_actual}</Td>
                <Td isNumeric>{supply.costo}</Td>
                <Td>
                  <Select
                    placeholder={supply.alta ? "Alta" : "Baja"}
                    size="sm"
                    w="10rem"
                    style={{
                      backgroundColor: supply.alta ? "#48BB78" : "#F56565",
                      color: "white",
                    }}
                    borderRadius="md"
                    //placeholder cant be selected
                  >
                    <option value="Alta" style={{ color: "black" }}>
                      Alta
                    </option>
                    <option value="Baja" style={{ color: "black" }}>
                      Baja
                    </option>
                  </Select>
                </Td>
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
                      setDeleteItem(supply);
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
      <AlertDeleteItem isOpen={isOpen} onClose={onClose} supply={deleteItem} />
    </Container>
  );
};

export default Ingredientes;

type Props = {
  supply: Supply;
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
};

const AlertDeleteItem = ({ supply, isOpen, onClose }: Props) => {
  const cancelRef = useRef(null);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSupplyById(supply.id_insumo) as any);
    onClose();
  };
  console.log(supply);

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
            ¿Estas seguro que quieres borrar el insumo {supply.nombre}?
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
