import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GeminiProvider } from './implementations/gemini.provider';
import { AiProviderToken } from 'src/business/providers/ai.provider.interface';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [
    {
      provide: AiProviderToken,
      useClass: GeminiProvider,
    },
  ],
  exports: [AiProviderToken],
})
export class AiModule {}
