type Path = {
    name: string;
    icon: string;
    route: string;
}
const paths: Path[] = [
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
        name: "Dashboard",
        icon: 'fa-solid fa-table-columns',
        route: "/admin/",
    },
    {
        name: "Stock",
        icon: "fa-solid fa-boxes-stacked",
        route: "/admin/stock",
    },
    {
        name: "Pedidos",
        icon: "fa-solid fa-truck-ramp-box",
        route: "/admin/pedidos",
    },
    {
        name: "Usuarios",
        icon: 'fa-solid fa-users',
        route: '/admin/usuarios'
    },
    {
        name: "Configuración",
        icon: "fa-solid fa-gear",
        route: "/admin/configuracion",
    },
];
const ESTADO = Object.freeze({
    DISPONIBLE: "DISPONIBLE",
    NO_DISPONIBLE: "NO_DISPONIBLE",
});

export {
    paths, adminPaths, ESTADO
};

export type { Path };

