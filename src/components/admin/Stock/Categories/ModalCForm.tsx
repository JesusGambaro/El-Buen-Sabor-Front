import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Modal,
  Select,
  SegmentedControl,
} from "@mantine/core";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
import { Category } from "Types/types";

type Props = {
  opened: boolean;
  close: () => void;
  title: string;
};

const ModalCForm = (props: Props) => {
  const { opened, close, title } = props;
  const { data: categories, isLoading } = useApiQuery("GET/categorias") as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };
  const { mutate: createCategory } = useApiMutation("POST/categorias");
  const form = useForm({
    initialValues: {
      nombre: "",
      categoria_padre: null,
      alta: "Disponible",
    },

    validate: {
      nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
    },
  });

  const handleClose = () => {
    form.reset();
    close();
  };

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
          createCategory(values as any);
          handleClose();
        })}
      >
        <TextInput
          label="Name"
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
          {...form.getInputProps("categoria_padre")}
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
            { value: "No disponible", label: "No disponible" },
            { value: "Disponible", label: "Disponible" },
          ]}
          {...form.getInputProps("alta")}
          color={form.values.alta === "No disponible" ? "red" : "lime"}
        />
        <Button type="submit" mt="md" color="orange" w="100%">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalCForm;
