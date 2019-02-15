import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public headers;

  constructor(public _http: HttpClient) {
      this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  registerUser(user: UserModel): Observable<any> {
    return this._http.post(environment.apiBase + 'auth/register', user, {headers: this.headers});
  }
}
