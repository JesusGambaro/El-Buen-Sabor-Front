import { useEffect, type JSX } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Modal,
  Select,
  SegmentedControl,
  LoadingOverlay,
  NumberInput,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import type { Rol, User } from "types/types";
import AdressForm from "../AdressForm/AdressForm";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  item: User;
}

const ModalUForm = (props: ModalProps): JSX.Element => {
  const { opened, onClose, item } = props;

  const { data: roles } = useApiQuery("GET|users/getRoles") as {
    data: Rol[];
    error: any;
    isLoading: boolean;
  };

  const {
    mutate: createUser,
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
  } = useApiMutation("POST|users/createUserAdmin");

  const {
    mutate: editUser,
    isLoading: isEditing,
    isSuccess: isEditSuccess,
  } = useApiMutation("PUT|users/changeUser");

  const form = useForm({
    initialValues: {
      id: undefined,
      username: "",
      email: "",
      bloqueado: "false" as any,
      direccionList: [
        {
          calleNombre: "",
          numeracion: 0,
          aclaracion: "",
          departamento: "",
          nroPiso: 0,
        },
      ],
      rol: "",
      phone_number: "",
    },
    validate: {
      username: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
    },
  });

  const handleClose = (): void => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    form.setValues({
      id: item?.id,
      username: item.username,
      email: item.email,
      blocked: item.blocked,
      direccionList: item.direccionList,
      rol: item?.rol?.id,
      phone_number: item.phone_number?.replace("+54", ""),
      email_verified: item.email_verified,
      name: item.name,
    } as any);
  }, [item]);

  useEffect(() => {
    if (isCreateSuccess || isEditSuccess) {
      handleClose();
    }
  }, [isCreateSuccess, isEditSuccess]);

  const onFormSubmit = (): void => {
    form.validate();
    if (!form.isValid()) {
      return;
    }

    const requestData = {
      ...form.values,
      rol: {
        id: form.values.rol,
      },
      phone_number: `+54${form?.values?.phone_number ?? ""}`,
    };

    try {
      if (item.id !== undefined) {
        console.log(
          "🚀 ~ file: ModalCForm.tsx:51 ~ onSubmit ~ item",
          requestData
        );

        editUser(requestData);
      } else {
        createUser(requestData);
      }
    } catch (error) {
      console.log("🚀 ~ file: ModalCForm.tsx:51 ~ onSubmit ~ error", error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={item.id !== undefined ? "Editar usuario" : "Crear usuario"}
      centered
      transitionProps={{ transition: "rotate-left" }}
      size="xl"
      padding="lg"
    >
      <LoadingOverlay visible={isCreating || isEditing} overlayBlur={2} />
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <SimpleGrid cols={2}>
          <Stack>
            <TextInput
              label="Nombre"
              placeholder="Nombre"
              {...form.getInputProps("name")}
              data-autofocus
            />
            <TextInput
              label="Nombre de usuario"
              placeholder="Nombre de usuario"
              required
              {...form.getInputProps("username")}
              withAsterisk
              data-autofocus
            />
            <TextInput
              label="Email"
              placeholder="Email"
              required
              {...form.getInputProps("email")}
              withAsterisk
              data-autofocus
            />
            <TextInput
              label="Telefono"
              placeholder="Telefono"
              {...form.getInputProps(" ")}
              data-autofocus
              icon={<span>+54</span>}
            />
          </Stack>
          <Stack>
            <Select
              label="Rol"
              placeholder="Seleccione un rol"
              searchable
              clearable
              maxDropdownHeight={160}
              dropdownPosition="bottom"
              data={
                Array.isArray(roles)
                  ? roles.map((rol) => ({
                      value: rol.id as string,
                      label: rol.name,
                    }))
                  : []
              }
              transitionProps={{
                transition: "pop",
                duration: 80,
                timingFunction: "ease",
              }}
              {...form.getInputProps("rol")}
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
            <AdressForm {...form.getInputProps("direccionList")} />
          </Stack>
        </SimpleGrid>
        <SegmentedControl
          w="100%"
          mt="md"
          data={[
            { value: "true", label: "Bloqueado" },
            { value: "false", label: "Activo" },
          ]}
          {...form.getInputProps("bloqueado")}
          color={(() => {
            return form.values.bloqueado === "true" ? "grape" : "teal";
          })()}
        />
        <Button type="submit" mt="md" color="orange" w="100%">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUForm;
