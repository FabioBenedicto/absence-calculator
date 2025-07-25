import { IsEmail, IsString } from 'class-validator';

export class CreateUserValidator {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
