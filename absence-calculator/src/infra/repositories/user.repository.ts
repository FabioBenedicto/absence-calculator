import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { IUser } from 'src/domains/user';
import { ICreateUserDTO } from 'src/business/dtos/user/create-user.dto';
import { IUserRepository } from 'src/business/repositories/user.repository';
import { IUpdateUserDTO } from 'src/business/dtos/user/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreateUserDTO): Promise<IUser> {
    return await this.prisma.user.create({ data });
  }

  async update({ id, ...data }: IUpdateUserDTO): Promise<IUser> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async findById(id: number): Promise<IUser | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
}
