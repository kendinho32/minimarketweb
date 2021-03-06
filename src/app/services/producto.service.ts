import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UtilService } from './util.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public headers;
  public identity;

  constructor(public _http: HttpClient,
            private utilService: UtilService) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.identity = this.utilService.getIdentity();
  }

  getAllProductos(): Observable<any> {
    return this._http.get(environment.apiBase + 'auth/get-all-products', { headers: this.headers });
  }

  getAllProductosRecommended(): Observable<any> {
    return this._http.get(environment.apiBase + 'auth/get-all-products-recommended', { headers: this.headers });
  }

  getProductsByCategoria(id) {
      return this._http.get(environment.apiBase + 'auth/get-products-by-categorie/' + id, { headers: this.headers });
  }

  getProductsByName(name) {
      return this._http.get(environment.apiBase + 'auth/get-product-by-name/' + name, { headers: this.headers });
  }

  getProductsById(id) {
      return this._http.get(environment.apiBase + 'auth/get-product/' + id,
      { headers: this.headers });
  }

  updateProduct(product: Product) {
      return this._http.post(environment.apiBase + 'auth/update-product', product, { headers: this.headers });
  }
}
