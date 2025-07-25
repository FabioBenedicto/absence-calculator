// import { Injectable } from '@nestjs/common';
// import { IMailProvider } from 'src/business/providers/mail.provider.interface';
// import { ISendMailDTO } from 'src/business/dtos/mail/send-mail.dto';
// import { ConfigService } from '@nestjs/config';
// import { Resend } from 'resend';

// @Injectable()
// export class ResendProvider implements IMailProvider {
//   private readonly resend: Resend;

//   constructor(private readonly configService: ConfigService) {
//     const resend_api_key = configService.get<string>('RESENED_API_KEY');
//     console.log('1');
//     this.resend = new Resend(resend_api_key);
//     console.log('2');
//   }

//   private readonly senderEmail = 'absencecalculator@outlook.com';

//   public sendMail({
//     to,
//     from = this.senderEmail,
//     subject,
//     text,
//     attachments,
//   }: ISendMailDTO): void {
//     console.log('caralhi');
//     this.resend.emails
//       .send({
//         to,
//         from,
//         subject,
//         text,
//         attachments,
//       })
//       .then((success) => {
//         console.log(success);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
