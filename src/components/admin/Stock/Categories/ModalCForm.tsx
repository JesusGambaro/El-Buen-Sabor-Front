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
import type { Category } from "types/types";
import { ESTADO, TIPO_CATEGORIA } from "@utils/constants";
import { useDisclosure } from "@mantine/hooks";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  item: Category;
}

const ModalCForm = (props: ModalProps): JSX.Element => {
  const { opened, onClose, item } = props;

  const { data: categories } = useApiQuery("GET|categoria/allWOPage") as {
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
      estado: ESTADO.DISPONIBLE,
      tipo: TIPO_CATEGORIA.PRODUCTO,
    },
    validate: {
      nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
    },
  });
  const [visible, { toggle }] = useDisclosure(false);

  const handleClose = (): void => {
    form.reset();
    visible && toggle();
    onClose();
  };

  useEffect(() => {
    form.setValues({
      nombre: item?.nombre,
      categoriaPadre: item?.categoriaPadre?.id,
      estado: item?.estado,
      tipo: item?.tipo,
    } as any);
  }, [item]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={item.id !== undefined ? "Editar categoría" : "Crear categoría"}
      centered
      transitionProps={{ transition: "rotate-left" }}
      size="md"
      padding="lg"
    >
      <LoadingOverlay visible={visible} overlayBlur={2} />
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(
            "🚀 ~ file: ModalCForm.tsx:83 ~ onSubmit={form.onSubmit ~ values:",
            values
          );
          if (item.id !== undefined) {
            editCategory({
              ...values,
              id: item.id,
              categoriaPadre: values.categoriaPadre && {
                id: values.categoriaPadre,
              },
            });
          } else {
            createCategory({
              ...values,
              categoriaPadre: values.categoriaPadre && {
                id: values.categoriaPadre,
              },
            });
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
          maxDropdownHeight={160}
          dropdownPosition="bottom"
          data={
            categories
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
            { value: TIPO_CATEGORIA.INSUMO, label: "Insumo" },
            { value: TIPO_CATEGORIA.PRODUCTO, label: "Producto" },
          ]}
          {...form.getInputProps("tipo")}
          color={
            form.values.tipo === TIPO_CATEGORIA.PRODUCTO ? "grape" : "teal"
          }
        />
        <SegmentedControl
          w="100%"
          mt="md"
          data={[
            { value: ESTADO.NO_DISPONIBLE, label: "No disponible" },
            { value: ESTADO.DISPONIBLE, label: "Disponible" },
          ]}
          {...form.getInputProps("estado")}
          color={form.values.estado === ESTADO.NO_DISPONIBLE ? "red" : "green"}
        />
        <Button
          type="submit"
          mt="md"
          color="orange"
          w="100%"
          onClick={() => {
            if (form.isValid()) toggle();
          }}
        >
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalCForm;
