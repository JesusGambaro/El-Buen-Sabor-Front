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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Input,
  InputGroup,
  FormControl,
  Flex,
  ModalFooter,
  Button,
  FormLabelProps,
} from "@chakra-ui/react";
import {  useRef, useState } from "react";
import { Supply } from "Types/types";
import { useDisclosure } from "@chakra-ui/react";

const Ingredientes = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isCreating,
    onOpen: onCreating,
    onClose: onEditing,
  } = useDisclosure();
  const [deleteItem, setDeleteItem] = useState<Supply>({} as Supply);
  const [editItem, setEditItem] = useState<Supply>({
    id: -1,
    nombre: "",
    imagen: "",
    descripcion: "",
    stock_minimo: 0,
    stock_actual: 0,
    alta: true,
    costo: 0,
    id_categoria: 0,
    id_unidad_medida: 0,
    id_insumo: -1,
  } as Supply);

  const [supplies, setSupplies] = useState<Supply[]>([] as Supply[]);
  const handleCreateNewItem = (supply: Supply) => {
    if (isCreating) {
      let newSupply: Supply = supply;
      newSupply.id = Math.floor(Math.random() * (1000 - 0 + 1) + 0);
      newSupply.id_insumo = Math.floor(Math.random() * (1000 - 0 + 1) + 0);
      console.log(newSupply);
    } else {
      console.log(supply);
    }
  };
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
                    size="sm"
                    w="10rem"
                    style={{
                      backgroundColor: supply.alta ? "#48BB78" : "#F56565",
                      color: "white",
                      
                    }}
                    borderRadius="md"
                    defaultValue={supply.alta ? "Alta" : "Baja"}
                    isDisabled
                    //placeholder cant be selected
                  >
                    <option
                      value="Cambia el estado de alta"
                      disabled
                      style={{ color: "black", fontWeight: "bolder" }}
                    >
                      Cambia el estado de alta
                    </option>
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
                    onClick={() => {
                      setEditItem(supply);
                      onOpenCreate();
                      onEditing();
                    }}
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
      <Button
        colorScheme="orange"
        onClick={() => {
          setEditItem({
            id: -1,
            nombre: "",
            imagen: "",
            descripcion: "",
            stock_minimo: 0,
            stock_actual: 0,
            alta: true,
            costo: 0,
            id_categoria: 0,
            id_unidad_medida: 0,
            id_insumo: -1,
          });
          onOpenCreate();
          onCreating();
        }}
      >
        {isCreating ? "Crear Nuevo Insumo" : "Modifica el Insumo"}
      </Button>
      <AlertDeleteItem isOpen={isOpen} onClose={onClose} supply={deleteItem} />
      <ModalCreateModifyItem
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        supply={editItem}
        isCreating={isCreating}
        onSave={(supply: Supply) => {
          handleCreateNewItem(supply);
        }}
        onChangeValue={(value: any, key: string) => {
          setEditItem((prevState) => ({ ...prevState, [key]: value }));
        }}
      />
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
type PropsCreate = {
  supply: Supply;
  isOpen: boolean;
  isCreating: boolean;
  onOpen?: () => void;
  onClose: () => void;
  onSave: (supply: Supply) => void;
  onChangeValue: (value: any, key: string) => void;
};

const AlertDeleteItem = ({ supply, isOpen, onClose }: Props) => {
  const cancelRef = useRef(null);

  const handleDelete = () => {
    console.log(supply);
    onClose();
  };

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
const ModalCreateModifyItem = ({
  supply,
  isOpen,
  isCreating,
  onClose,
  onSave,
  onChangeValue,
}: PropsCreate) => {
  const inputStyle = {
    background: "white",
    color: "orange",
    border: "1px solid white",
    //boxShadow: "5px 4px 6px rgba(0, 0, 0, 0.25);",
    _hover: {
      boxShadow: "0rem 0rem 0rem .15rem white",
    },
    w: "xs",
    _focus: {
      boxShadow: "none",
      border: "2px solid white",
    },
  };
  const leftAddonStyle = {
    background: "white",
    color: "orange",
    _hover: {
      boxShadow: "0rem 0rem 0rem .15rem white",
    },
  };
  const labelStyle = {
    textAlign: "center",
    fontFamily: "cursive",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "0px",
    color: "white",
    marginBottom: "1.5rem",
  } as FormLabelProps;
  const [showActual, setshowActual] = useState(false);
  const handleClickActual = () => setshowActual(!showActual);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent
        border="5px solid #FFFFFF"
        background="#FB9300"
        box-shadow="5px 4px 6px rgba(0, 0, 0, 0.25)"
        border-radius="15px"
      >
        <ModalHeader
          {...labelStyle}
          h={"100%"}
          lineHeight={""}
          textAlign={"center"}
        >
          Crea un nuevo insumo
        </ModalHeader>
        <ModalCloseButton
          background="#FFFFFF"
          boxShadow="5px 4px 6px rgba(0, 0, 0, 0.25)"
          border-radius="15px"
        />
        <ModalBody pb={6}>
          <Flex flexDir={"column"} gap={"2rem"}>
            <FormControl>
              <FormLabel {...labelStyle}>Nombre</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Input
                    placeholder="Nombre del insumo.."
                    {...inputStyle}
                    type={"text"}
                    value={supply.nombre ? supply.nombre : ""}
                    onChange={({ target }) => {
                      onChangeValue(String(target.value), "nombre");
                    }}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel {...labelStyle}>Stock Minimo</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Input
                    placeholder="999.."
                    {...inputStyle}
                    type={"number"}
                    value={supply.stock_minimo ? supply.stock_minimo : ""}
                    onChange={({ target }) => {
                      onChangeValue(String(target.value), "stock_minimo");
                    }}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel {...labelStyle}>Stock Actual</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Input
                    placeholder="999.."
                    {...inputStyle}
                    type={"number"}
                    value={supply.stock_actual ? supply.stock_actual : ""}
                    onChange={({ target }) => {
                      onChangeValue(String(target.value), "stock_actual");
                    }}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel {...labelStyle}>Costo</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Input
                    placeholder="999.."
                    {...inputStyle}
                    type={"number"}
                    value={supply.costo ? supply.costo : ""}
                    onChange={({ target }) => {
                      onChangeValue(String(target.value), "costo");
                    }}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel {...labelStyle}>Estado de Alta</FormLabel>
              <Flex justifyContent={"center"} w={"100%"}>
                <Select
                  size="md"
                  w="20rem"
                  style={{
                    backgroundColor: supply.alta ? "#48BB78" : "#F56565",
                    color: "white",
                  }}
                  borderRadius="md"
                  onChange={({ target }) => {
                    onChangeValue(
                      (target.value == "Alta" ? true : false) as Boolean,
                      "alta"
                    );
                  }}
                  defaultValue={supply.alta ? "Alta" : "Baja"}
                  //placeholder cant be selected
                >
                  <option
                    value="Cambia el estado de alta"
                    disabled
                    style={{ color: "black", fontWeight: "bolder" }}
                  >
                    Cambia el estado de alta
                  </option>
                  <option value="Alta" style={{ color: "black" }}>
                    Alta
                  </option>
                  <option value="Baja" style={{ color: "black" }}>
                    Baja
                  </option>
                </Select>
              </Flex>
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            background={"#ffb701"}
            _hover={{
              background: "#e4a400",
            }}
            color={"white"}
            mr={3}
            onClick={() => {
              onSave(supply);
              onClose();
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
