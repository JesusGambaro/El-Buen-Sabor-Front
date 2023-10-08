import { useApiMutation } from "@hooks/useQueries";
import {
  ActionIcon,
  Text,
  TextInput,
  SegmentedControl,
  LoadingOverlay,
  Group,
} from "@mantine/core";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { ESTADO } from "@utils/constants";
import { type MeasureUnit } from "types/types";
import { useEffect, type JSX } from "react";

// Interface for the props of the component
interface AddRowProps {
  opened: boolean;
  onClose: () => void;
  item: MeasureUnit;
}

const TRAddRow = (props: AddRowProps): JSX.Element => {
  /* onClose is a function that ends the inline edition
   * item is the item to be edited */
  const { onClose, item } = props;

  // POST method to create a new measure unit
  const {
    mutate: createMeasureUnit,
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
  } = useApiMutation("POST|um");

  // PUT method to edit a measure unit
  const {
    mutate: editMeasureUnit,
    isLoading: isEditing,
    isSuccess: isEditSuccess,
  } = useApiMutation("PUT|um");

  // Form to handle the inputs, validations and values
  const form = useForm<MeasureUnit>({
    initialValues: {
      id: undefined,
      nombre: "",
      estado: "DISPONIBLE",
    },
    validate: {
      nombre: (value) =>
        value.length <= 0 ? "El nombre no puede estar vacío" : null,
    },
  });

  // On component mount, set the values of the form if the item comes with an id
  useEffect(() => {
    if (item.id !== undefined) {
      form.setValues(item);
    }
  }, [item]);

  // Function to handle the submit of the form
  const onSubmit = (): void => {
    // Validate the form
    form.validate();
    // If the form is not valid, return
    if (!form.isValid()) return;

    // If the item has an id, edit the measure unit, else create a new one
    if (item.id !== undefined) {
      editMeasureUnit(form.values);
    } else {
      createMeasureUnit(form.values);
    }
  };

  // Function to handle the close of the inline edition, reset the form and close the modal
  const handleClose = (): void => {
    form.reset();
    onClose();
  };

  // If the creation or edition is successful, close the modal
  useEffect(() => {
    if (isCreateSuccess || isEditSuccess) {
      handleClose();
    }
  }, [isCreateSuccess, isEditSuccess]);

  return (
    <>
      <LoadingOverlay visible={isCreating || isEditing} overlayBlur={2} />
      <tr>
        <td>
          <Text>{form.values.id ?? "-"}</Text>
        </td>
        <td>
          <TextInput placeholder="Nombre" {...form.getInputProps("nombre")} />
        </td>
        <td>
          <SegmentedControl
            data={[
              { value: ESTADO.NO_DISPONIBLE, label: "No disponible" },
              { value: ESTADO.DISPONIBLE, label: "Disponible" },
            ]}
            {...form.getInputProps("estado")}
            color={form.values.estado === ESTADO.NO_DISPONIBLE ? "red" : "lime"}
            size="xs"
          />
        </td>
        <td>
          <Group>
            <ActionIcon aria-label="Edit" onClick={onSubmit}>
              <IconDeviceFloppy />
            </ActionIcon>
            <ActionIcon aria-label="Close" onClick={handleClose}>
              <IconX />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </>
  );
};

export default TRAddRow;
