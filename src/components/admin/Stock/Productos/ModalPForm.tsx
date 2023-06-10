import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Modal,
  Select,
  SegmentedControl,
  Stepper,
  createStyles,
  rem,
} from "@mantine/core";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { Product, Category } from "Types/types";
import { ESTADO } from "@utils/constants";

type Props = {
  opened: boolean;
  close: () => void;
  title: string;
  item: Product;
  setItem?: (item: Product) => void;
};
const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  separator: {
    height: rem(2),
    borderTop: `${rem(2)} dashed ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4]
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: "transparent",
  },

  separatorActive: {
    borderWidth: 0,
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.blue[6],
      theme.colors.cyan[6]
    ),
  },

  stepIcon: {
    borderColor: "transparent",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,
    borderWidth: 0,

    "&[data-completed]": {
      borderWidth: 0,
      backgroundColor: "transparent",
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.blue[6],
        theme.colors.cyan[6]
      ),
    },
  },

  step: {
    transition: "transform 150ms ease",

    "&[data-progress]": {
      transform: "scale(1.05)",
    },
  },
}));
const ModalPForm = (props: Props) => {
  const { opened, close, title, item, setItem } = props;

  const { data: categories, isLoading } = useApiQuery("GET|categoria/all") as {
    data: Category[];
    error: any;
    isLoading: boolean;
  };
  const { mutate: createCategory } = useApiMutation("POST|categoria");
  const { mutate: editCategory } = useApiMutation("PUT|categoria");
  const initialValues = {
    id: -1,
    nombre: "",
    descripcion: "",
    estado: ESTADO.DISPONIBLE as string,
    receta: "",
    productoCategoria: {
      id: -1,
      nombre: "",
    },
    tiempoCocina: 0,
    insumoSet: [] as number[],
  };

  const form = useForm({
    initialValues,
    validate: {
      nombre: (value) =>
        value.length < 3 ? "El nombre debe tener al menos 3 caracteres" : null,
    },
  });

  const handleClose = () => {
    form.reset();
    setItem?.(initialValues as Product);
    close();
  };
  useEffect(() => {
    form.setValues({
      nombre: item?.nombre,
      descripcion: item?.descripcion,
      receta: item?.receta,
      tiempoCocina: item?.tiempoCocina,
      productoCategoria: item?.productoCategoria,
      id: item?.id,
      insumoSet: item?.insumoSet,
      estado: item?.estado,
    });
  }, [item]);
  const { classes } = useStyles();
  const [active, setActive] = useState(1);
  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={title}
      centered
      transitionProps={{ transition: "rotate-left" }}
      size="md"
    >
      <Stepper
        classNames={classes}
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
      >
        <Stepper.Step label="Step 1" description="Create an account">
          <div className={classes.root}>
            <TextInput
              label="Nombre"
              placeholder="Nombre"
              {...form.getInputProps("nombre")}
              required
              data-autofocus
            />
            <TextInput
              label="Descripción"
              placeholder="Descripción"
              {...form.getInputProps("descripcion")}
              required
            />
          </div>
        </Stepper.Step>
        <Stepper.Step label="Step 2" description="Verify email" />
        <Stepper.Step label="Step 3" description="Get full access" />
      </Stepper>
      <form
        onSubmit={form.onSubmit((values) => {
          if (item.id > 0) {
            editCategory({ ...values, id: item.id });
          } else {
            createCategory(values);
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
          maxDropdownHeight={100}
          dropdownPosition="bottom"
          data={
            categories
              ? categories?.map((category: Category) => ({
                  value: "" + category.id,
                  label: category.nombre,
                }))
              : []
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

export default ModalPForm;
