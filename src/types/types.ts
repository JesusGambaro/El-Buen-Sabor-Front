import { ReactNode } from "react";

type Product = {
  nombre: string;
  imgURL?: string;
  descripcion: string;
  tiempoCocina: number;
  receta: string;
  estado: string;
  productoCategoria: Category;
  insumoSet: number[];
  id: number;
  precio: number;
};

type Category = {
  id: number;
  nombre: string;
  categoriaPadre?: Category;
  img?: string;
  estado: string;
  subCategoria?: Category[];
};

type CartItem = {
  producto: string;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  imgURL: string;
};
type Carrito = {
  productosComprados: CartItem[];
  totalCompra: number;
};
interface Direccion {
  calleNombre: string;
  departamento: string;
  numeracion: number;
  aclaracion: string;
  nroPiso: number;
  id?: number;
}
type Order = {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  orders: Order[];
};

type Auth = {
  user: User;
  loading: boolean;
  hasErrors: boolean;
  token: string;
  isAuth: boolean;
  attempt: boolean;
};

type State = {
  products: Product[];
  user: User;
  auth: Auth;
  landing: Landing;
};

type Supply = {
  id: number;
  nombre: string;
  imagen: string | File;
  stockMinimo: number;
  stockActual: number;
  estado: string;
  costo: number;
};

type AdminState = {
  products: Product[];
  supplies: Supply[];
  categories: Category[];
  loading: boolean;
  hasErrors: boolean;
  product: Product | null;
  productLoading: boolean;
  productHasErrors: boolean;
};



type Landing = {
  landingProducts: Product[];
  categories: Category[];
  loading: boolean;
  hasErrors: boolean;
};

type Action = {
  type: string;
  payload: any;
};

type Dispatch = (action: Action) => void;

type Store = {
  state: State;
  dispatch: Dispatch;
};

type Reducer = (state: State, action: Action) => State;

type Context = {
  store: Store;
  dispatch: Dispatch;
};

type ProviderProps = {
  children: ReactNode;
};

type Route = {
  path: string;
  component: ReactNode;
};

type Routes = {
  [key: string]: Route;
};

type RouteProps = {
  path: string;
  component: ReactNode;
};

type RoutesProps = {
  routes: Routes;
};

type LinkProps = {
  to: string;
  children: ReactNode;
};

type ProductProps = {
  product: Product;
};

type CartItemProps = {
  item: CartItem;
};

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
};
type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};
type OrderProps = {
  order: Order;
};

type UserProps = {
  user: User;
};

type ErrorBoundaryProps = {
  children?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

//export all types
export type {
  ErrorBoundaryProps,
  Product,
  CartItem,
  Order,
  Direccion,
  User,
  State,
  Action,
  Dispatch,
  Store,
  Reducer,
  Context,
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
  OrderProps,
  UserProps,
  Category,
  Landing,
  Supply,
  AdminState,
  SideBarProps,
};
