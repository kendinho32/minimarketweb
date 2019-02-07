import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public headers;

  constructor(public _http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllProductos(): Observable<any> {
    return this._http.get(environment.apiBase + 'auth/get-all-products', {headers: this.headers});
  }

  getProductsByCategoria(id) {
      return this._http.get(environment.apiBase + 'auth/get-products-by-categorie/' + id, {headers: this.headers});
  }

  getProductsByName(name) {
      return this._http.get(environment.apiBase + 'auth/get-product-by-name/' + name, {headers: this.headers});
  }
}
