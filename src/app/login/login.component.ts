import { Component, OnInit } from '@angular/core';
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

 public myForm: FormGroup;

 public response;

  constructor(public fb: FormBuilder,
            private loginService: LoginService) {
      this.role = new Role(2, 'ROLE_USER');
      this.phone = new Phone(0, '', '9', '56');
      this.user = new UserModel(0, '', '', '', null, 'ROLE_USER', '', '', '', '');
      this.arrPhone = new Array<Phone>();
      this.myForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(8), Validators.maxLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    this.user.name = this.myForm.value.name;
    this.user.email = this.myForm.value.email;
    this.user.password = this.myForm.value.password;
    this.phone.number = this.myForm.value.phone;
    this.arrPhone.push(this.phone);
    this.user.phones = this.arrPhone;

    console.log(this.user);
    this.loginService.registerUser(this.user).subscribe(
      response => {
        this.response = response;
        console.log(this.response);
      },
      error => {
          console.log(error);
      }
    );
  }

}
