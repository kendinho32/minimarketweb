import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public headers;

  constructor(public _http: HttpClient) {
      this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  sendFormContact(contact: Contact): Observable<any> {
    return this._http.post(environment.apiBase + 'auth/send-contact', contact, {headers: this.headers});
  }


}
