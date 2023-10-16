import { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Modal,
  Select,
  SegmentedControl,
  LoadingOverlay,
} from "@mantine/core";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import type { Categoria } from "types/types";
import { ESTADO, TIPO_CATEGORIA } from "@utils/constants";
import { ESTADO_DATA, TIPO_DATA } from "../dataConstants";

/**
 * Props for the ModalCForm component.
 */
interface ModalProps {
  opened: boolean; // Indicates if the modal is open.
  onClose: () => void; // Function to close the modal.
  item: Categoria; // Categoria item data.
}

/**
 * Modal form component for creating or editing a category.
 */
const ModalCForm = ({ opened, onClose, item }: ModalProps): JSX.Element => {
  // Fetch all categories without pagination.
  const { data: categories } = useApiQuery("GET|categoria/allWOPage") as {
    data: Categoria[];
    error: any;
    isLoading: boolean;
  };

  // API mutation hooks for creating and editing categories.
  const {
    mutate: createCategory,
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
  } = useApiMutation("POST|categoria");
  const {
    mutate: editCategory,
    isLoading: isEditing,
    isSuccess: isEditSuccess,
  } = useApiMutation("PUT|categoria");

  // Form setup with validation.
  const form = useForm({
    initialValues: {
      id: undefined,
      nombre: "",
      categoriaPadre: "",
      estado: ESTADO.DISPONIBLE,
      tipo: TIPO_CATEGORIA.PRODUCTO,
    },
    validate: {
      nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
      categoriaPadre: (value, values) =>
        values.id !== undefined && value === values.id
          ? "No puede ser la misma categoría"
          : null,
    },
  });

  // Close modal and reset form.
  const handleClose = (): void => {
    form.reset();
    onClose();
  };

  // Set form values when the item prop changes.
  useEffect(() => {
    form.setValues({
      id: item?.id,
      nombre: item?.nombre,
      categoriaPadre: item?.categoriaPadre?.id,
      estado: item?.estado,
      tipo: item?.tipo,
    } as any);
  }, [item]);

  // Close modal when a category is successfully created or edited.
  useEffect(() => {
    if (isCreateSuccess || isEditSuccess) {
      handleClose();
    }
  }, [isCreateSuccess, isEditSuccess]);

  // Handle form submission.
  const onFormSubmit = (): void => {
    form.validate();
    if (!form.isValid()) {
      return;
    }

    const requestData = {
      ...form.values,
      categoriaPadre: Boolean(form.values.categoriaPadre) && {
        id: form.values.categoriaPadre,
      },
    };

    try {
      const mutation = item.id !== undefined ? editCategory : createCategory;
      mutation(requestData);
    } catch (error) {
      console.log("An unexpected error happened:", error);
      throw error;
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={`${item.id !== undefined ? "Editar" : "Crear"} categoría`}
      centered
      transitionProps={{ transition: "rotate-left" }}
      size="md"
      padding="lg"
    >
      <LoadingOverlay visible={isCreating || isEditing} overlayBlur={2} />
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <TextInput
          label="Nombre"
          placeholder="Nombre"
          {...form.getInputProps("nombre")}
          withAsterisk
          data-autofocus
        />
        <Select
          label="Categoría"
          placeholder="Seleccione una categoría"
          searchable
          clearable
          maxDropdownHeight={160}
          dropdownPosition="bottom"
          data={
            Array.isArray(categories)
              ? categories?.map((c) => ({
                  value: c.id as any,
                  label: c.nombre,
                }))
              : []
          }
          transitionProps={{
            transition: "pop",
            duration: 80,
            timingFunction: "ease",
          }}
          {...form.getInputProps("categoriaPadre")}
          styles={(theme) => ({
            item: {
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
          data={TIPO_DATA}
          {...form.getInputProps("tipo")}
          color={
            form.values.tipo === TIPO_CATEGORIA.PRODUCTO ? "grape" : "teal"
          }
        />
        <SegmentedControl
          w="100%"
          mt="md"
          data={ESTADO_DATA}
          {...form.getInputProps("estado")}
          color={form.values.estado === ESTADO.DISPONIBLE ? "green" : "red"}
        />
        <Button type="submit" mt="md" color="orange" w="100%">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalCForm;
