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

    this.cartService.sendOrder(this.cart).subscribe(
      response => {
        /*
        this.response = response;
        if (this.response.success) {
            this.texto = this.response.message + ' :)';
        } else {
            this.texto = this.response.message + ' :(';
        }
        this.boton = true;
        */
      },
      error => {
        /*
        console.log(error);
        this.texto = error.error.message + ' :(';
        this.error = true;
        */
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
