import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/business/useCases/use-case.module';
import { AiModule } from 'src/infra/providers/AiProvider/ai.module';
import { ClassController } from './class.controller';

@Module({
  imports: [UseCaseModule, AiModule],
  controllers: [ClassController],
})
export class ClassModule {}
