import { Inject, Injectable } from '@nestjs/common';

import {
  IUserRepository,
  UserRepositoryToken,
} from 'src/business/repositories/user.repository';
import { IUser } from 'src/domains/user';

@Injectable()
export class FindByEmailUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error();
    }

    return user;
  }
}
