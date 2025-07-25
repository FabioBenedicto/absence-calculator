import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/business/useCases/use-case.module';
import { HolidayController } from './holiday.controller';
import { AiModule } from 'src/infra/providers/AiProvider/ai.module';

@Module({
  imports: [UseCaseModule, AiModule],
  controllers: [HolidayController],
})
export class HolidayModule {}
