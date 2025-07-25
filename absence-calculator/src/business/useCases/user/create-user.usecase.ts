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
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,

    @Inject(HashProviderToken)
    private readonly hashProvider: IHashProvider,
  ) {}

  public async execute(request: IRequest): Promise<IUser> {
    const user = await this.userRepository.findByEmail(request.email);

    if (user) {
      throw new Error();
    }

    const hashedPassword = await this.hashProvider.generateHash(
      request.password,
    );

    return await this.userRepository.create({
      ...request,
      password: hashedPassword,
    });
  }
}
