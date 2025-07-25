import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ShowUserUseCase } from 'src/business/useCases/user/show-user.usecase';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly showUserUseCase: ShowUserUseCase,

    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('AUTH_SECRET')!,
    });
  }

  async validate(payload: any) {
    const id = payload.id;
    return await this.showUserUseCase.execute(id);
  }
}
