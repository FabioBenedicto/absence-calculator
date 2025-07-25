import { IsString } from 'class-validator';

export class ChangePasswordValidator {
  @IsString()
  change_password_token: string;

  @IsString()
  password: string;
}
