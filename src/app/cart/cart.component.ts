import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { ProductoService } from '../services/producto.service';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { DialogcartComponent } from '../dialogcart/dialogcart.component';
import { Direccion } from '../models/direccion';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [UtilService, ProductoService, CartService]
})
export class CartComponent implements OnInit {

  public idProducto: any;
  public identity: any;
  public response: any;
  public producto: Product;
  public arrProducts: Product[];
  public cart: Cart;
  public direccion: Direccion;
  public url: any;
  public comunas: string[];
  public success: boolean;
  public montoPedido: boolean;

  constructor(private utilService: UtilService,
             public dialog: MatDialog,
             private _router: Router,
             private cartService: CartService) {
    this.arrProducts = new Array<Product>();
    this.url = environment.apiBase;
    this.comunas = ['Ñuñoa', 'Santiago Centro'];
	this.direccion = new Direccion('', '', '');
	this.montoPedido = false;
  }

  ngOnInit() {
      this.cart = this.utilService.getCart();
      this.identity = this.utilService.getIdentity();

      if (this.cart != null) {
        this.arrProducts = this.cart.products;
      }

      if (this.identity === null) {
        // se redirecciona a la pagina de login
        this._router.navigate(['/login']);
    }
    $('html, body').animate({scrollTop: 0}, 'slow');
  }

  addCountProduct(index: any) {
      this.arrProducts[index].quantitySelect = this.arrProducts[index].quantitySelect + 1;
      this.cart.total = this.cartService.totalCard(this.arrProducts);
      this.cart.products = this.arrProducts;
      localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  subtractCountProduct(index: any) {
      this.arrProducts[index].quantitySelect = this.arrProducts[index].quantitySelect - 1;

      if (this.arrProducts[index].quantitySelect < 1) {
        this.deleteProduct(index);
      } else {
        this.cart.total = this.cartService.totalCard(this.arrProducts);
        this.cart.products = this.arrProducts;
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
  }

  deleteProduct(index: any) {
      this.arrProducts.splice(index, 1);
      this.cart.total = this.cartService.totalCard(this.arrProducts);
      this.cart.products = this.arrProducts;
      localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  realizarPedido() {
      this.cart.direccion = this.direccion;
	  this.cart.idUsuario = this.identity.id;

	  if (this.cart.total < 5000) {
		this.montoPedido = true;
		$('html, body').animate({scrollTop: 0}, 'slow');
	  } else {
		this.montoPedido = false;
		this.openDialog();
	  }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogcartComponent, {
      width: '350px',
      data: {
        cart: this.cart
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.success = result;
      if (this.success) {
        localStorage.removeItem('cart'); // Eliminamos el objeto de sesion
        this._router.navigate(['/']);
      }
    });
  }

  addShipping(tipo: string) {
      if (tipo === 'delivery') {
        this.cart.shipping = 2000;
      } else {
        this.cart.shipping = 0;
      }
  }

}
