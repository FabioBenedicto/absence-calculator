import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AbsenceRepository } from './absence.repository';
import { AbsenceRepositoryToken } from 'src/business/repositories/absence.repository.interface';
import { ClassRepositoryToken } from 'src/business/repositories/class.repository.interface';
import { ClassRepository } from './class.repository';
import { UserRepositoryToken } from 'src/business/repositories/user.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: AbsenceRepositoryToken,
      useClass: AbsenceRepository,
    },
    {
      provide: ClassRepositoryToken,
      useClass: ClassRepository,
    },
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
  ],
  exports: [AbsenceRepositoryToken, ClassRepositoryToken, UserRepositoryToken],
})
export class RepositoryModule {}
