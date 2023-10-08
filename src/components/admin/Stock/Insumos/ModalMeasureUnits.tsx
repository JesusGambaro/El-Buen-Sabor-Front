import { useApiQuery } from "@hooks/useQueries";
import {
  ActionIcon,
  Flex,
  Table,
  Input,
  Modal,
  ScrollArea,
  Space,
  Pagination,
  Badge,
  rem,
  Center,
} from "@mantine/core";
import { useState, type JSX, useEffect } from "react";
import { Edit, ListSearch } from "tabler-icons-react";
import { type MeasureUnit } from "types/types";
import Th from "../ThSorter/ThSorter";
import { measuresUnitsStore } from "@store/adminStore";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Loader from "@components/app/Loader/Loader";
import TRAddRow from "./TRAddRow";
import { useMantineTheme } from "@utils/theme";

// Interface for the props of the component
interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

const ModalMeasureUnits = (props: ModalProps): JSX.Element => {
  const { opened, onClose } = props;
  const { classes } = useMantineTheme();
  const [editItem, setEditItem] = useState<MeasureUnit | null>({
    nombre: "",
    estado: "DISPONIBLE",
  });
  const {
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    sortBy,
    setSortBy,
    getFilters,
  } = measuresUnitsStore();

  const setSorting = (field: keyof MeasureUnit): void => {
    const reversed =
      field === sortBy.field ? sortBy.direction !== "desc" : false;
    setSortBy(field, reversed ? "desc" : "asc");
  };

  const [query, setQuery] = useState(filters?.nombre ?? "");

  const { data: measureUnits, isLoading } = useApiQuery(
    "GET|um/filter",
    getFilters()
  ) as {
    data: MeasureUnit[];
    error: any;
    isLoading: boolean;
  };

  const [inlineForm, { toggle, close }] = useDisclosure(false);

  const onEditClose = (): void => {
    setEditItem(null);
    toggle();
  };

  const [rows, setRows] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setRows(
      Array.isArray(measureUnits) && measureUnits.length > 0
        ? measureUnits.map((measureUnit) => (
            <tr
              key={`supply-${measureUnit.nombre}-${measureUnit?.id ?? "new"}`}
            >
              <td>{measureUnit?.id}</td>
              <td>{measureUnit?.nombre}</td>
              <td>
                <Badge
                  color={measureUnit.estado === "DISPONIBLE" ? "lime" : "red"}
                >
                  Disponible
                </Badge>
              </td>
              <td>
                <ActionIcon
                  aria-label="Edit"
                  onClick={() => {
                    handleEdit(measureUnit);
                    toggle();
                  }}
                >
                  <Edit />
                </ActionIcon>
              </td>
            </tr>
          ))
        : [
            <tr key="no-supplies">
              <td colSpan={4} style={{ textAlign: "center" }}>
                No hay insumos
              </td>
            </tr>,
          ]
    );
  }, [measureUnits]);

  const maxTableHeight = rem(window.innerHeight - 300);

  const handleEdit = (measureUnit: MeasureUnit): void => {
    setEditItem(measureUnit);
    // replace the rows data with inlined form
    const rowIdx = 1;
    rows.forEach((row, idx) => {
      console.log("found row", row.props);
    });

    const newRows = [...rows];
    newRows[rowIdx] = (
      <TRAddRow
        key={`addrow-${measureUnit.nombre}- ${editItem?.id ?? "new"}`}
        opened={inlineForm}
        onClose={onEditClose}
        item={
          editItem ?? {
            nombre: "",
            estado: "DISPONIBLE",
          }
        }
      />
    );

    setRows(newRows);
  };
  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
        setEditItem(null);
        onClose();
      }}
      centered
      size="60%"
      scrollAreaComponent={ScrollArea.Autosize}
      title="Unidades de medida"
    >
      <Flex justify="space-between" align="center" mb="1rem">
        <Input.Wrapper
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilters({ ...filters, nombre: query });
            }
          }}
        >
          <Input
            size="md"
            type="tel"
            placeholder="Buscar unidad de medida..."
            icon={<ListSearch />}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            styles={(theme) => ({
              input: {
                borderColor: theme.colors.orange[5],
                borderWidth: 1,
                "&:focus-within": {
                  borderColor: theme.colors.orange[7],
                  borderWidth: 2,
                },
              },
            })}
          />
        </Input.Wrapper>
        <ActionIcon
          color="orange"
          size="xl"
          radius="xl"
          variant="filled"
          onClick={toggle}
        >
          <IconPlaylistAdd size="2.125rem" />
        </ActionIcon>
      </Flex>
      {isLoading ? (
        <Center mih={maxTableHeight}>
          <Loader />
        </Center>
      ) : (
        <ScrollArea h={maxTableHeight}>
          <Table
            verticalSpacing={"sm"}
            striped
            captionSide="bottom"
            highlightOnHover
            withColumnBorders
            style={{ tableLayout: "fixed" }}
          >
            <thead className={classes.header}>
              <tr>
                <Th
                  sorted={sortBy.field === "id"}
                  reversed={sortBy.direction === "desc"}
                  onSort={() => {
                    setSorting("id");
                  }}
                >
                  ID
                </Th>
                <Th
                  sorted={sortBy.field === "nombre"}
                  reversed={sortBy.direction === "desc"}
                  onSort={() => {
                    setSorting("nombre");
                  }}
                >
                  Nombre
                </Th>
                <Th
                  sorted={sortBy.field === "estado"}
                  reversed={sortBy.direction === "desc"}
                  onSort={() => {
                    setSorting("estado");
                  }}
                >
                  Disponibilidad
                </Th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {editItem === null && inlineForm && (
                <TRAddRow
                  opened={inlineForm}
                  onClose={onEditClose}
                  item={
                    editItem ?? {
                      nombre: "",
                      estado: "DISPONIBLE",
                    }
                  }
                />
              )}
              {rows}
            </tbody>
          </Table>
        </ScrollArea>
      )}
      <Space h={20} />
      <Pagination
        color="orange"
        total={totalPages}
        onChange={(value) => {
          setCurrentPage(value - 1);
        }}
        value={currentPage + 1 ?? 1}
        mt={8}
      />
    </Modal>
  );
};

export default ModalMeasureUnits;
