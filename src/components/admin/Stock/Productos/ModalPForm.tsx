import { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Modal,
  Select,
  SegmentedControl,
} from "@mantine/core";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
import { Product, Category } from "Types/types";
import { ESTADO } from "@utils/constants";

type Props = {
  opened: boolean;
  close: () => void;
  title: string;
  item: Product;
  setItem?: (item: Product) => void;
};

const ModalPForm = (props: Props) => {
  const { opened, close, title, item, setItem } = props;

  const { data: categories, isLoading } = useApiQuery("GET|categoria/all") as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };
  const { mutate: createCategory } = useApiMutation("POST|categoria");
  const { mutate: editCategory } = useApiMutation("PUT|categoria");

  const form = useForm({
    initialValues: {
      nombre: "",
      categoriaPadre: "",
      estado: "DISPONIBLE",
    },
    validate: {
      nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
    },
  });

  const handleClose = () => {
    form.reset();
    setItem?.({
      id: -1,
      nombre: "",
      categoriaPadre: -1,
      estado: ESTADO.DISPONIBLE,
    } as Product);
    close();
  };
  useEffect(() => {
    form.setValues({
      nombre: item?.nombre,
      categoriaPadre: "" + item?.categoriaPadre,
      estado: item?.estado,
    });
  }, [item]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={title}
      centered
      transitionProps={{ transition: "rotate-left" }}
      size="md"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          if (item.id > 0) {
            editCategory({ ...values, id: item.id });
          } else {
            createCategory(values);
          }
          handleClose();
        })}
      >
        <TextInput
          label="Nombre"
          placeholder="Nombre"
          {...form.getInputProps("nombre")}
          required
          data-autofocus
        />
        <Select
          label="Categoría"
          placeholder="Seleccione una categoría"
          searchable
          clearable
          maxDropdownHeight={100}
          dropdownPosition="bottom"
          data={categories?.map((category: Category) => ({
            value: "" + category.id,
            label: category.nombre,
          }))}
          {...form.getInputProps("categoriaPadre")}
          styles={(theme) => ({
            item: {
              // applies styles to selected item
              "&[data-selected]": {
                "&, &:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.orange[9]
                      : theme.colors.orange[1],
                  color:
                    theme.colorScheme === "dark"
                      ? theme.white
                      : theme.colors.orange[9],
                },
              },
            },
          })}
        />
        <SegmentedControl
          w="100%"
          mt="md"
          data={[
            { value: ESTADO.NO_DISPONIBLE, label: "No disponible" },
            { value: ESTADO.DISPONIBLE, label: "Disponible" },
          ]}
          {...form.getInputProps("estado")}
          color={form.values.estado === ESTADO.NO_DISPONIBLE ? "red" : "lime"}
        />
        <Button type="submit" mt="md" color="orange" w="100%">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalPForm;
