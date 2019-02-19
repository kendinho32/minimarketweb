import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ProductoService, UtilService]
})
export class HeaderComponent implements OnInit, DoCheck {

  public response;
  public product;
  public identity;
  public searchProduct: string;

  constructor(private productoService: ProductoService,
             private utilService: UtilService) { }

  /**
   * Metodo que se dispara cuando ocurre un cambio en la app
   */
  ngDoCheck(): void {
    this.identity = this.utilService.getIdentity();
  }

  ngOnInit() {}

  buscarProducto(event) {
    if (event.key === 'Enter') {
        console.log(this.searchProduct);
        this.productoService.getProductsByName(this.searchProduct).subscribe(
            response => {
                this.response = response;
                if (this.response.success) {
                    this.product = this.response.data;
                }
            },
            error => {
                console.log(error);
            }
        );
    }
  }

  logout() {
      localStorage.removeItem('identity'); // Eliminamos el objeto de sesion
      this.identity = null;
  }

}
