import { IAbsence } from './absence';
import { IClass } from './class';

export interface IUser {
  id: number;
  email: string;
  password: string;
  change_password_token?: string;

  classes?: IClass[];
  absences?: IAbsence[];
}
