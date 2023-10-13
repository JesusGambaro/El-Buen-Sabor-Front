import React from "react";
import {
  CartItem,
  CartProps,
  Category,
  Product,
  Carrito,
  InsumoCarrito,
  CarritoVanilla,
  Insumo,
} from "types/types";
export const CreateCartFunc = (data: CarritoVanilla) => {
  let nuevoCarrito: Carrito = {
    productosAgregados: [],
    productosComprados: [],
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
        urlIMG: pAdicional.urlIMG,
      };
      nuevoCarrito.totalCompra += nuevoProducto.precioUnitario;
      productosAgregados = [...productosAgregados, nuevoProducto];
    }
  });
  nuevoCarrito.productosComprados = productosComprados;
  nuevoCarrito.productosAgregados = productosAgregados;
  console.log(productosComprados);
  return nuevoCarrito;
};

export const CartAddProduct = (carrito: Carrito, productoData: Product) => {
  let productoFound = carrito.productosComprados.find(
    (x) => x.productoId == productoData.id
  );

  if (productoFound) {
    productoFound.cantidad++;
    let valorCalculado =
      productoData.precioUnitario -
      (productoData.precioUnitario * productoData.descuento) / 100;
    productoFound.precioTotal += valorCalculado;
    productoFound.precioTotalSinDescuento += productoData.precioUnitario;
    carrito.totalCompra += valorCalculado;
  } else {
    let valorCalculado =
      productoData.precioUnitario -
      (productoData.precioUnitario * productoData.descuento) / 100;
    let nuevoProducto: CartItem = {
      cantidad: 1,
      descuento: productoData.descuento,
      nombre: productoData.nombre,
      precioTotal: valorCalculado,
      precioTotalSinDescuento: productoData.precioUnitario,
      precioUnitario: valorCalculado,
      precioUnitarioSinDescuento: productoData.precioUnitario,
      productoId: productoData.id,
      urlIMG: productoData.imgURL,
    };
    carrito.totalCompra += valorCalculado;
    carrito.productosComprados = [...carrito.productosComprados, nuevoProducto];
  }
  return carrito;
};
export const CartEditItemProduct = (
  carrito: Carrito,
  productID: number,
  agregar: boolean
) => {
  let productoFound = carrito.productosComprados.find(
    (x) => x.productoId == productID
  );

  if (productoFound) {
    if (agregar) {
      productoFound.cantidad++;
    } else {
      productoFound.cantidad--;
      if (productoFound.cantidad <= 0) {
        carrito.productosComprados = carrito.productosComprados.filter(
          (x) => x.productoId != productoFound?.productoId
        );
      }
      console.log(carrito);
      
      return carrito;
    }

    let valorCalculado =
      productoFound.precioUnitario -
      (productoFound.precioUnitario * productoFound.descuento) / 100;
    productoFound.precioTotal += valorCalculado;
    productoFound.precioTotalSinDescuento += productoFound.precioUnitario;
    carrito.totalCompra += valorCalculado;
  }
  return carrito;
};
