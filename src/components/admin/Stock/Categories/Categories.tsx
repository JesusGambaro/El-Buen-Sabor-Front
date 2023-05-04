import {
  createCategory,
  deleteCategory,
  getCart,
  getCategories,
  updateCategory,
} from "@api/elbuensabor";
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
  FormLabel,
  FormControl,
  Flex,
  InputGroup,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  FormLabelProps,
  Modal,
  ModalFooter,
} from "@chakra-ui/react";
import Loader from "@components/app/Loader/Loader";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
import { useEffect, useRef, useState } from "react";
import { Category } from "Types/types";

type QueryProps = {
  data: Category[];
  error: any;
  isLoading: boolean;
};
const Categories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteItem, setDeleteItem] = useState<Category>({} as Category);
  const [editItem, setEditItem] = useState<Category>({} as Category);
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
  const {
    data: categories,
    error,
    isLoading,
  } = useApiQuery("categories", getCategories) as QueryProps;

  const { mutate: create } = useApiMutation(
    "categories/create",
    createCategory
  );

  const { mutate: edit } = useApiMutation("categories/edit", updateCategory);

  if (isLoading) return <Loader />;

  const handleCreateNewItem = (category: Category) => {
    if (isCreating) {
      category.id = categories.length + 1;
      create(category);
    } else {
      edit(category);
      console.log(category);
    }
  };
  return (
    <Container maxW="container.xl">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBottom="1rem"
      >
        <Button
          colorScheme="orange"
          onClick={() => {
            setEditItem({
              id: -1,
              nombre: "",
              categoria_padre: -1,
              id_categoria: -1,
              img: "",
              alta: false,
            });
            onOpenCreate();
            onCreating();
          }}
        >
          {true ? "Crear Rubro" : "Editar Rubro"}
        </Button>
      </Flex>
      <TableContainer overflowY="auto" maxHeight="calc(100vh - 15rem)">
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
            {categories.map((category, i) => {
              if (!category.alta) return null;
              return (
                <Tr key={"category" + i + category.id_categoria}>
                  <Td isNumeric>{category.id}</Td>
                  <Td>{category.nombre}</Td>
                  <Td isNumeric>{category.categoria_padre}</Td>
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      onClick={() => {
                        setEditItem(category);
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
                        setDeleteItem(category);
                        onOpen();
                      }}
                      colorScheme="orange"
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDeleteItem
        isOpen={isOpen}
        onClose={onClose}
        category={deleteItem}
      />
      <ModalCreateModifyItem
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        category={editItem}
        isCreating={isCreating}
        onSave={(category: Category) => {
          handleCreateNewItem(category);
        }}
        onChangeValue={(value: any, key: string) => {
          setEditItem((prevState) => ({ ...prevState, [key]: value }));
        }}
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

type PropsCreate = {
  category: Category;
  isOpen: boolean;
  isCreating: boolean;
  onOpen?: () => void;
  onClose: () => void;
  onSave: (category: Category) => void;
  onChangeValue: (value: any, key: string) => void;
};
const AlertDeleteItem = ({ category, isOpen, onClose }: Props) => {
  const cancelRef = useRef(null);
  const { mutate: del } = useApiMutation("categories/delete", deleteCategory);

  const handleDelete = () => {
    if (!category.id) return;
    del(category.id);
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

const ModalCreateModifyItem = ({
  category,
  isOpen,
  isCreating,
  onClose,
  onSave,
  onChangeValue,
}: PropsCreate) => {
  const { data: categories } = useApiQuery("categories", getCategories) as {
    data: Category[];
  };
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
                    value={category.nombre ? category.nombre : ""}
                    onChange={({ target }) => {
                      onChangeValue(String(target.value), "nombre");
                    }}
                  />
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel {...labelStyle}>Categoría padre</FormLabel>
              <InputGroup>
                <Flex justifyContent={"center"} w={"100%"}>
                  <Select
                    placeholder="Select option"
                    defaultValue={
                      categories.find(
                        (cCat) => cCat.id === category.categoria_padre
                      )?.nombre
                    }
                    onChange={({ target }) => {
                      const id = categories.find(
                        (category) => category.nombre == target.value
                      )?.id;
                      onChangeValue(id, "categoria_padre");
                    }}
                  >
                    {categories.map((category, i) => (
                      <option
                        value={category.nombre}
                        key={"category-select" + i}
                      >
                        {category.nombre}
                      </option>
                    ))}
                  </Select>
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
                    backgroundColor: category.alta ? "#48BB78" : "#F56565",
                    color: "white",
                  }}
                  borderRadius="md"
                  onChange={({ target }) => {
                    onChangeValue(
                      (target.value == "Alta" ? true : false) as Boolean,
                      "alta"
                    );
                  }}
                  defaultValue={category.alta ? "Alta" : "Baja"}
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
              onSave(category);
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
