import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [CategoriaService, ProductoService]
})
export class IndexComponent implements OnInit {

  public categorias;
  public productos;
  public response;

  constructor(private categorieService: CategoriaService,
              private productoService: ProductoService) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllProductos();
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

  buscarProductosByCategoria(id) {
    this.productoService.getProductsByCategoria(id).subscribe(
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
