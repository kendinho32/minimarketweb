import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoriaService {

  public headers;

  constructor(public _http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllCategories(): Observable<any> {
    return this._http.get(environment.apiBase + 'auth/get-all-categories', {headers: this.headers});
  }
}
