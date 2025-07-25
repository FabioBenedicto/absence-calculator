import { Inject, Injectable } from '@nestjs/common';
import { ISendMailDTO } from 'src/business/dtos/mail/send-mail.dto';
import {
  IMailProvider,
  MailerProviderToken,
} from 'src/business/providers/mail.provider.interface';

@Injectable()
export class SendMailUseCase {
  constructor(
    @Inject(MailerProviderToken)
    private readonly mailerProvider: IMailProvider,
  ) {}

  public execute(data: ISendMailDTO) {
    this.mailerProvider.sendMail(data);
  }
}
