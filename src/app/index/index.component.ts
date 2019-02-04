import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [CategoriaService]
})
export class IndexComponent implements OnInit {

  public categorias;

  constructor(private categorieService: CategoriaService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe(
      response => {
        this.categorias = response;
        console.log(this.categorias);
      },
      error => {
          console.log(error);
      }
    );
  }

}
