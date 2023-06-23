import React, { useEffect } from "react";
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
import { Direccion, User } from "types/types";
import { ESTADO } from "@utils/constants";
import { useDisclosure } from "@mantine/hooks";

type ModalProps = {
  opened: boolean;
  onClose: () => void;
  item: User;
};

const ModalUserForm = (props: ModalProps) => {
  const { opened, onClose, item } = props;

  const { mutate: editUser } = useApiMutation("PUT|user");

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      bloqueado: false,
      rol: "",
      direccionList: [] as Direccion[],
      id: "",
    },
    validate: {},
  });
  const [visible, { toggle }] = useDisclosure(false);

  const handleClose = () => {
    form.reset();
    visible && toggle();
    onClose();
  };

  useEffect(() => {
    form.setValues({
      id: item.id,
      bloqueado: item.bloqueado,
      email: item.email,
      username: item.username,
      direccionList: item.direccionList,
      rol: item.rol,
    });
  }, [item]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={`Modificar información del ${
        item.rol === "ADMIN" ? "administrador" : "usuario"
      }`}
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
          editUser({ ...values, id: item.id });
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
          data={
            categories?.map((c) => ({
              value: c.id as any,
              label: c.nombre,
            })) || []
          }
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

export default ModalUserForm;
