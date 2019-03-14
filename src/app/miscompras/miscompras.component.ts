import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { UtilService } from '../services/util.service';
import { environment } from '../../environments/environment';
import { Cart } from '../models/cart';

declare var $: any;

@Component({
  selector: 'app-miscompras',
  templateUrl: './miscompras.component.html',
  styleUrls: ['./miscompras.component.css'],
  providers: [CartService, UtilService]
})
export class MiscomprasComponent implements OnInit {

  public response: any;
  public identity: any;

  public orders: Cart[];
  public ordenesVacias: boolean;
  public url;

  constructor(private cartService: CartService,
             private utilService: UtilService) {
        this.identity = this.utilService.getIdentity();
        this.ordenesVacias = false;
        this.url = environment.apiBase;
  }

  ngOnInit() {
    this.getOrdersByUser(this.identity.id);
    $('html, body').animate({scrollTop: 0}, 'slow');
  }

  getOrdersByUser(id) {
    this.cartService.getOrdersByUser(id).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            console.log(this.response);
            this.orders = this.response.data;

            if (this.orders.length === 0) {
                this.ordenesVacias = true;
            }
        }
      },
      error => {
          console.log(error);
      }
    );
  }

}
