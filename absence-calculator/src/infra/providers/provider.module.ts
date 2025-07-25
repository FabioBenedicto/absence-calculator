import { Module } from '@nestjs/common';
import { AiModule } from './AiProvider/ai.module';
import { HashModule } from './HashProvider/hash.module';
import { QueueModule } from './QueueProvider/queue.module';
import { MailerModule } from './MailProvider/mailer.module';

const providers = [AiModule, HashModule, QueueModule, MailerModule];

@Module({
  imports: providers,
  exports: providers,
})
export class ProviderModule {}
