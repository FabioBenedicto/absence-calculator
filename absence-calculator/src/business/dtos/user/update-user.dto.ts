export interface IUpdateUserDTO {
  id: number;
  email?: string;
  password?: string;
  change_password_token?: string;
}
