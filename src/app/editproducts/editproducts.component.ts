import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Product } from '../models/product';
import { CategoriaService } from '../services/categoria.service';
import { Categorie } from '../models/categorie';
import { environment } from '../../environments/environment';
import { UploadService } from '../services/upload.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css'],
  providers: [ProductoService, CategoriaService, UploadService]
})
export class EditproductsComponent implements OnInit {

 public productForm: FormGroup;
 public idProducto: any;
 public producto: Product;
 public categories: Categorie[];
 public response;
 public url;
 public filesToUpload: Array<File>;

  constructor(public fb: FormBuilder,
             private route: ActivatedRoute,
             private productService: ProductoService,
             private categorieService: CategoriaService,
             private _router: Router,
             public dialog: MatDialog,
             private uploadService: UploadService) {
      this.url = environment.apiBase;
      this.productForm = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        price: ['', Validators.compose([Validators.required])],
        quantity: ['', Validators.compose([Validators.required])],
        categorie: ['', Validators.compose([Validators.required])],
        outstanding: [''],
        status: ['', Validators.compose([Validators.required])]
      });
  }

  ngOnInit() {
      this.idProducto = this.route.snapshot.paramMap.get('id');
      this.getAllCategories();
  }

  getAllCategories() {
      this.categorieService.getAllCategories().subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.categories = this.response.data;
            this.getProductById(this.idProducto);
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  getProductById(id) {
    let indice = 0;

    this.productService.getProductsById(id).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.producto = this.response.data;

            for (let i = 0; i < this.categories.length; i++) {
              if (this.response.data.categorie.id === this.categories[i].id) {
                indice = i;
              }
            }

            this.productForm = this.fb.group({
                name: [this.producto.name, Validators.compose([Validators.required])],
                description: [this.producto.description, Validators.compose([Validators.required])],
                price: [this.producto.price, Validators.compose([Validators.required])],
                quantity: [this.producto.quantity, Validators.compose([Validators.required])],
                categorie: [this.categories[indice], Validators.compose([Validators.required])],
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
    this.producto.name = this.productForm.get('name').value;
    this.producto.description = this.productForm.get('description').value;
    this.producto.price = this.productForm.get('price').value;
    this.producto.quantity = this.productForm.get('quantity').value;
    this.producto.categorie = this.productForm.get('categorie').value;
    this.producto.outstanding = this.productForm.get('outstanding').value;
    this.producto.status = this.productForm.get('status').value;

    this.openUpdateProductoDialog();
  }

  openUpdateProductoDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        componente: 'updateProducto',
        producto: this.producto
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/productos']);
    });
  }

  fileChangeEventImage(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

    this.uploadService.makeFileRequest('auth/savePicture/', this.idProducto, this.filesToUpload, 'picture').then(
        (response: any) => {
            this.response = response;
            console.log('Resultado --> ' + this.response);
            this.producto = this.response.data;
        },
        (error) => {
            console.log('Error');
            console.log(error);
        }
    );
  }

}
