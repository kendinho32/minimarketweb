import { Phone } from './phone';

export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public phones: Phone[],
    public role: string,
    public token: string,
    public created: string,
    public modified: string,
    public lastLogin: string
  ) {}
}
