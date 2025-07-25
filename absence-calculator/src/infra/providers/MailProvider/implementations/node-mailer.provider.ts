import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailProvider } from 'src/business/providers/mail.provider.interface';
import { ISendMailDTO } from 'src/business/dtos/mail/send-mail.dto';
import { ConfigService } from '@nestjs/config';
// import { google } from 'googleapis';

@Injectable()
export class NodeMailerProvider implements IMailProvider {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private readonly senderEmail = 'fabiobenedicto@outlook.com';

  public async sendMail({
    to,
    from = this.senderEmail,
    // context,
    subject,
    text,
    attachments,
  }: ISendMailDTO): Promise<void> {
    console.log('caralhi');

    // const oAuth2Client = new google.auth.OAuth2(
    //   this.configService.get<string>('GOOGLE_CLIENT_ID'),
    //   this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
    //   'https://developers.google.com/oauthplayground',
    // );
    // oAuth2Client.setCredentials({
    //   refresh_token: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
    // });

    // const accessToken = await oAuth2Client.getAccessToken();

    // this.mailerService.addTransporter('gmail', {
    //   service: 'gmail',
    //   auth: {
    //     type: 'OAuth2',
    //     user: this.configService.get<string>('MAIL_USER'),
    //     clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    //     clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
    //     refreshToken: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
    //     accessToken: accessToken.token,
    //   },
    // });

    await Promise.resolve();

    this.mailerService
      .sendMail({
        to,
        from,
        subject,
        // context,
        text,
        attachments,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
