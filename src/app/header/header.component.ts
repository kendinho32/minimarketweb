import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ProductoService, UtilService]
})
export class HeaderComponent implements OnInit, DoCheck {

  public response;
  public product;
  public identity;
  public searchProduct: string;
  public cart: Cart;
  public countProducts: number;
  public arrProducts: Product[];

  constructor(private productoService: ProductoService,
             private utilService: UtilService,
             private _router: Router) {
        this.countProducts = 0;
  }

  /**
   * Metodo que se dispara cuando ocurre un cambio en la app
   */
  ngDoCheck(): void {
    this.identity = this.utilService.getIdentity();
    this.infoCart();
  }

  ngOnInit() {
  }

  infoCart() {
    this.cart = this.utilService.getCart();

      if (this.cart != null) {
        this.arrProducts = this.cart.products;
        this.countProducts = this.arrProducts.length;
      } else {
        this.countProducts = 0;
      }
  }

  buscarProducto(event) {
    if (event.key === 'Enter') {
        console.log(this.searchProduct);
        this._router.navigate(['/home', this.searchProduct]);
    }
  }

  logout() {
      localStorage.removeItem('identity'); // Eliminamos el objeto de sesion
      this.identity = null;
  }

}
