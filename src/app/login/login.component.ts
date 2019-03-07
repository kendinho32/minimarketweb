import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserModel } from '../models/userModel';
import { Role } from '../models/role';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Phone } from '../models/phone';
import { DialogComponent } from '../dialog/dialog.component';
import { UtilService } from '../services/util.service';
import { Cart } from '../models/cart';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, UtilService]
})
export class LoginComponent implements OnInit {

 public user: UserModel;
 public role: Role;
 public arrPhone: Phone[];
 public phone: Phone;
 public registerForm: FormGroup;
 public loginForm: FormGroup;
 public response;
 public cart: Cart;

  constructor(public fb: FormBuilder,
            private _router: Router,
            private utilService: UtilService,
            public dialog: MatDialog) {
      this.role = new Role(2, 'ROLE_USER');
      this.phone = new Phone(0, '', '9', '56');
      this.user = new UserModel(0, '', '', '', null, 'ROLE_USER', '', '', '', '');

      this.loginForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required])]
      });

      this.registerForm = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        phone: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      });
  }

  ngOnInit() {
    this.cart = this.utilService.getCart();
    $('html, body').animate({scrollTop: 0}, 'slow');
  }

  onRegisterSubmit() {
    this.arrPhone = new Array<Phone>();

    this.user.name = this.registerForm.get('name').value;
    this.user.email = this.registerForm.get('email').value;
    this.user.password =  this.registerForm.get('password').value;
    this.phone.number = this.registerForm.get('phone').value;
    this.arrPhone.push(this.phone);
    this.user.phones = this.arrPhone;

    this.openDialogRegister();
  }

  onSubmit() {
    this.user.email = this.loginForm.get('email').value;
    this.user.password =  this.loginForm.get('password').value;

    this.openDialogLogin();
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        componente: 'login',
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.response = result;
      if (this.response != null && this.response.success) {
        if (this.cart != null) {
          this._router.navigate(['/cart', 0]);
        } else  {
          this._router.navigate(['/']);
        }
      } else {
        this.loginForm.reset();
      }
    });
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        componente: 'register',
        user: this.user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.response = result;
      if (this.response != null && this.response.success) {
        this._router.navigate(['/']);
      } else {
        this.registerForm.reset();
      }
    });
  }

}
