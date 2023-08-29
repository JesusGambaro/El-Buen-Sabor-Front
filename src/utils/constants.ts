import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconAdjustments,
  IconUsers,
} from "@tabler/icons-react";

interface Path {
  label: string;
  icon: (props: any) => JSX.Element;
  link: string;
  initiallyOpened?: boolean;
  links?: Array<{ label: string; link: string }>;
}
interface Path2 {
  name: string;
  icon: string;
  route: string;
}

const paths: Path2[] = [
  {
    name: "Home",
    icon: "fa-solid fa-home",
    route: "/",
  },
  {
    name: "Catalogo",
    icon: "fa-solid fa-utensils",
    route: "/catalogo",
  },
  {
    name: "Carrito",
    icon: "fa-solid fa-cart-shopping",
    route: "/carrito",
  },
  {
    name: "Configuracion",
    icon: "fa-solid fa-gear",
    route: "/configuracion",
  },
];

const adminPaths: Path[] = [
  {
    label: "Dashboard",
    icon: IconGauge,
    initiallyOpened: false,
    links: [
      { label: "Ranking comidas", link: "dashboard/rankingComidas" },
      { label: "Ingresos", link: "dashboard/ingresos" },
      { label: "Ranking clientes", link: "dashboard/rankingClientes" },
    ],
    link: "/admin/stock",
  },
  {
    label: "Stock",
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: "Categorias", link: "stock/categorias" },
      { label: "Productos", link: "stock/productos" },
      { label: "Insumos", link: "stock/insumos" },
    ],
    link: "/admin/stock",
  },
  {
    label: "Pedidos",
    link: "/admin/pedidos",
    icon: IconCalendarStats,
  },
  {
    label: "Usuarios",
    icon: IconUsers,
    link: "/admin/usuarios",
  },
  {
    label: "Configuración",
    icon: IconAdjustments,
    link: "/admin/configuracion",
  },
];
const ESTADO = Object.freeze({
  DISPONIBLE: "DISPONIBLE",
  NO_DISPONIBLE: "NO_DISPONIBLE",
});

const TIPO_CATEGORIA = Object.freeze({
  INSUMO: "INSUMO",
  PRODUCTO: "PRODUCTO",
});

// const API_URL = 'https://apimocha.com/elbuensabor/';
const API_URL: string = "http://localhost:3000/api/v1/";
const API_SPRING: string = "http://localhost:9000/v1/api/";

export { API_URL, API_SPRING };
export { paths, adminPaths, ESTADO, TIPO_CATEGORIA };
export type { Path, Path2 };
