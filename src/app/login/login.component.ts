import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/userModel';
import { Role } from '../models/role';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public user: UserModel;
 public role: Role;

 public myForm: FormGroup;

  constructor(public fb: FormBuilder) {
      this.role = new Role(2, 'ROLE_USER');
      this.user = new UserModel(0, '', '', '', null, this.role, '', '', '', '');
      this.myForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    this.user.name = this.myForm.value.name;
    this.user.email = this.myForm.value.email;
    this.user.phone = this.myForm.value.phone;
    this.user.password = this.myForm.value.password;
    console.log(this.user);
  }

}
