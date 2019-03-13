import { Product } from './product';
import { Direccion } from './direccion';

export class Cart {
    constructor(
    public idUsuario: number,
    public tipo: string,
    public pago: string,
    public direccion: Direccion,
    public products: Product[],
    public shipping: number,
    public total: number,
    public status: string) {}

}
