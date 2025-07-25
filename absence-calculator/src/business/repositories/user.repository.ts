import { ICreateUserDTO } from '../dtos/user/create-user.dto';
import { IUser } from 'src/domains/user';
import { IUpdateUserDTO } from '../dtos/user/update-user.dto';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUser>;
  update(data: IUpdateUserDTO): Promise<IUser>;
  findById(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
}

export const UserRepositoryToken = Symbol.for('UserRepositoryToken');
