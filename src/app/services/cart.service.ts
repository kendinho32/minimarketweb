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
        total = total + value.price;
    });

    return total;
  }
}
