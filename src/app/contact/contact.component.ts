import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Contact } from '../models/contact';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;
  public contact: Contact;

  constructor(public fb: FormBuilder,
             public dialog: MatDialog) {
      this.contact = new Contact();

      this.contactForm = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        subject: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        message: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      });
  }

  ngOnInit() {
      $('html, body').animate({scrollTop: 0}, 'slow');
  }

  onSubmit() {
    this.contact.name = this.contactForm.get('name').value;
    this.contact.email = this.contactForm.get('email').value;
    this.contact.subject = this.contactForm.get('subject').value;
    this.contact.message = this.contactForm.get('message').value;

    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        componente: 'contacto',
        contact: this.contact
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.contactForm.reset();
    });
  }

}
