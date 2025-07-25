import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/business/useCases/use-case.module';
import { SessionController } from './session.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import jwtConfigFactory from '../../infra/config/jwt.config';

@Module({
  imports: [
    UseCaseModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: jwtConfigFactory,
      inject: [ConfigService],
    }),
  ],
  providers: [LocalStrategy, JwtStrategy],
  controllers: [SessionController],
})
export class SessionModule {}
