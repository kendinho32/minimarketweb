/**
 * Entidad para el Contact
 */
export class Contact {
    public name: string;
    public email: string;
    public subject: string;
    public message: string;

  constructor() {
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
  }
}
