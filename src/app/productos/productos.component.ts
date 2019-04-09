import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { environment } from '../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
   providers: [ProductoService]
})
export class ProductosComponent implements OnInit {

  public url;
  public response;
  public productos;
  public idCategoria: number;

  constructor(private productoService: ProductoService) {
    this.url = environment.apiBase;
  }

  ngOnInit() {
      this.getAllProductos();
      $('html, body').animate({scrollTop: 0}, 'slow');
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

  buscarProductosByCategoria(event) {
    this.idCategoria = event.idCategoria;

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
  }

}
