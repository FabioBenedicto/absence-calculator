import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';

import { IQueueConsumer } from 'src/business/providers/queue.provider';
import { ISendMailDTO } from 'src/business/dtos/mail/send-mail.dto';
import { SendMailUseCase } from 'src/business/useCases/shared/mail/send-mail.usecase';

export const SendMailJobKey = 'SendMailJobKey';

@Processor(SendMailJobKey)
export class SendMailJob implements IQueueConsumer {
  private readonly logger = new Logger(SendMailJobKey);

  constructor(private readonly sendMailUseCase: SendMailUseCase) {}

  @Process()
  async preProcessor(job: Job<ISendMailDTO>) {
    await this.receive(job.data);
  }

  async receive(data: ISendMailDTO): Promise<void> {
    console.log('oh yeas');
    await this.sendMailUseCase.execute({
      ...data,
      from: '"Calculador de faltas" <absencecalculator@outlook.com>',
    });
    console.log('oh yea2');
  }

  @OnQueueError()
  onError(error: any) {
    this.logger.error(error);
  }
}
