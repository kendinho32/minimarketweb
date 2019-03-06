import { Product } from './product';

export class Cart {
    constructor(
    public idUsuario: number,
    public products: Product[],
    public shipping: number,
    public total: number) {}

}
