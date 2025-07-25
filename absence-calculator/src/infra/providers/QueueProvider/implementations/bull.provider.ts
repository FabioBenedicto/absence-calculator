import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { Job, Queue } from 'bull';

import { IQueueProvider } from 'src/business/providers/queue.provider';
import { ISendMailDTO } from 'src/business/dtos/mail/send-mail.dto';
import { JogRegistrationTimeoutError } from '../erros/job-registration-timeout.error';
import { SendMailJobKey } from 'src/controllers/shared/jobs/send-mail.job';

@Injectable()
export class QueueProvider implements IQueueProvider {
  private defaultTimeoutMs = 5000;
  private readonly maxAgeJobInSeconds = 86400; // 1 day

  constructor(
    @InjectQueue(SendMailJobKey)
    private readonly sendGenericMailJob: Queue,
  ) {}

  private async registerQueueWithTimeout(
    name: string,
    queue: Promise<Job<any>>,
    timeout = this.defaultTimeoutMs,
  ) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new JogRegistrationTimeoutError(name));
      }, timeout);

      Promise.resolve(queue)
        .then((value: any) => {
          clearTimeout(timer);
          resolve(value);
        })
        .catch((error: any) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  }

  async sendGenericEmail(object: ISendMailDTO): Promise<void> {
    await this.registerQueueWithTimeout(
      SendMailJobKey,
      this.sendGenericMailJob.add(object, {
        removeOnComplete: {
          age: this.maxAgeJobInSeconds,
        },
      }),
    );
  }
}
