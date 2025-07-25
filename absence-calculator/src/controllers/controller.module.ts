import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/business/useCases/use-case.module';
import { ProviderModule } from 'src/infra/providers/provider.module';
import { AbsenceModule } from './absence/absence.module';
import { HolidayModule } from './holiday/holiday.module';
import { ClassModule } from './class/class.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guards/jwt.auth.guard';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    UseCaseModule,
    ProviderModule,
    AbsenceModule,
    HolidayModule,
    ClassModule,
    UserModule,
    SessionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ControllerModule {}
