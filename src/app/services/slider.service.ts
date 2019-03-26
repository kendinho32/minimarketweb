import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Slider } from '../models/slider';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

   public headers;

  constructor(public _http: HttpClient) {
      this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  sendFormSlider(slider: Slider): Observable<any> {
    return this._http.post(environment.apiBase + 'slider/save-slider', slider, {headers: this.headers});
  }

   getSliders(): Observable<any> {
    return this._http.get(environment.apiBase + 'slider/get-all-sliders', {headers: this.headers});
  }

  getSlider(id): Observable<any> {
    return this._http.get(environment.apiBase + 'slider/get-slider/' + id, {headers: this.headers});
  }

}
