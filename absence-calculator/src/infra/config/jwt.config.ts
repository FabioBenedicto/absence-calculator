import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default (configService: ConfigService) =>
  ({
    secret: configService.get<string>('AUTH_SECRET'),
    signOptions: {
      expiresIn: '6h',
    },
  }) as JwtModuleOptions;
