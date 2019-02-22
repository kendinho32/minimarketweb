import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [ProductoService]
})
export class IndexComponent implements OnInit {

  public productos;
  public response;
  public url;

  public idCategoria: number;

  constructor(private productoService: ProductoService) {
    this.url = environment.apiBase;
  }

  ngOnInit() {
    this.getAllProductos();
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
