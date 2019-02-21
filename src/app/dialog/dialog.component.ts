import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [ContactService]
})
export class DialogComponent implements OnInit {

  public contact: Contact;

  public response;

  public boton: boolean;

  public texto: string;

  ngOnInit(): void {}

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
            private contactService: ContactService,
            @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contact = data.contact;
    this.sendFormContact();
    this.boton = false;
    this.texto = 'Enviando contacto, por favor espere...!';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendFormContact() {
    this.contactService.sendFormContact(this.contact).subscribe(
      response => {
        this.response = response;
        if (this.response.success) {
            this.texto = this.response.message + ' :)';
        } else {
            this.texto = 'No fue posible enviar el correo de contacto :(';
        }
        this.boton = true;
      },
      error => {
          console.log(error);
      }
    );
  }

}
