import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductoService } from '../services/producto.service';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { UtilService } from '../services/util.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';

declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    providers: [ProductoService, CartService, UtilService, CategoriaService]
})
export class IndexComponent implements OnInit {

    public productos: any;
    public productosRecommended: Product[];
    public firstTreeRecommendedProducts: Product[];
    public response: any;
    public url: any;
    public producto: Product;
    public arrProducts: Product[];
    public cart: Cart;
    public identity: any;

    public idCategoria: number;
    public busqueda: string;
    public categorias: any;

    constructor(private productoService: ProductoService,
        private route: ActivatedRoute,
        private cartService: CartService,
        public dialog: MatDialog,
        private utilService: UtilService,
        private categorieService: CategoriaService) {
        this.url = environment.apiBase;
        this.productosRecommended = new Array<Product>();
        this.firstTreeRecommendedProducts = new Array<Product>();
    }

    ngOnInit() {
        this.getAllCategories();
        this.getAllProductos();
        this.busqueda = this.route.snapshot.paramMap.get('id');

        this.getAllProductosRecommended();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }

    getAllCategories() {
        this.categorieService.getAllCategories().subscribe(
            response => {
                this.response = response;
                if (this.response.success) {
                    this.categorias = this.response.data;
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    buscarProducto(busqueda: string) {
        this.productoService.getProductsByName(busqueda).subscribe(
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
                        if (i < 3) {
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

    buscarProductosByCategoria(idCategoria: number) {
        this.idCategoria = idCategoria;
        this.busqueda = null;
        if (this.idCategoria === 0) {
            this.getAllProductos();
        } else {
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
        $('.navbar-collapse').collapse('hide');
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
                        this.cart = new Cart(0, '', '', null, null, 0, 0, '', null);
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

        dialogRef.afterClosed().subscribe(() => { });
    }

}
