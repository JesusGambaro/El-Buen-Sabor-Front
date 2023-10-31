import { type ReactNode } from "react";

type Estado = "DISPONIBLE" | "NO_DISPONIBLE" | "SIN_STOCK";

interface ReusableTableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
  }>;
  onFilter?: (filters: any) => void;
  onSearch?: (searchTerm: string) => void;
  onPageChange?: (page: number) => void;
  // ... any other props you think might be necessary
}

interface Producto {
  nombre: string;
  imgURL?: string;
  descripcion: string;
  tiempoCocina: number;
  receta: string;
  estado: Estado;
  productoCategoria: Categoria;
  insumosIDS: number[];
  id: number;
  precioUnitario: number;
  valoracion: number;
  descuento: number;
  insumos: Insumo[];
}

interface Categoria {
  id: number;
  nombre: string;
  categoriaPadre?: Categoria;
  img?: string;
  estado: Estado;
  tipo: string;
  subCategoria?: Categoria[];
}

interface Insumo {
  id?: number | null;
  nombre: string;
  imagen: string;
  stock_minimo: number;
  stock_actual: number;
  costo: number;
  categoria?: Categoria;
  estado: Estado;
  unidad_medida?: MeasureUnit;
  es_complemento: boolean;
}

interface InsumoCarrito {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  costo: number;
  precioTotal: number;
  id?: number | null;
  urlIMG?: string;
  urlImg?: string;
}

interface ProductSupply {
  id?: number | null;
  insumo: Insumo;
  cantidad: number;
}

interface MeasureUnit {
  id?: number | null;
  nombre: string;
  estado: string;
}
interface CartItem {
  nombre: string;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  precioUnitarioSinDescuento: number;
  precioTotalSinDescuento: number;
  descuento: number;
  precioTotal: number;
  urlIMG?: string;
}

interface Carrito {
  productosManufacturados: CartItem[];
  productosAgregados: InsumoCarrito[];
  totalCompra: number;
}
interface CarritoVanilla {
  productosComprados: Producto[];
  productosAdicionales: Insumo[];
}

interface Direccion {
  calleNombre: string;
  departamento?: string;
  numeracion: number;
  aclaracion?: string;
  nroPiso?: number;
  id?: number;
}

interface Order {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
}

interface Usuario {
  id?: string;
  name?: string;
  username: string;
  email: string;
  blocked: boolean;
  direccionList?: Direccion[];
  rol?: Rol;
  picture?: string;
  email_verified?: boolean | null;
  phone_number?: string;
}

interface Rol {
  id?: string;
  name: string;
  description: string;
}

interface Auth {
  user: Usuario;
  loading: boolean;
  hasErrors: boolean;
  token: string;
  isAuth: boolean;
  attempt: boolean;
}

interface State {
  products: Producto[];
  user: Usuario;
  auth: Auth;
  landing: Landing;
}

interface AdminState {
  products: Producto[];
  supplies: Insumo[];
  categories: Categoria[];
  loading: boolean;
  hasErrors: boolean;
  product: Producto | null;
  productLoading: boolean;
  productHasErrors: boolean;
}

interface Landing {
  landingProducts: Producto[];
  categories: Categoria[];
  loading: boolean;
  hasErrors: boolean;
}

interface Action {
  type: string;
  payload: any;
}

type Dispatch = (action: Action) => void;

interface Store {
  state: State;
  dispatch: Dispatch;
}

type Reducer = (state: State, action: Action) => State;

interface Context {
  store: Store;
  dispatch: Dispatch;
}

interface ProviderProps {
  children: ReactNode;
}

interface Route {
  path: string;
  component: ReactNode;
}

type Routes = Record<string, Route>;

interface RouteProps {
  path: string;
  component: ReactNode;
}

interface RoutesProps {
  routes: Routes;
}

interface LinkProps {
  to: string;
  children: ReactNode;
}

interface ProductProps {
  product: Producto;
}

interface CartItemProps {
  item: CartItem;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
}
interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}
interface OrderProps {
  order: Order;
}

interface UserProps {
  user: Usuario;
}

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// export all types
export type {
  ErrorBoundaryProps,
  Producto,
  CartItem,
  Order,
  Direccion,
  Usuario,
  Rol,
  State,
  Action,
  Dispatch,
  Store,
  Reducer,
  Context,
  MeasureUnit,
  ProductSupply,
  ProviderProps,
  Route,
  Routes,
  RouteProps,
  RoutesProps,
  LinkProps,
  ProductProps,
  CartItemProps,
  CartProps,
  Carrito,
  CarritoVanilla,
  OrderProps,
  UserProps,
  Categoria,
  Landing,
  Insumo,
  AdminState,
  SideBarProps,
  InsumoCarrito,
  ReusableTableProps,
};
