import { useEffect, type JSX, useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Modal,
  SegmentedControl,
  NumberInput,
  LoadingOverlay,
  Select,
  Checkbox,
  Group,
  Stack,
  Image,
  SimpleGrid,
  Text,
  rem,
} from "@mantine/core";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { type MeasureUnit, type Categoria, type Insumo } from "types/types";
import { ESTADO } from "@utils/constants";
import { IconBottle, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useMantineTheme } from "@utils/theme";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  item: Insumo | null;
}

const ModalIForm = (props: ModalProps): JSX.Element => {
  const { opened, onClose, item } = props;
  const { disabled: disabledDropClass } = useMantineTheme().classes;
  const { data: categories } = useApiQuery("GET|categoria/allWOPage") as {
    data: Categoria[];
    error: any;
    isLoading: boolean;
  };

  const { data: measureUnits } = useApiQuery("GET|um") as {
    data: MeasureUnit[];
    error: any;
    isLoading: boolean;
  };

  const {
    mutate: createSupply,
    isLoading: isCreating,
    isSuccess: isCreateSuccess,
  } = useApiMutation("POST|insumo");

  const {
    mutate: editSupply,
    isLoading: isEditing,
    isSuccess: isEditSuccess,
  } = useApiMutation("PUT|insumo");

  const form = useForm<Insumo>({
    initialValues: {
      id: item?.id ?? undefined,
      nombre: item?.nombre ?? "",
      stock_minimo: item?.stock_minimo ?? ("" as any),
      stock_actual: item?.stock_actual ?? ("" as any),
      costo: item?.costo ?? ("" as any),
      estado: item?.estado ?? ESTADO.DISPONIBLE,
      categoria: item?.categoria?.id ?? (null as any),
      unidad_medida: item?.unidad_medida?.id ?? (null as any),
      es_complemento: item?.es_complemento ?? false,
      imagen: item?.imagen ?? "",
    },
    validate: {
      nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
      stock_minimo: (value) => {
        console.log(value);
        return value <= 0 ? "El stock mínimo debe ser mayor a 0" : null;
      },
      stock_actual: (value, values) => {
        const isMinStockValid =
          value < values.stock_minimo
            ? "El stock actual debe ser mayor al stock mínimo"
            : null;
        return value <= 0
          ? "El stock actual debe ser mayor a 0"
          : isMinStockValid;
      },
      costo: (value) => (value <= 0 ? "El costo debe ser mayor a 0" : null),
      es_complemento: (value, values) =>
        values.imagen === "" && value
          ? "Debe subir una imagen para el insumo"
          : null,
    },
  });

  const handleClose = (): void => {
    form.reset();
    setImage(undefined);
    onClose();
  };

  useEffect(() => {
    if (isCreateSuccess || isEditSuccess) {
      handleClose();
    }
  }, [isCreateSuccess, isEditSuccess]);

  const onFormSubmit = (): void => {
    form.validate();

    if (!form.isValid()) {
      console.error("Formulario inválido", form.errors);
      return;
    }
    const formData = new FormData();
    if (image && form.values.es_complemento) {
      formData.append("img", image as Blob);
    }

    const requestData = {
      ...form.values,
      categoria: form.values.categoria && {
        id: form.values.categoria,
      },
      unidad_medida: form.values.unidad_medida && {
        id: form.values.unidad_medida,
      },
    };

    try {
      if (item?.id !== undefined) {
        //        editSupply(requestData);
        formData.append(
          "insumo",
          new Blob([JSON.stringify(requestData)], {
            type: "application/json",
          })
        );
        editSupply({
          id: item?.id,
          formData,
        });
      } else {
        formData.append(
          "insumo",
          new Blob([JSON.stringify(requestData)], { type: "application/json" })
        );
        createSupply(formData);
      }
    } catch (error) {
      console.log("🚀 ~ file: ModalCForm.tsx:51 ~ onSubmit ~ error", error);
    }
  };

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

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      title={item?.id !== undefined ? "Editar insumo" : "Crear insumo"}
      transitionProps={{ transition: "rotate-left" }}
      size="xl"
      padding="lg"
    >
      <LoadingOverlay visible={isCreating || isEditing} overlayBlur={2} />
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <SimpleGrid cols={2}>
          <Stack spacing="xs">
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
              required
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
              {...form.getInputProps("categoria")}
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
            <NumberInput
              label="Stock mínimo"
              placeholder="Stock mínimo"
              {...form.getInputProps("stock_minimo")}
              required
              type="number"
              min={0}
            />
            <NumberInput
              label="Stock actual"
              placeholder="Stock actual"
              {...form.getInputProps("stock_actual")}
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

            <SegmentedControl
              w="100%"
              mt="md"
              data={[
                { value: ESTADO.NO_DISPONIBLE, label: "No disponible" },
                { value: ESTADO.DISPONIBLE, label: "Disponible" },
              ]}
              {...form.getInputProps("estado")}
              color={
                form.values.estado === ESTADO.NO_DISPONIBLE ? "red" : "lime"
              }
            />
          </Stack>
          <Stack spacing="xs">
            <Select
              label="Unidad de medida"
              placeholder="Seleccione una unidad de medida"
              searchable
              clearable
              maxDropdownHeight={160}
              dropdownPosition="bottom"
              required
              data={
                Array.isArray(measureUnits)
                  ? measureUnits?.map((mU) => ({
                      value: mU.id as any,
                      label: mU.nombre,
                    }))
                  : []
              }
              transitionProps={{
                transition: "pop",
                duration: 80,
                timingFunction: "ease",
              }}
              {...form.getInputProps("unidad_medida")}
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
            <Checkbox
              {...form.getInputProps("es_complemento", {
                type: "checkbox",
              })}
              label="Es complemento"
              color="orange"
              mt="md"
              size="md"
              icon={IconBottle}
            />
            <Dropzone
              onDrop={handleDrop}
              className={form.values.es_complemento ? "" : disabledDropClass}
              onReject={(files) => {
                form.setErrors({
                  imagen: "Tipo de archivo inválido",
                });
                console.log("rejected files", form.errors);
              }}
              disabled={!form.values.es_complemento}
              {...form.getInputProps("imagen")}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              mt={10}
              loading={!isLoaded}
              h="100%"
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <Group
                position="center"
                spacing="xl"
                style={{
                  minHeight: rem(100),
                  pointerEvents: "none",
                }}
              >
                {image != null ?? form.values.imagen ? (
                  <Image
                    alt="Uploaded"
                    src={form.values.imagen}
                    style={{
                      maxWidth: rem(200),
                      maxHeight: rem(200),
                      overflow: "hidden",
                      borderRadius: rem(8),
                    }}
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
              >
                Eliminar imagen
              </Button>
            ) : null}
          </Stack>
        </SimpleGrid>
        <Button type="submit" mt="md" color="orange" w="100%">
          Guardar
        </Button>
      </form>
    </Modal>
  );
};

export default ModalIForm;
