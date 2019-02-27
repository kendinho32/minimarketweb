import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { environment } from '../../environments/environment';

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

}
