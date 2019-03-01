import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  public makeFileRequest(metodo: string, idProducto: number, files: Array<File>, token: string, name: string) {
    const urlApi = environment.apiBase;
    return new Promise(function(resolve, reject) {
      const formData: any = new FormData(); // simulo un formulario clasico
      const xhr = new XMLHttpRequest(); // objeto para hacer peticiones ajax con js puro

      for (let i = 0; i < files.length; i++) { // for para recorrer los ficheros
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      document.getElementById('upload-progress-bar').setAttribute('value', '0');
      document.getElementById('upload-progress-bar').style.width = '0%';

      xhr.upload.addEventListener('progress', function(event: any) {
        const percent = (event.loaded / event.total) * 100;
        const prc = Math.round(percent).toString();

        document.getElementById('upload-progress-bar').setAttribute('value', prc);
        document.getElementById('upload-progress-bar').style.width = prc + '%';
        document.getElementById('status').innerHTML = Math.round(percent) + ' % subido... por favor espera a que termine';
	  }, false);

	  xhr.addEventListener('load', function() {
		document.getElementById('status').innerHTML = 'Subida completada';
		let prc = '100';
		document.getElementById('upload-progress-bar').setAttribute('value', prc);
		document.getElementById('upload-progress-bar').setAttribute('aria-valuenow', prc);
		document.getElementById('upload-progress-bar').style.width = prc + '%';
	  }, false);

	  xhr.addEventListener('error', function() {
		document.getElementById('status').innerHTML = 'Error en la subida';
	  }, false);

	  xhr.addEventListener('abort', function() {
		document.getElementById('status').innerHTML = 'Subida abortada';
	  }, false);

      xhr.open('POST', urlApi + metodo + idProducto, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.send(formData);
    });
  }
}
