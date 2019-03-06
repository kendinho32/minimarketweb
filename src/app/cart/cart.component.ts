import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { ProductoService } from '../services/producto.service';
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

  constructor(private route: ActivatedRoute,
             private utilService: UtilService,
             private productService: ProductoService,
             private _router: Router,
             private cartService: CartService) {
    this.arrProducts = new Array<Product>();
  }

  ngOnInit() {
      this.idProducto = this.route.snapshot.paramMap.get('id');
      this.identity = this.utilService.getIdentity();
      this.cart = new Cart(0, null, 0, 0);
      this.getProductById(this.idProducto);
  }

  getProductById(id) {
    this.productService.getProductsById(id).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.producto = this.response.data;
            this.arrProducts.push(this.producto);
            this.cart.products = this.arrProducts;
            this.cart.shipping = 0;
            this.cart.total = this.cartService.totalCard(this.arrProducts);
            localStorage.setItem('cart', JSON.stringify(this.cart));

            if (this.identity === null) {
                // se redirecciona a la pagina de login
                this._router.navigate(['/login']);
            }
        }
      },
      error => {
          console.log(error);
      }
    );
  }

}
