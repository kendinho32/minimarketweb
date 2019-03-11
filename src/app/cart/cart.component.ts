import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { ProductoService } from '../services/producto.service';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [UtilService, ProductoService, CartService]
})
export class CartComponent implements OnInit {

  public idProducto: any;
  public identity;
  public response;
  public producto: Product;
  public arrProducts: Product[];
  public cart: Cart;
  public url;

  constructor(private route: ActivatedRoute,
             private utilService: UtilService,
             private productService: ProductoService,
             private _router: Router,
             private cartService: CartService) {
    this.arrProducts = new Array<Product>();
    this.url = environment.apiBase;
  }

  ngOnInit() {
      this.cart = this.utilService.getCart();
      this.identity = this.utilService.getIdentity();

      if (this.cart != null) {
        this.arrProducts = this.cart.products;
      } else {
        this.cart = new Cart(0, null, 0, 0);
      }

      if (this.identity === null) {
        // se redirecciona a la pagina de login
        this._router.navigate(['/login']);
    }
  }

  addCountProduct(index) {
      this.arrProducts[index].quantitySelect = this.arrProducts[index].quantitySelect + 1;
      this.cart.total = this.cartService.totalCard(this.arrProducts);
      this.cart.products = this.arrProducts;
      localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  subtractCountProduct(index) {
      this.arrProducts[index].quantitySelect = this.arrProducts[index].quantitySelect - 1;
      this.cart.total = this.cartService.totalCard(this.arrProducts);
      this.cart.products = this.arrProducts;
      localStorage.setItem('cart', JSON.stringify(this.cart));
  }

}
