import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

 public identity;

  constructor() { }

  /**
   * Metodo que va a buscar las caracteristicas de un usuario dentro del localStored y
   * convertirlo a un objeto javascript utilizable
   */
  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    this.identity = identity !== 'undefined' ? identity : null;
    return this.identity;
  }
}
