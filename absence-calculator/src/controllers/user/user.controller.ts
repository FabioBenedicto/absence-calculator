import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserUseCase } from 'src/business/useCases/user/create-user.usecase';
import { CreateUserValidator } from './validators/create-absence.validator';
import { Public } from '../shared/decorators/public.decorator';
import { ChangePasswordValidator } from './validators/change-password.validator';
import {
  IQueueProvider,
  QueueProviderToken,
} from 'src/business/providers/queue.provider';
import { FindByEmailUseCase } from 'src/business/useCases/user/find-by-email.usecase';
import { randomBytes } from 'crypto';
import { UpdateUserUseCase } from 'src/business/useCases/user/update-user.usecase';
import { ChangePasswordUseCase } from 'src/business/useCases/user/change-password.usecase';

@Controller('/user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findByEmailUseCase: FindByEmailUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,

    @Inject(QueueProviderToken)
    private readonly queueProvider: IQueueProvider,
  ) {}

  @Public()
  @Post('/')
  async create(@Body() body: CreateUserValidator) {
    return await this.createUserUseCase.execute(body);
  }

  @Public()
  @Get('/:email/forgot-password/')
  async forgotPassword(@Param('email') email: string) {
    const user = await this.findByEmailUseCase.execute(email);

    const token = randomBytes(32).toString('hex');

    await this.updateUserUseCase.execute({
      id: user.id,
      change_password_token: token,
    });

    return await this.queueProvider.sendGenericEmail({
      to: user.email,
      subject: 'Recuperação de senha',
      text: `Acesse o link abaixo para alterar a senha: localhost:3000/change-password/${token}`,
    });
  }

  @Public()
  @Patch('/:id/password/')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ChangePasswordValidator,
  ) {
    return await this.changePasswordUseCase.execute({
      id,
      ...body,
    });
  }
}
