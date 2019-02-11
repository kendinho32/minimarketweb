import { Role } from './role';
import { Phone } from './phone';

export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public phone: Phone[],
    public roles: Role,
    public token: string,
    public created: string,
    public modified: string,
    public lastLogin: string
  ) {}
}
