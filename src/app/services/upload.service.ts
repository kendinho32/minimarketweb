import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  public identity;

  constructor(private utilService: UtilService) {
      this.identity = this.utilService.getIdentity();
  }

  public makeFileRequest(metodo, idProducto, files: Array<File>, name) {
    const token = this.identity.token;
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
		document.getElementById('status').innerHTML = 'Imagen almacenada exitosamente';
		const prc = '100';
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

  public makeFileSliderRequest(metodo, idSlider, tipo, files: Array<File>, name) {
    const token = this.identity.token;
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

      if (tipo === 1) {
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
            document.getElementById('status').innerHTML = 'Imagen almacenada exitosamente';
            const prc = '100';
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
      } else {
        document.getElementById('upload-progress-bar2').setAttribute('value', '0');
        document.getElementById('upload-progress-bar2').style.width = '0%';

        xhr.upload.addEventListener('progress2', function(event: any) {
            const percent = (event.loaded / event.total) * 100;
            const prc = Math.round(percent).toString();

            document.getElementById('upload-progress-bar2').setAttribute('value', prc);
            document.getElementById('upload-progress-bar2').style.width = prc + '%';
            document.getElementById('status2').innerHTML = Math.round(percent) + ' % subido... por favor espera a que termine';
        }, false);

        xhr.addEventListener('load', function() {
            document.getElementById('status2').innerHTML = 'Imagen almacenada exitosamente';
            const prc = '100';
            document.getElementById('upload-progress-bar2').setAttribute('value', prc);
            document.getElementById('upload-progress-bar2').setAttribute('aria-valuenow', prc);
            document.getElementById('upload-progress-bar2').style.width = prc + '%';
        }, false);

        xhr.addEventListener('error', function() {
            document.getElementById('status2').innerHTML = 'Error en la subida';
        }, false);

        xhr.addEventListener('abort', function() {
            document.getElementById('status2').innerHTML = 'Subida abortada';
        }, false);
      }

      xhr.open('POST', urlApi + metodo + idSlider + '/tipo/' + tipo, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      xhr.send(formData);
    });
  }
}
