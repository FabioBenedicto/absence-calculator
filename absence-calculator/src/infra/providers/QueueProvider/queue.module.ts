import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import bullConfigFactory from '../../config/bull.config';

import { QueueProvider } from './implementations/bull.provider';
import { SendMailJobKey } from 'src/controllers/shared/jobs/send-mail.job';
import { SharedJobModule } from 'src/controllers/shared/jobs/shared-job.module';
import { QueueProviderToken } from 'src/business/providers/queue.provider';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: bullConfigFactory,
      inject: [ConfigService],
    }),

    SharedJobModule.register([
      BullModule.registerQueue({
        name: SendMailJobKey,
      }),
    ]),
  ],
  providers: [
    {
      provide: QueueProviderToken,
      useClass: QueueProvider,
    },
  ],
  exports: [QueueProviderToken],
})
export class QueueModule {}
