import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { IClassRepository } from 'src/business/repositories/class.repository.interface';
import { IClass } from 'src/domains/class';

@Injectable()
export class ClassRepository implements IClassRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<IClass | null> {
    return await this.prisma.class.findUnique({ where: { id } });
  }
}
