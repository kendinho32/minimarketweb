import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public headers;

  constructor(public _http: HttpClient) {
      this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

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

  updateIdZero(arrProducts: Product[]): Product[] {
     arrProducts.forEach(function (value) {
         value.id = 0;
    });
    return arrProducts;
  }

  updateQuantitySelectByProduct(idProduct: number, quantitySelect: number, arrProducts: Product[]): Product[] {
    arrProducts.forEach(function (value) {
        if (value.id === idProduct) {
            value.quantitySelect = quantitySelect;
        }
    });

    return arrProducts;
  }

  validateCart(cart: Cart) {
    const result = {'result': true, 'msj': 'Realizando pedido :)'};

    if (cart.pago == null || cart.pago === '') {
        result.result = false;
        result.msj = 'Debe seleccionar el tipo de pago';
    } else {
        if (cart.tipo == null || cart.tipo === '') {
            result.result = false;
            result.msj = 'Debe seleccionar si desea Delivery o retira en el local';
        } else {
            if (cart.tipo === 'delivery') {
                if ((cart.direccion.comuna == null || cart.direccion.comuna === '') ||
                    (cart.direccion.calle == null || cart.direccion.calle === '') ||
                    (cart.direccion.nro == null || cart.direccion.nro === '')) {
                    result.result = false;
                    result.msj = 'Debes escribir toda la dirección para el envio';
                }
            }
        }
    }
    return result;
  }

  sendOrder(cart: Cart): Observable<any> {
    return this._http.post(environment.apiBase + 'auth/sendOrder/' + cart.idUsuario, cart, {headers: this.headers});
  }

  getOrdersByUser(id: number): Observable<any> {
    return this._http.get(environment.apiBase + 'auth/get-orders-user/' + id, {headers: this.headers});
  }

}
