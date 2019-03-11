import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  /**
   * Funcion que se encarga de devolver el valor total de todos los productos
   * que van dentro del arreglo
   */
  totalCard(arrProducts: Product[]): number {
    let total: number;
    total = 0;

    arrProducts.forEach(function (value) {
        total = total + (value.price * value.quantitySelect);
    });

    return total;
  }

  verifyProductInsideTheCar(product: Product, arrProducts: Product[]): number {
     let total: number;
     total = 0;

     arrProducts.forEach(function (value) {
        if (value.id === product.id) {
            total = value.quantitySelect + 1;
        }
    });
    return total;
  }

  updateQuantitySelectByProduct(idProduct: number, quantitySelect: number, arrProducts: Product[]): Product[] {
    arrProducts.forEach(function (value) {
        if (value.id === idProduct) {
            value.quantitySelect = quantitySelect;
        }
    });

    return arrProducts;
  }
}
