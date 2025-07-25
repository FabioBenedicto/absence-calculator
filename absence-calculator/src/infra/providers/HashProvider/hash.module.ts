import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HashProviderToken } from 'src/business/providers/hash.provider.interface';
import { BcryptHashProvider } from './implementations/bcrypt.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: HashProviderToken,
      useClass: BcryptHashProvider,
    },
  ],
  exports: [HashProviderToken],
})
export class HashModule {}
