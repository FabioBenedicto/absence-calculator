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
  change_password_token: string;
  password: string;
}

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(HashProviderToken)
    private readonly hashProvider: IHashProvider,
  ) {}

  public async execute(request: IRequest): Promise<IUser> {
    const user = await this.userRepository.findById(request.id);

    if (!user) {
      throw new Error();
    }

    if (request.change_password_token !== user.change_password_token) {
      throw new Error();
    }

    let hashedPassword: string = '';
    if (request.password) {
      hashedPassword = await this.hashProvider.generateHash(request.password);
    }

    return await this.userRepository.update({
      ...request,
      password: hashedPassword,
    });
  }
}
