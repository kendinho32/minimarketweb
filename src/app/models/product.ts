import { Categorie } from './categorie';

export class Product {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public quantity: number;
    public quantitySelect: number;
    public image: string;
    public categorie: Categorie;
    public outstanding: boolean;
    public status: boolean;

  constructor() {
      this.id = 0;
      this.name = '';
      this.description = '';
      this.price = 0;
      this.quantity = 0;
      this.quantitySelect = 0;
      this.image = '';
      this.categorie = new Categorie();
      this.outstanding = false;
      this.status = false;
  }
}
