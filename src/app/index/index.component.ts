import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductoService } from '../services/producto.service';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { UtilService } from '../services/util.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [ProductoService, CartService, UtilService]
})
export class IndexComponent implements OnInit {

  public productos;
  public productosRecommended: Product[];
  public firstTreeRecommendedProducts: Product[];
  public response;
  public url;
  public producto: Product;
  public arrProducts: Product[];
  public cart: Cart;
  public identity;

  public idCategoria: number;

  constructor(private productoService: ProductoService,
              private cartService: CartService,
              public dialog: MatDialog,
              private utilService: UtilService) {
    this.url = environment.apiBase;
    this.productosRecommended = new Array<Product>();
    this.firstTreeRecommendedProducts = new Array<Product>();
  }

  ngOnInit() {
    this.getAllProductos();
    this.getAllProductosRecommended();
  }

  getAllProductos() {
    this.productoService.getAllProductos().subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.productos = this.response.data;
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  getAllProductosRecommended() {
    this.productoService.getAllProductosRecommended().subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            for (let i = 0; i < this.response.data.length; i++) {
                if (i < 2) {
                    this.firstTreeRecommendedProducts.push(this.response.data[i]);
                } else {
                    this.productosRecommended.push(this.response.data[i]);
                }
            }
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  buscarProductosByCategoria(event) {
    this.idCategoria = event.idCategoria;
    this.productoService.getProductsByCategoria(this.idCategoria).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.productos = this.response.data;
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  getProductById(id) {
    this.openDialog();
    this.productoService.getProductsById(id).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.producto = this.response.data;

            this.cart = this.utilService.getCart();

            if (this.cart != null) {
                this.arrProducts = this.cart.products;
                // se revisa si ya se encuentra agregado el producto en el carro
                this.producto.quantitySelect = this.cartService.verifyProductInsideTheCar(this.producto, this.arrProducts);

                if (this.producto.quantitySelect > 1) {
                    this.arrProducts = this.cartService.updateQuantitySelectByProduct(id, this.producto.quantitySelect, this.arrProducts);
                } else {
                    this.producto.quantitySelect = 1;
                    this.arrProducts.push(this.producto);
                }
                this.cart.products = this.arrProducts;
                this.cart.shipping = 0;
                this.cart.total = this.cartService.totalCard(this.arrProducts);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } else {
                this.arrProducts = new Array<Product>();
                this.cart = new Cart(0, null, 0, 0);
                this.producto.quantitySelect = 1;
                this.arrProducts.push(this.producto);
                this.cart.products = this.arrProducts;
                this.cart.shipping = 0;
                this.cart.total = this.cartService.totalCard(this.arrProducts);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        componente: 'registerCart'
      }
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

}
