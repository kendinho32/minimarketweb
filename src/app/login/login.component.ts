import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/userModel';
import { Role } from '../models/role';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Phone } from '../models/phone';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

 public user: UserModel;
 public role: Role;
 public arrPhone: Phone[];
 public phone: Phone;
 public registerForm: FormGroup;
 public loginForm: FormGroup;
 public response;

  constructor(public fb: FormBuilder,
            private loginService: LoginService,
            private _router: Router) {
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

  ngOnInit() {}

  onRegisterSubmit() {
    this.arrPhone = new Array<Phone>();

    this.user.name = this.registerForm.get('name').value;
    this.user.email = this.registerForm.get('email').value;
    this.user.password =  this.registerForm.get('password').value;
    this.phone.number = this.registerForm.get('phone').value;
    this.arrPhone.push(this.phone);
    this.user.phones = this.arrPhone;

    this.loginService.registerUser(this.user).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            // Se guarda en el localstored
            localStorage.setItem('identity', JSON.stringify(this.response.data));
            this._router.navigate(['/']);
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  onSubmit() {
    this.user.email = this.loginForm.get('email').value;
    this.user.password =  this.loginForm.get('password').value;

    this.loginService.loginUser(this.user).subscribe(
      response => {
        this.response = response;
        console.log(this.response);
        if (this.response.success) {
            // Se guarda en el localstored
            localStorage.setItem('identity', JSON.stringify(this.response.data));
            this._router.navigate(['/']);
        }
      },
      error => {
          console.log(error);
      }
    );
  }

}
