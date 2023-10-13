import { ESTADO, TIPO_CATEGORIA } from "@utils/constants";

export const TIPO_DATA = [
  { value: TIPO_CATEGORIA.INSUMO, label: "Insumo" },
  { value: TIPO_CATEGORIA.PRODUCTO, label: "Producto" },
];

export const ESTADO_DATA = [
  { value: ESTADO.NO_DISPONIBLE, label: "No disponible" },
  { value: ESTADO.DISPONIBLE, label: "Disponible" },
];
