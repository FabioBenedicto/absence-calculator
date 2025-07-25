import { Inject, Injectable } from '@nestjs/common';
import {
  HashProviderToken,
  IHashProvider,
} from 'src/business/providers/hash.provider.interface';

import {
  IUserRepository,
  UserRepositoryToken,
} from 'src/business/repositories/user.repository';
import { IUser } from 'src/domains/user';

interface IRequest {
  id: number;
  email?: string;
  change_password_token?: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(request: IRequest): Promise<IUser> {
    const user = await this.userRepository.findById(request.id);

    if (!user) {
      throw new Error();
    }

    return await this.userRepository.update({
      ...request,
    });
  }
}
