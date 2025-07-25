import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  HashProviderToken,
  IHashProvider,
} from 'src/business/providers/hash.provider.interface';
import {
  IUserRepository,
  UserRepositoryToken,
} from 'src/business/repositories/user.repository';

@Injectable()
export class ValidateSessionUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private userRepository: IUserRepository,

    @Inject(HashProviderToken)
    private hashProvider: IHashProvider,
  ) {}

  async execute(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const matchPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!matchPassword) {
      throw new UnauthorizedException();
    }

    const { password: removedPassword, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
