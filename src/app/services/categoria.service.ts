import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriaService {

  public headers;

  constructor(public _http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllCategories(): Observable<any> {
    return this._http.get('http://localhost:9080/api/auth/get-all-categories', {headers: this.headers});
  }
}
