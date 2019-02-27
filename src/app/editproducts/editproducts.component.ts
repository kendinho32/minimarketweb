import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Product } from '../models/product';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css'],
  providers: [ProductoService, CategoriaService]
})
export class EditproductsComponent implements OnInit {

 public productForm: FormGroup;
 public idProducto: any;
 public producto: Product;
 public categories;
 public response;

  constructor(public fb: FormBuilder,
             private route: ActivatedRoute,
             private productService: ProductoService,
             private categorieService: CategoriaService) {
      this.productForm = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        price: ['', Validators.compose([Validators.required])],
        quantity: ['', Validators.compose([Validators.required])],
        categorie: ['', Validators.compose([Validators.required])],
        outstanding: ['', Validators.compose([Validators.required])],
        status: ['', Validators.compose([Validators.required])]
      });
  }

  ngOnInit() {
      this.idProducto = this.route.snapshot.paramMap.get('id');
      this.getAllCategories();
      this.getProductById(this.idProducto);
  }

  getAllCategories() {
      this.categorieService.getAllCategories().subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.categories = this.response.data;
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  getProductById(id) {
    this.productService.getProductsById(id).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.producto = this.response.data;
            console.log(this.response.data.categorie);

            this.productForm = this.fb.group({
                name: [this.producto.name, Validators.compose([Validators.required])],
                description: [this.producto.description, Validators.compose([Validators.required])],
                price: [this.producto.price, Validators.compose([Validators.required])],
                quantity: [this.producto.quantity, Validators.compose([Validators.required])],
                categorie: [this.response.data.categorie.id, Validators.compose([Validators.required])],
                outstanding: [this.producto.outstanding, Validators.compose([Validators.required])],
                status: [this.producto.status, Validators.compose([Validators.required])]
            });
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  onSubmit() {

  }

  fileChangeEventImage() {

  }

}
