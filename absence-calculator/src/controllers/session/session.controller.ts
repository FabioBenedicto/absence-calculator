import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { Public } from '../shared/decorators/public.decorator';
import { LocalAuthGuard } from '../shared/guards/local-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { IUser } from 'src/domains/user';
import { JwtService } from '@nestjs/jwt';

@Controller('/session')
export class SessionController {
  constructor(private jwtService: JwtService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post()
  create(@CurrentUser() user: IUser) {
    const payload = { ...user, sub: user.id };

    return {
      ...user,
      token: this.jwtService.sign(payload),
    };
  }

  @Get()
  test(@CurrentUser() user: IUser) {
    return user;
  }
}
