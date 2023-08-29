import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Modal,
  SegmentedControl,
  Text,
  Group,
  rem,
  Image,
  NumberInput,
} from "@mantine/core";
import { useApiMutation } from "@hooks/useQueries";
import { type Supply } from "types/types";
import { ESTADO } from "@utils/constants";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

interface Props {
  opened: boolean;
  close: () => void;
  title: string;
  item: Supply;
  setItem?: (item: Supply) => void;
}

const ModalIForm = (props: Props): JSX.Element => {
  const { opened, close, title, item, setItem } = props;

  const { mutate: createSupply } = useApiMutation("POST|insumo");
  const { mutate: editSupply } = useApiMutation("PUT|insumo");

  const form = useForm({
    initialValues: {
      nombre: "",
      stockMinimo: 0,
      stockActual: 0,
      costo: 0,
      estado: "DISPONIBLE",
      imagen: "",
    } as Supply,
    validate: {
      /*   nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
      stockMinimo: (value) => {
        console.log(value);
        return value <= 0 ? "El stock mínimo debe ser mayor a 0" : null;
      },
      stockActual: (value, values) => {
        console.log(value, values);
        return value <= 0
          ? "El stock actual debe ser mayor a 0"
          : value < values.stockMinimo
          ? "El stock actual debe ser mayor al stock mínimo"
          : null;
      },
      costo: (value) => (value < 0 ? "El costo debe ser mayor a 0" : null),
      // imagen: (value) => (value.length === 0 ? "Debe subir una imagen" : null),
      */
    },
  });

  const handleClose = (): void => {
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
      stockMinimo: item?.stockMinimo,
      stockActual: item?.stockActual,
      costo: item?.costo,
      estado: item?.estado,
      imagen: item?.imagen,
    });
  }, [item]);

  const [image, setImage] = useState<File>();
  const [isLoaded, setIsLoaded] = useState(true);

  const handleDrop = (files: File[]): void => {
    setIsLoaded(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      form.setValues({ ...form.values, imagen: e.target?.result as string });
      setImage(files[0]);
      setIsLoaded(true);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(form.isValid());
    console.log("form.values", form);

    if (!form.isValid()) return;

    const formData = new FormData();
    formData.append("img", image as Blob);
    if (item.id > 0) {
      formData.append(
        "insumo",
        new Blob([JSON.stringify(form.values)], {
          type: "application/json",
        })
      );
      editSupply({
        id: item.id,
        formData,
      });
    } else {
      formData.append(
        "insumo",
        new Blob([JSON.stringify(form.values)], { type: "application/json" })
      );
      createSupply(formData);
    }
    handleClose();
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
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Nombre"
          placeholder="Nombre"
          {...form.getInputProps("nombre")}
          required
          data-autofocus
        />

        <NumberInput
          label="Stock mínimo"
          placeholder="Stock mínimo"
          // if value = 0 not show value
          {...form.getInputProps("stockMinimo")}
          required
          type="number"
          min={0}
        />
        <NumberInput
          label="Stock actual"
          placeholder="Stock actual"
          {...form.getInputProps("stockActual")}
          required
          type="number"
          min={0}
        />
        <NumberInput
          label="Costo"
          placeholder="Costo"
          {...form.getInputProps("costo")}
          required
          type="number"
          icon="$"
          min={0}
        />

        <Dropzone
          onDrop={handleDrop}
          onReject={(files) => {
            console.log("rejected files", files);
          }}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          mt={10}
          loading={!isLoaded}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(100), pointerEvents: "none" }}
          >
            {image != null ?? form.values.imagen ? (
              <Image
                alt="Uploaded"
                src={form.values.imagen}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <>
                <Dropzone.Accept>
                  <IconUpload size="3.2rem" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size="3.2rem" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>
                <div>
                  <Text size="md" inline>
                    Arrastra o da click para subir una imagen
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Tamaño máximo: 5mb
                  </Text>
                </div>
              </>
            )}
          </Group>
        </Dropzone>
        {image != null ?? form.values.imagen ? (
          <Button
            variant="outline"
            color="red"
            onClick={() => {
              setImage(undefined);
              form.setValues({ ...form.values, imagen: "" });
            }}
            w="100%"
            mt="md"
          >
            Eliminar imagen
          </Button>
        ) : null}
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
