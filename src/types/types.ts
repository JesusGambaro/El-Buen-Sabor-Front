import { ReactNode } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    img: string;
    quantity: number;
    discount: number;
    rating: number;
};

type Category = {
    id?: number;
    id_categoria: number;
    nombre: string;
    categoria_padre: number;
};

type CartItem = {
    product: Product;
    quantity: number;
};

type Cart = {
    items: CartItem[];
    checkout: boolean;
};

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
    cart: Cart;
    user: User;
    auth: Auth;
    landing: Landing;
};

type Supply = {
    id?: number;
    id_insumo: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    stock_minimo: number;
    stock_actual: number;
    alta: boolean;
    costo: number;
    id_categoria: number;
    id_unidad_medida: number;
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


type CreditCard = {
    cardNumber: number;
    cardName: string;
    cardDate: Date;
    cardCvv: number;
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
    cart?: Cart;
    isOpen: boolean;
    onClose: () => void;
    btnRef: any;
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
    Cart,
    Order,
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
    OrderProps,
    UserProps,
    Category,
    Landing,
    CreditCard,
    Supply,
    AdminState,
};

