import React from "react";
import {
  CartItem,
  CartProps,
  Categoria,
  Producto,
  Carrito,
  InsumoCarrito,
  CarritoVanilla,
  Insumo,
} from "types/types";
export const CreateCartFunc = (data: CarritoVanilla) => {
  let nuevoCarrito: Carrito = {
    productosAgregados: [],
    productosManufacturados: [],
    totalCompra: 0,
  };
  let productosComprados: CartItem[] = [];
  let productosAgregados: InsumoCarrito[] = [];
  data.productosComprados.map((pComprado) => {
    let productoFound = productosComprados.find(
      (x) => x.productoId == pComprado.id
    );
    if (productoFound) {
      productoFound.cantidad++;
      let valorCalculado =
        pComprado.precioUnitario -
        (pComprado.precioUnitario * pComprado.descuento) / 100;
      productoFound.precioTotal += valorCalculado;
      productoFound.precioTotalSinDescuento += pComprado.precioUnitario;
      nuevoCarrito.totalCompra += valorCalculado;
    } else {
      let valorCalculado =
        pComprado.precioUnitario -
        (pComprado.precioUnitario * pComprado.descuento) / 100;
      let nuevoProducto: CartItem = {
        cantidad: 1,
        descuento: pComprado.descuento,
        nombre: pComprado.nombre,
        precioTotal: valorCalculado,
        precioTotalSinDescuento: pComprado.precioUnitario,
        precioUnitario: valorCalculado,
        precioUnitarioSinDescuento: pComprado.precioUnitario,
        productoId: pComprado.id,
        urlIMG: pComprado.imgURL,
      };
      nuevoCarrito.totalCompra += valorCalculado;
      productosComprados = [...productosComprados, nuevoProducto];
    }
  });
  data.productosAdicionales.map((pAdicional: Insumo) => {
    let productoFound = productosAgregados.find((x) => x.id == pAdicional.id);
    if (productoFound) {
      productoFound.cantidad++;
      productoFound.precioTotal += productoFound.precioUnitario;
      nuevoCarrito.totalCompra += productoFound.precioUnitario;
    } else {
      let nuevoProducto: InsumoCarrito = {
        cantidad: 1,
        costo: pAdicional.costo,
        precioTotal: pAdicional.costo,
        id: pAdicional.id,
        nombre: pAdicional.nombre,
        precioUnitario: pAdicional.costo,
        urlIMG: pAdicional.imagen,
      };
      nuevoCarrito.totalCompra += nuevoProducto.precioUnitario;
      productosAgregados = [...productosAgregados, nuevoProducto];
    }
  });
  nuevoCarrito.productosManufacturados = productosComprados;
  nuevoCarrito.productosAgregados = productosAgregados;
  return nuevoCarrito;
};

export const CartDeleteItem = (
  carrito: Carrito,
  productID: number,
  esManufacturado: boolean
) => {
  let item; 
  if (esManufacturado) {
    item = carrito.productosManufacturados.find(x => x.productoId == productID);
    carrito.productosManufacturados = carrito.productosManufacturados.filter(
      (x) => x.productoId != productID
    );
  } else {
    item = carrito.productosAgregados.find(x => x.id == productID);
    carrito.productosAgregados = carrito.productosAgregados.filter(
      (x) => x.id != productID
    );
  }
  if(item) carrito.totalCompra -= item.precioTotal;
  return carrito;
};

export const CartEditItemProduct = (
  carrito: Carrito,
  productID: number,
  agregar: boolean,
  esManufacturado: boolean
) => {
  let productoFound = carrito.productosManufacturados.find(
    (x) => x.productoId == productID
  );
  let complementoFound = carrito.productosAgregados.find(
    (x) => x.id == productID
  );
  if (productoFound && esManufacturado) {
    carrito.totalCompra -= productoFound.precioTotal;
    if (agregar) {
      productoFound.cantidad++;
    } else {
      productoFound.cantidad--;
      if (productoFound.cantidad <= 0) {
        carrito.productosManufacturados =
          carrito.productosManufacturados.filter(
            (x) => x.productoId != productoFound?.productoId
          );
        return carrito;
      }
    }

    let valorCalculado =
      productoFound.precioUnitario -
      (productoFound.precioUnitario * productoFound.descuento) / 100;
    productoFound.precioTotal = valorCalculado * productoFound.cantidad;
    productoFound.precioTotalSinDescuento =
      productoFound.precioUnitario * productoFound.cantidad;
    carrito.totalCompra += productoFound.precioTotal;
  } else if (complementoFound && !esManufacturado) {
    carrito.totalCompra -= complementoFound.precioTotal;
    if (agregar) {
      complementoFound.cantidad++;
    } else {
      complementoFound.cantidad--;
      if (complementoFound.cantidad <= 0) {
        carrito.productosAgregados = carrito.productosAgregados.filter(
          (x) => x.id != complementoFound?.id
        );
        return carrito;
      }
    }
    complementoFound.precioTotal =
      complementoFound.precioUnitario * complementoFound.cantidad;
    carrito.totalCompra += complementoFound.precioTotal;
  }
  return carrito;
};
export const CreateItemCarrito = (product: Producto) => {
  let valorCalculado =
    product.precio - (product.precio * product.descuento) / 100;
  let cartItem: CartItem = {
    cantidad: 1,
    descuento: product.descuento,
    nombre: product.nombre,
    precioTotal: valorCalculado,
    precioTotalSinDescuento: product.precio,
    precioUnitario: valorCalculado,
    precioUnitarioSinDescuento: product.precio,
    productoId: product.id,
    urlIMG: product.imgURL,
  };
  return cartItem;
};
export const CreateItemComplementoCarrito = (
  productComplemento: InsumoCarrito
) => {
  let cartItemComplemento: InsumoCarrito = {
    cantidad: 1,
    costo: productComplemento.costo,
    precioTotal: productComplemento.costo,
    id: productComplemento.id,
    nombre: productComplemento.nombre,
    precioUnitario: productComplemento.costo,
    urlIMG: productComplemento.urlIMG,
    urlImg: productComplemento.urlImg,
  };
  return cartItemComplemento;
};
