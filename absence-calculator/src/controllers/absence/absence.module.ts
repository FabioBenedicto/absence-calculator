import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UseCaseModule } from 'src/business/useCases/use-case.module';
import { AbsenceController } from './absence.controller';

@Module({
  imports: [UseCaseModule, ConfigModule],
  controllers: [AbsenceController],
})
export class AbsenceModule {}
