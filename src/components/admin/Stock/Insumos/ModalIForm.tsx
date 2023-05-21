import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Modal,
  Select,
  SegmentedControl,
} from "@mantine/core";
import { useApiMutation, useApiQuery } from "@hooks/useCart";
import { Category, Supply } from "Types/types";
import { ESTADO } from "@utils/constants";

type Props = {
  opened: boolean;
  close: () => void;
  title: string;
  item: Supply;
  setItem?: (item: Supply) => void;
};

const ModalIForm = (props: Props) => {
  const { opened, close, title, item, setItem } = props;

  const { data: categories, isLoading } = useApiQuery("GET|categoria/all") as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };
  const { mutate: createSupply } = useApiMutation("POST|insumo");
  const { mutate: editSupply } = useApiMutation("PUT|insumo");

  const form = useForm({
    initialValues: {
      nombre: "",
      imagen: "",
      stockMinimo: 0,
      stockActual: 0,
      costo: 0,
      estado: "DISPONIBLE",
    },
    validate: {
      nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
      imagen: (value) =>
        value.includes("http") && value.includes(".")
          ? null
          : "Ingrese una url válida",
      stockMinimo: (value) =>
        value < 0 ? "El stock mínimo debe ser mayor a 0" : null,
      stockActual: (value, values) =>
        value < 0 || value < values.stockMinimo
          ? "Ingrese un valor válido"
          : null,
      costo: (value) => (value < 0 ? "El costo debe ser mayor a 0" : null),
    },
  });

  const handleClose = () => {
    form.reset();
    setItem?.({
      id: -1,
      nombre: "",
      estado: ESTADO.DISPONIBLE,
      costo: 0,
      imagen: "",
      stockActual: 0,
      stockMinimo: 0,
    } as Supply);
    close();
  };
  useEffect(() => {
    form.setValues({
      nombre: item?.nombre,
      imagen: item?.imagen,
      stockMinimo: item?.stockMinimo,
      stockActual: item?.stockActual,
      costo: item?.costo,
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
            editSupply({ ...values, id: item.id });
          } else {
            createSupply(values);
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
        <TextInput
          label="Imagen"
          placeholder="Imagen"
          {...form.getInputProps("imagen")}
          required
        />
        <TextInput
          label="Stock mínimo"
          placeholder="Stock mínimo"
          {...form.getInputProps("stockMinimo")}
          required
          type="number"
        />
        <TextInput
          label="Stock actual"
          placeholder="Stock actual"
          {...form.getInputProps("stockActual")}
          required
          type="number"
        />
        <TextInput
          label="Costo"
          placeholder="Costo"
          {...form.getInputProps("costo")}
          required
          type="number"
        />

        {/* <Select
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
        /> */}
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

export default ModalIForm;
