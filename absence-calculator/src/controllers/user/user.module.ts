import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/business/useCases/use-case.module';
import { UserController } from './user.controller';
import { ProviderModule } from 'src/infra/providers/provider.module';

@Module({
  imports: [UseCaseModule, ProviderModule],
  controllers: [UserController],
})
export class UserModule {}
