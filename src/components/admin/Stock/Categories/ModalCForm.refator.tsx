import React from "react";
import {
  TextInput,
  Button,
  Modal,
  Select,
  SegmentedControl,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { ESTADO_DATA, TIPO_DATA } from "../dataConstants";
import { type Categoria } from "types/types";

interface Props {
  opened: boolean;
  onClose: () => void;
  item: {
    id?: number;
    nombre: string;
    categoriaPadre?: number;
    estado?: "activo" | "inactivo";
  };
}

const ModalCForm: React.FC<Props> = ({ opened, onClose, item }) => {
  const { data: categories } = useApiQuery<Categoria[]>("/api/categories");

  const form = useForm({
    initialValues: {
      nombre: Boolean(item.nombre) || "",
      categoriaPadre: Boolean(item.categoriaPadre) || null,
      estado: Boolean(item.estado) || "activo",
    },
  });

  const { mutate: createCategory, isLoading: isCreating } =
    useApiMutation("POST|categoria");
  const { mutate: editCategory, isLoading: isEditing } =
    useApiMutation("PUT|categoria");
  const handleFormSubmit = React.useCallback(() => {
    const data = form.values;
    const mutation = item.id !== undefined ? editCategory : createCategory;
    mutation(data);
    onClose();
  }, [form, item, createCategory, editCategory, onClose]);

  const categoryOptions = React.useMemo(
    () =>
      Array.isArray(categories)
        ? categories.map((c) => ({
            value: c.id as any,
            label: c.nombre,
          }))
        : [],
    [categories]
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`${item.id !== undefined ? "Editar" : "Crear"} categoría`}
      centered
      transitionProps={{ transition: "rotate-left" }}
      size="md"
      padding="lg"
    >
      <LoadingOverlay visible={isCreating || isEditing} overlayBlur={2} />
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
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
          data={categoryOptions}
          transitionProps={{
            transition: "pop",
            duration: 80,
            timingFunction: "ease",
          }}
          {...form.getInputProps("categoriaPadre")}
        />
        <SegmentedControl
          data={ESTADO_DATA}
          w="100%"
          mt="md"
          {...form.getInputProps("estado")}
        />
        <Button type="submit" mt="md" color="orange" w="100%">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalCForm;
