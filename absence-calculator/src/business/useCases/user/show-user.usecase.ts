import { Inject, Injectable } from '@nestjs/common';

import {
  IUserRepository,
  UserRepositoryToken,
} from 'src/business/repositories/user.repository';
import { IUser } from 'src/domains/user';

@Injectable()
export class ShowUserUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(id: number): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error();
    }

    return user;
  }
}
