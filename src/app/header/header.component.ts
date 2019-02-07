import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ProductoService]
})
export class HeaderComponent implements OnInit {

  public response;
  public product;
  public searchProduct: string;

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
  }

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

}
