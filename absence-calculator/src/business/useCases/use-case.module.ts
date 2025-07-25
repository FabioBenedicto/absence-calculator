import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infra/repositories/repository.module';
import { CreateAbsenceUseCase } from './absence/create-absence.usecase';
import { ProviderModule } from 'src/infra/providers/provider.module';
import { ValidateSessionUseCase } from './session/validate-session.usecase';
import { CreateUserUseCase } from './user/create-user.usecase';
import { ShowUserUseCase } from './user/show-user.usecase';
import { UpdateUserUseCase } from './user/update-user.usecase';
import { FindByEmailUseCase } from './user/find-by-email.usecase';
import { ChangePasswordUseCase } from './user/change-password.usecase';
import { SendMailUseCase } from './shared/mail/send-mail.usecase';

const useCases = [
  // Absence
  CreateAbsenceUseCase,
  CreateUserUseCase,
  ValidateSessionUseCase,
  ShowUserUseCase,
  UpdateUserUseCase,
  FindByEmailUseCase,
  ChangePasswordUseCase,
  SendMailUseCase,
];

@Module({
  imports: [RepositoryModule, ProviderModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCaseModule {}
