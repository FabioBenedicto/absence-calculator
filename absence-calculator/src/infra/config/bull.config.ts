import { ConfigService } from '@nestjs/config';

import { QueueOptions } from 'bull';

export default (configService: ConfigService) => {
  const tls = configService.get<string>('REDIS_TLS')
    ? {
        servername: configService.get<string>('REDIS_HOST'),
        rejectUnauthorized: false,
      }
    : undefined;

  return {
    prefix: `${configService.get<string>('REDIS_PREFIX')}:bull`,
    redis: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      password: configService.get<string>('REDIS_PASSWORD'),
      tls,
    },
  } as QueueOptions;
};
