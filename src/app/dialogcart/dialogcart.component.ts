import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-dialogcart',
  templateUrl: './dialogcart.component.html',
  styleUrls: ['./dialogcart.component.css'],
  providers: [CartService]
})
export class DialogcartComponent implements OnInit {

  public cart: Cart;
  public texto: string;
  public validateCart;
  public success: boolean;
  public response;

  constructor(public dialogRef: MatDialogRef<DialogcartComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private cartService: CartService) {
    this.cart = this.data.cart;
    this.success = false;
  }

  ngOnInit() {
      this.enviarPedido();
  }

  enviarPedido() {
    this.validateCart = this.cartService.validateCart(this.cart);

    if (this.validateCart.result) {
        this.cart.products = this.cartService.updateIdZero(this.cart.products);
        this.cart.status = 'Ingresada';
        this.cartService.sendOrder(this.cart).subscribe(
            response => {
                this.response = response;

                if (this.response.success) {
                    this.validateCart.result = false;
                    this.success = true;
                    this.validateCart.msj = this.response.message + ' :)';

                } else {
                    this.validateCart.msj = 'Orden no realizada :(';
                    this.success = false;
                    this.validateCart.result = false;
                }
            },
            error => {
                console.log(error);
                this.validateCart.msj = 'Orden no realizada :(';
                this.success = false;
                this.validateCart.result = false;
            }
        );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
