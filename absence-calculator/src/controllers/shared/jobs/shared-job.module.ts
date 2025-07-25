import { DynamicModule, forwardRef, Module } from '@nestjs/common';

import { SendMailJob, SendMailJobKey } from './send-mail.job';
import { UseCaseModule } from 'src/business/useCases/use-case.module';

@Module({
  imports: [forwardRef(() => UseCaseModule)],
})
export class SharedJobModule {
  static register(queue: DynamicModule[]): DynamicModule {
    return {
      module: SharedJobModule,
      imports: [...queue],
      providers: [
        {
          provide: SendMailJobKey,
          useClass: SendMailJob,
        },
      ],
      exports: [...queue],
    };
  }
}
