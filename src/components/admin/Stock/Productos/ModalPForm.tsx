import React, { useEffect, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Modal,
  Select,
  SegmentedControl,
  LoadingOverlay,
  Stepper,
  Space,
  Code,
  Group,
  TransferList,
  TransferListData,
  Text,
  Image,
  rem,
  ActionIcon,
  TextInput,
  Textarea,
  SimpleGrid,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
//import { useDisclosure } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { Category, Product, Supply } from "types/types";
import { ESTADO } from "@utils/constants";
import TextEditor from "@components/admin/TextEditor/TextEditor";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconClock, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

type ModalProps = {
  opened: boolean;
  onClose: () => void;
  item: Product;
};

const ModalPForm = (props: ModalProps) => {
  const { opened, onClose, item } = props;

  const { data: categories } = useApiQuery("GET|categoria/allWOPage") as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };

  const { data: ingredients } = useApiQuery("GET|insumo/allWOPage") as {
    data: Supply[];
    error: any;
    isLoading: boolean;
  };

  const { mutate: createProduct } = useApiMutation("POST|producto");
  const { mutate: editProduct } = useApiMutation("PUT|producto");

  const form = useForm({
    initialValues: {
      nombre: "",
      descripcion: "",
      estado: ESTADO.DISPONIBLE,
      insumosIDS: [] as number[],
      receta: "",
      productoCategoria: "",
      tiempoCocina: 0,
      imgURL: "",
    },
    validate: {
      nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
      descripcion: (value) =>
        value.length < 3
          ? "La descripción debe tener al menos 3 caracteres"
          : null,
    },
  });
  //const [visible, { toggle }] = useDisclosure(false);

  const handleClose = () => {
    form.reset();
    //visible && toggle();
    onClose();
  };

  useEffect(() => {
    form.setValues({
      nombre: item.nombre,
      descripcion: item.descripcion,
      estado: item.estado,
      insumosIDS: item.insumosIDS,
      receta: item.receta,
      productoCategoria: item.productoCategoria,
      tiempoCocina: item.tiempoCocina,
      imgURL: item.imgURL,
    } as any);
  }, [item]);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (!form.isValid()) return;
    setCurrentStep((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () => {
    if (!form.isValid()) return;
    setCurrentStep((current) => (current > 0 ? current - 1 : current));
  };

  const [data, setData] = useState<TransferListData>();
  const [image, setImage] = useState<File>();
  const [isLoaded, setIsLoaded] = useState(true);

  const handleDrop = (files: File[]): void => {
    setIsLoaded(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      form.setValues({ ...form.values, imgURL: e.target?.result as string });
      setImage(files[0]);
      setIsLoaded(true);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.isValid()) return;

    form.values.insumosIDS = data ? data[0].map((i) => parseInt(i.value)) : [];
    console.log(form);

    const formData = new FormData();
    formData.append("imagen", image as Blob);

    console.log(
      "🚀 ~ file: ModalPForm.tsx:135 ~ handleSubmit ~ form.values:",
      form.values
    );

    if (item.id > 0) {
      formData.append(
        "producto",
        new Blob([JSON.stringify(form.values)], {
          type: "application/json",
        })
      );
      editProduct({
        id: item.id,
        formData,
      });
    } else {
      formData.append(
        "producto",
        new Blob([JSON.stringify(form.values)], { type: "application/json" })
      );
      createProduct(formData);
    }
    handleClose();
  };

  useEffect(() => {
    if (ingredients) {
      setData([
        [],
        ingredients?.map((i) => ({
          label: i.nombre,
          value: `${i.id}`,
        })),
      ]);
    }
  }, [ingredients]);
  const ref = useRef<HTMLInputElement>();

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={`${item.id > 0 ? "Editar" : "Crear"} Producto`}
      centered
      transitionProps={{ transition: "rotate-left" }}
      size="80%"
      padding="xl"
    >
      {/*   <LoadingOverlay visible={visible} overlayBlur={2} /> */}
      <form onSubmit={handleSubmit}>
        <Stepper
          active={currentStep}
          onStepClick={setCurrentStep}
          breakpoint="sm"
        >
          <Stepper.Step
            label="Información"
            description="Información general del producto"
            allowStepSelect={currentStep > 0}
          >
            <TextInput
              placeholder="Nombre"
              {...form.getInputProps("nombre")}
              required
              data-autofocus
              label="Nombre"
            />
            <Textarea
              {...form.getInputProps("descripcion")}
              label="Descripción"
              placeholder="Descripción"
              required
              autosize
              minRows={3}
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
              {...form.getInputProps("productoCategoria")}
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
              color={
                form.values.estado === ESTADO.NO_DISPONIBLE ? "red" : "lime"
              }
            />
          </Stepper.Step>

          <Stepper.Step
            label="Imagen"
            description="Imagen del producto"
            allowStepSelect={currentStep > 1}
          >
            <Dropzone
              onDrop={handleDrop}
              onReject={(files) => console.log("rejected files", files)}
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
                {image || form.values.imgURL ? (
                  <Image
                    alt="Uploaded"
                    src={form.values.imgURL}
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
            {image || form.values.imgURL ? (
              <Button
                variant="outline"
                color="red"
                onClick={() => {
                  setImage(undefined);
                  form.setValues({ ...form.values, imgURL: "" });
                }}
                w="100%"
                mt="md"
              >
                Eliminar imagen
              </Button>
            ) : null}
          </Stepper.Step>

          <Stepper.Step
            label="Receta"
            description="Receta del producto"
            allowStepSelect={currentStep > 2}
          >
            <TimeInput
              label="Tiempo de preparación"
              ref={ref as any}
              rightSection={
                <ActionIcon onClick={() => ref?.current?.showPicker()}>
                  <IconClock size="1rem" stroke={1.5} />
                </ActionIcon>
              }
              {...form.getInputProps("tiempoPreparacion")}
              maw={400}
            />
            <Text mb="md" size="xl" weight={700}>
              Receta
            </Text>
            <TextEditor />
            <Text my="md" size="xl" weight={700}>
              Ingredientes
            </Text>
            <TransferList
              value={data || [[], []]}
              onChange={setData}
              nothingFound="No existe tal ingrediente"
              placeholder="Sin ingredientes"
              listHeight={200}
              titles={["Lista de preparación", "Ingredientes"]}
              breakpoint="sm"
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed! Form values:
            <Space />
            <Code mt="xl">{JSON.stringify(form.values, null, 2)}</Code>
            <Button
              type="submit"
              mt="md"
              color="orange"
              w="100%"
              onClick={() => {}}
            >
              Guardar
            </Button>
          </Stepper.Completed>
        </Stepper>
        <SimpleGrid cols={2} spacing={4} mt="md">
          <Button
            variant="default"
            onClick={prevStep}
            disabled={currentStep < 1}
            w="100%"
            color="orange"
          >
            Volver
          </Button>
          <Button
            color="orange"
            onClick={nextStep}
            disabled={currentStep > 2}
            w="100%"
          >
            Continuar
          </Button>
        </SimpleGrid>
      </form>
    </Modal>
  );
};

export default ModalPForm;
