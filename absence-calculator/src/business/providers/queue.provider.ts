import { ISendMailDTO } from '../dtos/mail/send-mail.dto';
import { IQueueAddObject } from '../dtos/queue.dto';

export interface IQueueProvider {
  sendGenericEmail(object: ISendMailDTO): Promise<void>;
}

export interface IQueueConsumer {
  receive(object: IQueueAddObject): Promise<void>;
}

export const QueueProviderToken = Symbol.for('QueueProviderToken');
