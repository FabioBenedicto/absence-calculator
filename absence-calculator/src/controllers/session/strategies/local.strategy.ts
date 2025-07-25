import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateSessionUseCase } from 'src/business/useCases/session/validate-session.usecase';
import { IUser } from 'src/domains/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateSessionUseCase: ValidateSessionUseCase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<IUser> {
    console.log('oi');
    return await this.validateSessionUseCase.execute(email, password);
  }
}
