import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { UserModel } from '../models/userModel';
import { LoginService } from '../services/login.service';
import { Product } from '../models/product';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [ContactService, ProductoService, LoginService]
})
export class DialogComponent implements OnInit {

  public contact: Contact;

  public user: UserModel;
  public producto: Product;

  public response;

  public boton: boolean;

  public texto: string;

  public componente: string;
  public error: boolean;
  public addProduct: boolean;

  ngOnInit(): void {}

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
            private contactService: ContactService,
            private loginService: LoginService,
			private productService: ProductoService,
			private _router: Router,
            @Inject(MAT_DIALOG_DATA) public data: any) {
    this.componente = data.componente;
    this.boton = false;
    this.error = false;
    this.addProduct = false;

    if (this.componente === 'contacto') {
        this.contact = data.contact;
        this.texto = 'Enviando contacto, por favor espere...!';
        this.sendFormContact();
    }

    if (this.componente === 'login') {
        this.user = data.user;
        this.texto = 'Verificando usuario, por favor espere...!';
        this.sendFormLogin();
    }

    if (this.componente === 'register') {
        this.user = data.user;
        this.texto = 'registrando usuario, por favor espere...!';
        this.sendFormRegister();
    }

    if (this.componente === 'updateProducto') {
        this.producto = data.producto;
        this.texto = 'Actualizando producto, por favor espere...!';
        this.sendFormUpdateProducto();
    }

    if (this.componente === 'registerCart') {
        this.texto = 'Producto agregado exitosamente...!, puedes modificar la cantidad en el carrito de compras';
        this.boton = true;
        this.addProduct = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  irCarro(){
	this._router.navigate(['/cart']);
  }

  sendFormContact() {
    this.contactService.sendFormContact(this.contact).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.texto = this.response.message + ' :)';
        } else {
            this.texto = this.response.message + ' :(';
        }
        this.boton = true;
      },
      error => {
          console.log(error);
          this.texto = error.error.message + ' :(';
          this.error = true;
      }
    );
  }

  sendFormUpdateProducto() {
    this.productService.updateProduct(this.producto).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.texto = this.response.message + ' :)';
        } else {
            this.texto = this.response.message + ' :(';
        }
        this.boton = true;
      },
      error => {
          console.log(error);
          this.texto = error.error.message + ' :(';
          this.error = true;
      }
    );
  }

  sendFormLogin() {
      this.loginService.loginUser(this.user).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            // Se guarda en el localstored
            localStorage.setItem('identity', JSON.stringify(this.response.data));
            this.texto = this.response.message + ' :)';
        } else {
            this.texto = this.response.message + ' :(';
        }
        this.boton = true;
      },
      error => {
          console.log(error);
          this.texto = error.error.message + ' :(';
          this.error = true;
      }
    );
  }

  sendFormRegister() {
      this.loginService.registerUser(this.user).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            // Se guarda en el localstored
            localStorage.setItem('identity', JSON.stringify(this.response.data));
            this.texto = this.response.message + ' :)';
        } else {
            this.texto = this.response.message + ' :(';
        }
        this.boton = true;
      },
      error => {
          console.log(error);
          this.texto = error.error.message + ' :(';
          this.error = true;
      }
    );
  }

}
