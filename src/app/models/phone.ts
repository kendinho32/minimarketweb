/**
 * Entidad para el Phone
 */
export class Phone {
  constructor(
    public id: number,
    public number: string,
    public citycode: string,
    public countrycode: string
  ) {}
}
