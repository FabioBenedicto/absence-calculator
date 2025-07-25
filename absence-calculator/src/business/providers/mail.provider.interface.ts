import { ISendMailDTO } from '../dtos/mail/send-mail.dto';

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}

export const MailerProviderToken = Symbol.for('MailerProviderToken');
