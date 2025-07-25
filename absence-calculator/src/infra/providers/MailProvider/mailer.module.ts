import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule as NodeMailerModule } from '@nestjs-modules/mailer';

import mailerConfigFactory from '../../config/node-mailer.config';

import { MailerProviderToken } from 'src/business/providers/mail.provider.interface';
import { NodeMailerProvider } from './implementations/node-mailer.provider';

@Module({
  imports: [
    NodeMailerModule.forRootAsync({
      useFactory: mailerConfigFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: MailerProviderToken,
      useClass: NodeMailerProvider,
    },
  ],
  exports: [MailerProviderToken],
})
export class MailerModule {}
