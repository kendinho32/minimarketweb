import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [CategoriaService, ProductoService]
})
export class CategoriasComponent implements OnInit  {

  public response;

  public categorias;
  public productos;

  @Output() emisor = new EventEmitter();

  constructor(private categorieService: CategoriaService) { }

  ngOnInit() {
      this.getAllCategories();
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

  buscarProductosByCategoria(id) {
    this.emisor.emit({
        'idCategoria': id
    });
  }

}
