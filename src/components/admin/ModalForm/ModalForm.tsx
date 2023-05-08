import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm, yupResolver } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Modal,
  Box,
  PasswordInput,
  SelectChevronIcon,
  Select,
  ScrollArea,
} from "@mantine/core";

type Props = {
  opened: boolean;
  close: () => void;
  title: string;
  centered?: boolean;
};

const ModalForm = (props: Props) => {
  const { opened, close, title, centered } = props;

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      age: 0,
      password: "",
      confirmPassword: "",
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
    },
  });
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={title}
      centered
      transitionProps={{ transition: "rotate-left" }}
    >
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label="Name"
          placeholder="Nombre"
          {...form.getInputProps("name")}
          required
        />
        <Select
          label="Your favorite framework/library"
          placeholder="Pick one"
          searchable
          clearable
          maxDropdownHeight={200}
          allowDeselect
          dropdownPosition="bottom"
          color="orange"
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
        />
        <TextInput
          label="Name"
          placeholder="Nombre"
          {...form.getInputProps("name")}
          required
        />
        <Button type="submit" mt="sm" color="orange">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalForm;
